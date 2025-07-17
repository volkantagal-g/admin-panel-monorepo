import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getMarketProductGroup: {
    isPending: false,
    data: {},
    error: null,
  },
  updateMarketProductGroup: {
    isPending: false,
    data: {},
    error: null,
  },
  deleteMarketProductGroup: {
    isPending: false,
    error: null,
  },
  copyMarketProductGroup: {
    isPending: false,
    error: null,
  },
  getProductsOfProductGroup: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const getMarketProductGroupRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductGroup: {
      ...INITIAL_STATE.getMarketProductGroup,
      isPending: true,
    },
  };
};

export const getMarketProductGroupSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductGroup: {
      ...INITIAL_STATE.getMarketProductGroup,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductGroupFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductGroup: {
      ...INITIAL_STATE.getMarketProductGroup,
      isPending: false,
      error,
    },
  };
};

export const updateMarketProductGroupRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateMarketProductGroup: {
      ...INITIAL_STATE.updateMarketProductGroup,
      isPending: true,
    },
  };
};

export const updateMarketProductGroupSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateMarketProductGroup: {
      ...INITIAL_STATE.updateMarketProductGroup,
      data,
      isPending: false,
    },
  };
};

export const updateMarketProductGroupFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateMarketProductGroup: {
      ...INITIAL_STATE.updateMarketProductGroup,
      isPending: false,
      error,
    },
  };
};

export const copyMarketProductGroupRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    copyMarketProductGroup: {
      ...INITIAL_STATE.copyMarketProductGroup,
      isPending: true,
    },
  };
};

export const copyMarketProductGroupSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    copyMarketProductGroup: {
      ...INITIAL_STATE.copyMarketProductGroup,
      isPending: false,
    },
  };
};

export const copyMarketProductGroupFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    copyMarketProductGroup: {
      ...INITIAL_STATE.copyMarketProductGroup,
      isPending: false,
      error,
    },
  };
};

export const deleteMarketProductGroupRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    deleteMarketProductGroup: {
      ...INITIAL_STATE.deleteMarketProductGroup,
      isPending: true,
    },
  };
};

export const deleteMarketProductGroupSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    deleteMarketProductGroup: {
      ...INITIAL_STATE.deleteMarketProductGroup,
      isPending: false,
    },
  };
};

export const deleteMarketProductGroupFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    deleteMarketProductGroup: {
      ...INITIAL_STATE.deleteMarketProductGroup,
      isPending: false,
      error,
    },
  };
};

export const getProductsOfProductGroupRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getProductsOfProductGroup: {
      ...INITIAL_STATE.getProductsOfProductGroup,
      isPending: true,
    },
  };
};

export const getProductsOfProductGroupSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getProductsOfProductGroup: {
      ...INITIAL_STATE.getProductsOfProductGroup,
      data,
      isPending: false,
    },
  };
};

export const getProductsOfProductGroupFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getProductsOfProductGroup: {
      ...INITIAL_STATE.getProductsOfProductGroup,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MARKET_PRODUCT_GROUP_REQUEST]: getMarketProductGroupRequest,
  [Types.GET_MARKET_PRODUCT_GROUP_SUCCESS]: getMarketProductGroupSuccess,
  [Types.GET_MARKET_PRODUCT_GROUP_FAILURE]: getMarketProductGroupFailure,
  [Types.UPDATE_MARKET_PRODUCT_GROUP_REQUEST]: updateMarketProductGroupRequest,
  [Types.UPDATE_MARKET_PRODUCT_GROUP_SUCCESS]: updateMarketProductGroupSuccess,
  [Types.UPDATE_MARKET_PRODUCT_GROUP_FAILURE]: updateMarketProductGroupFailure,
  [Types.COPY_MARKET_PRODUCT_GROUP_REQUEST]: copyMarketProductGroupRequest,
  [Types.COPY_MARKET_PRODUCT_GROUP_SUCCESS]: copyMarketProductGroupSuccess,
  [Types.COPY_MARKET_PRODUCT_GROUP_FAILURE]: copyMarketProductGroupFailure,
  [Types.DELETE_MARKET_PRODUCT_GROUP_REQUEST]: deleteMarketProductGroupRequest,
  [Types.DELETE_MARKET_PRODUCT_GROUP_SUCCESS]: deleteMarketProductGroupSuccess,
  [Types.DELETE_MARKET_PRODUCT_GROUP_FAILURE]: deleteMarketProductGroupFailure,
  [Types.GET_PRODUCTS_OF_PRODUCT_GROUP_REQUEST]: getProductsOfProductGroupRequest,
  [Types.GET_PRODUCTS_OF_PRODUCT_GROUP_SUCCESS]: getProductsOfProductGroupSuccess,
  [Types.GET_PRODUCTS_OF_PRODUCT_GROUP_FAILURE]: getProductsOfProductGroupFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
