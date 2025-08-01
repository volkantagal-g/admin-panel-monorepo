import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';
import { INIT_FILTERS } from '../constants';

const prefix = `${REDUX_KEY.TRANSACTIONS.LIST}_`;

export const { Types, Creators } = createActions({
  getTransactionsRequest: {
    startCreatedAt: null,
    endCreatedAt: null,
    transactionId: null,
    currentPage: null,
    rowsPerPage: null,
    merchantReference: null,
    sort: null,
  },
  getTransactionsSuccess: { data: [] },
  getTransactionsFailure: { error: null },
  setPagination: { currentPage: INIT_FILTERS.currentPage, rowsPerPage: INIT_FILTERS.rowsPerPage },
  submitFilters: { filters: INIT_FILTERS },
  setSortOptions: { sortOptions: INIT_FILTERS.sort },

  getMerchantListRequest: { body: null },
  getMerchantListSuccess: { data: [] },
  getMerchantListFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix });
