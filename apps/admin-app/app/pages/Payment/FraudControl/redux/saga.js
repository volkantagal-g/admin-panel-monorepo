import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import {
  getAllRules as getAllRulesApi,
  createRule as createRuleApi,
  updateRule as updateRuleApi,
  getRuleDetail as getRuleDetailApi,
} from '@shared/api/payment';
import { INIT_RULE_MODAL_DATA } from '../components/constants';

function* getAllRules({ enable }) {
  try {
    const data = yield call(getAllRulesApi, { enable });
    yield put(Creators.getAllRulesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAllRulesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetAllRulesRequest() {
  yield takeLatest(Types.GET_ALL_RULES_REQUEST, getAllRules);
}

function* getRuleDetail({ id }) {
  try {
    const data = yield call(getRuleDetailApi, { id });
    yield put(Creators.getRuleDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRuleDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetRuleDetailRequest() {
  yield takeLatest(Types.GET_RULE_DETAIL_REQUEST, getRuleDetail);
}

function* createRule({
  name,
  eventKeyField,
  eventType,
  ruleOperator,
  ruleValue,
  ruleValueType,
  score,
  enable,
  force3dEvent,
  blockEvent,
  whiteEvent,
  useRequestEventKeyFieldValue,
}) {
  try {
    const data = yield call(createRuleApi, {
      name,
      eventKeyField,
      eventType,
      ruleOperator,
      ruleValue,
      ruleValueType,
      score,
      enable,
      force3dEvent,
      blockEvent,
      whiteEvent,
      useRequestEventKeyFieldValue,
    });
    yield put(Creators.createRuleSuccess({ data }));
    yield put(Creators.setRuleModalData(INIT_RULE_MODAL_DATA));
    yield put(Creators.getAllRulesRequest());
  }
  catch (error) {
    yield put(Creators.createRuleFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateRuleRequest() {
  yield takeLatest(Types.CREATE_RULE_REQUEST, createRule);
}

function* updateRule({
  id,
  name,
  eventKeyField,
  eventType,
  ruleOperator,
  ruleValue,
  ruleValueType,
  score,
  enable,
  force3dEvent,
  blockEvent,
  whiteEvent,
  useRequestEventKeyFieldValue,
}) {
  try {
    const { data } = yield call(updateRuleApi, {
      id,
      name,
      eventKeyField,
      eventType,
      ruleOperator,
      ruleValue,
      ruleValueType,
      score,
      enable,
      force3dEvent,
      blockEvent,
      whiteEvent,
      useRequestEventKeyFieldValue,
    });
    yield put(Creators.updateRuleSuccess(data));
    yield put(Creators.setRuleModalData(INIT_RULE_MODAL_DATA));
    yield put(Creators.getAllRulesRequest());
  }
  catch (error) {
    yield put(Creators.updateRuleFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateRuleRequest() {
  yield takeLatest(Types.UPDATE_RULE_REQUEST, updateRule);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetAllRulesRequest),
      fork(watchGetRuleDetailRequest),
      fork(watchCreateRuleRequest),
      fork(watchUpdateRuleRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
