import { type Page } from '@playwright/test';

const BASE_PATH = '/getirMarket/growth/comparison';

export class GetirMarketGrowthComparisonPage {
  readonly page: Page;

  readonly url = BASE_PATH;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto(this.url);
  }

  get pageHeader() {
    return this.page.locator('.ant-page-header-heading-title').locator('text=GM Growth Comparison');
  }

  get domainTypeSelect() {
    return this.page.locator('.ant-select').locator('text=Getir10');
  }

  get citySelect() {
    return this.page.locator('.ant-select-selection-placeholder').locator('text=City');
  }

  get integrationTypeSelect() {
    return this.page.locator('.ant-select-selection-placeholder').locator('text=Integration Type');
  }

  get warehouseSelect() {
    return this.page.locator('.ant-select-selection-placeholder').locator('text=Warehouse');
  }

  get todayButton() {
    return this.page.locator('.ant-btn').locator('text=Today');
  }
}
