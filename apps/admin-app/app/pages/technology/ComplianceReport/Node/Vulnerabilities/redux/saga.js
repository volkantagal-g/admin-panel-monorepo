import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { getRepositories } from '@shared/api/technology/compliance';

export function* getRepositoriesRequest() {
  try {
    const data = yield call(getRepositories);
    yield put(Creators.getRepositoriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRepositoriesFailure({ error }));
  }
}

function* watchGetRepositoriesRequest() {
  yield takeLatest(Types.GET_REPOSITORIES_REQUEST, getRepositoriesRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetRepositoriesRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
