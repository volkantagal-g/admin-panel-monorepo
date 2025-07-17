import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getNotificationTags } from '@shared/api/pushNotification';

function* getNotificationTagsRequest({ userLangKey }) {
  try {
    const { data } = yield call(getNotificationTags, { userLangKey });
    yield put(Creators.getNotificationTagsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getNotificationTagsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetNotificationTagsRequest() {
  yield takeLatest(Types.GET_NOTIFICATION_TAGS_REQUEST, getNotificationTagsRequest);
}

export default function* root() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchGetNotificationTagsRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
