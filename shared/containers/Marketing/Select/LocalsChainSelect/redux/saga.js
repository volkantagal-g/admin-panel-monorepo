import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getLocalsChains } from '@shared/api/marketing';

function* getLocalsChainsRequest() {
  try {
    const data = yield call(getLocalsChains);
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

export default function* root() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchGetLocalsChainsRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
