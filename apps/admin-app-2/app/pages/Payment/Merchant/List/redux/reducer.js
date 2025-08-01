import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { INIT_FILTERS } from '../constants';

export const INITIAL_STATE = {
  merchantList: {
    data: [],
    isPending: false,
  },
  filters: { ...INIT_FILTERS },
  pagination: {
    currentPage: INIT_FILTERS.currentPage,
    rowsPerPage: INIT_FILTERS.rowsPerPage,
  },
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

const setFilters = (state, { filters }) => ({
  ...state,
  filters,
});
const setPagination = (state = INITIAL_STATE, { currentPage, rowsPerPage }) => {
  return {
    ...state,
    pagination: {
      currentPage,
      rowsPerPage,
    },
  };
};

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_MERCHANT_LIST_REQUEST]: getMerchantListRequest,
  [Types.GET_MERCHANT_LIST_SUCCESS]: getMerchantListSuccess,
  [Types.GET_MERCHANT_LIST_FAILURE]: getMerchantListFailure,

  [Types.SET_FILTERS]: setFilters,
  [Types.SET_PAGINATION]: setPagination,

  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
