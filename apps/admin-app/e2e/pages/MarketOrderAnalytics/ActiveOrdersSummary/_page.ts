import { type Page, expect } from '@playwright/test';

import { TEST_ID } from '@app/pages/MarketOrderAnalytics/ActiveOrdersSummary/testing';

const BASE_PATH = '/marketOrderAnalytics/activeOrdersSummary';
export class ActiveOrdersSummary {
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

  get integrationTypeSelect() {
    return this.page.getByLabel('Integration Type');
  }

  get deliveryTypeSelect() {
    return this.page.getByLabel('Delivery Type');
  }

  get citySelect() {
    return this.page.getByLabel('City');
  }

  get warehouseSelect() {
    return this.page.getByLabel('Warehouse');
  }

  get productButton() {
    return this.page.getByRole('button', { name: 'Products' });
  }

  get productModal() {
    return this.page.locator('.ant-modal-body');
  }

  get statCardsWrapper() {
    return this.page.locator('xpath=//div[contains(@class, "statCards")]');
  }

  statCardsWrapperText({ text }: { text: string }) {
    return this.page.locator('xpath=//div[contains(@class, "statCards")]').locator(`text=${text}`);
  }

  get statCardCount() {
    return this.page.locator('xpath=//div[contains(@class, "statCards")]')
      .locator('xpath=//div[contains(@class, "statCard")]').getByText('TRY').count()
      .then(count => {
        expect(count).toBe(3);
      });
  }

  get chartsWrapper() {
    return this.page.locator('xpath=//div[contains(@class, "pieCharts")]');
  }

  get getChartTitles() {
    return expect(this.page.locator('xpath=//div[contains(@class, "pieCharts")]').locator('.highcharts-title'))
      .toHaveText(['PromoDistribution', 'Payment Type', 'Address Type', 'Promo Type', 'Total Discount', 'Queue Status', 'Order Status']);
  }

  get promoTable() {
    return this.page.getByTestId(TEST_ID.PROMO_TABLE);
  }

  getOnePromoDetailButtonFromTable({ promoName }: { promoName: string }) {
    return this.page.getByTestId(TEST_ID.PROMO_TABLE).getByRole('row', { name: `${promoName}` }).getByRole('button', { name: 'Detail' });
  }

  get filterContainer() {
    return this.page.locator('xpath=//div[contains(@class, "ant-collapse-content")]');
  }
}
