import { test, expect } from './_fixture';
import { TEST_TAG } from '../../../../internals/constants/testTag';
import {
  expectSelectItemAndWaitForToBeSelected,
  expectSidebarMenuToHave,
  expectTableCellNotToHaveSorter,
  expectTableHeaderToBeSorted,
  expectTableSortersCountToBe,
  getInputByPlaceholder,
  waitForAsyncSelectListToLoad,
  waitForSelectToBeCleared,
} from '@e2e/common/assertions';
import { getClearButtonOfSelect, getTableHeaderColumnTitles } from '@e2e/common/locators';
import { SQUAD_BRANCH_NAME_TO_TAG } from 'internals/constants/squadShortNames';

const TIMEOUT_MS = 4000;

test.describe(`${SQUAD_BRANCH_NAME_TO_TAG.ZEUS} - Market Order Analytics - Active Orders Summary`, () => {
  test(`minimal features should work correctly ${TEST_TAG.SMOKE}`, async ({ activeOrdersSummaryPage: currentPage }) => {
    await expectSidebarMenuToHave({
      instance: currentPage.page,
      menuGroupName: 'Management',
      // different short naming on management section
      menuItemsArr: ['G.Act Ord Sum.'],
    });

    await expectSidebarMenuToHave({
      instance: currentPage.page,
      menuGroupName: 'GetirMarket',
      menuItemsArr: ['Order', 'Active Orders Summary'],
    });
    await expectSidebarMenuToHave({
      instance: currentPage.page,
      menuGroupName: 'n11',
      menuItemsArr: ['order', 'Active Orders Summary'],
    });

    const {
      domainTypeSelect,
      citySelect,
      deliveryTypeSelect,
      integrationTypeSelect,
      warehouseSelect,
      productButton,
      productModal,
      statCardsWrapper,
      chartsWrapper,
      promoTable,
      filterContainer,
      statCardCount,
      getChartTitles,
    } = currentPage;
    await expect(domainTypeSelect).toBeVisible();
    await expect(citySelect).toBeVisible();
    await expect(integrationTypeSelect).toBeVisible();
    await expect(deliveryTypeSelect).toBeVisible();
    await expect(warehouseSelect).toBeVisible();
    await expect(warehouseSelect).toBeDisabled();

    await waitForAsyncSelectListToLoad({ pageInstance: currentPage.page, inputElem: domainTypeSelect, text: 'GetirMore' });
    await waitForAsyncSelectListToLoad({ pageInstance: currentPage.page, inputElem: domainTypeSelect, text: 'GetirWater' });

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: domainTypeSelect,
      search: 'Getir10',
    });

    // select n11 and clear it
    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: integrationTypeSelect,
      search: 'n11',
    });
    await getClearButtonOfSelect({ inputElem: integrationTypeSelect }).click();
    await waitForSelectToBeCleared({ inputElem: integrationTypeSelect });

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: deliveryTypeSelect,
      search: 'Scheduled',
    });
    await getClearButtonOfSelect({ inputElem: deliveryTypeSelect }).click();
    await waitForSelectToBeCleared({ inputElem: deliveryTypeSelect });

    // select the container which contains the placeholder
    const filterWrapper = filterContainer;

    // verify all input fields are visible by checking their placeholders
    await getInputByPlaceholder({ containerInstance: filterWrapper, placeholder: 'Integration Type' });
    await getInputByPlaceholder({ containerInstance: filterWrapper, placeholder: 'Delivery Type' });
    await getInputByPlaceholder({ containerInstance: filterWrapper, placeholder: 'City' });
    await getInputByPlaceholder({ containerInstance: filterWrapper, placeholder: 'Warehouse' });

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: citySelect,
      search: 'Istanbul',
    });
    // after city selection, warehouse filter should be enabled
    await expect(warehouseSelect).toBeEnabled();
    await getClearButtonOfSelect({ inputElem: citySelect }).click();
    await waitForSelectToBeCleared({ inputElem: citySelect });
    await expect(warehouseSelect).toBeDisabled();

    // partial search for Ankara
    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: citySelect,
      search: /Ankar/,
    });
    await expect(warehouseSelect).toBeEnabled();
    // select more than one warehouse (Beypazarı and Ponçik :) ) and clear them
    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: warehouseSelect,
      search: /Beypazar/,
    });
    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: warehouseSelect,
      search: /Ponçi/,
    });
    await getClearButtonOfSelect({ inputElem: warehouseSelect }).click();
    await waitForSelectToBeCleared({ inputElem: warehouseSelect });

    // open product modal
    await expect(productButton).toBeVisible();
    await productButton.click();
    // search for a product and select it
    // go to the marketProduct/detail page and come back to active orders summary page
    await expect(productModal.getByPlaceholder('Search')).toBeVisible();
    // TODO: use mock product data to search for a product
    await productModal.getByPlaceholder('Search').fill('Alpro');
    await expect(productModal.locator('.ant-table-cell').getByText('Alpro')).toBeVisible();
    await productModal.locator('.ant-table-cell').getByText('Alpro').click();
    await currentPage.page.waitForURL('**/marketProduct/detail/**');
    await currentPage.page.goBack();

    // open product modal again and close it
    await expect(productButton).toBeVisible();
    await productButton.click();
    await expect(productModal.getByPlaceholder('Search')).toBeVisible();
    await currentPage.page.getByLabel('Close', { exact: true }).click();
    await expect(productModal.getByPlaceholder('Search')).not.toBeVisible();

    // check the stat card
    await expect(statCardsWrapper).toBeVisible();
    const activeOrdersStatCard = currentPage.statCardsWrapperText({ text: 'Active Orders' });
    await expect(activeOrdersStatCard).toBeVisible();
    const scheduledOrdersStatCard = currentPage.statCardsWrapperText({ text: 'Scheduled Only' });
    await expect(scheduledOrdersStatCard).toBeVisible();
    const totalDiscountStatCard = currentPage.statCardsWrapperText({ text: 'Total Discount' });
    await expect(totalDiscountStatCard).toBeVisible();

    await statCardCount;
    await expect(statCardsWrapper.locator('text=Avg. Discount')).toBeVisible();
    await expect(statCardsWrapper.locator('text=Avg. Basket')).toBeVisible();

    // check the charts and their titles respectively
    await getChartTitles;

    // table header titles
    const expectedTableTitles = [
      '#', 'Promo Code', 'Promo Type', 'Warehouse Count', 'Total Discount (₺)',
      'Avg. Discount (₺)', 'Avg. Basket (₺)', 'Order Count', 'Action',
    ];

    await expect(async () => {
      const tableTitles = await getTableHeaderColumnTitles({ containerElement: promoTable });
      expect(expectedTableTitles).toEqual(tableTitles);
    }).toPass({ timeout: TIMEOUT_MS });

    // check Order Count column is sorted in descending order by default
    await expectTableHeaderToBeSorted({
      header: promoTable,
      title: 'Order Count',
      sortDirection: 'descending',
    });

    // check total sorters count
    await expectTableSortersCountToBe({ table: promoTable, sortCount: 7 });
    // check columns do not have sorter
    await expectTableCellNotToHaveSorter({
      table: promoTable,
      title: '#',
    });
    await expectTableCellNotToHaveSorter({
      table: promoTable,
      title: 'Action',
    });

    // when clicking the detail button, it should navigate to the promo detail page in new tab
    const popupPromise = currentPage.page.waitForEvent('popup');
    // TODO: use mock data to select a promo
    const detailButton = currentPage.getOnePromoDetailButtonFromTable({ promoName: 'MULTI1' });
    await detailButton.click();
    const popup = await popupPromise;
    await expect(popup.getByText('Promo Detail')).toBeVisible();
    await popup.close();
  });
});
