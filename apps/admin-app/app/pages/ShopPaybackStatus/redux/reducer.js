import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getShopCurrentPaybackStatus: {
    data: {},
    isPending: false,
    error: null,
  },
  updateShopPaybackStatus: {
    isPending: false,
    error: null,
  },
  updateAllShopsPaybackStatus: {
    isPending: false,
    error: null,
  },
  updatePartialShopsPaybackStatus: {
    isPending: false,
    error: null,
  },
  validatePartialShopsPaybackStatus: {
    isPending: false,
    error: null,
  },
};

export const getShopCurrentPaybackStatusRequest = state => {
  return {
    ...state,
    getShopCurrentPaybackStatus: {
      ...state.getShopCurrentPaybackStatus,
      isPending: true,
    },
  };
};

export const getShopCurrentPaybackStatusSuccess = (state, { data }) => {
  return {
    ...state,
    getShopCurrentPaybackStatus: {
      ...state.getShopCurrentPaybackStatus,
      data,
      isPending: false,
    },
  };
};

export const getShopCurrentPaybackStatusFailure = (state, { error }) => {
  return {
    ...state,
    getShopCurrentPaybackStatus: {
      ...state.getShopCurrentPaybackStatus,
      isPending: false,
      error,
    },
  };
};

export const updateShopPaybackStatusRequest = state => {
  return {
    ...state,
    updateShopPaybackStatus: {
      ...state.updateShopPaybackStatus,
      isPending: true,
    },
  };
};

export const updateShopPaybackStatusSuccess = state => {
  return {
    ...state,
    updateShopPaybackStatus: {
      ...state.updateShopPaybackStatus,
      isPending: false,
    },
  };
};

export const updateShopPaybackStatusFailure = (state, { error }) => {
  return {
    ...state,
    updateShopPaybackStatus: {
      ...state.updateShopPaybackStatus,
      isPending: false,
      error,
    },
  };
};

export const updateAllShopsPaybackStatusRequest = state => {
  return {
    ...state,
    updateAllShopsPaybackStatus: {
      ...state.updateAllShopsPaybackStatus,
      isPending: true,
    },
  };
};

export const updateAllShopsPaybackStatusSuccess = state => {
  return {
    ...state,
    updateAllShopsPaybackStatus: {
      ...state.updateAllShopsPaybackStatus,
      isPending: false,
    },
  };
};

export const updateAllShopsPaybackStatusFailure = (state, { error }) => {
  return {
    ...state,
    updateAllShopsPaybackStatus: {
      ...state.updateAllShopsPaybackStatus,
      isPending: false,
      error,
    },
  };
};

export const updatePartialShopsPaybackStatusRequest = state => {
  return {
    ...state,
    updatePartialShopsPaybackStatus: {
      ...state.updatePartialShopsPaybackStatus,
      isPending: true,
    },
  };
};

export const updatePartialShopsPaybackStatusSuccess = state => {
  return {
    ...state,
    updatePartialShopsPaybackStatus: {
      ...state.updatePartialShopsPaybackStatus,
      isPending: false,
    },
  };
};

export const updatePartialShopsPaybackStatusFailure = (state, { error }) => {
  return {
    ...state,
    updatePartialShopsPaybackStatus: {
      ...state.updatePartialShopsPaybackStatus,
      isPending: false,
      error,
    },
  };
};

export const validatePartialShopsPaybackStatusRequest = state => {
  return {
    ...state,
    validatePartialShopsPaybackStatus: {
      ...state.validatePartialShopsPaybackStatus,
      isPending: true,
    },
  };
};

export const validatePartialShopsPaybackStatusSuccess = state => {
  return {
    ...state,
    validatePartialShopsPaybackStatus: {
      ...state.validatePartialShopsPaybackStatus,
      isPending: false,
    },
  };
};

export const validatePartialShopsPaybackStatusFailure = (state, { error }) => {
  return {
    ...state,
    validatePartialShopsPaybackStatus: {
      ...state.validatePartialShopsPaybackStatus,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_SHOP_CURRENT_PAYBACK_STATUS_REQUEST]: getShopCurrentPaybackStatusRequest,
  [Types.GET_SHOP_CURRENT_PAYBACK_STATUS_SUCCESS]: getShopCurrentPaybackStatusSuccess,
  [Types.GET_SHOP_CURRENT_PAYBACK_STATUS_FAILURE]: getShopCurrentPaybackStatusFailure,

  [Types.UPDATE_SHOP_PAYBACK_STATUS_REQUEST]: updateShopPaybackStatusRequest,
  [Types.UPDATE_SHOP_PAYBACK_STATUS_SUCCESS]: updateShopPaybackStatusSuccess,
  [Types.UPDATE_SHOP_PAYBACK_STATUS_FAILURE]: updateShopPaybackStatusFailure,

  [Types.UPDATE_ALL_SHOPS_PAYBACK_STATUS_REQUEST]: updateAllShopsPaybackStatusRequest,
  [Types.UPDATE_ALL_SHOPS_PAYBACK_STATUS_SUCCESS]: updateAllShopsPaybackStatusSuccess,
  [Types.UPDATE_ALL_SHOPS_PAYBACK_STATUS_FAILURE]: updateAllShopsPaybackStatusFailure,

  [Types.UPDATE_PARTIAL_SHOPS_PAYBACK_STATUS_REQUEST]: updatePartialShopsPaybackStatusRequest,
  [Types.UPDATE_PARTIAL_SHOPS_PAYBACK_STATUS_SUCCESS]: updatePartialShopsPaybackStatusSuccess,
  [Types.UPDATE_PARTIAL_SHOPS_PAYBACK_STATUS_FAILURE]: updatePartialShopsPaybackStatusFailure,

  [Types.VALIDATE_PARTIAL_SHOPS_PAYBACK_STATUS_REQUEST]: validatePartialShopsPaybackStatusRequest,
  [Types.VALIDATE_PARTIAL_SHOPS_PAYBACK_STATUS_SUCCESS]: validatePartialShopsPaybackStatusSuccess,
  [Types.VALIDATE_PARTIAL_SHOPS_PAYBACK_STATUS_FAILURE]: validatePartialShopsPaybackStatusFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
