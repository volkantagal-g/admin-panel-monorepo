import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.EMPLOYEE.OFFICE_ATTENDANCE_TRACKING.EMPLOYEE_TRANSACTIONS;

export const officeAttendanceTrackingEmployeeAttendanceSelector = {
  getTransactions: state => state[reduxKey]?.employeeAttendance?.transactions?.data,
  getTransactionsIsPending: state => state[reduxKey]?.employeeAttendance?.transactions?.isPending,
  getDailyStatsData: state => state[reduxKey]?.employeeAttendance?.dailyStats?.data,
  getDailyStatsTotal: state => state[reduxKey]?.employeeAttendance?.dailyStats?.total,
  getDailyStatsIsPending: state => state[reduxKey]?.employeeAttendance?.dailyStats?.isPending,
  getSummary: state => state[reduxKey]?.employeeAttendance?.summary?.data,
  getSummaryIsPending: state => state[reduxKey]?.employeeAttendance?.summary?.isPending,
  getEmployee: state => state[reduxKey]?.employeeAttendance?.employee,
  getFilters: state => state[reduxKey]?.filters,
  getPagination: state => state[reduxKey]?.pagination,
  getDeleteSchedule: state => state[reduxKey]?.employeeAttendance?.deleteSchedule,
  getDeleteScheduleIsPending: state => state[reduxKey]?.employeeAttendance?.deleteSchedule?.isPending,
};
