import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { getDTSRuleDetail, updateDTSRule } from '@shared/api/dts';

function* getDtsRuleDetailRequest({ id }) {
  try {
    const { dtsRule: data } = yield call(getDTSRuleDetail, { id });
    yield put(Creators.getDtsRuleDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getDtsRuleDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateDtsRuleDetailRequest({ data }) {
  try {
    yield call(updateDTSRule, { data });
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.updateDtsRuleDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetDtsRuleDetailRequest() {
  yield takeLatest(Types.GET_DTS_RULE_DETAIL_REQUEST, getDtsRuleDetailRequest);
}

function* watchUpdateDtsRuleDetailRequest() {
  yield takeLatest(Types.UPDATE_DTS_RULE_DETAIL_REQUEST, updateDtsRuleDetailRequest);
}

export default function* dtsRuleDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetDtsRuleDetailRequest),
      fork(watchUpdateDtsRuleDetailRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
