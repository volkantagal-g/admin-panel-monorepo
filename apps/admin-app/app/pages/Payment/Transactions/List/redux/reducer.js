import { createReducer } from 'reduxsauce';

import { INIT_FILTERS } from '../constants';

import { Types } from './actions';

const INITIAL_STATE = {
  transactionList: {
    data: [],
    isPending: false,
    totalCount: 0,
    error: null,
  },
  filters: { INIT_FILTERS },
  pagination: {
    currentPage: INIT_FILTERS.currentPage,
    rowsPerPage: INIT_FILTERS.rowsPerPage,
  },
  sortOptions: INIT_FILTERS.sort,
  merchantList: {
    data: [],
    isPending: false,
  },

};

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
export const getMerchantListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    merchantList: {
      ...state.merchantList,
      isPending: true,
    },
  };
};

export const getMerchantListSuccess = (state = INITIAL_STATE, { data = [] }) => {
  return {
    ...state,
    merchantList: {
      ...state.merchantList,
      data,
      isPending: false,
    },
  };
};

export const getMerchantListFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    merchantList: {
      ...state.merchantList,
      isPending: false,
    },
  };
};

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_TRANSACTIONS_REQUEST]: getTransactionsRequest,
  [Types.GET_TRANSACTIONS_SUCCESS]: getTransactionsSuccess,
  [Types.GET_TRANSACTIONS_FAILURE]: getTransactionsFailure,

  [Types.GET_MERCHANT_LIST_REQUEST]: getMerchantListRequest,
  [Types.GET_MERCHANT_LIST_SUCCESS]: getMerchantListSuccess,
  [Types.GET_MERCHANT_LIST_FAILURE]: getMerchantListFailure,

  [Types.SET_PAGINATION]: setPagination,
  [Types.SUBMIT_FILTERS]: submitFilters,
  [Types.SET_SORT_OPTIONS]: setSortOptions,

  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
