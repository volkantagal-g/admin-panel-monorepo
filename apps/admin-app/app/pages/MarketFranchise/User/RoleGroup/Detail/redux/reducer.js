import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  franchiseUserRoleGroupDetail: {
    data: {},
    isPending: false,
    error: null,
  },
  franchiseUserRoleList: {
    data: [],
    isPending: false,
    error: null,
  },
  franchiseReportList: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getFranchiseUserRoleGroupDetailRequest = state => {
  return {
    ...state,
    franchiseUserRoleGroupDetail: {
      ...state.franchiseUserRoleGroupDetail,
      isPending: true,
    },
  };
};

export const getFranchiseUserRoleGroupDetailSuccess = (state, { data }) => {
  return {
    ...state,
    franchiseUserRoleGroupDetail: {
      ...state.franchiseUserRoleGroupDetail,
      data,
      isPending: false,
    },
  };
};

export const getFranchiseUserRoleGroupDetailFailure = (state, { error }) => {
  return {
    ...state,
    franchiseUserRoleGroupDetail: {
      ...state.franchiseUserRoleGroupDetail,
      isPending: false,
      error,
    },
  };
};

export const updateFranchiseUserRoleGroupRequest = state => {
  return {
    ...state,
    franchiseUserRoleGroupDetail: {
      ...state.franchiseUserRoleGroupDetail,
      isPending: true,
    },
  };
};

export const updateFranchiseUserRoleGroupFailure = (state, { error }) => {
  return {
    ...state,
    franchiseUserRoleGroupDetail: {
      ...state.franchiseUserRoleGroupDetail,
      isPending: false,
      error,
    },
  };
};

export const getFranchiseUserRoleListRequest = state => {
  return {
    ...state,
    franchiseUserRoleList: {
      ...state.franchiseUserRoleList,
      isPending: true,
    },
  };
};

export const getFranchiseUserRoleListSuccess = (state, { data }) => {
  return {
    ...state,
    franchiseUserRoleList: {
      ...state.franchiseUserRoleList,
      data,
      isPending: false,
    },
  };
};

export const getFranchiseUserRoleListFailure = (state, { error }) => {
  return {
    ...state,
    franchiseUserRoleList: {
      ...state.franchiseUserRoleList,
      isPending: false,
      error,
    },
  };
};

export const getFranchiseReportListRequest = state => {
  return {
    ...state,
    franchiseReportList: {
      ...state.franchiseReportList,
      isPending: true,
    },
  };
};

export const getFranchiseReportListSuccess = (state, { data }) => {
  return {
    ...state,
    franchiseReportList: {
      ...state.franchiseReportList,
      data,
      isPending: false,
    },
  };
};

export const getFranchiseReportListFailure = (state, { error }) => {
  return {
    ...state,
    franchiseReportList: {
      ...state.franchiseReportList,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_FRANCHISE_USER_ROLE_GROUP_DETAIL_REQUEST]: getFranchiseUserRoleGroupDetailRequest,
  [Types.GET_FRANCHISE_USER_ROLE_GROUP_DETAIL_SUCCESS]: getFranchiseUserRoleGroupDetailSuccess,
  [Types.GET_FRANCHISE_USER_ROLE_GROUP_DETAIL_FAILURE]: getFranchiseUserRoleGroupDetailFailure,
  [Types.UPDATE_FRANCHISE_USER_ROLE_GROUP_REQUEST]: updateFranchiseUserRoleGroupRequest,
  [Types.UPDATE_FRANCHISE_USER_ROLE_GROUP_FAILURE]: updateFranchiseUserRoleGroupFailure,
  [Types.GET_FRANCHISE_USER_ROLE_LIST_REQUEST]: getFranchiseUserRoleListRequest,
  [Types.GET_FRANCHISE_USER_ROLE_LIST_SUCCESS]: getFranchiseUserRoleListSuccess,
  [Types.GET_FRANCHISE_USER_ROLE_LIST_FAILURE]: getFranchiseUserRoleListFailure,
  [Types.GET_FRANCHISE_REPORT_LIST_REQUEST]: getFranchiseReportListRequest,
  [Types.GET_FRANCHISE_REPORT_LIST_SUCCESS]: getFranchiseReportListSuccess,
  [Types.GET_FRANCHISE_REPORT_LIST_FAILURE]: getFranchiseReportListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
