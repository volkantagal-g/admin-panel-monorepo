import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { getNodeVersions } from '@shared/api/technology/compliance';

export function* getNodeVersionsRequest() {
  try {
    const data = yield call(getNodeVersions);
    yield put(Creators.getNodeVersionsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getNodeVersionsFailure({ error }));
  }
}

function* watchGetNodeVersionsRequest() {
  yield takeLatest(Types.GET_NODE_VERSIONS_REQUEST, getNodeVersionsRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetNodeVersionsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
