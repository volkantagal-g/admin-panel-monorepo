import { test as base } from '@e2e/fixtures/Basic';

import { ReportsPage, ReportTagsPage, ReportTypesPage } from './_page';

type Fixture = {
  reportsPage: ReportsPage;
  reportTypesPage: ReportTypesPage;
  reportTagsPage: ReportTagsPage;
};

export const test = base.extend<Fixture>({
  reportsPage: async ({ page }, use) => {
    const reportsPage = new ReportsPage(page);
    await reportsPage.navigateTo();

    await use(reportsPage);
  },
  reportTypesPage: async ({ page }, use) => {
    const reportTypesPage = new ReportTypesPage(page);
    await reportTypesPage.navigateTo();

    await use(reportTypesPage);
  },
  reportTagsPage: async ({ page }, use) => {
    const reportTagsPage = new ReportTagsPage(page);
    await reportTagsPage.navigateTo();

    await use(reportTagsPage);
  },
});

export { expect } from '@e2e/fixtures/Basic';
