import { type Page, type Locator } from '@playwright/test';

import { TEST_ID } from '@app/pages/MarketOrderAnalytics/ActiveOrdersForGrowth/testing';

const BASE_PATH: string = '/marketOrderAnalytics/activeOrdersForGrowth';

export class ActiveOrdersForGrowthPage {
  readonly page: Page;

  readonly url: string = BASE_PATH;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.url);
  }

  get pageTitle(): Promise<string> {
    return this.page.title();
  }

  get filterPanelWrapper(): Locator {
    return this.page.getByTestId(TEST_ID.FILTER_WRAPPER);
  }

  get filterPanelCollapseButton(): Locator {
    return this.filterPanelWrapper.locator('[role="button"].ant-collapse-header');
  }

  get filterPanelCollapseContent(): Locator {
    return this.filterPanelWrapper.locator('.ant-collapse-content');
  }

  get domainTypeSelectComponent(): Locator {
    return this.filterPanelWrapper.getByLabel('Domain Type', { exact: true });
  }

  get integrationTypeSelectComponent(): Locator {
    return this.filterPanelWrapper.getByLabel('Integration Type', { exact: true });
  }

  get cityWarehouseDependencySelectComponent(): Locator {
    return this.filterPanelWrapper.getByLabel('City-warehouse dependency', { exact: true });
  }

  get citySelectComponent(): Locator {
    return this.filterPanelWrapper.getByLabel('Cities', { exact: true });
  }

  get csvUploadComponentOfCitySelectComponent(): Locator {
    return this.filterPanelWrapper.locator('label:has-text("Cities") input[type="file"] >> ..');
  }

  get cityDependentWarehouseSelectComponent(): Locator {
    return this.filterPanelWrapper.locator('#city-dependent-warehouse-select');
  }

  get csvUploadComponentOfCityDependentWarehouseSelectComponent(): Locator {
    return this.filterPanelWrapper.locator('label[for="city-dependent-warehouse-select"] input[type="file"] >> ..');
  }

  get cityIndependentWarehouseSelectComponent(): Locator {
    return this.filterPanelWrapper.locator('#city-independent-warehouse-select');
  }

  get csvUploadComponentOfCityIndependentWarehouseSelectComponent(): Locator {
    return this.filterPanelWrapper.locator('label[for="city-independent-warehouse-select"] input[type="file"] >> ..');
  }

  get promoSelectComponent(): Locator {
    return this.filterPanelWrapper.getByLabel('Promos', { exact: true });
  }

  get paymentMethodSelectComponent(): Locator {
    return this.filterPanelWrapper.getByLabel('Payment Method', { exact: true });
  }

  get filterApplyButton(): Locator {
    return this.filterPanelWrapper.getByRole('button', { name: 'Apply', exact: true });
  }

  get activeOrdersTable(): Locator {
    return this.page.getByTestId(TEST_ID.TABLE);
  }
}
