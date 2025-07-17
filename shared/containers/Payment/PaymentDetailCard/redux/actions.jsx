import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';
import { TRANSACTIONS_INIT_FILTERS } from '../constants';

const prefix = `${REDUX_KEY.PAYMENT_EVENT.DETAIL_CARD}_`;

export const { Types, Creators } = createActions({
  getTransactionDetailCardRequest: { id: null },
  getTransactionDetailCardSuccess: { data: [] },
  getTransactionDetailCardFailure: { error: null },
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
  setPagination: { currentPage: TRANSACTIONS_INIT_FILTERS.currentPage, rowsPerPage: TRANSACTIONS_INIT_FILTERS.rowsPerPage },
  submitFilters: { filters: TRANSACTIONS_INIT_FILTERS },
  setSortOptions: { sortOptions: TRANSACTIONS_INIT_FILTERS.sort },
  initPage: null,
  destroyPage: null,
}, { prefix });
