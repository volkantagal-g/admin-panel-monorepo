import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getMarketProductSubCategories: {
    isPending: false,
    data: [],
    error: null,
  },
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

export const HANDLERS = {
  [Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_REQUEST]: getMarketProductSubCategoriesRequest,
  [Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_SUCCESS]: getMarketProductSubCategoriesSuccess,
  [Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_FAILURE]: getMarketProductSubCategoriesFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
