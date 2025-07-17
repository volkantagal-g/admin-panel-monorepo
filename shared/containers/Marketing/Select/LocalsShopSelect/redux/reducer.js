import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  isPending: false,
  data: [],
  error: null,
};

export const getLocalsShopsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    isPending: true,
  };
};

export const getLocalsShopsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    data,
    isPending: false,
  };
};

export const getLocalsShopsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    isPending: false,
    error,
  };
};

export const getLocalsShopDetailByIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    isPending: true,
  };
};

export const getLocalsShopDetailByIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    data,
    isPending: false,
  };
};

export const getLocalsShopDetailByIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    isPending: false,
    error,
  };
};

export const getLocalsShopDetailsByIdArrayRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    isPending: true,
  };
};

export const getLocalsShopDetailsByIdArraySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    data,
    isPending: false,
  };
};

export const getLocalsShopDetailsByIdArrayFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    isPending: false,
    error,
  };
};

export const setLocalShopOptions = (state = INITIAL_STATE, { options }) => {
  return {
    ...state,
    data: [
      ...state.data,
      ...options,
    ],
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_LOCALS_SHOPS_REQUEST]: getLocalsShopsRequest,
  [Types.GET_LOCALS_SHOPS_SUCCESS]: getLocalsShopsSuccess,
  [Types.GET_LOCALS_SHOPS_FAILURE]: getLocalsShopsFailure,

  [Types.GET_LOCALS_SHOP_DETAIL_BY_ID_REQUEST]: getLocalsShopDetailByIdRequest,
  [Types.GET_LOCALS_SHOP_DETAIL_BY_ID_SUCCESS]: getLocalsShopDetailByIdSuccess,
  [Types.GET_LOCALS_SHOP_DETAIL_BY_ID_FAILURE]: getLocalsShopDetailByIdFailure,

  [Types.GET_LOCALS_SHOP_DETAILS_BY_ID_ARRAY_REQUEST]: getLocalsShopDetailsByIdArrayRequest,
  [Types.GET_LOCALS_SHOP_DETAILS_BY_ID_ARRAY_SUCCESS]: getLocalsShopDetailsByIdArraySuccess,
  [Types.GET_LOCALS_SHOP_DETAILS_BY_ID_ARRAY_FAILURE]: getLocalsShopDetailsByIdArrayFailure,

  [Types.SET_LOCAL_SHOP_OPTIONS]: setLocalShopOptions,

  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
