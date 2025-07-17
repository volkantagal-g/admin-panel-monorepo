import { type Page } from '@playwright/test';

const BASE_PATH = '/marketOrderAnalytics/activeOrdersForGrowth?country=tr';

export class GrowthActiveOrdersPage {
  readonly page: Page;

  readonly url = BASE_PATH;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto(this.url);
  }

  domainTypeFilter() {
    return this.page.locator('.ant-typography').filter({ hasText: 'Getir10' });
  }

  integrationTypeFilter() {
    return this.page.locator('.ant-select-selection-overflow-item.ant-select-selection-overflow-item-suffix').first();
  }

  cityWarehouseDependency() {
    return this.page.locator('.ant-typography').locator('text=Dependent');
  }

  citiesFilter() {
    return this.page.locator('div:nth-child(4) > .ant-select > .ant-select-selector > .ant-select-selection-overflow');
  }

  warehouseFilter() {
    return this.page.locator('#rc_select_3');
  }

  promosFilter() {
    return this.page.locator('div:nth-child(6) > .ant-select > .ant-select-selector > .ant-select-selection-overflow');
  }

  paymentMethodFilter() {
    return this.page.locator('div:nth-child(7) > .ant-select > .ant-select-selector > .ant-select-selection-overflow');
  }

  applyButton() {
    return this.page.getByRole('button', { name: 'Apply' });
  }

  detailButton() {
    return this.page.locator('tbody > tr.ant-table-row.ant-table-row-level-0.firstRow > td:nth-child(19) > button > a');
  }

  rightButton() {
    return this.page.locator('data-icon').filter({ hasText: 'right' });
  }

  // payment and warehouse rows in the order table
  paymentRowinOrderTable() {
    return this.page.locator('.ant-table-row > td:nth-child(10)').first();
  }

  warehouseRowinOrderTable() {
    return this.page.locator('.ant-table-row > td:nth-child(9)').first();
  }
}
