import { all, call, cancel, fork, put, take, takeLatest, takeEvery, select } from 'redux-saga/effects';
import moment from 'moment';

import {
  getClientDetailAccessToken,
  getClient,
  getSegmentsOfClient,
  getClientInvoices,
  getClientFeedbacks,
  createClientFeedback,
  getClientDevices,
  blockClientDevice,
  unblockClientDevice,
  logoutClientDevice,
  logoutFromAllClientDevices,
  getClientForbiddenMatches,
  updateClientForbiddenMatch,
  resolveClientFeedback,
  getClientDiscounts,
  getOrdersByFilters,
  getFoodOrdersByFilters,
  getTrips,
  getClientEligiblePromos,
  getClientShownPromos,
  getClientLoyaltyStamps,
  updateContactNumber,
  closeClientAccount,
  reopenClientAccount,
  anonymiseClientAccount,
  unlinkFacebook,
  updateClientActiveness,
  getGetirWaterMarketplaceOrders,
  getMarketingCommunicationPreferences,
  updateMarketingCommunicationPreferences,
  getSubscriptionDetails,
  getGetirTableOrders,
  getTransactionDetails,
  getFinanceOrders,
  getGetirJobsClientStatus,
  deleteGetirJobsClient,
} from '@shared/api/clientDetail';
import { getPaymentMethods } from '@shared/api/foodOrderActive';
import { checkOtp, sendOtp, validateActiveChatToken } from '@shared/api/clientAccess';
import { getNotes, createNote, updateNote } from '@shared/api/note';
import { getResults as getLocalsOrdersByFilters } from '@shared/api/artisanOrder';
import { Types, Creators } from '@app/pages/Client/Detail/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { transformValuesForApi } from '../components/FoodTable/utils';
import { clientSelector, foodOrdersSelector } from './selectors';
import { CLIENT_MAX_DISCOUNT_WARN_CONFIG } from '../constants';
import { getConfigKey } from '@shared/api/marketConfig';

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

function* watchPaymentMethodsRequest() {
  yield takeLatest(Types.GET_PAYMENT_METHODS_REQUEST, getPaymentMethodsRequest);
}

function* getClientDetailAccessTokenRequest({ clientId }) {
  try {
    const data = yield call(getClientDetailAccessToken, { clientId });
    data.clientId = clientId;
    yield put(Creators.getClientDetailAccessTokenSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getClientDetailAccessTokenFailure({ error }));
  }
}

export function* getClientRequest({ data }) {
  try {
    const { client } = yield call(getClient, data);
    yield put(Creators.getClientSuccess({ data: client }));
  }
  catch (error) {
    yield put(Creators.getClientFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getSegmentsOfClientRequest({ clientId }) {
  try {
    const segments = yield call(getSegmentsOfClient, { clientId });
    yield put(Creators.getSegmentsOfClientSuccess({ data: segments }));
  }
  catch (error) {
    yield put(Creators.getSegmentsOfClientFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getClientNotesRequest({ data }) {
  try {
    const { notes } = yield call(getNotes, data);
    yield put(Creators.getClientNotesSuccess({ data: notes }));
  }
  catch (error) {
    yield put(Creators.getClientNotesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* createClientNoteRequest({ data }) {
  try {
    const { note } = yield call(createNote, data);
    yield put(Creators.createClientNoteSuccess({ data: note }));
  }
  catch (error) {
    yield put(Creators.createClientNoteFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateClientNoteRequest({ data }) {
  try {
    const { note } = yield call(updateNote, data);
    yield put(Creators.updateClientNoteSuccess({ data: note }));
  }
  catch (error) {
    yield put(Creators.updateClientNoteFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getClientMarketingCommunicationPreferencesRequest({ clientId }) {
  try {
    const { communicationPreferences } = yield call(getMarketingCommunicationPreferences, { clientId });
    yield put(Creators.getClientMarketingCommunicationPreferencesSuccess({ data: communicationPreferences }));
  }
  catch (error) {
    yield put(Creators.getClientMarketingCommunicationPreferencesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateClientMarketingCommunicationPreferencesRequest({ data, loading }) {
  try {
    const { communicationPreferences } = yield call(updateMarketingCommunicationPreferences, { data });
    yield put(Creators.updateClientMarketingCommunicationPreferencesSuccess({ data: communicationPreferences, loading: [loading] }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateClientMarketingCommunicationPreferencesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getOrdersHistoryRequest({ data }) {
  try {
    const { orders } = yield call(getOrdersByFilters, data);
    yield put(Creators.getOrdersHistorySuccess({ data: orders }));
  }
  catch (error) {
    yield put(Creators.getOrdersHistoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getClientFeedbacksRequest({ clientId }) {
  try {
    const { feedbacks } = yield call(getClientFeedbacks, { clientId });
    yield put(Creators.getClientFeedbacksSuccess({ data: feedbacks }));
  }
  catch (error) {
    yield put(Creators.getClientFeedbacksFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateOrdersHistoryFiltersRequest({ data }) {
  try {
    yield put(Creators.updateOrdersHistoryFiltersSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.updateOrdersHistoryFiltersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getClientDevicesRequest({ clientId }) {
  try {
    const { devices } = yield call(getClientDevices, { clientId });
    yield put(Creators.getClientDevicesSuccess({ data: devices }));
  }
  catch (error) {
    yield put(Creators.getClientDevicesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getFoodOrdersRequest() {
  try {
    const client = yield select(clientSelector.getClient);
    const filters = yield select(foodOrdersSelector.getFilters);
    const orders = yield call(getFoodOrdersByFilters, transformValuesForApi({ ...filters, clientId: client?._id }));
    const data = orders.sort((a, b) => moment(b.checkoutDate || b.createdAt).unix() - moment(a.checkoutDate || a.createdAt).unix());
    yield put(Creators.getFoodOrdersSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFoodOrdersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getClientDiscountsRequest({ data }) {
  try {
    const orders = yield call(getClientDiscounts, data);
    yield put(Creators.getClientDiscountsSuccess({ data: orders }));
  }
  catch (error) {
    yield put(Creators.getClientDiscountsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getInvoicesRequest({ data }) {
  try {
    const requestParams = {
      ...data,
      start: data?.start?.valueOf(),
      end: data?.end?.valueOf(),
    };
    const result = yield call(getClientInvoices, requestParams);
    const downloadUrl = result?.data?.data?.url;
    if (downloadUrl) {
      ToastCreators.success();
      const popup = window.open('', '_blank');
      popup.document.write('Download will start soon');
      popup.location.href = downloadUrl;
    }
    else {
      ToastCreators.error({ error: 'Download Url not available.' });
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* createClientFeedbackRequest({ data }) {
  try {
    const feedback = yield call(createClientFeedback, { data });
    yield put(Creators.createClientFeedbackSuccess({ data: feedback }));
  }
  catch (error) {
    yield put(Creators.createClientFeedbackFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getLocalsOrdersRequest({ data }) {
  try {
    const orders = yield call(getLocalsOrdersByFilters, data);
    yield put(Creators.getLocalsOrdersSuccess({ data: orders }));
  }
  catch (error) {
    yield put(Creators.getLocalsOrdersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* validateActiveChatTokenRequest({ clientId, activeChatToken }) {
  try {
    const { isValid } = yield call(validateActiveChatToken, { clientId, activeChatToken });
    yield put(Creators.validateActiveChatTokenSuccess({ isValid }));
    if (isValid) {
      window.location.reload();
    }
  }
  catch (error) {
    yield put(Creators.validateActiveChatTokenFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* resolveClientFeedbackRequest({ data }) {
  try {
    const { clientId } = data;
    yield call(resolveClientFeedback, data);
    yield put(Creators.resolveClientFeedbackSuccess());
    yield put(ToastCreators.success());

    yield put(Creators.getClientFeedbacksRequest({ clientId }));
  }
  catch (error) {
    yield put(Creators.resolveClientFeedbackFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* blockClientDeviceRequest({ deviceId }) {
  try {
    yield call(blockClientDevice, { deviceId });
    yield put(Creators.blockClientDeviceSuccess());
    yield put(ToastCreators.success());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.blockClientDeviceFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getGetirBiTaksiOrdersRequest({ data }) {
  try {
    const res = yield call(getTrips, data);
    yield put(Creators.getGetirBiTaksiOrdersSuccess({ data: res?.data }));
  }
  catch (error) {
    yield put(Creators.getGetirBiTaksiOrdersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* unblockClientDeviceRequest({ deviceId }) {
  try {
    yield call(unblockClientDevice, { deviceId });
    yield put(Creators.unblockClientDeviceSuccess());
    yield put(ToastCreators.success());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.unblockClientDeviceFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* logoutFromAllClientDevicesRequest({ clientId }) {
  try {
    yield call(logoutFromAllClientDevices, { clientId });
    yield put(Creators.logoutFromAllClientDevicesSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.logoutFromAllClientDevicesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* logoutClientDeviceRequest({ clientId, deviceId }) {
  try {
    yield call(logoutClientDevice, { clientId, deviceId });
    yield put(Creators.logoutClientDeviceSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.logoutClientDeviceFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getClientForbiddenMatchesRequest({ clientId }) {
  try {
    const { forbiddenMatches } = yield call(getClientForbiddenMatches, { clientId });
    yield put(Creators.getClientForbiddenMatchesSuccess({ data: forbiddenMatches }));
  }
  catch (error) {
    yield put(Creators.getClientForbiddenMatchesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getClientEligiblePromosRequest({ data }) {
  try {
    const res = yield call(getClientEligiblePromos, { data });
    yield put(Creators.getClientEligiblePromosSuccess({ data: res }));
  }
  catch (error) {
    yield put(Creators.getClientEligiblePromosFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getClientShownPromosRequest({ data }) {
  try {
    const res = yield call(getClientShownPromos, { data });
    yield put(Creators.getClientShownPromosSuccess({ data: res }));
  }
  catch (error) {
    yield put(Creators.getClientShownPromosFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getClientLoyaltyStampsRequest({ clientId }) {
  try {
    const data = yield call(getClientLoyaltyStamps, { clientId });
    yield put(Creators.getClientLoyaltyStampsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getClientLoyaltyStampsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateClientForbiddenMatchRequest({ data }) {
  try {
    const { forbiddenMatch } = yield call(updateClientForbiddenMatch, { ...data });
    yield put(Creators.updateClientForbiddenMatchSuccess({ data: forbiddenMatch }));
    yield put(ToastCreators.success());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.updateClientForbiddenMatchFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateContactNumberRequest({ clientId, contactNumber }) {
  try {
    const { client } = yield call(updateContactNumber, { clientId, contactNumber });
    yield put(Creators.updateContactNumberSuccess({ data: client }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateContactNumberFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateClientActivenessRequest({ clientId, isActivated }) {
  try {
    const { client } = yield call(updateClientActiveness, { clientId, isActivated });
    yield put(Creators.updateClientActivenessSuccess({ data: client }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateClientActivenessFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* closeClientAccountRequest({ clientId }) {
  try {
    yield call(closeClientAccount, { clientId });
    yield put(Creators.closeClientAccountSuccess());
    yield put(ToastCreators.success());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.closeClientAccountFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* reopenClientAccountRequest({ clientId }) {
  try {
    yield call(reopenClientAccount, { clientId });
    yield put(Creators.reopenClientAccountSuccess());
    yield put(ToastCreators.success());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.reopenClientAccountFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* anonymiseClientAccountRequest({ clientId }) {
  try {
    yield call(anonymiseClientAccount, { clientId });
    yield put(Creators.anonymiseClientAccountSuccess());
    yield put(ToastCreators.success());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.anonymiseClientAccountFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* unlinkFacebookRequest({ clientId }) {
  try {
    yield call(unlinkFacebook, { clientId });
    yield put(Creators.unlinkFacebookSuccess());
    yield put(ToastCreators.success());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.unlinkFacebookFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getGetirWaterMarketplaceOrdersRequest({ clientId, count, page }) {
  try {
    const { data: { orders = [], pagination } } = yield call(getGetirWaterMarketplaceOrders, { clientId, count, page: page - 1 });
    yield put(Creators.getGetirWaterMarketplaceOrdersSuccess({ data: orders, pagination }));
  }
  catch (error) {
    yield put(Creators.getGetirWaterMarketplaceOrdersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getClientDiscountWarnConfigRequest() {
  try {
    const data = yield call(getConfigKey, {
      useApiGwCache: true,
      body: { ...CLIENT_MAX_DISCOUNT_WARN_CONFIG },
    });
    yield put(Creators.getClientDiscountWarnConfigSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getClientDiscountWarnConfigFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* watchGetClientDiscountWarnConfigRequest() {
  yield takeLatest(Types.GET_CLIENT_DISCOUNT_WARN_CONFIG_REQUEST, getClientDiscountWarnConfigRequest);
}

function* sendOtpRequest({ clientId }) {
  try {
    yield call(sendOtp, { clientId });
    yield put(Creators.sendOtpSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.sendOtpFailure());
  }
}

function* checkOtpRequest({ clientId, code }) {
  try {
    const { isValid } = yield call(checkOtp, { clientId, code });
    yield put(Creators.checkOtpSuccess({ isOtpValid: isValid }));
    if (isValid) {
      yield put(ToastCreators.success());
      window.location.reload();
    }
  }
  catch (error) {
    yield put(Creators.checkOtpFailure());
    yield put(ToastCreators.error());
  }
}
function* getSubscriptionDetailsRequest({ id, typeCode, countryCode, loading }) {
  try {
    const response = yield call(getSubscriptionDetails, { id, typeCode, countryCode });
    yield put(Creators.getSubscriptionDetailsSuccess({ data: response, loading: [loading] }));
  }
  catch (error) {
    yield put(Creators.getSubscriptionDetailsFailure({ error }));
  }
}

function* getTransactionDetailsRequest({ cycleId, loading }) {
  try {
    const response = yield call(getTransactionDetails, { cycleId });
    yield put(Creators.getTransactionDetailsSuccess({ data: response, loading: [loading] }));
  }
  catch (error) {
    yield put(Creators.getTransactionDetailsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getClientGetirTableOrdersRequest({ clientId }) {
  try {
    const data = yield call(getGetirTableOrders, { clientId, pageSize: 20, pageIndex: 1 });
    yield put(Creators.getClientGetirTableOrdersSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getClientGetirTableOrdersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getClientFinanceOrdersRequest({ clientId, size, page }) {
  try {
    const updatedPage = page > 0 ? page - 1 : page;
    const { data } = yield call(getFinanceOrders, { clientId, size, page: updatedPage });
    yield put(Creators.getClientFinanceOrdersSuccess({ data: data?.orders, totalCount: data?.totalCount }));
  }
  catch (error) {
    yield put(Creators.getClientFinanceOrdersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getClientStatusGetirJobsRequest({ clientId }) {
  try {
    const { data } = yield call(getGetirJobsClientStatus, clientId);
    yield put(Creators.getClientStatusGetirJobsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getClientStatusGetirJobsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* deleteClientGetirJobsRequest({ clientId, onSuccess }) {
  try {
    const { data } = yield call(deleteGetirJobsClient, clientId);
    yield put(Creators.deleteClientGetirJobsSuccess({ data }));
    onSuccess();
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deleteClientGetirJobsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetClientDetailAccessTokenRequest() {
  yield takeLatest(Types.GET_CLIENT_DETAIL_ACCESS_TOKEN_REQUEST, getClientDetailAccessTokenRequest);
}

function* watchSendOtpRequest() {
  yield takeLatest(Types.SEND_OTP_REQUEST, sendOtpRequest);
}

function* watchCheckOtpRequest() {
  yield takeLatest(Types.CHECK_OTP_REQUEST, checkOtpRequest);
}

function* watchLogoutClientDeviceRequest() {
  yield takeLatest(Types.LOGOUT_CLIENT_DEVICE_REQUEST, logoutClientDeviceRequest);
}

export function* watchGetClientRequest() {
  yield takeLatest(Types.GET_CLIENT_REQUEST, getClientRequest);
}

function* watchGetSegmentsOfClientRequest() {
  yield takeLatest(Types.GET_SEGMENTS_OF_CLIENT_REQUEST, getSegmentsOfClientRequest);
}

function* watchGetClientNotesRequest() {
  yield takeLatest(Types.GET_CLIENT_NOTES_REQUEST, getClientNotesRequest);
}

function* watchCreateClientNoteRequest() {
  yield takeLatest(Types.CREATE_CLIENT_NOTE_REQUEST, createClientNoteRequest);
}

function* watchUpdateClientNoteRequest() {
  yield takeLatest(Types.UPDATE_CLIENT_NOTE_REQUEST, updateClientNoteRequest);
}

function* watchGetClientMarketingCommunicationPreferencesRequest() {
  yield takeLatest(Types.GET_CLIENT_MARKETING_COMMUNICATION_PREFERENCES_REQUEST, getClientMarketingCommunicationPreferencesRequest);
}

function* watchUpdateClientMarketingCommunicationPreferencesRequest() {
  yield takeEvery(Types.UPDATE_CLIENT_MARKETING_COMMUNICATION_PREFERENCES_REQUEST, updateClientMarketingCommunicationPreferencesRequest);
}

function* watchGetOrdersHistoryRequest() {
  yield takeLatest(Types.GET_ORDERS_HISTORY_REQUEST, getOrdersHistoryRequest);
}

function* watchUpdateOrdersHistoryFiltersRequest() {
  yield takeLatest(Types.UPDATE_ORDERS_HISTORY_FILTERS_REQUEST, updateOrdersHistoryFiltersRequest);
}

function* watchGetFoodOrdersRequest() {
  yield takeLatest(Types.GET_FOOD_ORDERS_REQUEST, getFoodOrdersRequest);
}

function* watchGetInvoicesRequest() {
  yield takeLatest(Types.GET_INVOICES_REQUEST, getInvoicesRequest);
}

function* watchGetClientDiscountsRequest() {
  yield takeLatest(Types.GET_CLIENT_DISCOUNTS_REQUEST, getClientDiscountsRequest);
}

function* watchGetLocalsOrdersRequest() {
  yield takeLatest(Types.GET_LOCALS_ORDERS_REQUEST, getLocalsOrdersRequest);
}

function* watchGetGetirBiTaksiOrdersRequest() {
  yield takeLatest(Types.GET_GETIR_BI_TAKSI_ORDERS_REQUEST, getGetirBiTaksiOrdersRequest);
}

function* watchGetClientFeedbacksRequest() {
  yield takeLatest(Types.GET_CLIENT_FEEDBACKS_REQUEST, getClientFeedbacksRequest);
}

function* watchCreateClientFeedbackRequest() {
  yield takeLatest(Types.CREATE_CLIENT_FEEDBACK_REQUEST, createClientFeedbackRequest);
}

function* watchGetClientDevicesRequest() {
  yield takeLatest(Types.GET_CLIENT_DEVICES_REQUEST, getClientDevicesRequest);
}

function* watchGetClientForbiddenMatchesRequest() {
  yield takeLatest(Types.GET_CLIENT_FORBIDDEN_MATCHES_REQUEST, getClientForbiddenMatchesRequest);
}

function* watchResolveClientFeedbackRequest() {
  yield takeLatest(Types.RESOLVE_CLIENT_FEEDBACK_REQUEST, resolveClientFeedbackRequest);
}

function* watchBlockClientDeviceRequest() {
  yield takeLatest(Types.BLOCK_CLIENT_DEVICE_REQUEST, blockClientDeviceRequest);
}

function* watchUnblockClientDeviceRequest() {
  yield takeLatest(Types.UNBLOCK_CLIENT_DEVICE_REQUEST, unblockClientDeviceRequest);
}

function* watchLogoutFromAllClientDevicesRequest() {
  yield takeLatest(Types.LOGOUT_FROM_ALL_CLIENT_DEVICES_REQUEST, logoutFromAllClientDevicesRequest);
}

function* watchUpdateContactNumberRequest() {
  yield takeLatest(Types.UPDATE_CONTACT_NUMBER_REQUEST, updateContactNumberRequest);
}

function* watchUpdateClientActivenessRequest() {
  yield takeLatest(Types.UPDATE_CLIENT_ACTIVENESS_REQUEST, updateClientActivenessRequest);
}

function* watchCloseClientAccountRequest() {
  yield takeLatest(Types.CLOSE_CLIENT_ACCOUNT_REQUEST, closeClientAccountRequest);
}

function* watchReopenClientAccountRequest() {
  yield takeLatest(Types.REOPEN_CLIENT_ACCOUNT_REQUEST, reopenClientAccountRequest);
}
function* watchAnonymiseClientAccountRequest() {
  yield takeLatest(Types.ANONYMISE_CLIENT_ACCOUNT_REQUEST, anonymiseClientAccountRequest);
}

function* watchUpdateClientForbiddenMatchRequest() {
  yield takeLatest(Types.UPDATE_CLIENT_FORBIDDEN_MATCH_REQUEST, updateClientForbiddenMatchRequest);
}

function* watchGetClientEligiblePromosRequest() {
  yield takeLatest(Types.GET_CLIENT_ELIGIBLE_PROMOS_REQUEST, getClientEligiblePromosRequest);
}

function* watchGetClientShownPromosRequest() {
  yield takeLatest(Types.GET_CLIENT_SHOWN_PROMOS_REQUEST, getClientShownPromosRequest);
}

export function* watchGetClientLoyaltyStampsRequest() {
  yield takeLatest(Types.GET_CLIENT_LOYALTY_STAMPS_REQUEST, getClientLoyaltyStampsRequest);
}

function* watchUnlinkFacebookRequest() {
  yield takeLatest(Types.UNLINK_FACEBOOK_REQUEST, unlinkFacebookRequest);
}

function* watchValidateActiveChatTokenRequest() {
  yield takeLatest(Types.VALIDATE_ACTIVE_CHAT_TOKEN_REQUEST, validateActiveChatTokenRequest);
}

function* watchGetGetirWaterMarketplaceOrdersRequestRequest() {
  yield takeLatest(Types.GET_GETIR_WATER_MARKETPLACE_ORDERS_REQUEST, getGetirWaterMarketplaceOrdersRequest);
}

function* watchgetSubscriptionDetailsRequest() {
  yield takeLatest(Types.GET_SUBSCRIPTION_DETAILS_REQUEST, getSubscriptionDetailsRequest);
}

function* watchgetTransactionDetailsRequest() {
  yield takeLatest(Types.GET_TRANSACTION_DETAILS_REQUEST, getTransactionDetailsRequest);
}

export function* watchGetClientGetirTableOrdersRequest() {
  yield takeLatest(Types.GET_CLIENT_GETIR_TABLE_ORDERS_REQUEST, getClientGetirTableOrdersRequest);
}

export function* watchGetClientFinanceOrdersRequest() {
  yield takeLatest(Types.GET_CLIENT_FINANCE_ORDERS_REQUEST, getClientFinanceOrdersRequest);
}

export function* watchGetClientGetirJobsRequest() {
  yield takeLatest(Types.GET_CLIENT_STATUS_GETIR_JOBS_REQUEST, getClientStatusGetirJobsRequest);
}

export function* watchDeleteClientGetirJobsRequest() {
  yield takeLatest(Types.DELETE_CLIENT_GETIR_JOBS_REQUEST, deleteClientGetirJobsRequest);
}

export default function* clientSagaRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchPaymentMethodsRequest),
      fork(watchGetClientDetailAccessTokenRequest),
      fork(watchSendOtpRequest),
      fork(watchCheckOtpRequest),
      fork(watchGetClientRequest),
      fork(watchGetSegmentsOfClientRequest),
      fork(watchGetClientNotesRequest),
      fork(watchCreateClientNoteRequest),
      fork(watchUpdateClientNoteRequest),
      fork(watchGetClientMarketingCommunicationPreferencesRequest),
      fork(watchUpdateClientMarketingCommunicationPreferencesRequest),
      fork(watchGetOrdersHistoryRequest),
      fork(watchUpdateOrdersHistoryFiltersRequest),
      fork(watchGetFoodOrdersRequest),
      fork(watchGetLocalsOrdersRequest),
      fork(watchGetGetirBiTaksiOrdersRequest),
      fork(watchGetInvoicesRequest),
      fork(watchGetClientDiscountsRequest),
      fork(watchGetClientDevicesRequest),
      fork(watchBlockClientDeviceRequest),
      fork(watchUnblockClientDeviceRequest),
      fork(watchLogoutFromAllClientDevicesRequest),
      fork(watchLogoutClientDeviceRequest),
      fork(watchGetClientFeedbacksRequest),
      fork(watchCreateClientFeedbackRequest),
      fork(watchGetClientForbiddenMatchesRequest),
      fork(watchUpdateClientForbiddenMatchRequest),
      fork(watchUpdateContactNumberRequest),
      fork(watchCloseClientAccountRequest),
      fork(watchReopenClientAccountRequest),
      fork(watchAnonymiseClientAccountRequest),
      fork(watchUnlinkFacebookRequest),
      fork(watchUpdateClientActivenessRequest),
      fork(watchResolveClientFeedbackRequest),
      fork(watchGetClientEligiblePromosRequest),
      fork(watchGetClientShownPromosRequest),
      fork(watchGetClientLoyaltyStampsRequest),
      fork(watchValidateActiveChatTokenRequest),
      fork(watchGetGetirWaterMarketplaceOrdersRequestRequest),
      fork(watchgetSubscriptionDetailsRequest),
      fork(watchgetTransactionDetailsRequest),
      fork(watchGetClientDiscountWarnConfigRequest),
      fork(watchGetClientGetirTableOrdersRequest),
      fork(watchGetClientFinanceOrdersRequest),
      fork(watchGetClientGetirJobsRequest),
      fork(watchDeleteClientGetirJobsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
