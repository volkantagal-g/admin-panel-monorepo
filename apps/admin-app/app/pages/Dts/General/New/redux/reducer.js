import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createDts: {
    isPending: false,
    error: null,
  },
};

export const createDtsRequest = state => {
  return {
    ...state,
    createDts: {
      ...state.createDts,
      isPending: true,
    },
  };
};

export const createDtsSuccess = state => {
  return {
    ...state,
    createDts: {
      ...state.createDts,
      isPending: false,
    },
  };
};

export const createDtsFailure = (state, { error }) => {
  return {
    ...state,
    createDts: {
      ...state.createDts,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_DTS_REQUEST]: createDtsRequest,
  [Types.CREATE_DTS_SUCCESS]: createDtsSuccess,
  [Types.CREATE_DTS_FAILURE]: createDtsFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
