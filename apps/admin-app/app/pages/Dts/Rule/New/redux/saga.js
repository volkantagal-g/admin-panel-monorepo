import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import history from '@shared/utils/history';
import { Types, Creators } from './actions';
import { createDtsRule } from '@shared/api/dts';

function* createDtsRuleRequest({ ruleNumber, title, category, priority, description, closeAs, closeMessage, isActive, defaultNote }) {
  try {
    yield call(createDtsRule, { ruleNumber, title, category, priority, description, closeAs, closeMessage, isActive, defaultNote });

    yield put(Creators.createDtsRuleSuccess());
    yield put(ToastCreators.success());
    history.push('/dts/rule/list');
  }
  catch (error) {
    yield put(Creators.createDtsRuleFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateDtsRuleRequest() {
  yield takeLatest(Types.CREATE_DTS_RULE_REQUEST, createDtsRuleRequest);
}

export default function* createDtsRuleRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateDtsRuleRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
