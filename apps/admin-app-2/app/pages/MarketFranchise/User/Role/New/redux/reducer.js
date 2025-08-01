import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  marketFranchiseUserRole: {
    isPending: false,
    error: null,
  },
};

export const createMarketFranchiseUserRoleRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    marketFranchiseUserRole: {
      ...state.marketFranchiseUserRole,
      isPending: true,
    },
  };
};

export const createMarketFranchiseUserRoleSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    marketFranchiseUserRole: {
      ...state.marketFranchiseUserRole,
      isPending: false,
    },
  };
};

export const createMarketFranchiseUserRoleFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    marketFranchiseUserRole: {
      ...state.marketFranchiseUserRole,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_MARKET_FRANCHISE_USER_ROLE_REQUEST]: createMarketFranchiseUserRoleRequest,
  [Types.CREATE_MARKET_FRANCHISE_USER_ROLE_SUCCESS]: createMarketFranchiseUserRoleSuccess,
  [Types.CREATE_MARKET_FRANCHISE_USER_ROLE_FAILURE]: createMarketFranchiseUserRoleFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
