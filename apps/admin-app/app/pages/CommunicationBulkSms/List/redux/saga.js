import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';

import { filtersSelector } from '@app/pages/CommunicationBulkSms/List/redux/selectors';
import { Types, Creators } from '@app/pages/CommunicationBulkSms/List/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getResults, duplicate, getConfig, cancelBulkSms } from '@shared/api/communicationBulkSms';
import { getLangKey } from '@shared/i18n';
import history from '@shared/utils/history';

export function* getResultsRequest() {
  try {
    const filters = yield select(filtersSelector.getFilters);
    const results = yield call(getResults, { ...filters, clientLanguage: getLangKey() });
    yield put(Creators.getResultsSuccess({ data: results }));
  }
  catch (error) {
    yield put(Creators.getResultsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getConfigRequest({ clientLanguage }) {
  try {
    const results = yield call(getConfig, clientLanguage);
    yield put(Creators.getConfigSuccess({ data: results }));
  }
  catch (error) {
    yield put(Creators.getConfigFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* duplicateRequest({ id, clientId }) {
  try {
    const result = yield call(duplicate, { id, clientId });
    yield put(ToastCreators.success());
    history.push(`/bulk-sms/detail/${result.id}`);
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

export function* getCancelRequest({ id, clientId }) {
  try {
    yield call(cancelBulkSms, { id, clientId });
    yield put(Creators.getCancelSuccess({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchResultsRequest() {
  yield takeLatest(Types.SET_TABLE_FILTERS, getResultsRequest);
}

function* watchGetConfigRequest() {
  yield takeLatest(Types.GET_CONFIG_REQUEST, getConfigRequest);
}

function* watchDuplicateRequest() {
  yield takeLatest(Types.DUPLICATE_REQUEST, duplicateRequest);
}

function* watchGetCancelRequest() {
  yield takeLatest(Types.GET_CANCEL_REQUEST, getCancelRequest);
}

export default function* communicationBulkSmsListSagaRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchResultsRequest),
      fork(watchGetConfigRequest),
      fork(watchDuplicateRequest),
      fork(watchGetCancelRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
