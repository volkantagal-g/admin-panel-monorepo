import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getMarketProductMasterCategory: {
    isPending: false,
    data: {},
    error: null,
  },
  updateMarketProductMasterCategory: {
    isPending: false,
    data: {},
    error: null,
  },
  getChildrenOfMarketProductMasterCategory: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const getMarketProductMasterCategoryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductMasterCategory: {
      ...state.getMarketProductMasterCategory,
      isPending: true,
    },
  };
};

export const getMarketProductMasterCategorySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductMasterCategory: {
      ...INITIAL_STATE.getMarketProductMasterCategory,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductMasterCategoryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductMasterCategory: {
      ...INITIAL_STATE.getMarketProductMasterCategory,
      isPending: false,
      error,
    },
  };
};

export const updateMarketProductMasterCategoryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateMarketProductMasterCategory: {
      ...state.updateMarketProductMasterCategory,
      isPending: true,
    },
  };
};

export const updateMarketProductMasterCategorySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateMarketProductMasterCategory: {
      ...INITIAL_STATE.updateMarketProductMasterCategory,
      data,
      isPending: false,
    },
  };
};

export const updateMarketProductMasterCategoryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateMarketProductMasterCategory: {
      ...INITIAL_STATE.updateMarketProductMasterCategory,
      isPending: false,
      error,
    },
  };
};

export const getChildrenOfMarketProductMasterCategoryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getChildrenOfMarketProductMasterCategory: {
      ...state.getChildrenOfMarketProductMasterCategory,
      isPending: true,
    },
  };
};

export const getChildrenOfMarketProductMasterCategorySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getChildrenOfMarketProductMasterCategory: {
      ...INITIAL_STATE.getChildrenOfMarketProductMasterCategory,
      data,
      isPending: false,
    },
  };
};

export const getChildrenOfMarketProductMasterCategoryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getChildrenOfMarketProductMasterCategory: {
      ...INITIAL_STATE.getChildrenOfMarketProductMasterCategory,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MARKET_PRODUCT_MASTER_CATEGORY_REQUEST]: getMarketProductMasterCategoryRequest,
  [Types.GET_MARKET_PRODUCT_MASTER_CATEGORY_SUCCESS]: getMarketProductMasterCategorySuccess,
  [Types.GET_MARKET_PRODUCT_MASTER_CATEGORY_FAILURE]: getMarketProductMasterCategoryFailure,
  [Types.UPDATE_MARKET_PRODUCT_MASTER_CATEGORY_REQUEST]: updateMarketProductMasterCategoryRequest,
  [Types.UPDATE_MARKET_PRODUCT_MASTER_CATEGORY_SUCCESS]: updateMarketProductMasterCategorySuccess,
  [Types.UPDATE_MARKET_PRODUCT_MASTER_CATEGORY_FAILURE]: updateMarketProductMasterCategoryFailure,
  [Types.GET_CHILDREN_OF_MARKET_PRODUCT_MASTER_CATEGORY_REQUEST]: getChildrenOfMarketProductMasterCategoryRequest,
  [Types.GET_CHILDREN_OF_MARKET_PRODUCT_MASTER_CATEGORY_SUCCESS]: getChildrenOfMarketProductMasterCategorySuccess,
  [Types.GET_CHILDREN_OF_MARKET_PRODUCT_MASTER_CATEGORY_FAILURE]: getChildrenOfMarketProductMasterCategoryFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
