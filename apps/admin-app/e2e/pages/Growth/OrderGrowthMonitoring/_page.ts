import { type Page } from '@playwright/test';

const BASE_PATH = '/orderGrowthMonitoring';

export class OrderGrowthMonitoringPage {
  readonly page: Page;

  readonly url = BASE_PATH;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto(this.url);
  }

  getSelectInputById(testId: string) {
    return this.page.getByTestId(testId);
  }

  getTimerInput() {
    return this.getSelectInputById('timer');
  }

  getCountdownInput() {
    return this.getSelectInputById('countdown');
  }

  getCityInput() {
    return this.getSelectInputById('city');
  }

  getDomainTypeInput() {
    return this.getSelectInputById('domainType');
  }

  getWarehouseInput() {
    return this.getSelectInputById('warehouse');
  }
}
