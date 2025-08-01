import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getDailyReport as getDailyReportApi } from '@shared/api/reconciliation';

import { Types, Creators } from './actions';

function* getDailyReport({
  page,
  pageSize,
  domainTypes,
  sourceOfStatements,
  reportCheckStartDate,
  reportCheckEndDate,
  reportRequestStartDate,
  reportRequestEndDate,
}) {
  try {
    const { data } = yield call(getDailyReportApi, {
      page,
      pageSize,
      domainTypes,
      sourceOfStatements,
      reportCheckStartDate,
      reportCheckEndDate,
      reportRequestStartDate,
      reportRequestEndDate,
    });
    const { data: resData, totalCount } = data;
    yield put(Creators.getDailyReportSuccess({ data: resData, totalCount }));
  }
  catch (error) {
    yield put(Creators.getDailyReportFailure({ error }));
  }
}

function* watchGetDailyReportRequest() {
  yield takeLatest(Types.GET_DAILY_REPORT_REQUEST, getDailyReport);
}

export default function* dailyReportPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetDailyReportRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
