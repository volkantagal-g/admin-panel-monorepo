import { all, cancel, call, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getDtsRuleFeedbackSources as getDtsRuleFeedbackSourcesApi } from '@shared/api/dts';

import { Types, Creators } from './actions';

function* getFeedbackSourceRequest() {
  try {
    const { dtsFeedbackSources: data } = yield call(getDtsRuleFeedbackSourcesApi, { isActive: true });

    yield put(Creators.getFeedbackSourceSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFeedbackSourceFailure({ error }));
  }
}

function* watchFeedbackSourceRequest() {
  yield takeLatest(Types.GET_FEEDBACK_SOURCE_REQUEST, getFeedbackSourceRequest);
}

export default function* getFeedbackSourceRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchFeedbackSourceRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
