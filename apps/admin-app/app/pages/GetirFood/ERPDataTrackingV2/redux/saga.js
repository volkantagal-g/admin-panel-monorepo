import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';

import {
  getERPDataTrackingFailed,
  getERPDataTrackingSuccessful,
  getERPDataTrackingSummary,
  getERPDataTrackingSummaryExcelExport,
} from '@shared/api/foodERPDataTracking';
import { t } from '@shared/i18n';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { ERPDataTrackingFailedSelector, ERPDataTrackingSuccessfulSelector } from './selectors';
import { getFailedOrSuccessfulAPIPayload } from '../utils';

function* getERPDataTrackingSummaryRequest({ startDate, endDate }) {
  try {
    const data = yield call(getERPDataTrackingSummary, { startDate, endDate });
    yield put(Creators.getERPDataTrackingSummarySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getERPDataTrackingSummaryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetERPDataTrackingSummaryRequest() {
  yield takeLatest(Types.GET_ERP_DATA_TRACKING_SUMMARY_REQUEST, getERPDataTrackingSummaryRequest);
}

function* getERPDataTrackingSummaryExcelExportRequest({ startDate, endDate }) {
  try {
    const data = yield call(getERPDataTrackingSummaryExcelExport, { startDate, endDate });
    yield put(ToastCreators.success({ message: t('global:PREPARING_REPORT') }));
    yield put(Creators.getERPDataTrackingSummaryExcelExportSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getERPDataTrackingSummaryExcelExportFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetERPDataTrackingSummaryExcelExportRequest() {
  yield takeLatest(Types.GET_ERP_DATA_TRACKING_SUMMARY_EXCEL_EXPORT_REQUEST, getERPDataTrackingSummaryExcelExportRequest);
}

function* getERPDataTrackingFailedRequest() {
  try {
    const failedFilters = yield select(ERPDataTrackingFailedSelector.getFailedFilters);
    const data = yield call(getERPDataTrackingFailed, getFailedOrSuccessfulAPIPayload(failedFilters));
    yield put(Creators.getERPDataTrackingFailedSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getERPDataTrackingFailedFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetERPDataTrackingFailedRequest() {
  yield takeLatest(Types.GET_ERP_DATA_TRACKING_FAILED_REQUEST, getERPDataTrackingFailedRequest);
}

function* getERPDataTrackingSuccessfulRequest() {
  try {
    const successfulFilters = yield select(ERPDataTrackingSuccessfulSelector.getSuccessfulFilters);
    const data = yield call(getERPDataTrackingSuccessful, getFailedOrSuccessfulAPIPayload(successfulFilters));
    yield put(Creators.getERPDataTrackingSuccessfulSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getERPDataTrackingSuccessfulFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetERPDataTrackingSuccessfulRequest() {
  yield takeLatest(Types.GET_ERP_DATA_TRACKING_SUCCESSFUL_REQUEST, getERPDataTrackingSuccessfulRequest);
}

export default function* brandsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetERPDataTrackingSummaryRequest),
      fork(watchGetERPDataTrackingFailedRequest),
      fork(watchGetERPDataTrackingSuccessfulRequest),
      fork(watchGetERPDataTrackingSummaryExcelExportRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
