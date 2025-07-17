import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  marketProductMasterCategories: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getMarketProductMasterCategoriesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    marketProductMasterCategories: {
      ...INITIAL_STATE.marketProductMasterCategories,
      isPending: true,
    },
  };
};

export const getMarketProductMasterCategoriesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    marketProductMasterCategories: {
      ...INITIAL_STATE.marketProductMasterCategories,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductMasterCategoriesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    marketProductMasterCategories: {
      ...INITIAL_STATE.marketProductMasterCategories,
      isPending: false,
      error,
    },
  };
};

export const clearMarketProductMasterCategories = (state = INITIAL_STATE) => {
  return {
    ...state,
    marketProductMasterCategories: INITIAL_STATE.marketProductMasterCategories,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MARKET_PRODUCT_MASTER_CATEGORIES_REQUEST]: getMarketProductMasterCategoriesRequest,
  [Types.GET_MARKET_PRODUCT_MASTER_CATEGORIES_SUCCESS]: getMarketProductMasterCategoriesSuccess,
  [Types.GET_MARKET_PRODUCT_MASTER_CATEGORIES_FAILURE]: getMarketProductMasterCategoriesFailure,
  [Types.CLEAR_MARKET_PRODUCT_MASTER_CATEGORIES]: clearMarketProductMasterCategories,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
