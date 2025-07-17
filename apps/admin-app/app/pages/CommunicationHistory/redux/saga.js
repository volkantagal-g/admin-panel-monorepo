import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { filtersSelector } from '@app/pages/CommunicationHistory/redux/selectors';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getNotificationReportConfigs, getResults, getSignedUrl, getSignedUrlHtml, getExportHistory } from '@shared/api/communicationHistory';
import { getLangKey } from '@shared/i18n';

export function* getResultsRequest({ communicationType }) {
  try {
    const filters = yield select(filtersSelector.getFilters);
    const results = yield call(getResults, { ...filters, clientLanguage: getLangKey() }, communicationType);
    yield put(Creators.getResultsSuccess({ data: results }));
  }
  catch (error) {
    const errorMessageToastModel = error?.response?.data?.subErrors?.map(item => item.errorMessage);
    const errorMessage = { message: errorMessageToastModel?.toString() };
    yield put(Creators.getResultsFailure({ error: errorMessage }));
    yield put(ToastCreators.error({ error: errorMessage }));
  }
}

export function* getSignedUrlRequest({ emailId }) {
  try {
    const results = yield call(getSignedUrl, emailId);
    yield put(Creators.getSignedUrlSuccess({ data: results }));
  }
  catch (error) {
    yield put(Creators.getSignedUrlFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getSignedUrlHtmlRequest({ signedUrl }) {
  try {
    const results = yield call(getSignedUrlHtml, { signedUrl });
    yield put(Creators.getSignedUrlHtmlSuccess({ data: results }));
  }
  catch (error) {
    yield put(Creators.getSignedUrlHtmlFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getNotificationReportConfigsRequest() {
  try {
    const results = yield call(getNotificationReportConfigs, { clientLanguage: getLangKey() });
    yield put(Creators.getNotificationReportConfigsSuccess({ data: results }));
  }
  catch (error) {
    yield put(Creators.getNotificationReportConfigsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getExportHistoryRequest({ filters, communicationType }) {
  try {
    const results = yield call(getExportHistory, { ...filters }, communicationType);
    const { message } = results;
    yield put(Creators.getExportHistorySuccess({ data: results }));
    yield put(ToastCreators.success({ message }));
  }
  catch (error) {
    const errorMessageToastModel = error?.response?.data?.subErrors?.map(item => item.errorMessage);
    const errorMessage = { message: errorMessageToastModel?.toString() };
    yield put(Creators.getExportHistoryFailure({ error: errorMessage }));
    yield put(ToastCreators.error({ error: errorMessage }));
  }
}

function* watchResultsRequest() {
  yield takeLatest(Types.SET_TABLE_FILTERS, getResultsRequest);
}

function* watchGetSignedUrlRequest() {
  yield takeLatest(Types.GET_SIGNED_URL_REQUEST, getSignedUrlRequest);
}

function* watchGetSignedUrlHtmlRequest() {
  yield takeLatest(Types.GET_SIGNED_URL_HTML_REQUEST, getSignedUrlHtmlRequest);
}

function* watchGetNotificationReportConfigsRequest() {
  yield takeLatest(Types.GET_NOTIFICATION_REPORT_CONFIGS_REQUEST, getNotificationReportConfigsRequest);
}

function* watchGetExportHistoryFile() {
  yield takeLatest(Types.GET_EXPORT_HISTORY_REQUEST, getExportHistoryRequest);
}

export default function* communicationHistorySagaRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchResultsRequest),
      fork(watchGetSignedUrlRequest),
      fork(watchGetSignedUrlHtmlRequest),
      fork(watchGetNotificationReportConfigsRequest),
      fork(watchGetExportHistoryFile),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
