import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
  delay,
} from 'redux-saga/effects';
import axios from 'axios';

import {
  getCourierBusyOptions,
  setCourierFree,
  setCourierBusy,
  setCourierActive,
  setCourierDeactive,
  restartCourierMDU,
  sendNotification,
  releaseCourier as releaseCourierApi,
  setWarehouseToCourier as setWarehouseToCourierApi,
  setDomainType as setDomainTypeApi,
  setIsLoginDisabled as setIsLoginDisabledApi,
  setEmploymentType,
  setAvailableVehicleTypes,
  getOrderList as getOrderListApi,
  getCourierStatusLogs as getCourierStatusLogsApi,
  getGeoFenceLogs as getCourierGeoFenceApi,
  getCourierTasksByCourierId,
  setChiefCourier,
  forceLogoutApi,
  filterFeedbacks,
  getCourierMduDiagnosticLogs as getCourierLogsApi,
  resetCourierPassword,
  getReturnDetailsWithReturnIdList,
  setGeofenceByCourierId,
} from '@shared/api/courier';
import { getCourierWithPersonDetails } from '@shared/api/courierHandler';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  COURIER_BUSY_OPTIONS_END_SHIFT,
  COURIER_DETAIL_REQUEST_FIELDS,
  COURIER_DETAIL_FINANCE_EMPLOYEE_REQUEST_FIELDS,
} from '../constants';
import { getRefreshInterval, setDiffForLogs } from '../utils';

export function* refreshGetCourierRequest({ id, hasFinanceEmployeeRole }) {
  const data = yield call(
    getCourierWithPersonDetails,
    {
      id,
      fields: hasFinanceEmployeeRole ?
        COURIER_DETAIL_FINANCE_EMPLOYEE_REQUEST_FIELDS :
        COURIER_DETAIL_REQUEST_FIELDS,
    },
  );
  yield put(Creators.getCourierSuccess({ data }));
}

export function* getCourierRequest({ id, hasFinanceEmployeeRole }) {
  try {
    yield call(refreshGetCourierRequest, { id, hasFinanceEmployeeRole });
    let loop = true;
    while (loop) {
      yield call(refreshGetCourierRequest, { id, hasFinanceEmployeeRole });
      yield delay(getRefreshInterval());
      if (process.env.NODE_ENV === 'test') {
        loop = false;
      }
    }
  }
  catch (error) {
    yield put(Creators.getCourierFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* releaseCourierRequest({ courierId, warehouseId }) {
  try {
    yield call(releaseCourierApi, { courierId, warehouseId });
    const data = yield call(getCourierWithPersonDetails, { id: courierId, fields: COURIER_DETAIL_REQUEST_FIELDS });
    yield put(Creators.releaseCourierSuccess());
    yield put(Creators.getCourierSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.releaseCourierFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getCourierBusyOptionsRequest() {
  try {
    const data = yield call(getCourierBusyOptions);
    yield put(
      Creators.getCourierBusyOptionsSuccess({ data: data.busyOptions }),
    );
  }
  catch (error) {
    yield put(Creators.getCourierBusyOptionsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* setCourierFreeRequest({ id }) {
  try {
    yield call(setCourierFree, { id });
    yield put(Creators.setCourierFreeSuccess());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.setCourierFreeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* setCourierBusyRequest({ id, reason }) {
  try {
    yield call(setCourierBusy, { id, reason });
    yield put(Creators.setCourierBusySuccess());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.setCourierBusyFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* setCourierActivateRequest({ id }) {
  try {
    yield call(setCourierActive, { id });
    yield put(Creators.setCourierActivateSuccess());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.setCourierActivateFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* setCourierDeactivateRequest({ id }) {
  try {
    yield call(setCourierDeactive, { id });
    yield put(Creators.setCourierDeactivateSuccess());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.setCourierDeactivateFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* restartCourierMduRequest({ id }) {
  try {
    yield call(restartCourierMDU, { id });
    yield put(Creators.restartCourierMduSuccess());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.restartCourierMduFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* sendPullAppsNotificationRequest({ id }) {
  try {
    yield call(sendNotification, { id, isSendDeviceInfo: true });
    yield put(Creators.sendPullAppsNotificationSuccess());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.sendPullAppsNotificationFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* sendCheckServicesNotificationRequest({ id }) {
  try {
    yield call(sendNotification, { id, isCheckServices: true });
    yield put(Creators.sendCheckServicesNotificationSuccess());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.sendCheckServicesNotificationFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getReturnDetailsWithReturnIdListRequest({ returnIds }) {
  try {
    const data = yield call(getReturnDetailsWithReturnIdList, { returnIds });
    yield put(Creators.getReturnDetailsWithReturnIdListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getReturnDetailsWithReturnIdListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* setWarehouseToCourierRequest({
  courierId,
  warehouseId,
  warehouseFranchiseId,
  currentMarketEmployer,
  workStatus,
}) {
  try {
    yield call(setWarehouseToCourierApi, {
      courierId,
      warehouseId,
      warehouseFranchiseId,
      currentMarketEmployer,
      workStatus,
    });
    const data = yield call(getCourierWithPersonDetails, { id: courierId, fields: COURIER_DETAIL_REQUEST_FIELDS });
    yield put(Creators.setWarehouseToCourierSuccess());
    yield put(Creators.getCourierSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.setWarehouseToCourierFailure({ error }));
  }
}

export function* setDomainTypeRequest({ courierId, domainTypes }) {
  try {
    yield call(setDomainTypeApi, { courierId, domainTypes });
    const courier = yield call(getCourierWithPersonDetails, { id: courierId, fields: COURIER_DETAIL_REQUEST_FIELDS });
    yield put(Creators.setDomainTypeSuccess());
    yield put(Creators.getCourierSuccess({ data: courier }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.setDomainTypeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* sendStartServicesNotificationRequest({ id }) {
  try {
    yield call(sendNotification, { id, isStartServices: true });
    yield put(Creators.sendStartServicesNotificationSuccess());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.sendStartServicesNotificationFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* setAvailableVehicleTypesRequest({ courierId, availableVehicleTypes }) {
  try {
    yield call(setAvailableVehicleTypes, { courierId, availableVehicleTypes });
    const courier = yield call(getCourierWithPersonDetails, { id: courierId, fields: COURIER_DETAIL_REQUEST_FIELDS });
    yield put(Creators.setAvailableVehicleTypesSuccess());
    yield put(Creators.getCourierSuccess({ data: courier }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.setAvailableVehicleTypesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* removeCourierFromSystemRequest({ id }) {
  try {
    yield call(setCourierBusy, { id, reason: COURIER_BUSY_OPTIONS_END_SHIFT });
    yield put(Creators.removeCourierFromSystemSuccess());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.removeCourierFromSystemFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* setChiefCourierRequest({ courierId, chiefRank }) {
  try {
    yield call(setChiefCourier, { courierId, chiefRank });
    const courier = yield call(getCourierWithPersonDetails, { id: courierId, fields: COURIER_DETAIL_REQUEST_FIELDS });
    yield put(Creators.setChiefCourierSuccess());
    yield put(Creators.getCourierSuccess({ data: courier }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.setChiefCourierFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* setEmploymentTypeRequest({ courierId, employmentType }) {
  try {
    yield call(setEmploymentType, { courierId, employmentType });
    const courier = yield call(getCourierWithPersonDetails, { id: courierId, fields: COURIER_DETAIL_REQUEST_FIELDS });
    yield put(Creators.setEmploymentTypeSuccess());
    yield put(Creators.getCourierSuccess({ data: courier }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.setEmploymentTypeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* sendNotificationMessageRequest({ id, title, message }) {
  try {
    yield call(sendNotification, { id, title, message });
    yield put(Creators.sendNotificationMessageSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.sendNotificationMessageFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* setIsLoginDisabledRequest({ courierId, isLoginDisabled }) {
  try {
    yield call(setIsLoginDisabledApi, { courierId, isLoginDisabled });
    const courier = yield call(getCourierWithPersonDetails, { id: courierId, fields: COURIER_DETAIL_REQUEST_FIELDS });
    yield put(Creators.setIsLoginDisabledSuccess());
    yield put(Creators.getCourierSuccess({ data: courier }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.setIsLoginDisabledFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* refreshGetCourierTasksRequest({ courierId }) {
  const data = yield call(getCourierTasksByCourierId, { courierId });
  yield put(Creators.getCourierTasksSuccess({ data }));
}

export function* getCourierTasksRequest({ courierId }) {
  try {
    yield call(refreshGetCourierTasksRequest, { courierId });
    let loop = true;
    while (loop) {
      yield delay(getRefreshInterval());
      yield call(refreshGetCourierTasksRequest, { courierId });
      if (process.env.NODE_ENV === 'test') {
        loop = false;
      }
    }
  }
  catch (error) {
    yield put(Creators.getCourierTasksFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getOrderListRequest({ courierId, domainType, limit, offset }) {
  try {
    const { orders } = yield call(getOrderListApi, { courierId, domainType, limit, offset });
    yield put(Creators.getOrderListSuccess({ data: orders }));
  }
  catch (error) {
    yield put(Creators.getOrderListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getStatusLogsRequest({ courierId, startDate, endDate }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();
    const data = yield call(getCourierStatusLogsApi, { cancelSource, courierId, startDate, endDate });
    const batchData = setDiffForLogs({ logDiff: data, endDate });
    yield put(Creators.getStatusLogsSuccess({ data, batchData }));
  }
  catch (error) {
    yield put(Creators.getStatusLogsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* forceLogoutRequest({ courierId }) {
  try {
    const data = yield call(forceLogoutApi, { courierId });
    yield put(Creators.forceLogoutSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.forceLogoutFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* resetCourierPasswordRequest({ courierId }) {
  try {
    const data = yield call(resetCourierPassword, { courierId });
    yield put(Creators.resetCourierPasswordSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.resetCourierPasswordFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* setGeofenceByCourierIdRequest({ courierId, isGeoFenceDisabled }) {
  try {
    const data = yield call(setGeofenceByCourierId, { courierId, isGeoFenceDisabled });
    yield put(Creators.setGeofenceByCourierIdSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.setGeofenceByCourierIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* courierFeedbackRequest({ filterOptions, language, pageNumber, limit }) {
  try {
    const data = yield call(filterFeedbacks, { filterOptions, language, pageNumber, limit });
    yield put(Creators.getCommonFeedbackRequestSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getCommonFeedbackRequestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getGeoFenceRequest({ courierId, startDate, endDate }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();
    const data = yield call(getCourierGeoFenceApi, { cancelSource, courierId, startDate, endDate });
    const batchData = setDiffForLogs({ logDiff: data, endDate });
    yield put(Creators.getGeoFenceSuccess({ data, batchData }));
  }
  catch (error) {
    yield put(Creators.geoFenceLogsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getCourierLogsRequest({ courierId }) {
  try {
    yield call(getCourierLogsApi, { courierId });
    yield put(Creators.getCourierLogsSuccess());
    yield put(ToastCreators.success());
    yield delay(5000);
    yield* refreshGetCourierRequest({ id: courierId });
  }
  catch (error) {
    yield put(Creators.getCourierLogsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetCourierLogsRequest() {
  yield takeLatest(Types.GET_COURIER_LOGS_REQUEST, getCourierLogsRequest);
}

export function* watchGetCourierRequest() {
  yield takeLatest(Types.GET_COURIER_REQUEST, getCourierRequest);
}

export function* watchReleaseCourierRequest() {
  yield takeLatest(Types.RELEASE_COURIER_REQUEST, releaseCourierRequest);
}

export function* watchResetCourierPasswordRequest() {
  yield takeLatest(Types.RESET_COURIER_PASSWORD_REQUEST, resetCourierPasswordRequest);
}

export function* watchSetGeofenceByCourierIdRequest() {
  yield takeLatest(Types.SET_GEOFENCE_BY_COURIER_ID_REQUEST, setGeofenceByCourierIdRequest);
}

export function* watchGetCourierBusyOptionsRequest() {
  yield takeLatest(
    Types.GET_COURIER_BUSY_OPTIONS_REQUEST,
    getCourierBusyOptionsRequest,
  );
}

export function* watchSetCourierFreeRequest() {
  yield takeLatest(Types.SET_COURIER_FREE_REQUEST, setCourierFreeRequest);
}

export function* watchSetCourierBusyRequest() {
  yield takeLatest(Types.SET_COURIER_BUSY_REQUEST, setCourierBusyRequest);
}

export function* watchGetReturnDetailsWithReturnIdListRequest() {
  yield takeLatest(Types.GET_RETURN_DETAILS_WITH_RETURN_ID_LIST_REQUEST, getReturnDetailsWithReturnIdListRequest);
}

export function* watchSetCourierActivateRequest() {
  yield takeLatest(
    Types.SET_COURIER_ACTIVATE_REQUEST,
    setCourierActivateRequest,
  );
}

export function* watchSetCourierDeactivateRequest() {
  yield takeLatest(
    Types.SET_COURIER_DEACTIVATE_REQUEST,
    setCourierDeactivateRequest,
  );
}

export function* watchRestartCourierMduRequest() {
  yield takeLatest(
    Types.RESTART_COURIER_MDU_REQUEST,
    restartCourierMduRequest,
  );
}

export function* watchSendPullAppsNotificationRequest() {
  yield takeLatest(
    Types.SEND_PULL_APPS_NOTIFICATION_REQUEST,
    sendPullAppsNotificationRequest,
  );
}

export function* watchSendCheckServicesNotificationRequest() {
  yield takeLatest(
    Types.SEND_CHECK_SERVICES_NOTIFICATION_REQUEST,
    sendCheckServicesNotificationRequest,
  );
}

export function* watchSendStartServicesNotificationRequest() {
  yield takeLatest(
    Types.SEND_START_SERVICES_NOTIFICATION_REQUEST,
    sendStartServicesNotificationRequest,
  );
}

export function* watchRemoveCourierFromSystemRequest() {
  yield takeLatest(
    Types.REMOVE_COURIER_FROM_SYSTEM_REQUEST,
    removeCourierFromSystemRequest,
  );
}

export function* watchSendNotificationMessageRequest() {
  yield takeLatest(
    Types.SEND_NOTIFICATION_MESSAGE_REQUEST,
    sendNotificationMessageRequest,
  );
}

export function* watchSetWarehouseToCourier() {
  yield takeLatest(Types.SET_WAREHOUSE_TO_COURIER_REQUEST, setWarehouseToCourierRequest);
}

export function* watchSetDomainTypeRequest() {
  yield takeLatest(Types.SET_DOMAIN_TYPE_REQUEST, setDomainTypeRequest);
}

export function* watchSetAvailableVehicleTypesRequest() {
  yield takeLatest(Types.SET_AVAILABLE_VEHICLE_TYPES_REQUEST, setAvailableVehicleTypesRequest);
}

export function* watchSetChiefCourierTypeRequest() {
  yield takeLatest(Types.SET_CHIEF_COURIER_REQUEST, setChiefCourierRequest);
}

export function* watchSetEmploymentTypeRequest() {
  yield takeLatest(Types.SET_EMPLOYMENT_TYPE_REQUEST, setEmploymentTypeRequest);
}

export function* watchSetIsLoginDisabledRequest() {
  yield takeLatest(Types.SET_IS_LOGIN_DISABLED_REQUEST, setIsLoginDisabledRequest);
}

export function* watchGetOrderListRequest() {
  yield takeLatest(Types.GET_ORDER_LIST_REQUEST, getOrderListRequest);
}

export function* watchGetStatusLogsRequest() {
  yield takeLatest(Types.GET_STATUS_LOGS_REQUEST, getStatusLogsRequest);
}

export function* watchGetCourierTasksRequest() {
  yield takeLatest(Types.GET_COURIER_TASKS_REQUEST, getCourierTasksRequest);
}

export function* watchForceLogoutRequest() {
  yield takeLatest(Types.FORCE_LOGOUT_REQUEST, forceLogoutRequest);
}

export function* watchCourierFeedbacksRequest() {
  yield takeLatest(Types.GET_COMMON_FEEDBACK_REQUEST, courierFeedbackRequest);
}

export function* watchGetGeoFenceLogsRequest() {
  yield takeLatest(Types.GET_GEO_FENCE_REQUEST, getGeoFenceRequest);
}

export default function* courierRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetCourierRequest),
      fork(watchReleaseCourierRequest),
      fork(watchGetCourierBusyOptionsRequest),
      fork(watchSetCourierFreeRequest),
      fork(watchSetCourierBusyRequest),
      fork(watchGetReturnDetailsWithReturnIdListRequest),
      fork(watchSetCourierActivateRequest),
      fork(watchSetCourierDeactivateRequest),
      fork(watchRestartCourierMduRequest),
      fork(watchSendPullAppsNotificationRequest),
      fork(watchSendCheckServicesNotificationRequest),
      fork(watchSendStartServicesNotificationRequest),
      fork(watchRemoveCourierFromSystemRequest),
      fork(watchSendNotificationMessageRequest),
      fork(watchSetWarehouseToCourier),
      fork(watchSetDomainTypeRequest),
      fork(watchSetAvailableVehicleTypesRequest),
      fork(watchSetEmploymentTypeRequest),
      fork(watchSetIsLoginDisabledRequest),
      fork(watchGetOrderListRequest),
      fork(watchGetStatusLogsRequest),
      fork(watchGetCourierTasksRequest),
      fork(watchSetChiefCourierTypeRequest),
      fork(watchForceLogoutRequest),
      fork(watchCourierFeedbacksRequest),
      fork(watchGetGeoFenceLogsRequest),
      fork(watchGetCourierLogsRequest),
      fork(watchResetCourierPasswordRequest),
      fork(watchSetGeofenceByCourierIdRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
