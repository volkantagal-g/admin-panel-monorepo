import { all, call, fork, cancel, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { getTransactionDetail, userRefund } from '@shared/api/payment';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getTransactionDetailRequest({ id }) {
  try {
    const data = yield call(getTransactionDetail, { id });
    yield put(Creators.getTransactionDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getTransactionDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetTransactionDetailRequest() {
  yield takeLatest(Types.GET_TRANSACTION_DETAIL_REQUEST, getTransactionDetailRequest);
}

function* userRefundRequest({ merchantId, transactionId, refundReferenceId, description, refunds }) {
  try {
    const data = yield call(userRefund, { merchantId, transactionId, refundReferenceId, description, refunds });
    yield put(Creators.userRefundSuccess({ data }));
    yield put(ToastCreators.success({ message: data?.message }));
    yield put(Creators.getTransactionDetailRequest({ id: transactionId }));
  }
  catch (error) {
    yield put(Creators.userRefundFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUserRefundRequest() {
  yield takeLatest(Types.USER_REFUND_REQUEST, userRefundRequest);
}

export default function* detailPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetTransactionDetailRequest),
      fork(watchUserRefundRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
