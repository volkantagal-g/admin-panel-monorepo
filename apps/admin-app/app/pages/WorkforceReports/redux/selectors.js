import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.WORKFORCE_REPORTS;

export const shiftPlanReportSelector = { getIsPending: state => state[reduxKey]?.shiftPlanReport.isPending };
export const slotPerformanceReportSelector = { getIsPending: state => state[reduxKey]?.slotPerformanceReport.isPending };
export const slotChangeLogReportSelector = { getIsPending: state => state[reduxKey]?.slotChangeLogReport.isPending };
export const slotSelectionReportSelector = { getIsPending: state => state[reduxKey]?.slotSelectionReport.isPending };
export const leaveManagementReportSelector = { getIsPending: state => state[reduxKey]?.leaveManagementReport.isPending };
