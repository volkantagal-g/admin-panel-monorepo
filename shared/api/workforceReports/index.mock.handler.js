import { mockReportResponse } from './index.mock.data';

const getMockShiftPlanReport = {
  url: '/employeeShiftManagement/shift-plan/report',
  successData: mockReportResponse,
};

const getMockSlotPerformanceReport = {
  url: '/employeeShiftManagement/slot-reports/slot-compliance/excel',
  successData: mockReportResponse,
};

const getMockSlotChangeLogReport = {
  url: '/employeeShiftManagement/slot-reports/slot-selection/excel',
  successData: mockReportResponse,
};

export default [getMockShiftPlanReport, getMockSlotPerformanceReport, getMockSlotChangeLogReport];
