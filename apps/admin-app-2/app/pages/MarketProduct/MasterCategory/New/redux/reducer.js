import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createMarketProductMasterCategory: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const createMarketProductMasterCategoryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createMarketProductMasterCategory: {
      ...INITIAL_STATE.createMarketProductMasterCategory,
      isPending: true,
    },
  };
};

export const createMarketProductMasterCategorySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createMarketProductMasterCategory: {
      ...INITIAL_STATE.createMarketProductMasterCategory,
      data,
      isPending: false,
    },
  };
};

export const createMarketProductMasterCategoryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createMarketProductMasterCategory: {
      ...INITIAL_STATE.createMarketProductMasterCategory,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_MARKET_PRODUCT_MASTER_CATEGORY_REQUEST]: createMarketProductMasterCategoryRequest,
  [Types.CREATE_MARKET_PRODUCT_MASTER_CATEGORY_SUCCESS]: createMarketProductMasterCategorySuccess,
  [Types.CREATE_MARKET_PRODUCT_MASTER_CATEGORY_FAILURE]: createMarketProductMasterCategoryFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
