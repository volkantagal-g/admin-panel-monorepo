import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  getShiftPlanReport as getShiftPlanReportApi,
  getSlotPerformanceReport as getSlotPerformanceReportApi,
  getSlotChangeLogReport as getSlotChangeLogReportApi,
  getSlotSelectionReport as getSlotSelectionReportApi,
} from '@shared/api/workforceReports';
import { getLeaveExcel as getLeaveManagementReportApi } from '@shared/api/leaveManagement';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { t } from '@shared/i18n';

export function* getShiftPlanReport({ startDate, endDate, employeeType, warehouseIds }) {
  try {
    const { url } = yield call(getShiftPlanReportApi, { startDate, endDate, employeeType, warehouseIds });
    if (url) {
      window.open(url);
    }
    else {
      toast.error(t('workforceReports:NO_REPORT'));
    }
    yield put(Creators.getShiftPlanReportSuccess());
  }
  catch (error) {
    yield put(Creators.getShiftPlanReportFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getSlotPerformanceReport({ startDate, endDate, warehouseIds }) {
  try {
    const { url } = yield call(getSlotPerformanceReportApi, { startDate, endDate, warehouseIds });
    if (url) {
      window.open(url);
    }
    else {
      toast.error(t('workforceReports:NO_REPORT'));
    }
    yield put(Creators.getSlotPerformanceReportSuccess());
  }
  catch (error) {
    yield put(Creators.getSlotPerformanceReportFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getSlotChangeLogReport({ startDate, endDate, warehouseIds }) {
  try {
    const { url } = yield call(getSlotChangeLogReportApi, { startDate, endDate, warehouseIds });
    if (url) {
      window.open(url);
    }
    else {
      toast.error(t('workforceReports:NO_REPORT'));
    }
    yield put(Creators.getSlotChangeLogReportSuccess());
  }
  catch (error) {
    yield put(Creators.getSlotChangeLogReportFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getSlotSelectionReport({ startDate, endDate, warehouseIds }) {
  try {
    const { url } = yield call(getSlotSelectionReportApi, { startDate, endDate, warehouseIds });
    if (url) {
      window.open(url);
    }
    else {
      toast.error(t('workforceReports:NO_REPORT'));
    }
    yield put(Creators.getSlotSelectionReportSuccess());
  }
  catch (error) {
    yield put(Creators.getSlotSelectionReportFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getLeaveManagementReport({ franchiseIds, utcOffset, startDatetime, endDatetime }) {
  try {
    const { url } = yield call(getLeaveManagementReportApi, { franchiseIds, utcOffset, startDatetime, endDatetime });
    if (url) {
      window.open(url);
    }
    else {
      toast.error(t('workforceReports:NO_REPORT'));
    }
    yield put(Creators.getLeaveManagementReportSuccess());
  }
  catch (error) {
    yield put(Creators.getLeaveManagementReportFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetShiftPlanReportRequest() {
  yield takeLatest(Types.GET_SHIFT_PLAN_REPORT_REQUEST, getShiftPlanReport);
}

function* watchGetSlotPerformanceReportRequest() {
  yield takeLatest(Types.GET_SLOT_PERFORMANCE_REPORT_REQUEST, getSlotPerformanceReport);
}

function* watchGetSlotChangeLogReportRequest() {
  yield takeLatest(Types.GET_SLOT_CHANGE_LOG_REPORT_REQUEST, getSlotChangeLogReport);
}

function* watchGetSlotSelectionReportRequest() {
  yield takeLatest(Types.GET_SLOT_SELECTION_REPORT_REQUEST, getSlotSelectionReport);
}

function* watchGetLeaveManagementReportRequest() {
  yield takeLatest(Types.GET_LEAVE_MANAGEMENT_REPORT_REQUEST, getLeaveManagementReport);
}

export default function* workforceReportsPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetShiftPlanReportRequest),
      fork(watchGetSlotPerformanceReportRequest),
      fork(watchGetSlotChangeLogReportRequest),
      fork(watchGetSlotSelectionReportRequest),
      fork(watchGetLeaveManagementReportRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
