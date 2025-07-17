// Use this most of the time, user is logged in and country selection is done + navigated to home page
import { PanelGeneral } from '@e2e/pages/panelGeneral';
import { test as base } from './LoggedInAndCountrySelected';

type Fixture = {
  adminPanel: PanelGeneral;
};

export const test = base.extend<Fixture>({
  page: async ({ page }, use) => {
    await page.goto('/');
    await use(page);
  },
  // panel generic utils like changing country, changing language, etc
  adminPanel: async ({ page }, use) => {
    const panel = new PanelGeneral(page);
    await use(panel);
  },
});

export { expect } from './LoggedInAndCountrySelected';
