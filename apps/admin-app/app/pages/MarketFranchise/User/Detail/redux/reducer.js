import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  franchiseUserDetail: {
    data: {},
    isPending: false,
    error: null,
  },
  updateFranchiseUser: {
    isPending: false,
    isSuccess: false,
    error: null,
  },
  roleGroups: {
    data: [],
    isPending: false,
    error: null,
  },
  updateFranchiseUserRoleGroups: {
    isPending: false,
    isSuccess: false,
    error: null,
  },
  franchises: {
    data: [],
    isPending: false,
    error: null,
  },
  updateFranchiseUserFranchise: {
    isPending: false,
    isSuccess: false,
    error: null,
  },
  roles: {
    data: [],
    isPending: false,
    error: null,
  },
  updateFranchiseUserRole: {
    isPending: false,
    isSuccess: false,
    error: null,
  },
  reports: {
    data: [],
    isPending: false,
    error: null,
  },
  updateFranchiseUserReports: {
    isPending: false,
    isSuccess: false,
    error: null,
  },
};

export const getFranchiseUserDetailRequest = state => {
  return {
    ...state,
    franchiseUserDetail: {
      ...state.franchiseUserDetail,
      isPending: true,
    },
  };
};

export const getFranchiseUserDetailSuccess = (state, { data = {} }) => {
  return {
    ...state,
    franchiseUserDetail: {
      ...state.franchiseUserDetail,
      data: {
        ...state.franchiseUserDetail.data,
        ...data,
      },
      isPending: false,
    },
  };
};

export const getFranchiseUserDetailFailure = (state, { error }) => {
  return {
    ...state,
    franchiseUserDetail: {
      ...state.franchiseUserDetail,
      isPending: false,
      error,
    },
  };
};

export const updateFranchiseUserRequest = state => {
  return {
    ...state,
    updateFranchiseUser: {
      ...state.updateFranchiseUser,
      isPending: true,
      isSuccess: false,
    },
  };
};

export const updateFranchiseUserSuccess = state => {
  return {
    ...state,
    updateFranchiseUser: {
      ...state.updateFranchiseUser,
      isPending: false,
      isSuccess: true,
    },
  };
};

export const updateFranchiseUserFailure = (state, { error }) => {
  return {
    ...state,
    updateFranchiseUser: {
      ...state.updateFranchiseUser,
      isPending: false,
      isSuccess: false,
      error,
    },
  };
};

export const getRoleGroupsRequest = state => {
  return {
    ...state,
    roleGroups: {
      ...state.roleGroups,
      isPending: true,
    },
  };
};

export const getRoleGroupsSuccess = (state, { data = [] }) => {
  return {
    ...state,
    roleGroups: {
      ...state.roleGroups,
      data,
      isPending: false,
    },
  };
};

export const getRoleGroupsFailure = (state, { error }) => {
  return {
    ...state,
    roleGroups: {
      ...state.roleGroups,
      isPending: false,
      error,
    },
  };
};

export const updateFranchiseUserRoleGroupsRequest = state => {
  return {
    ...state,
    updateFranchiseUserRoleGroups: {
      ...state.updateFranchiseUserRoleGroups,
      isPending: true,
      isSuccess: false,
    },
  };
};

export const updateFranchiseUserRoleGroupsSuccess = state => {
  return {
    ...state,
    updateFranchiseUserRoleGroups: {
      ...state.updateFranchiseUserRoleGroups,
      isPending: false,
      isSuccess: true,
    },
  };
};

export const updateFranchiseUserRoleGroupsFailure = (state, { error }) => {
  return {
    ...state,
    updateFranchiseUserRoleGroups: {
      ...state.updateFranchiseUserRoleGroups,
      isPending: false,
      isSuccess: false,
      error,
    },
  };
};

export const getFranchisesRequest = state => {
  return {
    ...state,
    franchises: {
      ...state.franchises,
      isPending: true,
    },
  };
};

export const getFranchisesSuccess = (state, { data = [] }) => {
  return {
    ...state,
    franchises: {
      ...state.franchises,
      data,
      isPending: false,
    },
  };
};

export const getFranchisesFailure = (state, { error }) => {
  return {
    ...state,
    roleGroups: {
      ...state.roleGroups,
      isPending: false,
      error,
    },
  };
};

export const updateFranchiseUserFranchiseRequest = state => {
  return {
    ...state,
    updateFranchiseUserFranchise: {
      ...state.updateFranchiseUserFranchise,
      isPending: true,
      isSuccess: false,
    },
  };
};

export const updateFranchiseUserFranchiseSuccess = state => {
  return {
    ...state,
    updateFranchiseUserFranchise: {
      ...state.updateFranchiseUserFranchise,
      isPending: false,
      isSuccess: true,
    },
  };
};

export const updateFranchiseUserFranchiseFailure = (state, { error }) => {
  return {
    ...state,
    updateFranchiseUserFranchise: {
      ...state.updateFranchiseUserFranchise,
      isPending: false,
      isSuccess: false,
      error,
    },
  };
};

export const getRolesRequest = state => {
  return {
    ...state,
    roles: {
      ...state.roles,
      isPending: true,
    },
  };
};

export const getRolesSuccess = (state, { data = [] }) => {
  return {
    ...state,
    roles: {
      ...state.roles,
      data,
      isPending: false,
    },
  };
};

export const getRolesFailure = (state, { error }) => {
  return {
    ...state,
    roles: {
      ...state.roles,
      isPending: false,
      error,
    },
  };
};

export const updateFranchiseUserRoleRequest = state => {
  return {
    ...state,
    updateFranchiseUserRole: {
      ...state.updateFranchiseUserRole,
      isPending: true,
      isSuccess: false,
    },
  };
};

export const updateFranchiseUserRoleSuccess = state => {
  return {
    ...state,
    updateFranchiseUserRole: {
      ...state.updateFranchiseUserRole,
      isPending: false,
      isSuccess: true,
    },
  };
};

export const updateFranchiseUserRoleFailure = (state, { error }) => {
  return {
    ...state,
    updateFranchiseUserRole: {
      ...state.updateFranchiseUserRole,
      isPending: false,
      isSuccess: false,
      error,
    },
  };
};

export const getReportsRequest = state => {
  return {
    ...state,
    reports: {
      ...state.reports,
      isPending: true,
    },
  };
};

export const getReportsSuccess = (state, { data = [] }) => {
  return {
    ...state,
    reports: {
      ...state.reports,
      data,
      isPending: false,
    },
  };
};

export const getReportsFailure = (state, { error }) => {
  return {
    ...state,
    reports: {
      ...state.reports,
      isPending: false,
      error,
    },
  };
};

export const updateFranchiseUserReportsRequest = state => {
  return {
    ...state,
    updateFranchiseUserReports: {
      ...state.updateFranchiseUserReports,
      isPending: true,
      isSuccess: false,
    },
  };
};

export const updateFranchiseUserReportsSuccess = state => {
  return {
    ...state,
    updateFranchiseUserReports: {
      ...state.updateFranchiseUserReports,
      isPending: false,
      isSuccess: true,
    },
  };
};

export const updateFranchiseUserReportsFailure = (state, { error }) => {
  return {
    ...state,
    updateFranchiseUserReports: {
      ...state.updateFranchiseUserReports,
      isPending: false,
      isSuccess: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_FRANCHISE_USER_DETAIL_REQUEST]: getFranchiseUserDetailRequest,
  [Types.GET_FRANCHISE_USER_DETAIL_SUCCESS]: getFranchiseUserDetailSuccess,
  [Types.GET_FRANCHISE_USER_DETAIL_FAILURE]: getFranchiseUserDetailFailure,
  [Types.UPDATE_FRANCHISE_USER_REQUEST]: updateFranchiseUserRequest,
  [Types.UPDATE_FRANCHISE_USER_SUCCESS]: updateFranchiseUserSuccess,
  [Types.UPDATE_FRANCHISE_USER_FAILURE]: updateFranchiseUserFailure,
  [Types.GET_ROLE_GROUPS_REQUEST]: getRoleGroupsRequest,
  [Types.GET_ROLE_GROUPS_SUCCESS]: getRoleGroupsSuccess,
  [Types.GET_ROLE_GROUPS_FAILURE]: getRoleGroupsFailure,
  [Types.UPDATE_FRANCHISE_USER_ROLE_GROUPS_REQUEST]: updateFranchiseUserRoleGroupsRequest,
  [Types.UPDATE_FRANCHISE_USER_ROLE_GROUPS_SUCCESS]: updateFranchiseUserRoleGroupsSuccess,
  [Types.UPDATE_FRANCHISE_USER_ROLE_GROUPS_FAILURE]: updateFranchiseUserRoleGroupsFailure,
  [Types.GET_FRANCHISES_REQUEST]: getFranchisesRequest,
  [Types.GET_FRANCHISES_SUCCESS]: getFranchisesSuccess,
  [Types.GET_FRANCHISES_FAILURE]: getFranchisesFailure,
  [Types.UPDATE_FRANCHISE_USER_FRANCHISE_REQUEST]: updateFranchiseUserFranchiseRequest,
  [Types.UPDATE_FRANCHISE_USER_FRANCHISE_SUCCESS]: updateFranchiseUserFranchiseSuccess,
  [Types.UPDATE_FRANCHISE_USER_FRANCHISE_FAILURE]: updateFranchiseUserFranchiseFailure,
  [Types.GET_ROLES_REQUEST]: getRolesRequest,
  [Types.GET_ROLES_SUCCESS]: getRolesSuccess,
  [Types.GET_ROLES_FAILURE]: getRolesFailure,
  [Types.UPDATE_FRANCHISE_USER_ROLE_REQUEST]: updateFranchiseUserRoleRequest,
  [Types.UPDATE_FRANCHISE_USER_ROLE_SUCCESS]: updateFranchiseUserRoleSuccess,
  [Types.UPDATE_FRANCHISE_USER_ROLE_FAILURE]: updateFranchiseUserRoleFailure,
  [Types.GET_REPORTS_REQUEST]: getReportsRequest,
  [Types.GET_REPORTS_SUCCESS]: getReportsSuccess,
  [Types.GET_REPORTS_FAILURE]: getReportsFailure,
  [Types.UPDATE_FRANCHISE_USER_REPORTS_REQUEST]: updateFranchiseUserReportsRequest,
  [Types.UPDATE_FRANCHISE_USER_REPORTS_SUCCESS]: updateFranchiseUserReportsSuccess,
  [Types.UPDATE_FRANCHISE_USER_REPORTS_FAILURE]: updateFranchiseUserReportsFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
