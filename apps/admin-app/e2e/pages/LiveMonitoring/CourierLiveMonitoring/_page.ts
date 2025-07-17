import { type Page, expect } from '@playwright/test';

import { TEST_ID } from '@app/pages/LiveMonitoring/CourierLiveMonitoring/constants';

const BASE_PATH = '/courierStatusMonitoring';
export class CourierLiveMonitoring {
  readonly page: Page;

  readonly url = BASE_PATH;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo() {
    return this.page.goto(this.url);
  }

  get getPageTitle(): Promise<string> {
    return this.page.title();
  }

  get domainTypeSelect() {
    return this.page.getByLabel('Domain Type');
  }

  get citySelect() {
    return this.page.getByLabel('City');
  }

  get warehouseSelect() {
    return this.page.getByLabel('Warehouse');
  }

  get vehicleTypeSelect() {
    return this.page.getByLabel('Vehicle');
  }

  get courierStatusTable() {
    return this.page.getByTestId(TEST_ID.COURIER_STATUS_MONITORING);
  }

  get filterContainer() {
    return this.page.getByTestId(TEST_ID.FILTER_WRAPPER);
  }

  get tableBody() {
    return this.page.locator('tbody');
  }
}
