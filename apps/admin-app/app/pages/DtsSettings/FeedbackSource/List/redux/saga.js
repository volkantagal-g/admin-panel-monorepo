import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getDtsRuleFeedbackSources } from '@shared/api/dts';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getDtsFeedbackSettingListRequest({ limit, offset }) {
  try {
    const { dtsFeedbackSources: data, totalCount: total } = yield call(getDtsRuleFeedbackSources, { limit, offset });
    yield put(Creators.getDtsFeedbackSettingListSuccess({ data, total }));
  }
  catch (error) {
    yield put(Creators.getDtsFeedbackSettingListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* dtsFeedbackSettingListRequest() {
  yield takeLatest(Types.GET_DTS_FEEDBACK_SETTING_LIST_REQUEST, getDtsFeedbackSettingListRequest);
}

export default function* dtsFeedbackSettingListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(dtsFeedbackSettingListRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
