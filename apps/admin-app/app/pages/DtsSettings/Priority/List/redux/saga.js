import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getDtsPrioritySettingList as getDtsPrioritySettingListApi } from '@shared/api/dts';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getDtsPrioritySettingListRequest({ limit, offset }) {
  try {
    const { dtsRulePriorities: data, totalCount: total } = yield call(getDtsPrioritySettingListApi, { limit, offset });
    yield put(Creators.getDtsPrioritySettingListSuccess({ data, total }));
  }
  catch (error) {
    yield put(Creators.getDtsPrioritySettingListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* dtsPrioritySettingListRequest() {
  yield takeLatest(Types.GET_DTS_PRIORITY_SETTING_LIST_REQUEST, getDtsPrioritySettingListRequest);
}

export default function* dtsPrioritySettingListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(dtsPrioritySettingListRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
