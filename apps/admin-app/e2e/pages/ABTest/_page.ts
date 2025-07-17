import { type Page } from 'playwright';

import { generateRandomText } from '@e2e/common/stringUtils';
import { dummyWaitMS } from '../../common/promiseUtils';

export class ABTestPage {
  readonly page: Page;

  readonly url = '/abTesting/list?country=tr';

  constructor(page: Page) {
    this.page = page;
  }

  navigateTo() {
    return this.page.goto(this.url);
  }

  getAbTestCreateButton() {
    return this.page.getByRole('button', { name: 'Create', exact: true });
  }

  getTitle() {
    return this.page.title();
  }

  getHeader() {
    return this.page.locator('.ant-page-header');
  }

  close() {
    return this.page.close();
  }
}

export class ABTestNewPage {
  readonly page: Page;

  readonly url = '/abTesting/new?country=tr';

  constructor(page: Page) {
    this.page = page;
  }

  navigateTo() {
    return this.page.goto(this.url);
  }

  async abNewPageFormFill() {
    await this.page.locator('#testName').fill(`TestNameAuto-${generateRandomText(5)}`);
    await this.page.locator('#testDescription').fill('New Ab Test for Automation');
    await this.page.locator('#testCode').fill(`TestCodeAuto-${generateRandomText(5)}`);
  }

  // spac dosyasına ekle
  async dateInput() {
    await this.page.getByPlaceholder('Start date').click();
    await this.page.getByTitle('2024-01-07').click();
    await this.page.getByTitle('2024-03-02').click();
  }

  async dropdownInput() {
    await this.page.locator('#testType').click();
    await this.page.getByTitle('Template Search').click();
  }

  async dropdownInputTemplateSearch() {
    const templateInput = this.page.locator('#templateId');
    await templateInput.click();
    await templateInput.fill('test');
    // TODO: dummyWait'leri silelim
    await dummyWaitMS(3000);
    await templateInput.press('Enter');
  }

  async numberOfAudience() {
    const numberOfAudience = this.page.locator('#variationsCount');
    await numberOfAudience.click();
    await numberOfAudience.fill('2');
    await numberOfAudience.press('Enter');
  }

  // spec dosyasına yaz
  async groupNameFill() {
    await this.page.locator('#variations_0_variationName').fill('test1');
    await this.page.locator('#variations_0_variationDescription').fill('test1 desciription');
    await this.page.locator('#variations_1_variationName').fill('test2');
    await this.page.locator('#variations_1_variationDescription').fill('test2 description');
  }

  saveButton() {
    return this.page.getByRole('button', { name: 'Save', exact: true });
  }
}
