import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getRoles as getRolesAPI } from '@shared/api/role';
import { Types, Creators } from './actions';

function* getRoles({ searchVal }) {
  try {
    const requestBody = {
      queryText: searchVal,
      offset: 0,
    };
    const roles = yield call(getRolesAPI, requestBody);
    yield put(Creators.getRolesSuccess({ data: roles }));
  }
  catch (error) {
    yield put(Creators.getRolesFailure({ error }));
  }
}

function* watchRolesRequest() {
  yield takeLatest(Types.GET_ROLES_REQUEST, getRoles);
}

export default function* getRolesRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchRolesRequest),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
