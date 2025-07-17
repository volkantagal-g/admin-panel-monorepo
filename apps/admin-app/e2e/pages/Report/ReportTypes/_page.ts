import type { Page } from '@playwright/test';

import { TEST_ID_FOR_REPORT_TYPE } from '@app/pages/Report/constants';

const BASE_PATH = '/reports';

export class ReportTypesPage {
  readonly page: Page;

  readonly url = `${BASE_PATH}/types`;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto(this.url);
  }

  get getPageTitle(): Promise<string> {
    return this.page.title();
  }

  get getReportTagSelect() {
    return this.page.getByTestId(TEST_ID_FOR_REPORT_TYPE.reportTagSelect);
  }

  get getReportTypeTable() {
    return this.page.getByTestId(TEST_ID_FOR_REPORT_TYPE.reportTypeTable);
  }

  get getReportTypeNameSearch() {
    return this.page.getByPlaceholder('Search');
  }

  get getNewReportTypeButton() {
    return this.page.getByRole('button', { name: '+ New Report Type' });
  }

  get reportTypeDetailButton() {
    return this.page.getByRole('button', { name: 'Detail' });
  }

  getReportTypeTagElement({ tagName }: {tagName: string}) {
    return this.page.locator(`//div[@class="ant-select-selection-overflow-item"]//span[contains(@class, "ant-tag") and text()='${tagName}']`);
  }

  get getActiveButton() {
    return this.page.getByRole('checkbox', { name: 'Active' });
  }

  get getOptionalCheckbox() {
    return this.page.getByRole('checkbox', { name: 'Optional' });
  }

  get getEditButton() {
    return this.page.getByRole('button', { name: 'Edit' });
  }

  get getSaveButton() {
    return this.page.getByRole('button', { name: 'Save' });
  }

  get getAddParameterButton() {
    return this.page.getByRole('button', { name: '+ Add Parameter' });
  }

  get getParameterDeleteButton() {
    return this.page.getByRole('button', { name: 'close' }).nth(1);
  }

  get getDeleteButton() {
    return this.page.getByRole('button', { name: 'Delete' });
  }

  get getCancelButton() {
    return this.page.getByRole('button', { name: 'Cancel' });
  }

  get getCreateButton() {
    return this.page.getByRole('button', { name: 'Create' });
  }

  get getToastifyMessage() {
    return this.page.locator('.Toastify__toast-body');
  }

  get getReportTypeDeleteModalConfirmContent() {
    return this.page.locator('.ant-modal-confirm-content');
  }

  getReportTypeDeleteModalConfirmButton({ buttonName }: {buttonName: string}) {
    return this.page.locator('.ant-modal-body').getByRole('button', { name: `${buttonName}` });
  }

  getInput({ inputName }: {inputName: string}) {
    return this.page.getByLabel(inputName);
  }
}
