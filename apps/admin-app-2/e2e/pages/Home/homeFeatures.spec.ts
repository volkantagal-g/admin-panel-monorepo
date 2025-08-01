import { SQUAD_BRANCH_NAME_TO_TAG } from 'internals/constants/squadShortNames';
import { test, expect } from './_fixture';
import { TEST_TAG } from 'internals/constants/testTag';

test.describe(`${SQUAD_BRANCH_NAME_TO_TAG.CRPL} Home page`, () => {
  test(
    `should display Search + Page Info + Türkçeye Geç + Turkey + Profile buttons ${TEST_TAG.SMOKE}`,
    async ({ homePage, adminPanel }) => {
      await homePage.page.waitForFunction(() => document.title === 'Home Page - Getir');
      expect(await homePage.getTitle()).toBe('Home Page - Getir');

      const pageHeader = homePage.getHeader();
      await expect(pageHeader).toContainText('Welcome to the Admin Panel Home Page');

      const adminHeader = adminPanel.getHeader();
      const generalSearch = adminPanel.getGeneralSearch();
      const pageInfoButton = adminPanel.getPageInfoButton();
      const languageSwitchButton = await adminPanel.getLanguageSwitchButton();
      const countrySelector = adminPanel.getCountrySelectionDropdownButton();
      const profileButton = adminPanel.getProfileButton();

      const items = [adminHeader, generalSearch, pageInfoButton, languageSwitchButton, countrySelector, profileButton];

      // make sure they are visible
      for (const item of items) {
        await expect(item).toBeVisible();
      }

      const someCountries = ['Turkey', 'Germany', 'United Kingdom'];
      await countrySelector.click();

      const dropdownMenu = adminPanel.getCountrySelectionDropdownContainer();

      // make sure countries are visible in dropdown
      for (const country of someCountries) {
        const countryMenuItem = dropdownMenu.getByRole('menuitem', { name: country });

        await expect(countryMenuItem).toBeVisible();
      }

      // to close dropdown
      await countrySelector.click();

      await adminPanel.changeCountry('Germany');

      // make sure country is changed
      const newCountrySelector = adminPanel.getCountrySelectionDropdownButton('Germany');
      await expect(newCountrySelector).toBeVisible();

      await adminPanel.changeLanguage('tr');
    },
  );
});
