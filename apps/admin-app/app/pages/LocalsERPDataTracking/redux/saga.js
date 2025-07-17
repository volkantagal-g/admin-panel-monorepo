import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';

import {
  getLocalsERPDataTrackingFailed,
  getLocalsERPDataTrackingSuccess,
  getLocalsERPDataTrackingSummary,
  getLocalsERPDataTrackingSummaryExcelExport,
} from '@shared/api/localsERPDataTracking';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { LocalsERPDataTrackingFailedSelector, LocalsERPDataTrackingSuccessSelector } from './selectors';
import { getFailedOrSuccessAPIPayload } from '../utils';
import { t } from '@shared/i18n';

function* getLocalsERPDataTrackingSummaryRequest({ startDate, endDate }) {
  try {
    const data = yield call(getLocalsERPDataTrackingSummary, { startDate, endDate });
    yield put(Creators.getLocalsERPDataTrackingSummarySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLocalsERPDataTrackingSummaryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetLocalsERPDataTrackingSummaryRequest() {
  yield takeLatest(Types.GET_LOCALS_ERP_DATA_TRACKING_SUMMARY_REQUEST, getLocalsERPDataTrackingSummaryRequest);
}

function* getLocalsERPDataTrackingSummaryExcelExportRequest({ startDate, endDate }) {
  try {
    const data = yield call(getLocalsERPDataTrackingSummaryExcelExport, { startDate, endDate });
    yield put(Creators.getLocalsERPDataTrackingSummaryExcelExportSuccess({ data }));
    yield put(ToastCreators.success({ message: t('global:PREPARING_REPORT') }));
  }
  catch (error) {
    yield put(Creators.getLocalsERPDataTrackingSummaryExcelExportFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetLocalsERPDataTrackingSummaryExcelExportRequest() {
  yield takeLatest(Types.GET_LOCALS_ERP_DATA_TRACKING_SUMMARY_EXCEL_EXPORT_REQUEST, getLocalsERPDataTrackingSummaryExcelExportRequest);
}

function* getLocalsERPDataTrackingFailedRequest() {
  try {
    const failedFilters = yield select(LocalsERPDataTrackingFailedSelector.getFailedFilters);
    const data = yield call(getLocalsERPDataTrackingFailed, getFailedOrSuccessAPIPayload(failedFilters));
    yield put(Creators.getLocalsERPDataTrackingFailedSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLocalsERPDataTrackingFailedFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetLocalsERPDataTrackingFailedRequest() {
  yield takeLatest(Types.GET_LOCALS_ERP_DATA_TRACKING_FAILED_REQUEST, getLocalsERPDataTrackingFailedRequest);
}

function* getLocalsERPDataTrackingSuccessRequest() {
  try {
    const successFilters = yield select(LocalsERPDataTrackingSuccessSelector.getSuccessFilters);
    const data = yield call(getLocalsERPDataTrackingSuccess, getFailedOrSuccessAPIPayload(successFilters));
    yield put(Creators.getLocalsERPDataTrackingSuccessSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLocalsERPDataTrackingSuccessFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetLocalsERPDataTrackingSuccessRequest() {
  yield takeLatest(Types.GET_LOCALS_ERP_DATA_TRACKING_SUCCESS_REQUEST, getLocalsERPDataTrackingSuccessRequest);
}

export default function* brandsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetLocalsERPDataTrackingSummaryRequest),
      fork(watchGetLocalsERPDataTrackingFailedRequest),
      fork(watchGetLocalsERPDataTrackingSuccessRequest),
      fork(watchGetLocalsERPDataTrackingSummaryExcelExportRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
