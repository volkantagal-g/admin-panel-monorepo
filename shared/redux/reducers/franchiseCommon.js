import { createReducer } from 'reduxsauce';

import { Types } from '../actions/franchiseCommon';

export const INITIAL_STATE = {
  getFranchiseAreas: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getFranchiseAreasRequest = state => {
  return {
    ...state,
    getFranchiseAreas: {
      ...state.getFranchiseAreas,
      isPending: true,
    },
  };
};

export const getFranchiseAreasSuccess = (state, { data }) => {
  return {
    ...state,
    getFranchiseAreas: {
      ...state.getFranchiseAreas,
      data,
      isPending: false,
    },
  };
};

export const getFranchiseAreasFailure = (state, { error }) => {
  return {
    ...state,
    getFranchiseAreas: {
      ...state.getFranchiseAreas,
      isPending: false,
      error,
    },
  };
};

export const HANDLERS = {
  [Types.GET_FRANCHISE_AREAS_REQUEST]: getFranchiseAreasRequest,
  [Types.GET_FRANCHISE_AREAS_SUCCESS]: getFranchiseAreasSuccess,
  [Types.GET_FRANCHISE_AREAS_FAILURE]: getFranchiseAreasFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
