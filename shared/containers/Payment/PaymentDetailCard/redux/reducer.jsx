import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { TRANSACTIONS_INIT_FILTERS } from '../constants';

export const INITIAL_STATE = {
  transactionDetailCard: {
    isPending: false,
    data: [],
  },
  transactionList: {
    data: [],
    isPending: false,
    totalCount: 0,
    error: null,
  },
  filters: { TRANSACTIONS_INIT_FILTERS },
  pagination: {
    currentPage: TRANSACTIONS_INIT_FILTERS.currentPage,
    rowsPerPage: TRANSACTIONS_INIT_FILTERS.rowsPerPage,
  },
  sortOptions: TRANSACTIONS_INIT_FILTERS.sort,
};

const transactionDetailCardRequest = (state = INITIAL_STATE) => ({
  ...state,
  transactionDetailCard: {
    ...state.transactionDetailCard,
    isPending: true,
    data: [],
  },
});

const transactionDetailCardSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  transactionDetailCard: {
    ...state.transactionDetailCard,
    isPending: false,
    data,
  },
});

const transactionDetailCardFailure = (state = INITIAL_STATE) => ({
  ...state,
  transactionDetailCard: {
    ...state.transactionDetailCard,
    isPending: false,
  },
});

const getTransactionsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    transactionList: {
      ...state.transactionList,
      isPending: true,
    },
  };
};

const getTransactionsSuccess = (state = INITIAL_STATE, { data = [], totalCount = 0 }) => {
  return {
    ...state,
    transactionList: {
      ...state.transactionList,
      data,
      isPending: false,
      totalCount,
    },
  };
};

const getTransactionsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    transactionList: {
      ...state.transactionList,
      isPending: false,
      error,
    },
  };
};

const setPagination = (state = INITIAL_STATE, { currentPage, rowsPerPage }) => {
  return {
    ...state,
    pagination: {
      currentPage,
      rowsPerPage,
    },
  };
};

const submitFilters = (state = INITIAL_STATE, { filters }) => {
  return {
    ...state,
    filters,
  };
};

const setSortOptions = (state = INITIAL_STATE, { sortOptions }) => {
  return {
    ...state,
    sortOptions,
  };
};

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_TRANSACTION_DETAIL_CARD_REQUEST]: transactionDetailCardRequest,
  [Types.GET_TRANSACTION_DETAIL_CARD_SUCCESS]: transactionDetailCardSuccess,
  [Types.GET_TRANSACTION_DETAIL_CARD_FAILURE]: transactionDetailCardFailure,
  [Types.GET_TRANSACTIONS_REQUEST]: getTransactionsRequest,
  [Types.GET_TRANSACTIONS_SUCCESS]: getTransactionsSuccess,
  [Types.GET_TRANSACTIONS_FAILURE]: getTransactionsFailure,

  [Types.SET_PAGINATION]: setPagination,
  [Types.SUBMIT_FILTERS]: submitFilters,
  [Types.SET_SORT_OPTIONS]: setSortOptions,

  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
