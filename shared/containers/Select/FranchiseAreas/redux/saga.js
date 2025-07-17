import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getFranchisesAreas } from '@shared/api/marketFranchise';
import { Types, Creators } from './actions';

function* franchisesAreasRequest({ franchiseIds }) {
  try {
    const data = yield call(getFranchisesAreas, { franchiseIds });
    yield put(Creators.getFranchisesAreasSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFranchisesAreasFailure({ error }));
  }
}

function* watchFranchisesAreasRequest() {
  yield takeLatest(Types.GET_FRANCHISES_AREAS_REQUEST, franchisesAreasRequest);
}

export default function* getFranchisesAreasRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchFranchisesAreasRequest),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
