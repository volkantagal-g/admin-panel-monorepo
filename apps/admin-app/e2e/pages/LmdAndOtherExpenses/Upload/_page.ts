import { type Page } from '@playwright/test';

const BASE_PATH: string = '/lmdAndOtherExpenses';

export class LmdAndOtherExpensesUploadPage {
  readonly page: Page;

  readonly url = `${BASE_PATH}/upload`;

  constructor(page: Page) {
    this.page = page;
  }

  get pageTitle(): Promise<string> {
    return this.page.title();
  }

  async navigateTo() {
    await this.page.goto(this.url);
  }

  get expenseTypeSelect() {
    return this.page.getByLabel('Expense Type');
  }

  get csvTemplateDownloadButton() {
    return this.page.getByRole('button', { name: 'Download Template' });
  }

  get csvUploadButton() {
    return this.page.getByRole('button', { name: 'Upload' });
  }

  get csvUploadModal() {
    return this.page.locator('div.ant-modal-content');
  }

  get csvUploadFileInput() {
    return this.page.locator('input[type="file"]');
  }

  get csvUploadModalChooseFileButton() {
    return this.page.getByRole('button', { name: 'Choose File' });
  }

  get csvUploadModalUploadButton() {
    return this.page.getByRole('button', { name: 'Upload', exact: true });
  }

  get csvUploadModalCancelButton() {
    return this.page.getByRole('button', { name: 'Cancel' });
  }

  get csvUploadModalInstructionsAlert() {
    return this.page.locator('.ant-alert-warning[role="alert"]');
  }

  get csvUploadModalInstructionsAlertDescription() {
    return this.page.locator('.ant-alert-warning[role="alert"]').locator('p');
  }

  get csvUploadModalInstructionsAlertItems() {
    return this.page.locator('.ant-alert-warning[role="alert"]').locator('li');
  }

  get csvUploadErrorAlert() {
    return this.page.locator('.ant-alert-error[role="alert"]');
  }

  get csvUploadErrorContentLocator() {
    return this.page.locator('.ant-alert-error[role="alert"] .ant-alert-description ul li');
  }
}
