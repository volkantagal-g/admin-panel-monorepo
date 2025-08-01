import { test, expect } from './_fixture';
import { SQUAD_BRANCH_NAME_TO_TAG } from 'internals/constants/squadShortNames';
import { expectSelectItemAndWaitForToBeSelected } from '@e2e/common/assertions';
import { getTableDataRowItems, getTableDataRows } from '@e2e/common/locators';
import { getActiveOrdersForCustomerServicesUrlPattern } from '@e2e/pages/MarketOrderAnalytics/apiMocking';

const ASSERTION_TIMEOUT_MS: number = 5_000;

test.describe(`${SQUAD_BRANCH_NAME_TO_TAG.ZEUS} - Active Orders For Customer Service`, () => {
  test('[Getir10] Filling filters and control results', async ({ csActiveOrdersPage: currentPage }) => {
    const {
      filterCollapsePanelButton,
      domainTypeSelect,
      deliveryTypeSelect,
      citySelect,
      warehouseSelect,
      filterApplyButton,
      statusSelect,
      statusClearButton,
    } = currentPage;

    await expect(filterCollapsePanelButton).toBeVisible();

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: domainTypeSelect,
      search: 'Getir10',
    });

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: deliveryTypeSelect,
      search: 'Scheduled',
    });

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: citySelect,
      typedText: 'Ad',
      search: 'Adana',
    });

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: warehouseSelect,
      typedText: 'Tugce',
      search: 'Tugce Ulutas Depo',
    });

    await statusClearButton.click();

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: statusSelect,
      search: 'Reserved',
    });

    await filterApplyButton.click();
    await currentPage.page.waitForResponse(getActiveOrdersForCustomerServicesUrlPattern, { timeout: ASSERTION_TIMEOUT_MS });

    const tableDataRows = await getTableDataRows({ containerElement: currentPage.page.locator('body') });

    if (tableDataRows.length <= 0) {
      // No data found, we cant compare data rows with expected values
      return;
    }

    // Take the first row and check the values
    const tableDataFirstRowItems = await getTableDataRowItems({
      containerElement: currentPage.page.locator('body'),
      rowIndex: 0,
    });

    expect(tableDataFirstRowItems[1]).toEqual('Schd');
    expect(tableDataFirstRowItems[2]).toEqual('Tugce Ulutas Depo');
    expect(tableDataFirstRowItems[5]).toEqual('Reserved');
  });

  test('[GetirMore] Filling filters and control results', async ({ csActiveOrdersPage: currentPage }) => {
    const {
      filterCollapsePanelButton,
      domainTypeSelect,
      deliveryTypeSelect,
      citySelect,
      warehouseSelect,
      filterApplyButton,
      statusSelect,
      statusClearButton,
    } = currentPage;

    await expect(filterCollapsePanelButton).toBeVisible();

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: domainTypeSelect,
      search: 'GetirMore',
    });

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: deliveryTypeSelect,
      search: 'Scheduled',
    });

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: citySelect,
      typedText: 'Anka',
      search: 'Ankara',
    });

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: warehouseSelect,
      typedText: 'Cloud De',
      search: 'Cloud Depo',
    });

    await statusClearButton.click();

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: statusSelect,
      search: 'Reserved',
    });

    await filterApplyButton.click();
    await currentPage.page.waitForResponse(getActiveOrdersForCustomerServicesUrlPattern, { timeout: ASSERTION_TIMEOUT_MS });

    const tableDataRows = await getTableDataRows({ containerElement: currentPage.page.locator('body') });

    if (tableDataRows.length <= 0) {
      // No data found, we cant compare data rows with expected values
      return;
    }

    // Take the first row and check the values
    const tableDataFirstRowItems = await getTableDataRowItems({
      containerElement: currentPage.page.locator('body'),
      rowIndex: 0,
    });

    expect(tableDataFirstRowItems[1]).toEqual('Schd');
    expect(tableDataFirstRowItems[2]).toEqual('Cloud Depo');
    expect(tableDataFirstRowItems[5]).toEqual('Reserved');
  });

  test('[GetirWater] Filling filters and control results', async ({ csActiveOrdersPage: currentPage }) => {
    const {
      filterCollapsePanelButton,
      domainTypeSelect,
      deliveryTypeSelect,
      citySelect,
      warehouseSelect,
      filterApplyButton,
      statusSelect,
      statusClearButton,
    } = currentPage;

    await expect(filterCollapsePanelButton).toBeVisible();

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: domainTypeSelect,
      search: 'GetirWater',
    });

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: deliveryTypeSelect,
      search: 'On-demand',
    });

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: citySelect,
      typedText: 'Kar',
      search: 'Kars',
    });

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: warehouseSelect,
      typedText: 'Talha',
      search: 'Talha Su Deposu',
    });

    await statusClearButton.click();

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: statusSelect,
      search: 'Reached',
    });

    await filterApplyButton.click();
    await currentPage.page.waitForResponse(getActiveOrdersForCustomerServicesUrlPattern, { timeout: ASSERTION_TIMEOUT_MS });

    const tableDataRows = await getTableDataRows({ containerElement: currentPage.page.locator('body') });

    if (tableDataRows.length <= 0) {
      // No data found, we cant compare data rows with expected values
      return;
    }

    // Take the first row and check the values
    const tableDataFirstRowItems = await getTableDataRowItems({
      containerElement: currentPage.page.locator('body'),
      rowIndex: 0,
    });

    expect(tableDataFirstRowItems[1]).toEqual('');
    expect(tableDataFirstRowItems[2]).toEqual('Talha Su Deposu');
    expect(tableDataFirstRowItems[5]).toEqual('Reached');
  });

  test('Pagination', async ({ csActiveOrdersPage }) => {
    const {
      paginationPreviousButton,
      paginationNextButton,
    } = csActiveOrdersPage;

    await expect(paginationNextButton).toBeVisible();
    await expect(paginationPreviousButton).toBeVisible();
  });
});
