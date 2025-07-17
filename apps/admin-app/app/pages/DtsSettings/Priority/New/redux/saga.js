import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import history from '@shared/utils/history';
import { Types, Creators } from './actions';
import { createDtsPrioritySetting as createDtsPrioritySettingApi } from '@shared/api/dts';

function* createDtsPrioritySettingRequest({ title, description, rejectionPoint, warningPoint, isActive }) {
  try {
    yield call(createDtsPrioritySettingApi, { title, description, rejectionPoint, warningPoint, isActive });

    yield put(ToastCreators.success());
    history.push('/dts/setting/priority/list');
  }
  catch (error) {
    yield put(Creators.createDtsPrioritySettingFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateDtsPrioritySettingRequest() {
  yield takeLatest(Types.CREATE_DTS_PRIORITY_SETTING_REQUEST, createDtsPrioritySettingRequest);
}

export default function* createDtsPrioritySettingRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateDtsPrioritySettingRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
