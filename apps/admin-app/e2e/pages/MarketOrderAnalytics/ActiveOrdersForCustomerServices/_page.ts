import { type Page } from '@playwright/test';

const BASE_PATH = '/marketOrderAnalytics/activeOrdersForCustomerServices?country=tr';

export class CSActiveOrdersPage {
  readonly page: Page;

  readonly url = BASE_PATH;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto(this.url);
  }

  get paginationNextButton() {
    return this.page.getByTitle('Next Page').getByRole('button', { name: 'right' });
  }

  get paginationPreviousButton() {
    return this.page.getByTitle('Next Page').getByRole('button', { name: 'left' });
  }

  get filterCollapsePanelButton() {
    return this.page.getByRole('button').filter({ hasText: 'Filter' });
  }

  get domainTypeSelect() {
    return this.page.getByLabel('Domain Type', { exact: true });
  }

  get integrationTypeSelect() {
    return this.page.getByLabel('Integration Type', { exact: true });
  }

  get deliveryTypeSelect() {
    return this.page.getByLabel('Delivery Type', { exact: true });
  }

  get citySelect() {
    return this.page.getByLabel('City', { exact: true });
  }

  get warehouseSelect() {
    return this.page.getByLabel('Warehouse', { exact: true });
  }

  get statusSelect() {
    return this.page.getByLabel('Status', { exact: true });
  }

  get courierNameSelect() {
    return this.page.getByLabel('Courier Name', { exact: true });
  }

  get filterApplyButton() {
    return this.page.getByText('Apply');
  }

  get statusClearButton() {
    return this.page.locator('.ant-select-clear').nth(3);
  }
}
