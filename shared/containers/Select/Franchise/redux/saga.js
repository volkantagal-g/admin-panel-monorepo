import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getMarketFranchises } from '@shared/api/marketFranchise';
import { Types, Creators } from './actions';

function* franchisesRequest({ isActivated, cities }) {
  try {
    const { franchises } = yield call(getMarketFranchises, { isActivated, cities });
    yield put(Creators.getFranchisesSuccess({ data: franchises }));
  }
  catch (error) {
    yield put(Creators.getFranchisesFailure({ error }));
  }
}

function* watchFranchisesRequest() {
  yield takeLatest(Types.GET_FRANCHISES_REQUEST, franchisesRequest);
}

export default function* getFranchisesRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchFranchisesRequest),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
