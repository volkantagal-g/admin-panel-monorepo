import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { getTransactionalSms, transactionalSmsUpdate, getConfig } from '@shared/api/transactionalSms';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getTransactionalSmsRequest({ transactionalSmsId, clientLanguage }) {
  try {
    const data = yield call(getTransactionalSms, { id: transactionalSmsId, clientLanguage });
    yield put(Creators.getTransactionalSmsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getTransactionalSmsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateTransactionalSmsRequest({ id, body, clientLanguage }) {
  try {
    const data = yield call(transactionalSmsUpdate, { id, body, clientLanguage });
    yield put(ToastCreators.success());
    yield put(Creators.updateTransactionalSmsSuccess({ data }));
  }
  catch (error) {
    const errorMessageToastModel = error?.response?.data?.errors?.map(item => item.message);
    const errorMessage = { message: errorMessageToastModel?.toString() };
    yield put(Creators.updateTransactionalSmsFailure({ error: errorMessage }));
    yield put(ToastCreators.error({ error: errorMessage }));
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

function* watchGetTransactionalSmsRequest() {
  yield takeLatest(Types.GET_TRANSACTIONAL_SMS_REQUEST, getTransactionalSmsRequest);
}

function* watchUpdateTransactionalSmsRequest() {
  yield takeLatest(Types.UPDATE_TRANSACTIONAL_SMS_REQUEST, updateTransactionalSmsRequest);
}

function* watchGetConfigRequest() {
  yield takeLatest(Types.GET_CONFIG_REQUEST, getConfigRequest);
}

export default function* transactionalSmsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetTransactionalSmsRequest),
      fork(watchUpdateTransactionalSmsRequest),
      fork(watchGetConfigRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
