import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.WORKFORCE_REPORTS}_`;

export const { Types, Creators } = createActions({
  getShiftPlanReportRequest: { startDate: undefined, endDate: undefined, employeeType: undefined, warehouseIds: undefined },
  getShiftPlanReportSuccess: null,
  getShiftPlanReportFailure: { error: null },
  getSlotPerformanceReportRequest: { startDate: undefined, endDate: undefined, warehouseIds: undefined },
  getSlotPerformanceReportSuccess: null,
  getSlotPerformanceReportFailure: { error: null },
  getSlotChangeLogReportRequest: { startDate: undefined, endDate: undefined, warehouseIds: undefined },
  getSlotChangeLogReportSuccess: null,
  getSlotChangeLogReportFailure: { error: null },
  getSlotSelectionReportRequest: { startDate: undefined, endDate: undefined, warehouseIds: undefined },
  getSlotSelectionReportSuccess: null,
  getSlotSelectionReportFailure: { error: null },
  getLeaveManagementReportRequest: {
    franchiseIds: undefined,
    utcOffset: undefined,
    startDatetime: undefined,
    endDatetime: undefined,
  },
  getLeaveManagementReportSuccess: {},
  getLeaveManagementReportFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
