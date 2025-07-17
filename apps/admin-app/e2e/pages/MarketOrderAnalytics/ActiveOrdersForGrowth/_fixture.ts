import { test as base, expect } from '@e2e/fixtures/Basic';

import { ActiveOrdersForGrowthPage } from './_page';
import { mockIntegrationTypeResponseForAvailable } from '../apiMocking';
import { mockWarehouses } from '@e2e/common/apiMocking';

type Fixture = {
  activeOrdersForGrowthPage: ActiveOrdersForGrowthPage
}

export const test = base.extend<Fixture>({
  activeOrdersForGrowthPage: async ({ page }, use): Promise<void> => {
    const activeOrdersForGrowthPage = new ActiveOrdersForGrowthPage(page);
    await mockIntegrationTypeResponseForAvailable(page);
    await mockWarehouses(page);
    await activeOrdersForGrowthPage.navigateTo();
    await expect(async () => {
      expect(await activeOrdersForGrowthPage.pageTitle).toContain('Active Orders - Growth');
    }).toPass({ timeout: 10000 });
    await use(activeOrdersForGrowthPage);
  },
});

export { expect } from '@e2e/fixtures/Basic';
