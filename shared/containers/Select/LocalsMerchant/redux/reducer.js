import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getLocalsMerchantByName: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const getLocalsMerchantByNameRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getLocalsMerchantByName: {
      ...INITIAL_STATE.getLocalsMerchantByName,
      isPending: true,
    },
  };
};

export const getLocalsMerchantByNameSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getLocalsMerchantByName: {
      ...INITIAL_STATE.getLocalsMerchantByName,
      data,
      isPending: false,
    },
  };
};

export const getLocalsMerchantByNameFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getLocalsMerchantByName: {
      ...INITIAL_STATE.getLocalsMerchantByName,
      isPending: false,
      error,
    },
  };
};

export const getShopByIdRequest = state => {
  return {
    ...state,
    getLocalsMerchantByName: {
      ...state.getLocalsMerchantByName,
      isPending: true,
      error: null,
      data: [],
    },
  };
};

export const getShopByIdSuccess = (state, { data }) => {
  return {
    ...state,
    getLocalsMerchantByName: {
      ...state.getLocalsMerchantByName,
      isPending: false,
      data,
      error: null,
    },
  };
};

export const getShopByIdFailure = (state, { error }) => {
  return {
    ...state,
    getLocalsMerchantByName: {
      ...state.getLocalsMerchantByName,
      isPending: false,
      data: [],
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_LOCALS_MERCHANT_BY_NAME_REQUEST]: getLocalsMerchantByNameRequest,
  [Types.GET_LOCALS_MERCHANT_BY_NAME_SUCCESS]: getLocalsMerchantByNameSuccess,
  [Types.GET_LOCALS_MERCHANT_BY_NAME_FAILURE]: getLocalsMerchantByNameFailure,

  [Types.GET_SHOP_BY_ID_REQUEST]: getShopByIdRequest,
  [Types.GET_SHOP_BY_ID_SUCCESS]: getShopByIdSuccess,
  [Types.GET_SHOP_BY_ID_FAILURE]: getShopByIdFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
