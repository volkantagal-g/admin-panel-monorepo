import { type Route, type Request } from '@playwright/test';
import path from 'path';

import { GETIR_MARKET_DOMAIN_TYPE } from '@app/shared/constants';
import {
  getActiveOrdersForGrowthMock, getActiveOrdersForGrowthSlottedMock,
  getActiveOrdersPromoStatsMock,
} from '@app/api/marketOrderAnalytics/index.mock.data';
import {
  expectSidebarMenuToHave,
  expectSelectItemToBeSelected,
  expectSelectItemAndWaitForToBeSelected,
  waitForAsyncSelectListToLoad,
  waitForSelectToBeCleared,
  expectTableCellNotToHaveSorter, expectTableHeaderToBeSorted,
} from '@e2e/common/assertions';
import { test, expect } from './_fixture';
import {
  mockGetActiveOrdersPromoStatsResponse,
  mockGetActiveOrdersForGrowthResponse,
  getActiveOrdersPromoStatsUrlPattern,
  getActiveOrdersForGrowthUrlPattern,
  mockGetActiveOrdersForGrowthEmptyResponse,
  mockGetActiveOrdersForGrowthSlottedResponse,
} from '../apiMocking';
import { mockWarehouses } from '@e2e/common/apiMocking';
import { SQUAD_BRANCH_NAME_TO_TAG } from 'internals/constants/squadShortNames';
import { TEST_TAG } from 'internals/constants/testTag';
import {
  getClearButtonOfSelect,
  getTableDataRowItems,
  getTableDataRows,
  getTableHeaderColumnTitles,
} from '@e2e/common/locators';

const ASSERTION_TIMEOUT_MS: number = 5_000;

test.describe(`${SQUAD_BRANCH_NAME_TO_TAG.ZEUS} - Market Active Orders For Growth Page`, () => {
  test(`minimal features should work correctly ${TEST_TAG.SMOKE}`, async ({ activeOrdersForGrowthPage: currentPage }) => {
    const pageTitle = await currentPage.pageTitle;
    await expect(async () => {
      expect(pageTitle).toContain('Active Orders - Growth');
    }).toPass({ timeout: 5000 });

    await expectSidebarMenuToHave({
      instance: currentPage.page,
      menuGroupName: 'GetirMarket',
      menuItemsArr: ['Order', 'Growth Active Orders'],
    });
    await expectSidebarMenuToHave({
      instance: currentPage.page,
      menuGroupName: 'n11',
      menuItemsArr: ['order', 'Growth Active Orders'],
    });

    const collapseButton = currentPage.filterPanelCollapseButton;
    const collapseContent = currentPage.filterPanelCollapseContent;

    await collapseButton.click();
    await expect(collapseContent).not.toBeVisible();

    await collapseButton.click();
    await expect(collapseContent).toBeVisible();
    // Default values
    const {
      domainTypeSelectComponent,
      integrationTypeSelectComponent,
      cityWarehouseDependencySelectComponent,
      citySelectComponent,
      cityDependentWarehouseSelectComponent,
      cityIndependentWarehouseSelectComponent,
      promoSelectComponent,
      paymentMethodSelectComponent,
    } = currentPage;
    await expect(domainTypeSelectComponent).toBeVisible();
    await expect(integrationTypeSelectComponent).toBeVisible();
    await expect(cityWarehouseDependencySelectComponent).toBeVisible();
    await expect(citySelectComponent).toBeVisible();
    await expect(cityDependentWarehouseSelectComponent).toBeVisible();
    await expect(cityDependentWarehouseSelectComponent).toBeDisabled();
    await expect(cityIndependentWarehouseSelectComponent).not.toBeVisible();
    await expect(promoSelectComponent).toBeVisible();
    await expect(paymentMethodSelectComponent).toBeVisible();

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: domainTypeSelectComponent,
      search: 'Getir10',
    });

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: cityWarehouseDependencySelectComponent,
      typedText: 'Dependent',
      isTypedTextExact: true,
    });

    // should change initial domain type based on localStorage
    await currentPage.page.evaluate(() => {
      return localStorage.setItem('selectedDomainType', '3');
    });
    await currentPage.page.reload();
    await expect(domainTypeSelectComponent).toBeInViewport();

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: domainTypeSelectComponent,
      search: 'GetirMore',
    });

    // should update localStorage when domain type is changed
    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: domainTypeSelectComponent,
      typedText: 'Getir10',
    });

    const domainTypeFroMLS = await currentPage.page.evaluate(() => {
      return localStorage.getItem('selectedDomainType');
    });

    expect(domainTypeFroMLS).toBe('1');
  });

  test.describe('Detailed Features', () => {
    test('Filter relationships', async ({ activeOrdersForGrowthPage: currentPage }): Promise<void> => {
      // should enable the warehouse select component when one city is selected
      const {
        citySelectComponent,
        cityDependentWarehouseSelectComponent,
      } = currentPage;

      await expectSelectItemAndWaitForToBeSelected({
        pageInstance: currentPage.page,
        selectElem: citySelectComponent,
        typedText: 'Istanbul',
      });

      await expect(cityDependentWarehouseSelectComponent).toBeEnabled();

      // should disable the warehouse select component when more than one city are selected
      await expectSelectItemAndWaitForToBeSelected({
        pageInstance: currentPage.page,
        selectElem: citySelectComponent,
        typedText: 'Izmir',
      });

      await expect(cityDependentWarehouseSelectComponent).toBeDisabled();

      // should hide the city select component when city-warehouse dependency is independent

      const { cityWarehouseDependencySelectComponent } = currentPage;

      await expectSelectItemAndWaitForToBeSelected({
        pageInstance: currentPage.page,
        selectElem: cityWarehouseDependencySelectComponent,
        typedText: '',
        search: /Independent/i,
      });

      await expect(citySelectComponent).not.toBeVisible();
    });

    test('CSV uploading flow', async ({ activeOrdersForGrowthPage: currentPage }): Promise<void> => {
      // should upload cities CSV for city select component
      const {
        citySelectComponent,
        csvUploadComponentOfCitySelectComponent,
      } = currentPage;

      // to ensure csv upload component is enabled
      expect(csvUploadComponentOfCitySelectComponent).toBeVisible({ timeout: ASSERTION_TIMEOUT_MS });
      expect(csvUploadComponentOfCitySelectComponent).toBeEnabled({ timeout: ASSERTION_TIMEOUT_MS });
      // wait for cities response to fill the select list
      await waitForAsyncSelectListToLoad({ pageInstance: currentPage.page, inputElem: citySelectComponent, text: 'Istanbul' });

      // to open the file upload dialog
      await csvUploadComponentOfCitySelectComponent.click();
      await csvUploadComponentOfCitySelectComponent.locator('input[type="file"]').setInputFiles(path.join(__dirname, './__mock__/cities.csv'));
      await currentPage.page.locator('.ant-modal-content').getByRole('button', { name: 'Upload', exact: true }).click();

      await expect(async () => {
        await expectSelectItemToBeSelected({
          selectElem: citySelectComponent,
          text: 'Istanbul',
        });
      }).toPass({ timeout: ASSERTION_TIMEOUT_MS });
      await expect(async () => {
        await expectSelectItemToBeSelected({
          selectElem: citySelectComponent,
          text: 'Izmir',
        });
      }).toPass({ timeout: ASSERTION_TIMEOUT_MS });

      // clear city input for next stage

      await getClearButtonOfSelect({ inputElem: citySelectComponent }).click();
      await waitForSelectToBeCleared({ inputElem: citySelectComponent });
      // should upload warehouses CSV for warehouse select component
      await mockWarehouses(currentPage.page);
      const {
        cityDependentWarehouseSelectComponent,
        csvUploadComponentOfCityDependentWarehouseSelectComponent,
      } = currentPage;

      await expectSelectItemAndWaitForToBeSelected({
        pageInstance: currentPage.page,
        selectElem: citySelectComponent,
        typedText: 'Istanbul',
      });
      // to ensure csv upload component is enabled
      await expect(csvUploadComponentOfCityDependentWarehouseSelectComponent).toBeEnabled({ timeout: ASSERTION_TIMEOUT_MS });
      // wait for cities response to fill the select list
      await waitForAsyncSelectListToLoad({ pageInstance: currentPage.page, inputElem: cityDependentWarehouseSelectComponent, text: 'ZincirlikuyuBüyük' });

      // to open the file upload dialog
      await csvUploadComponentOfCityDependentWarehouseSelectComponent.click();
      await csvUploadComponentOfCityDependentWarehouseSelectComponent.locator('input[type="file"]')
        .setInputFiles(path.join(__dirname, './__mock__/warehouses.csv'));
      await currentPage.page.locator('.ant-modal-content').getByRole('button', { name: 'Upload', exact: true }).click();

      await expectSelectItemToBeSelected({
        selectElem: cityDependentWarehouseSelectComponent,
        text: /Zincir/,
      });
    });

    test('HTTP request should have all the selected filters ', async ({ activeOrdersForGrowthPage: currentPage }): Promise<void> => {
      const {
        domainTypeSelectComponent,
        citySelectComponent,
        cityDependentWarehouseSelectComponent,
        promoSelectComponent,
        paymentMethodSelectComponent,
        filterApplyButton,
      } = currentPage;

      await mockGetActiveOrdersPromoStatsResponse(currentPage.page);
      await mockWarehouses(currentPage.page);

      await expectSelectItemAndWaitForToBeSelected({
        pageInstance: currentPage.page,
        selectElem: domainTypeSelectComponent,
        typedText: 'GetirMore',
      });

      await expectSelectItemAndWaitForToBeSelected({
        pageInstance: currentPage.page,
        selectElem: citySelectComponent,
        typedText: 'Istanbul',
      });

      await expectSelectItemAndWaitForToBeSelected({
        pageInstance: currentPage.page,
        selectElem: cityDependentWarehouseSelectComponent,
        typedText: 'Zincirli',
        search: /Zincir/,
      });

      await expectSelectItemAndWaitForToBeSelected({
        pageInstance: currentPage.page,
        selectElem: promoSelectComponent,
        typedText: getActiveOrdersPromoStatsMock[0].promo.promoCode,
      });

      await expectSelectItemAndWaitForToBeSelected({
        pageInstance: currentPage.page,
        selectElem: paymentMethodSelectComponent,
        typedText: 'C. Card',
      });

      await currentPage.page.route('**/marketOrderAnalytics/getActiveOrdersForGrowth', async (route: Route, request: Request) => {
        const requestBodyAsString = request.postData();

        const requestBody = JSON.parse(requestBodyAsString as string);

        expect(requestBody.domainType).toBe(GETIR_MARKET_DOMAIN_TYPE);
        // Istanbul city id
        expect(requestBody.cities).toHaveLength(1);
        expect(requestBody.promoIds).toHaveLength(1);
        // C. Card payment method id
        expect(requestBody.paymentMethods).toHaveLength(1);
        // ZincirlikuyuBüyük warehouse id
        expect(requestBody.warehouseIds).toHaveLength(1);

        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ orders: [], count: 0, totalKuzeydenCarboyCount: 0 }),
        });
      });

      await filterApplyButton.click();
    });

    test('Table Features', async ({ activeOrdersForGrowthPage: currentPage }): Promise<void> => {
      const { activeOrdersTable } = currentPage;
      const expectedTableTitles = [
        '#',
        'Promo Code',
        'G10',
        'GF',
        'GM',
        'GW',
        'Chnl',
        'Int. T.',
        'Schd',
        'Payment',
        'Warehouse',
        'Agg.L.',
        'D.Fee (₺)',
        'Bskt (₺)',
        'Charge (₺)',
        'Dt.',
        'L.Act.',
        'Sum',
        'Status',
        'Action',
      ];

      await expectTableHeaderToBeSorted({
        header: activeOrdersTable,
        title: 'L.Act.',
        sortDirection: 'none',
      });
      await expectTableHeaderToBeSorted({
        header: activeOrdersTable,
        title: 'Sum',
        sortDirection: 'none',
      });

      await expect(async () => {
        const tableTitles = await getTableHeaderColumnTitles({ containerElement: currentPage.page.locator('body') });
        expect(expectedTableTitles).toEqual(tableTitles);
      }).toPass({ timeout: ASSERTION_TIMEOUT_MS });

      await mockGetActiveOrdersPromoStatsResponse(currentPage.page);
      await mockGetActiveOrdersForGrowthResponse(currentPage.page);

      await currentPage.page.reload();
      await Promise.all([
        currentPage.page.waitForResponse(getActiveOrdersPromoStatsUrlPattern, { timeout: ASSERTION_TIMEOUT_MS }),
        currentPage.page.waitForResponse(getActiveOrdersForGrowthUrlPattern, { timeout: ASSERTION_TIMEOUT_MS }),
      ]);

      await expect(async () => {
        const firstRowCellItems = [
          '1',
          getActiveOrdersForGrowthMock?.orders[0].promo.applied[0].promoCode,
          getActiveOrdersForGrowthMock?.orders[0].client.client.sucOrderCounts[0].count,
          getActiveOrdersForGrowthMock?.orders[0].client.client.sucOrderCounts[1].count,
          '0',
          '0',
          'IOS',
          '',
          '',
          'C. Card',
          getActiveOrdersForGrowthMock?.orders[0].warehouse.warehouse.name,
          getActiveOrdersForGrowthMock?.orders[0].warehouse.warehouse.aggressionLevel,
          getActiveOrdersForGrowthMock?.orders[0].basket.calculation.deliveryFee,
          getActiveOrdersForGrowthMock?.orders[0].basket.calculation.totalAmount,
          getActiveOrdersForGrowthMock?.orders[0].basket.calculation.totalChargedAmount,
          '18:23',
          true,
          true,
          'W.For Picker',
          'Detail',
        ];
        const dataRowItems = await getTableDataRowItems({
          containerElement: currentPage.page.locator('body'),
          rowIndex: 0,
        });

        firstRowCellItems.forEach((item, index) => {
          if (typeof item === 'boolean' && item) {
            return;
          }
          expect(dataRowItems[index]).toBe(item?.toString());
        });
        expect(Number(dataRowItems[16])).toBeGreaterThan(1); // last activity
        expect(Number(dataRowItems[17])).toBeGreaterThan(1); // total duration
      }).toPass({ timeout: ASSERTION_TIMEOUT_MS });

      const [firstOrderRow] = await getTableDataRows({ containerElement: currentPage.page.locator('body') });

      await expect(firstOrderRow.getByRole('button', { name: 'Detail', exact: true })).toBeEnabled();

      await mockGetActiveOrdersForGrowthEmptyResponse(currentPage.page);

      await currentPage.page.reload();

      const dataRowsWhenEmptyMock = await getTableDataRows({ containerElement: currentPage.page.locator('body') });
      expect(dataRowsWhenEmptyMock.length).toBe(0);

      // Check Scheduled Active Orders Responses
      await mockGetActiveOrdersForGrowthSlottedResponse(currentPage.page);

      await currentPage.page.reload();

      await Promise.all([
        currentPage.page.waitForResponse(getActiveOrdersPromoStatsUrlPattern, { timeout: ASSERTION_TIMEOUT_MS }),
        currentPage.page.waitForResponse(getActiveOrdersForGrowthUrlPattern, { timeout: ASSERTION_TIMEOUT_MS }),
      ]);

      const dataRowsWhenScheduledMock = await getTableDataRows({ containerElement: currentPage.page.locator('body') });
      expect(dataRowsWhenScheduledMock.length).toBe(2);

      const dataRowItems = await getTableDataRowItems({
        containerElement: currentPage.page.locator('body'),
        rowIndex: 0,
      });

      await expect(async () => {
        const firstRowCellItems = [
          '1',
          getActiveOrdersForGrowthSlottedMock?.orders[0].promo.applied[0].promoCode,
          getActiveOrdersForGrowthSlottedMock?.orders[0].client.client.sucOrderCounts[0].count,
          getActiveOrdersForGrowthSlottedMock?.orders[0].client.client.sucOrderCounts[1].count,
          '184',
          '19',
          'IOS',
          '',
          'Schd',
          'C. Card',
          getActiveOrdersForGrowthSlottedMock?.orders[0].warehouse.warehouse.name,
          getActiveOrdersForGrowthSlottedMock?.orders[0].warehouse.warehouse.aggressionLevel,
          getActiveOrdersForGrowthSlottedMock?.orders[0].basket.calculation.deliveryFee,
          getActiveOrdersForGrowthSlottedMock?.orders[0].basket.calculation.totalAmount,
          getActiveOrdersForGrowthSlottedMock?.orders[0].basket.calculation.totalChargedAmount,
          '15:34',
          true,
          true,
          'Reserved',
          'Detail',
        ];

        const slottedDataRowItems = await getTableDataRowItems({
          containerElement: currentPage.page.locator('body'),
          rowIndex: 0,
        });

        firstRowCellItems.forEach((item, index) => {
          if (typeof item === 'boolean' && item) {
            return;
          }

          expect(dataRowItems[index]).toBe(item?.toString());
        });
        // Last Activity
        expect(Number(slottedDataRowItems[16])).toBeGreaterThanOrEqual(0);

        // Total durations should be seperated by / for slotted orders.
        expect(slottedDataRowItems[17]).toContain('/');
      }).toPass({ timeout: ASSERTION_TIMEOUT_MS });
    });
  });
});
