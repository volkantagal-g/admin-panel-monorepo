import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  transactionalSmsDetail: {
    isPending: false,
    data: {},
    error: null,
  },
  config: {
    data: {},
    isPending: false,
  },
};

export const getTransactionalSmsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    transactionalSmsDetail: {
      ...INITIAL_STATE.transactionalSmsDetail,
      isPending: true,
    },
  };
};

export const getTransactionalSmsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    transactionalSmsDetail: {
      ...INITIAL_STATE.transactionalSmsDetail,
      data,
      isPending: false,
    },
  };
};

export const getTransactionalSmsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    transactionalSmsDetail: {
      ...INITIAL_STATE.transactionalSmsDetail,
      isPending: false,
      error,
    },
  };
};

export const updateTransactionalSmsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    transactionalSmsDetail: {
      ...state.transactionalSmsDetail,
      isPending: true,
    },
  };
};

export const updateTransactionalSmsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    transactionalSmsDetail: {
      ...state.transactionalSmsDetail,
      isPending: false,
      data,
    },
  };
};

export const updateTransactionalSmsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    transactionalSmsDetail: {
      ...state.transactionalSmsDetail,
      error,
      isPending: false,
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
  [Types.GET_TRANSACTIONAL_SMS_REQUEST]: getTransactionalSmsRequest,
  [Types.GET_TRANSACTIONAL_SMS_SUCCESS]: getTransactionalSmsSuccess,
  [Types.GET_TRANSACTIONAL_SMS_FAILURE]: getTransactionalSmsFailure,

  [Types.UPDATE_TRANSACTIONAL_SMS_REQUEST]: updateTransactionalSmsRequest,
  [Types.UPDATE_TRANSACTIONAL_SMS_SUCCESS]: updateTransactionalSmsSuccess,
  [Types.UPDATE_TRANSACTIONAL_SMS_FAILURE]: updateTransactionalSmsFailure,

  [Types.GET_CONFIG_REQUEST]: getConfigRequest,
  [Types.GET_CONFIG_SUCCESS]: getConfigSuccess,
  [Types.GET_CONFIG_FAILURE]: getConfigFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
