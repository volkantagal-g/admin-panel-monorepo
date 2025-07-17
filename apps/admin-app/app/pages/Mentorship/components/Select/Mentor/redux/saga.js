import { all, call, cancel, cancelled, fork, put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { getMentorsForSelectComponent } from '@shared/api/mentorship';
import { Creators, Types } from './actions';

function* getMentorsRequest({
  filters: {
    name,
    fields,
    limit,
    offset,
  },
}) {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const requestBody = {
      cancelSource,
      fields,
      name,
      limit,
      offset,
    };

    const { users } = yield call(getMentorsForSelectComponent, requestBody);
    yield put(Creators.getMentorsSuccess({ data: users }));
  }
  catch (error) {
    yield put(Creators.getMentorsFailure({ error }));
  }
  finally {
    if (yield cancelled()) {
      yield call(cancelSource.cancel);
    }
  }
}

function* watchMentorsRequest() {
  yield takeLatest(Types.GET_MENTORS_REQUEST, getMentorsRequest);
}

export default function* getMentorsRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([fork(watchMentorsRequest)]);

    yield take(Types.DESTROY_CONTAINER);

    yield cancel(backgroundTasks);
  }
}
