import { test as base } from '@e2e/fixtures/Basic';

import { CSActiveOrdersPage } from './_page';

type Fixture = {
    csActiveOrdersPage: CSActiveOrdersPage;
};

export const test = base.extend<Fixture>({
  csActiveOrdersPage: async ({ page }, use) => {
    const csActiveOrdersPage = new CSActiveOrdersPage(page);
    await csActiveOrdersPage.navigateTo();

    await use(csActiveOrdersPage);
  },

});

export { expect } from '@e2e/fixtures/Basic';
