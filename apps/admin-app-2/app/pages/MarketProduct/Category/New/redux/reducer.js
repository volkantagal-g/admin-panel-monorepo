import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getMarketProductCategories: {
    data: [],
    isPending: false,
    error: null,
  },
  createMarketProductCategory: {
    isPending: false,
    data: {},
    error: null,
  },
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

export const createMarketProductCategoryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createMarketProductCategory: {
      ...INITIAL_STATE.createMarketProductCategory,
      isPending: true,
    },
  };
};

export const createMarketProductCategorySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createMarketProductCategory: {
      ...INITIAL_STATE.createMarketProductCategory,
      data,
      isPending: false,
    },
  };
};

export const createMarketProductCategoryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createMarketProductCategory: {
      ...INITIAL_STATE.createMarketProductCategory,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MARKET_PRODUCT_CATEGORIES_REQUEST]: getMarketProductCategoriesRequest,
  [Types.GET_MARKET_PRODUCT_CATEGORIES_SUCCESS]: getMarketProductCategoriesSuccess,
  [Types.GET_MARKET_PRODUCT_CATEGORIES_FAILURE]: getMarketProductCategoriesFailure,
  [Types.CREATE_MARKET_PRODUCT_CATEGORY_REQUEST]: createMarketProductCategoryRequest,
  [Types.CREATE_MARKET_PRODUCT_CATEGORY_SUCCESS]: createMarketProductCategorySuccess,
  [Types.CREATE_MARKET_PRODUCT_CATEGORY_FAILURE]: createMarketProductCategoryFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
