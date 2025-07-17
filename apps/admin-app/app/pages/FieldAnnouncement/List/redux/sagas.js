import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import {
  deleteAnnouncement as deleteAnnouncementApi,
  getAnnouncementList as getAnnouncementListApi,
} from '@shared/api/fieldAnnouncement';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* announcementListRequest({
  announcementType,
  description,
  active,
  title,
  limit,
  offset,
}) {
  try {
    const announcementList = yield call(getAnnouncementListApi, {
      announcementType,
      description: description || undefined,
      title: title || undefined,
      active,
      limit,
      offset,
    });

    yield put(Creators.getAnnouncementListSuccess(announcementList));
  }
  catch (error) {
    yield put(Creators.getAnnouncementListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* deleteAnnouncementRequest(data) {
  try {
    yield call(deleteAnnouncementApi, data);
    yield put(Creators.deleteAnnouncementSuccess({}));

    yield put(ToastCreators.success({}));
    yield put(Creators.deleteAnnouncementReset({}));
  }
  catch (error) {
    yield put(Creators.deleteAnnouncementFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchAnnouncementRequest() {
  yield takeLatest(
    Types.DELETE_ANNOUNCEMENT_REQUEST,
    deleteAnnouncementRequest,
  );
}

function* watchAnnouncementListRequest() {
  yield takeLatest(
    Types.GET_ANNOUNCEMENT_LIST_REQUEST,
    announcementListRequest,
  );
}

export default function* announcementListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchAnnouncementListRequest),
      fork(watchAnnouncementRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
