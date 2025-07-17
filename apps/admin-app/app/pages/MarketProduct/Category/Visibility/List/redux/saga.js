import { all, takeLatest, call, cancel, fork, put, take, select } from 'redux-saga/effects';

import {
  getMarketProductCategoryAvailableTimes,
  deleteMarketProductCategoryAvailableTimes,
} from '@shared/api/marketProductCategoryAvailableTime';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators as CommonCreators, Types as CommonTypes } from '@shared/redux/actions/common';
import { getFilteredWarehousesSelector } from '@shared/redux/selectors/common';

export function* getMarketProductCategoryAvailableTimesRequest({ warehouses, categories, subCategories, domainTypes }) {
  try {
    const data = yield call(getMarketProductCategoryAvailableTimes, { warehouses, categories, subCategories, domainTypes });
    yield put(Creators.getMarketProductCategoryAvailableTimesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductCategoryAvailableTimesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* clearMarketProductCategoryAvailableTimes() {
  yield put(Creators.clearMarketProductCategoryAvailableTimes());
}

export function* getMarketProductCategoryAvailableTimesByCitiesRequest({ cities, categories, subCategories, domainTypes, shouldFetchWarehouses }) {
  try {
    if (shouldFetchWarehouses) {
      yield put(CommonCreators.getFilteredWarehousesRequest({ cities, fields: 'name city country region', populate: ['geo'] }));
      yield take(CommonTypes.GET_FILTERED_WAREHOUSES_SUCCESS);
    }
    const warehouses = yield select(getFilteredWarehousesSelector.getData);
    if (warehouses?.length) {
      let allWarehousesFromSelectedCities = warehouses.map(warehouse => warehouse?._id);
      allWarehousesFromSelectedCities = allWarehousesFromSelectedCities?.length ? allWarehousesFromSelectedCities : undefined;
      yield put(Creators.getMarketProductCategoryAvailableTimesRequest({
        warehouses: allWarehousesFromSelectedCities,
        categories,
        subCategories,
        domainTypes,
      }));
    }
    else {
      yield put(Creators.clearMarketProductCategoryAvailableTimes());
    }
  }
  catch (error) {
    yield put(Creators.getMarketProductCategoryAvailableTimesByCitiesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* deleteMarketProductCategoryAvailableTimesRequest({ ids }) {
  try {
    yield call(deleteMarketProductCategoryAvailableTimes, { ids });
    yield put(Creators.deleteMarketProductCategoryAvailableTimesSuccess());
    yield put(Creators.getMarketProductCategoryAvailableTimesByCitiesRequest({ shouldFetchWarehouses: true }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deleteMarketProductCategoryAvailableTimesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetMarketProductCategoryAvailableTimesRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_REQUEST, getMarketProductCategoryAvailableTimesRequest);
}

function* watchClearMarketProductCategoryAvailableTimes() {
  yield take(Types.CLEAR_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES);
  clearMarketProductCategoryAvailableTimes();
}

export function* watchGetMarketProductCategoryAvailableTimesByCitiesRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_BY_CITIES_REQUEST, getMarketProductCategoryAvailableTimesByCitiesRequest);
}

export function* watchDeleteMarketProductCategoryAvailableTimesRequest() {
  yield takeLatest(Types.DELETE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_REQUEST, deleteMarketProductCategoryAvailableTimesRequest);
}

export default function* marketProductCategoryAvailableTimeRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMarketProductCategoryAvailableTimesRequest),
      fork(watchClearMarketProductCategoryAvailableTimes),
      fork(watchGetMarketProductCategoryAvailableTimesByCitiesRequest),
      fork(watchDeleteMarketProductCategoryAvailableTimesRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
