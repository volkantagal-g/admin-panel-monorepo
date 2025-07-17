import { test as base } from '@e2e/fixtures/NotLoggedIn';

import { LoginPage } from './_page';

type Fixture = {
  loginPage: LoginPage;
};

// This is the fixture definition
export const test = base.extend<Fixture>({
  loginPage: async ({ page }, use) => {
    // Before each test, these will run
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();

    // this is where the test will run
    await use(loginPage);
  },
});

export { expect } from '@e2e/fixtures/NotLoggedIn';
