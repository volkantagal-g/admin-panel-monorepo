/* eslint-disable no-param-reassign */
import { all, call, delay, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';
import { get, has } from 'lodash';

import moment from 'moment';

import { getLangKey, t } from '@shared/i18n';
import {
  getFoodOrderDetail,
  getFoodOrderCancelOptions,
  foodOrderCancel,
  getFoodOrderChangeOptions,
  getAvailableChangeTypesForOrder,
  addChangeReasonAtOrder,
  updateChangeReasonAtOrder,
  getMainReasons,
  getSubReasons,
  getSubReason,
  getRefundSources,
  setInquiry,
  createForbiddenMatch,
  getFoodOrderCourierJson,
  getFoodOrderFinancials,
  getAgreementData,
  getCourierRoutes,
  addPromoIdToOrder,
  getClientTrustScore,
} from '@shared/api/foodOrderDetail';
import { getBasketOrderDetail } from '@shared/api/foodBasket';
import { getUserById } from '@shared/api/user';
import { getNotes, createNote } from '@shared/api/note';
import { getOrderInsightInquiry } from '@shared/api/foodInsightInquiry';
import { FOOD_DELIVERY } from '@shared/shared/constants';
import { foodOrderCancelReasonSource, foodOrderChangeErrors, foodOrderRequestSource } from '@shared/shared/constantValues';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from '@app/pages/GetirFood/OrderDetail/redux/actions';
import { orderDetailSelector } from '@app/pages/GetirFood/OrderDetail/redux/selectors';
import { exportFinancialInfoToExcel, modifiedAgreementData } from '@app/pages/GetirFood/OrderDetail/util';
import { salesAgreementHTMLtr } from '@app/pages/GetirFood/OrderDetail/components/utils/tr/salesAgreementHTML';
import { salesAgreementHTMLen } from '@app/pages/GetirFood/OrderDetail/components/utils/en/salesAgreementHTML';
import { createPersonalPromo } from '@shared/api/personalPromo';
import { getMarketConfig } from '@shared/api/marketConfig';
import { FOOD_ORDER_DETAIL_CONFIG_KEYS } from '@app/pages/GetirFood/OrderDetail/constansts';
import { PROMO_PIC_CONFIG } from '@app/pages/Promo/constantValues';
import { handleSalesforceNotification } from '@app/pages/MarketOrder/OrderDetail/utils';

const REFRESH_INTERVAL = 15 * 1000;

export function* refreshGetOrderDetail({ orderDetailId }) {
  try {
    const data = yield call(getFoodOrderDetail, { foodOrderId: orderDetailId });
    yield put(Creators.getOrderDetailSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error, message: error?.response?.data?.message }));
    yield put(Creators.getOrderDetailFailure({ error }));
  }
}

export function* printAgreement({ foodOrder }) {
  try {
    const langKey = getLangKey();
    const modifiedFoodOrder = modifiedAgreementData({ foodOrder });
    const htmlTemplate = langKey === 'en'
      ? salesAgreementHTMLen({ foodOrder: modifiedFoodOrder })
      : salesAgreementHTMLtr({ foodOrder: modifiedFoodOrder });
    const winPrint = window.open('', '_blank');
    winPrint.document.write(htmlTemplate);
    winPrint.document.close();
    winPrint.print();
    winPrint.close();
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* getBasketDetailRequest({ basketOrderId }) {
  try {
    const data = yield call(getBasketOrderDetail, { basketOrderId });
    yield put(Creators.getBasketDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getBasketDetailFailure({ error }));
  }
}

export function* getOrderDetailRequest({ orderDetailId }) {
  while (true) {
    yield call(refreshGetOrderDetail, { orderDetailId });
    yield delay(REFRESH_INTERVAL);
  }
}

export function* getOrderCancelOptionRequest({ orderDetailId }) {
  try {
    const data = yield call(getFoodOrderCancelOptions, { foodOrderId: orderDetailId });
    yield put(Creators.getOrderCancelOptionSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getOrderCancelOptionFailure({ error }));
    yield put(ToastCreators.error({ error }));
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

function* orderCancelRequest({ body, requestSource, cancelSource }) {
  const { foodOrderId } = body;
  try {
    if (!has(body, 'isFoodOrderReady')) {
      body.isFoodOrderReady = true;
      if (get(body, 'isRestaurantReached') === false) {
        body.isFoodOrderReady = false;
        if (requestSource === foodOrderRequestSource.CLIENT && cancelSource === foodOrderCancelReasonSource.CLIENT) {
          const { value: cancelMinuteCheckValue } =
            yield call(getMarketConfig, { key: FOOD_ORDER_DETAIL_CONFIG_KEYS.CANCEL_MINUTE_CHECK_VALUE, type: 'Number' });
          const { checkoutDate } = yield select(orderDetailSelector.getData);
          body.isFoodOrderReady = moment(checkoutDate).add(cancelMinuteCheckValue, 'minutes').isBefore();
        }
      }
    }
    const data = yield call(foodOrderCancel, { body });
    yield put(Creators.orderCancelSuccess({ data }));
    yield put(ToastCreators.success());
    handleSalesforceNotification({
      action: 'cancel',
      message: `Cancel for OrderId: ${foodOrderId} has been given`,
      status: 'success',
      data: JSON.stringify(body),
    });
    yield fork(refreshGetOrderDetail, { orderDetailId: foodOrderId });
  }
  catch (error) {
    handleSalesforceNotification({
      action: 'cancel',
      message: `Cancel for OrderId: ${foodOrderId} has been failed`,
      status: 'error',
      error: JSON.stringify(error?.response?.data),
    });
    yield put(Creators.orderCancelFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getOrderInsightInquiryRequest({ foodOrderId }) {
  try {
    const data = yield call(getOrderInsightInquiry, { foodOrderId });
    yield put(Creators.getOrderInsightInquirySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getOrderInsightInquiryFailure({ error }));
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

function* getOrderChangeOptionsRequest() {
  try {
    const data = yield call(getFoodOrderChangeOptions);
    yield put(Creators.getOrderChangeOptionsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getOrderChangeOptionsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getAvailableChangeTypesForOrderRequest({ foodOrderId }) {
  try {
    const data = yield call(getAvailableChangeTypesForOrder, { foodOrderId });
    yield put(Creators.getAvailableChangeTypesForOrderSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAvailableChangeTypesForOrderFailure({ error }));
  }
}

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

function* createForbiddenMatchRequest({ client, description, person }) {
  try {
    const data = yield call(createForbiddenMatch, { client, description, person });
    yield put(Creators.createForbiddenMatchSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.createForbiddenMatchFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* addChangeReasonAtOrderRequest({ body, foodOrderId }) {
  try {
    const data = yield call(addChangeReasonAtOrder, { body, foodOrderId });
    yield put(Creators.addChangeReasonAtOrderSuccess({ data }));
    yield put(ToastCreators.success());
    yield fork(refreshGetOrderDetail, { orderDetailId: foodOrderId });
    yield fork(getAvailableChangeTypesForOrderRequest, { foodOrderId });
  }
  catch (error) {
    yield put(Creators.addChangeReasonAtOrderFailure({ error }));
    const code = get(error, 'response.data.code', '');
    const errorMessage = get(foodOrderChangeErrors, [code, getLangKey()], '');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* updateChangeReasonAtOrderRequest({ body, foodOrderId }) {
  try {
    const data = yield call(updateChangeReasonAtOrder, { body, foodOrderId });
    yield put(Creators.updateChangeReasonAtOrderSuccess({ data }));
    yield put(ToastCreators.success());
    yield fork(refreshGetOrderDetail, { orderDetailId: foodOrderId });
    yield fork(getAvailableChangeTypesForOrderRequest, { foodOrderId });
  }
  catch (error) {
    yield put(Creators.updateChangeReasonAtOrderFailure({ error }));
    const code = get(error, 'response.data.code', '');
    const errorMessage = get(foodOrderChangeErrors, [code, getLangKey()], '');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* getMainReasonsRequest() {
  try {
    const data = yield call(getMainReasons);
    yield put(Creators.getMainReasonsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMainReasonsFailure({ error }));
    yield put(ToastCreators.error({ error, message: error?.response?.data?.message }));
  }
}

function* getSubReasonsRequest({ id }) {
  try {
    const data = yield call(getSubReasons, { id });
    yield put(Creators.getSubReasonsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSubReasonsFailure({ error }));
    yield put(ToastCreators.error({ error, message: error?.response?.data?.message }));
  }
}

function* getSubReasonRequest({ id }) {
  try {
    const data = yield call(getSubReason, { id });
    yield put(Creators.getSubReasonSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSubReasonFailure({ error }));
    yield put(ToastCreators.error({ error, message: error?.response?.data?.message }));
  }
}

function* getRefundSourcesRequest({ foodOrderId }) {
  try {
    const data = yield call(getRefundSources, { foodOrderId });
    yield put(Creators.getRefundSourcesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRefundSourcesFailure({ error }));
    yield put(ToastCreators.error({ error, message: error?.response?.data?.message }));
  }
}

function* getClientTrustScoreRequest({ body }) {
  try {
    const data = yield call(getClientTrustScore, { body });
    yield put(Creators.getClientTrustScoreSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getClientTrustScoreFailure({ error }));
    yield put(ToastCreators.error({ error, message: error?.response?.data?.message }));
  }
}

function* setInquiryRequest({ body }) {
  const { promo, hasRefundOrCompliant, orderId: foodOrderId, ...complaintAndPromoBody } = body;
  try {
    if (promo) {
      const { value: picURL } = yield call(getMarketConfig, {
        key: PROMO_PIC_CONFIG.key,
        type: PROMO_PIC_CONFIG.type,
      });
      const data = yield call(createPersonalPromo, { ...promo, picURL });
      const personalPromoId = get(data, ['createPersonalPromo', '_id'], false);
      if (personalPromoId) {
        yield call(addPromoIdToOrder, { personalPromoId, foodOrderId });
        yield put(ToastCreators.success());
        yield fork(refreshGetOrderDetail, { orderDetailId: foodOrderId });
        yield put(Creators.setInquirySuccess());
      }
    }
    if (hasRefundOrCompliant) {
      const data = yield call(setInquiry, { body: complaintAndPromoBody });
      if (data.refund && !data.refund.isSuccess && data.refund.error) {
        yield put(Creators.setInquiryFailure({ error: data.refund.error.message }));
        yield put(ToastCreators.error({
          message: `${t('foodOrderPage:COMPLAINT_REFUND_MODAL.REFUND_ERROR')} - ${data.refund.error.message}`,
          toastOptions: { type: 'warning' },
        }));
      }
      else {
        yield put(Creators.setInquirySuccess());
        yield fork(refreshGetOrderDetail, { orderDetailId: foodOrderId });
        yield put(ToastCreators.success());
      }
    }
    const { hasRefundOrCompliant: _, ...params } = body;
    handleSalesforceNotification({
      action: 'refund',
      message: `Refund/Discount for OrderId: ${foodOrderId} has been given`,
      status: 'success',
      data: JSON.stringify(params),
    });
  }
  catch (error) {
    handleSalesforceNotification({
      action: 'refund',
      message: `Refund/Discount for OrderId: ${foodOrderId} has been failed`,
      status: 'error',
      error: JSON.stringify(error?.response?.data),
    });
    yield put(Creators.setInquiryFailure({ error }));
    yield put(ToastCreators.error({ error, message: error?.response?.data?.message }));
  }
}

function* getOrderCourierJsonRequest({ foodBasketIds }) {
  try {
    const data = yield call(getFoodOrderCourierJson, { foodBasketIds });
    yield put(Creators.getOrderCourierJsonSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getOrderCourierJsonFailure({ error }));
    yield put(ToastCreators.error({ error, message: error?.response?.data?.message }));
  }
}

function* getOrderFinancialsRequest({ orderDetailId }) {
  try {
    const data = yield call(getFoodOrderFinancials, { foodOrderId: orderDetailId });
    yield put(Creators.getOrderFinancialsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getOrderFinancialsFailure({ error }));
    yield put(ToastCreators.error({ error, message: error?.response?.data?.message }));
  }
}

export function* getAgreementDataRequest({ foodOrderId, clientId }) {
  try {
    const data = yield call(getAgreementData, { foodOrderId, clientId });
    yield put(Creators.getAgreementDataSuccess({ data }));
    yield fork(printAgreement, data);
  }
  catch (error) {
    yield put(Creators.getAgreementDataFailure({ error }));
    yield put(ToastCreators.error({ error, message: error?.response?.data?.message }));
  }
}

function* watchGetBasketDetailRequest() {
  yield takeLatest(Types.GET_BASKET_DETAIL_REQUEST, getBasketDetailRequest);
}

export function* watchGetOrderDetailRequest() {
  yield takeLatest(Types.GET_ORDER_DETAIL_REQUEST, getOrderDetailRequest);
}

export function* watchGetOrderCancelOptionRequest() {
  yield takeLatest(Types.GET_ORDER_CANCEL_OPTION_REQUEST, getOrderCancelOptionRequest);
}

function* watchOrderCancelRequest() {
  yield takeLatest(Types.ORDER_CANCEL_REQUEST, orderCancelRequest);
}

function* watchExportFinancialInfoRequest() {
  yield takeLatest(Types.EXPORT_FINANCIAL_INFO_REQUEST, exportFinancialInfoRequest);
}

function* watchGetOrderChangeOptionsRequest() {
  yield takeLatest(Types.GET_ORDER_CHANGE_OPTIONS_REQUEST, getOrderChangeOptionsRequest);
}

function* watchGetAvailableChangeTypesForOrderRequest() {
  yield takeLatest(Types.GET_AVAILABLE_CHANGE_TYPES_FOR_ORDER_REQUEST, getAvailableChangeTypesForOrderRequest);
}

function* watchAddChangeReasonAtOrderRequest() {
  yield takeLatest(Types.ADD_CHANGE_REASON_AT_ORDER_REQUEST, addChangeReasonAtOrderRequest);
}

function* watchUpdateChangeReasonAtOrderRequest() {
  yield takeLatest(Types.UPDATE_CHANGE_REASON_AT_ORDER_REQUEST, updateChangeReasonAtOrderRequest);
}

function* watchGetMainReasonsRequest() {
  yield takeLatest(Types.GET_MAIN_REASONS_REQUEST, getMainReasonsRequest);
}

function* watchGetSubReasonsRequest() {
  yield takeLatest(Types.GET_SUB_REASONS_REQUEST, getSubReasonsRequest);
}

function* watchGetSubReasonRequest() {
  yield takeLatest(Types.GET_SUB_REASON_REQUEST, getSubReasonRequest);
}

function* watchGetRefundSourcesRequest() {
  yield takeLatest(Types.GET_REFUND_SOURCES_REQUEST, getRefundSourcesRequest);
}

function* watchGetClientTrustScoreRequest() {
  yield takeLatest(Types.GET_CLIENT_TRUST_SCORE_REQUEST, getClientTrustScoreRequest);
}

function* watchSetInquiryRequest() {
  yield takeLatest(Types.SET_INQUIRY_REQUEST, setInquiryRequest);
}

function* watchGetUserByIdRequest() {
  yield takeLatest(Types.GET_USER_BY_ID_REQUEST, getUserByIdRequest);
}

function* watchGetOrderInsightInquiryRequest() {
  yield takeLatest(Types.GET_ORDER_INSIGHT_INQUIRY_REQUEST, getOrderInsightInquiryRequest);
}

function* watchGetOrderNoteRequest() {
  yield takeLatest(Types.GET_ORDER_NOTE_REQUEST, getOrderNoteRequest);
}

function* watchCreateOrderNoteRequest() {
  yield takeLatest(Types.CREATE_ORDER_NOTE_REQUEST, createOrderNoteRequest);
}

function* watchCreateForbiddenMatchRequest() {
  yield takeLatest(Types.CREATE_FORBIDDEN_MATCH_REQUEST, createForbiddenMatchRequest);
}

function* watchGetOrderCourierJsonRequest() {
  yield takeLatest(Types.GET_ORDER_COURIER_JSON_REQUEST, getOrderCourierJsonRequest);
}

function* watchGetOrderFinancialsRequest() {
  yield takeLatest(Types.GET_ORDER_FINANCIALS_REQUEST, getOrderFinancialsRequest);
}

export function* watchGetAgreementDataRequest() {
  yield takeLatest(Types.GET_AGREEMENT_DATA_REQUEST, getAgreementDataRequest);
}

function* refreshGetCourierRoute({ foodOrderId }) {
  try {
    const data = yield call(getCourierRoutes, { foodOrderId });
    yield put(Creators.getCourierRouteSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getCourierRouteFailure({ error }));
  }
}

function* getCourierRouteRequest({ foodOrderId }) {
  const { deliveryType } = yield select(orderDetailSelector.getData);
  while (deliveryType === FOOD_DELIVERY.GETIR) {
    yield call(refreshGetCourierRoute, { foodOrderId });
    yield delay(REFRESH_INTERVAL);
  }
}

function* watchGetCourierRouteRequest() {
  yield takeLatest(Types.GET_COURIER_ROUTE_REQUEST, getCourierRouteRequest);
}

export default function* orderDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      // Needs to be first
      fork(watchGetOrderDetailRequest),
      fork(watchGetBasketDetailRequest),
      fork(watchGetOrderCancelOptionRequest),
      fork(watchOrderCancelRequest),
      fork(watchExportFinancialInfoRequest),
      fork(watchGetOrderChangeOptionsRequest),
      fork(watchGetAvailableChangeTypesForOrderRequest),
      fork(watchAddChangeReasonAtOrderRequest),
      fork(watchUpdateChangeReasonAtOrderRequest),
      fork(watchGetMainReasonsRequest),
      fork(watchGetSubReasonsRequest),
      fork(watchGetSubReasonRequest),
      fork(watchGetRefundSourcesRequest),
      fork(watchGetClientTrustScoreRequest),
      fork(watchSetInquiryRequest),
      fork(watchGetUserByIdRequest),
      fork(watchGetOrderInsightInquiryRequest),
      fork(watchGetOrderNoteRequest),
      fork(watchCreateOrderNoteRequest),
      fork(watchCreateForbiddenMatchRequest),
      fork(watchGetOrderCourierJsonRequest),
      fork(watchGetOrderFinancialsRequest),
      fork(watchGetAgreementDataRequest),
      fork(watchGetCourierRouteRequest),
    ]);

    yield take(Types.GET_ORDER_DETAIL_FAILURE);
    // first task was the infinite order detail fetcher
    const watchOrderRequest = backgroundTasks[0];
    yield cancel(watchOrderRequest);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
