import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  configLog: {
    isPending: false,
    data: [],
  },
};

export const getConfigLogRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    configLog: {
      ...state.configLog,
      isPending: true,
    },
  };
};

export const getConfigLogSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    configLog: {
      ...state.configLog,
      isPending: false,
      data,
    },
  };
};

export const getConfigLogFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    configLog: {
      ...state.configLog,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_CONFIG_LOG_REQUEST]: getConfigLogRequest,
  [Types.GET_CONFIG_LOG_SUCCESS]: getConfigLogSuccess,
  [Types.GET_CONFIG_LOG_FAILURE]: getConfigLogFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
