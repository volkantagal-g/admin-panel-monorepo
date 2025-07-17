import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';

import { filtersSelector } from '@app/pages/Email/List/redux/selectors';
import { Types, Creators } from '@app/pages/Email/List/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import history from '@shared/utils/history';
import { convertFilterPayload } from '@app/pages/Email/List/utils';
import { duplicate, cancelEmail, getResults, getGlobalSettings, updateGlobalSettings } from '@shared/api/email';

export function* getResultsRequest() {
  try {
    const filters = yield select(filtersSelector.getFilters);
    const convertedFilters = convertFilterPayload(filters);
    const results = yield call(getResults, convertedFilters);
    yield put(Creators.getResultsSuccess(results));
  }
  catch (error) {
    yield put(Creators.getResultsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* duplicateRequest({ id }) {
  try {
    const result = yield call(duplicate, id);
    yield put(ToastCreators.success());
    history.push(`/email/detail/${result.data}`);
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* cancelRequest({ id }) {
  try {
    yield call(cancelEmail, id);
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

// Global Setttings Saga

export function* getGlobalSettingsRequest() {
  try {
    const results = yield call(getGlobalSettings);
    yield put(Creators.getGlobalSettingsSuccess(results));
  }
  catch (error) {
    yield put(Creators.getGlobalSettingsFailure({ error }));
    yield put(ToastCreators.error({ error, toastOptions: { position: 'bottom-center' } }));
  }
}

export function* updateGlobalSettingsRequest({ body }) {
  try {
    const results = yield call(updateGlobalSettings, body);
    yield put(Creators.updateGlobalSettingsSuccess(results));
    yield put(ToastCreators.success({ toastOptions: { position: 'bottom-center' } }));
  }
  catch (error) {
    yield put(Creators.updateGlobalSettingsFailure({ error }));
    yield put(ToastCreators.error({ error, toastOptions: { position: 'bottom-center' } }));
  }
}

// ** //

function* watchResultsRequest() {
  yield takeLatest(Types.SET_TABLE_FILTERS, getResultsRequest);
}

function* watchDuplicateRequest() {
  yield takeLatest(Types.DUPLICATE_REQUEST, duplicateRequest);
}

function* watchCancelRequest() {
  yield takeLatest(Types.CANCEL_REQUEST, cancelRequest);
}

// Global Settings Watcher
function* watchGetGlobalSettingsReuqest() {
  yield takeLatest(Types.GET_GLOBAL_SETTINGS_REQUEST, getGlobalSettingsRequest);
}

function* watchUpdateGlobalSettingsReuqest() {
  yield takeLatest(Types.UPDATE_GLOBAL_SETTINGS_REQUEST, updateGlobalSettingsRequest);
}
// ** //

export default function* emailListSagaRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchResultsRequest),
      fork(watchDuplicateRequest),
      fork(watchGetGlobalSettingsReuqest),
      fork(watchUpdateGlobalSettingsReuqest),
      fork(watchCancelRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
