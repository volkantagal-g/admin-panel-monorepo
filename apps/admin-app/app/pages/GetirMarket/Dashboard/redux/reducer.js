import { createReducer } from 'reduxsauce';
import moment from 'moment-timezone';

import { DATE_TYPE } from '@shared/shared/constants';

import { Types } from './actions';
import { getInitialDateRanges } from '../utils';
import { getSelectedCountryTimezone, getSelectedDomainType } from '@shared/redux/selectors/common';

export const INITIAL_STATE = {
  filters: {
    selectedDomainType: getSelectedDomainType(),
    selectedCities: [],
    selectedHourRange: [0, 24],
    selectedDateRange: getInitialDateRanges(),
    selectedDivisionCountries: null,
    selectedDate: moment.tz(getSelectedCountryTimezone.getData()),
    dateType: DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_HOUR,
  },
  orderCountByBasketAmount: {
    data: null,
    isPending: false,
    error: null,
  },
  clientOrderCounts: {
    data: null,
    isPending: false,
    error: null,
  },
  financials: {
    data: null,
    isPending: false,
    error: null,
  },
  productAvailability: {
    isPending: false,
    error: null,
    data: {},
  },
  productSale: {
    isPending: false,
    error: null,
    data: {},
  },
  deviceStats: {
    data: [],
    isPending: false,
    error: null,
  },
  orderCardGroupDistribution: {
    data: [],
    isPending: false,
    error: null,
  },
  discountReasons: {
    data: [],
    isPending: false,
    error: null,
  },
  promoStatistics: {
    data: {},
    isPending: false,
    error: null,
  },
  clientRatings: {
    data: {},
    isPending: false,
    error: null,
  },
  orderTimeSeries: {
    data: null,
    isPending: false,
    error: null,
  },
  operationTimeSeries: {
    data: null,
    isPending: false,
    error: null,
  },
  durations: {
    data: null,
    isPending: false,
    error: null,
  },
  getirMarketWarehouseStats: {
    current: {
      data: {},
      isPending: false,
    },
    previous: { // This will be removed after summary endpoint implementation
      data: {},
      isPending: false,
    },
  },
  allDomainsSummary: {
    current: {
      warehouseData: {}, // This will be removed when new endpoints are available for food and locals. GetirMarket moved to getirMarketWarehouseStats object
      biTaksiData: {},
      waterMarketplaceData: {},
      moovData: {},
      locals: {},
      isPending: false,
      error: null,
    },
    previous: {
      warehouseData: {},
      biTaksiData: {},
      waterMarketplaceData: {},
      moovData: {},
      locals: {},
      isPending: false,
      error: null,
    },
  },
  dashboardComparisonStats: {
    data: [],
    isPending: false,
    error: null,
  },
  npsStats: {
    data: [],
    isPending: false,
  },
  npsConfig: {
    data: {},
    isPending: false,
  },
};

const setSelectedDomainType = (state = INITIAL_STATE, { selectedDomainType }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      selectedDomainType,
    },
  };
};

const setSelectedCities = (state = INITIAL_STATE, { selectedCities }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      selectedCities,
    },
  };
};

const setSelectedHourRange = (state = INITIAL_STATE, { selectedHourRange }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      selectedHourRange,
    },
  };
};

const setSelectedDateRange = (state = INITIAL_STATE, { selectedDateRange }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      selectedDateRange,
    },
  };
};

const setSelectedDate = (state = INITIAL_STATE, { selectedDate }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      selectedDate,
    },
  };
};

const setDateType = (state = INITIAL_STATE, { dateType }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      dateType,
    },
  };
};

const setSelectedDivisionCountries = (state = INITIAL_STATE, { selectedDivisionCountries }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      selectedDivisionCountries,
    },
  };
};

const getOrderCountByBasketAmountRequest = (state = INITIAL_STATE) => ({
  ...state,
  orderCountByBasketAmount: {
    ...INITIAL_STATE.orderCountByBasketAmount,
    isPending: true,
  },
});

const getOrderCountByBasketAmountSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  orderCountByBasketAmount: {
    ...state.orderCountByBasketAmount,
    isPending: false,
    data,
  },
});

const getOrderCountByBasketAmountFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  orderCountByBasketAmount: {
    ...state.orderCountByBasketAmount,
    isPending: false,
    error,
  },
});

const getClientOrderCountsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    clientOrderCounts: {
      ...INITIAL_STATE.clientOrderCounts,
      isPending: true,
    },
  };
};

const getClientOrderCountsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    clientOrderCounts: {
      ...state.clientOrderCounts,
      data,
      isPending: false,
    },
  };
};

const getClientOrderCountsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    clientOrderCounts: {
      ...state.clientOrderCounts,
      error,
      isPending: false,
    },
  };
};

const getFinancialsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    financials: {
      ...INITIAL_STATE.financials,
      isPending: true,
    },
  };
};

const getFinancialsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    financials: {
      ...state.financials,
      data,
      isPending: false,
    },
  };
};

const getFinancialsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    financials: {
      ...state.financials,
      error,
      isPending: false,
    },
  };
};

const getProductAvailabilityRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    productAvailability: {
      ...INITIAL_STATE.productAvailability,
      isPending: true,
    },
  };
};

const getOrderCardGroupDistributionRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderCardGroupDistribution: {
      ...INITIAL_STATE.orderCardGroupDistribution,
      isPending: true,
    },
  };
};

const getDeviceStatsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    deviceStats: {
      ...INITIAL_STATE.deviceStats,
      isPending: true,
    },
  };
};

const getProductAvailabilitySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    productAvailability: {
      ...state.productAvailability,
      data,
      isPending: false,
    },
  };
};

const getOrderCardGroupDistributionSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    orderCardGroupDistribution: {
      ...state.orderCardGroupDistribution,
      data,
      isPending: false,
    },
  };
};

const getDeviceStatsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    deviceStats: {
      ...state.deviceStats,
      data,
      isPending: false,
    },
  };
};

const getProductAvailabilityFailure = (state = INITIAL_STATE, error) => {
  return {
    ...state,
    productAvailability: {
      ...state.productAvailability,
      error,
      isPending: false,
    },
  };
};

const getProductSaleRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    productSale: {
      ...INITIAL_STATE.productSale,
      isPending: true,
    },
  };
};

const getProductSaleSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    productSale: {
      ...state.productSale,
      data,
      isPending: false,
    },
  };
};

const getProductSaleFailure = (state = INITIAL_STATE, error) => {
  return {
    ...state,
    productSale: {
      ...state.productSale,
      error,
      isPending: false,
    },
  };
};

const getDeviceStatsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    deviceStats: {
      ...state.deviceStats,
      error,
      isPending: false,
    },
  };
};

const getOrderCardGroupDistributionFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderCardGroupDistribution: {
      ...state.orderCardGroupDistribution,
      error,
      isPending: false,
    },
  };
};

const getDiscountReasonsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    discountReasons: {
      ...INITIAL_STATE.discountReasons,
      isPending: true,
    },
  };
};

const getDiscountReasonsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    discountReasons: {
      ...state.discountReasons,
      data,
      isPending: false,
    },
  };
};

const getDiscountReasonsFailure = (state = INITIAL_STATE, error) => {
  return {
    ...state,
    discountReasons: {
      ...state.discountReasons,
      error,
      isPending: false,
    },
  };
};

export const getOrderPromoDistributionBetweenDatesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    promoStatistics: {
      ...INITIAL_STATE.promoStatistics,
      isPending: true,
    },
  };
};

export const getOrderPromoDistributionBetweenDatesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    promoStatistics: {
      ...INITIAL_STATE.promoStatistics,
      data,
      isPending: false,
    },
  };
};

export const getOrderPromoDistributionBetweenDatesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    promoStatistics: {
      ...INITIAL_STATE.promoStatistics,
      isPending: false,
      error,
    },
  };
};

export const getClientRatingsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    clientRatings: {
      ...INITIAL_STATE.clientRatings,
      isPending: true,
    },
  };
};

export const getClientRatingsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    clientRatings: {
      ...INITIAL_STATE.clientRatings,
      data,
      isPending: false,
    },
  };
};

export const getClientRatingsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    clientRatings: {
      ...INITIAL_STATE.clientRatings,
      isPending: false,
      error,
    },
  };
};

export const getWarehouseStatsRequest = (state = INITIAL_STATE, { statsType }) => {
  return {
    ...state,
    allDomainsSummary: {
      ...state.allDomainsSummary,
      [statsType]: {
        ...INITIAL_STATE.allDomainsSummary[statsType],
        isPending: true,
      },
    },
  };
};

export const getWarehouseStatsSuccess = (state = INITIAL_STATE, { data, statsType }) => {
  return {
    ...state,
    allDomainsSummary: {
      ...state.allDomainsSummary,
      [statsType]: {
        ...state.allDomainsSummary[statsType],
        warehouseData: data,
        isPending: false,
      },
    },
  };
};

export const getWarehouseStatsFailure = (state = INITIAL_STATE, { error, statsType }) => {
  return {
    ...state,
    allDomainsSummary: {
      ...state.allDomainsSummary,
      [statsType]: {
        ...state.allDomainsSummary[statsType],
        isPending: false,
        error,
      },
    },
  };
};

export const getWarehouseStatsV2Request = (state = INITIAL_STATE, { statsType }) => {
  return {
    ...state,
    getirMarketWarehouseStats: {
      ...state.getirMarketWarehouseStats,
      [statsType]: {
        ...state.getirMarketWarehouseStats[statsType],
        isPending: true,
      },
    },
  };
};

export const getWarehouseStatsV2Success = (state = INITIAL_STATE, { data, statsType }) => {
  return {
    ...state,
    getirMarketWarehouseStats: {
      ...state.getirMarketWarehouseStats,
      [statsType]: {
        ...state.getirMarketWarehouseStats[statsType],
        data,
        isPending: false,
      },
    },
  };
};

export const getWarehouseStatsV2Failure = (state = INITIAL_STATE, { statsType }) => {
  return {
    ...state,
    getirMarketWarehouseStats: {
      ...state.getirMarketWarehouseStats,
      [statsType]: {
        ...state.getirMarketWarehouseStats[statsType],
        isPending: false,
        data: {},
      },
    },
  };
};

export const getBiTaksiStatsRequest = (state = INITIAL_STATE, { statsType }) => {
  return {
    ...state,
    allDomainsSummary: {
      ...state.allDomainsSummary,
      [statsType]: {
        ...INITIAL_STATE.allDomainsSummary[statsType],
        isPending: true,
      },
    },
  };
};

export const getBiTaksiStatsSuccess = (state = INITIAL_STATE, { data, statsType }) => {
  return {
    ...state,
    allDomainsSummary: {
      ...state.allDomainsSummary,
      [statsType]: {
        ...state.allDomainsSummary[statsType],
        biTaksiData: data,
      },
    },
  };
};

export const getBiTaksiStatsFailure = (state = INITIAL_STATE, { error, statsType }) => {
  return {
    ...state,
    allDomainsSummary: {
      ...state.allDomainsSummary,
      [statsType]: {
        ...state.allDomainsSummary[statsType],
        error,
      },
    },
  };
};

export const getWaterMarketplaceStatsRequest = (state = INITIAL_STATE, { statsType }) => {
  return {
    ...state,
    allDomainsSummary: {
      ...state.allDomainsSummary,
      [statsType]: {
        ...INITIAL_STATE.allDomainsSummary[statsType],
        isPending: true,
      },
    },
  };
};

export const getWaterMarketplaceStatsSuccess = (state = INITIAL_STATE, { data, statsType }) => {
  return {
    ...state,
    allDomainsSummary: {
      ...state.allDomainsSummary,
      [statsType]: {
        ...state.allDomainsSummary[statsType],
        waterMarketplaceData: data,
      },
    },
  };
};

export const getWaterMarketplaceStatsFailure = (state = INITIAL_STATE, { error, statsType }) => {
  return {
    ...state,
    allDomainsSummary: {
      ...state.allDomainsSummary,
      [statsType]: {
        ...state.allDomainsSummary[statsType],
        error,
      },
    },
  };
};

export const getMoovStatsRequest = (state = INITIAL_STATE, { statsType }) => {
  return {
    ...state,
    allDomainsSummary: {
      ...state.allDomainsSummary,
      [statsType]: {
        ...INITIAL_STATE.allDomainsSummary[statsType],
        isPending: true,
      },
    },
  };
};

export const getMoovStatsSuccess = (state = INITIAL_STATE, { data, statsType }) => {
  return {
    ...state,
    allDomainsSummary: {
      ...state.allDomainsSummary,
      [statsType]: {
        ...state.allDomainsSummary[statsType],
        moovData: data,
      },
    },
  };
};

export const getMoovStatsFailure = (state = INITIAL_STATE, { error, statsType }) => {
  return {
    ...state,
    allDomainsSummary: {
      ...state.allDomainsSummary,
      [statsType]: {
        ...state.allDomainsSummary[statsType],
        error,
      },
    },
  };
};

export const getOrderTimeSeriesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderTimeSeries: {
      ...INITIAL_STATE.orderTimeSeries,
      isPending: true,
    },
  };
};

export const getOrderTimeSeriesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    orderTimeSeries: {
      ...INITIAL_STATE.orderTimeSeries,
      data,
      isPending: false,
    },
  };
};

export const getOrderTimeSeriesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderTimeSeries: {
      ...INITIAL_STATE.orderTimeSeries,
      isPending: false,
      error,
    },
  };
};

export const getOperationTimeSeriesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    operationTimeSeries: {
      ...INITIAL_STATE.operationTimeSeries,
      isPending: true,
    },
  };
};

export const getOperationTimeSeriesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    operationTimeSeries: {
      ...INITIAL_STATE.operationTimeSeries,
      data,
      isPending: false,
    },
  };
};

export const getOperationTimeSeriesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    operationTimeSeries: {
      ...INITIAL_STATE.operationTimeSeries,
      isPending: false,
      error,
    },
  };
};

export const getDurationsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    durations: {
      ...INITIAL_STATE.durations,
      isPending: true,
    },
  };
};

export const getDurationsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    durations: {
      ...INITIAL_STATE.durations,
      data,
      isPending: false,
    },
  };
};

export const getDurationsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    durations: {
      ...INITIAL_STATE.durations,
      isPending: false,
      error,
    },
  };
};

export const getDashboardComparisonStatsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    dashboardComparisonStats: {
      ...INITIAL_STATE.dashboardComparisonStats,
      isPending: true,
    },
  };
};

export const getDashboardComparisonStatsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    dashboardComparisonStats: {
      ...INITIAL_STATE.dashboardComparisonStats,
      data,
      isPending: false,
    },
  };
};

export const getDashboardComparisonStatsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    dashboardComparisonStats: {
      ...INITIAL_STATE.dashboardComparisonStats,
      isPending: false,
      error,
    },
  };
};

export const getDomainSummaryForLocalsRequest = (state = INITIAL_STATE, { statsType }) => {
  return {
    ...state,
    allDomainsSummary: {
      ...state.allDomainsSummary,
      [statsType]: {
        ...INITIAL_STATE.allDomainsSummary[statsType],
        isPending: true,
      },
    },
  };
};

export const getDomainSummaryForLocalsSuccess = (state = INITIAL_STATE, { data, statsType }) => {
  return {
    ...state,
    allDomainsSummary: {
      ...state.allDomainsSummary,
      [statsType]: {
        ...state.allDomainsSummary[statsType],
        locals: data,
        isPending: false,
      },
    },
  };
};

export const getDomainSummaryForLocalsFailure = (state = INITIAL_STATE, { error, statsType }) => {
  return {
    ...state,
    allDomainsSummary: {
      ...state.allDomainsSummary,
      [statsType]: {
        ...state.allDomainsSummary[statsType],
        isPending: false,
        error,
      },
    },
  };
};

export const getNPSStatsRequest = state => {
  return {
    ...state,
    npsStats: {
      ...INITIAL_STATE.npsStats,
      isPending: true,
    },
  };
};

export const getNPSStatsSuccess = (state, { data }) => {
  return {
    ...state,
    npsStats: {
      ...INITIAL_STATE.npsStats,
      data,
      isPending: false,
    },
  };
};

export const getNPSStatsFailure = state => {
  return {
    ...state,
    npsStats: {
      ...INITIAL_STATE.npsStats,
      isPending: false,
    },
  };
};

export const getNPSConfigRequest = state => {
  return {
    ...state,
    npsConfig: {
      ...INITIAL_STATE.npsConfig,
      isPending: true,
    },
  };
};

export const getNPSConfigSuccess = (state, { data }) => {
  return {
    ...state,
    npsConfig: {
      ...INITIAL_STATE.npsConfig,
      data,
      isPending: false,
    },
  };
};

export const getNPSConfigFailure = state => {
  return {
    ...state,
    npsConfig: {
      ...INITIAL_STATE.npsConfig,
      isPending: false,
    },
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

const init = () => {
  return { ...INITIAL_STATE, filters: { ...INITIAL_STATE.filters, selectedDomainType: getSelectedDomainType() } };
};

export const HANDLERS = {
  [Types.SET_SELECTED_DOMAIN_TYPE]: setSelectedDomainType,
  [Types.SET_SELECTED_CITIES]: setSelectedCities,
  [Types.SET_SELECTED_HOUR_RANGE]: setSelectedHourRange,
  [Types.SET_SELECTED_DATE_RANGE]: setSelectedDateRange,
  [Types.SET_SELECTED_DATE]: setSelectedDate,
  [Types.SET_DATE_TYPE]: setDateType,

  [Types.GET_ORDER_COUNT_BY_BASKET_AMOUNT_REQUEST]: getOrderCountByBasketAmountRequest,
  [Types.GET_ORDER_COUNT_BY_BASKET_AMOUNT_SUCCESS]: getOrderCountByBasketAmountSuccess,
  [Types.GET_ORDER_COUNT_BY_BASKET_AMOUNT_FAILURE]: getOrderCountByBasketAmountFailure,

  [Types.GET_CLIENT_ORDER_COUNTS_REQUEST]: getClientOrderCountsRequest,
  [Types.GET_CLIENT_ORDER_COUNTS_SUCCESS]: getClientOrderCountsSuccess,
  [Types.GET_CLIENT_ORDER_COUNTS_FAILURE]: getClientOrderCountsFailure,

  [Types.GET_FINANCIALS_REQUEST]: getFinancialsRequest,
  [Types.GET_FINANCIALS_SUCCESS]: getFinancialsSuccess,
  [Types.GET_FINANCIALS_FAILURE]: getFinancialsFailure,
  [Types.GET_PRODUCT_AVAILABILITY_FAILURE]: getProductAvailabilityFailure,
  [Types.GET_PRODUCT_AVAILABILITY_REQUEST]: getProductAvailabilityRequest,
  [Types.GET_PRODUCT_AVAILABILITY_SUCCESS]: getProductAvailabilitySuccess,
  [Types.GET_PRODUCT_SALE_FAILURE]: getProductSaleFailure,
  [Types.GET_PRODUCT_SALE_REQUEST]: getProductSaleRequest,
  [Types.GET_PRODUCT_SALE_SUCCESS]: getProductSaleSuccess,
  [Types.GET_DEVICE_STATS_REQUEST]: getDeviceStatsRequest,
  [Types.GET_DEVICE_STATS_FAILURE]: getDeviceStatsFailure,
  [Types.GET_DEVICE_STATS_SUCCESS]: getDeviceStatsSuccess,
  [Types.GET_ORDER_CARD_GROUP_DISTRIBUTION_REQUEST]: getOrderCardGroupDistributionRequest,
  [Types.GET_ORDER_CARD_GROUP_DISTRIBUTION_FAILURE]: getOrderCardGroupDistributionFailure,
  [Types.GET_ORDER_CARD_GROUP_DISTRIBUTION_SUCCESS]: getOrderCardGroupDistributionSuccess,
  [Types.GET_DISCOUNT_REASONS_REQUEST]: getDiscountReasonsRequest,
  [Types.GET_DISCOUNT_REASONS_FAILURE]: getDiscountReasonsFailure,
  [Types.GET_DISCOUNT_REASONS_SUCCESS]: getDiscountReasonsSuccess,
  [Types.GET_ORDER_PROMO_DISTRIBUTION_BETWEEN_DATES_REQUEST]: getOrderPromoDistributionBetweenDatesRequest,
  [Types.GET_ORDER_PROMO_DISTRIBUTION_BETWEEN_DATES_SUCCESS]: getOrderPromoDistributionBetweenDatesSuccess,
  [Types.GET_ORDER_PROMO_DISTRIBUTION_BETWEEN_DATES_FAILURE]: getOrderPromoDistributionBetweenDatesFailure,

  [Types.GET_CLIENT_RATINGS_REQUEST]: getClientRatingsRequest,
  [Types.GET_CLIENT_RATINGS_SUCCESS]: getClientRatingsSuccess,
  [Types.GET_CLIENT_RATINGS_FAILURE]: getClientRatingsFailure,

  [Types.GET_WAREHOUSE_STATS_REQUEST]: getWarehouseStatsRequest,
  [Types.GET_WAREHOUSE_STATS_SUCCESS]: getWarehouseStatsSuccess,
  [Types.GET_WAREHOUSE_STATS_FAILURE]: getWarehouseStatsFailure,

  [Types.GET_WAREHOUSE_STATS_V2_REQUEST]: getWarehouseStatsV2Request,
  [Types.GET_WAREHOUSE_STATS_V2_SUCCESS]: getWarehouseStatsV2Success,
  [Types.GET_WAREHOUSE_STATS_V2_FAILURE]: getWarehouseStatsV2Failure,

  [Types.GET_BI_TAKSI_STATS_REQUEST]: getBiTaksiStatsRequest,
  [Types.GET_BI_TAKSI_STATS_SUCCESS]: getBiTaksiStatsSuccess,
  [Types.GET_BI_TAKSI_STATS_FAILURE]: getBiTaksiStatsFailure,

  [Types.GET_WATER_MARKETPLACE_STATS_REQUEST]: getWaterMarketplaceStatsRequest,
  [Types.GET_WATER_MARKETPLACE_STATS_SUCCESS]: getWaterMarketplaceStatsSuccess,
  [Types.GET_WATER_MARKETPLACE_STATS_FAILURE]: getWaterMarketplaceStatsFailure,

  [Types.GET_MOOV_STATS_REQUEST]: getMoovStatsRequest,
  [Types.GET_MOOV_STATS_SUCCESS]: getMoovStatsSuccess,
  [Types.GET_MOOV_STATS_FAILURE]: getMoovStatsFailure,

  [Types.GET_ORDER_TIME_SERIES_REQUEST]: getOrderTimeSeriesRequest,
  [Types.GET_ORDER_TIME_SERIES_SUCCESS]: getOrderTimeSeriesSuccess,
  [Types.GET_ORDER_TIME_SERIES_FAILURE]: getOrderTimeSeriesFailure,

  [Types.GET_OPERATION_TIME_SERIES_REQUEST]: getOperationTimeSeriesRequest,
  [Types.GET_OPERATION_TIME_SERIES_SUCCESS]: getOperationTimeSeriesSuccess,
  [Types.GET_OPERATION_TIME_SERIES_FAILURE]: getOperationTimeSeriesFailure,

  [Types.GET_DURATIONS_REQUEST]: getDurationsRequest,
  [Types.GET_DURATIONS_SUCCESS]: getDurationsSuccess,
  [Types.GET_DURATIONS_FAILURE]: getDurationsFailure,
  [Types.SET_SELECTED_DIVISION_COUNTRIES]: setSelectedDivisionCountries,

  [Types.GET_DASHBOARD_COMPARISON_STATS_REQUEST]: getDashboardComparisonStatsRequest,
  [Types.GET_DASHBOARD_COMPARISON_STATS_SUCCESS]: getDashboardComparisonStatsSuccess,
  [Types.GET_DASHBOARD_COMPARISON_STATS_FAILURE]: getDashboardComparisonStatsFailure,

  [Types.GET_DOMAIN_SUMMARY_FOR_LOCALS_REQUEST]: getDomainSummaryForLocalsRequest,
  [Types.GET_DOMAIN_SUMMARY_FOR_LOCALS_SUCCESS]: getDomainSummaryForLocalsSuccess,
  [Types.GET_DOMAIN_SUMMARY_FOR_LOCALS_FAILURE]: getDomainSummaryForLocalsFailure,

  [Types.GET_NPS_STATS_REQUEST]: getNPSStatsRequest,
  [Types.GET_NPS_STATS_SUCCESS]: getNPSStatsSuccess,
  [Types.GET_NPS_STATS_FAILURE]: getNPSStatsFailure,

  [Types.GET_NPS_CONFIG_REQUEST]: getNPSConfigRequest,
  [Types.GET_NPS_CONFIG_SUCCESS]: getNPSConfigSuccess,
  [Types.GET_NPS_CONFIG_FAILURE]: getNPSConfigFailure,

  [Types.DESTROY_PAGE]: destroy,
  [Types.INIT_PAGE]: init,
};

export default createReducer(INITIAL_STATE, HANDLERS);
