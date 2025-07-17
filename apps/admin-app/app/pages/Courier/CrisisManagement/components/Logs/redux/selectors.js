import reduxKey from './key';

export const courierCrisesLogsSelector = {
  getData: state => state[reduxKey]?.courierCrisesLogs.data,
  getCount: state => state[reduxKey]?.courierCrisesLogs.count,
  getFilters: state => state[reduxKey]?.courierCrisesLogs.filters,
  getIsPending: state => state[reduxKey]?.courierCrisesLogs.isPending,
  getPagination: state => state[reduxKey]?.courierCrisesLogs.pagination,
  isLogPending: state => state[reduxKey]?.courierCrisesLogsExport.isPending,
};
