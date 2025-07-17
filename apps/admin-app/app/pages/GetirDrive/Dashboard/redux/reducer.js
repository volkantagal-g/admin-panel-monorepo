import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  instantVehicleStatus: {
    isPending: false,
    data: [],
  },
  rentalStatus: {
    isPending: false,
    data: [],
  },
  financial: {
    isPending: false,
    data: [],
  },
  financialDistribution: {
    isPending: false,
    data: [],
  },
  vehicleBasedStats: {
    isPending: false,
    data: [],
  },
  clientDistribution: {
    isPending: false,
    data: [],
  },
  newClientDistribution: {
    isPending: false,
    data: [],
  },
  cleaningScoreCounts: {
    isPending: false,
    data: [],
  },
  rateCounts: {
    isPending: false,
    data: [],
  },
  rentTimeSeries: {
    isPending: false,
    data: [],
  },
  netRevenueTimeSeries: {
    isPending: false,
    data: [],
  },
  externalSourcesSummaryCurrent: {
    isPending: false,
    data: [],
  },
  externalSourcesSummaryPrevious: {
    isPending: false,
    data: [],
  },
  rentalCountByNetRevenue: {
    isPending: false,
    data: [],
  },
  rentalCountByDuration: {
    isPending: false,
    data: [],
  },
  rentalCountByDistance: {
    isPending: false,
    data: [],
  },
  dailyFrequency: {
    isPending: false,
    data: [],
  },
  promoDistribution: {
    isPending: false,
    data: [],
  },
  rentalTypeDistribution: {
    isPending: false,
    data: [],
  },
};

const instantVehicleStatusRequest = (state = INITIAL_STATE) => ({
  ...state,
  instantVehicleStatus: {
    ...state.instantVehicleStatus,
    isPending: true,
    data: [],
  },
});

const instantVehicleStatusSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  instantVehicleStatus: {
    ...state.instantVehicleStatus,
    isPending: false,
    data,
  },
});

const instantVehicleStatusFailure = (state = INITIAL_STATE) => ({
  ...state,
  instantVehicleStatus: {
    ...state.instantVehicleStatus,
    isPending: false,
  },
});

const rentalStatusRequest = (state = INITIAL_STATE) => ({
  ...state,
  rentalStatus: {
    ...state.rentalStatus,
    isPending: true,
    data: [],
  },
});

const rentalStatusSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  rentalStatus: {
    ...state.rentalStatus,
    isPending: false,
    data,
  },
});

const rentalStatusFailure = (state = INITIAL_STATE) => ({
  ...state,
  rentalStatus: {
    ...state.rentalStatus,
    isPending: false,
  },
});

const financialRequest = (state = INITIAL_STATE) => ({
  ...state,
  financial: {
    ...state.financial,
    isPending: true,
    data: [],
  },
});

const financialSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  financial: {
    ...state.financial,
    isPending: false,
    data,
  },
});

const financialFailure = (state = INITIAL_STATE) => ({
  ...state,
  financial: {
    ...state.financial,
    isPending: false,
  },
});

const financialDistributionRequest = (state = INITIAL_STATE) => ({
  ...state,
  financialDistribution: {
    ...state.financialDistribution,
    isPending: true,
    data: [],
  },
});

const financialDistributionSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  financialDistribution: {
    ...state.financialDistribution,
    isPending: false,
    data,
  },
});

const financialDistributionFailure = (state = INITIAL_STATE) => ({
  ...state,
  financialDistribution: {
    ...state.financialDistribution,
    isPending: false,
  },
});

const vehicleBasedStatsRequest = (state = INITIAL_STATE) => ({
  ...state,
  vehicleBasedStats: {
    ...state.vehicleBasedStats,
    isPending: true,
    data: [],
  },
});

const vehicleBasedStatsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  vehicleBasedStats: {
    ...state.vehicleBasedStats,
    isPending: false,
    data,
  },
});

const vehicleBasedStatsFailure = (state = INITIAL_STATE) => ({
  ...state,
  vehicleBasedStats: {
    ...state.vehicleBasedStats,
    isPending: false,
  },
});

const clientDistributionRequest = (state = INITIAL_STATE) => ({
  ...state,
  clientDistribution: {
    ...state.clientDistribution,
    isPending: true,
    data: [],
  },
});

const clientDistributionSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  clientDistribution: {
    ...state.clientDistribution,
    isPending: false,
    data,
  },
});

const clientDistributionFailure = (state = INITIAL_STATE) => ({
  ...state,
  clientDistribution: {
    ...state.clientDistribution,
    isPending: false,
  },
});

const newClientDistributionRequest = (state = INITIAL_STATE) => ({
  ...state,
  newClientDistribution: {
    ...state.newClientDistribution,
    isPending: true,
    data: [],
  },
});

const newClientDistributionSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  newClientDistribution: {
    ...state.newClientDistribution,
    isPending: false,
    data,
  },
});

const newClientDistributionFailure = (state = INITIAL_STATE) => ({
  ...state,
  newClientDistribution: {
    ...state.newClientDistribution,
    isPending: false,
  },
});

const cleaningScoreCountsRequest = (state = INITIAL_STATE) => ({
  ...state,
  cleaningScoreCounts: {
    ...state.cleaningScoreCounts,
    isPending: true,
    data: [],
  },
});

const cleaningScoreCountsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  cleaningScoreCounts: {
    ...state.cleaningScoreCounts,
    isPending: false,
    data,
  },
});

const cleaningScoreCountsFailure = (state = INITIAL_STATE) => ({
  ...state,
  cleaningScoreCounts: {
    ...state.cleaningScoreCounts,
    isPending: false,
  },
});

const rateCountsRequest = (state = INITIAL_STATE) => ({
  ...state,
  rateCounts: {
    ...state.rateCounts,
    isPending: true,
    data: [],
  },
});

const rateCountsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  rateCounts: {
    ...state.rateCounts,
    isPending: false,
    data,
  },
});

const rateCountsFailure = (state = INITIAL_STATE) => ({
  ...state,
  rateCounts: {
    ...state.rateCounts,
    isPending: false,
  },
});

const rentTimeSeriesRequest = (state = INITIAL_STATE) => ({
  ...state,
  rentTimeSeries: {
    ...state.rentTimeSeries,
    isPending: true,
    data: [],
  },
});

const rentTimeSeriesSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  rentTimeSeries: {
    ...state.rentTimeSeries,
    isPending: false,
    data,
  },
});

const rentTimeSeriesFailure = (state = INITIAL_STATE) => ({
  ...state,
  rentTimeSeries: {
    ...state.rentTimeSeries,
    isPending: false,
  },
});

const netRevenueTimeSeriesRequest = (state = INITIAL_STATE) => ({
  ...state,
  netRevenueTimeSeries: {
    ...state.netRevenueTimeSeries,
    isPending: true,
    data: [],
  },
});

const netRevenueTimeSeriesSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  netRevenueTimeSeries: {
    ...state.netRevenueTimeSeries,
    isPending: false,
    data,
  },
});

const netRevenueTimeSeriesFailure = (state = INITIAL_STATE) => ({
  ...state,
  netRevenueTimeSeries: {
    ...state.netRevenueTimeSeries,
    isPending: false,
  },
});

const externalSourcesSummaryCurrentRequest = (state = INITIAL_STATE) => ({
  ...state,
  externalSourcesSummaryCurrent: {
    ...state.externalSourcesSummaryCurrent,
    isPending: true,
    data: [],
  },
});

const externalSourcesSummaryCurrentSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  externalSourcesSummaryCurrent: {
    ...state.externalSourcesSummaryCurrent,
    isPending: false,
    data,
  },
});

const externalSourcesSummaryCurrentFailure = (state = INITIAL_STATE) => ({
  ...state,
  externalSourcesSummaryCurrent: {
    ...state.externalSourcesSummaryCurrent,
    isPending: false,
  },
});

const externalSourcesSummaryPreviousRequest = (state = INITIAL_STATE) => ({
  ...state,
  externalSourcesSummaryPrevious: {
    ...state.externalSourcesSummaryPrevious,
    isPending: true,
    data: [],
  },
});

const externalSourcesSummaryPreviousSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  externalSourcesSummaryPrevious: {
    ...state.externalSourcesSummaryPrevious,
    isPending: false,
    data,
  },
});

const externalSourcesSummaryPreviousFailure = (state = INITIAL_STATE) => ({
  ...state,
  externalSourcesSummaryPrevious: {
    ...state.externalSourcesSummaryPrevious,
    isPending: false,
  },
});

const rentalCountByNetRevenueRequest = (state = INITIAL_STATE) => ({
  ...state,
  rentalCountByNetRevenue: {
    ...state.rentalCountByNetRevenue,
    isPending: true,
    data: [],
  },
});

const rentalCountByNetRevenueSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  rentalCountByNetRevenue: {
    ...state.rentalCountByNetRevenue,
    isPending: false,
    data,
  },
});

const rentalCountByNetRevenueFailure = (state = INITIAL_STATE) => ({
  ...state,
  rentalCountByNetRevenue: {
    ...state.rentalCountByNetRevenue,
    isPending: false,
  },
});

const rentalCountByDurationRequest = (state = INITIAL_STATE) => ({
  ...state,
  rentalCountByDuration: {
    ...state.rentalCountByDuration,
    isPending: true,
    data: [],
  },
});

const rentalCountByDurationSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  rentalCountByDuration: {
    ...state.rentalCountByDuration,
    isPending: false,
    data,
  },
});

const rentalCountByDurationFailure = (state = INITIAL_STATE) => ({
  ...state,
  rentalCountByDuration: {
    ...state.rentalCountByDuration,
    isPending: false,
  },
});

const rentalCountByDistanceRequest = (state = INITIAL_STATE) => ({
  ...state,
  rentalCountByDistance: {
    ...state.rentalCountByDistance,
    isPending: true,
    data: [],
  },
});

const rentalCountByDistanceSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  rentalCountByDistance: {
    ...state.rentalCountByDistance,
    isPending: false,
    data,
  },
});

const rentalCountByDistanceFailure = (state = INITIAL_STATE) => ({
  ...state,
  rentalCountByDistance: {
    ...state.rentalCountByDistance,
    isPending: false,
  },
});

const dailyFrequencyRequest = (state = INITIAL_STATE) => ({
  ...state,
  dailyFrequency: {
    ...state.dailyFrequency,
    isPending: true,
    data: [],
  },
});

const dailyFrequencySuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  dailyFrequency: {
    ...state.dailyFrequency,
    isPending: false,
    data,
  },
});

const dailyFrequencyFailure = (state = INITIAL_STATE) => ({
  ...state,
  dailyFrequency: {
    ...state.dailyFrequency,
    isPending: false,
  },
});

const promoDistributionRequest = (state = INITIAL_STATE) => ({
  ...state,
  promoDistribution: {
    ...state.promoDistribution,
    isPending: true,
    data: [],
  },
});

const promoDistributionSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  promoDistribution: {
    ...state.promoDistribution,
    isPending: false,
    data,
  },
});

const promoDistributionFailure = (state = INITIAL_STATE) => ({
  ...state,
  promoDistribution: {
    ...state.promoDistribution,
    isPending: false,
  },
});

const rentalTypeDistributionRequest = (state = INITIAL_STATE) => ({
  ...state,
  rentalTypeDistribution: {
    ...state.rentalTypeDistribution,
    isPending: true,
    data: [],
  },
});

const rentalTypeDistributionSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  rentalTypeDistribution: {
    ...state.rentalTypeDistribution,
    isPending: false,
    data,
  },
});

const rentalTypeDistributionFailure = (state = INITIAL_STATE) => ({
  ...state,
  rentalTypeDistribution: {
    ...state.rentalTypeDistribution,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_INSTANT_VEHICLE_STATUS_REQUEST]: instantVehicleStatusRequest,
  [Types.GET_INSTANT_VEHICLE_STATUS_SUCCESS]: instantVehicleStatusSuccess,
  [Types.GET_INSTANT_VEHICLE_STATUS_FAILURE]: instantVehicleStatusFailure,
  [Types.GET_RENTAL_STATUS_REQUEST]: rentalStatusRequest,
  [Types.GET_RENTAL_STATUS_SUCCESS]: rentalStatusSuccess,
  [Types.GET_RENTAL_STATUS_FAILURE]: rentalStatusFailure,
  [Types.GET_FINANCIAL_REQUEST]: financialRequest,
  [Types.GET_FINANCIAL_SUCCESS]: financialSuccess,
  [Types.GET_FINANCIAL_FAILURE]: financialFailure,
  [Types.GET_FINANCIAL_DISTRIBUTION_REQUEST]: financialDistributionRequest,
  [Types.GET_FINANCIAL_DISTRIBUTION_SUCCESS]: financialDistributionSuccess,
  [Types.GET_FINANCIAL_DISTRIBUTION_FAILURE]: financialDistributionFailure,
  [Types.GET_VEHICLE_BASED_STATS_REQUEST]: vehicleBasedStatsRequest,
  [Types.GET_VEHICLE_BASED_STATS_SUCCESS]: vehicleBasedStatsSuccess,
  [Types.GET_VEHICLE_BASED_STATS_FAILURE]: vehicleBasedStatsFailure,
  [Types.GET_CLIENT_DISTRIBUTION_REQUEST]: clientDistributionRequest,
  [Types.GET_CLIENT_DISTRIBUTION_SUCCESS]: clientDistributionSuccess,
  [Types.GET_CLIENT_DISTRIBUTION_FAILURE]: clientDistributionFailure,
  [Types.GET_NEW_CLIENT_DISTRIBUTION_REQUEST]: newClientDistributionRequest,
  [Types.GET_NEW_CLIENT_DISTRIBUTION_SUCCESS]: newClientDistributionSuccess,
  [Types.GET_NEW_CLIENT_DISTRIBUTION_FAILURE]: newClientDistributionFailure,
  [Types.GET_CLEANING_SCORE_COUNTS_REQUEST]: cleaningScoreCountsRequest,
  [Types.GET_CLEANING_SCORE_COUNTS_SUCCESS]: cleaningScoreCountsSuccess,
  [Types.GET_CLEANING_SCORE_COUNTS_FAILURE]: cleaningScoreCountsFailure,
  [Types.GET_RATE_COUNTS_REQUEST]: rateCountsRequest,
  [Types.GET_RATE_COUNTS_SUCCESS]: rateCountsSuccess,
  [Types.GET_RATE_COUNTS_FAILURE]: rateCountsFailure,
  [Types.GET_RENT_TIME_SERIES_REQUEST]: rentTimeSeriesRequest,
  [Types.GET_RENT_TIME_SERIES_SUCCESS]: rentTimeSeriesSuccess,
  [Types.GET_RENT_TIME_SERIES_FAILURE]: rentTimeSeriesFailure,
  [Types.GET_NET_REVENUE_TIME_SERIES_REQUEST]: netRevenueTimeSeriesRequest,
  [Types.GET_NET_REVENUE_TIME_SERIES_SUCCESS]: netRevenueTimeSeriesSuccess,
  [Types.GET_NET_REVENUE_TIME_SERIES_FAILURE]: netRevenueTimeSeriesFailure,
  [Types.GET_EXTERNAL_SOURCES_SUMMARY_CURRENT_REQUEST]: externalSourcesSummaryCurrentRequest,
  [Types.GET_EXTERNAL_SOURCES_SUMMARY_CURRENT_SUCCESS]: externalSourcesSummaryCurrentSuccess,
  [Types.GET_EXTERNAL_SOURCES_SUMMARY_CURRENT_FAILURE]: externalSourcesSummaryCurrentFailure,
  [Types.GET_EXTERNAL_SOURCES_SUMMARY_PREVIOUS_REQUEST]: externalSourcesSummaryPreviousRequest,
  [Types.GET_EXTERNAL_SOURCES_SUMMARY_PREVIOUS_SUCCESS]: externalSourcesSummaryPreviousSuccess,
  [Types.GET_EXTERNAL_SOURCES_SUMMARY_PREVIOUS_FAILURE]: externalSourcesSummaryPreviousFailure,
  [Types.GET_RENTAL_COUNT_BY_NET_REVENUE_REQUEST]: rentalCountByNetRevenueRequest,
  [Types.GET_RENTAL_COUNT_BY_NET_REVENUE_SUCCESS]: rentalCountByNetRevenueSuccess,
  [Types.GET_RENTAL_COUNT_BY_NET_REVENUE_FAILURE]: rentalCountByNetRevenueFailure,
  [Types.GET_RENTAL_COUNT_BY_DURATION_REQUEST]: rentalCountByDurationRequest,
  [Types.GET_RENTAL_COUNT_BY_DURATION_SUCCESS]: rentalCountByDurationSuccess,
  [Types.GET_RENTAL_COUNT_BY_DURATION_FAILURE]: rentalCountByDurationFailure,
  [Types.GET_RENTAL_COUNT_BY_DISTANCE_REQUEST]: rentalCountByDistanceRequest,
  [Types.GET_RENTAL_COUNT_BY_DISTANCE_SUCCESS]: rentalCountByDistanceSuccess,
  [Types.GET_RENTAL_COUNT_BY_DISTANCE_FAILURE]: rentalCountByDistanceFailure,
  [Types.GET_DAILY_FREQUENCY_REQUEST]: dailyFrequencyRequest,
  [Types.GET_DAILY_FREQUENCY_SUCCESS]: dailyFrequencySuccess,
  [Types.GET_DAILY_FREQUENCY_FAILURE]: dailyFrequencyFailure,
  [Types.GET_PROMO_DISTRIBUTION_REQUEST]: promoDistributionRequest,
  [Types.GET_PROMO_DISTRIBUTION_SUCCESS]: promoDistributionSuccess,
  [Types.GET_PROMO_DISTRIBUTION_FAILURE]: promoDistributionFailure,
  [Types.GET_RENTAL_TYPE_DISTRIBUTION_REQUEST]: rentalTypeDistributionRequest,
  [Types.GET_RENTAL_TYPE_DISTRIBUTION_SUCCESS]: rentalTypeDistributionSuccess,
  [Types.GET_RENTAL_TYPE_DISTRIBUTION_FAILURE]: rentalTypeDistributionFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
