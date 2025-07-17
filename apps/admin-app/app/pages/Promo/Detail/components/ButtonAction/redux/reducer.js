import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getConfigKey: {
    isPending: false,
    data: [],
    error: null,
  },
  getLocalsChains: {
    isPending: false,
    data: [],
    error: null,
  },
  getSmartSuggestions: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const getConfigKeyRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getConfigKey: {
      ...INITIAL_STATE.getConfigKey,
      isPending: true,
    },
  };
};

export const getConfigKeySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getConfigKey: {
      ...INITIAL_STATE.getConfigKey,
      data,
      isPending: false,
    },
  };
};

export const getConfigKeyFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getConfigKey: {
      ...INITIAL_STATE.getConfigKey,
      isPending: false,
      error,
    },
  };
};

export const getLocalsChainsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getLocalsChains: {
      ...INITIAL_STATE.getLocalsChains,
      isPending: true,
    },
  };
};

export const getLocalsChainsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getLocalsChains: {
      ...INITIAL_STATE.getLocalsChains,
      data,
      isPending: false,
    },
  };
};

export const getLocalsChainsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getLocalsChains: {
      ...INITIAL_STATE.getLocalsChains,
      isPending: false,
      error,
    },
  };
};

export const getSmartSuggestionsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getSmartSuggestions: {
      ...INITIAL_STATE.getSmartSuggestions,
      isPending: true,
    },
  };
};

export const getSmartSuggestionsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getSmartSuggestions: {
      ...INITIAL_STATE.getSmartSuggestions,
      data,
      isPending: false,
    },
  };
};

export const getSmartSuggestionsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getSmartSuggestions: {
      ...INITIAL_STATE.getSmartSuggestions,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  // App Actions
  [Types.GET_CONFIG_KEY_REQUEST]: getConfigKeyRequest,
  [Types.GET_CONFIG_KEY_SUCCESS]: getConfigKeySuccess,
  [Types.GET_CONFIG_KEY_FAILURE]: getConfigKeyFailure,
  // Locals Chains
  [Types.GET_LOCALS_CHAINS_REQUEST]: getLocalsChainsRequest,
  [Types.GET_LOCALS_CHAINS_SUCCESS]: getLocalsChainsSuccess,
  [Types.GET_LOCALS_CHAINS_FAILURE]: getLocalsChainsFailure,
  // Smart Suggestions
  [Types.GET_SMART_SUGGESTIONS_REQUEST]: getSmartSuggestionsRequest,
  [Types.GET_SMART_SUGGESTIONS_SUCCESS]: getSmartSuggestionsSuccess,
  [Types.GET_SMART_SUGGESTIONS_FAILURE]: getSmartSuggestionsFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
