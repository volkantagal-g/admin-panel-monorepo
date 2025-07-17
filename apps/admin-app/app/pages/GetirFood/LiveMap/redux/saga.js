import { all, call, cancel, fork, put, take, takeLatest, delay } from 'redux-saga/effects';

import {
  getLiveMapOrderCountsAndFinancial,
  getLiveMapAllCourierCountsAndCourierPlan,
  getLiveMapFoodCourierCountsAndCourierPlan,
  getRestaurantsStatistics,
  getActiveOrderCouriersAndWarehousesRequest,
} from '@shared/api/foodLiveMap';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

const REFRESH_INTERVAL = 60 * 1000;

function* refreshOverallStats({ selectedCity, selectedCountry }) {
  const data = yield call(getLiveMapOrderCountsAndFinancial, { selectedCity, selectedCountry });

  yield put(Creators.getOverallStatsSuccess({ data }));
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

function* watchOverallStatsRequest() {
  yield takeLatest(Types.GET_OVERALL_STATS_REQUEST, getOverallStatsRequest);
}

function* refreshActiveOrderStats({ cityId }) {
  const data = yield call(getRestaurantsStatistics, { cityId });

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

function* watchActiveOrderStatsRequest() {
  yield takeLatest(Types.GET_ACTIVE_ORDER_STATS_REQUEST, getActiveOrderStatsRequest);
}

function* refreshCourierPlanAndCounts() {
  const data = yield call(getLiveMapAllCourierCountsAndCourierPlan);

  yield put(Creators.getCourierPlanAndCountsSuccess({ data }));
}

function* refreshFoodCourierPlanAndCounts() {
  const data = yield call(getLiveMapFoodCourierCountsAndCourierPlan);

  yield put(Creators.getFoodCourierPlanAndCountsSuccess({ data }));
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

function* refreshActiveOrderCouriersAndWarehousesRequest({ cityId }) {
  try {
    const { data } = yield call(getActiveOrderCouriersAndWarehousesRequest, { cityId });
    yield put(Creators.getActiveOrderCouriersAndWarehousesSuccess({ data }));
    while (true) {
      yield delay(REFRESH_INTERVAL);

      const { data } = yield call(getActiveOrderCouriersAndWarehousesRequest, { cityId });
      yield put(Creators.getActiveOrderCouriersAndWarehousesSuccess({ data }));
    }
  }
  catch (error) {
    yield put(Creators.getActiveOrderCouriersAndWarehousesFailure({ error }));
    yield put(ToastCreators.error({ error }));
    yield delay(REFRESH_INTERVAL);
    yield put(Creators.getActiveOrderCouriersAndWarehousesRequest({ cityId }));
  }
}

function* watchCourierPlanAndCountsRequest() {
  yield takeLatest(Types.GET_COURIER_PLAN_AND_COUNTS_REQUEST, getCourierPlanAndCountsRequest);
}

function* watchFoodCourierPlanAndCountsRequest() {
  yield takeLatest(Types.GET_FOOD_COURIER_PLAN_AND_COUNTS_REQUEST, getFoodCourierPlanAndCountsRequest);
}

function* watchActiveOrderCouriersAndWarehousesRequest() {
  yield takeLatest(Types.GET_ACTIVE_ORDER_COURIERS_AND_WAREHOUSES_REQUEST, refreshActiveOrderCouriersAndWarehousesRequest);
}

export default function* brandsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchOverallStatsRequest),
      fork(watchActiveOrderStatsRequest),
      fork(watchCourierPlanAndCountsRequest),
      fork(watchFoodCourierPlanAndCountsRequest),
      fork(watchActiveOrderCouriersAndWarehousesRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
