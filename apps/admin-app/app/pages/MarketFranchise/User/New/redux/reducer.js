import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createMarketFranchiseUser: {
    isPending: false,
    error: null,
  },
};

export const createMarketFranchiseUserRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createMarketFranchiseUser: {
      ...state.createMarketFranchiseUser,
      isPending: true,
    },
  };
};

export const createMarketFranchiseUserSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    createMarketFranchiseUser: {
      ...state.createMarketFranchiseUser,
      isPending: false,
    },
  };
};

export const createMarketFranchiseUserFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createMarketFranchiseUser: {
      ...state.createMarketFranchiseUser,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_MARKET_FRANCHISE_USER_REQUEST]: createMarketFranchiseUserRequest,
  [Types.CREATE_MARKET_FRANCHISE_USER_SUCCESS]: createMarketFranchiseUserSuccess,
  [Types.CREATE_MARKET_FRANCHISE_USER_FAILURE]: createMarketFranchiseUserFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
