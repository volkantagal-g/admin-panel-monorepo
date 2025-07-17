import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  marketProductCategories: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getMarketProductCategoriesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    marketProductCategories: {
      ...INITIAL_STATE.marketProductCategories,
      isPending: true,
    },
  };
};

export const getMarketProductCategoriesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    marketProductCategories: {
      ...INITIAL_STATE.marketProductCategories,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductCategoriesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    marketProductCategories: {
      ...INITIAL_STATE.marketProductCategories,
      isPending: false,
      error,
    },
  };
};

export const clearMarketProductCategories = (state = INITIAL_STATE) => {
  return {
    ...state,
    marketProductCategories: INITIAL_STATE.marketProductCategories,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MARKET_PRODUCT_CATEGORIES_REQUEST]: getMarketProductCategoriesRequest,
  [Types.GET_MARKET_PRODUCT_CATEGORIES_SUCCESS]: getMarketProductCategoriesSuccess,
  [Types.GET_MARKET_PRODUCT_CATEGORIES_FAILURE]: getMarketProductCategoriesFailure,
  [Types.CLEAR_MARKET_PRODUCT_CATEGORIES]: clearMarketProductCategories,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
