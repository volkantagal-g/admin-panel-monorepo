import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getConfigKey } from '@shared/api/marketing';

function* getInAppRedirectionRequest({ body }) {
  try {
    const data = yield call(getConfigKey, { body });
    yield put(Creators.getInAppRedirectionSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getInAppRedirectionFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetInAppRedirectionRequest() {
  yield takeLatest(Types.GET_IN_APP_REDIRECTION_REQUEST, getInAppRedirectionRequest);
}

export default function* root() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchGetInAppRedirectionRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
