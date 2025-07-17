import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getMyReportTypes, getMyReportsBetweenDateRange } from '@shared/api/report';

import { Types, Creators } from './actions';

function* getMyReportTypesRequest({ data }) {
  try {
    const reportTypes = yield call(getMyReportTypes, data);
    yield put(Creators.getMyReportTypesSuccess({ data: reportTypes }));
  }
  catch (error) {
    yield put(Creators.getMyReportTypesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMyReportTypesRequest() {
  yield takeLatest(Types.GET_MY_REPORT_TYPES_REQUEST, getMyReportTypesRequest);
}

function* getMyReportsRequest({ data }) {
  try {
    const { reports, nextPageToken, prevPageToken } = yield call(getMyReportsBetweenDateRange, data);
    yield put(Creators.getMyReportsSuccess({ data: reports, prevPageToken, nextPageToken }));
  }
  catch (error) {
    yield put(Creators.getMyReportsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMyReportsRequest() {
  yield takeLatest(Types.GET_MY_REPORTS_REQUEST, getMyReportsRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchGetMyReportTypesRequest), fork(watchGetMyReportsRequest)]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
