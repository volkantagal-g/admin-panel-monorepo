import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getAnnouncements } from '@shared/api/water';
import { Types, Creators } from './actions';

function* getAnnouncementsRequest({ data }) {
  try {
    const formData = yield call(getAnnouncements, {
      startDate: data.startDate,
      endDate: data.endDate,
      searchText: data.searchTextTitle,
    });

    let filteredData = formData.payload;
    if (data.status) {
      filteredData = formData.payload.filter(item => item.status === data.status);
    }

    yield put(Creators.getAnnouncementsSuccess({ data: filteredData }));
  }
  catch (error) {
    yield put(Creators.getAnnouncementsFailure({ error }));
  }
}

function* watchGetAnnouncementsRequest() {
  yield takeLatest(Types.GET_ANNOUNCEMENTS_REQUEST, getAnnouncementsRequest);
}

export default function* announcementsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchGetAnnouncementsRequest)]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
