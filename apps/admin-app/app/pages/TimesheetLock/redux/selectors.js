import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.TIMESHEET_LOCK;

export const timesheetsSelector = {
  getIsPending: state => state?.[reduxKey]?.timesheets?.isPending,
  getIsActionSuccess: state => state?.[reduxKey]?.timesheetAction?.isSuccess,
  getData: state => state?.[reduxKey]?.timesheets?.data || [],
};
