import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  merchantDetail: {
    data: null,
    isPending: false,
    error: null,
  },
  updateMerchant: {
    data: null,
    isPending: false,
    error: null,
  },
  merchantWebhooks: {
    data: null,
    isPending: false,
    error: null,
  },
  updateMerchantWebhooks: {
    data: null,
    isPending: false,
    error: null,
  },
  createMerchantWebhooks: {
    data: null,
    isPending: false,
    error: null,
  },
  addPaymentMethod: {
    data: null,
    isPending: false,
    error: null,
  },
  createMerchantPaymentProvider: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getMerchantDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    merchantDetail: {
      ...state.merchantDetail,
      isPending: true,
      error: null,
    },
  };
};

export const getMerchantDetailSuccess = (state = INITIAL_STATE, { data = null }) => {
  return {
    ...state,
    merchantDetail: {
      ...state.merchantDetail,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getMerchantDetailFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    merchantDetail: {
      ...state.merchantDetail,
      isPending: false,
      error,
    },
  };
};

export const updateMerchantRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateMerchant: {
      ...state.updateMerchant,
      isPending: true,
      error: null,
    },
  };
};

export const updateMerchantSuccess = (state = INITIAL_STATE, { data = null }) => {
  return {
    ...state,
    updateMerchant: {
      ...state.updateMerchant,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const updateMerchantFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateMerchant: {
      ...state.updateMerchant,
      isPending: false,
      error,
    },
  };
};
export const getMerchantWebhooksRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    merchantWebhooks: {
      ...state.merchantWebhooks,
      isPending: true,
      error: null,
    },
  };
};

export const getMerchantWebhooksSuccess = (state = INITIAL_STATE, { data = null }) => {
  return {
    ...state,
    merchantWebhooks: {
      ...state.merchantWebhooks,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getMerchantWebhooksFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    merchantWebhooks: {
      ...state.merchantWebhooks,
      isPending: false,
      error,
    },
  };
};

export const updateMerchantWebhooksRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateMerchantWebhooks: {
      ...state.updateMerchantWebhooks,
      isPending: true,
      error: null,
    },
  };
};

export const updateMerchantWebhooksSuccess = (state = INITIAL_STATE, { data = null }) => {
  return {
    ...state,
    updateMerchantWebhooks: {
      ...state.updateMerchantWebhooks,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const updateMerchantWebhooksFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateMerchantWebhooks: {
      ...state.updateMerchantWebhooks,
      isPending: false,
      error,
    },
  };
};

export const createMerchantWebhooksRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createMerchantWebhooks: {
      ...state.createMerchantWebhooks,
      isPending: true,
      error: null,
    },
  };
};

export const createMerchantWebhooksSuccess = (state = INITIAL_STATE, { data = null }) => {
  return {
    ...state,
    createMerchantWebhooks: {
      ...state.createMerchantWebhooks,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const createMerchantWebhooksFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createMerchantWebhooks: {
      ...state.createMerchantWebhooks,
      isPending: false,
      error,
    },
  };
};

export const addPaymentMethodToPaymentProviderRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    addPaymentMethod: {
      ...state.addPaymentMethod,
      isPending: true,
      error: null,
    },
  };
};

export const addPaymentMethodToPaymentProviderSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    addPaymentMethod: {
      ...state.addPaymentMethod,
      isPending: false,
      error: null,
    },
  };
};

export const addPaymentMethodToPaymentProviderFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    addPaymentMethod: {
      ...state.addPaymentMethod,
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

export const createMerchantPaymentProviderSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    createMerchantPaymentProvider: {
      ...state.createMerchantPaymentProvider,
      isPending: false,
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
  [Types.GET_MERCHANT_DETAIL_REQUEST]: getMerchantDetailRequest,
  [Types.GET_MERCHANT_DETAIL_SUCCESS]: getMerchantDetailSuccess,
  [Types.GET_MERCHANT_DETAIL_FAILURE]: getMerchantDetailFailure,

  [Types.GET_MERCHANT_WEBHOOKS_REQUEST]: getMerchantWebhooksRequest,
  [Types.GET_MERCHANT_WEBHOOKS_SUCCESS]: getMerchantWebhooksSuccess,
  [Types.GET_MERCHANT_WEBHOOKS_FAILURE]: getMerchantWebhooksFailure,

  [Types.UPDATE_MERCHANT_WEBHOOKS_REQUEST]: updateMerchantWebhooksRequest,
  [Types.UPDATE_MERCHANT_WEBHOOKS_SUCCESS]: updateMerchantWebhooksSuccess,
  [Types.UPDATE_MERCHANT_WEBHOOKS_FAILURE]: updateMerchantWebhooksFailure,

  [Types.CREATE_MERCHANT_WEBHOOKS_REQUEST]: createMerchantWebhooksRequest,
  [Types.CREATE_MERCHANT_WEBHOOKS_SUCCESS]: createMerchantWebhooksSuccess,
  [Types.CREATE_MERCHANT_WEBHOOKS_FAILURE]: createMerchantWebhooksFailure,

  [Types.UPDATE_MERCHANT_REQUEST]: updateMerchantRequest,
  [Types.UPDATE_MERCHANT_SUCCESS]: updateMerchantSuccess,
  [Types.UPDATE_MERCHANT_FAILURE]: updateMerchantFailure,

  [Types.ADD_PAYMENT_METHOD_TO_PAYMENT_PROVIDER_REQUEST]: addPaymentMethodToPaymentProviderRequest,
  [Types.ADD_PAYMENT_METHOD_TO_PAYMENT_PROVIDER_SUCCESS]: addPaymentMethodToPaymentProviderSuccess,
  [Types.ADD_PAYMENT_METHOD_TO_PAYMENT_PROVIDER_FAILURE]: addPaymentMethodToPaymentProviderFailure,

  [Types.CREATE_MERCHANT_PAYMENT_PROVIDER_REQUEST]: createMerchantPaymentProviderRequest,
  [Types.CREATE_MERCHANT_PAYMENT_PROVIDER_SUCCESS]: createMerchantPaymentProviderSuccess,
  [Types.CREATE_MERCHANT_PAYMENT_PROVIDER_FAILURE]: createMerchantPaymentProviderFailure,

  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
