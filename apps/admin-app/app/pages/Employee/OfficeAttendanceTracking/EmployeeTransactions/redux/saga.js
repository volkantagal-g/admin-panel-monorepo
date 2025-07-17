import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  getOfficeAttendanceTrackingEmployeeTransactionsByDateRange as getOfficeAttendanceTrackingEmployeeTransactionsByDateRangeApi,
  getFilteredOfficeAttendanceTrackingDailyStats as getFilteredOfficeAttendanceTrackingDailyStatsApi,
  getOfficeAttendanceTrackingGetStatisticDailyStatsSummary as getOfficeAttendanceTrackingGetStatisticDailyStatsSummaryApi,
  deleteScheduleAndUpdateInviteStatus,
} from '@shared/api/employee';
import { toFakeLocalDate } from '@shared/utils/dateHelper';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getLangKey } from '@shared/i18n';

import { Types, Creators } from './actions';

function* getOfficeAttendanceTrackingEmployeeSummary({ body }) {
  try {
    const { employeeId, endDate, startDate } = body;

    const summary = yield call(getOfficeAttendanceTrackingGetStatisticDailyStatsSummaryApi, {
      startDay: toFakeLocalDate(startDate).toISOString(),
      endDay: toFakeLocalDate(endDate).toISOString(),
      employeeIds: [employeeId],
    });

    yield put(Creators.getOfficeAttendanceTrackingEmployeeSummarySuccess({ summary }));
  }
  catch (error) {
    yield put(Creators.getOfficeAttendanceTrackingEmployeeSummaryFailure({ error }));
  }
}

function* watchGetOfficeAttendanceTrackingEmployeeSummary() {
  yield takeLatest(
    Types.GET_OFFICE_ATTENDANCE_TRACKING_EMPLOYEE_SUMMARY_REQUEST,
    getOfficeAttendanceTrackingEmployeeSummary,
  );
}

function* getOfficeAttendanceTrackingEmployeeDailyStats({ body }) {
  try {
    const { employeeId, endDate, startDate, status, limit, offset, sort } = body;

    const { records, total } = yield call(getFilteredOfficeAttendanceTrackingDailyStatsApi, {
      localStartDay: toFakeLocalDate(startDate).toISOString(),
      localEndDay: toFakeLocalDate(endDate).toISOString(),
      employee: employeeId,
      status,
      ...(sort.sortDirection && {
        sortKey: sort.sortKey,
        sortDirection: sort.sortDirection,
      }),
      limit,
      offset,
    });

    yield put(Creators.getOfficeAttendanceTrackingEmployeeDailyStatsSuccess({ records, total }));
  }
  catch (error) {
    yield put(Creators.getOfficeAttendanceTrackingEmployeeDailyStatsFailure({ error }));
  }
}

function* watchGetOfficeAttendanceTrackingEmployeeDailyStats() {
  yield takeLatest(
    Types.GET_OFFICE_ATTENDANCE_TRACKING_EMPLOYEE_DAILY_STATS_REQUEST,
    getOfficeAttendanceTrackingEmployeeDailyStats,
  );
}

function* getOfficeAttendanceTrackingEmployeeTransactions({ body }) {
  try {
    const { employeeId, endDate, startDate } = body;

    const { transactions, employee } = yield call(getOfficeAttendanceTrackingEmployeeTransactionsByDateRangeApi, {
      employeeId,
      endDate: toFakeLocalDate(endDate).toISOString(),
      startDate: toFakeLocalDate(startDate).toISOString(),
      limit: 10000,
      offset: 0,
    });

    yield put(Creators.getOfficeAttendanceTrackingEmployeeTransactionsSuccess({ transactions, employee }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.getOfficeAttendanceTrackingEmployeeTransactionsFailure({ error }));
  }
}

function* watchGetOfficeAttendanceTrackingEmployeeTransactions() {
  yield takeLatest(
    Types.GET_OFFICE_ATTENDANCE_TRACKING_EMPLOYEE_TRANSACTIONS_REQUEST,
    getOfficeAttendanceTrackingEmployeeTransactions,
  );
}

function* deleteScheduleAndUpdateInviteStatusRequest({ body, onSuccess }) {
  const lang = getLangKey();
  try {
    const { employeeEmail, day } = body;
    const { updatedEmployeeStatsData, message, success } = yield call(deleteScheduleAndUpdateInviteStatus, {
      employeeEmail,
      day,
    });

    yield put(Creators.deleteScheduleAndUpdateInviteStatusSuccess({ updatedEmployeeStatsData, message, success }));
    if (!success) {
      yield put(ToastCreators.error({ message: message?.[lang] }));
    }
    else if (onSuccess) {
      onSuccess();
      yield put(ToastCreators.success({ message: message?.[lang] }));
    }
  }
  catch (error) {
    yield put(Creators.deleteScheduleAndUpdateInviteStatusFailure({ error }));
  }
}

function* watchDeleteScheduleAndUpdateInviteStatusRequest() {
  yield takeLatest(
    Types.DELETE_SCHEDULE_AND_UPDATE_INVITE_STATUS_REQUEST,
    deleteScheduleAndUpdateInviteStatusRequest,
  );
}

export default function* employeeAttendanceAttendancePageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetOfficeAttendanceTrackingEmployeeSummary),
      fork(watchGetOfficeAttendanceTrackingEmployeeDailyStats),
      fork(watchDeleteScheduleAndUpdateInviteStatusRequest),
      fork(watchGetOfficeAttendanceTrackingEmployeeTransactions),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
