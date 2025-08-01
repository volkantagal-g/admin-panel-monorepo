import { test as base, expect } from '@e2e/fixtures/Basic';
import { ReportTypesPage } from './_page';

type Fixture = {
  reportTypesPage: ReportTypesPage;
}
export const test = base.extend<Fixture>({
  reportTypesPage: async ({ page }, use) => {
    const reportTypesPage = new ReportTypesPage(page);
    await reportTypesPage.navigateTo();
    await expect(async () => {
      expect(await reportTypesPage.getPageTitle).toContain('Report Types');
    }).toPass({ timeout: 15000 });
    await use(reportTypesPage);
  },
});
export { expect } from '@e2e/fixtures/Basic';
