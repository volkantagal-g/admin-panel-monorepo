import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from '../constants';

const prefix = `${REDUX_KEY.EMPLOYEE.OFFICE_ATTENDANCE_TRACKING.EMPLOYEE_TRANSACTIONS}_`;

export const { Types, Creators } = createActions({
  getOfficeAttendanceTrackingEmployeeSummaryRequest: { body: null },
  getOfficeAttendanceTrackingEmployeeSummarySuccess: { summary: {} },
  getOfficeAttendanceTrackingEmployeeSummaryFailure: {},

  getOfficeAttendanceTrackingEmployeeDailyStatsRequest: { body: null },
  getOfficeAttendanceTrackingEmployeeDailyStatsSuccess: { records: [], total: 0 },
  getOfficeAttendanceTrackingEmployeeDailyStatsFailure: {},

  getOfficeAttendanceTrackingEmployeeTransactionsRequest: { body: null },
  getOfficeAttendanceTrackingEmployeeTransactionsSuccess: { employee: {}, transactions: [] },
  getOfficeAttendanceTrackingEmployeeTransactionsFailure: {},

  deleteScheduleAndUpdateInviteStatusRequest: { body: null, onSuccess: null },
  deleteScheduleAndUpdateInviteStatusSuccess: { deleteSchedule: {}, message: '', success: false },
  deleteScheduleAndUpdateInviteStatusFailure: {},

  setDateRangeFilter: { startDate: null, endDate: null },
  setStatusFilter: { status: null },
  setSorter: { sort: null },
  setPagination: { currentPage: DEFAULT_PAGE, rowsPerPage: DEFAULT_ROWS_PER_PAGE },

  initPage: null,
  destroyPage: null,
}, { prefix });
