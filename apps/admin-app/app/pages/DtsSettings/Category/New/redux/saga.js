import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import history from '@shared/utils/history';
import { Types, Creators } from './actions';
import { createDtsCategorySetting } from '@shared/api/dts';

function* createDtsCategorySettingRequest({ title, description, isActive }) {
  try {
    yield call(createDtsCategorySetting, { title, description, isActive });

    yield put(Creators.createDtsCategorySettingSuccess());
    yield put(ToastCreators.success());
    history.push('/dts/setting/category/list');
  }
  catch (error) {
    yield put(Creators.createDtsCategorySettingFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateDtsCategorySettingRequest() {
  yield takeLatest(Types.CREATE_DTS_CATEGORY_SETTING_REQUEST, createDtsCategorySettingRequest);
}

export default function* createDtsCategorySettingRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateDtsCategorySettingRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
