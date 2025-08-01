import { test as base } from '@playwright/test';

// we know we provided a baseURL, so we can safely assume it exists
type BaseFixture = {
  baseURL: string;
}

export const test = base.extend<BaseFixture>({
  page: async ({ page }, use) => {
    await use(page);
    await page.close();
  },
});

export { expect } from '@playwright/test';
