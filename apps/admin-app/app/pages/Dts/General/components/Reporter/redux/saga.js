import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { getEmployeesFilter } from '@shared/api/employee';

function* getReportersRequest() {
  try {
    const { employees: data } = yield call(getEmployeesFilter, { });
    yield put(Creators.getReportersSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getReportersFailure({ error }));
  }
}

function* watchReportersRequest() {
  yield takeLatest(Types.GET_REPORTERS_REQUEST, getReportersRequest);
}

export default function* getReportersRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchReportersRequest),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
