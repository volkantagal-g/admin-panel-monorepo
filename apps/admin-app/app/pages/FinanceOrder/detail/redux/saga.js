import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import {
  cancelFinanceOrder as cancelFinanceOrderApi,
  createFinanceOrderNote as createFinanceOrderNoteApi,
  getFinanceOrderCancelReasons as getFinanceOrderCancelReasonsApi,
  getFinanceOrderDetail as getFinanceOrderDetailApi,
} from '@shared/api/finance';

import { Creators, Types } from './actions';

function* getFinanceOrderDetail({ orderId }) {
  try {
    const financeOrderDetailRes = yield call(getFinanceOrderDetailApi, { orderId });
    yield put(Creators.getFinanceOrderDetailSuccess({ data: financeOrderDetailRes }));
  }
  catch (error) {
    yield put(Creators.getFinanceOrderDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetFinanceOrderDetailRequest() {
  yield takeLatest(
    Types.GET_FINANCE_ORDER_DETAIL_REQUEST,
    getFinanceOrderDetail,
  );
}

function* getFinanceOrderDetailInterval({ orderId }) {
  try {
    const financeOrderDetailRes = yield call(getFinanceOrderDetailApi, { orderId });
    yield put(Creators.getFinanceOrderDetailIntervalSuccess({ data: financeOrderDetailRes }));
  }
  catch (error) {
    yield put(Creators.getFinanceOrderDetailIntervalFailure({ error }));
  }
}

function* watchGetFinanceOrderDetailInterval() {
  yield takeLatest(
    Types.GET_FINANCE_ORDER_DETAIL_INTERVAL_REQUEST,
    getFinanceOrderDetailInterval,
  );
}

function* createFinanceOrderNote(data) {
  try {
    const financeOrderDetailRes = yield call(createFinanceOrderNoteApi, data);
    yield put(Creators.createFinanceOrderNoteSuccess({ data: financeOrderDetailRes.data.orderNotes }));
  }
  catch (error) {
    yield put(Creators.createFinanceOrderNoteFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateFinanceOrderNoteRequest() {
  yield takeLatest(
    Types.CREATE_FINANCE_ORDER_NOTE_REQUEST,
    createFinanceOrderNote,
  );
}

function* getFinanceOrderCancelReasons() {
  try {
    const financeOrderCancelReasonsRes = yield call(getFinanceOrderCancelReasonsApi);
    yield put(Creators.getFinanceOrderCancelReasonsSuccess({ data: financeOrderCancelReasonsRes.data.rejectCodes }));
  }
  catch (error) {
    yield put(Creators.getFinanceOrderCancelReasonsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetFinanceOrderCancelReasons() {
  yield takeLatest(
    Types.GET_FINANCE_ORDER_CANCEL_REASONS_REQUEST,
    getFinanceOrderCancelReasons,
  );
}

function* cancelFinanceOrder({ orderId, data }) {
  try {
    yield call(cancelFinanceOrderApi, data);
    yield put(Creators.cancelFinanceOrderSuccess());

    const financeOrderDetailRes = yield call(getFinanceOrderDetailApi, { orderId });
    yield put(Creators.getFinanceOrderDetailSuccess({ data: financeOrderDetailRes }));
  }
  catch (error) {
    yield put(Creators.cancelFinanceOrderFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCancelFinanceOrder() {
  yield takeLatest(
    Types.CANCEL_FINANCE_ORDER_REQUEST,
    cancelFinanceOrder,
  );
}

export default function* financeOrderDetailPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetFinanceOrderDetailRequest),
      fork(watchGetFinanceOrderDetailInterval),
      fork(watchCreateFinanceOrderNoteRequest),
      fork(watchGetFinanceOrderCancelReasons),
      fork(watchCancelFinanceOrder),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
