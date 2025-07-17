import { all, call, cancel, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import {
  getSummaries as getSummariesApi, cancelPayout as cancelPayoutApi,
  payout as payoutApi, statusUpdate as statusUpdateApi, calculate as calculateApi, triggerReport as triggerReportApi,
} from '@shared/api/tipPayback';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Types, Creators } from './actions';
import { INIT_FILTERS } from '../constants';

export function* getSummariesRequest({
  startDate,
  finishDate,
  sort,
  pageNo,
  pageSize,
}) {
  try {
    const data = yield call(getSummariesApi, {
      startDate,
      finishDate,
      sort,
      pageNo,
      pageSize,
    });
    yield put(Creators.getSummariesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSummariesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetSummariesRequest() {
  yield takeLatest(Types.GET_SUMMARIES_REQUEST, getSummariesRequest);
}

export function* cancelPayout({ id, filters }) {
  try {
    const data = yield call(cancelPayoutApi, { id });
    const { sort, pageNo, pageSize, startDate, finishDate } = filters;
    const summariesData = yield call(getSummariesApi, {
      startDate,
      finishDate,
      sort,
      pageNo,
      pageSize,
    });

    yield put(Creators.cancelPayoutSuccess({ data, id }));
    yield put(ToastCreators.success({ message: data?.description }));
    yield put(Creators.getSummariesSuccess({ data: summariesData }));
  }
  catch (error) {
    yield put(Creators.cancelPayoutFailure({ id }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCancelPayoutRequest() {
  yield takeEvery(Types.CANCEL_PAYOUT_REQUEST, cancelPayout);
}

export function* payout({ id, filters }) {
  try {
    const { data } = yield call(payoutApi, { id });
    const { sort, pageNo, pageSize, startDate, finishDate } = filters;
    const summariesData = yield call(getSummariesApi, {
      startDate,
      finishDate,
      sort,
      pageNo,
      pageSize,
    });

    yield put(Creators.payoutSuccess({ data, id }));
    yield put(ToastCreators.success({ message: data?.description }));
    yield put(Creators.getSummariesSuccess({ data: summariesData }));
  }
  catch (error) {
    yield put(Creators.payoutFailure({ id }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchPayoutRequest() {
  yield takeEvery(Types.PAYOUT_REQUEST, payout);
}

function* statusUpdate({ id, filters }) {
  try {
    const { data } = yield call(statusUpdateApi, { id });
    const { sort, pageNo, pageSize, startDate, finishDate } = filters;
    const summariesData = yield call(getSummariesApi, {
      startDate,
      finishDate,
      sort,
      pageNo,
      pageSize,
    });

    yield put(Creators.statusUpdateSuccess({ data, id }));
    yield put(ToastCreators.success({ message: data?.description }));
    yield put(Creators.getSummariesSuccess({ data: summariesData }));
  }
  catch (error) {
    yield put(Creators.statusUpdateFailure({ id }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchStatusUpdateRequest() {
  yield takeEvery(Types.STATUS_UPDATE_REQUEST, statusUpdate);
}

function* calculate({ finishDate, startDate }) {
  try {
    const longFormatStartDate = startDate?.valueOf();
    const longFormatFinishDate = finishDate?.valueOf();
    const { data } = yield call(calculateApi, { finishDate: longFormatFinishDate, startDate: longFormatStartDate });
    const { sort, pageNo, pageSize, finishDate: initFinishDate, startDate: initStartDate } = INIT_FILTERS;
    const summariesData = yield call(getSummariesApi, {
      sort,
      pageNo,
      pageSize,
      finishDate: initFinishDate,
      startDate: initStartDate,
    });

    yield put(Creators.calculateSuccess({ data }));
    yield put(ToastCreators.success({ message: data.description }));
    yield put(Creators.getSummariesSuccess({ data: summariesData }));
  }
  catch (error) {
    yield put(Creators.calculateFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCalculateRequest() {
  yield takeLatest(Types.CALCULATE_REQUEST, calculate);
}

function* triggerReport({ id, filters }) {
  try {
    const { data } = yield call(triggerReportApi, { id });
    const { sort, pageNo, pageSize, startDate, finishDate } = filters;
    const summariesData = yield call(getSummariesApi, {
      startDate,
      finishDate,
      sort,
      pageNo,
      pageSize,
    });

    yield put(Creators.triggerReportSuccess({ data, id }));
    yield put(ToastCreators.success({ message: data?.description }));
    yield put(Creators.getSummariesSuccess({ data: summariesData }));
  }
  catch (error) {
    yield put(Creators.triggerReportFailure({ id }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchTriggerReportRequest() {
  yield takeEvery(Types.TRIGGER_REPORT_REQUEST, triggerReport);
}

export default function* payoutSummaryListPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetSummariesRequest),
      fork(watchCancelPayoutRequest),
      fork(watchPayoutRequest),
      fork(watchStatusUpdateRequest),
      fork(watchCalculateRequest),
      fork(watchTriggerReportRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
