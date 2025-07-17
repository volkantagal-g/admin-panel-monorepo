import { all, takeLatest, call, cancel, fork, put, take, select, cancelled } from 'redux-saga/effects';
import { isFunction as _isFunction } from 'lodash';

import axios from 'axios';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import {
  getActiveSessions,
  getEmployeeDetailForProfile as getEmployeeDetailForProfileApi,
  getEmployeeEducationInfoForProfile as getEmployeeEducationInfoForProfileApi,
  getEmployeeAssetsForProfile as getEmployeeAssetsForProfileApi,
  updateContactInfoOfEmployee as updateContactInfoOfEmployeeAPI,
  updateEducationInfo as updateEducationInfoAPI,
  removeEducationInfoToEmployee as removeEducationInfoToEmployeeAPI,
  addEducationInfoToEmployee as addEducationInfoToEmployeeAPI,
  getEmployeeVehiclesForProfile as getEmployeeVehiclesForProfileApi,
} from '@shared/api/profile';
import { getFormattedAddEducationRequestParams, getFormattedContactInfoRequestParams } from '../utils';
import { getPermitHistorySelector, permitRequestsForSupervisorSelector } from './selectors';
import { PAGINATION_MODES } from '@app/pages/Employee/constants';
import {
  approvePermit as approvePermitApi,
  cancelPermit as cancelPermitApi,
  cancelRequestedPermit as cancelRequestedPermitApi,
  getEmployeesOfManager as getEmployeesOfManagerAPI,
  getPermitHistoryOfCurrentUsersEmployee as getPermitHistoryOfCurrentUsersEmployeeApi,
  getPermitRequestsForSupervisor as getPermitRequestsForSupervisorAPI,
  getUsedAndVestedLeaveCountsOfCurrentUsersEmployee as getUsedAndVestedLeaveCountsOfCurrentUsersEmployeeApi,
  rejectPermit as rejectPermitApi,
  getPermitInfoOfManagersTeam as getPermitInfoOfManagersTeamApi,
} from '@shared/api/employee';

function* getEmployeeDetailForProfileRequest() {
  try {
    const { employee } = yield call(getEmployeeDetailForProfileApi);
    yield put(Creators.getEmployeeDetailsForProfileSuccess({ employeeDetail: employee }));
  }
  catch (error) {
    yield put(Creators.getEmployeeDetailsForProfileFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetEmployeeDetailsForProfileRequest() {
  yield takeLatest(Types.GET_EMPLOYEE_DETAILS_FOR_PROFILE_REQUEST, getEmployeeDetailForProfileRequest);
}

function* getEmployeeEducationsRequest() {
  try {
    const { educations } = yield call(getEmployeeEducationInfoForProfileApi);
    yield put(Creators.getEmployeeEducationsSuccess({ data: educations }));
  }
  catch (error) {
    yield put(Creators.getEmployeeEducationsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetEmployeeEducationsRequest() {
  yield takeLatest(Types.GET_EMPLOYEE_EDUCATIONS_REQUEST, getEmployeeEducationsRequest);
}

function* updateEducationRequest({
  educationId,
  values,
}) {
  try {
    const params = getFormattedAddEducationRequestParams(values);
    yield call(updateEducationInfoAPI, { educationId, educationInfo: params });
    yield put(Creators.updateEducationSuccess({}));
    yield put(Creators.getEmployeeEducationsRequest());
  }
  catch (error) {
    // @ts-ignore
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateEducationRequest() {
  yield takeLatest(Types.UPDATE_EDUCATION_REQUEST, updateEducationRequest);
}

function* removeEducationRequest({ educationId }) {
  try {
    yield call(removeEducationInfoToEmployeeAPI, { educationId });
    yield put(Creators.removeEducationSuccess({}));
    yield put(Creators.getEmployeeEducationsRequest());
  }
  catch (error) {
    // @ts-ignore
    yield put(ToastCreators.error({ error }));
  }
}

function* watchRemoveEducationRequest() {
  yield takeLatest(Types.REMOVE_EDUCATION_REQUEST, removeEducationRequest);
}

function* addEducationRequest({ values, onSuccess }) {
  try {
    const params = getFormattedAddEducationRequestParams(values);
    yield call(addEducationInfoToEmployeeAPI, { educationInfo: params });
    yield put(Creators.addEducationSuccess({}));
    yield put(Creators.getEmployeeEducationsRequest());
    if (_isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    // @ts-ignore
    yield put(ToastCreators.error({ error }));
  }
}

function* watchAddEducationRequest() {
  yield takeLatest(Types.ADD_EDUCATION_REQUEST, addEducationRequest);
}

function* updateContactInfoRequest({ values, onSuccess }) {
  try {
    const params = getFormattedContactInfoRequestParams(values);
    yield call(updateContactInfoOfEmployeeAPI, { updateData: params });
    yield put(Creators.getEmployeeDetailsForProfileRequest());

    if (_isFunction(onSuccess)) {
      onSuccess();
    }
    yield call(onSuccess);
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateContactInfoRequest() {
  yield takeLatest(Types.UPDATE_CONTACT_INFO_REQUEST, updateContactInfoRequest);
}

function* getActiveSessionsRequest() {
  try {
    const activeSessions = yield call(getActiveSessions);
    yield put(Creators.getActiveSessionsSuccess({ activeSessions }));
  }
  catch (error) {
    yield put(Creators.getActiveSessionsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetActiveSessionsRequest() {
  yield takeLatest(Types.GET_ACTIVE_SESSIONS_REQUEST, getActiveSessionsRequest);
}

function* getEmployeeAssetsForProfileRequest() {
  try {
    const { assets } = yield call(getEmployeeAssetsForProfileApi);
    yield put(Creators.getEmployeeAssetsForProfileSuccess({ employeeAssets: assets }));
  }
  catch (error) {
    yield put(Creators.getEmployeeAssetsForProfileFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetEmployeeAssetsForProfileRequest() {
  yield takeLatest(Types.GET_EMPLOYEE_ASSETS_FOR_PROFILE_REQUEST, getEmployeeAssetsForProfileRequest);
}

function* getEmployeeVehiclesForProfileRequest({ limit, offset }) {
  try {
    const { assets } = yield call(getEmployeeVehiclesForProfileApi, { limit, offset });
    const { assets: vehicles, count } = assets;
    yield put(Creators.getEmployeeVehiclesForProfileSuccess({ employeeVehicles: vehicles, count }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetEmployeeVehiclesForProfileRequest() {
  yield takeLatest(Types.GET_EMPLOYEE_VEHICLES_FOR_PROFILE_REQUEST, getEmployeeVehiclesForProfileRequest);
}

export function* getUsedAndVestedPermitCounts() {
  try {
    const { used, vested, shouldShowVestedDays } = yield call(getUsedAndVestedLeaveCountsOfCurrentUsersEmployeeApi);
    yield put(Creators.getUsedAndVestedPermitCountsSuccess({ data: { used, vested, shouldShowVestedDays } }));
  }
  catch (error) {
    yield put(Creators.getUsedAndVestedPermitCountsFailure({ error }));
  }
}
function* getUsedAndVestedPermitCountsRequest() {
  yield takeLatest(Types.GET_USED_AND_VESTED_PERMIT_COUNTS_REQUEST, getUsedAndVestedPermitCounts);
}

export function* getPermitHistoryOfCurrentUsersEmployee({
  limit,
  nextPageCursor: _nextPageCursor,
  previousPageCursor: _previousPageCursor,
  filters,
}) {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const paginationData = yield select(getPermitHistorySelector.getPaginationData);
    const filtersData = yield select(getPermitHistorySelector.getFilters);
    const { status: statuses } = { ...filters, ...filtersData };

    const requestBody = {
      cancelSource,
      ...(statuses ? { statuses } : undefined),
      limit: limit || paginationData.limit,
      paginationMode: PAGINATION_MODES.CURSOR,
      ...(_nextPageCursor ? { nextPageCursor: _nextPageCursor } : undefined),
      ...(_previousPageCursor ? { previousPageCursor: _previousPageCursor } : undefined),
    };
    const { permits, nextPageCursor, previousPageCursor } = yield call(getPermitHistoryOfCurrentUsersEmployeeApi, requestBody);
    yield put(Creators.getPermitHistorySuccess({ data: permits, nextPageCursor, previousPageCursor }));
  }
  catch (error) {
    yield put(Creators.getPermitHistoryFailure({ error }));
  }
  finally {
    if (yield cancelled()) {
      yield call(cancelSource.cancel);
    }
  }
}

function* watchGetPermitHistoryOfCurrentUsersEmployeeRequest() {
  yield takeLatest(Types.GET_PERMIT_HISTORY_REQUEST, getPermitHistoryOfCurrentUsersEmployee);
}

export function* approvePermit({ permitId }) {
  try {
    yield call(approvePermitApi, { permitId });
    yield put(Creators.getPermitHistoryRequest({}));
    yield put(Creators.getPermitRequestsForSupervisorRequest({}));
    yield put(Creators.getUsedAndVestedPermitCountsRequest({}));
    yield put(Creators.actionButtonSuccess({}));
  }
  catch (error) {
    yield put(Creators.actionButtonFailure({}));
    yield put(ToastCreators.error({ error }));
  }
}
export function* watchApprovePermitRequest() {
  yield takeLatest(Types.APPROVE_PERMIT_REQUEST, approvePermit);
}

export function* rejectPermit({ permitId }) {
  try {
    yield call(rejectPermitApi, { permitId });
    yield put(Creators.getPermitHistoryRequest({}));
    yield put(Creators.getPermitRequestsForSupervisorRequest({}));
    yield put(Creators.getUsedAndVestedPermitCountsRequest({}));

    yield put(Creators.actionButtonSuccess({}));
  }
  catch (error) {
    yield put(Creators.actionButtonFailure({}));
    yield put(ToastCreators.error({ error }));
  }
}
export function* watchRejectPermitRequest() {
  yield takeLatest(Types.REJECT_PERMIT_REQUEST, rejectPermit);
}

export function* cancelPermit({ permitId }) {
  try {
    yield call(cancelPermitApi, { permitId });
    yield put(Creators.getPermitHistoryRequest({}));
    yield put(Creators.getPermitRequestsForSupervisorRequest({}));
    yield put(Creators.getUsedAndVestedPermitCountsRequest({}));
    yield put(Creators.actionButtonSuccess({}));
  }
  catch (error) {
    yield put(Creators.actionButtonFailure({}));
    yield put(ToastCreators.error({ error }));
  }
}
export function* watchCancelPermitRequest() {
  yield takeLatest(Types.CANCEL_PERMIT_REQUEST, cancelPermit);
}

export function* cancelRequestedPermit({ permitId }) {
  try {
    yield call(cancelRequestedPermitApi, { permitId });
    yield put(Creators.getPermitHistoryRequest({}));
    yield put(Creators.getPermitRequestsForSupervisorRequest({}));
    yield put(Creators.getUsedAndVestedPermitCountsRequest({}));
    yield put(Creators.actionButtonSuccess({}));
  }
  catch (error) {
    yield put(Creators.actionButtonFailure({}));
    yield put(ToastCreators.error({ error }));
  }
}
export function* watchCancelRequestedPermitRequest() {
  yield takeLatest(Types.CANCEL_REQUESTED_PERMIT_REQUEST, cancelRequestedPermit);
}

function* getPermitRequestsForSupervisor({
  limit,
  nextPageCursor: _nextPageCursor,
  previousPageCursor: _previousPageCursor,
  filters,
}) {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();
  try {
    const paginationData = yield select(permitRequestsForSupervisorSelector.getPaginationData);
    const filtersData = yield select(permitRequestsForSupervisorSelector.getFilters);
    const { status: statuses, permitType: permitTypes, employee: employeeIds } = { ...filters, ...filtersData };

    const requestBody = {
      cancelSource,
      ...(statuses ? { statuses } : undefined),
      ...(permitTypes ? { permitTypes } : undefined),
      ...(employeeIds ? { employeeIds } : undefined),
      limit: limit || paginationData.limit,
      paginationMode: PAGINATION_MODES.CURSOR,
      ...(_nextPageCursor ? { nextPageCursor: _nextPageCursor } : undefined),
      ...(_previousPageCursor ? { previousPageCursor: _previousPageCursor } : undefined),
    };
    const { permits, nextPageCursor, previousPageCursor } = yield call(getPermitRequestsForSupervisorAPI, requestBody);
    yield put(Creators.getPermitRequestsForSupervisorSuccess({ data: permits, nextPageCursor, previousPageCursor }));
  }
  catch (error) {
    yield put(Creators.getPermitRequestsForSupervisorFailure({ error }));
  }
  finally {
    if (yield cancelled()) {
      yield call(cancelSource.cancel);
    }
  }
}
function* watchGetPermitRequestsForSupervisorRequest() {
  yield takeLatest(Types.GET_PERMIT_REQUESTS_FOR_SUPERVISOR_REQUEST, getPermitRequestsForSupervisor);
}

function* getEmployeesOfManagerRequest({ employeeId }) {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const { employees } = yield call(getEmployeesOfManagerAPI, { employeeId, cancelSource });
    yield put(Creators.getEmployeesOfManagerSuccess({ data: employees }));
  }
  catch (error) {
    yield put(Creators.getEmployeesOfManagerFailure({ error }));
  }
  finally {
    if (yield cancelled()) {
      yield call(cancelSource.cancel);
    }
  }
}
function* watchGetEmployeesOfManagerRequest() {
  yield takeLatest(Types.GET_EMPLOYEES_OF_MANAGER_REQUEST, getEmployeesOfManagerRequest);
}

export function* getPermitInfoOfManagersTeam() {
  try {
    const { employees } = yield call(getPermitInfoOfManagersTeamApi);
    yield put(Creators.getPermitInfoOfManagersTeamSuccess({ data: employees }));
  }
  catch (error) {
    yield put(Creators.getPermitInfoOfManagersTeamFailure());
    yield put(ToastCreators.error({ error }));
  }
}
function* watchGetPermitInfoOfManagersTeamRequest() {
  yield takeLatest(Types.GET_PERMIT_INFO_OF_MANAGERS_TEAM_REQUEST, getPermitInfoOfManagersTeam);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetEmployeeDetailsForProfileRequest),
      fork(watchGetActiveSessionsRequest),
      fork(watchGetEmployeeAssetsForProfileRequest),
      fork(watchGetEmployeeVehiclesForProfileRequest),
      fork(watchUpdateContactInfoRequest),
      fork(watchGetEmployeeEducationsRequest),
      fork(watchUpdateEducationRequest),
      fork(watchRemoveEducationRequest),
      fork(watchAddEducationRequest),
      fork(watchGetPermitHistoryOfCurrentUsersEmployeeRequest),
      fork(watchApprovePermitRequest),
      fork(watchRejectPermitRequest),
      fork(watchCancelPermitRequest),
      fork(watchCancelRequestedPermitRequest),
      fork(watchGetPermitRequestsForSupervisorRequest),
      fork(watchGetEmployeesOfManagerRequest),
      fork(getUsedAndVestedPermitCountsRequest),
      fork(watchGetPermitInfoOfManagersTeamRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
