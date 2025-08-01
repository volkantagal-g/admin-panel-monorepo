import { test as base, expect } from '@e2e/fixtures/Basic';

import { ActiveOrdersForOperationPage } from './_page';
import { mockWarehouses } from '@e2e/common/apiMocking';
import {
  mockGetActiveOrdersForOperationResponse,
  getActiveOrdersForOperationUrlPattern,
} from '../apiMocking';

type Fixture = {
  activeOrdersForOperationPage: ActiveOrdersForOperationPage;
};

const TIMEOUT_MS = 10000;
export const test = base.extend<Fixture>({
  activeOrdersForOperationPage: async ({ page }, use): Promise<void> => {
    const pageWrapper = new ActiveOrdersForOperationPage(page);
    await mockGetActiveOrdersForOperationResponse(page);
    await mockWarehouses(page);

    const ordersPromise = page.waitForResponse(getActiveOrdersForOperationUrlPattern, { timeout: TIMEOUT_MS });
    await pageWrapper.navigateTo();
    await ordersPromise;

    expect(await pageWrapper.getPageTitle()).toContain('Active Orders - Operation');
    await use(pageWrapper);
  },
});

export { expect } from '@e2e/fixtures/Basic';
