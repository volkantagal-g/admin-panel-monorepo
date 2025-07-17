import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  franchises: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getFranchisesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    franchises: {
      ...state.franchises,
      isPending: true,
    },
  };
};

export const getFranchisesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    franchises: {
      ...state.franchises,
      data,
      isPending: false,
    },
  };
};

export const getFranchisesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    franchises: {
      ...state.franchises,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_FRANCHISES_REQUEST]: getFranchisesRequest,
  [Types.GET_FRANCHISES_SUCCESS]: getFranchisesSuccess,
  [Types.GET_FRANCHISES_FAILURE]: getFranchisesFailure,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
