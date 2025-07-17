import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import history from '@shared/utils/history';
import { Types, Creators } from './actions';
import { createDtsRuleFeedbackSourceSetting } from '@shared/api/dts';

function* createDtsFeedbackSettingRequest({ title, description, isActive }) {
  try {
    yield call(createDtsRuleFeedbackSourceSetting, { title, description, isActive });

    yield put(Creators.createDtsFeedbackSettingSuccess());
    yield put(ToastCreators.success());
    history.push('/dts/setting/feedbacksource/list');
  }
  catch (error) {
    yield put(Creators.createDtsFeedbackSettingFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateDtsFeedbackSettingRequest() {
  yield takeLatest(Types.CREATE_DTS_FEEDBACK_SETTING_REQUEST, createDtsFeedbackSettingRequest);
}

export default function* createDtsFeedbackSettingRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateDtsFeedbackSettingRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
