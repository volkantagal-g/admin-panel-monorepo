import moment from 'moment';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { all, call, cancel, cancelled, fork, put, take, takeLatest, select } from 'redux-saga/effects';

import {
  getPermitsForCalender as getPermitsForCalendarAPI,
  getPermitRequestsForSupervisor as getPermitRequestsForSupervisorAPI,
  createPermit as createPermitAPI,
  getPermitHistoryOfCurrentUsersEmployee as getPermitHistoryOfCurrentUsersEmployeeApi,
  getS3SignedUploadDocumentPrivateUrl,
  getEmployeesOfManager as getEmployeesOfManagerAPI,
  approvePermit as approvePermitApi,
  rejectPermit as rejectPermitApi,
  cancelPermit as cancelPermitApi,
  cancelRequestedPermit as cancelRequestedPermitApi,
  getUsedAndVestedLeaveCountsOfCurrentUsersEmployee as getUsedAndVestedLeaveCountsOfCurrentUsersEmployeeApi,
  getPermitInfoOfManagersTeam as getPermitInfoOfManagersTeamApi,
} from '@shared/api/employee';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { PAGINATION_MODES } from '../../constants';
import { Types, Creators } from './actions';
import { getPermitHistorySelector, permitRequestsForSupervisorSelector, permitsForCalendarFormDataSelector } from './selectors';
import { uploadToS3 } from '@shared/api/upload';
import { t } from '@shared/i18n';

function* getPermitsForCalendar() {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const {
      selectedMonth,
      selectedDepartment,
      selectedSupervisor,
      selectedEmployee,
      selectedTopManager,
    } = yield select(permitsForCalendarFormDataSelector.getFormData);
    const requestData = {
      cancelSource,
      startDate: moment(selectedMonth).clone().startOf('month').subtract(10, 'days'),
      endDate: moment(selectedMonth).clone().endOf('month').add(10, 'days'),
      ...(selectedDepartment?.department ? { department: selectedDepartment.department } : undefined),
      ...(!isEmpty(selectedDepartment?.subDepartments) ? { subDepartments: selectedDepartment.subDepartments } : undefined),
      ...(selectedSupervisor ? { supervisor: selectedSupervisor } : undefined),
      ...(selectedTopManager ? { topManager: selectedTopManager } : undefined),
      ...(selectedEmployee ? { employeeIds: [selectedEmployee] } : undefined),
    };
    const { permits } = yield call(getPermitsForCalendarAPI, requestData);
    yield put(Creators.getPermitsForCalendarSuccess({ data: permits }));
  }
  catch (error) {
    yield put(Creators.getPermitsForCalendarFailure({ error }));
  }
  finally {
    if (yield cancelled()) {
      yield call(cancelSource.cancel);
    }
  }
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

function* newPermitRequestRequest({ permit }) {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    yield call(createPermitAPI, { permit, cancelSource });
    yield put(Creators.newPermitRequestSuccess({}));
    yield put(Creators.getUsedAndVestedPermitCountsRequest({}));
    yield put(Creators.getPermitHistoryRequest({}));
    yield put(Creators.getPermitRequestsForSupervisorRequest({}));
    yield put(Creators.getPermitsForCalendarRequest({}));
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorCode = error?.response?.data?.code;
    const updatedMessage = errorCode ? t(`employeePage:EMPLOYEE_SERVICE_ERROR_CODE.${errorCode}`) : { error };
    const updatedError = {
      ...error,
      response: {
        ...error?.response,
        data: {
          ...error?.response?.data,
          message: updatedMessage,
        },
      },
    };
    yield put(Creators.newPermitRequestFailure({ error }));
    yield put(ToastCreators.error({ error: updatedError }));
  }
  finally {
    if (yield cancelled()) {
      yield call(cancelSource.cancel);
    }
  }
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

function* getUploadDocumentURLRequest({ file, callback }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();
    const {
      name,
      contentType,
      base64,
    } = file;

    const { url: signedUrl, fileKey } = yield call(getS3SignedUploadDocumentPrivateUrl, { cancelSource, name, contentType });
    yield call(uploadToS3, { signedUrl, data: base64 });
    yield put(Creators.getUploadDocumentURLSuccess({ data: { fileKey } }));
    callback(fileKey);
  }
  catch (error) {
    yield put(Creators.getUploadDocumentURLFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
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

export function* approvePermit({ permitId }) {
  try {
    yield call(approvePermitApi, { permitId });
    yield put(Creators.getPermitHistoryRequest({}));
    yield put(Creators.getPermitRequestsForSupervisorRequest({}));
    yield put(Creators.getUsedAndVestedPermitCountsRequest({}));
    yield put(Creators.getPermitsForCalendarRequest({}));
    yield put(Creators.actionButtonSuccess({}));
  }
  catch (error) {
    yield put(Creators.actionButtonFailure({}));
    yield put(ToastCreators.error({ error }));
  }
}

export function* rejectPermit({ permitId }) {
  try {
    yield call(rejectPermitApi, { permitId });
    yield put(Creators.getPermitHistoryRequest({}));
    yield put(Creators.getPermitRequestsForSupervisorRequest({}));
    yield put(Creators.getUsedAndVestedPermitCountsRequest({}));
    yield put(Creators.getPermitsForCalendarRequest({}));

    yield put(Creators.actionButtonSuccess({}));
  }
  catch (error) {
    yield put(Creators.actionButtonFailure({}));
    yield put(ToastCreators.error({ error }));
  }
}

export function* cancelPermit({ permitId }) {
  try {
    yield call(cancelPermitApi, { permitId });
    yield put(Creators.getPermitHistoryRequest({}));
    yield put(Creators.getPermitRequestsForSupervisorRequest({}));
    yield put(Creators.getUsedAndVestedPermitCountsRequest({}));
    yield put(Creators.getPermitsForCalendarRequest({}));
    yield put(Creators.actionButtonSuccess({}));
  }
  catch (error) {
    yield put(Creators.actionButtonFailure({}));
    yield put(ToastCreators.error({ error }));
  }
}

export function* cancelRequestedPermit({ permitId }) {
  try {
    yield call(cancelRequestedPermitApi, { permitId });
    yield put(Creators.getPermitHistoryRequest({}));
    yield put(Creators.getPermitRequestsForSupervisorRequest({}));
    yield put(Creators.getUsedAndVestedPermitCountsRequest({}));
    yield put(Creators.getPermitsForCalendarRequest({}));
    yield put(Creators.actionButtonSuccess({}));
  }
  catch (error) {
    yield put(Creators.actionButtonFailure({}));
    yield put(ToastCreators.error({ error }));
  }
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

function* watchGetPermitsForCalendarRequest() {
  yield takeLatest(Types.GET_PERMITS_FOR_CALENDAR_REQUEST, getPermitsForCalendar);
}

function* watchGetPermitRequestsForSupervisorRequest() {
  yield takeLatest(Types.GET_PERMIT_REQUESTS_FOR_SUPERVISOR_REQUEST, getPermitRequestsForSupervisor);
}

function* watchNewPermitRequestRequest() {
  yield takeLatest(Types.NEW_PERMIT_REQUEST_REQUEST, newPermitRequestRequest);
}

function* watchGetPermitHistoryOfCurrentUsersEmployeeRequest() {
  yield takeLatest(Types.GET_PERMIT_HISTORY_REQUEST, getPermitHistoryOfCurrentUsersEmployee);
}

function* watchGetUploadDocumentURLRequest() {
  yield takeLatest(Types.GET_UPLOAD_DOCUMENT_URL_REQUEST, getUploadDocumentURLRequest);
}

function* watchGetEmployeesOfManagerRequest() {
  yield takeLatest(Types.GET_EMPLOYEES_OF_MANAGER_REQUEST, getEmployeesOfManagerRequest);
}

export function* watchApprovePermitRequest() {
  yield takeLatest(Types.APPROVE_PERMIT_REQUEST, approvePermit);
}
export function* watchRejectPermitRequest() {
  yield takeLatest(Types.REJECT_PERMIT_REQUEST, rejectPermit);
}

export function* watchCancelPermitRequest() {
  yield takeLatest(Types.CANCEL_PERMIT_REQUEST, cancelPermit);
}
export function* watchCancelRequestedPermitRequest() {
  yield takeLatest(Types.CANCEL_REQUESTED_PERMIT_REQUEST, cancelRequestedPermit);
}

function* getUsedAndVestedPermitCountsRequest() {
  yield takeLatest(Types.GET_USED_AND_VESTED_PERMIT_COUNTS_REQUEST, getUsedAndVestedPermitCounts);
}

function* watchGetPermitInfoOfManagersTeamRequest() {
  yield takeLatest(Types.GET_PERMIT_INFO_OF_MANAGERS_TEAM_REQUEST, getPermitInfoOfManagersTeam);
}

export default function* employeeHomePagePageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetPermitsForCalendarRequest),
      fork(watchGetPermitRequestsForSupervisorRequest),
      fork(watchNewPermitRequestRequest),
      fork(watchGetPermitHistoryOfCurrentUsersEmployeeRequest),
      fork(watchGetUploadDocumentURLRequest),
      fork(watchGetEmployeesOfManagerRequest),
      fork(watchApprovePermitRequest),
      fork(watchRejectPermitRequest),
      fork(watchCancelPermitRequest),
      fork(watchCancelRequestedPermitRequest),
      fork(watchGetPermitInfoOfManagersTeamRequest),
      fork(getUsedAndVestedPermitCountsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
