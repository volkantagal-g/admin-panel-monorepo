import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getSuppliers, getAutoStockOrder } from '@shared/api/stock';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export function* getSuppliersRequest() {
  try {
    const data = yield call(getSuppliers);
    yield put(Creators.getSuppliersSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSuppliersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getAutoStockOrderRequest({ data }) {
  try {
    const response = yield call(getAutoStockOrder, { data });
    yield put(Creators.getAutoStockOrderSuccess({ data: response }));
    yield put(ToastCreators.success({ message: response.success }));
  }
  catch (error) {
    yield put(Creators.getAutoStockOrderFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchSuppliersRequest() {
  yield takeLatest(Types.GET_SUPPLIERS_REQUEST, getSuppliersRequest);
}

export function* watchAutoStockOrderRequest() {
  yield takeLatest(Types.GET_AUTO_STOCK_ORDER_REQUEST, getAutoStockOrderRequest);
}

export default function* waterOrderActiveRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchSuppliersRequest),
      fork(watchAutoStockOrderRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
