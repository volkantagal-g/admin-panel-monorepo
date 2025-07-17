import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  franchisesAreas: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getFranchisesAreasRequest = state => {
  return {
    ...state,
    franchisesAreas: {
      ...state.franchisesAreas,
      isPending: true,
    },
  };
};

export const getFranchisesAreasSuccess = (state, { data }) => {
  return {
    ...state,
    franchisesAreas: {
      ...state.franchisesAreas,
      data,
      isPending: false,
    },
  };
};

export const getFranchisesAreasFailure = (state, { error }) => {
  return {
    ...state,
    franchisesAreas: {
      ...state.franchisesAreas,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_FRANCHISES_AREAS_REQUEST]: getFranchisesAreasRequest,
  [Types.GET_FRANCHISES_AREAS_SUCCESS]: getFranchisesAreasSuccess,
  [Types.GET_FRANCHISES_AREAS_FAILURE]: getFranchisesAreasFailure,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
