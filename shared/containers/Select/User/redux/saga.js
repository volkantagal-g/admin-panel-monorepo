import { all, call, cancel, fork, put, take, takeLatest, cancelled } from 'redux-saga/effects';
import axios from 'axios';

import { getFilteredUsersWithRestrictedData } from '@shared/api/user';
import { Types, Creators } from './actions';

function* getUsers({ searchVal }) {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const requestBody = {
      searchVal,
      cancelSource,
      limit: 10,
      offset: 0,
    };
    const { users } = yield call(getFilteredUsersWithRestrictedData, requestBody);
    yield put(Creators.getUsersSuccess({ data: users }));
  }
  catch (error) {
    yield put(Creators.getUsersFailure({ error }));
  }
  finally {
    if (yield cancelled()) {
      yield call(cancelSource.cancel);
    }
  }
}

function* watchUsersRequest() {
  yield takeLatest(Types.GET_USERS_REQUEST, getUsers);
}

export default function* getUsersRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchUsersRequest),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
