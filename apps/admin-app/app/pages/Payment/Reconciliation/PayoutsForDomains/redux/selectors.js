import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.PAYOUTS_FOR_DOMAINS;

export const payoutReportsSelector = {
  getIsPending: state => state[reduxKey]?.payoutReports?.isPending,
  getData: state => state[reduxKey]?.payoutReports?.data,
};

export const domainTabSelector = { getDomain: state => state[reduxKey]?.domainTab?.domain };

export const filterSelector = {
  getFilter: state => state[reduxKey]?.payoutsFilters?.filters,
  getIsPending: state => state[reduxKey].payoutsFilters?.isPending,
};
