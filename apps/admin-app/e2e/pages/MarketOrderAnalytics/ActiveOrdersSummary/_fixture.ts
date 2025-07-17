import { test as base, expect } from '@e2e/fixtures/Basic';
import { mockIntegrationTypeResponseForAvailable } from '../apiMocking';
import { mockWarehouses } from '@e2e/common/apiMocking';

import { ActiveOrdersSummary } from './_page';

type Fixture = {
  activeOrdersSummaryPage: ActiveOrdersSummary;
}
export const test = base.extend<Fixture>({
  activeOrdersSummaryPage: async ({ page }, use): Promise<void> => {
    const activeOrdersSummaryPage = new ActiveOrdersSummary(page);
    await mockIntegrationTypeResponseForAvailable(page);
    await mockWarehouses(page);
    await activeOrdersSummaryPage.navigateTo();
    await expect(async () => {
      expect(await activeOrdersSummaryPage.getPageTitle).toContain('Active Orders - Summary');
    }).toPass({ timeout: 15000 });
    await use(activeOrdersSummaryPage);
  },
});
export { expect } from '@e2e/fixtures/Basic';
