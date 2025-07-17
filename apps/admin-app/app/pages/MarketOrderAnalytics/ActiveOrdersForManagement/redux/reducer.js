import { createReducer } from 'reduxsauce';
import moment from 'moment';

import { defaultRowsPerPage, Types } from './actions';
import { defaultValues as defaultFilterValues } from '../components/Filter/formHelper';
import { defaultSortOptions, SEARCH_CLIENT_CACHE_MIN } from '../constant';

const generateCustomInitialState = () => ({
  activeOrdersData: {
    data: {
      orders: [],
      count: 0,
      totalKuzeydenCarboyCount: 0,
    },
    isPending: false,
    error: null,
  },
  activeOrderStatsData: {
    data: {
      promoOrderFinancialStats: [{
        totalOrderCount: 0,
        avgDiscountAmount: 0,
      }],
      financialStats: [{
        avgBasketAmount: 0,
        avgChargedAmount: 0,
        totalOrderCount: 0,
      }],
    },
    isPending: false,
    error: null,
  },
  clientSearchData: {
    data: { clients: [] },
    isPending: false,
    error: null,
    lastDataFetchDate: moment().subtract(SEARCH_CLIENT_CACHE_MIN, 'minutes'),
  },
  submittedFilters: {
    ...defaultFilterValues,
    domainType: null,
  },
  pagination: {
    currentPage: 1,
    rowsPerPage: defaultRowsPerPage,
  },
  sortOptions: defaultSortOptions,
});

export const INITIAL_STATE = generateCustomInitialState();

const getActiveOrdersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    activeOrdersData: {
      ...INITIAL_STATE.activeOrdersData,
      isPending: true,
    },
  };
};

const getActiveOrdersSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    activeOrdersData: {
      ...state.activeOrdersData,
      isPending: false,
      data,
    },
  };
};

const getActiveOrdersFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    activeOrdersData: {
      ...state.activeOrdersData,
      isPending: false,
      error,
    },
  };
};

const getActiveOrderStatsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    activeOrderStatsData: {
      ...INITIAL_STATE.activeOrderStatsData,
      isPending: true,
    },
  };
};

const getActiveOrderStatsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    activeOrderStatsData: {
      ...state.activeOrderStatsData,
      isPending: false,
      data,
    },
  };
};

const getActiveOrderStatsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    activeOrderStatsData: {
      ...state.activeOrderStatsData,
      isPending: false,
      error,
    },
  };
};

const clientSearchRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    clientSearchData: {
      ...state.clientSearchData,
      isPending: true,
    },
  };
};

const clientSearchSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    clientSearchData: {
      ...state.clientSearchData,
      isPending: false,
      lastDataFetchDate: moment(),
      data,
    },
  };
};

const clientSearchFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    clientSearchData: {
      ...state.clientSearchData,
      isPending: false,
      error,
    },
  };
};

const clientSearchCancel = (state = INITIAL_STATE) => {
  return {
    ...state,
    clientSearchData: {
      ...state.clientSearchData,
      isPending: false,
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
    submittedFilters: {
      ...state.submittedFilters,
      ...filters,
    },
  };
};

const setSortOptions = (state = INITIAL_STATE, { sortOptions }) => {
  return {
    ...state,
    sortOptions: { sortOptions },
  };
};

export const initAndDestroyPage = () => {
  return generateCustomInitialState();
};

export const HANDLERS = {
  [Types.GET_ACTIVE_ORDERS_REQUEST]: getActiveOrdersRequest,
  [Types.GET_ACTIVE_ORDERS_SUCCESS]: getActiveOrdersSuccess,
  [Types.GET_ACTIVE_ORDERS_FAILURE]: getActiveOrdersFailure,
  [Types.GET_ACTIVE_ORDER_STATS_REQUEST]: getActiveOrderStatsRequest,
  [Types.GET_ACTIVE_ORDER_STATS_SUCCESS]: getActiveOrderStatsSuccess,
  [Types.GET_ACTIVE_ORDER_STATS_FAILURE]: getActiveOrderStatsFailure,
  [Types.CLIENT_SEARCH_REQUEST]: clientSearchRequest,
  [Types.CLIENT_SEARCH_SUCCESS]: clientSearchSuccess,
  [Types.CLIENT_SEARCH_FAILURE]: clientSearchFailure,
  [Types.CLIENT_SEARCH_CANCEL]: clientSearchCancel,
  [Types.SET_PAGINATION]: setPagination,
  [Types.SUBMIT_FILTERS]: submitFilters,
  [Types.SET_SORT_OPTIONS]: setSortOptions,
  [Types.INIT_PAGE]: initAndDestroyPage,
  [Types.DESTROY_PAGE]: initAndDestroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
