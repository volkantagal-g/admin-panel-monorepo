import { all, call, cancel, cancelled, fork, put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { getTopicsForSelectComponent } from '@shared/api/mentorship';
import { Creators, Types } from './actions';

function* getTopics({
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
      name,
      fields,
      limit,
      offset,
    };

    const { topics } = yield call(getTopicsForSelectComponent, requestBody);
    yield put(Creators.getTopicsSuccess({ data: topics }));
  }
  catch (error) {
    yield put(Creators.getTopicsFailure({ error }));
  }
  finally {
    if (yield cancelled()) {
      yield call(cancelSource.cancel);
    }
  }
}

function* watchTopicsRequest() {
  yield takeLatest(Types.GET_TOPICS_REQUEST, getTopics);
}

export default function* getTopicsRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([fork(watchTopicsRequest)]);

    yield take(Types.DESTROY_CONTAINER);

    yield cancel(backgroundTasks);
  }
}
