import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  saaData: {
    data: null,
    isPending: false,
    error: null,
  },
};

const getSaaByIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    saaData: {
      ...state.saaData,
      isPending: true,
    },
  };
};
const getSaaByIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    saaData: {
      ...state.saaData,
      data,
      isPending: false,
    },
  };
};
const getSaaByIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    saaData: {
      ...state.saaData,
      isPending: false,
      error,
    },
  };
};

const initPage = (state = INITIAL_STATE) => {
  return { ...state };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.INIT_PAGE]: initPage,
  [Types.GET_SAA_BY_ID_REQUEST]: getSaaByIdRequest,
  [Types.GET_SAA_BY_ID_SUCCESS]: getSaaByIdSuccess,
  [Types.GET_SAA_BY_ID_FAILURE]: getSaaByIdFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
