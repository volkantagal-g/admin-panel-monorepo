import { type Locator, type Page } from '@playwright/test';

import { TEST_ID } from '@app/pages/Report/Reports/testing';

const BASE_PATH = '/reports';

export class ReportsPage {
  readonly page: Page;

  readonly url = BASE_PATH;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto(this.url);
  }

  get pageTitle(): Promise<string> {
    return this.page.title();
  }

  get createReportPanel(): Locator {
    return this.page.getByTestId(TEST_ID.CREATE_REPORT_PANEL_WRAPPER);
  }

  get createReportPanelCollapseContent(): Locator {
    return this.createReportPanel.locator('.ant-collapse-content');
  }

  get createReportPanelCollapseButton(): Locator {
    return this.createReportPanel.locator('[role="button"].ant-collapse-header');
  }

  get filterPanelWrapper(): Locator {
    return this.page.getByTestId(TEST_ID.FILTER_PANEL_WRAPPER);
  }

  get filterPanelCollapseButton(): Locator {
    return this.filterPanelWrapper.locator('[role="button"].ant-collapse-header');
  }

  get filterPanelCollapseContent(): Locator {
    return this.filterPanelWrapper.locator('.ant-collapse-content');
  }

  get dateRangeFilter(): Locator {
    return this.page.getByTestId(TEST_ID.DATE_RANGE_SELECT);
  }

  get dateRangeDropdown(): Locator {
    return this.page.locator('.ant-picker-dropdown-range');
  }

  get listingTypeFilter(): Locator {
    return this.page.getByLabel('Listing Type', { exact: true });
  }

  get applyFilterButton(): Locator {
    return this.page.getByRole('button', { name: 'Apply', exact: true });
  }

  get paginationSelectInput(): Locator {
    return this.page.locator('.limitSelectBox-0-2-71');
  }

  get paginationPageNumberInput(): Locator {
    return this.page.locator('.ant-pagination-simple-pager').locator('input');
  }

  get paginationLimitValue(): Locator {
    return this.paginationSelectInput.locator('span.ant-select-selection-item');
  }

  paginationLimitSelectInput = ({ limit }: {limit: string}): Locator => {
    return this.page.locator('.ant-select-item-option').getByText('25');
  };

  getReportTypeSelectInput() {
    return this.page.getByLabel('Report Type');
  }

  getReportTypeCreateButton() {
    return this.page.getByRole('button', { name: 'Create', exact: true });
  }
}

export class ReportNewPage {
  readonly page: Page;

  readonly url = `${BASE_PATH}/new/:reportTypeId`;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto(this.url);
  }

  getNameTRInput() {
    return this.page.getByLabel('Name (TR)');
  }

  getNameENInput() {
    return this.page.getByLabel('Name (EN)');
  }

  getStayInPageCheckbox() {
    return this.page.getByLabel('Stay in the page');
  }

  getCreateReportButton() {
    // span inside a button, containing text 'Create'
    return this.page.locator('//button/span[text()="Create"]');
  }

  getPageDescription() {
    return this.page.getByText('Description: ');
  }
}

export class ReportTypesPage {
  readonly page: Page;

  readonly url = `${BASE_PATH}/types`;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto(this.url);
  }
}

export class ReportTagsPage {
  readonly page: Page;

  readonly url = `${BASE_PATH}/tags`;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto(this.url);
  }
}
