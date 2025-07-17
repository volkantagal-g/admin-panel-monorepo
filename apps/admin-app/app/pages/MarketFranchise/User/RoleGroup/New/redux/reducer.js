import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  marketFranchiseUserRoleGroup: {
    isPending: false,
    error: null,
  },
};

export const createMarketFranchiseUserRoleGroupRequest = state => {
  return {
    ...state,
    marketFranchiseUserRoleGroup: {
      ...state.marketFranchiseUserRoleGroup,
      isPending: true,
    },
  };
};

export const createMarketFranchiseUserRoleGroupSuccess = state => {
  return {
    ...state,
    marketFranchiseUserRoleGroup: {
      ...state.marketFranchiseUserRoleGroup,
      isPending: false,
    },
  };
};

export const createMarketFranchiseUserRoleGroupFailure = (state, { error }) => {
  return {
    ...state,
    marketFranchiseUserRoleGroup: {
      ...state.marketFranchiseUserRoleGroup,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_MARKET_FRANCHISE_USER_ROLE_GROUP_REQUEST]: createMarketFranchiseUserRoleGroupRequest,
  [Types.CREATE_MARKET_FRANCHISE_USER_ROLE_GROUP_SUCCESS]: createMarketFranchiseUserRoleGroupSuccess,
  [Types.CREATE_MARKET_FRANCHISE_USER_ROLE_GROUP_FAILURE]: createMarketFranchiseUserRoleGroupFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
