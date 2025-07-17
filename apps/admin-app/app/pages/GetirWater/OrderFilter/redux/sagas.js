import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getBrands, getVendors, getPaymentMethods, filterOrders } from '@shared/api/water';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

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

function* filterOrdersRequest({ data }) {
  try {
    const result = yield call(filterOrders, data);
    const { payload } = result;
    yield put(Creators.filterOrdersSuccess({ data: payload }));
  }
  catch (error) {
    yield put(Creators.filterOrdersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchBrandsRequest() {
  yield takeLatest(Types.GET_BRANDS_REQUEST, getBrandsRequest);
}

function* watchVendorsRequest() {
  yield takeLatest(Types.GET_VENDORS_REQUEST, getVendorsRequest);
}

function* watchPaymentMethodsRequest() {
  yield takeLatest(Types.GET_PAYMENT_METHODS_REQUEST, getPaymentMethodsRequest);
}

function* watchFilterOrdersRequest() {
  yield takeLatest(Types.FILTER_ORDERS_REQUEST, filterOrdersRequest);
}

export default function* waterOrderFilterRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchBrandsRequest),
      fork(watchVendorsRequest),
      fork(watchPaymentMethodsRequest),
      fork(watchFilterOrdersRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
