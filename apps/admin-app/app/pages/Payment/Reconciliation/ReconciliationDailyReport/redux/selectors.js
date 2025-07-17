import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.RECONCILIATION_DAILY_REPORT.LIST;

export const dailyReportSelector = {
  getIsPending: state => state[reduxKey].dailyReport.isPending,
  getData: state => state[reduxKey].dailyReport.data,
  getTotalCount: state => state[reduxKey].dailyReport.totalCount,
};
