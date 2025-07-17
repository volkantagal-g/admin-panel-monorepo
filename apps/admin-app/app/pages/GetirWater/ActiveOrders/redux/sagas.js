import { all, call, cancel, fork, put, take, takeLatest, delay } from 'redux-saga/effects';

import { getBrands, getActiveOrders, getVendors, getPaymentMethods } from '@shared/api/water';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

const REFRESH_INTERVAL = 30 * 1000;

function* refreshActives(filterData) {
  const { page, size, ...rest } = filterData;
  const data = yield call(getActiveOrders, rest, { page, size });
  yield put(Creators.getActiveOrdersSuccess({ data: data.payload }));
}

function* getBrandsRequest() {
  try {
    const data = yield call(getBrands);
    const { payload } = data;
    yield put(Creators.getBrandsSuccess({ data: payload }));
  }
  catch (error) {
    yield put(Creators.getBrandsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getVendorsRequest({ data }) {
  try {
    const result = yield call(getVendors, data);
    const { payload } = result;
    yield put(Creators.getVendorsSuccess({ data: payload }));
  }
  catch (error) {
    yield put(Creators.getVendorsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getActivesRequest({ data }) {
  try {
    yield call(refreshActives, data);

    while (true) {
      yield delay(REFRESH_INTERVAL);
      yield call(refreshActives, data);
    }
  }
  catch (error) {
    yield put(Creators.getActiveOrdersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getPaymentMethodsRequest() {
  try {
    const data = yield call(getPaymentMethods);
    const { payload } = data;
    yield put(Creators.getPaymentMethodsSuccess({ data: payload }));
  }
  catch (error) {
    yield put(Creators.getPaymentMethodsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchBrandsRequest() {
  yield takeLatest(Types.GET_BRANDS_REQUEST, getBrandsRequest);
}

function* watchActiveOrdersRequest() {
  yield takeLatest(Types.GET_ACTIVE_ORDERS_REQUEST, getActivesRequest);
}

function* watchVendorsRequest() {
  yield takeLatest(Types.GET_VENDORS_REQUEST, getVendorsRequest);
}

function* watchPaymentMethodsRequest() {
  yield takeLatest(Types.GET_PAYMENT_METHODS_REQUEST, getPaymentMethodsRequest);
}

export default function* waterOrderActiveRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchBrandsRequest),
      fork(watchActiveOrdersRequest),
      fork(watchVendorsRequest),
      fork(watchPaymentMethodsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
