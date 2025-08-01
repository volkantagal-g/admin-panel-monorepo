import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  marketFranchiseUserRoleList: {
    data: [],
    total: 0,
    isPending: false,
  },
};

export const marketFranchiseUserRoleListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    marketFranchiseUserRoleList: {
      ...state.marketFranchiseUserRoleList,
      isPending: true,
    },
  };
};

export const marketFranchiseUserRoleListSuccess = (state = INITIAL_STATE, { data = [], total = 0 }) => {
  return {
    ...state,
    marketFranchiseUserRoleList: {
      ...state.marketFranchiseUserRoleList,
      data,
      total,
      isPending: false,
    },
  };
};

export const marketFranchiseUserRoleListFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    marketFranchiseUserRoleList: {
      ...state.marketFranchiseUserRoleList,
      data: [],
      total: 0,
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MARKET_FRANCHISE_USER_ROLE_LIST_REQUEST]: marketFranchiseUserRoleListRequest,
  [Types.GET_MARKET_FRANCHISE_USER_ROLE_LIST_SUCCESS]: marketFranchiseUserRoleListSuccess,
  [Types.GET_MARKET_FRANCHISE_USER_ROLE_LIST_FAILURE]: marketFranchiseUserRoleListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
