import moment from 'moment';
import { all, call, cancel, fork, put, take, takeLatest, delay, select } from 'redux-saga/effects';

import {
  getOfficeAttendanceTrackingSingleDayRecords as getOfficeAttendanceTrackingSingleDayRecordsApi,
  getOfficeAttendanceTrackingMultipleDayRecords as getOfficeAttendanceTrackingMultipleDayRecordsApi,
  getFilteredOfficeAttendanceTrackingDailyStats as getFilteredOfficeAttendanceTrackingDailyStatsApi,
  getOfficeAttendanceTrackingGetStatisticDailyStatsSummary as getOfficeAttendanceTrackingGetStatisticDailyStatsSummaryAPI,
  getTrackingEnabledOffices as getTrackingEnabledOfficesApi,
} from '@shared/api/employee';

import { Types, Creators } from './actions';
import { filterSingleDayDailyStats, getDayDiff, getEmployeeStatsCSVColumns, getFormattedEmployeeStats } from '../utils';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { exportExcel, getLimitAndOffset } from '@shared/utils/common';
import { filtersSelector } from './selectors';

const AUTO_REFRESH_INTERVAL = 60000; // 1 minute

function* getFilters() {
  const isSingleDay = yield select(filtersSelector.getIsSingleDay);
  const isToday = yield select(filtersSelector.getIsToday);
  const commonFilters = yield select(filtersSelector.getCommonFilters);
  const tableFilters = yield select(filtersSelector.getTableFilters);
  const pagination = yield select(filtersSelector.getTablePagination);
  const sort = yield select(filtersSelector.getSortOptions);

  return {
    isSingleDay,
    isToday,
    sort,
    ...(getLimitAndOffset(pagination)),
    startDay: commonFilters.startDay,
    endDay: commonFilters.endDay,
    office: commonFilters.office,
    department: commonFilters.department,
    businessUnit: commonFilters.businessUnit,
    topManager: commonFilters?.topManager,
    employee: tableFilters?.employee,
    supervisor: tableFilters?.supervisor,
    inviteStatus: tableFilters?.inviteStatus,
    leaveType: tableFilters?.leaveType,
    status: tableFilters?.status,
  };
}

function* getIsEndDayToday() {
  const { endDay } = yield select(getFilters);
  const today = moment().endOf('day');
  const dayDiff = getDayDiff(endDay, today);
  return dayDiff === 0;
}

function* getOfficeAttendanceTrackingGetStatisticDailyStatsSummary() {
  try {
    const {
      startDay,
      endDay,
      topManager,
      office,
      businessUnit,
      department,
      isToday,
      isSingleDay,
    } = yield call(getFilters);
    // Department selection returns array of department ids from now on, so we need to get the first object.
    // To not break the existing logic in store and getFilters method, we will get the first object
    // and assign it to mainDepartmentId.
    let mainDepartmentId;

    if (department && Array.isArray(department) && department.length > 0) {
      [mainDepartmentId] = department;
    }

    const data = yield call(getOfficeAttendanceTrackingGetStatisticDailyStatsSummaryAPI, {
      startDay,
      endDay,
      topManager,
      office,
      businessUnit,
      department: mainDepartmentId,
    });
    yield put(Creators.getOfficeAttendanceTrackingGetStatisticDailyStatsSummarySuccess({ data }));

    yield delay(AUTO_REFRESH_INTERVAL);
    const isEndDayToday = yield call(getIsEndDayToday);
    if (isEndDayToday && isToday && isSingleDay) {
      yield call(getOfficeAttendanceTrackingGetStatisticDailyStatsSummary);
    }
  }
  catch (error) {
    yield put(Creators.getOfficeAttendanceTrackingGetStatisticDailyStatsSummaryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getOfficeAttendanceTrackingSingleDayRecords() {
  try {
    const {
      startDay,
      endDay,
      topManager,
      office,
      isToday,
      isSingleDay,
    } = yield call(getFilters);

    const { records, lastTransactionDateOfOffice } = yield call(getOfficeAttendanceTrackingSingleDayRecordsApi, {
      startDay,
      endDay,
      topManager,
      office,
    });
    yield put(Creators.getOfficeAttendanceTrackingSingleDayRecordsSuccess({
      data: records,
      lastTransactionDateOfOffice: lastTransactionDateOfOffice || null,
    }));

    yield delay(AUTO_REFRESH_INTERVAL);
    const isEndDayToday = yield call(getIsEndDayToday);
    if (isEndDayToday && isToday && isSingleDay) {
      yield call(getOfficeAttendanceTrackingSingleDayRecords);
    }
  }
  catch (error) {
    yield put(Creators.getOfficeAttendanceTrackingSingleDayRecordsFailure({ error }));
  }
}

function* getOfficeAttendanceTrackingMultipleDayRecords() {
  try {
    const {
      startDay,
      endDay,
      office,
      topManager,
      isToday,
      isSingleDay,
    } = yield call(getFilters);
    const { records, lastTransactionDateOfOffice } = yield call(getOfficeAttendanceTrackingMultipleDayRecordsApi, {
      startDay,
      endDay,
      topManager,
      office,
    });
    yield put(Creators.getOfficeAttendanceTrackingMultipleDayRecordsSuccess({
      data: records,
      lastTransactionDateOfOffice: lastTransactionDateOfOffice || null,
    }));

    yield delay(AUTO_REFRESH_INTERVAL); // Wait for 1 minute
    const isEndDayToday = yield call(getIsEndDayToday);
    if (isEndDayToday && isToday && !isSingleDay) {
      yield call(getOfficeAttendanceTrackingMultipleDayRecords);
    }
  }
  catch (error) {
    yield put(Creators.getOfficeAttendanceTrackingMultipleDayRecordsFailure({ error }));
  }
}

function* fetchAndExportEmployeeStatsToCSV() {
  try {
    const {
      startDay: localStartDay,
      endDay: localEndDay,
      topManager,
      office,
      department,
      businessUnit,
      status,
      leaveType,
      supervisor,
      employee,
      inviteStatus,
      isSingleDay,
    } = yield call(getFilters);
    const { records } = yield call(getFilteredOfficeAttendanceTrackingDailyStatsApi, {
      localStartDay,
      localEndDay,
      topManager,
      office,
      // TODO:Move rest of filter logics to backend side again.
      // department,
      // businessUnit,
      // status,
      // leaveType,
      // supervisor,
      // employee,
      // inviteStatus,
      sortKey: 'day',
      sortDirection: -1,
    });
    const columns = getEmployeeStatsCSVColumns();

    // TODO: For God's Sake remove this after backend filter fix.
    const frontendFilterAppliedDailyStats = filterSingleDayDailyStats({
      records,
      commonClientSideFilters: {
        businessUnit,
        department,
      },
      tableFilters: {
        employee,
        inviteStatus,
        leaveType,
        status,
        supervisor,
      },
      isSingleDay,
    });

    const filteredAndFormattedEmployeeStats = getFormattedEmployeeStats({ dailyStats: frontendFilterAppliedDailyStats?.records });
    const dateFormat = moment().format('YYYY.MM.DD_HH.mm.ss');

    exportExcel(filteredAndFormattedEmployeeStats, `employeeStats_${dateFormat}.csv`, columns);
    yield put(Creators.fetchAndExportEmployeeStatsToCSVSuccess());
  }
  catch (error) {
    yield put(Creators.fetchAndExportEmployeeStatsToCSVFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* getTrackingEnabledOffices() {
  try {
    const { offices } = yield call(getTrackingEnabledOfficesApi);

    yield put(Creators.getTrackingEnabledOfficesSuccess({ data: offices }));
  }
  catch (error) {
    yield put(Creators.getTrackingEnabledOfficesFailure());
  }
}

function* watchGetOfficeAttendanceTrackingGetStatisticDailyStatsSummaryRequest() {
  yield takeLatest(
    Types.GET_OFFICE_ATTENDANCE_TRACKING_GET_STATISTIC_DAILY_STATS_SUMMARY_REQUEST,
    getOfficeAttendanceTrackingGetStatisticDailyStatsSummary,
  );
}

function* watchGetOfficeAttendanceTrackingSingleDayRecordsRequest() {
  yield takeLatest(Types.GET_OFFICE_ATTENDANCE_TRACKING_SINGLE_DAY_RECORDS_REQUEST, getOfficeAttendanceTrackingSingleDayRecords);
}

function* watchGetOfficeAttendanceTrackingMultipleDayRecordsRequest() {
  yield takeLatest(Types.GET_OFFICE_ATTENDANCE_TRACKING_MULTIPLE_DAY_RECORDS_REQUEST, getOfficeAttendanceTrackingMultipleDayRecords);
}

function* watchFetchAndExportEmployeeStatsToCSVRequest() {
  yield takeLatest(Types.FETCH_AND_EXPORT_EMPLOYEE_STATS_TO_CSV_REQUEST, fetchAndExportEmployeeStatsToCSV);
}

function* watchGetTrackingEnabledOffices() {
  yield takeLatest(Types.GET_TRACKING_ENABLED_OFFICES_REQUEST, getTrackingEnabledOffices);
}

export default function* employeeOfficeAttendanceTrackingDashboardPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetOfficeAttendanceTrackingGetStatisticDailyStatsSummaryRequest),
      fork(watchGetOfficeAttendanceTrackingSingleDayRecordsRequest),
      fork(watchGetOfficeAttendanceTrackingMultipleDayRecordsRequest),
      fork(watchFetchAndExportEmployeeStatsToCSVRequest),
      fork(watchGetTrackingEnabledOffices),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
