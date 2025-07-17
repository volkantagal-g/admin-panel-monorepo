import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.EMPLOYEE.OFFICE_ATTENDANCE_TRACKING.DASHBOARD}_`;

export const { Types, Creators } = createActions({
  setFilters: { filters: null },
  getOfficeAttendanceTrackingGetStatisticDailyStatsSummaryRequest: { filters: null },
  getOfficeAttendanceTrackingGetStatisticDailyStatsSummarySuccess: { data: null },
  getOfficeAttendanceTrackingGetStatisticDailyStatsSummaryFailure: { error: null },
  getOfficeAttendanceTrackingSingleDayStatsRequest: { filters: null },
  getOfficeAttendanceTrackingSingleDayStatsSuccess: { data: null },
  getOfficeAttendanceTrackingSingleDayStatsFailure: { error: null },
  getOfficeAttendanceTrackingMultipleDayStatsRequest: { filters: null },
  getOfficeAttendanceTrackingMultipleDayStatsSuccess: { data: null },
  getOfficeAttendanceTrackingMultipleDayStatsFailure: { error: null },
  getOfficeAttendanceTrackingSingleDayRecordsRequest: { filters: null },
  getOfficeAttendanceTrackingSingleDayRecordsSuccess: { data: null, lastTransactionDateOfOffice: null },
  getOfficeAttendanceTrackingSingleDayRecordsFailure: { error: null },
  getOfficeAttendanceTrackingMultipleDayRecordsRequest: { filters: null },
  getOfficeAttendanceTrackingMultipleDayRecordsSuccess: { data: null, lastTransactionDateOfOffice: null },
  getOfficeAttendanceTrackingMultipleDayRecordsFailure: { error: null },
  getTrackingEnabledOfficesRequest: {},
  getTrackingEnabledOfficesSuccess: { data: null },
  getTrackingEnabledOfficesFailure: { error: null },
  fetchAndExportEmployeeStatsToCSVRequest: {},
  fetchAndExportEmployeeStatsToCSVSuccess: {},
  fetchAndExportEmployeeStatsToCSVFailure: {},

  initPage: null,
  destroyPage: null,
}, { prefix });
