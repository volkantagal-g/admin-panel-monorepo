import { test as base } from '@e2e/fixtures/Basic';

import { OrderGrowthMonitoringPage } from './_page';

type Fixture = {
  orderGrowthMonitoringPage: OrderGrowthMonitoringPage;
};

export const test = base.extend<Fixture>({
  orderGrowthMonitoringPage: async ({ page }, use) => {
    const orderGrowthMonitoringPage = new OrderGrowthMonitoringPage(page);
    await orderGrowthMonitoringPage.navigateTo();

    await use(orderGrowthMonitoringPage);
  },
});

export { expect } from '@e2e/fixtures/Basic';
