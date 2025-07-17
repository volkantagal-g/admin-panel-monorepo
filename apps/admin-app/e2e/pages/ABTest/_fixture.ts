import { test as base } from '@e2e/fixtures/Basic';

import { ABTestPage } from './_page';

type Fixture = {
  abTestPage: ABTestPage;
};

export const test = base.extend<Fixture>({
  abTestPage: async ({ page }, use) => {
    const abTestPage = new ABTestPage(page);
    await abTestPage.navigateTo();

    await use(abTestPage);
  },
});

export { expect } from '@e2e/fixtures/Basic';
