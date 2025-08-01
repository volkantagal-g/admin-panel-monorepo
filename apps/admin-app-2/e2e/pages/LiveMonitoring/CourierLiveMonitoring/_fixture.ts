import { test as base, expect } from '@e2e/fixtures/Basic';

import { CourierLiveMonitoring } from './_page';

type Fixture = {
  courierLiveMonitoringPage: CourierLiveMonitoring;
}
export const test = base.extend<Fixture>({
  courierLiveMonitoringPage: async ({ page }, use): Promise<void> => {
    const courierLiveMonitoringPage = new CourierLiveMonitoring(page);
    await courierLiveMonitoringPage.navigateTo();
    await expect(async () => {
      expect(await courierLiveMonitoringPage.getPageTitle).toContain('Courier Status Monitoring');
    }).toPass({ timeout: 15000 });
    await use(courierLiveMonitoringPage);
  },
});
export { expect } from '@e2e/fixtures/Basic';
