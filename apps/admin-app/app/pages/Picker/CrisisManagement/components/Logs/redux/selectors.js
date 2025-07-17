import reduxKey from './key';

export const pickerCrisesLogsSelector = {
  getData: state => state[reduxKey]?.pickerCrisesLogs.data,
  getCount: state => state[reduxKey]?.pickerCrisesLogs.count,
  getFilters: state => state[reduxKey]?.pickerCrisesLogs.filters,
  getIsPending: state => state[reduxKey]?.pickerCrisesLogs.isPending,
  getPagination: state => state[reduxKey]?.pickerCrisesLogs.pagination,
  isLogPending: state => state[reduxKey]?.pickerCrisesLogsExport.isPending,
};
