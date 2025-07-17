import { test, expect } from './_fixture';

test.describe('Filtering Active Orders', () => {
// fill and list all parameter
  test('filling all filters and result(GetirMore)', async ({ growthActiveOrdersPage }) => {
    await expect(growthActiveOrdersPage.page.getByRole('button').filter({ hasText: 'Filter' })).toBeVisible();

    const domainType = growthActiveOrdersPage.domainTypeFilter();
    await expect(domainType).toBeVisible();

    const integrationType = growthActiveOrdersPage.integrationTypeFilter();
    await expect(integrationType).toBeVisible();

    const cityWhDepend = growthActiveOrdersPage.cityWarehouseDependency();
    await expect(cityWhDepend).toBeVisible();

    const cities = growthActiveOrdersPage.citiesFilter();
    await expect(cities).toBeVisible();
    await cities.click();
    await growthActiveOrdersPage.page.getByText('Istanbul').click();

    const warehouseType = growthActiveOrdersPage.warehouseFilter();
    await expect(warehouseType).toBeVisible();
    await warehouseType.click();

    await warehouseType.fill('cansu');
    await growthActiveOrdersPage.page.getByTitle('Cansu Depo').click();

    const promoType = growthActiveOrdersPage.promosFilter();
    await expect(promoType).toBeVisible();

    const paymentMethodType = growthActiveOrdersPage.paymentMethodFilter();
    await expect(paymentMethodType).toBeVisible();
    await paymentMethodType.click();
    await paymentMethodType.getByTitle('C. Card').locator('div').click();

    const apply = growthActiveOrdersPage.applyButton();
    await expect(apply).toBeVisible();
    await apply.click();

    await growthActiveOrdersPage.page.getByRole('button', { name: 'right Filter' }).click();

    const warehouseRow = growthActiveOrdersPage.warehouseRowinOrderTable();
    await expect(warehouseRow.getByText('Cansu Depo')).toBeVisible();

    const paymentRow = growthActiveOrdersPage.paymentRowinOrderTable();
    await expect(paymentRow.getByText('C. Card')).toBeVisible();

    // selected filters are removed and filtered
    await growthActiveOrdersPage.page.locator('#app').getByTitle('Istanbul').locator('svg').click();
    await growthActiveOrdersPage.page.getByLabel('close', { exact: true }).locator('svg').click();
    await growthActiveOrdersPage.page.getByRole('button', { name: 'Apply' }).click();
    await growthActiveOrdersPage.page.getByRole('button', { name: 'right Filter' }).click();

    // pagination:
    await growthActiveOrdersPage.page.getByTitle('10').click();
    await growthActiveOrdersPage.page.getByTitle('25').locator('div').click();
    await growthActiveOrdersPage.page.getByRole('button', { name: 'right', exact: true }).click();
    await growthActiveOrdersPage.page.getByRole('button', { name: 'left' }).click();

    const orderDetail = growthActiveOrdersPage.detailButton();
    await expect(orderDetail).toBeVisible();
    await orderDetail.click();
  });

  test('removed all filter and result all order', async ({ growthActiveOrdersPage, baseURL }) => {
    await expect(growthActiveOrdersPage.page.getByRole('button').filter({ hasText: 'Filter' })).toBeVisible();

    const domainType = growthActiveOrdersPage.domainTypeFilter();
    await expect(domainType).toBeVisible();

    const integrationType = growthActiveOrdersPage.integrationTypeFilter();
    await expect(integrationType).toBeVisible();

    const cityWhDepend = growthActiveOrdersPage.cityWarehouseDependency();
    await expect(cityWhDepend).toBeVisible();

    const cities = growthActiveOrdersPage.citiesFilter();
    await expect(cities).toBeVisible();
    await cities.click();

    const warehouseType = growthActiveOrdersPage.warehouseFilter();
    await expect(warehouseType).toBeVisible();

    const promoType = growthActiveOrdersPage.promosFilter();
    await expect(promoType).toBeVisible();

    const paymentMethodType = growthActiveOrdersPage.paymentMethodFilter();
    await expect(paymentMethodType).toBeVisible();

    const apply = growthActiveOrdersPage.applyButton();
    await expect(apply).toBeVisible();
    await apply.click();

    await growthActiveOrdersPage.page.getByRole('button', { name: 'right Filter' }).click();

    await growthActiveOrdersPage.page.locator('.ant-typography').locator('text=n11').isVisible();

    const orderDetail = growthActiveOrdersPage.detailButton();
    await expect(orderDetail).toBeVisible();
    await orderDetail.click();
  });

  // filter with integration type:
  test('n11 integration type', async ({ growthActiveOrdersPage, baseURL }) => {
    await expect(growthActiveOrdersPage.page.getByRole('button').filter({ hasText: 'Filter' })).toBeVisible();

    const domainType = growthActiveOrdersPage.domainTypeFilter();
    await expect(domainType).toBeVisible();

    const integrationType = growthActiveOrdersPage.integrationTypeFilter();
    await expect(integrationType).toBeVisible();
    await integrationType.click();
    await growthActiveOrdersPage.page.getByTitle('n11').click();

    const cityWhDepend = growthActiveOrdersPage.cityWarehouseDependency();
    await expect(cityWhDepend).toBeVisible();

    const cities = growthActiveOrdersPage.citiesFilter();
    await expect(cities).toBeVisible();
    await cities.click();

    const warehouseType = growthActiveOrdersPage.warehouseFilter();
    await expect(warehouseType).toBeVisible();

    const promoType = growthActiveOrdersPage.promosFilter();
    await expect(promoType).toBeVisible();

    const paymentMethodType = growthActiveOrdersPage.paymentMethodFilter();
    await expect(paymentMethodType).toBeVisible();

    const apply = growthActiveOrdersPage.applyButton();
    await expect(apply).toBeVisible();
    await apply.click();

    await growthActiveOrdersPage.page.getByRole('button', { name: 'right Filter' }).click();

    await growthActiveOrdersPage.page.locator('.ant-typography').locator('text=n11').isVisible();

    const orderDetail = growthActiveOrdersPage.detailButton();
    await expect(orderDetail).toBeVisible();
    await orderDetail.click();
  });
});
