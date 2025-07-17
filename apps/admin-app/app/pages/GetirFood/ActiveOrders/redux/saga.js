import { all, call, cancel, delay, fork, put, take, takeLatest, select } from 'redux-saga/effects';

import { getActives, getPaymentMethods } from '@shared/api/foodOrderActive';
import { getRestaurantsByName } from '@shared/api/foodRestaurant';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { filtersSelector, paymentMethodsSelector } from './selectors';
import { transformValuesForApi } from '../utils';

const REFRESH_INTERVAL = 30 * 1000;

export function* refreshActives() {
  const filters = yield select(filtersSelector.getFilters);
  const paymentMethods = yield select(paymentMethodsSelector.getPaymentMethods);
  const { data } = yield call(getActives, transformValuesForApi({ filters, paymentMethods }));
  yield put(Creators.getActivesSuccess({ data }));
}

export function* getActivesRequest() {
  try {
    yield call(refreshActives);

    while (true) {
      yield delay(REFRESH_INTERVAL);
      yield call(refreshActives);
    }
  }
  catch (error) {
    yield put(Creators.getActivesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getPaymentMethodsRequest({ includeOnline }) {
  try {
    const data = yield call(getPaymentMethods, { includeOnline });
    yield put(Creators.getPaymentMethodsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPaymentMethodsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

// getRestaurantsByName
function* getRestaurantsByNameRequest({ name, cityIds }) {
  try {
    const data = yield call(getRestaurantsByName, { name, cityIds });
    yield put(Creators.getRestaurantsByNameSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRestaurantsByNameFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchActivesRequest() {
  yield takeLatest(Types.GET_ACTIVES_REQUEST, getActivesRequest);
}

function* watchPaymentMethodsRequest() {
  yield takeLatest(Types.GET_PAYMENT_METHODS_REQUEST, getPaymentMethodsRequest);
}

function* watchRestaurantsByNameRequest() {
  yield takeLatest(Types.GET_RESTAURANTS_BY_NAME_REQUEST, getRestaurantsByNameRequest);
}

export default function* getirFoodOrderActiveRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchActivesRequest), fork(watchPaymentMethodsRequest), fork(watchRestaurantsByNameRequest)]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
