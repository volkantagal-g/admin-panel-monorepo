import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.PAYOUTS_TRANSACTIONS_FOR_DOMAINS;

export const payoutDetailedReportsSelector = {
  getIsPending: state => state[reduxKey]?.payoutDetailedReports?.isPending,
  getData: state => state[reduxKey]?.payoutDetailedReports?.data?.data?.getPayoutDetailedReports,
  getTotalCount: state => state[reduxKey]?.payoutDetailedReports?.data?.data?.totalCount,
};

export const domainTabSelector = { getDomain: state => state[reduxKey]?.domainTab?.domain };

export const filterSelector = { getFilter: state => state[reduxKey]?.filters };

export const paginationSelector = { getPagination: state => state[reduxKey]?.pagination };

export const exportCsvSelector = {
  getIsPending: state => state[reduxKey]?.exportCsv?.isPending,
  getData: state => state[reduxKey]?.exportCsv?.data?.data?.getPayoutDetailedReports,
};
