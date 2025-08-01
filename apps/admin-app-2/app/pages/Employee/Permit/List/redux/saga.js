import axios from 'axios';
import { all, call, cancel, cancelled, fork, put, select, take, takeLatest } from 'redux-saga/effects';

import {
  getFilteredPermits as getFilteredPermitsAPI,
  getExportedPermitsExcelDownloadURL as getExportedPermitsExcelDownloadURLAPI,
  approvePermit as approvePermitApi,
  rejectPermit as rejectPermitApi,
  cancelPermit as cancelPermitApi,
  cancelRequestedPermit as cancelRequestedPermitApi,
} from '@shared/api/employee';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getRequestParams } from '../utils';
import { Types, Creators } from './actions';
import { filterSelector } from './selectors';
import { getLangKey } from '@shared/i18n';

function* getFilteredPermits({ nextPageCursor: _nextPageCursor, previousPageCursor: _previousPageCursor }) {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const filters = yield select(filterSelector.getFilters);
    const pagination = yield select(filterSelector.getPagination);
    const requestParams = getRequestParams({ filters, pagination, _nextPageCursor, _previousPageCursor });
    const { permits, nextPageCursor = null, previousPageCursor = null } = yield call(getFilteredPermitsAPI, {
      ...requestParams,
      cancelSource,
    });
    yield put(Creators.getFilteredPermitsSuccess({ data: permits }));
    yield put(Creators.setPagination({ pagination: { nextPageCursor, previousPageCursor } }));
  }
  catch (error) {
    yield put(Creators.getFilteredPermitsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
  finally {
    if (yield cancelled()) {
      yield call(cancelSource.cancel);
    }
  }
}

function* getExportedPermitsExcelDownloadURL() {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const filters = yield select(filterSelector.getFilters);
    const pagination = yield select(filterSelector.getPagination);
    const { paginationMode, ...requestParams } = getRequestParams({ filters, pagination });
    const { url } = yield call(getExportedPermitsExcelDownloadURLAPI, { ...requestParams, langKey: getLangKey(), cancelSource });
    if (url) {
      yield put(Creators.getExportedPermitsExcelDownloadURLSuccess({}));
      window.open(url, '_blank');
    }
  }
  catch (error) {
    yield put(Creators.getExportedPermitsExcelDownloadURLFailure({}));
    yield put(ToastCreators.error({ error }));
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
    yield put(Creators.getFilteredPermitsRequest({}));
    yield put(Creators.actionButtonSuccess());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.actionButtonFailure());
  }
}

export function* rejectPermit({ permitId }) {
  try {
    yield call(rejectPermitApi, { permitId });
    yield put(Creators.getFilteredPermitsRequest({}));
    yield put(Creators.actionButtonSuccess());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.actionButtonFailure());
  }
}

export function* cancelPermit({ permitId }) {
  try {
    yield call(cancelPermitApi, { permitId });
    yield put(Creators.getFilteredPermitsRequest({}));
    yield put(Creators.actionButtonSuccess());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.actionButtonFailure());
  }
}

export function* cancelRequestedPermit({ permitId }) {
  try {
    yield call(cancelRequestedPermitApi, { permitId });
    yield put(Creators.actionButtonSuccess());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.actionButtonFailure());
  }
}

function* watchGetFilteredPermitsRequest() {
  yield takeLatest(Types.GET_FILTERED_PERMITS_REQUEST, getFilteredPermits);
}

function* watchGetExportedPermitsExcelDownloadURLRequest() {
  yield takeLatest(Types.GET_EXPORTED_PERMITS_EXCEL_DOWNLOAD_URL_REQUEST, getExportedPermitsExcelDownloadURL);
}

function* watchApprovePermitRequest() {
  yield takeLatest(Types.APPROVE_PERMIT_REQUEST, approvePermit);
}
function* watchRejectPermitRequest() {
  yield takeLatest(Types.REJECT_PERMIT_REQUEST, rejectPermit);
}

function* watchCancelPermitRequest() {
  yield takeLatest(Types.CANCEL_PERMIT_REQUEST, cancelPermit);
}
function* watchCancelRequestedPermitRequest() {
  yield takeLatest(Types.CANCEL_REQUESTED_PERMIT_REQUEST, cancelRequestedPermit);
}

export default function* employeePermitListPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetFilteredPermitsRequest),
      fork(watchGetExportedPermitsExcelDownloadURLRequest),
      fork(watchApprovePermitRequest),
      fork(watchRejectPermitRequest),
      fork(watchCancelPermitRequest),
      fork(watchCancelRequestedPermitRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
