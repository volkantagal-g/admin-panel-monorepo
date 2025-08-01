import { type Page } from '@playwright/test';

import { TEST_ID } from '@app/pages/MarketOrderAnalytics/ActiveOrdersForManagement/testing';

const BASE_PATH = '/marketOrderAnalytics/activeOrdersForManagement';

export class ActiveOrdersForManagementPage {
  readonly page: Page;

  readonly url = BASE_PATH;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto(this.url);
  }

  async getPageTitle() {
    return this.page.title();
  }

  get domainTypeSelect() {
    // locator('input') because passing test-id to Select component only sets the wrapper div's test-id, so we need to get the input element inside that wrapper
    return this.page.getByTestId(TEST_ID.DOMAIN_TYPE_SELECT).locator('input');
  }

  get integrationTypeSelect() {
    return this.page.getByTestId(TEST_ID.INTEGRATION_TYPE_SELECT).locator('input');
  }

  get citySelect() {
    return this.page.getByTestId(TEST_ID.CITY_SELECT).locator('input');
  }

  get warehouseSelect() {
    return this.page.getByTestId(TEST_ID.WAREHOUSE_SELECT).locator('input');
  }

  get clientSelect() {
    return this.page.getByTestId(TEST_ID.CLIENT_SELECT).locator('input');
  }

  get orderStatusSelect() {
    return this.page.getByTestId(TEST_ID.ORDER_STATUS_SELECT).locator('input');
  }

  get deliveryTypeSelect() {
    return this.page.getByTestId(TEST_ID.DELIVERY_TYPE_SELECT).locator('input');
  }
}
