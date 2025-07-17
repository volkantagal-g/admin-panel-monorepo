import axios from '@shared/axios/common';

export const getShiftPlanReport = ({ startDate, endDate, employeeType, warehouseIds }) => axios({
  url: '/employeeShiftManagement/shift-plan/report',
  method: 'POST',
  data: { startDate, endDate, employeeType, warehouseIds },
}).then(response => response.data);

export const getSlotPerformanceReport = ({ startDate, endDate, warehouseIds }) => axios({
  url: '/employeeShiftManagement/slot-reports/slot-compliance/excel',
  method: 'POST',
  data: { startDate, endDate, warehouseIds },
}).then(response => response.data);

export const getSlotChangeLogReport = ({ startDate, endDate, warehouseIds }) => axios({
  url: '/employeeShiftManagement/slot-reports/slot-action/excel',
  method: 'POST',
  data: { startDate, endDate, warehouseIds },
}).then(response => response.data);

export const getSlotSelectionReport = ({ startDate, endDate, warehouseIds }) => axios({
  url: '/employeeShiftManagement/slot-reports/slot-selection/excel',
  method: 'POST',
  data: { startDate, endDate, warehouseIds },
}).then(response => response.data);
