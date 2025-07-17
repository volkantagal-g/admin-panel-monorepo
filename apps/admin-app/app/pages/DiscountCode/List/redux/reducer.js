import { createReducer } from 'reduxsauce';

import { Types } from './actions';

const INITIAL_STATE = {
  discountCode: {
    isPending: false,
    data: [],
    error: null,
  },
  discountCodeUsedClients: {
    isPending: false,
    data: {},
    error: null,
  },
};

const getDiscountCodeRequest = (state = INITIAL_STATE) => ({
  ...state,
  discountCode: {
    ...state.discountCode,
    isPending: true,
  },
});

const getDiscountCodeSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  discountCode: {
    ...state.discountCode,
    isPending: false,
    data,
  },
});

const getDiscountCodeFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  discountCode: {
    ...state.discountCode,
    isPending: false,
    error,
  },
});

const getDiscountCodeUsedClientsRequest = (state = INITIAL_STATE) => ({
  ...state,
  discountCodeUsedClients: {
    ...state.discountCodeUsedClients,
    isPending: true,
  },
});

const getDiscountCodeUsedClientsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  discountCodeUsedClients: {
    ...state.discountCodeUsedClients,
    isPending: false,
    data,
  },
});

const getDiscountCodeUsedClientsFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  discountCodeUsedClients: {
    ...state.discountCodeUsedClients,
    isPending: false,
    error,
  },
});

const destroy = () => ({ ...INITIAL_STATE });

const HANDLERS = {
  [Types.GET_DISCOUNT_CODE_REQUEST]: getDiscountCodeRequest,
  [Types.GET_DISCOUNT_CODE_SUCCESS]: getDiscountCodeSuccess,
  [Types.GET_DISCOUNT_CODE_FAILURE]: getDiscountCodeFailure,

  [Types.GET_DISCOUNT_CODE_USED_CLIENTS_REQUEST]: getDiscountCodeUsedClientsRequest,
  [Types.GET_DISCOUNT_CODE_USED_CLIENTS_SUCCESS]: getDiscountCodeUsedClientsSuccess,
  [Types.GET_DISCOUNT_CODE_USED_CLIENTS_FAILURE]: getDiscountCodeUsedClientsFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
