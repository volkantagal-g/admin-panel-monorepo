import { type Page } from 'playwright';

import { TEST_ID } from '@app/pages/MarketOrderAnalytics/ActiveOrdersForOperation/constants';

const BASE_PATH = '/marketOrderAnalytics/activeOrdersForOperation';

export class ActiveOrdersForOperationPage {
  readonly page: Page;

  readonly url = BASE_PATH;

  constructor(page: Page) {
    this.page = page;
  }

  navigateTo() {
    return this.page.goto(this.url);
  }

  async getPageTitle() {
    return this.page.title();
  }

  close() {
    return this.page.close();
  }

  // Filters
  get domainTypeSelect() {
    return this.page.getByTestId(TEST_ID.FILTERS.SELECT_DOMAIN_TYPE).locator('input');
  }

  get integrationTypeSelect() {
    return this.page.getByTestId(TEST_ID.FILTERS.SELECT_INTEGRATION_TYPES).locator('input');
  }

  get citySelect() {
    return this.page.getByTestId(TEST_ID.FILTERS.SELECT_CITY).locator('input');
  }

  get fieldManagerSelect() {
    return this.page.getByTestId(TEST_ID.FILTERS.SELECT_FIELD_MANAGER).locator('input');
  }

  get courierSelect() {
    return this.page.getByTestId(TEST_ID.FILTERS.SELECT_COURIER_FILTER).locator('input');
  }

  get warehouseSelect() {
    return this.page.getByTestId(TEST_ID.FILTERS.SELECT_WAREHOUSE).locator('input');
  }

  get orderStatusSelect() {
    return this.page.getByTestId(TEST_ID.FILTERS.SELECT_ORDER_STATUS).locator('input');
  }

  get orderStatusesSelectAllButton() {
    return this.page.getByRole('button', { name: 'Select All' });
  }

  get orderStatusSelectClearButton() {
    return this.page.getByTestId(TEST_ID.FILTERS.SELECT_ORDER_STATUS).locator('.ant-select-clear');
  }

  get durationInput() {
    return this.page.getByTestId(TEST_ID.FILTERS.INPUT_ORDER_STATUS_MORE_THAN);
  }

  get applyFiltersButton() {
    return this.page.getByTestId(TEST_ID.ACTIONS.APPLY_FILTERS);
  }

  // Table
  get orderTable() {
    return this.page.getByTestId(TEST_ID.TABLE.ORDER_TABLE);
  }

  get tableHeaders() {
    return this.page.locator('.ant-table-container .ant-table-header thead tr th:not(.ant-table-cell-scrollbar)').all();
  }

  get tableDataRows() {
    return this.page.locator('.ant-table-container .ant-table-tbody tr.ant-table-row').all();
  }

  // Stats Card
  get totalActiveOrderStatsCard() {
    return this.page.getByTestId(TEST_ID.STATS_CARD.TOTAL_ACTIVE_ORDER);
  }

  get promoCountStatsCard() {
    return this.page.getByTestId(TEST_ID.STATS_CARD.PROMO_COUNT);
  }

  get courierAssignedStatsCard() {
    return this.page.getByTestId(TEST_ID.STATS_CARD.COURIER_ASSIGNED);
  }

  get courierUnassignedStatsCard() {
    return this.page.getByTestId(TEST_ID.STATS_CARD.COURIER_UNASSIGNED);
  }

  get averageWeightShortStatsCard() {
    return this.page.getByTestId(TEST_ID.STATS_CARD.AVERAGE_WEIGHT_SHORT);
  }

  get averageVolumeShortStatsCard() {
    return this.page.getByTestId(TEST_ID.STATS_CARD.AVERAGE_VOLUME_SHORT);
  }
}
