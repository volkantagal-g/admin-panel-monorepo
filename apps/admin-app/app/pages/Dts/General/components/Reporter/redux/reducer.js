import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  reporters: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getReportersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    reporters: {
      ...state.reporters,
      isPending: true,
    },
  };
};

export const getReportersSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    reporters: {
      ...state.reporters,
      data,
      isPending: false,
    },
  };
};

export const getReportersFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    reporters: {
      ...state.reporters,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_REPORTERS_REQUEST]: getReportersRequest,
  [Types.GET_REPORTERS_SUCCESS]: getReportersSuccess,
  [Types.GET_REPORTERS_FAILURE]: getReportersFailure,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
