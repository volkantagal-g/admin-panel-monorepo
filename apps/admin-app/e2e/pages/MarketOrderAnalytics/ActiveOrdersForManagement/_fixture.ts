import { test as base, expect } from '@e2e/fixtures/Basic';

import { ActiveOrdersForManagementPage } from './_page';
import { mockWarehouses } from '@e2e/common/apiMocking';
import {
  mockGetActiveOrdersForManagementResponse,
  mockGetActiveOrdersExecutiveStatsManagementResponse, mockIntegrationTypeResponseForAvailable,
  getActiveOrdersExecutiveStatsManagementUrlPattern,
  getActiveOrdersForManagementUrlPattern,
} from '../apiMocking';

type Fixture = {
  activeOrdersForManagementPage: ActiveOrdersForManagementPage
}
const TIMEOUT_MS = 10000;
export const test = base.extend<Fixture>({
  activeOrdersForManagementPage: async ({ page }, use): Promise<void> => {
    const pageWrapper = new ActiveOrdersForManagementPage(page);
    await mockGetActiveOrdersForManagementResponse(page);
    await mockGetActiveOrdersExecutiveStatsManagementResponse(page);
    await mockIntegrationTypeResponseForAvailable(page);
    await mockWarehouses(page);
    const ordersPromise = page.waitForResponse(getActiveOrdersForManagementUrlPattern, { timeout: TIMEOUT_MS });
    const statsPromise = page.waitForResponse(getActiveOrdersExecutiveStatsManagementUrlPattern, { timeout: TIMEOUT_MS });
    await pageWrapper.navigateTo();
    await ordersPromise;
    await statsPromise;
    expect(await pageWrapper.getPageTitle()).toContain('Active Orders - Management');
    await use(pageWrapper);
  },
});

export { expect } from '@e2e/fixtures/Basic';
