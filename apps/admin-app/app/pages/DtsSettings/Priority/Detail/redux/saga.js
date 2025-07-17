import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import {
  getDtsPrioritySettingDetail as getDtsPrioritySettingDetailApi,
  updateDtsPrioritySetting as updateDtsPrioritySettingApi,
} from '@shared/api/dts';

function* getDtsPrioritySettingDetailRequest({ id }) {
  try {
    const { dtsRulePriority: data } = yield call(getDtsPrioritySettingDetailApi, { id });
    yield put(Creators.getDtsPrioritySettingDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getDtsPrioritySettingDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateDtsPrioritySettingDetailRequest({ data }) {
  try {
    yield call(updateDtsPrioritySettingApi, { data });
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.updateDtsPrioritySettingDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetDtsPrioritySettingDetailRequest() {
  yield takeLatest(Types.GET_DTS_PRIORITY_SETTING_DETAIL_REQUEST, getDtsPrioritySettingDetailRequest);
}

function* watchUpdateDtsPrioritySettingDetailRequest() {
  yield takeLatest(Types.UPDATE_DTS_PRIORITY_SETTING_DETAIL_REQUEST, updateDtsPrioritySettingDetailRequest);
}

export default function* dtsPrioritySettingDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetDtsPrioritySettingDetailRequest),
      fork(watchUpdateDtsPrioritySettingDetailRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
