import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  franchiseUserList: {
    data: [],
    count: 0,
    isPending: false,
    error: null,
  },
  exportFranchiseUsers: {
    isPending: false,
    error: null,
  },
};

export const getFranchiseUserListRequest = state => {
  return {
    ...state,
    franchiseUserList: {
      ...state.franchiseUserList,
      isPending: true,
    },
  };
};

export const getFranchiseUserListSuccess = (state, { data, count }) => {
  return {
    ...state,
    franchiseUserList: {
      ...state.franchiseUserList,
      isPending: false,
      data,
      count,
    },
  };
};

export const getFranchiseUserListFailure = (state, { error }) => {
  return {
    ...state,
    franchiseUserList: {
      ...state.franchiseUserList,
      isPending: false,
      error,
    },
  };
};

export const exportFranchiseUsersRequest = state => {
  return {
    ...state,
    exportFranchiseUsers: {
      ...state.exportFranchiseUsers,
      isPending: true,
    },
  };
};

export const exportFranchiseUsersSuccess = state => {
  return {
    ...state,
    exportFranchiseUsers: {
      ...state.exportFranchiseUsers,
      isPending: false,
    },
  };
};

export const exportFranchiseUsersFailure = (state, { error }) => {
  return {
    ...state,
    exportFranchiseUsers: {
      ...state.exportFranchiseUsers,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_FRANCHISE_USER_LIST_REQUEST]: getFranchiseUserListRequest,
  [Types.GET_FRANCHISE_USER_LIST_SUCCESS]: getFranchiseUserListSuccess,
  [Types.GET_FRANCHISE_USER_LIST_FAILURE]: getFranchiseUserListFailure,
  [Types.EXPORT_FRANCHISE_USERS_REQUEST]: exportFranchiseUsersRequest,
  [Types.EXPORT_FRANCHISE_USERS_SUCCESS]: exportFranchiseUsersSuccess,
  [Types.EXPORT_FRANCHISE_USERS_FAILURE]: exportFranchiseUsersFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
