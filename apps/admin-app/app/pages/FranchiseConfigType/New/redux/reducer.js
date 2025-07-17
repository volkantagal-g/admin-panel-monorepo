import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createFranchiseConfigType: {
    isPending: false,
    error: null,
  },
};

export const createFranchiseConfigTypeRequest = state => {
  return {
    ...state,
    createFranchiseConfigType: {
      ...state.franchiseConfigType,
      isPending: true,
    },
  };
};

export const createFranchiseConfigTypeSuccess = state => {
  return {
    ...state,
    createFranchiseConfigType: {
      ...state.franchiseConfigType,
      isPending: false,
    },
  };
};

export const createFranchiseConfigTypeFailure = (state, { error }) => {
  return {
    ...state,
    createFranchiseConfigType: {
      ...state.franchiseConfigType,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_FRANCHISE_CONFIG_TYPE_REQUEST]: createFranchiseConfigTypeRequest,
  [Types.CREATE_FRANCHISE_CONFIG_TYPE_SUCCESS]: createFranchiseConfigTypeSuccess,
  [Types.CREATE_FRANCHISE_CONFIG_TYPE_FAILURE]: createFranchiseConfigTypeFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
