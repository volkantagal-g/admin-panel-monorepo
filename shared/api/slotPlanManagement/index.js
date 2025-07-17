import axios from '@shared/axios/common';

export const deleteSlotPlans = ({ minDate, maxDate, employeeType, warehouseIds }) => axios({
  url: '/employeeShiftManagement/slots/bulk-delete',
  method: 'POST',
  data: { minDate, maxDate, employeeType, warehouseIds },
}).then(response => response.data);
