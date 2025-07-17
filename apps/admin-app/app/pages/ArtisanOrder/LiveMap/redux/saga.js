import { all, call, cancel, fork, put, take, takeLatest, delay } from 'redux-saga/effects';
// eslint-disable-next-line import/no-extraneous-dependencies
import { eventChannel } from '@redux-saga/core';
import moment from 'moment';

import {
  getLiveMapOrderCountsAndFinancial,
  getLiveMapAllCourierCountsAndCourierPlan,
  getLiveMapArtisanCourierCountsAndCourierPlan,
  getShopsStatistics,
} from '@shared/api/artisanLiveMap';
import { getLiveMapAllCourierCountsAndCourierPlan as getLiveMapFoodCourierCountsAndCourierPlan } from '@shared/api/foodLiveMap';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { createSocketEventChannel } from '@shared/redux/sagas/common';
import { Types, Creators } from './actions';
import { GETIR_FOOD_DOMAIN_TYPE, GETIR_LOCALS_DOMAIN_TYPE, LOCALS_CHECKOUT_ERROR_CODES } from '@shared/shared/constants';
import { getCouriers } from '@shared/api/courier';
import { SOCKET_EVENT } from '@shared/api/socket/constants';
import { getActives } from '@shared/api/artisanOrderActive';

const REFRESH_INTERVAL = 30 * 1000;

function* refreshOverallStats({ selectedCity, selectedCountry }) {
  const { order_stats: orderStats } = yield call(getLiveMapOrderCountsAndFinancial, { selectedCity, selectedCountry });

  yield put(Creators.getOverallStatsSuccess({ data: orderStats }));
}

function* getOverallStatsRequest({ selectedCity, selectedCountry }) {
  try {
    yield call(refreshOverallStats, { selectedCity, selectedCountry });

    while (true) {
      yield delay(REFRESH_INTERVAL);

      yield call(refreshOverallStats, { selectedCity, selectedCountry });
    }
  }
  catch (error) {
    yield put(Creators.getOverallStatsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* refreshActiveOrderStats({ cityId }) {
  const data = yield call(getShopsStatistics, { cityId });

  yield put(Creators.getActiveOrderStatsSuccess({ data }));
}

function* getActiveOrderStatsRequest({ cityId }) {
  try {
    yield call(refreshActiveOrderStats, { cityId });

    while (true) {
      yield delay(REFRESH_INTERVAL);

      yield call(refreshActiveOrderStats, { cityId });
    }
  }
  catch (error) {
    yield put(Creators.getActiveOrderStatsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* refreshArtisanActiveOrders({ cityId }) {
  const data = yield call(getActives, { cityId });
  yield put(Creators.getArtisanActiveOrdersSuccess({ data }));
}

function* getArtisanActiveOrdersRequest({ cityId }) {
  try {
    yield call(refreshArtisanActiveOrders, { cityId });

    while (true) {
      yield delay(REFRESH_INTERVAL);

      yield call(refreshArtisanActiveOrders, { cityId });
    }
  }
  catch (error) {
    yield put(Creators.getArtisanActiveOrdersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* refreshCourierPlanAndCounts() {
  const data = yield call(getLiveMapAllCourierCountsAndCourierPlan);

  yield put(Creators.getCourierPlanAndCountsSuccess({ data }));
}

function* getCourierPlanAndCountsRequest() {
  try {
    yield call(refreshCourierPlanAndCounts);

    while (true) {
      yield delay(REFRESH_INTERVAL);

      yield call(refreshCourierPlanAndCounts);
    }
  }
  catch (error) {
    yield put(Creators.getCourierPlanAndCountsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* refreshFoodCourierPlanAndCounts() {
  const data = yield call(getLiveMapFoodCourierCountsAndCourierPlan);

  yield put(Creators.getFoodCourierPlanAndCountsSuccess({ data }));
}

function* getFoodCourierPlanAndCountsRequest() {
  try {
    yield call(refreshFoodCourierPlanAndCounts);

    while (true) {
      yield delay(REFRESH_INTERVAL);

      yield call(refreshFoodCourierPlanAndCounts);
    }
  }
  catch (error) {
    yield put(Creators.getFoodCourierPlanAndCountsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* refreshArtisanCourierPlanAndCounts() {
  const data = yield call(getLiveMapArtisanCourierCountsAndCourierPlan);

  yield put(Creators.getArtisanCourierPlanAndCountsSuccess({ data }));
}

function* getArtisanCourierPlanAndCountsRequest() {
  try {
    yield call(refreshArtisanCourierPlanAndCounts);

    while (true) {
      yield delay(REFRESH_INTERVAL);

      yield call(refreshArtisanCourierPlanAndCounts);
    }
  }
  catch (error) {
    yield put(Creators.getArtisanCourierPlanAndCountsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* refreshCouriersRequest({ country, fields }) {
  const domainTypes = [GETIR_LOCALS_DOMAIN_TYPE, GETIR_FOOD_DOMAIN_TYPE];
  const isLoggedIn = true;
  try {
    const data = yield call(getCouriers, { country, domainTypes, isLoggedIn, fields });
    yield put(Creators.getCouriersSuccess({ data }));
    while (true) {
      yield delay(REFRESH_INTERVAL);

      const res = yield call(getCouriers, { country, domainTypes, isLoggedIn, fields });
      yield put(Creators.getCouriersSuccess({ data: res }));
    }
  }
  catch (error) {
    yield put(Creators.getCouriersFailure({ error }));
    yield put(ToastCreators.error({ error }));
    yield delay(REFRESH_INTERVAL);
    yield put(Creators.getCouriersRequest({ country, domainTypes, isLoggedIn, fields }));
  }
}

const redBasketErrorCodes = new Set([
  LOCALS_CHECKOUT_ERROR_CODES.SHOP_CLOSED,
  LOCALS_CHECKOUT_ERROR_CODES.NO_COURIER_AVAILABLE,
]);

function* getRedBasket() {
  const socketChannel = yield call(createSocketEventChannel, SOCKET_EVENT.ARTISAN_ORDER_CHECKOUT_FAILED_EVENT);
  try {
    while (true) {
      const data = yield take(socketChannel);
      if (data && redBasketErrorCodes.has(data.errorCode)) {
        const currentMoment = moment();
        data.date = currentMoment;
        yield put(Creators.getRedBasketSuccess({ data }));
      }
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
  finally {
    socketChannel.close();
  }
}

function* updateRedBasket({ redBasketData }) {
  const intervalCounterChannel = yield call(intervalCounter, REFRESH_INTERVAL);

  while (true) {
    yield take(intervalCounterChannel);
    const currentMoment = moment();
    const lastXSeconds = 30;

    const filteredRedBasketData = redBasketData.filter(({ date }) => {
      return moment.duration(currentMoment.diff(date)).asSeconds() < lastXSeconds;
    });

    yield put(Creators.updateRedBasket({ redBasketData: filteredRedBasketData }));
  }
}

function intervalCounter(ms = 1000) {
  return eventChannel(emitter => {
    const iv = setInterval(() => {
      emitter(ms);
    }, ms);
    return () => {
      clearInterval(iv);
    };
  });
}

function* watchActiveOrderStatsRequest() {
  yield takeLatest(Types.GET_ACTIVE_ORDER_STATS_REQUEST, getActiveOrderStatsRequest);
}

function* watchOverallStatsRequest() {
  yield takeLatest(Types.GET_OVERALL_STATS_REQUEST, getOverallStatsRequest);
}

function* watchGetRedBasket() {
  yield takeLatest(Types.GET_RED_BASKET, getRedBasket);
}

function* watchUpdateRedBasket() {
  yield takeLatest(Types.UPDATE_RED_BASKET, updateRedBasket);
}

function* watchCourierPlanAndCountsRequest() {
  yield takeLatest(Types.GET_COURIER_PLAN_AND_COUNTS_REQUEST, getCourierPlanAndCountsRequest);
}

function* watchFoodCourierPlanAndCountsRequest() {
  yield takeLatest(Types.GET_FOOD_COURIER_PLAN_AND_COUNTS_REQUEST, getFoodCourierPlanAndCountsRequest);
}

function* watchArtisanCourierPlanAndCountsRequest() {
  yield takeLatest(Types.GET_ARTISAN_COURIER_PLAN_AND_COUNTS_REQUEST, getArtisanCourierPlanAndCountsRequest);
}

function* watchGetCouriersRequest() {
  yield takeLatest(Types.GET_COURIERS_REQUEST, refreshCouriersRequest);
}

function* watchGetArtisanActiveOrdersRequest() {
  yield takeLatest(Types.GET_ARTISAN_ACTIVE_ORDERS_REQUEST, getArtisanActiveOrdersRequest);
}

export default function* brandsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchOverallStatsRequest),
      fork(watchActiveOrderStatsRequest),
      fork(watchCourierPlanAndCountsRequest),
      fork(watchFoodCourierPlanAndCountsRequest),
      fork(watchArtisanCourierPlanAndCountsRequest),
      fork(watchGetCouriersRequest),
      fork(watchGetRedBasket),
      fork(watchUpdateRedBasket),
      fork(watchGetArtisanActiveOrdersRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
