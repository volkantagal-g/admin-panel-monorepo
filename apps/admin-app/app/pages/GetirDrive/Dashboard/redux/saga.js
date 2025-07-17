import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import {
  getInstantVehicleStatus as getInstantVehicleStatusApi,
  getRentalStatus as getRentalStatusApi,
  getFinancial as getFinancialApi,
  getFinancialDistribution as getFinancialDistributionApi,
  getVehicleBasedStats as getVehicleBasedStatsApi,
  getClientDistribution as getClientDistributionApi,
  getNewClientDistribution as getNewClientDistributionApi,
  getCleaningScoreCounts as getCleaningScoreCountsApi,
  getRateCounts as getRateCountsApi,
  getRentTimeSeries as getRentTimeSeriesApi,
  getNetRevenueTimeSeries as getNetRevenueTimeSeriesApi,
  getExternalSourcesSummary as getExternalSourcesSummaryApi,
  getRentalCountByNetRevenue as getRentalCountByNetRevenueApi,
  getRentalCountByDuration as getRentalCountByDurationApi,
  getRentalCountByDistance as getRentalCountByDistanceApi,
  getDailyFrequency as getDailyFrequencyApi,
  getPromoDistribution as getPromoDistributionApi,
  getRentalTypeDistribution as getRentalTypeDistributionApi,
} from '@shared/api/getirDriveDashboard';

import { Types, Creators } from './actions';

function* getInstantVehicleStatus({ data: params }) {
  try {
    const { data } = yield call(getInstantVehicleStatusApi, params);
    yield put(Creators.getInstantVehicleStatusSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getInstantVehicleStatusFailure({ error }));
  }
}

function* getRentalStatus({ data: params }) {
  try {
    const { data } = yield call(getRentalStatusApi, params);
    yield put(Creators.getRentalStatusSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRentalStatusFailure({ error }));
  }
}

function* getFinancial({ data: params }) {
  try {
    const { data } = yield call(getFinancialApi, params);
    yield put(Creators.getFinancialSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFinancialFailure({ error }));
  }
}

function* getFinancialDistribution({ data: params }) {
  try {
    const { data } = yield call(getFinancialDistributionApi, params);
    yield put(Creators.getFinancialDistributionSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFinancialDistributionFailure({ error }));
  }
}

function* getVehicleBasedStats({ data: params }) {
  try {
    const { data } = yield call(getVehicleBasedStatsApi, params);
    yield put(Creators.getVehicleBasedStatsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getVehicleBasedStatsFailure({ error }));
  }
}

function* getClientDistribution({ data: params }) {
  try {
    const { data } = yield call(getClientDistributionApi, params);
    yield put(Creators.getClientDistributionSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getClientDistributionFailure({ error }));
  }
}

function* getNewClientDistribution({ data: params }) {
  try {
    const { data } = yield call(getNewClientDistributionApi, params);
    yield put(Creators.getNewClientDistributionSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getNewClientDistributionFailure({ error }));
  }
}

function* getCleaningScoreCounts({ data: params }) {
  try {
    const { data } = yield call(getCleaningScoreCountsApi, params);
    yield put(Creators.getCleaningScoreCountsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getCleaningScoreCountsFailure({ error }));
  }
}

function* getRateCounts({ data: params }) {
  try {
    const { data } = yield call(getRateCountsApi, params);
    yield put(Creators.getRateCountsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRateCountsFailure({ error }));
  }
}

function* getRentTimeSeries({ data: params }) {
  try {
    const { data } = yield call(getRentTimeSeriesApi, params);
    yield put(Creators.getRentTimeSeriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRentTimeSeriesFailure({ error }));
  }
}

function* getNetRevenueTimeSeries({ data: params }) {
  try {
    const { data } = yield call(getNetRevenueTimeSeriesApi, params);
    yield put(Creators.getNetRevenueTimeSeriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getNetRevenueTimeSeriesFailure({ error }));
  }
}

function* getExternalSourcesSummaryCurrent({ data: params }) {
  try {
    const { data } = yield call(getExternalSourcesSummaryApi, params);
    yield put(Creators.getExternalSourcesSummaryCurrentSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getExternalSourcesSummaryCurrentFailure({ error }));
  }
}

function* getExternalSourcesSummaryPrevious({ data: params }) {
  try {
    const { data } = yield call(getExternalSourcesSummaryApi, params);
    yield put(Creators.getExternalSourcesSummaryPreviousSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getExternalSourcesSummaryPreviousFailure({ error }));
  }
}

function* getRentalCountByNetRevenue({ data: params }) {
  try {
    const { data } = yield call(getRentalCountByNetRevenueApi, params);
    yield put(Creators.getRentalCountByNetRevenueSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRentalCountByNetRevenueFailure({ error }));
  }
}

function* getRentalCountByDuration({ data: params }) {
  try {
    const { data } = yield call(getRentalCountByDurationApi, params);
    yield put(Creators.getRentalCountByDurationSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRentalCountByDurationFailure({ error }));
  }
}

function* getRentalCountByDistance({ data: params }) {
  try {
    const { data } = yield call(getRentalCountByDistanceApi, params);
    yield put(Creators.getRentalCountByDistanceSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRentalCountByDistanceFailure({ error }));
  }
}

function* getDailyFrequency({ data: params }) {
  try {
    const { data } = yield call(getDailyFrequencyApi, params);
    yield put(Creators.getDailyFrequencySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getDailyFrequencyFailure({ error }));
  }
}

function* getPromoDistribution({ data: params }) {
  try {
    const { data } = yield call(getPromoDistributionApi, params);
    yield put(Creators.getPromoDistributionSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPromoDistributionFailure({ error }));
  }
}

function* getRentalTypeDistribution({ data: params }) {
  try {
    const { data } = yield call(getRentalTypeDistributionApi, params);
    yield put(Creators.getRentalTypeDistributionSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRentalTypeDistributionFailure({ error }));
  }
}

function* watchGetInstantVehicleStatusRequest() {
  yield takeLatest(Types.GET_INSTANT_VEHICLE_STATUS_REQUEST, getInstantVehicleStatus);
}

function* watchGetRentalStatusRequest() {
  yield takeLatest(Types.GET_RENTAL_STATUS_REQUEST, getRentalStatus);
}

function* watchGetFinancialRequest() {
  yield takeLatest(Types.GET_FINANCIAL_REQUEST, getFinancial);
}

function* watchGetFinancialDistributionRequest() {
  yield takeLatest(Types.GET_FINANCIAL_DISTRIBUTION_REQUEST, getFinancialDistribution);
}

function* watchGetVehicleBasedStatsRequest() {
  yield takeLatest(Types.GET_VEHICLE_BASED_STATS_REQUEST, getVehicleBasedStats);
}

function* watchGetClientDistributionRequest() {
  yield takeLatest(Types.GET_CLIENT_DISTRIBUTION_REQUEST, getClientDistribution);
}

function* watchGetNewClientDistributionRequest() {
  yield takeLatest(Types.GET_NEW_CLIENT_DISTRIBUTION_REQUEST, getNewClientDistribution);
}

function* watchGetCleaningScoreCountsRequest() {
  yield takeLatest(Types.GET_CLEANING_SCORE_COUNTS_REQUEST, getCleaningScoreCounts);
}

function* watchGetRateCountsRequest() {
  yield takeLatest(Types.GET_RATE_COUNTS_REQUEST, getRateCounts);
}

function* watchGetRentTimeSeriesRequest() {
  yield takeLatest(Types.GET_RENT_TIME_SERIES_REQUEST, getRentTimeSeries);
}

function* watchGetNetRevenueTimeSeriesRequest() {
  yield takeLatest(Types.GET_NET_REVENUE_TIME_SERIES_REQUEST, getNetRevenueTimeSeries);
}

function* watchGetExternalSourcesSummaryCurrentRequest() {
  yield takeLatest(Types.GET_EXTERNAL_SOURCES_SUMMARY_CURRENT_REQUEST, getExternalSourcesSummaryCurrent);
}

function* watchGetExternalSourcesSummaryPreviousRequest() {
  yield takeLatest(Types.GET_EXTERNAL_SOURCES_SUMMARY_PREVIOUS_REQUEST, getExternalSourcesSummaryPrevious);
}

function* watchGetRentalCountByNetRevenueRequest() {
  yield takeLatest(Types.GET_RENTAL_COUNT_BY_NET_REVENUE_REQUEST, getRentalCountByNetRevenue);
}

function* watchGetRentalCountByDurationRequest() {
  yield takeLatest(Types.GET_RENTAL_COUNT_BY_DURATION_REQUEST, getRentalCountByDuration);
}

function* watchGetRentalCountByDistanceRequest() {
  yield takeLatest(Types.GET_RENTAL_COUNT_BY_DISTANCE_REQUEST, getRentalCountByDistance);
}

function* watchGetDailyFrequencyRequest() {
  yield takeLatest(Types.GET_DAILY_FREQUENCY_REQUEST, getDailyFrequency);
}

function* watchGetPromoDistributionRequest() {
  yield takeLatest(Types.GET_PROMO_DISTRIBUTION_REQUEST, getPromoDistribution);
}

function* watchGetRentalTypeDistributionRequest() {
  yield takeLatest(Types.GET_RENTAL_TYPE_DISTRIBUTION_REQUEST, getRentalTypeDistribution);
}

export default function* getirDriveDashboardPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetInstantVehicleStatusRequest),
      fork(watchGetRentalStatusRequest),
      fork(watchGetFinancialRequest),
      fork(watchGetFinancialDistributionRequest),
      fork(watchGetVehicleBasedStatsRequest),
      fork(watchGetClientDistributionRequest),
      fork(watchGetNewClientDistributionRequest),
      fork(watchGetCleaningScoreCountsRequest),
      fork(watchGetRateCountsRequest),
      fork(watchGetRentTimeSeriesRequest),
      fork(watchGetNetRevenueTimeSeriesRequest),
      fork(watchGetExternalSourcesSummaryCurrentRequest),
      fork(watchGetExternalSourcesSummaryPreviousRequest),
      fork(watchGetRentalCountByNetRevenueRequest),
      fork(watchGetRentalCountByDurationRequest),
      fork(watchGetRentalCountByDistanceRequest),
      fork(watchGetDailyFrequencyRequest),
      fork(watchGetPromoDistributionRequest),
      fork(watchGetRentalTypeDistributionRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
