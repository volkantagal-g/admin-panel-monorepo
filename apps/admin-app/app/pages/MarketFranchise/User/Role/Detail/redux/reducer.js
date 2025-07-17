import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  franchiseUserRoleDetail: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getFranchiseUserRoleDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    franchiseUserRoleDetail: {
      ...state.franchiseUserRoleDetail,
      isPending: true,
    },
  };
};

export const getFranchiseUserRoleDetailSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    franchiseUserRoleDetail: {
      ...state.franchiseUserRoleDetail,
      data,
      isPending: false,
    },
  };
};

export const getFranchiseUserRoleDetailFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    franchiseUserRoleDetail: {
      ...state.franchiseUserRoleDetail,
      isPending: false,
      error,
    },
  };
};

export const updateFranchiseUserRoleRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    franchiseUserRoleDetail: {
      ...state.franchiseUserRoleDetail,
      isPending: true,
    },
  };
};

export const updateFranchiseUserRoleFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    franchiseUserRoleDetail: {
      ...state.franchiseUserRoleDetail,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_FRANCHISE_USER_ROLE_DETAIL_REQUEST]: getFranchiseUserRoleDetailRequest,
  [Types.GET_FRANCHISE_USER_ROLE_DETAIL_SUCCESS]: getFranchiseUserRoleDetailSuccess,
  [Types.GET_FRANCHISE_USER_ROLE_DETAIL_FAILURE]: getFranchiseUserRoleDetailFailure,
  [Types.UPDATE_FRANCHISE_USER_ROLE_REQUEST]: updateFranchiseUserRoleRequest,
  [Types.UPDATE_FRANCHISE_USER_ROLE_FAILURE]: updateFranchiseUserRoleFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
