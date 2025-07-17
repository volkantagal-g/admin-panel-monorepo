import { all, call, cancel, delay, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getActives, getPaymentMethods, getShopsByName } from '@shared/api/artisanOrderActive';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getArtisanTypes } from '@shared/api/artisan';

const REFRESH_INTERVAL = 30 * 1000;

function* refreshActives() {
  const data = yield call(getActives);
  yield put(Creators.getActivesSuccess({ data }));
}

function* getActivesRequest() {
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

function* getMerchantTypesRequest() {
  try {
    const data = yield call(getArtisanTypes);
    yield put(Creators.getMerchantTypesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMerchantTypesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

// getShopsByName
function* getShopsByNameRequest({ name, cityIds }) {
  try {
    const data = yield call(getShopsByName, { name, cityIds });
    yield put(Creators.getShopsByNameSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getShopsByNameFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchActivesRequest() {
  yield takeLatest(Types.GET_ACTIVES_REQUEST, getActivesRequest);
}

function* watchPaymentMethodsRequest() {
  yield takeLatest(Types.GET_PAYMENT_METHODS_REQUEST, getPaymentMethodsRequest);
}

function* watchMerchantTypesRequest() {
  yield takeLatest(Types.GET_PAYMENT_METHODS_REQUEST, getMerchantTypesRequest);
}

function* watchShopsByNameRequest() {
  yield takeLatest(Types.GET_SHOPS_BY_NAME_REQUEST, getShopsByNameRequest);
}

export default function* artisanOrderActiveRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchActivesRequest),
      fork(watchPaymentMethodsRequest),
      fork(watchShopsByNameRequest),
      fork(watchMerchantTypesRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
