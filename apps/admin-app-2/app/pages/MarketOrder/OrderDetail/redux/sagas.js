import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { isEmpty } from 'lodash';

import { t as translation, getLangKey } from '@shared/i18n';
import {
  cancelOrder as cancelOrderCustomer,
  partialRefundOrder as partialRefundOrderCustomer,
  getWholeRefundReasons,
  wholeRefundOrder,
  createPromo,
} from '@shared/api/customer';
import {
  getOrderDetail,
  updateFraudOrder,
  cancelOrder,
  getInvoiceUrl,
  getFraudOrderDetail,
  createForbiddenMatch,
  createMarketOrderFeedback,
  getOrderCancelReasons,
  getSlottedDeliveryOptions,
  changeDeliveryTimeSlot,
  getPartialRefundReasons,
  getSlottedDeliveryOptionsForVoyager,
} from '@shared/api/marketOrder';
import { getOrderById } from '@shared/api/marketAdminPanel';
import { getConfigKey, getMarketConfig } from '@shared/api/marketConfig';
import { getClientFeedbacks } from '@shared/api/feedback';
import { SOCKET_EVENT } from '@shared/api/socket/constants';
import { createNote, getNotes } from '@shared/api/note';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { createSocketEventChannel } from '@shared/redux/sagas/common';
import { invoiceUrlProcessingRequest } from '@shared/shared/constantValues';
import { Types, Creators } from './actions';
import { getCourier } from '@shared/api/courier';
import { INTEGRATION_CHANNELS, MAX_DISCOUNT_WARN_CONFIG } from '../constants';
import { createStockRefundOrder } from '@shared/api/stock';
import { GETIR_DOMAIN_TYPES } from '@shared/shared/constants';
import { handleSalesforceNotification } from '../utils';

export function* getOrderDetailRequest({ id, domainType }) {
  try {
    const payload = yield call(getOrderDetail, { id, domainType });
    yield put(Creators.getOrderDetailSuccess({ orderDetail: payload }));
  }
  catch (error) {
    yield put(Creators.getOrderDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getOrderNotesRequest({ orderId, toType }) {
  try {
    const response = yield call(getNotes, { to: orderId, toType });
    yield put(Creators.getOrderNotesSuccess({ notes: response?.notes }));
  }
  catch (error) {
    yield put(Creators.getOrderNotesFailure({ error }));
  }
}
export function* getFraudOrderDetailRequest({ id, domainType }) {
  try {
    const payload = yield call(getFraudOrderDetail, { id, domainType });
    yield put(
      Creators.getFraudOrderDetailSuccess({ fraudOrderDetail: payload }),
    );
  }
  catch (error) {
    yield put(Creators.getFraudOrderDetailFailure({ error }));
  }
}

export function* createOrderNoteRequest({
  to,
  toType,
  domainType,
  message,
  from,
}) {
  try {
    const data = yield call(createNote, { to, toType, domainType, message, from });
    yield put(Creators.createOrderNoteSuccess({ note: data?.note }));
  }
  catch (error) {
    yield put(Creators.createOrderNoteFailure({ error }));
  }
}

export function* getOrderCancelOptionsRequest({ id, domainType }) {
  try {
    const payload = yield call(getOrderCancelReasons, { id, domainType });
    yield put(
      Creators.getOrderCancelOptionsSuccess({ data: payload.cancelReasons }),
    );
  }
  catch (error) {
    yield put(Creators.getOrderCancelOptionsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* cancelOrderCustomerRequest({
  domainType,
  id,
  callerId,
  reasonId,
  reasonName,
  note,
}) {
  try {
    const payload = yield call(cancelOrderCustomer, {
      domainType,
      id,
      callerId,
      reasonId,
      reasonName,
      note,
    });
    yield put(Creators.cancelOrderSuccess({ payload }));
    yield put(ToastCreators.success());
    yield put(Creators.getOrderDetailRequest({ domainType, id }));
  }
  catch (error) {
    yield put(Creators.cancelOrderFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getWholeRefundReasonsRequest() {
  try {
    const payload = yield call(getWholeRefundReasons);
    yield put(Creators.getWholeRefundReasonsSuccess({ data: payload.reasons }));
  }
  catch (error) {
    yield put(Creators.getWholeRefundReasonsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* wholeRefundOrderRequest({
  domainType,
  warehouseId,
  orderId,
  products,
}) {
  try {
    const payload = yield call(wholeRefundOrder, {
      warehouseId,
      orderId,
      products,
    });
    yield put(Creators.wholeOrderSuccess({ payload }));
    yield put(
      ToastCreators.success(),
    );
    yield put(Creators.getOrderDetailRequest({ domainType, id: orderId }));
  }
  catch (error) {
    yield put(Creators.wholeOrderFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* createPromoRequest({ data }) {
  const {
    orderId,
    deliveryFee,
    client,
    discountAmount,
    isBalanceEnabled,
    doNotApplyMinimumBasketSize,
    domainTypes,
    countryCode,
    title,
    validDayAmount,
    createdBy,
    onSuccess,
    channel,
    action,
  } = data;
  try {
    const payload = yield call(createPromo, {
      deliveryFee,
      client,
      discountAmount,
      isBalanceEnabled,
      doNotApplyMinimumBasketSize,
      domainTypes,
      countryCode,
      title,
      validDayAmount,
      createdBy,
    });
    yield put(Creators.createPromoSuccess({ payload }));
    yield put(
      ToastCreators.success({
        message: translation(
          'marketOrderPage:AGENT_ACTIONS.MODAL.DISCOUNT.SUCCESS',
        ),
      }),
    );

    if (onSuccess) {
      onSuccess(payload);
    }
    else {
      yield put(
        Creators.getOrderDetailRequest({
          domainType: domainTypes[0],
          id: orderId,
        }),
      );
    }
  }
  catch (error) {
    yield put(Creators.cancelOrderFailure({ error }));
    yield put(ToastCreators.error({ error }));
    if (channel === INTEGRATION_CHANNELS.salesforce) {
      handleSalesforceNotification({ message: error, status: 'error', action });
    }
  }
}

export function* cancelOrderRequest({
  domainType,
  id,
  callerType,
  reasonId,
  status,
  note,
  onSuccess,
  channel,
  action,
  source,
}) {
  try {
    const payload = yield call(cancelOrder, {
      domainType,
      id,
      callerType,
      reasonId,
      note,
      source,
    });
    yield put(Creators.cancelOrderSuccess({ payload }));
    if (onSuccess) {
      onSuccess();
    }
    if (status && !isEmpty(payload)) {
      yield put(Creators.updateFraudOrderRequest({ domainType, id, status }));
    }
    yield put(Creators.getOrderDetailRequest({ domainType, id }));
  }
  catch (error) {
    yield put(Creators.cancelOrderFailure({ error }));
    yield put(ToastCreators.error({ error }));
    if (channel === INTEGRATION_CHANNELS.salesforce) {
      handleSalesforceNotification({ message: error, status: 'error', action });
    }
  }
}

export function* updateFraudOrderRequest({ id, domainType, status }) {
  try {
    const payload = yield call(updateFraudOrder, { id, domainType, status });
    yield put(Creators.updateFraudOrderSuccess({ payload }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateFraudOrderFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getClientFeedbacksRequest({ clientId }) {
  try {
    const { feedbacks } = yield call(getClientFeedbacks, { clientId });
    yield put(Creators.getClientFeedbacksSuccess({ data: feedbacks }));
  }
  catch (error) {
    yield put(Creators.getClientFeedbacksFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getInvoiceUrlRequest({ clientId, domainType, orderId }) {
  const popup = window.open('', '_blank');
  popup.document.write(invoiceUrlProcessingRequest[getLangKey()]);
  try {
    const data = yield call(getInvoiceUrl, { clientId, domainType, orderId });
    yield put(Creators.getInvoiceUrlSuccess({ data }));
    if (data?.url) {
      popup.location.href = data.url;
    }
    else {
      yield put(ToastCreators.error());
      popup.close();
    }
  }
  catch (error) {
    yield put(Creators.getInvoiceUrlFailure({ error }));
    yield put(ToastCreators.error({ error }));
    popup.close();
  }
}

export function* createForbiddenMatchRequest({ body }) {
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

export function* partialRefundOrderCustomerRequest({
  domainType,
  orderId,
  callerId,
  products,
  refundBagFee,
  refundDeliveryFee,
  refundServiceFee,
  onSuccess,
  channel,
  action,
}) {
  try {
    const payload = yield call(partialRefundOrderCustomer, {
      domainType,
      orderId,
      callerId,
      products,
      refundBagFee,
      refundDeliveryFee,
      refundServiceFee,
    });
    yield put(Creators.partialRefundOrderCustomerSuccess({ payload }));
    yield put(
      ToastCreators.success({
        message: translation(
          'success:PARTIAL_REFUND_SUCCESS',
        ),
      }),
    );

    if (onSuccess) {
      onSuccess();
    }
    else {
      yield put(Creators.getOrderDetailRequest({ domainType, id: orderId }));
    }
  }
  catch (error) {
    yield put(Creators.partialRefundOrderCustomerFailure({ error }));
    yield put(ToastCreators.error({ error }));
    if (channel === INTEGRATION_CHANNELS.salesforce) {
      handleSalesforceNotification({ message: error, status: 'error', action });
    }
  }
}

export function* getDiscountWarnConfigRequest() {
  try {
    const data = yield call(getConfigKey, {
      useApiGwCache: true,
      body: { ...MAX_DISCOUNT_WARN_CONFIG },
    });
    yield put(Creators.getDiscountWarnConfigSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getDiscountWarnConfigFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
export function* createStockRefundOrderRequest({
  isWholeRefund,
  refundProducts,
  warehouseId,
  language,
  orderId,
}) {
  try {
    const data = yield call(createStockRefundOrder, {
      isWholeRefund,
      refundProducts,
      warehouseId,
      language,
      orderId,
    });
    yield put(Creators.createStockRefundOrderSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.createStockRefundOrderFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getSlottedDeliveryOptionsRequest({
  warehouseId,
  clientAddressLat,
  clientAddressLon,
  clientId,
  etaVersion,
  source,
  selectedSlotId,
  warehousePolygonTypes,
  domainType,
}) {
  try {
    if (domainType === GETIR_DOMAIN_TYPES.VOYAGER) {
      const response = yield call(getSlottedDeliveryOptionsForVoyager, {
        warehouseId,
        deliveryLat: clientAddressLat,
        deliveryLon: clientAddressLon,
      });

      if (response.payload && response.payload.dates && response.payload.dates.length > 0) {
        const { timezone, countryCode, dates } = response.payload;
        const slotData = {
          timezone,
          countryCode,
          slotDate: dates[0].slotDate,
        };

        const todaySlots = dates[0].slots.map(slot => ({
          ...slot,
          deliveryFee: 0,
        }));

        const tomorrowSlots = dates[1].slots.map(slot => ({
          ...slot,
          deliveryFee: 0,
          times: [
            slot.times[0],
            slot.times[1],
          ],
        }));

        slotData.slots = [...todaySlots, ...tomorrowSlots];

        yield put(Creators.getSlottedDeliveryOptionsSuccess({ data: slotData }));
      }
    }
    else {
      const response = yield call(getSlottedDeliveryOptions, {
        warehouseId,
        clientAddressLat,
        clientAddressLon,
        clientId,
        etaVersion,
        source,
        selectedSlotId,
        warehousePolygonTypes,
        domainType,
      });
      yield put(Creators.getSlottedDeliveryOptionsSuccess({ data: response }));
    }
  }
  catch (error) {
    yield put(Creators.getSlottedDeliveryOptionsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
export function* changeDeliveryTimeSlotRequest({
  orderId,
  domainType,
  clientId,
  selectedSlotId,
  onSuccess,
  selectedSlotInfo,
}) {
  try {
    if (domainType === GETIR_DOMAIN_TYPES.VOYAGER) {
      yield call(changeDeliveryTimeSlot, {
        orderId,
        domainType,
        clientId,
        selectedSlotId,
        slottedDeliveryInfo: {
          start: selectedSlotInfo.start,
          end: selectedSlotInfo.end,
        },
      });
    }
    else {
      yield call(changeDeliveryTimeSlot, {
        orderId,
        domainType,
        clientId,
        selectedSlotId,
      });
    }

    yield put(Creators.changeDeliveryTimeSlotSuccess({ slotId: selectedSlotId }));
    if (onSuccess) {
      onSuccess();
      yield put(ToastCreators.success());
    }
  }
  catch (error) {
    yield put(Creators.changeDeliveryTimeSlotFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* toggleSlotModal({ isVisible }) {
  try {
    yield put(Creators.toggleSlotModal({ isVisible }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

export function* toggleCancelOrderModal({ isVisible }) {
  try {
    yield put(Creators.toggleCancelOrderModal({ isVisible }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

export function* getConfigWithKey({ body }) {
  try {
    const { key, type } = body;

    const data = yield call(getMarketConfig, { key, type });

    yield put(Creators.getConfigWithKeySuccess({
      data: {
        key,
        ...data,
      },
    }));
  }
  catch (error) {
    yield put(Creators.getConfigWithKeyFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getOrderPartialRefundReasonsRequest({ domainType }) {
  try {
    const data = yield call(getPartialRefundReasons, { domainType });
    yield put(
      Creators.getOrderPartialRefundReasonsSuccess({ data }),
    );
  }
  catch (error) {
    yield put(Creators.getOrderPartialRefundReasonsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getOrderByIdRequest({ orderId }) {
  try {
    const data = yield call(getOrderById, { orderId });
    yield put(
      Creators.getOrderByIdSuccess({ data }),
    );
  }
  catch (error) {
    yield put(Creators.getOrderByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchgetOrderByIdRequest() {
  yield takeLatest(
    Types.GET_ORDER_BY_ID_REQUEST,
    getOrderByIdRequest,
  );
}

function* watchGetConfigWithKeyRequest() {
  yield takeEvery(Types.GET_CONFIG_WITH_KEY_REQUEST, getConfigWithKey);
}

function* watchGetDiscountWarnConfigRequest() {
  yield takeLatest(
    Types.GET_DISCOUNT_WARN_CONFIG_REQUEST,
    getDiscountWarnConfigRequest,
  );
}

export function* watchOrderDetailRequest() {
  yield takeLatest(Types.GET_ORDER_DETAIL_REQUEST, getOrderDetailRequest);
  yield takeLatest(Types.GET_ORDER_NOTES_REQUEST, getOrderNotesRequest);
  yield takeLatest(Types.CREATE_ORDER_NOTE_REQUEST, createOrderNoteRequest);
  yield takeLatest(Types.UPDATE_FRAUD_ORDER_REQUEST, updateFraudOrderRequest);
}

export function* watchCancelOrderRequest() {
  yield takeLatest(Types.CANCEL_ORDER_REQUEST, cancelOrderRequest);
}

export function* watchGetCancelOptionsRequest() {
  yield takeLatest(
    Types.GET_ORDER_CANCEL_OPTIONS_REQUEST,
    getOrderCancelOptionsRequest,
  );
}

function* watchCancelOrderCustomerRequest() {
  yield takeLatest(
    Types.CANCEL_ORDER_CUSTOMER_REQUEST,
    cancelOrderCustomerRequest,
  );
}

function* watchGetWholeRefundReasonsRequest() {
  yield takeLatest(
    Types.GET_WHOLE_REFUND_REASONS_REQUEST,
    getWholeRefundReasonsRequest,
  );
}

function* watchWholeRefundOrderRequest() {
  yield takeLatest(Types.WHOLE_REFUND_ORDER_REQUEST, wholeRefundOrderRequest);
}

export function* watchCreatePromoRequest() {
  yield takeLatest(Types.CREATE_PROMO_REQUEST, createPromoRequest);
}

function* watchGetFraudOrderDetailRequest() {
  yield takeLatest(
    Types.GET_FRAUD_ORDER_DETAIL_REQUEST,
    getFraudOrderDetailRequest,
  );
}

function* watchGetInvoiceUrlRequest() {
  yield takeLatest(Types.GET_INVOICE_URL_REQUEST, getInvoiceUrlRequest);
}

function* watchGetClientFeedbacksRequest() {
  yield takeLatest(
    Types.GET_CLIENT_FEEDBACKS_REQUEST,
    getClientFeedbacksRequest,
  );
}

function* watchCreateForbiddenMatchRequest() {
  yield takeLatest(
    Types.CREATE_FORBIDDEN_MATCH_REQUEST,
    createForbiddenMatchRequest,
  );
}

export function* watchPartialRefundOrderCustomerRequest() {
  yield takeLatest(
    Types.PARTIAL_REFUND_ORDER_CUSTOMER_REQUEST,
    partialRefundOrderCustomerRequest,
  );
}

export function* watchCreateStockRefundOrderRequest() {
  yield takeLatest(
    Types.CREATE_STOCK_REFUND_ORDER_REQUEST,
    createStockRefundOrderRequest,
  );
}
function* createMarketOrderFeedbackRequest({ data }) {
  try {
    const feedback = yield call(createMarketOrderFeedback, { data });
    yield put(Creators.createMarketOrderFeedbackSuccess({ data: feedback }));

    yield put(Creators.getClientFeedbacksRequest({ clientId: data.client }));
    yield put(
      Creators.getOrderDetailRequest({
        domainType: data.domainType,
        id: data.order,
      }),
    );
  }
  catch (error) {
    yield put(Creators.createMarketOrderFeedbackFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchCreateMarketOrderFeedbackRequest() {
  yield takeLatest(
    Types.CREATE_MARKET_ORDER_FEEDBACK_REQUEST,
    createMarketOrderFeedbackRequest,
  );
}

export function* startListeningSocketEvents({ marketOrder }) {
  const channels = [];
  let isOrderExist = false;

  const { _id, courier } = marketOrder;

  if (_id) {
    isOrderExist = true;
    channels.push(
      call(createSocketEventChannel, SOCKET_EVENT.MARKET_ORDER_STATUS_CHANGED, { marketOrderId: marketOrder._id }),
    );
    channels.push(
      call(createSocketEventChannel, SOCKET_EVENT.MARKET_ORDER_COURIER_CHANGED),
    );
  }

  let isCourierExist = false;

  if (courier?.id) {
    isCourierExist = true;
    channels.push(
      call(createSocketEventChannel, SOCKET_EVENT.COURIER_DETAIL_UPDATED, { courierId: courier?.id }),
    );
    channels.push(
      call(createSocketEventChannel, SOCKET_EVENT.COURIER_LOCATION_CHANGED, { courierId: courier?.id }),
    );
  }

  const [
    orderChannel,
    courierChangedChannel,
    courierChannel,
    courierLocationChannel,
  ] = yield all(channels);
  yield all([
    isOrderExist ? fork(watchOrderStatus, orderChannel) : null,
    isOrderExist ? fork(watchCourierChanged, courierChangedChannel) : null,
    isCourierExist ? fork(watchCourierStatus, courierChannel) : null,
    isCourierExist
      ? fork(watchCourierLocationChanged, courierLocationChannel)
      : null,
  ]);
}

function* watchSocketEvents() {
  yield takeLatest(
    Types.START_LISTENING_SOCKET_EVENTS,
    startListeningSocketEvents,
  );
}

function* watchCourierStatus(channel) {
  try {
    while (true) {
      const { status } = yield take(channel);
      if (status) {
        yield put(Creators.updateCourierStatus({ status }));
      }
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
  finally {
    channel.close();
  }
}

function* watchOrderStatus(channel) {
  try {
    while (true) {
      const { orderStatus: status } = yield take(channel);
      if (status) {
        yield put(Creators.updateOrderStatus({ status }));
      }
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
  finally {
    channel.close();
  }
}
function* watchCourierChanged(channel) {
  try {
    while (true) {
      const data = yield take(channel);
      if (data?.courier?.id) {
        const courier = yield call(getCourier, { id: data?.courier?.id });
        if (courier) {
          yield put(Creators.updateCourier({ courier }));
        }
      }
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
  finally {
    channel.close();
  }
}
function* watchCourierLocationChanged(channel) {
  try {
    while (true) {
      const data = yield take(channel);
      if (data?.lat && data?.lon) {
        const coordinates = [data.lon, data.lat];
        yield put(Creators.updateCourierLocation({ coordinates }));
      }
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
  finally {
    channel.close();
  }
}

export function* watchGetSlottedDeliveryOptionsRequest() {
  yield takeLatest(
    Types.GET_SLOTTED_DELIVERY_OPTIONS_REQUEST,
    getSlottedDeliveryOptionsRequest,
  );
}
export function* watchChangeDeliveryTimeSlotRequest() {
  yield takeLatest(
    Types.CHANGE_DELIVERY_TIME_SLOT_REQUEST,
    changeDeliveryTimeSlotRequest,
  );
}

export function* watchToggleSlotModal() {
  yield take(Types.TOGGLE_SLOT_MODAL, toggleSlotModal);
}

export function* watchToggleCancelOrderModal() {
  yield take(Types.TOGGLE_CANCEL_ORDER_MODAL, toggleCancelOrderModal);
}
export function* watchGetOrderPartialRefundReasonsRequest() {
  yield takeLatest(Types.GET_ORDER_PARTIAL_REFUND_REASONS_REQUEST, getOrderPartialRefundReasonsRequest);
}

export default function* orderDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchOrderDetailRequest),
      fork(watchSocketEvents),
      fork(watchGetClientFeedbacksRequest),
      fork(watchCreateForbiddenMatchRequest),
      fork(watchGetInvoiceUrlRequest),
      fork(watchGetFraudOrderDetailRequest),
      fork(watchGetCancelOptionsRequest),
      fork(watchCancelOrderCustomerRequest),
      fork(watchPartialRefundOrderCustomerRequest),
      fork(watchGetWholeRefundReasonsRequest),
      fork(watchWholeRefundOrderRequest),
      fork(watchCreateMarketOrderFeedbackRequest),
      fork(watchCreatePromoRequest),
      fork(watchCancelOrderRequest),
      fork(watchGetDiscountWarnConfigRequest),
      fork(watchCreateStockRefundOrderRequest),
      fork(watchGetSlottedDeliveryOptionsRequest),
      fork(watchChangeDeliveryTimeSlotRequest),
      fork(watchToggleSlotModal),
      fork(watchToggleCancelOrderModal),
      fork(watchGetConfigWithKeyRequest),
      fork(watchGetOrderPartialRefundReasonsRequest),
      fork(watchgetOrderByIdRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
