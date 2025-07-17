import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';
import { INIT_FILTERS } from '../constants';

const prefix = `${REDUX_KEY.PAYOUTS_TRANSACTIONS_FOR_DOMAINS}_`;

export const { Types, Creators } = createActions({

  getPayoutDetailedReportsRequest: {},
  getPayoutDetailedReportsSuccess: { data: [] },
  getPayoutDetailedReportsFailure: { error: null },

  exportCsvRequest: { t: null },
  exportCsvSuccess: { data: [] },
  exportCsvFailure: { error: null },

  handleDomainTab: { domain: 'food' },
  submitFilters: { filters: INIT_FILTERS },

  setPagination: { pageNumber: INIT_FILTERS.pageNumber, pageSize: INIT_FILTERS.pageSize },

  initPage: null,
  destroyPage: null,
}, { prefix });
