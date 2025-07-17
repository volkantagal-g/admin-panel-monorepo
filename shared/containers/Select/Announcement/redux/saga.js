import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { getAnnouncementsByText } from '@shared/api/promo';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getAnnouncementsByTextRequest({ searchString }) {
  try {
    const data = yield call(getAnnouncementsByText, searchString);
    yield put(Creators.getAnnouncementsByTextSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAnnouncementsByTextFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetAnnouncementsByTextRequest() {
  yield takeLatest(Types.GET_ANNOUNCEMENTS_BY_TEXT_REQUEST, getAnnouncementsByTextRequest);
}

export default function* pushNotificationRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetAnnouncementsByTextRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
