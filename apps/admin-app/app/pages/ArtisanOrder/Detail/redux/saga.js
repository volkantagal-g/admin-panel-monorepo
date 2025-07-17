import { all, call, delay, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';
import _ from 'lodash';

import {
  getArtisanOrderDetail,
  getArtisanOrderCancelOption,
  getArtisanOrderCancel,
  getArtisanRefundOption,
  getArtisanRefund,
  createForbiddenMatch,
  getCourierRoutes,
  getReturnsAvailability,
  getOrderReturns,
  cancelReturn,
  getReturnReq,
  setReturnDeliveryReq,
  createReturnReq,
  changeReturnSlotReq,
  getShopReturnDetailsReq,
  getAvailableSlotsForReturnReq,
  getCourierById,
  getCurrentRunnerReq,
  getReturnRunnerReq,
  getReturnRunnerHistoryReq,
  getCourierTasks,
  getArtisanCourierById,
  getCourierReturnRoutes,
  getCallInfoReq,
  getConfigKey,
  getReturnDetailsWithReturnIdList,
} from '@shared/api/artisan';
import { getNotes, createNote } from '@shared/api/note';
import { getUserById } from '@shared/api/user';
import { getPaymentMethods } from '@shared/api/artisanOrderActive';

import { exportFinancialInfoToExcel } from '@app/pages/ArtisanOrder/Detail/util';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from '@app/pages/ArtisanOrder/Detail/redux/actions';
import { refundTabActiveKeySelector } from '@app/pages/ArtisanOrder/Detail/redux/selectors';
import { getWarehouseById } from '@shared/api/warehouse';
import { CONFIG_TYPES } from '@app/pages/Config/constants';
import { LOCALS_CONFIG_KEYS } from '../../constants';
import { createShopExternalTransaction } from '@shared/api/localsShopExternalTransaction';

const REFRESH_INTERVAL = 15 * 1000;

function* getOrderNoteRequest({ data }) {
  try {
    const { notes } = yield call(getNotes, data);
    yield put(Creators.getOrderNoteSuccess({ data: notes }));
  }
  catch (error) {
    yield put(Creators.getOrderNoteFailure({ error }));
  }
}

function* createOrderNoteRequest({ data }) {
  try {
    const { note } = yield call(createNote, data);
    yield put(Creators.createOrderNoteSuccess({ data: note }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.createOrderNoteFailure({ error }));
  }
}

function* getUserByIdRequest({ id }) {
  try {
    const data = yield call(getUserById, { id });
    yield put(Creators.getUserByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getUserByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* refreshGetOrderDetail({ orderDetailId }) {
  const getOpenActionModal = localStorage.getItem('openActionModal');
  if (!_.isString(getOpenActionModal)) {
    const data = yield call(getArtisanOrderDetail, { id: orderDetailId });
    yield put(Creators.getOrderDetailSuccess({ data }));
  }
}

function* getOrderDetailRequest({ orderDetailId }) {
  try {
    yield call(refreshGetOrderDetail, { orderDetailId });
    while (true) {
      yield delay(REFRESH_INTERVAL);
      const isModalOpen = localStorage.getItem('openActionModal');
      if (!isModalOpen) {
        yield call(refreshGetOrderDetail, { orderDetailId });
      }
    }
  }
  catch (error) {
    yield put(Creators.getOrderDetailFailure({ error }));
  }
}

function* refreshGetCourierRoute({ body }) {
  const data = yield call(getCourierRoutes, { body });
  yield put(Creators.getCourierRouteSuccess({ data }));
}

function* getCourierRouteRequest({ body }) {
  try {
    yield call(refreshGetCourierRoute, { body });
    while (true) {
      yield delay(REFRESH_INTERVAL);
      const isModalOpen = localStorage.getItem('openActionModal');
      if (!isModalOpen) {
        yield call(refreshGetCourierRoute, { body });
      }
    }
  }
  catch (error) {
    yield put(Creators.getCourierRouteFailure({ error }));
  }
}

function* refreshGetCourierReturnRoute({ body }) {
  const data = yield call(getCourierReturnRoutes, { body });
  yield put(Creators.getCourierReturnRouteSuccess({ data }));
}

function* getCourierReturnRouteRequest({ body }) {
  try {
    yield call(refreshGetCourierReturnRoute, { body });
    while (true) {
      yield delay(REFRESH_INTERVAL);
      const isModalOpen = localStorage.getItem('openActionModal');
      if (!isModalOpen) {
        yield call(refreshGetCourierReturnRoute, { body });
      }
    }
  }
  catch (error) {
    yield put(Creators.getCourierReturnRouteFailure({ error }));
  }
}

function* refreshGetCourierByIdRequest({ courierId }) {
  const data = yield call(getCourierById, { courierId });
  yield put(Creators.getCourierByIdSuccess({ data }));
}

function* getCourierByIdRequest({ courierId }) {
  try {
    if (courierId) {
      yield call(refreshGetCourierByIdRequest, { courierId });
      while (true) {
        yield delay(REFRESH_INTERVAL);
        yield call(refreshGetCourierByIdRequest, { courierId });
      }
    }
  }
  catch (error) {
    yield put(Creators.getCourierByIdFailure({ error }));
  }
}

function* getWarehouseRequest({ id }) {
  try {
    const data = yield call(getWarehouseById, { id });
    yield put(Creators.getWarehouseSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getWarehouseFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* exportFinancialInfoRequest({ financialInfo }) {
  try {
    exportFinancialInfoToExcel(financialInfo);
    yield put(Creators.exportFinancialInfoSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.exportFinancialInfoFailure({ error }));
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

function* getOrderCancelOptionRequest({ orderDetailId }) {
  try {
    const data = yield call(getArtisanOrderCancelOption, { id: orderDetailId });
    yield put(Creators.getOrderCancelOptionSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getOrderCancelOptionFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getOrderCancelRequest({ id, body: req }) {
  try {
    const data = yield call(getArtisanOrderCancel, {
      id,
      body: {
        ...req,
        toggles: { checkMaskedCall: false },
      },
    });
    yield put(Creators.getOrderCancelSuccess({ data }));
    const orderDetailData = yield call(getArtisanOrderDetail, { id });
    yield put(Creators.getOrderDetailSuccess({ data: orderDetailData }));
  }
  catch (error) {
    yield put(Creators.getOrderCancelFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* createExternalTransactionRequest({ body }) {
  try {
    const data = yield call(createShopExternalTransaction, body);
    yield put(Creators.createExternalTransactionSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.createExternalTransactionFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getReturnDetailsWithReturnIdListRequest({ returnIds }) {
  try {
    const data = yield call(getReturnDetailsWithReturnIdList, { returnIds });
    yield put(Creators.getReturnDetailsWithReturnIdListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getReturnDetailsWithReturnIdListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getOrderRefundRequest({ orderDetailId, body }) {
  try {
    const data = yield call(getArtisanRefund, { orderDetailId, body });
    yield put(Creators.getOrderRefundSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getOrderRefundFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* refreshGetOrderReturns({ returnId }) {
  // TODO: remove mock items from data
  let data = yield call(getOrderReturns, { returnId });
  data = {
    ...data,
    deliveryTypeOptions: [
      {
        typeId: 1,
        typeText: 'Kuryeye Teslim',
      },
      {
        typeId: 2,
        typeText: 'Mağazaya Teslim',
      },
      {
        typeId: 3,
        typeText: 'Anlık Para İadesi',
      },
    ],
  };
  yield put(Creators.getOrderReturnsSuccess({ data }));
}

function* getOrderReturnsRequest({ returnId }) {
  try {
    // TODO: remove mock items from data
    let data = yield call(getOrderReturns, { returnId });
    data = {
      ...data,
      deliveryTypeOptions: [
        {
          typeId: 1,
          typeText: 'Kuryeye Teslim',
        },
        {
          typeId: 2,
          typeText: 'Mağazaya Teslim',
        },
        {
          typeId: 3,
          typeText: 'Anlık Para İadesi',
        },
      ],
      selectedProducts: data.selectedProducts?.map(product => ({
        ...product,
        returnReasonDescription: 'İşletme Kaynaklı- Teslim görünüyor ancak teslim edilmedi',
      })),
    };
    yield put(Creators.getOrderReturnsSuccess({ data }));
    yield put(Creators.setRefundTabActiveKey({ refundTabActiveKey: returnId }));
    while (true) {
      yield delay(REFRESH_INTERVAL);
      yield call(refreshGetOrderReturns, { returnId });
    }
  }
  catch (error) {
    yield put(Creators.getOrderReturnsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getReturnsAvailabilityRequest({ orderDetailId }) {
  try {
    const data = yield call(getReturnsAvailability, { orderDetailId });

    yield put(Creators.getReturnsAvailabilitySuccess({ data }));

    if (data?.returns?.length > 0) {
      yield put(Creators.getOrderReturnsRequest({ returnId: data.returns?.[0]?.id }));
    }
  }
  catch (error) {
    yield put(Creators.getReturnsAvailabilityFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* cancelReturnRequest() {
  try {
    const returnId = yield select(refundTabActiveKeySelector.getData);
    yield call(cancelReturn, { returnId });
    yield put(Creators.cancelReturnSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.cancelReturnFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getOrderRefundOptionRequest({ orderDetailId }) {
  try {
    const data = yield call(getArtisanRefundOption, { id: orderDetailId });
    yield put(Creators.getOrderRefundOptionSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getOrderRefundOptionFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* createForbiddenMatchRequest({ body }) {
  try {
    const data = yield call(createForbiddenMatch, { body });
    yield put(Creators.createForbiddenMatchSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.createForbiddenMatchFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getReturnRequest(action) {
  const { orderId } = action;

  try {
    const data = yield call(getReturnReq, { orderId });
    yield put(Creators.getReturnRequestSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getReturnRequestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getShopReturnDetails(action) {
  const { returnId, onSuccess, onFinally } = action;

  try {
    const data = yield call(getShopReturnDetailsReq, { returnId });
    onSuccess?.(data);
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
  finally {
    onFinally?.();
  }
}

function* changeReturnSlot(action) {
  const { onSuccess, onFinally, type, ...rest } = action;

  try {
    const data = yield call(changeReturnSlotReq, { ...rest });
    onSuccess?.(data);
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
  finally {
    onFinally?.();
  }
}

function* getAvailableSlotsForReturn(action) {
  const { onSuccess, onFinally, returnId } = action;

  try {
    const data = yield call(getAvailableSlotsForReturnReq, { returnId });
    onSuccess?.(data);
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
  finally {
    onFinally?.();
  }
}

function* getCurrentRunnerRequest(action) {
  const { orderId } = action;
  try {
    const data = yield call(getCurrentRunnerReq, { orderId });
    yield put(Creators.getCurrentRunnerSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* getReturnRunnerRequest(action) {
  const { returnId } = action;
  try {
    const data = yield call(getReturnRunnerReq, { returnId });
    yield put(Creators.getReturnRunnerSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* getReturnRunnerHistoryRequest(action) {
  const { returnId } = action;
  try {
    const data = yield call(getReturnRunnerHistoryReq, { returnId });
    yield put(Creators.getReturnRunnerHistorySuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* setReturnDelivery(action) {
  const { type, ...rest } = action;

  try {
    const data = yield call(setReturnDeliveryReq, { ...rest });
    yield put(Creators.setReturnDeliveryRequestSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.setReturnDeliveryRequestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* createReturnRequest(action) {
  const { onSuccess, type, ...rest } = action;

  try {
    const data = yield call(createReturnReq, { ...rest });
    yield put(Creators.createReturnRequestSuccess({ data }));

    onSuccess?.();
  }
  catch (error) {
    yield put(Creators.createReturnRequestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* refreshGetCourierTasksRequest({ orderDetailId, returnId }) {
  const data = yield call(getCourierTasks, { orderDetailId, returnId });
  yield put(Creators.getCourierTasksSuccess({ data }));
}

function* getCourierTasksRequest({ orderDetailId, returnId }) {
  try {
    yield call(refreshGetCourierTasksRequest, { orderDetailId, returnId });
    while (true) {
      yield delay(REFRESH_INTERVAL);
      const isModalOpen = localStorage.getItem('openActionModal');
      if (!isModalOpen) {
        yield call(refreshGetCourierTasksRequest, { orderDetailId, returnId });
      }
    }
  }
  catch (error) {
    yield put(Creators.getCourierTasksFailure({ error }));
  }
}

function* getArtisanCourierByIdRequest({ courierId }) {
  try {
    if (courierId) {
      const data = yield call(getArtisanCourierById, { courierId });
      yield put(Creators.getArtisanCourierByIdSuccess({ data }));
    }
  }
  catch (error) {
    yield put(Creators.getArtisanCourierByIdFailure({ error }));
  }
}

function* getCallInfoRequest({ orderId, callPin }) {
  try {
    const data = yield call(getCallInfoReq, { orderId, callPin });
    yield put(Creators.getCallInfoSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getCallInfoFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getCallInfoMessages() {
  try {
    const data = yield call(getConfigKey, {
      key: LOCALS_CONFIG_KEYS.CALL_INFO,
      type: CONFIG_TYPES.OBJECT,
    });
    yield put(Creators.getCallInfoMessagesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getCallInfoMessagesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetCourierTasksRequest() {
  yield takeLatest(Types.GET_COURIER_TASKS_REQUEST, getCourierTasksRequest);
}

function* watchGetArtisanCourierByIdRequest() {
  yield takeLatest(Types.GET_ARTISAN_COURIER_BY_ID_REQUEST, getArtisanCourierByIdRequest);
}

function* watchChangeReturnSlotRequest() {
  yield takeLatest(Types.CHANGE_RETURN_SLOT_REQUEST, changeReturnSlot);
}

function* watchGetAvailableSlotsForReturnRequest() {
  yield takeLatest(Types.GET_AVAILABLE_SLOTS_FOR_RETURN_REQUEST, getAvailableSlotsForReturn);
}

function* watchGetReturnRequest() {
  yield takeLatest(Types.GET_RETURN_REQUEST, getReturnRequest);
}

function* watchGetShopReturnDetails() {
  yield takeLatest(Types.GET_SHOP_RETURN_DETAILS_REQUEST, getShopReturnDetails);
}

function* watchSetReturnDeliveryRequest() {
  yield takeLatest(Types.SET_RETURN_DELIVERY_REQUEST, setReturnDelivery);
}

function* watchCreateReturnRequest() {
  yield takeLatest(Types.CREATE_RETURN_REQUEST, createReturnRequest);
}

function* watchGetUserByIdRequest() {
  yield takeLatest(Types.GET_USER_BY_ID_REQUEST, getUserByIdRequest);
}

function* watchCreateForbiddenMatchRequest() {
  yield takeLatest(Types.CREATE_FORBIDDEN_MATCH_REQUEST, createForbiddenMatchRequest);
}

function* watchPaymentMethodsRequest() {
  yield takeLatest(Types.GET_PAYMENT_METHODS_REQUEST, getPaymentMethodsRequest);
}

function* watchGetOrderDetailRequest() {
  yield takeLatest(Types.GET_ORDER_DETAIL_REQUEST, getOrderDetailRequest);
}

function* watchGetCourierRouteRequest() {
  yield takeLatest(Types.GET_COURIER_ROUTE_REQUEST, getCourierRouteRequest);
}

function* watchGetCourierReturnRouteRequest() {
  yield takeLatest(Types.GET_COURIER_RETURN_ROUTE_REQUEST, getCourierReturnRouteRequest);
}

function* watchGetOrderNoteRequest() {
  yield takeLatest(Types.GET_ORDER_NOTE_REQUEST, getOrderNoteRequest);
}

function* watchCreateOrderNoteRequest() {
  yield takeLatest(Types.CREATE_ORDER_NOTE_REQUEST, createOrderNoteRequest);
}

function* watchGetOrderRefundRequest() {
  yield takeLatest(Types.GET_ORDER_REFUND_REQUEST, getOrderRefundRequest);
}

function* watchGetOrderReturnsRequest() {
  yield takeLatest(Types.GET_ORDER_RETURNS_REQUEST, getOrderReturnsRequest);
}

function* watchGetReturnsAvailabilityRequest() {
  yield takeLatest(Types.GET_RETURNS_AVAILABILITY_REQUEST, getReturnsAvailabilityRequest);
}

function* watchCancelReturnRequest() {
  yield takeLatest(Types.CANCEL_RETURN_REQUEST, cancelReturnRequest);
}

function* watchGetOrderCancelOptionRequest() {
  yield takeLatest(Types.GET_ORDER_CANCEL_OPTION_REQUEST, getOrderCancelOptionRequest);
}

function* watchGetOrderCancelRequest() {
  yield takeLatest(Types.GET_ORDER_CANCEL_REQUEST, getOrderCancelRequest);
}

function* watchCreateExternalTransactionRequest() {
  yield takeLatest(Types.CREATE_EXTERNAL_TRANSACTION_REQUEST, createExternalTransactionRequest);
}

function* watchGetReturnDetailsWithReturnIdListRequest() {
  yield takeLatest(Types.GET_RETURN_DETAILS_WITH_RETURN_ID_LIST_REQUEST, getReturnDetailsWithReturnIdListRequest);
}

function* watchExportFinancialInfoRequest() {
  yield takeLatest(Types.EXPORT_FINANCIAL_INFO_REQUEST, exportFinancialInfoRequest);
}

function* watchGetRefundOptionRequest() {
  yield takeLatest(Types.GET_ORDER_REFUND_OPTION_REQUEST, getOrderRefundOptionRequest);
}

function* watchGetWarehouseRequest() {
  yield takeLatest(Types.GET_WAREHOUSE_REQUEST, getWarehouseRequest);
}

function* watchGetCourierByIdRequest() {
  yield takeLatest(Types.GET_COURIER_BY_ID_REQUEST, getCourierByIdRequest);
}

function* watchGetCurrentRunnerRequest() {
  yield takeLatest(Types.GET_CURRENT_RUNNER_REQUEST, getCurrentRunnerRequest);
}

function* watchGetReturnRunnerRequest() {
  yield takeLatest(Types.GET_RETURN_RUNNER_REQUEST, getReturnRunnerRequest);
}

function* watchGetReturnRunnerHistoryRequest() {
  yield takeLatest(Types.GET_RETURN_RUNNER_REQUEST, getReturnRunnerHistoryRequest);
}

function* watchGetCallInfoRequest() {
  yield takeLatest(Types.GET_CALL_INFO_REQUEST, getCallInfoRequest);
}

function* watchGetCallInfoMessages() {
  yield takeLatest(Types.GET_CALL_INFO_MESSAGES_REQUEST, getCallInfoMessages);
}

export default function* orderDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetOrderDetailRequest),
      fork(watchGetCourierRouteRequest),
      fork(watchGetCourierReturnRouteRequest),
      fork(watchGetOrderCancelOptionRequest),
      fork(watchGetOrderCancelRequest),
      fork(watchCreateExternalTransactionRequest),
      fork(watchGetReturnDetailsWithReturnIdListRequest),
      fork(watchGetRefundOptionRequest),
      fork(watchGetOrderRefundRequest),
      fork(watchGetOrderReturnsRequest),
      fork(watchGetReturnsAvailabilityRequest),
      fork(watchCancelReturnRequest),
      fork(watchExportFinancialInfoRequest),
      fork(watchGetOrderNoteRequest),
      fork(watchCreateOrderNoteRequest),
      fork(watchPaymentMethodsRequest),
      fork(watchGetWarehouseRequest),
      fork(watchCreateForbiddenMatchRequest),
      fork(watchGetUserByIdRequest),
      fork(watchGetReturnRequest),
      fork(watchSetReturnDeliveryRequest),
      fork(watchCreateReturnRequest),
      fork(watchGetShopReturnDetails),
      fork(watchChangeReturnSlotRequest),
      fork(watchGetAvailableSlotsForReturnRequest),
      fork(watchGetCourierByIdRequest),
      fork(watchGetCurrentRunnerRequest),
      fork(watchGetReturnRunnerRequest),
      fork(watchGetReturnRunnerHistoryRequest),
      fork(watchGetCourierTasksRequest),
      fork(watchGetArtisanCourierByIdRequest),
      fork(watchGetCallInfoRequest),
      fork(watchGetCallInfoMessages),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
