import { type Page, expect } from '@playwright/test';

import { LanguageType } from '@e2e/types/panel';

export class PanelGeneral {
  readonly page: Page;

  readonly langEn = 'en';

  readonly langTr = 'tr';

  readonly defaultLanguage = this.langEn;

  constructor(page: Page) {
    this.page = page;
  }

  getHeader() {
    return this.page.locator('header');
  }

  async getCurrentLanguage() {
    // read selectedLanguage key from localStorage
    let currentLanguage = await this.page.evaluate(() => {
      return localStorage.getItem('selectedLanguage');
    });
    currentLanguage = currentLanguage || this.defaultLanguage;
    return JSON.parse(currentLanguage) || this.defaultLanguage;
  }

  getGeneralSearch(translatedText = 'search Search (ctrl + space)') {
    const header = this.getHeader();
    // Note: (ctrl + space) not shown on mobile
    return header.getByRole('button', { name: translatedText });
  }

  async getLanguageSwitchButton() {
    const header = this.getHeader();
    const currentLanguage = await this.getCurrentLanguage();
    const strToSearch = currentLanguage === this.langEn ? 'Türkçeye Geç EN' : 'Switch to English TR';
    return header.getByRole('button', { name: strToSearch });
  }

  getPageInfoButton(translatedText = 'Page Info') {
    const header = this.getHeader();
    return header.getByRole('button', { name: translatedText });
  }

  getCountrySelectionDropdownButton(currentCountryText = 'Turkey') {
    const header = this.getHeader();
    return header.getByRole('button', { name: currentCountryText });
  }

  getCountrySelectionDropdownContainer() {
    // TODO: not a good selector due to antd dropdown
    const dropdown = this.page.getByText('TurkeyUnited');
    return dropdown;
  }

  getProfileButton() {
    const header = this.getHeader();
    return header.getByRole('button', { name: 'Profile' });
  }

  getSidebar() {
    return this.page.locator('aside');
  }

  // TODO: better locator logic
  getSidebarItem(text: string) {
    const sidebar = this.getSidebar();
    return sidebar.locator(`text=${text}`);
  }

  // take care of language when providing the country string
  async changeCountry(country: string) {
    const dropdownButton = this.getCountrySelectionDropdownButton();
    await dropdownButton.click();
    const dropdownContainer = this.getCountrySelectionDropdownContainer();

    const countryItem = dropdownContainer.getByRole('menuitem', { name: country });
    await expect(countryItem).toBeVisible();

    await countryItem.click();
    // wait for refresh and reload
    await this.page.waitForLoadState();
  }

  async changeLanguage(toLang: LanguageType) {
    const currentLanguage = await this.getCurrentLanguage();
    if (currentLanguage === toLang) return;
    const langButton = await this.getLanguageSwitchButton();
    await langButton.click();
    // wait for page to reload
    await this.page.waitForLoadState();
  }
}
