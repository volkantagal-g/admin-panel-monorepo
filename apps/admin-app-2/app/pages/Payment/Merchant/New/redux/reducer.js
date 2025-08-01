import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createMerchant: {
    data: [],
    isPending: false,
    error: null,
  },
  createMerchantPaymentProvider: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const createMerchantRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createMerchant: {
      ...state.createMerchant,
      isPending: true,
    },
  };
};

export const createMerchantSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createMerchant: {
      ...state.createMerchant,
      isPending: false,
      data,
    },
  };
};

export const createMerchantFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createMerchant: {
      ...state.createMerchant,
      isPending: false,
      error,
    },
  };
};

export const createMerchantPaymentProviderRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createMerchantPaymentProvider: {
      ...state.createMerchantPaymentProvider,
      isPending: true,
    },
  };
};

export const createMerchantPaymentProviderSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createMerchantPaymentProvider: {
      ...state.createMerchantPaymentProvider,
      isPending: false,
      data,
    },
  };
};

export const createMerchantPaymentProviderFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createMerchantPaymentProvider: {
      ...state.createMerchantPaymentProvider,
      isPending: false,
      error,
    },
  };
};

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.CREATE_MERCHANT_REQUEST]: createMerchantRequest,
  [Types.CREATE_MERCHANT_SUCCESS]: createMerchantSuccess,
  [Types.CREATE_MERCHANT_FAILURE]: createMerchantFailure,

  [Types.CREATE_MERCHANT_PAYMENT_PROVIDER_REQUEST]: createMerchantPaymentProviderRequest,
  [Types.CREATE_MERCHANT_PAYMENT_PROVIDER_SUCCESS]: createMerchantPaymentProviderSuccess,
  [Types.CREATE_MERCHANT_PAYMENT_PROVIDER_FAILURE]: createMerchantPaymentProviderFailure,

  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
