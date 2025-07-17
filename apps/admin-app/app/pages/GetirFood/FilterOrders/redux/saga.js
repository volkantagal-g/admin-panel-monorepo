import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';
import moment from 'moment';

import { getResults } from '@shared/api/foodOrder';
import { getPaymentMethods } from '@shared/api/foodOrderActive';
import { Types, Creators } from '@app/pages/GetirFood/FilterOrders/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getRestaurantsByName } from '@shared/api/foodRestaurant';
import { transformValuesForApi } from '../utils';
import { filtersSelector } from './selectors';

export function* getPaymentMethodsRequest({ includeOnline }) {
  try {
    const data = yield call(getPaymentMethods, { includeOnline });
    yield put(Creators.getPaymentMethodsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPaymentMethodsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchPaymentMethodsRequest() {
  yield takeLatest(Types.GET_PAYMENT_METHODS_REQUEST, getPaymentMethodsRequest);
}

export function* getResultsRequest() {
  try {
    const filters = yield select(filtersSelector.getFilters);
    const results = yield call(getResults, transformValuesForApi(filters));
    const data = results.sort((a, b) => moment(b.checkoutDate || b.createdAt).unix() - moment(a.checkoutDate || a.createdAt).unix());
    yield put(Creators.getResultsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getResultsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchResultsRequest() {
  yield takeLatest(Types.GET_RESULTS_REQUEST, getResultsRequest);
}

export function* getRestaurantsByNameRequest({ name, cityIds }) {
  try {
    const data = yield call(getRestaurantsByName, { name, cityIds });
    yield put(Creators.getRestaurantsByNameSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRestaurantsByNameFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchRestaurantsByNameRequest() {
  yield takeLatest(Types.GET_RESTAURANTS_BY_NAME_REQUEST, getRestaurantsByNameRequest);
}

export default function* foodOrderFilterSagaRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchPaymentMethodsRequest),
      fork(watchRestaurantsByNameRequest),
      fork(watchResultsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
