import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getLeaveRequests as getLeaveRequestsApi,
  batchLeaveRequests as batchLeaveRequestsApi,
  getLeaveDetail as getLeaveDetailApi,
  approveLeaveRequest as approveLeaveRequestApi,
  rejectLeaveRequest as rejectLeaveRequestApi,
  cancelLeaveRequest as cancelLeaveRequestApi,
  getSignedUrl as getSignedUrlApi,
  getLeaveTypes as getLeaveTypesApi,
  getLeaveExcel as getLeaveExcelApi,
} from '@shared/api/leaveManagement';

import { Types, Creators } from './actions';
import { getLimitAndOffset } from '@shared/utils/common';
import { EMPLOYEE_LEAVE_STATUSES } from '@shared/shared/constants';
import { t } from '@shared/i18n';

export function getLeaveRequests(step) {
  return function* gen({
    franchiseId,
    status,
    startDatetime,
    endDatetime,
    isEmailRequired,
    currentPage,
    rowsPerPage,
  }) {
    try {
      const { limit, offset } = getLimitAndOffset({ currentPage, rowsPerPage });
      const { leaves, totalCount } = yield call(getLeaveRequestsApi, {
        franchiseId,
        status,
        startDatetime,
        endDatetime,
        isEmailRequired,
        limit,
        offset,
      });
      yield put(
        Creators[`getLeaveRequestsSuccess${step}`]({
          data: leaves,
          total: totalCount,
        }),
      );
    }
    catch (error) {
      yield put(Creators[`getLeaveRequestsFailure${step}`]({ error }));
      yield put(ToastCreators.error({ error }));
    }
  };
}

export function* batchLeaveRequests(body) {
  try {
    const data = yield call(batchLeaveRequestsApi, body);
    yield put(Creators.batchLeaveRequestsSuccess({ data }));
    // Response includes information which leaves updated succesfully, and which do not. Show error message for the unsuccesful ones.
    const failedRequest = data.find(lv => !lv.success);
    if (failedRequest) {
      ToastCreators.error(t('leaveManagement:ERROR_MESSAGE'));
    }
    else {
      yield put(ToastCreators.success());
    }
  }
  catch (error) {
    yield put(Creators.batchLeaveRequestsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetLeaveRequestsRequest() {
  const values = Object.values(EMPLOYEE_LEAVE_STATUSES);
  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];
    yield takeLatest(
      Types[`GET_LEAVE_REQUESTS_REQUEST${value}`],
      getLeaveRequests(value),
    );
  }
}

function* watchBatchLeaveRequestsRequest() {
  yield takeLatest(Types.BATCH_LEAVE_REQUESTS_REQUEST, batchLeaveRequests);
}

export function* getLeaveDetail({ leaveRequestId }) {
  try {
    const data = yield call(getLeaveDetailApi, { leaveRequestId });
    yield put(Creators.getLeaveDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLeaveDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* approveLeaveRequest({ leaveRequestId }) {
  try {
    const data = yield call(approveLeaveRequestApi, { leaveRequestId });
    yield put(Creators.approveLeaveRequestSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.approveLeaveRequestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* rejectLeaveRequest({ leaveRequestId, description }) {
  try {
    const data = yield call(rejectLeaveRequestApi, {
      leaveRequestId,
      description,
    });
    yield put(Creators.rejectLeaveRequestSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.rejectLeaveRequestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* cancelLeaveRequest({ leaveRequestId }) {
  try {
    const data = yield call(cancelLeaveRequestApi, { leaveRequestId });
    yield put(Creators.cancelLeaveRequestSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.cancelLeaveRequestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getSignedUrl({ fileKey, personId }) {
  try {
    const { url } = yield call(getSignedUrlApi, { fileKey, personId });
    yield put(Creators.getSignedUrlSuccess());
    window.open(url);
  }
  catch (error) {
    yield put(Creators.getSignedUrlFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getLeaveExcel({ franchiseIds, utcOffset, startDatetime, endDatetime }) {
  try {
    const { url } = yield call(getLeaveExcelApi, { franchiseIds, utcOffset, startDatetime, endDatetime });
    if (!url) {
      throw new Error(t('leaveManagement:NO_LEAVES_FOUND'));
    }
    yield put(Creators.getLeaveExcelSuccess());
    window.open(url);
  }
  catch (error) {
    yield put(Creators.getLeaveExcelFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetLeaveDetailRequest() {
  yield takeLatest(Types.GET_LEAVE_DETAIL_REQUEST, getLeaveDetail);
}

function* watchApproveLeaveRequestRequest() {
  yield takeLatest(Types.APPROVE_LEAVE_REQUEST_REQUEST, approveLeaveRequest);
}

function* watchRejectLeaveRequestRequest() {
  yield takeLatest(Types.REJECT_LEAVE_REQUEST_REQUEST, rejectLeaveRequest);
}

function* watchCancelLeaveRequestRequest() {
  yield takeLatest(Types.CANCEL_LEAVE_REQUEST_REQUEST, cancelLeaveRequest);
}

function* watchGetSignedUrlRequest() {
  yield takeLatest(Types.GET_SIGNED_URL_REQUEST, getSignedUrl);
}

function* watchGetLeaveExcelRequest() {
  yield takeLatest(Types.GET_LEAVE_EXCEL_REQUEST, getLeaveExcel);
}

export function* getLeaveTypes() {
  try {
    const data = yield call(getLeaveTypesApi, {});
    yield put(Creators.getLeaveTypesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLeaveTypesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetLeaveTypesRequest() {
  yield takeLatest(Types.GET_LEAVE_TYPES_REQUEST, getLeaveTypes);
}

export default function* employeeLeaveRequestsPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetLeaveRequestsRequest),
      fork(watchBatchLeaveRequestsRequest),
      fork(watchGetLeaveDetailRequest),
      fork(watchApproveLeaveRequestRequest),
      fork(watchRejectLeaveRequestRequest),
      fork(watchCancelLeaveRequestRequest),
      fork(watchGetSignedUrlRequest),
      fork(watchGetLeaveTypesRequest),
      fork(watchGetLeaveExcelRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
