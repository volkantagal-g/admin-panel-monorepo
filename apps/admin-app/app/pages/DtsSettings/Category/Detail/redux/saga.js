import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { getDtsCategorySettingDetail, updateDtsCategorySetting } from '@shared/api/dts';

function* getDtsCategorySettingDetailRequest({ id }) {
  try {
    const { dtsRuleCategory: data } = yield call(getDtsCategorySettingDetail, { id });
    yield put(Creators.getDtsCategorySettingDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getDtsCategorySettingDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateDtsCategorySettingDetailRequest({ data }) {
  try {
    yield call(updateDtsCategorySetting, { data });
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.updateDtsCategorySettingDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetDtsCategorySettingDetailRequest() {
  yield takeLatest(Types.GET_DTS_CATEGORY_SETTING_DETAIL_REQUEST, getDtsCategorySettingDetailRequest);
}

function* watchUpdateDtsCategorySettingDetailRequest() {
  yield takeLatest(Types.UPDATE_DTS_CATEGORY_SETTING_DETAIL_REQUEST, updateDtsCategorySettingDetailRequest);
}

export default function* dtsCategorySettingDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetDtsCategorySettingDetailRequest),
      fork(watchUpdateDtsCategorySettingDetailRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
