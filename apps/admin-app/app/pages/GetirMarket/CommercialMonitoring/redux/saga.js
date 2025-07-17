import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';

import {
  getProductSale as getProductSaleStatsApi,
  getProductAvailability as getAvailabilityApi,
  getInstantProductAvailability as getInstantAvailabilityApi,
} from '@shared/api/getirMarketDashboard';

import { getFormattedRequestBody } from '../utils';
import { Types, Creators } from './actions';
import { filtersSelector } from './selectors';

function* getProductSaleStats() {
  try {
    const filters = yield select(filtersSelector.getAllFilters);
    const requestBody = getFormattedRequestBody({ filters, shouldReturnFakeLocalDate: true });
    const { itemFinancialStats: data } = yield call(getProductSaleStatsApi, requestBody);
    yield put(Creators.getProductSaleStatsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getProductSaleStatsFailure({ error }));
  }
}

function* getAvailability() {
  try {
    const filters = yield select(filtersSelector.getAllFilters);
    const requestBody = getFormattedRequestBody({ filters, isHoursIncluded: false });
    const { product_availability: data } = yield call(getAvailabilityApi, requestBody);
    yield put(Creators.getAvailabilitySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAvailabilityFailure({ error }));
  }
}

function* getInstantAvailability() {
  try {
    const filters = yield select(filtersSelector.getAllFilters);
    const requestBody = getFormattedRequestBody({ filters, isHoursIncluded: false });
    const { live_product_availability: data } = yield call(getInstantAvailabilityApi, requestBody);
    yield put(Creators.getInstantAvailabilitySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getInstantAvailabilityFailure({ error }));
  }
}

function* watchGetProductSaleStatsRequest() {
  yield takeLatest(Types.GET_PRODUCT_SALE_STATS_REQUEST, getProductSaleStats);
}

function* watchGetAvailabilityRequest() {
  yield takeLatest(Types.GET_AVAILABILITY_REQUEST, getAvailability);
}

function* watchGetInstantAvailabilityRequest() {
  yield takeLatest(Types.GET_INSTANT_AVAILABILITY_REQUEST, getInstantAvailability);
}

export default function* getirMarketCommercialMonitoringPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetProductSaleStatsRequest),
      fork(watchGetAvailabilityRequest),
      fork(watchGetInstantAvailabilityRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
