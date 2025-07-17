import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { getLocalsChains } from '@shared/api/banner';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getLocalsChainsRequest({ body }) {
  try {
    const data = yield call(getLocalsChains, { body });
    yield put(Creators.getLocalsChainsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLocalsChainsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetLocalsChainsRequest() {
  yield takeLatest(Types.GET_LOCALS_CHAINS_REQUEST, getLocalsChainsRequest);
}

export default function* pushNotificationRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetLocalsChainsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
