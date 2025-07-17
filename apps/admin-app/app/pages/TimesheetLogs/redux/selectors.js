import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.TIMESHEET_LOGS;

export const timesheetLogsSelector = {
  getIsPending: state => state?.[reduxKey]?.logs?.isPending,
  getData: state => state?.[reduxKey]?.logs?.data?.records,
  getTotalCount: state => state?.[reduxKey]?.logs?.data?.totalCount,
};

export const personListSelector = {
  getIsPending: state => state?.[reduxKey]?.personList?.isPending,
  getData: state => state?.[reduxKey]?.personList?.data,
};

export const warehouseSelector = {
  getIsPending: state => state?.[reduxKey]?.warehouses?.isPending,
  getData: state => state?.[reduxKey]?.warehouses?.data,
};

export const leaveTypesSelector = {
  getIsPending: state => state[reduxKey]?.leaveTypes.isPending,
  getData: state => state[reduxKey]?.leaveTypes.data,
};
