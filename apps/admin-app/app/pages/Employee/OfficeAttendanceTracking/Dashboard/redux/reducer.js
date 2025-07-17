import { createReducer } from 'reduxsauce';

import {
  initialValues as initialCommonFilters,
  manipulateValuesBeforeSubmit as manipulateCommonFilterValuesBeforeSubmit,
} from '../components/CommonFilters/formHelper';
import {
  initialValues as initialTableFilters,
  manipulateValuesBeforeSubmit as manipulateTableFilterValuesBeforeSubmit,
} from '../components/TableFilters/formHelper';
import { initialTablePagination } from '../../constants';
import { Types } from './actions';

export const INITIAL_STATE = {
  filters: {
    isSingleDay: true,
    isToday: true,
    commonFilters: manipulateCommonFilterValuesBeforeSubmit(initialCommonFilters),
    tableFilters: manipulateTableFilterValuesBeforeSubmit(initialTableFilters),
    tablePagination: initialTablePagination,
    sort: { sortKey: 'firstCheckInLocal', sortDirection: 1 },
  },
  officeAttendanceTrackingGetStatisticDailyStatsSummary: {
    isPending: false,
    data: {},
  },
  officeAttendanceTrackingSingleDayStats: {
    isPending: false,
    data: [],
  },
  officeAttendanceTrackingMultipleDayStats: {
    isPending: false,
    data: [],
  },
  officeAttendanceTrackingSingleDayRecords: {
    isPending: false,
    data: [],
  },
  officeAttendanceTrackingMultipleDayRecords: {
    isPending: false,
    data: [],
  },
  trackingEnabledOffices: {
    isPending: false,
    data: [],
  },
  fetchAndExportEmployeeStatsToCSV: { isPending: false },
  lastTransactionDateOfOffice: undefined,
  lastDataFetchDate: new Date(),
};

const setFilters = (state, { filters }) => ({
  ...state,
  filters: {
    ...state.filters,
    ...filters,
  },
});

const getOfficeAttendanceTrackingGetStatisticDailyStatsSummaryRequest = state => ({
  ...state,
  officeAttendanceTrackingGetStatisticDailyStatsSummary: {
    ...state.officeAttendanceTrackingGetStatisticDailyStatsSummary,
    isPending: true,
    data: [],
  },
});

const getOfficeAttendanceTrackingGetStatisticDailyStatsSummarySuccess = (state, { data }) => ({
  ...state,
  officeAttendanceTrackingGetStatisticDailyStatsSummary: {
    ...state.officeAttendanceTrackingGetStatisticDailyStatsSummary,
    isPending: false,
    data,
  },
});

const getOfficeAttendanceTrackingGetStatisticDailyStatsSummaryFailure = state => ({
  ...state,
  officeAttendanceTrackingGetStatisticDailyStatsSummary: {
    ...state.officeAttendanceTrackingGetStatisticDailyStatsSummary,
    isPending: false,
  },
});

const officeAttendanceTrackingSingleDayStatsRequest = state => ({
  ...state,
  officeAttendanceTrackingSingleDayStats: {
    ...state.officeAttendanceTrackingSingleDayStats,
    isPending: true,
    data: [],
  },
  officeAttendanceTrackingMultipleDayStats: INITIAL_STATE.officeAttendanceTrackingMultipleDayStats,
});

const officeAttendanceTrackingSingleDayStatsSuccess = (state, { data }) => ({
  ...state,
  officeAttendanceTrackingSingleDayStats: {
    ...state.officeAttendanceTrackingSingleDayStats,
    isPending: false,
    data,
  },
});

const officeAttendanceTrackingSingleDayStatsFailure = state => ({
  ...state,
  officeAttendanceTrackingSingleDayStats: {
    ...state.officeAttendanceTrackingSingleDayStats,
    isPending: false,
  },
});

const officeAttendanceTrackingMultipleDayStatsRequest = state => ({
  ...state,
  officeAttendanceTrackingMultipleDayStats: {
    ...state.officeAttendanceTrackingMultipleDayStats,
    isPending: true,
    data: [],
  },
  officeAttendanceTrackingSingleDayStats: INITIAL_STATE.officeAttendanceTrackingSingleDayStats,
});

const officeAttendanceTrackingMultipleDayStatsSuccess = (state, { data }) => ({
  ...state,
  officeAttendanceTrackingMultipleDayStats: {
    ...state.officeAttendanceTrackingMultipleDayStats,
    isPending: false,
    data,
  },
});

const officeAttendanceTrackingMultipleDayStatsFailure = state => ({
  ...state,
  officeAttendanceTrackingMultipleDayStats: {
    ...state.officeAttendanceTrackingMultipleDayStats,
    isPending: false,
  },
});

const officeAttendanceTrackingSingleDayRecordsRequest = state => ({
  ...state,
  officeAttendanceTrackingSingleDayRecords: {
    ...state.officeAttendanceTrackingSingleDayRecords,
    isPending: true,
    data: [],
  },
  officeAttendanceTrackingMultipleDayRecords: INITIAL_STATE.officeAttendanceTrackingMultipleDayRecords,
});

const officeAttendanceTrackingSingleDayRecordsSuccess = (state, { data, lastTransactionDateOfOffice }) => ({
  ...state,
  lastTransactionDateOfOffice,
  lastDataFetchDate: new Date(),
  officeAttendanceTrackingSingleDayRecords: {
    ...state.officeAttendanceTrackingSingleDayRecords,
    isPending: false,
    data,
  },
});

const officeAttendanceTrackingSingleDayRecordsFailure = state => ({
  ...state,
  officeAttendanceTrackingSingleDayRecords: {
    ...state.officeAttendanceTrackingSingleDayRecords,
    isPending: false,
  },
});

const officeAttendanceTrackingMultipleDayRecordsRequest = state => ({
  ...state,
  officeAttendanceTrackingMultipleDayRecords: {
    ...state.officeAttendanceTrackingMultipleDayRecords,
    isPending: true,
    data: [],
  },
  officeAttendanceTrackingSingleDayRecords: INITIAL_STATE.officeAttendanceTrackingSingleDayRecords,
});

const officeAttendanceTrackingMultipleDayRecordsSuccess = (state, { data, lastTransactionDateOfOffice }) => ({
  ...state,
  lastTransactionDateOfOffice,
  lastDataFetchDate: new Date(),
  officeAttendanceTrackingMultipleDayRecords: {
    ...state.officeAttendanceTrackingMultipleDayRecords,
    isPending: false,
    data,
  },
});

const officeAttendanceTrackingMultipleDayRecordsFailure = state => ({
  ...state,
  officeAttendanceTrackingMultipleDayRecords: {
    ...state.officeAttendanceTrackingMultipleDayRecords,
    isPending: false,
  },
});

const fetchAndExportEmployeeStatsToCSVRequest = state => ({
  ...state,
  fetchAndExportEmployeeStatsToCSV: {
    ...state.fetchAndExportEmployeeStatsToCSV,
    isPending: true,
  },
});

const fetchAndExportEmployeeStatsToCSVSuccess = state => ({
  ...state,
  fetchAndExportEmployeeStatsToCSV: {
    ...state.fetchAndExportEmployeeStatsToCSV,
    isPending: false,
  },
});

const fetchAndExportEmployeeStatsToCSVFailure = state => ({
  ...state,
  fetchAndExportEmployeeStatsToCSV: {
    ...state.fetchAndExportEmployeeStatsToCSV,
    isPending: false,
  },
});

const getTrackingEnabledOfficesRequest = state => ({
  ...state,
  trackingEnabledOffices: {
    ...state.trackingEnabledOffices,
    isPending: true,
  },
});

const getTrackingEnabledOfficesSuccess = (state, { data }) => ({
  ...state,
  trackingEnabledOffices: {
    ...state.trackingEnabledOffices,
    isPending: false,
    data,
  },
});

const getTrackingEnabledOfficesFailure = state => ({
  ...state,
  trackingEnabledOffices: {
    ...state.trackingEnabledOffices,
    isPending: false,
  },
});

const destroyPage = () => ({
  filters: {
    isSingleDay: true,
    isToday: true,
    commonFilters: manipulateCommonFilterValuesBeforeSubmit(initialCommonFilters),
    tableFilters: manipulateTableFilterValuesBeforeSubmit(initialTableFilters),
    tablePagination: initialTablePagination,
  },
  ...INITIAL_STATE,
});

export const HANDLERS = {
  [Types.SET_FILTERS]: setFilters,
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_GET_STATISTIC_DAILY_STATS_SUMMARY_REQUEST]: getOfficeAttendanceTrackingGetStatisticDailyStatsSummaryRequest,
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_GET_STATISTIC_DAILY_STATS_SUMMARY_SUCCESS]: getOfficeAttendanceTrackingGetStatisticDailyStatsSummarySuccess,
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_GET_STATISTIC_DAILY_STATS_SUMMARY_FAILURE]: getOfficeAttendanceTrackingGetStatisticDailyStatsSummaryFailure,
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_SINGLE_DAY_STATS_REQUEST]: officeAttendanceTrackingSingleDayStatsRequest,
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_SINGLE_DAY_STATS_SUCCESS]: officeAttendanceTrackingSingleDayStatsSuccess,
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_SINGLE_DAY_STATS_FAILURE]: officeAttendanceTrackingSingleDayStatsFailure,
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_MULTIPLE_DAY_STATS_REQUEST]: officeAttendanceTrackingMultipleDayStatsRequest,
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_MULTIPLE_DAY_STATS_SUCCESS]: officeAttendanceTrackingMultipleDayStatsSuccess,
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_MULTIPLE_DAY_STATS_FAILURE]: officeAttendanceTrackingMultipleDayStatsFailure,
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_SINGLE_DAY_RECORDS_REQUEST]: officeAttendanceTrackingSingleDayRecordsRequest,
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_SINGLE_DAY_RECORDS_SUCCESS]: officeAttendanceTrackingSingleDayRecordsSuccess,
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_SINGLE_DAY_RECORDS_FAILURE]: officeAttendanceTrackingSingleDayRecordsFailure,
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_MULTIPLE_DAY_RECORDS_REQUEST]: officeAttendanceTrackingMultipleDayRecordsRequest,
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_MULTIPLE_DAY_RECORDS_SUCCESS]: officeAttendanceTrackingMultipleDayRecordsSuccess,
  [Types.GET_OFFICE_ATTENDANCE_TRACKING_MULTIPLE_DAY_RECORDS_FAILURE]: officeAttendanceTrackingMultipleDayRecordsFailure,
  [Types.FETCH_AND_EXPORT_EMPLOYEE_STATS_TO_CSV_REQUEST]: fetchAndExportEmployeeStatsToCSVRequest,
  [Types.FETCH_AND_EXPORT_EMPLOYEE_STATS_TO_CSV_SUCCESS]: fetchAndExportEmployeeStatsToCSVSuccess,
  [Types.FETCH_AND_EXPORT_EMPLOYEE_STATS_TO_CSV_FAILURE]: fetchAndExportEmployeeStatsToCSVFailure,
  [Types.GET_TRACKING_ENABLED_OFFICES_REQUEST]: getTrackingEnabledOfficesRequest,
  [Types.GET_TRACKING_ENABLED_OFFICES_SUCCESS]: getTrackingEnabledOfficesSuccess,
  [Types.GET_TRACKING_ENABLED_OFFICES_FAILURE]: getTrackingEnabledOfficesFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
