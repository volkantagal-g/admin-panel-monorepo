import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { transactionalSmsSave, getConfig } from '@shared/api/transactionalSms';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import history from '@shared/utils/history';
import { getRelativeRouteWithSlug } from '@shared/utils/common';
import { ROUTE } from '@app/routes';

function* transactionalSmsSaveRequest({ body, clientLanguage }) {
  try {
    const data = yield call(transactionalSmsSave, { body, clientLanguage });
    yield put(Creators.transactionalSmsSaveSuccess({ data }));
    yield put(ToastCreators.success());
    history.push(getRelativeRouteWithSlug(ROUTE.TRANSACTIONAL_SMS_DETAIL.path, { id: data.id }));
  }
  catch (error) {
    const errorMessageToastModel = error?.response?.data?.errors?.map(item => item.message);
    const errorMessage = { message: errorMessageToastModel?.toString() };
    yield put(Creators.transactionalSmsSaveFailure({ error: errorMessage }));
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

function* watchTransactionalSmsSaveRequest() {
  yield takeLatest(Types.TRANSACTIONAL_SMS_SAVE_REQUEST, transactionalSmsSaveRequest);
}

function* watchGetConfigRequest() {
  yield takeLatest(Types.GET_CONFIG_REQUEST, getConfigRequest);
}

export default function* transactionalSmsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchTransactionalSmsSaveRequest),
      fork(watchGetConfigRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
