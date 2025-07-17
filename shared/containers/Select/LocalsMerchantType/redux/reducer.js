import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getLocalsMerchantTypes: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const getLocalsMerchantTypesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getLocalsMerchantTypes: {
      ...INITIAL_STATE.getLocalsMerchantTypes,
      isPending: true,
    },
  };
};

export const getLocalsMerchantTypesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getLocalsMerchantTypes: {
      ...INITIAL_STATE.getLocalsMerchantTypes,
      data,
      isPending: false,
    },
  };
};

export const getLocalsMerchantTypesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getLocalsMerchantTypes: {
      ...INITIAL_STATE.getLocalsMerchantTypes,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_LOCALS_MERCHANT_TYPES_REQUEST]: getLocalsMerchantTypesRequest,
  [Types.GET_LOCALS_MERCHANT_TYPES_SUCCESS]: getLocalsMerchantTypesSuccess,
  [Types.GET_LOCALS_MERCHANT_TYPES_FAILURE]: getLocalsMerchantTypesFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
