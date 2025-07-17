import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { getSummary } from '@shared/api/technology/compliance';

export function* getSummaryRequest() {
  try {
    const data = yield call(getSummary);
    yield put(Creators.getSummarySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSummaryFailure({ error }));
  }
}

function* watchGetSummaryRequest() {
  yield takeLatest(Types.GET_SUMMARY_REQUEST, getSummaryRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetSummaryRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
