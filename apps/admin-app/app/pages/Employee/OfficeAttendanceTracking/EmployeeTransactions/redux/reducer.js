import { createReducer } from 'reduxsauce';
import moment from 'moment';

import { SORT_OPTIONS } from '@shared/shared/constants';

import { Types } from './actions';
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from '../constants';

export const INITIAL_STATE = {
  employeeAttendance: {
    employee: {
      fullName: '',
      departmentName: '',
      businessUnitName: '',
      supervisor: { fullName: '' },
      locationName: '',
      personalGsm: '',
    },
    dailyStats: {
      data: [],
      isPending: false,
    },
    summary: {
      data: {},
      isPending: false,
    },
    transactions: {
      data: [],
      isPending: false,
    },
    deleteSchedule: {
      data: {},
      isPending: false,
      message: '',
      success: false,
    },
  },
  summary: {},
  filters: {
    startDate: moment().subtract(1, 'month').startOf('isoWeek'),
    endDate: moment().endOf('day'),
    status: null,
    sort: { sortKey: 'day', sortDirection: SORT_OPTIONS.DIRECTIONS.NUMBER.DESC },
  },
  pagination: { currentPage: DEFAULT_PAGE, rowsPerPage: DEFAULT_ROWS_PER_PAGE },
};

const getOfficeAttendanceTrackingEmployeeSummaryRequest = state => ({
  ...state,
  employeeAttendance: {
    ...state.employeeAttendance,
    summary: {
      ...state.employeeAttendance.summary,
      isPending: true,
    },
  },
});

const getOfficeAttendanceTrackingEmployeeSummarySuccess = (state, { summary }) => ({
  ...state,
  employeeAttendance: {
    ...state.employeeAttendance,
    summary: {
      ...state.employeeAttendance.summary,
      isPending: false,
      data: summary,
    },
  },
});

const getOfficeAttendanceTrackingEmployeeSummaryFailure = state => ({
  ...state,
  employeeAttendance: {
    ...state.employeeAttendance,
    summary: {
      ...state.employeeAttendance.summary,
      isPending: false,
    },
  },
});

const getOfficeAttendanceTrackingEmployeeDailyStatsRequest = state => ({
  ...state,
  employeeAttendance: {
    ...state.employeeAttendance,
    dailyStats: {
      ...state.employeeAttendance.dailyStats,
      isPending: true,
    },
  },
});

const getOfficeAttendanceTrackingEmployeeDailyStatsSuccess = (state, { records, total }) => ({
  ...state,
  employeeAttendance: {
    ...state.employeeAttendance,
    dailyStats: {
      ...state.employeeAttendance.dailyStats,
      isPending: false,
      data: records,
      total,
    },
  },
});

const getOfficeAttendanceTrackingEmployeeDailyStatsFailure = state => ({
  ...state,
  employeeAttendance: {
    ...state.employeeAttendance,
    dailyStats: {
      ...state.employeeAttendance.dailyStats,
      isPending: false,
    },
  },
});

const getOfficeAttendanceTrackingEmployeeTransactionsRequest = state => ({
  ...state,
  employeeAttendance: {
    ...state.employeeAttendance,
    transactions: {
      ...state.employeeAttendance.transactions,
      isPending: true,
    },
  },
});

const getOfficeAttendanceTrackingEmployeeTransactionsSuccess = (state, { transactions, employee }) => ({
  ...state,
  employeeAttendance: {
    ...state.employeeAttendance,
    transactions: {
      ...state.employeeAttendance.transactions,
      isPending: false,
      data: transactions,
    },
    employee: {
      ...state.employeeAttendance.employee,
      ...employee,
    },
  },
});

const getOfficeAttendanceTrackingEmployeeTransactionsFailure = state => ({
  ...state,
  employeeAttendance: INITIAL_STATE.employeeAttendance,
});

const deleteScheduleAndUpdateInviteStatusRequest = state => ({
  ...state,
  employeeAttendance: {
    ...state.employeeAttendance,
    deleteSchedule: {
      ...state.employeeAttendance.deleteSchedule,
      isPending: true,
    },
  },
});

const deleteScheduleAndUpdateInviteStatusSuccess = (state, { updatedEmployeeStatsData, message, success }) => ({
  ...state,
  employeeAttendance: {
    ...state.employeeAttendance,
    deleteSchedule: {
      ...state.employeeAttendance.deleteSchedule,
      isPending: false,
      message,
      success,
      data: updatedEmployeeStatsData,
    },
  },
});

const deleteScheduleAndUpdateInviteStatusFailure = state => ({
  ...state,
  employeeAttendance: {
    ...state.employeeAttendance,
    deleteSchedule: {
      ...state.employeeAttendance.deleteSchedule,
      isPending: false,
    },
  },
});

const setDateRangeFilter = (state, { startDate, endDate }) => ({
  ...state,
  filters: {
    ...state.filters,
    startDate,
    endDate,
  },
});

const setStatusFilter = (state, { status }) => ({
  ...state,
  filters: {
    ...state.filters,
    status,
  },
});

const setPagination = (state, { currentPage, rowsPerPage }) => ({
  ...state,
  pagination: {
    ...state.pagination,
    currentPage,
    rowsPerPage,
  },
});

const setSorter = (state, { sort }) => ({
  ...state,
  filters: {
    ...state.filters,
    sort,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_EMPLOYEE_SUMMARY_REQUEST]: getOfficeAttendanceTrackingEmployeeSummaryRequest,
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_EMPLOYEE_SUMMARY_SUCCESS]: getOfficeAttendanceTrackingEmployeeSummarySuccess,
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_EMPLOYEE_SUMMARY_FAILURE]: getOfficeAttendanceTrackingEmployeeSummaryFailure,

  [Types.GET_OFFICE_ATTENDANCE_TRACKING_EMPLOYEE_DAILY_STATS_REQUEST]: getOfficeAttendanceTrackingEmployeeDailyStatsRequest,
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_EMPLOYEE_DAILY_STATS_SUCCESS]: getOfficeAttendanceTrackingEmployeeDailyStatsSuccess,
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_EMPLOYEE_DAILY_STATS_FAILURE]: getOfficeAttendanceTrackingEmployeeDailyStatsFailure,

  [Types.GET_OFFICE_ATTENDANCE_TRACKING_EMPLOYEE_TRANSACTIONS_REQUEST]: getOfficeAttendanceTrackingEmployeeTransactionsRequest,
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_EMPLOYEE_TRANSACTIONS_SUCCESS]: getOfficeAttendanceTrackingEmployeeTransactionsSuccess,
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_EMPLOYEE_TRANSACTIONS_FAILURE]: getOfficeAttendanceTrackingEmployeeTransactionsFailure,

  [Types.DELETE_SCHEDULE_AND_UPDATE_INVITE_STATUS_REQUEST]: deleteScheduleAndUpdateInviteStatusRequest,
  [Types.DELETE_SCHEDULE_AND_UPDATE_INVITE_STATUS_SUCCESS]: deleteScheduleAndUpdateInviteStatusSuccess,
  [Types.DELETE_SCHEDULE_AND_UPDATE_INVITE_STATUS_FAILURE]: deleteScheduleAndUpdateInviteStatusFailure,

  [Types.SET_DATE_RANGE_FILTER]: setDateRangeFilter,
  [Types.SET_STATUS_FILTER]: setStatusFilter,
  [Types.SET_SORTER]: setSorter,
  [Types.SET_PAGINATION]: setPagination,

  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
