import { test as base, expect } from '@e2e/fixtures/Basic';

import { GetirMarketGrowthComparisonPage } from './_page';

type Fixture = {
    getirMarketGrowthComparisonPage: GetirMarketGrowthComparisonPage;
};

export const test = base.extend<Fixture>({
  getirMarketGrowthComparisonPage: async ({ page }, use) => {
    const getirMarketGrowthComparisonPage = new GetirMarketGrowthComparisonPage(page);
    // integration input depends
    const configWKeyPromise = page.waitForResponse(/marketConfig\/getConfigWKey/, { timeout: 10000 });
    await getirMarketGrowthComparisonPage.navigateTo();
    await configWKeyPromise;
    // wait for header GM Growth Comparison
    await expect(async () => {
      const header = getirMarketGrowthComparisonPage.pageHeader;
      await expect(header).toBeVisible();
    }).toPass({ timeout: 10000 });

    await use(getirMarketGrowthComparisonPage);
  },

});

export { expect } from '@e2e/fixtures/Basic';
