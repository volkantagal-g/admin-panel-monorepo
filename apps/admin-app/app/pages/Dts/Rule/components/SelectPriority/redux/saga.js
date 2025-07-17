import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getDtsPrioritySettingList } from '@shared/api/dts';

import { Types, Creators } from './actions';

function* getPriorityRequest() {
  try {
    const { dtsRulePriorities } = yield call(getDtsPrioritySettingList, { isActive: true });

    yield put(Creators.getPrioritySuccess({ data: dtsRulePriorities }));
  }
  catch (error) {
    yield put(Creators.getPriorityFailure({ error }));
  }
}

function* watchPriorityRequest() {
  yield takeLatest(Types.GET_PRIORITY_REQUEST, getPriorityRequest);
}

export default function* getPriorityRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchPriorityRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
