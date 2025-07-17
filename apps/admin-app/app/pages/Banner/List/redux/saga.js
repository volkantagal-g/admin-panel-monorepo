import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';

import { filtersSelector } from '@app/pages/Banner/List/redux/selectors';
import { Types, Creators } from '@app/pages/Banner/List/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { duplicate, getResults, cancelBanner } from '@shared/api/banner';
import history from '@shared/utils/history';
import { convertFilterPayload } from '@app/pages/Banner/List/utils';

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
    yield call(cancelBanner, id);
    yield put(ToastCreators.success());
    yield call(getResultsRequest);
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* duplicateRequest({ id }) {
  try {
    const { data } = yield call(duplicate, id);
    yield put(ToastCreators.success());
    history.push(`/banner/detail/${data.id}`);
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

export default function* bannerListSagaRoot() {
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
