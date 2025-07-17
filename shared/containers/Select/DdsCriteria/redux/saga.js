import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { filterDdsCriteria } from '@shared/api/franchiseStatistics';
import { Types, Creators } from './actions';

function* ddsCriteriaRequest() {
  try {
    const data = yield call(filterDdsCriteria);
    yield put(Creators.getDdsCriteriaSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getDdsCriteriaFailure({ error }));
  }
}

function* watchDdsCriteriaRequest() {
  yield takeLatest(Types.GET_DDS_CRITERIA_REQUEST, ddsCriteriaRequest);
}

export default function* getDdsCriteriaRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchDdsCriteriaRequest),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
