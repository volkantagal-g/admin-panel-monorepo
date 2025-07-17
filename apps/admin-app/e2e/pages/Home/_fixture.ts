import { test as base } from '@e2e/fixtures/Basic';

import { HomePage } from './_page';

type Fixture = {
  homePage: HomePage;
};

// This is the fixture definition
export const test = base.extend<Fixture>({
  homePage: async ({ page }, use) => {
    // Before each test, these will run
    const homePage = new HomePage(page);
    await homePage.navigateTo();

    // this is where the test will run
    await use(homePage);

    // After each test, these will run
    // await logout(); // or something else you want to clean up
  },
});

export { expect } from '@e2e/fixtures/Basic';
