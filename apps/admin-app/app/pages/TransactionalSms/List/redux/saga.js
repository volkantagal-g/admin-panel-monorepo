import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';

import { filtersSelector } from '@app/pages/TransactionalSms/List/redux/selectors';
import { Types, Creators } from '@app/pages/TransactionalSms/List/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { duplicate, getResults, getConfig, getExportSmsList } from '@shared/api/transactionalSms';
import history from '@shared/utils/history';
import { getLangKey } from '@shared/i18n';

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

export function* getExportSmsListRequest({ filters }) {
  try {
    const results = yield call(getExportSmsList, { ...filters });
    const { message } = results;
    yield put(Creators.getExportSmsListSuccess({ data: results }));
    yield put(ToastCreators.success({ message }));
  }
  catch (error) {
    const errorMessageToastModel = error?.response?.data?.subErrors?.map(item => item.errorMessage);
    const errorMessage = { message: errorMessageToastModel?.toString() };
    yield put(Creators.getExportSmsListFailure({ error: errorMessage }));
    yield put(ToastCreators.error({ error: errorMessage }));
  }
}
function* duplicateRequest({ id, clientLanguage }) {
  try {
    const result = yield call(duplicate, { id, clientLanguage });
    yield put(ToastCreators.success());
    history.push(`/transactional-sms/detail/${result.id}`);
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

function* watchGetExportSmsList() {
  yield takeLatest(Types.GET_EXPORT_SMS_LIST_REQUEST, getExportSmsListRequest);
}
function* watchDuplicateRequest() {
  yield takeLatest(Types.DUPLICATE_REQUEST, duplicateRequest);
}

export default function* transactionalSmsListSagaRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchResultsRequest),
      fork(watchGetConfigRequest),
      fork(watchDuplicateRequest),
      fork(watchGetExportSmsList),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
