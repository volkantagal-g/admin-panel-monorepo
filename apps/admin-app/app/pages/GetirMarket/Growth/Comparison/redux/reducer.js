import { createReducer } from 'reduxsauce';
import moment from 'moment';

import { getStartMinOfCurrentHour } from '../utils';
import { START_DATE_RANGE, END_DATE_RANGE } from '../constants';

import { Types } from './actions';
import { getSelectedDomainType } from '@shared/redux/selectors/common';

const generateCustomInitialState = () => ({
  orderPromoDistribution: {
    data: [],
    isPending: false,
  },
  clientOrderCounts: {
    data: [],
    isPending: false,
  },
  newClientStats: {
    data: [],
    isPending: false,
  },
  warehouseStats: {
    data: [],
    isPending: false,
  },
  activeIntegrationTypes: {
    data: {},
    isPending: true,
  },
  filters: {
    domainType: getSelectedDomainType(),
    [START_DATE_RANGE]: [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
    [END_DATE_RANGE]: [moment().startOf('day'), moment().endOf('day')],
    timeRange: [0, getStartMinOfCurrentHour()],
    city: null,
    country: null,
    warehouse: null,
    integrationType: null,
  },
});

export const INITIAL_STATE = generateCustomInitialState();

const setFilters = (state = INITIAL_STATE, { params }) => ({
  ...state,
  filters: {
    ...state.filters,
    ...params,
  },
});

const getOrderPromoDistributionBetweenDatesRequest = (state = INITIAL_STATE) => ({
  ...state,
  orderPromoDistribution: {
    ...state.orderPromoDistribution,
    isPending: true,
  },
});

const getOrderPromoDistributionBetweenDatesSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  orderPromoDistribution: {
    ...state.orderPromoDistribution,
    data,
    isPending: false,
  },
});

const getOrderPromoDistributionBetweenDatesFailure = (state = INITIAL_STATE) => ({
  ...state,
  orderPromoDistribution: {
    ...state.orderPromoDistribution,
    isPending: false,
  },
});

const getClientOrderCountsRequest = (state = INITIAL_STATE) => ({
  ...state,
  clientOrderCounts: {
    ...state.clientOrderCounts,
    isPending: true,
  },
});

const getClientOrderCountsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  clientOrderCounts: {
    ...state.clientOrderCounts,
    data,
    isPending: false,
  },
});

const getClientOrderCountsFailure = (state = INITIAL_STATE) => ({
  ...state,
  clientOrderCounts: {
    ...state.clientOrderCounts,
    isPending: false,
  },
});

const getClientDownloadSignupStatsRequest = (state = INITIAL_STATE) => ({
  ...state,
  newClientStats: {
    ...state.newClientStats,
    isPending: true,
  },
});

const getClientDownloadSignupStatsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  newClientStats: {
    ...state.newClientStats,
    data,
    isPending: false,
  },
});

const getClientDownloadSignupStatsFailure = (state = INITIAL_STATE) => ({
  ...state,
  newClientStats: {
    ...state.newClientStats,
    isPending: false,
  },
});

const getWarehouseStatsRequest = (state = INITIAL_STATE) => ({
  ...state,
  warehouseStats: {
    ...state.warehouseStats,
    isPending: true,
  },
});

const getWarehouseStatsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  warehouseStats: {
    ...state.warehouseStats,
    data,
    isPending: false,
  },
});

const getWarehouseStatsFailure = (state = INITIAL_STATE) => ({
  ...state,
  warehouseStats: {
    ...state.warehouseStats,
    isPending: false,
  },
});

const getActiveIntegrationTypesConfigRequest = (state = INITIAL_STATE, { data = {} }) => ({
  ...state,
  activeIntegrationTypes: {
    isPending: true,
    data,
  },
});

const getActiveIntegrationTypesConfigSuccess = (state = INITIAL_STATE, { data = {} }) => ({
  ...state,
  activeIntegrationTypes: {
    isPending: false,
    data,
  },
});

const getActiveIntegrationTypesConfigFailure = (state = INITIAL_STATE) => ({
  ...state,
  activeIntegrationTypes: {
    ...state.activeIntegrationTypes,
    isPending: false,
  },
});

const clearStateData = (state = INITIAL_STATE, { stateKey, data = [] }) => ({
  ...state,
  [stateKey]: {
    ...state[stateKey],
    data,
    isPending: false,
  },
});

export const initAndDestroyPage = () => {
  return generateCustomInitialState();
};

export const HANDLERS = {
  [Types.GET_ORDER_PROMO_DISTRIBUTION_BETWEEN_DATES_REQUEST]: getOrderPromoDistributionBetweenDatesRequest,
  [Types.GET_ORDER_PROMO_DISTRIBUTION_BETWEEN_DATES_SUCCESS]: getOrderPromoDistributionBetweenDatesSuccess,
  [Types.GET_ORDER_PROMO_DISTRIBUTION_BETWEEN_DATES_FAILURE]: getOrderPromoDistributionBetweenDatesFailure,

  [Types.GET_CLIENT_ORDER_COUNTS_REQUEST]: getClientOrderCountsRequest,
  [Types.GET_CLIENT_ORDER_COUNTS_SUCCESS]: getClientOrderCountsSuccess,
  [Types.GET_CLIENT_ORDER_COUNTS_FAILURE]: getClientOrderCountsFailure,

  [Types.GET_CLIENT_DOWNLOAD_SIGNUP_STATS_REQUEST]: getClientDownloadSignupStatsRequest,
  [Types.GET_CLIENT_DOWNLOAD_SIGNUP_STATS_SUCCESS]: getClientDownloadSignupStatsSuccess,
  [Types.GET_CLIENT_DOWNLOAD_SIGNUP_STATS_FAILURE]: getClientDownloadSignupStatsFailure,

  [Types.GET_WAREHOUSE_STATS_REQUEST]: getWarehouseStatsRequest,
  [Types.GET_WAREHOUSE_STATS_SUCCESS]: getWarehouseStatsSuccess,
  [Types.GET_WAREHOUSE_STATS_FAILURE]: getWarehouseStatsFailure,

  [Types.GET_ACTIVE_INTEGRATION_TYPES_CONFIG_REQUEST]: getActiveIntegrationTypesConfigRequest,
  [Types.GET_ACTIVE_INTEGRATION_TYPES_CONFIG_SUCCESS]: getActiveIntegrationTypesConfigSuccess,
  [Types.GET_ACTIVE_INTEGRATION_TYPES_CONFIG_FAILURE]: getActiveIntegrationTypesConfigFailure,

  [Types.CLEAR_STATE_DATA]: clearStateData,
  [Types.SET_FILTERS]: setFilters,
  [Types.INIT_PAGE]: initAndDestroyPage,
  [Types.DESTROY_PAGE]: initAndDestroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
