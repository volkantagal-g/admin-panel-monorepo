import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';

import { getTobbGibRequest } from '@shared/api/tobb';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  exportTobbGibRequestSuccessRequestsAsCSV,
  exportTobbGibRequestInvalidRequestsAsCSV,
  exportTobbGibRequestFailedRequestsAsCSV,
} from '../utils';
import { getTobbGibRequestSelector } from './selectors';

const BATCH_LIMIT = 5;

export function* getTobbGibRequestRequest({ ids, isRetryFailedRequests }) {
  const batchSuccessRequests = [];
  const batchInvalidRequests = [];
  const batchFailedRequests = [];
  const batchSize = BATCH_LIMIT;
  let processedSuccessRequests = [];
  let processedInvalidRequests = [];
  let processedRequests = [];
  if (isRetryFailedRequests) {
    processedSuccessRequests = yield select(getTobbGibRequestSelector.getData);
    processedInvalidRequests = yield select(getTobbGibRequestSelector.getInvalidRequests);
    processedRequests = processedSuccessRequests?.map(item => item.vkn);
  }
  try {
    yield put(Creators.resetTobbGibRequestProcessedRequests({ processedRequests }));
    for (let i = 0; i < ids.length; i += batchSize) {
      const batchIds = ids.slice(i, i + batchSize);
      try {
        const data = yield call(getTobbGibRequest, { ids: batchIds });
        batchSuccessRequests.push(...(data.successRequests ?? []));
        batchInvalidRequests.push(...(data.invalidRequests ?? []));
        batchFailedRequests.push(...(data.failedRequests ?? []));
      }
      catch (err) {
        batchFailedRequests.push(...batchIds);
      }
      yield put(Creators.setTobbGibRequestProcessedRequests({ processedRequests: batchIds }));
    }
    if (isRetryFailedRequests) {
      yield put(Creators.getTobbGibRequestSuccess({
        data: [...processedSuccessRequests, ...batchSuccessRequests],
        invalidRequests: [...processedInvalidRequests, ...batchInvalidRequests],
        failedRequests: batchFailedRequests,
      }));
    }
    else {
      yield put(Creators.getTobbGibRequestSuccess({
        data: batchSuccessRequests,
        failedRequests: batchFailedRequests,
        invalidRequests: batchInvalidRequests,
      }));
    }
    yield put(ToastCreators.success());
  }
  catch (error) {
    if (isRetryFailedRequests) {
      yield put(Creators.getTobbGibRequestFailure({
        error,
        data: [...processedSuccessRequests, ...batchSuccessRequests],
        invalidRequests: [...processedInvalidRequests, ...batchInvalidRequests],
        failedRequests: batchFailedRequests,
      }));
    }
    else {
      yield put(Creators.getTobbGibRequestFailure({
        error,
        data: batchSuccessRequests,
        failedRequests: batchFailedRequests,
        invalidRequests: batchInvalidRequests,
      }));
    }

    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetTobbGibRequestRequest() {
  yield takeLatest(Types.GET_TOBB_GIB_REQUEST_REQUEST, getTobbGibRequestRequest);
}

export function* exportTobbGibRequestSuccessRequests({ data }) {
  try {
    exportTobbGibRequestSuccessRequestsAsCSV(data);
    yield put(Creators.exportTobbGibRequestSuccessRequestsSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.exportTobbGibRequestSuccessRequestsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchExportTobbGibRequestSuccessRequests() {
  yield takeLatest(Types.EXPORT_TOBB_GIB_REQUEST_SUCCESS_REQUESTS_REQUEST, exportTobbGibRequestSuccessRequests);
}

export function* exportTobbGibRequestInvalidRequests({ data }) {
  try {
    exportTobbGibRequestInvalidRequestsAsCSV(data);
    yield put(Creators.exportTobbGibRequestInvalidRequestsSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.exportTobbGibRequestInvalidRequestsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchExportTobbGibRequestInvalidRequests() {
  yield takeLatest(Types.EXPORT_TOBB_GIB_REQUEST_INVALID_REQUESTS_REQUEST, exportTobbGibRequestInvalidRequests);
}

export function* exportTobbGibRequestFailedRequests({ data }) {
  try {
    exportTobbGibRequestFailedRequestsAsCSV(data);
    yield put(Creators.exportTobbGibRequestFailedRequestsSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.exportTobbGibRequestFailedRequestsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchExportTobbGibRequestFailedRequests() {
  yield takeLatest(Types.EXPORT_TOBB_GIB_REQUEST_FAILED_REQUESTS_REQUEST, exportTobbGibRequestFailedRequests);
}

export default function* waterOrderActiveRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetTobbGibRequestRequest),
      fork(watchExportTobbGibRequestSuccessRequests),
      fork(watchExportTobbGibRequestInvalidRequests),
      fork(watchExportTobbGibRequestFailedRequests),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
