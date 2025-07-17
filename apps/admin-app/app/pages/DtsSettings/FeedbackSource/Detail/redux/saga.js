import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { getDtsRuleFeedbackSourceSettingDetail, updateDtsRuleFeedbackSourceSetting } from '@shared/api/dts';

function* getDtsFeedbackSettingDetailRequest({ id }) {
  try {
    const { dtsFeedbackSource: data } = yield call(getDtsRuleFeedbackSourceSettingDetail, { id });
    yield put(Creators.getDtsFeedbackSettingDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getDtsFeedbackSettingDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateDtsFeedbackSettingDetailRequest({ data }) {
  try {
    yield call(updateDtsRuleFeedbackSourceSetting, { data });
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.updateDtsFeedbackSettingDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetDtsFeedbackSettingDetailRequest() {
  yield takeLatest(Types.GET_DTS_FEEDBACK_SETTING_DETAIL_REQUEST, getDtsFeedbackSettingDetailRequest);
}

function* watchUpdateDtsFeedbackSettingDetailRequest() {
  yield takeLatest(Types.UPDATE_DTS_FEEDBACK_SETTING_DETAIL_REQUEST, updateDtsFeedbackSettingDetailRequest);
}

export default function* dtsFeedbackSettingDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetDtsFeedbackSettingDetailRequest),
      fork(watchUpdateDtsFeedbackSettingDetailRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
