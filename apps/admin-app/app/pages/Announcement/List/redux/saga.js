import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';

import { filtersSelector } from '@app/pages/Announcement/List/redux/selectors';
import { Types, Creators } from '@app/pages/Announcement/List/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { duplicate, getResults, cancelAnnouncement } from '@shared/api/announcement';
import history from '@shared/utils/history';
import { convertFilterPayload } from '@app/pages/Announcement/List/utils';

export function* getResultsRequest() {
  try {
    const filters = yield select(filtersSelector.getFilters);
    const convertedFilters = convertFilterPayload(filters);
    const results = yield call(getResults, convertedFilters);
    yield put(Creators.getResultsSuccess(results));
  }
  catch (error) {
    yield put(Creators.getResultsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* cancelRequest({ id }) {
  try {
    yield call(cancelAnnouncement, id);
    yield put(ToastCreators.success());
    yield call(getResultsRequest);
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* duplicateRequest({ id }) {
  try {
    const result = yield call(duplicate, id);
    yield put(ToastCreators.success());
    history.push(`/announcement/detail/${result.data}`);
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchResultsRequest() {
  yield takeLatest(Types.SET_TABLE_FILTERS, getResultsRequest);
}

function* watchDuplicateRequest() {
  yield takeLatest(Types.DUPLICATE_REQUEST, duplicateRequest);
}

function* watchCancelRequest() {
  yield takeLatest(Types.CANCEL_REQUEST, cancelRequest);
}

export default function* announcementListSagaRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchResultsRequest),
      fork(watchDuplicateRequest),
      fork(watchCancelRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
