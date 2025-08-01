import { createReducer } from 'reduxsauce';

import { getSelectedDomainType } from '@shared/redux/selectors/common';
import { Types } from './actions';

const generateCustomInitialState = () => ({
  warehouseStats: {
    data: [],
    isPending: false,
    error: null,
  },
  orderPromoDistributionBetweenDates: {
    data: {},
    isPending: false,
    error: null,
  },
  redBasketCounts: {
    data: {},
    isPending: false,
    error: null,
  },
  rateCounts: {
    data: {},
    isPending: false,
    error: null,
  },
  filters: { selectedDomainType: getSelectedDomainType() },
});

export const INITIAL_STATE = generateCustomInitialState();

export const getWarehouseStatsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseStats: {
      ...INITIAL_STATE.warehouseStats,
      isPending: true,
    },
  };
};

export const getWarehouseStatsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouseStats: {
      ...INITIAL_STATE.warehouseStats,
      data,
      isPending: false,
    },
  };
};

export const getWarehouseStatsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseStats: {
      ...INITIAL_STATE.warehouseStats,
      isPending: false,
      data: {},
      error,
    },
  };
};

export const getOrderPromoDistributionBetweenDatesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderPromoDistributionBetweenDates: {
      ...INITIAL_STATE.orderPromoDistributionBetweenDates,
      isPending: true,
    },
  };
};

export const getOrderPromoDistributionBetweenDatesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    orderPromoDistributionBetweenDates: {
      ...INITIAL_STATE.orderPromoDistributionBetweenDates,
      data,
      isPending: false,
    },
  };
};

export const getOrderPromoDistributionBetweenDatesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderPromoDistributionBetweenDates: {
      ...INITIAL_STATE.orderPromoDistributionBetweenDates,
      isPending: false,
      error,
    },
  };
};

export const getRedBasketCountsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    redBasketCounts: {
      ...INITIAL_STATE.redBasketCounts,
      isPending: true,
    },
  };
};

export const getRedBasketCountsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    redBasketCounts: {
      ...INITIAL_STATE.redBasketCounts,
      data,
      isPending: false,
    },
  };
};

export const getRedBasketCountsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    redBasketCounts: {
      ...INITIAL_STATE.redBasketCounts,
      isPending: false,
      error,
    },
  };
};

export const getRateCountsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    rateCounts: {
      ...INITIAL_STATE.rateCounts,
      isPending: true,
    },
  };
};

export const getRateCountsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    rateCounts: {
      ...INITIAL_STATE.rateCounts,
      data: data.rate_stats,
      isPending: false,
    },
  };
};

export const getRateCountsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    rateCounts: {
      ...INITIAL_STATE.rateCounts,
      isPending: false,
      error,
    },
  };
};

export const setSelectedDomainType = (state = INITIAL_STATE, { selectedDomainType }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      selectedDomainType,
    },
  };
};

export const initAndDestroyPage = () => {
  return generateCustomInitialState();
};

export const HANDLERS = {
  [Types.GET_WAREHOUSE_STATS_REQUEST]: getWarehouseStatsRequest,
  [Types.GET_WAREHOUSE_STATS_SUCCESS]: getWarehouseStatsSuccess,
  [Types.GET_WAREHOUSE_STATS_FAILURE]: getWarehouseStatsFailure,
  [Types.GET_ORDER_PROMO_DISTRIBUTION_BETWEEN_DATES_REQUEST]: getOrderPromoDistributionBetweenDatesRequest,
  [Types.GET_ORDER_PROMO_DISTRIBUTION_BETWEEN_DATES_SUCCESS]: getOrderPromoDistributionBetweenDatesSuccess,
  [Types.GET_ORDER_PROMO_DISTRIBUTION_BETWEEN_DATES_FAILURE]: getOrderPromoDistributionBetweenDatesFailure,
  [Types.GET_RED_BASKET_COUNTS_REQUEST]: getRedBasketCountsRequest,
  [Types.GET_RED_BASKET_COUNTS_SUCCESS]: getRedBasketCountsSuccess,
  [Types.GET_RED_BASKET_COUNTS_FAILURE]: getRedBasketCountsFailure,
  [Types.GET_RATE_COUNTS_REQUEST]: getRateCountsRequest,
  [Types.GET_RATE_COUNTS_SUCCESS]: getRateCountsSuccess,
  [Types.GET_RATE_COUNTS_FAILURE]: getRateCountsFailure,
  [Types.SET_SELECTED_DOMAIN_TYPE]: setSelectedDomainType,
  [Types.INIT_PAGE]: initAndDestroyPage,
  [Types.DESTROY_PAGE]: initAndDestroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
