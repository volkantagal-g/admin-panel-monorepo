import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const FILTER_FIELD_NAMES = {
  domainType: 'domainType',
  city: 'city',
  warehouses: 'warehouseIds',
  promo: 'promo',
  paymentType: 'paymentType',
  addressType: 'addressType',
  queueStatus: 'queueStatus',
  integrationTypes: 'integrationTypes',
  excludedIntegrationTypes: 'excludedIntegrationTypes',
  orderStatus: 'orderStatus',
  isSlottedDelivery: 'isSlottedDelivery',
};

export const PROMO_OPTIONS = {
  promo: 'promo',
  organic: 'organic',
};
// Unknown types are not filterable
export const UNKNOWN_TYPE = 'UNKNOWN_TYPE';
export const UNKNOWN_VALUE = 'UNKNOWN_VALUE';

export const INITIAL_STATE = {
  executiveStats: {
    data: null,
    isPending: false,
    error: null,
  },
  filters: {
    domainType: null,
    city: null,
    warehouseIds: [],
    integrationTypes: [],
    excludedIntegrationTypes: [],
    isSlottedDelivery: null,
  },
  chartFilters: {
    promo: null,
    paymentType: null,
    addressType: null,
    queueStatus: null,
    orderStatus: null,
  },
};

const getActiveOrdersExecutiveStatsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    executiveStats: {
      ...state.executiveStats,
      isPending: true,
    },
  };
};

const getActiveOrdersExecutiveStatsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    executiveStats: {
      ...state.executiveStats,
      isPending: false,
      data,
    },
  };
};

const getActiveOrdersExecutiveStatsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    executiveStats: {
      ...state.executiveStats,
      isPending: false,
      error,
    },
  };
};

const setFilter = (state = INITIAL_STATE, { filterName, value }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      [filterName]: value,
    },
  };
};

const setChartFilter = (state = INITIAL_STATE, { chartFilterName, value }) => {
  return {
    ...state,
    chartFilters: {
      ...state.chartFilters,
      [chartFilterName]: value,
    },
  };
};

const resetChartFilter = (state = INITIAL_STATE, { chartFilterName }) => {
  return {
    ...state,
    chartFilters: {
      ...state.chartFilters,
      [chartFilterName]: null,
    },
  };
};

const initPage = () => {
  return { ...INITIAL_STATE };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_ACTIVE_ORDERS_EXECUTIVE_STATS_REQUEST]: getActiveOrdersExecutiveStatsRequest,
  [Types.GET_ACTIVE_ORDERS_EXECUTIVE_STATS_SUCCESS]: getActiveOrdersExecutiveStatsSuccess,
  [Types.GET_ACTIVE_ORDERS_EXECUTIVE_STATS_FAILURE]: getActiveOrdersExecutiveStatsFailure,
  [Types.SET_FILTER]: setFilter,
  [Types.SET_CHART_FILTER]: setChartFilter,
  [Types.RESET_CHART_FILTER]: resetChartFilter,
  [Types.INIT_PAGE]: initPage,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
