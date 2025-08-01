import { Page, Route } from '@playwright/test';

import { TEST_TAG } from 'internals/constants/testTag';
import { SQUAD_BRANCH_NAME_TO_TAG } from 'internals/constants/squadShortNames';
import { expectSelectItemAndWaitForToBeSelected, expectSidebarMenuToHave, expectSyncSelectItemHasCorrectOptions } from '@e2e/common/assertions';
import { integrationTypeMockData, integrationTypeMockDataWithEmptyValue } from '@app/api/marketConfig/index.mock.data';
import { test, expect } from './_fixture';
import { getTableHeaderColumnTitles, getTableDataRowItems, getTableDataRows } from '@e2e/common/locators';
import { getActiveOrdersForManagementMock } from '@app/api/marketOrderAnalytics/index.mock.data';
import { getActiveOrdersExecutiveStatsManagementUrlPattern, getActiveOrdersForManagementUrlPattern } from '../apiMocking';

const TIMEOUT_MS = 10_000;

test.describe(`${SQUAD_BRANCH_NAME_TO_TAG.ZEUS} - Market Order Analytics - Active Orders For Management Page`, () => {
  test(`minimal features should work correctly ${TEST_TAG.SMOKE}`, async ({ activeOrdersForManagementPage: currentPage }) => {
    await expectSidebarMenuToHave({
      instance: currentPage.page,
      menuGroupName: 'Management',
      // different short naming on management section
      menuItemsArr: ['G.Active Orders'],
    });

    await expectSidebarMenuToHave({
      instance: currentPage.page,
      menuGroupName: 'GetirMarket',
      menuItemsArr: ['Order', 'Management Active Orders'],
    });
    await expectSidebarMenuToHave({
      instance: currentPage.page,
      menuGroupName: 'n11',
      menuItemsArr: ['order', 'Management Active Orders'],
    });

    const { domainTypeSelect, integrationTypeSelect, citySelect, clientSelect, warehouseSelect, orderStatusSelect, deliveryTypeSelect } = currentPage;

    await expect(domainTypeSelect).toBeVisible();
    await expect(integrationTypeSelect).toBeVisible();
    await expect(deliveryTypeSelect).toBeVisible();
    await expect(citySelect).toBeVisible();
    await expect(clientSelect).toBeVisible();
    await expect(warehouseSelect).toBeVisible();
    await expect(orderStatusSelect).toBeVisible();

    // Default values
    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: domainTypeSelect,
      search: 'Getir10',
    });

    // default orders shown on the table from mock data

    // changing filters
    // warehouse select should be disabled without city selected
    await expect(warehouseSelect).toBeDisabled();

    // select a city
    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: citySelect,
      typedText: 'Istanbul',
    });

    // warehouse select should be enabled after city selected
    await expect(warehouseSelect).toBeEnabled();

    // select a warehouse
    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: warehouseSelect,
      typedText: 'Zincirli',
      search: /^Zincirli/,
    });

    // pick change domainType to GetirMore
    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: domainTypeSelect,
      search: 'GetirMore',
    });

    // change integration type to 'n11'
    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: integrationTypeSelect,
      typedText: 'n11',
    });

    // change delivery type
    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: deliveryTypeSelect,
      search: 'Scheduled',
    });

    // refresh page and mock for unavailable integration type
    await mockIntegrationTypeResponseForUnavailable(currentPage.page);
    await currentPage.page.reload();

    // because we save domainType selection to local storage, it should still be GetirMore
    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: domainTypeSelect,
      search: 'GetirMore',
    });
    // integration type filter should not be visible since the config returned empty
    await expect(integrationTypeSelect).not.toBeVisible();

    // Check listing type has appropriate values
    const expectedListingTypeOptions = [
      'Handed over to Courier',
      'On Way',
      'Prepared',
      'Preparing',
      'Reached',
      'Reserved',
      'Verifying',
      'Waiting For Picker',
    ];
    await expectSyncSelectItemHasCorrectOptions({
      pageInstance: currentPage.page,
      selectElem: orderStatusSelect,
      expectedOptions: expectedListingTypeOptions,
    });
  });
  test('Table features', async ({ activeOrdersForManagementPage: currentPage }) => {
    // data points are from mock data
    const expectedTableTitles = [
      '#', 'A', 'Q', 'Schd', 'G10', 'GM', 'GW', 'GF', 'GL',
      'Promo(87%)',
      'Warehouse',
      'Bskt(TRY 155.7)', // in html, empty space is '&nbsp;' but we replace that in getTableHeaderColumnTitles
      'Chrg(TRY 146.9)',
      'Ch. Dt.',
      'Client', 'Courier', 'Picker',
      'Status', 'L.Act', 'Sum', 'Action',
    ];

    const WAREHOUSE_INDEX = 10;

    await expect(async () => {
      const tableTitles = await getTableHeaderColumnTitles({ containerElement: currentPage.page.locator('body') });
      expect(expectedTableTitles).toEqual(tableTitles);
    }).toPass({ timeout: TIMEOUT_MS });

    await expect(async () => {
      const dataRowItemsWhenMockedResponse = await getTableDataRowItems({ containerElement: currentPage.page.locator('body'), rowIndex: 0 });
      const warehouseDisplayed = dataRowItemsWhenMockedResponse[WAREHOUSE_INDEX];
      const namesOfWarehousesOrders = getActiveOrdersForManagementMock.orders.map(order => order.warehouse.warehouse.name);

      expect(namesOfWarehousesOrders.includes(warehouseDisplayed)).toBe(true);
    }).toPass({ timeout: TIMEOUT_MS });

    await mockEmptyActiveOrdersResponse(currentPage.page);
    await mockEmptyActiveOrdersStatsResponse(currentPage.page);

    await currentPage.page.reload();
    await currentPage.page.waitForResponse(getActiveOrdersForManagementUrlPattern, { timeout: TIMEOUT_MS });
    await currentPage.page.waitForResponse(getActiveOrdersExecutiveStatsManagementUrlPattern, { timeout: TIMEOUT_MS });

    // Bskt and Chrg columns should be 0.0 after mocking with empty data
    await expect(async () => {
      const tableTitles = await getTableHeaderColumnTitles({ containerElement: currentPage.page.locator('body') });
      expect(tableTitles).toContain('Bskt(TRY 0.0)');
      expect(tableTitles).toContain('Chrg(TRY 0.0)');
    }).toPass({ timeout: TIMEOUT_MS });

    const dataRowsWhenEmptyMock = await getTableDataRows({ containerElement: currentPage.page.locator('body') });
    expect(dataRowsWhenEmptyMock.length).toBe(0);
  });
});

// so that we hide integration type filter, we will return empty config
async function mockIntegrationTypeResponseForUnavailable(pageInstance: Page) {
  await pageInstance.route('**/marketConfig/getConfigWKey', async (route: Route) => {
    const reqBodyStr = route.request().postData();
    const reqBody = JSON.parse(reqBodyStr || '{}') as { key: string };
    if (reqBody.key === integrationTypeMockData.key) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(integrationTypeMockDataWithEmptyValue),
      });
    }
    else {
      await route.continue();
    }
  });
}

export async function mockEmptyActiveOrdersResponse(pageInstance: Page) {
  await pageInstance.route(getActiveOrdersForManagementUrlPattern, async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        orders: [],
        count: 0,
        totalKuzeydenOrderCount: 0,
      }),
    });
  });
}

export async function mockEmptyActiveOrdersStatsResponse(pageInstance: Page) {
  await pageInstance.route('**/marketOrderAnalytics/getActiveOrdersExecutiveStatsManagement', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        financialStats: [],
        promoOrderFinancialStats: [],
      }),
    });
  });
}
