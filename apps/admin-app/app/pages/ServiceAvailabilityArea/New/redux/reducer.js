import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  saaData: {
    data: null,
    isPending: false,
    error: false,
  },
};

const initPage = (state = INITIAL_STATE) => {
  return { ...state };
};

const createSaaRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    saaData: {
      ...state.saaData,
      isPending: true,
      error: false,
    },
  };
};
const createSaaSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    saaData: {
      data,
      isPending: false,
      error: false,
    },
  };
};
const createSaaFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    saaData: {
      ...state.saaData,
      isPending: false,
      error,
    },
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.INIT_PAGE]: initPage,
  [Types.CREATE_SAA_REQUEST]: createSaaRequest,
  [Types.CREATE_SAA_SUCCESS]: createSaaSuccess,
  [Types.CREATE_SAA_FAILURE]: createSaaFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
