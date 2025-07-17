import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getMarketFranchiseCrisisTopics } from '@shared/api/marketFranchise';
import { Types, Creators } from './actions';
import { getCrisisTopicsFromLocalStorage, setCrisisTopicListToLocalStorage } from '@shared/containers/Select/CrisisTopic/redux/localStorage';

function* crisisTopicsRequest() {
  try {
    let crisesTopics = getCrisisTopicsFromLocalStorage();
    if (!crisesTopics) {
      crisesTopics = yield call(getMarketFranchiseCrisisTopics);
      setCrisisTopicListToLocalStorage(crisesTopics);
    }
    yield put(Creators.getCrisisTopicsSuccess({ data: crisesTopics }));
  }
  catch (error) {
    yield put(Creators.getCrisisTopicsFailure({ error }));
  }
}

function* watchCrisisTopicsRequest() {
  yield takeLatest(Types.GET_CRISIS_TOPICS_REQUEST, crisisTopicsRequest);
}

export default function* getCrisisTopicsRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchCrisisTopicsRequest),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
