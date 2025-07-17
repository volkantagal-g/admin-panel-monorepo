import { all, cancel, call, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getDtsRuleList as getDtsRuleListApi } from '@shared/api/dts';

import { Types, Creators } from './actions';

function* getRuleRequest() {
  try {
    const { records: data } = yield call(getDtsRuleListApi, { isActive: true });

    yield put(Creators.getRuleSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRuleFailure({ error }));
  }
}

function* watchRuleRequest() {
  yield takeLatest(Types.GET_RULE_REQUEST, getRuleRequest);
}

export default function* getRuleRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchRuleRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
