import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getDtsRuleList as getDtsRuleListApi } from '@shared/api/dts';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getDtsRuleListRequest({ limit, offset }) {
  try {
    const { records: data, totalCount: total } = yield call(getDtsRuleListApi, { limit, offset });
    yield put(Creators.getDtsRuleListSuccess({ data, total }));
  }
  catch (error) {
    yield put(Creators.getDtsRuleListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* dtsRuleListRequest() {
  yield takeLatest(Types.GET_DTS_RULE_LIST_REQUEST, getDtsRuleListRequest);
}

export default function* dtsRuleListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(dtsRuleListRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
