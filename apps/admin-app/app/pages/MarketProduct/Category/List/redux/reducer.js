import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { marketProductCategoryStatuses } from '@shared/shared/constantValues';

const selectedStatuses = Object.keys(marketProductCategoryStatuses);

export const INITIAL_STATE = {
  getMarketProductCategories: {
    data: [],
    isPending: false,
    error: null,
  },
  getMarketProductSubCategories: {
    data: [],
    isPending: false,
    error: null,
  },
  filters: { selectedStatuses,  searchValue: "" },
};

export const getMarketProductCategoriesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductCategories: {
      ...INITIAL_STATE.getMarketProductCategories,
      isPending: true,
    },
  };
};

export const getMarketProductCategoriesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductCategories: {
      ...INITIAL_STATE.getMarketProductCategories,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductCategoriesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductCategories: {
      ...INITIAL_STATE.getMarketProductCategories,
      isPending: false,
      error,
    },
  };
};

export const getMarketProductSubCategoriesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductSubCategories: {
      ...INITIAL_STATE.getMarketProductSubCategories,
      isPending: true,
    },
  };
};

export const getMarketProductSubCategoriesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductSubCategories: {
      ...INITIAL_STATE.getMarketProductSubCategories,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductSubCategoriesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductSubCategories: {
      ...INITIAL_STATE.getMarketProductSubCategories,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const setFilterOptions = (state = INITIAL_STATE, { selectedStatuses }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      selectedStatuses,
    },
  };
};
export const setSearchValue = (state = INITIAL_STATE, { searchValue }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      searchValue,
    },
  };
};

export const HANDLERS = {
  [Types.GET_MARKET_PRODUCT_CATEGORIES_REQUEST]: getMarketProductCategoriesRequest,
  [Types.GET_MARKET_PRODUCT_CATEGORIES_SUCCESS]: getMarketProductCategoriesSuccess,
  [Types.GET_MARKET_PRODUCT_CATEGORIES_FAILURE]: getMarketProductCategoriesFailure,
  [Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_REQUEST]: getMarketProductSubCategoriesRequest,
  [Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_SUCCESS]: getMarketProductSubCategoriesSuccess,
  [Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_FAILURE]: getMarketProductSubCategoriesFailure,
  [Types.DESTROY_PAGE]: destroy,
  [Types.SET_FILTER_OPTIONS]: setFilterOptions,
  [Types.SET_SEARCH_VALUE]: setSearchValue,
};

export default createReducer(INITIAL_STATE, HANDLERS);
