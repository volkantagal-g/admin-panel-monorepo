import { test as base } from '@e2e/fixtures/Basic';

import { GrowthActiveOrdersPage } from './_page';

type Fixture = {
    growthActiveOrdersPage: GrowthActiveOrdersPage;
};

export const test = base.extend<Fixture>({
  growthActiveOrdersPage: async ({ page }, use) => {
    const growthActiveOrdersPage = new GrowthActiveOrdersPage(page);
    await growthActiveOrdersPage.navigateTo();
    await use(growthActiveOrdersPage);
  },

});

export { expect } from '@e2e/fixtures/Basic';
