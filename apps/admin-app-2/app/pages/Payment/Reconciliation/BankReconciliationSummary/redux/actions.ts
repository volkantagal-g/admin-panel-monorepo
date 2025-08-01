import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.BANK_RECONCILIATION_SUMMARY}_`;

export const { Types, Creators } = createActions(
  {
    getBankReconciliationSummaryRequest: {
      date: null,
      sourceOfStatement: null,
      domainType: null,
    },
    getBankReconciliationSummarySuccess: { data: null },
    getBankReconciliationSummaryFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
