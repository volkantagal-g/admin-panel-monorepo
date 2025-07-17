import { Page, Route } from '@playwright/test';

import { expectSelectItemAndWaitForToBeSelected, expectSelectItemToBeSelected, expectSidebarMenuToHave } from '@e2e/common/assertions';
import { getTableHeaderColumnTitles, getTableDataRowItems, getTableDataRows } from '@e2e/common/locators';
import { SQUAD_BRANCH_NAME_TO_TAG } from 'internals/constants/squadShortNames';
import { TEST_TAG } from 'internals/constants/testTag';
import { test, expect } from './_fixture';
import { getActiveOrdersForOperationUrlPattern } from '../apiMocking';
import { getActiveOrdersForOperationMock } from '@app/api/marketOrderAnalytics/index.mock.data';

const TIMEOUT_MS = 10_000;

test.describe(`${SQUAD_BRANCH_NAME_TO_TAG.ZEUS} - Market Order Analytics - Active Orders For Operation`, () => {
  test(`minimal features should work correctly ${TEST_TAG.SMOKE}`, async ({ activeOrdersForOperationPage: currentPage }) => {
    await expectSidebarMenuToHave({
      instance: currentPage.page,
      menuGroupName: 'GetirMarket',
      menuItemsArr: ['Order', 'Operation Active Orders'],
    });

    const {
      domainTypeSelect,
      integrationTypeSelect,
      citySelect,
      fieldManagerSelect,
      courierSelect,
      warehouseSelect,
      orderStatusSelect,
      durationInput,
      applyFiltersButton,
      totalActiveOrderStatsCard,
      promoCountStatsCard,
      courierAssignedStatsCard,
      courierUnassignedStatsCard,
      averageWeightShortStatsCard,
      averageVolumeShortStatsCard,
      orderTable,
      orderStatusSelectClearButton,
      orderStatusesSelectAllButton,
    } = currentPage;

    // Check if all filters are visible
    await expect(domainTypeSelect).toBeVisible();
    await expect(integrationTypeSelect).toBeVisible();
    await expect(citySelect).toBeVisible();
    await expect(fieldManagerSelect).toBeVisible();
    await expect(courierSelect).toBeVisible();
    await expect(warehouseSelect).toBeVisible();
    await expect(orderStatusSelect).toBeVisible();
    await expect(durationInput).toBeVisible();
    // Enabled because initially status field is full
    await expect(durationInput).toBeEnabled();
    await expect(applyFiltersButton).toBeVisible();

    // Check if stats card is visible
    await expect(totalActiveOrderStatsCard).toBeVisible();
    await expect(promoCountStatsCard).toBeVisible();
    await expect(courierAssignedStatsCard).toBeVisible();
    await expect(courierUnassignedStatsCard).toBeVisible();
    await expect(averageWeightShortStatsCard).toBeVisible();
    await expect(averageVolumeShortStatsCard).toBeVisible();

    // Check if order table is visible
    await expect(orderTable).toBeVisible();

    // Default values
    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: domainTypeSelect,
      search: 'Getir10',
    });

    // pick change domainType to GetirMore
    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: domainTypeSelect,
      search: 'GetirMore',
    });

    // select an integration type
    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: integrationTypeSelect,
      search: 'n11',
    });

    // select a city
    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: citySelect,
      typedText: 'Istanbul',
    });

    // select a field manager
    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: fieldManagerSelect,
      search: 'Şükrü Günay',
    });

    // select a courier
    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: courierSelect,
      typedText: 'Gokhan Cansu',
      search: /^Gokhan Cansu/,
    });

    // select a warehouse
    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: warehouseSelect,
      typedText: 'Zincirli',
      search: /^Zincirli/,
    });

    await orderStatusSelectClearButton.click();
    await expect(durationInput).toBeDisabled();
    await orderStatusesSelectAllButton.click();

    // duration input should be enabled after order status selected
    await expect(durationInput).toBeEnabled();

    // fill duration input
    await durationInput.fill('10');
  });

  test('Table features', async ({ activeOrdersForOperationPage: currentPage }) => {
    // data points are from mock data
    const expectedTableTitles = [
      '#',
      'Q',
      'Schd',
      'Warehouse',
      'Promo',
      'Date',
      'Client',
      'Courier',
      'Picker',
      'L.Act.',
      'Sum',
      'Status',
      'Weight(kg)',
      'Volume(cm3)',
      'Vehicle',
      'Action',
    ];

    const WAREHOUSE_INDEX = 3;

    await expect(async () => {
      const tableTitles = await getTableHeaderColumnTitles({ containerElement: currentPage.page.locator('body') });
      expect(expectedTableTitles).toEqual(tableTitles);
    }).toPass({ timeout: TIMEOUT_MS });

    await expect(async () => {
      const dataRowItemsWhenMockedResponse = await getTableDataRowItems({ containerElement: currentPage.page.locator('body'), rowIndex: 0 });
      const warehouseDisplayed = dataRowItemsWhenMockedResponse[WAREHOUSE_INDEX];
      const namesOfWarehousesOrders = getActiveOrdersForOperationMock.orders.map(order => order.warehouse.warehouse.name);
      expect(namesOfWarehousesOrders.includes(warehouseDisplayed)).toBe(true);
    }).toPass({ timeout: TIMEOUT_MS });

    await mockEmptyActiveOrdersResponse(currentPage.page);

    await currentPage.page.reload();
    await currentPage.page.waitForResponse(getActiveOrdersForOperationUrlPattern, { timeout: TIMEOUT_MS });

    const dataRowsWhenEmptyMock = await getTableDataRows({ containerElement: currentPage.page.locator('body') });
    expect(dataRowsWhenEmptyMock.length).toBe(0);
  });
});

export async function mockEmptyActiveOrdersResponse(pageInstance: Page) {
  await pageInstance.route('**/marketOrderAnalytics/getActiveOrdersForOperation', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        orders: [],
        count: 0,
        totalKuzeydenCarboyCount: 0,
        courierOrderAssigmentStats: {},
      }),
    });
  });
}
