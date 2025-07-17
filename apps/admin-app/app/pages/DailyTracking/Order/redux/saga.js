import { call, all, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  getOrderPromoDistributionBetweenDates,
  getRedBasketCounts,
} from '@shared/api/dailyTracking';
import { getWarehouseStatsV2, getClientRatings } from '@shared/api/getirMarketDashboard';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

import { Types, Creators } from './actions';
import { removeEmptyFieldsFromParams } from '@shared/utils/request';

function* getWarehouseStatsRequest({ startDate, endDate, domainType, cities }) {
  try {
    const { warehouseStats } = yield call(getWarehouseStatsV2, removeEmptyFieldsFromParams({
      startDate,
      endDate,
      cities,
      domainTypes: [domainType],
    }));
    yield put(Creators.getWarehouseStatsSuccess({ data: warehouseStats }));
  }
  catch (error) {
    yield put(Creators.getWarehouseStatsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getOrderPromoDistributionBetweenDatesRequest({ startDate, endDate, domainType, countries, cities }) {
  const domainTypeNum = parseInt(domainType, 10);
  try {
    const data = yield call(getOrderPromoDistributionBetweenDates, {
      domainTypes: [domainTypeNum],
      startDate,
      endDate,
      countries,
      cities,
    });
    yield put(Creators.getOrderPromoDistributionBetweenDatesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getOrderPromoDistributionBetweenDatesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getRedBasketCountsRequest({ startDate, endDate, domainType, countries, cities }) {
  const domainTypeNum = parseInt(domainType, 10);
  try {
    const data = yield call(getRedBasketCounts, {
      startDate,
      endDate,
      domainType: domainTypeNum,
      countries,
      cities,
    });
    yield put(Creators.getRedBasketCountsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRedBasketCountsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getRateCountsRequest({ startDate, endDate, domainType, countries, cities }) {
  try {
    const data = yield call(getClientRatings, {
      domainTypes: [domainType],
      startDate,
      endDate,
      countries,
      cities,
    });
    yield put(Creators.getRateCountsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRateCountsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetWarehouseStatsRequest() {
  yield takeLatest(Types.GET_WAREHOUSE_STATS_REQUEST, getWarehouseStatsRequest);
}

function* watchGetOrderPromoDistributionBetweenDatesRequest() {
  yield takeLatest(Types.GET_ORDER_PROMO_DISTRIBUTION_BETWEEN_DATES_REQUEST, getOrderPromoDistributionBetweenDatesRequest);
}

function* watchGetRedBasketCountsRequest() {
  yield takeLatest(Types.GET_RED_BASKET_COUNTS_REQUEST, getRedBasketCountsRequest);
}

function* watchGetRateCountsRequest() {
  yield takeLatest(Types.GET_RATE_COUNTS_REQUEST, getRateCountsRequest);
}

function* setSelectedDomainType() {
  while (true) {
    const { selectedDomainType } = yield take(Types.SET_SELECTED_DOMAIN_TYPE);
    yield put(CommonCreators.setSelectedDomainType({ data: selectedDomainType }));
  }
}

export default function* dataTrackingOrderRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetWarehouseStatsRequest),
      fork(watchGetOrderPromoDistributionBetweenDatesRequest),
      fork(watchGetRedBasketCountsRequest),
      fork(watchGetRateCountsRequest),
      fork(setSelectedDomainType),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
