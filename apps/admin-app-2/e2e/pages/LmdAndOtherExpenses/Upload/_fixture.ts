import { test as base } from '@e2e/fixtures/Basic';
import { LmdAndOtherExpensesUploadPage } from './_page';

type Fixture = {
  lmdAndOtherExpensesUploadPage: LmdAndOtherExpensesUploadPage;
};

// This is the fixture definition
export const test = base.extend<Fixture>({
  lmdAndOtherExpensesUploadPage: async ({ page }, use) => {
    // Before each test, these will run
    const lmdAndOtherExpensesUploadPage = new LmdAndOtherExpensesUploadPage(page);
    await lmdAndOtherExpensesUploadPage.navigateTo();

    // this is where the test will run
    await use(lmdAndOtherExpensesUploadPage);
  },
});

export { expect } from '@e2e/fixtures/Basic';
