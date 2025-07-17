import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  transactionalSmsSave: {
    isPending: false,
    data: [],
    error: null,
  },
  config: {
    data: {},
    isPending: false,
  },
};

export const transactionalSmsSaveRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    transactionalSmsSave: {
      ...state.transactionalSmsSave,
      isPending: true,
    },
  };
};

export const transactionalSmsSaveSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    transactionalSmsSave: {
      ...state.transactionalSmsSave,
      isPending: false,
      data,
    },
  };
};

export const transactionalSmsSaveFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    transactionalSmsSave: {
      ...state.transactionalSmsSave,
      isPending: false,
      error,
    },
  };
};

export const getConfigRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    config: {
      ...state.config,
      isPending: true,
      error: null,
    },
  };
};

export const getConfigSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    config: {
      ...state.config,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getConfigFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    config: {
      ...state.config,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.TRANSACTIONAL_SMS_SAVE_REQUEST]: transactionalSmsSaveRequest,
  [Types.TRANSACTIONAL_SMS_SAVE_SUCCESS]: transactionalSmsSaveSuccess,
  [Types.TRANSACTIONAL_SMS_SAVE_FAILURE]: transactionalSmsSaveFailure,

  [Types.GET_CONFIG_REQUEST]: getConfigRequest,
  [Types.GET_CONFIG_SUCCESS]: getConfigSuccess,
  [Types.GET_CONFIG_FAILURE]: getConfigFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
