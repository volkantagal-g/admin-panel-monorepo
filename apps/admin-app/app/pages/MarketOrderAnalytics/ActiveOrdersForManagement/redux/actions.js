import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.MARKET_ORDER_ANALYTICS.ACTIVE_ORDERS_FOR_MANAGEMENT}_`;
export const defaultRowsPerPage = 25;

export const { Types, Creators } = createActions(
  {
    getActiveOrdersRequest: { },
    getActiveOrdersSuccess: {
      data: {
        orders: [],
        count: 0,
      },
    },
    getActiveOrdersFailure: { error: null },
    getActiveOrderStatsRequest: { },
    getActiveOrderStatsSuccess: { data: {} },
    getActiveOrderStatsFailure: { error: null },
    setPagination: { currentPage: 1, rowsPerPage: defaultRowsPerPage },
    submitFilters: { filters: {} },
    setSortOptions: { sortOptions: {} },
    initPage: null,
    fetchInitialData: { canAccess: null },
    setIntegrationTypes: { integrationTypes: [] },
    setExcludedIntegrationTypes: { excludedIntegrationTypes: [] },
    destroyPage: null,
    clientSearchRequest: null,
    clientSearchSuccess: { data: {} },
    clientSearchFailure: { error: null },
    clientSearchCancel: null,
  },
  { prefix },
);
