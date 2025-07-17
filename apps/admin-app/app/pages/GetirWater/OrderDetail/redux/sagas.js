import { all, call, cancel, fork, put, take, takeLatest, delay } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getOrderDetail,
  postOrderCancel,
  postOrderNote,
  postPayAmountToVendor,
  postProductReturn,
  postReturnOrder,
  postTakeAmountFromVendor,
} from '@shared/api/waterOrder';
import { Types, Creators } from './actions';
import { POST_MESSAGE_ACTION_STATUS, POST_MESSAGE_TYPE } from '../constants';

function* getOrder({ id }) {
  const { payload } = yield call(getOrderDetail, { id });
  yield put(Creators.getOrderDetailSuccess({ orderDetail: payload }));
}

function* orderDetailRequest({ id }) {
  try {
    yield call(getOrder, { id });
    while (true) {
      yield delay(60000);
      yield call(getOrder, { id });
    }
  }
  catch (error) {
    yield put(Creators.getOrderDetailFailure({ error }));
  }
}

function* orderCancelRequest({ cancelReason, canceledBy, orderId, cancelReasonSource, cancelNote, totalRefundAmount, canceledByFullName }) {
  const postMessageData = {
    tpye: POST_MESSAGE_TYPE.cancelOrder,
    orderId,
    reason: cancelReason,
    user: canceledBy,
    reasonSource: cancelReasonSource,
    totalRefundAmount,
    cancelNote,
    timestamp: new Date().getTime(),
  };
  try {
    const { payload } = yield call(postOrderCancel, {
      cancelReason,
      canceledBy,
      orderId,
      cancelReasonSource,
      cancelNote,
      canceledByFullName,
    });
    postMessageData.status = POST_MESSAGE_ACTION_STATUS.success;
    postMessageData.timestamp = new Date().getTime();

    yield put(Creators.orderCancelSuccess({ payload }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.orderCancelFailure({ error }));

    postMessageData.status = POST_MESSAGE_ACTION_STATUS.error;
    postMessageData.timestamp = new Date().getTime();
    yield put(ToastCreators.error({ error }));
  }
  finally {
    postMessage(postMessageData);
  }
}

function* returnOrderRequest({ orderId, returnReason, returnedBy, totalRefundAmount }) {
  const postMessageData = {
    tpye: POST_MESSAGE_TYPE.refund,
    orderId,
    user: returnedBy,
    totalRefundAmount,
    reason: returnReason,
  };
  try {
    yield call(postReturnOrder, { orderId, returnReason, returnedBy });
    yield put(Creators.returnOrderSuccess());

    postMessageData.status = POST_MESSAGE_ACTION_STATUS.success;
    postMessageData.timestamp = new Date().getTime();
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.returnOrderFailure({ error }));
    postMessageData.status = POST_MESSAGE_ACTION_STATUS.error;
    postMessageData.timestamp = new Date().getTime();

    yield put(ToastCreators.error({ error }));
  }
  finally {
    postMessage(postMessageData);
  }
}

function* productReturnRequest({ orderId, productReturnItemList, returnReason, returnedBy, totalRefundAmount }) {
  const postMessageData = {
    tpye: POST_MESSAGE_TYPE.partialRefund,
    orderId,
    user: returnedBy,
    reason: returnReason,
    totalRefundAmount,
    returnedProducts: productReturnItemList,
  };
  try {
    yield call(postProductReturn, { orderId, productReturnItemList, returnReason, returnedBy });
    yield put(Creators.productReturnSuccess());

    postMessageData.status = POST_MESSAGE_ACTION_STATUS.success;
    postMessageData.timestamp = new Date().getTime();
    yield put(ToastCreators.success());
  }
  catch (error) {
    postMessageData.status = POST_MESSAGE_ACTION_STATUS.error;
    postMessageData.timestamp = new Date().getTime();

    yield put(Creators.productReturnFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
  finally {
    postMessage(postMessageData);
  }
}

function* payAmountRequest({ amount, note, orderId }) {
  try {
    yield call(postPayAmountToVendor, { amount, note, orderId });
    yield put(Creators.payAmountSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.payAmountFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* takeAmountRequest({ amount, note, orderId }) {
  try {
    yield call(postTakeAmountFromVendor, { amount, note, orderId });
    yield put(Creators.takeAmountSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.takeAmountFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* orderNoteRequest({ adminNote, orderId }) {
  try {
    const { payload } = yield call(postOrderNote, { adminNote, orderId });
    yield put(Creators.getOrderDetailRequest({ id: orderId }));
    yield put(Creators.orderNoteSuccess({ payload }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.orderNoteFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchOrderDetailRequest() {
  yield takeLatest(Types.GET_ORDER_DETAIL_REQUEST, orderDetailRequest);
}

function* watchOrderCancelRequest() {
  yield takeLatest(Types.ORDER_CANCEL_REQUEST, orderCancelRequest);
}

function* watchReturnOrderRequest() {
  yield takeLatest(Types.RETURN_ORDER_REQUEST, returnOrderRequest);
}

function* watchProductReturnRequest() {
  yield takeLatest(Types.PRODUCT_RETURN_REQUEST, productReturnRequest);
}

function* watchPayAmountRequest() {
  yield takeLatest(Types.PAY_AMOUNT_REQUEST, payAmountRequest);
}

function* watchTakeAmountRequest() {
  yield takeLatest(Types.TAKE_AMOUNT_REQUEST, takeAmountRequest);
}

function* watchOrderNoteRequest() {
  yield takeLatest(Types.ORDER_NOTE_REQUEST, orderNoteRequest);
}

export default function* orderdetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchOrderDetailRequest),
      fork(watchOrderCancelRequest),
      fork(watchReturnOrderRequest),
      fork(watchProductReturnRequest),
      fork(watchPayAmountRequest),
      fork(watchTakeAmountRequest),
      fork(watchOrderNoteRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
