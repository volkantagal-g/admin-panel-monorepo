import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  marketFranchiseUserRoleGroupList: {
    data: [],
    total: 0,
    isPending: false,
  },
};

export const marketFranchiseUserRoleGroupListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    marketFranchiseUserRoleGroupList: {
      ...state.marketFranchiseUserRoleGroupList,
      isPending: true,
    },
  };
};

export const marketFranchiseUserRoleGroupListSuccess = (state = INITIAL_STATE, { data = [], total = 0 }) => {
  return {
    ...state,
    marketFranchiseUserRoleGroupList: {
      ...state.marketFranchiseUserRoleGroupList,
      data,
      total,
      isPending: false,
    },
  };
};

export const marketFranchiseUserRoleGroupListFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    marketFranchiseUserRoleGroupList: {
      ...state.marketFranchiseUserRoleGroupList,
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
  [Types.GET_MARKET_FRANCHISE_USER_ROLE_GROUP_LIST_REQUEST]: marketFranchiseUserRoleGroupListRequest,
  [Types.GET_MARKET_FRANCHISE_USER_ROLE_GROUP_LIST_SUCCESS]: marketFranchiseUserRoleGroupListSuccess,
  [Types.GET_MARKET_FRANCHISE_USER_ROLE_GROUP_LIST_FAILURE]: marketFranchiseUserRoleGroupListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
