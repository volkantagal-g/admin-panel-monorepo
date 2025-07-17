import { REDUX_KEY } from '@shared/shared/constants';
import { State } from './reducer';

const reduxKey = REDUX_KEY.BANK_RECONCILIATION_SUMMARY;

export const bankReconciliationSummarySelector = {
  getIsPending: (state: { [reduxKey: string]: State }) => state[reduxKey]?.bankReconciliationSummary.isPending,
  getData: (state: { [reduxKey: string]: State }) => state[reduxKey]?.bankReconciliationSummary.data,
  getCurrency: (state: { [reduxKey: string]: State }) => state[reduxKey]?.bankReconciliationSummary.data?.currency,
};
