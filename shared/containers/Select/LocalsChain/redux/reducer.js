import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getLocalsChains: {
    isPending: false,
    data: [],
    error: null,
  },
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

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_LOCALS_CHAINS_REQUEST]: getLocalsChainsRequest,
  [Types.GET_LOCALS_CHAINS_SUCCESS]: getLocalsChainsSuccess,
  [Types.GET_LOCALS_CHAINS_FAILURE]: getLocalsChainsFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
