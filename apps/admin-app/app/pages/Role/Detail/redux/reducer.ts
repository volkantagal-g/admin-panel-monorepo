import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export type State = {
  getRoleById: {
    isPending: boolean;
    data: RoleType;
    error: unknown;
  };
  pageAndComponentPermissionsOfRole: {
    isPending: boolean;
    isRequested: boolean;
    data: PageAndComponentPermissionType[];
  };
  updateRole: {
    isPending: boolean;
    data: RoleType;
    error: unknown;
  };
  updateRoleMemberType: {
    isPending: boolean;
    data: { success: boolean; };
    error: unknown;
  };
  removeUsersFromRole: {
    isPending: boolean;
    data: { success: boolean; };
    error: unknown;
  };
  getRoleUsersForExcelTable: {
    data: UserType[];
    isPending: boolean;
    error: unknown;
  };
  exportAccessGrantedPages: { error: unknown; };
  requestUserRole: {
    isPending: boolean;
    data: RoleRequestType;
    error: unknown;
  };
  userRoleRequests: {
    isPending: boolean;
    data: RoleRequestType[];
    error: unknown;
  };
  reportTagsByRoles: {
    isPending: boolean;
    isRequested: boolean;
    data: ReportType[];
    error: unknown;
  };
  reportTypes: {
    data: {
      reportTypes: ReportType[];
      totalCount: number;
    };
    isPending: boolean;
    error: unknown;
  };
  deleteRole: {
    isPending: boolean;
    error: unknown;
  };
  roleHierarchy: {
    isPending: boolean;
    data: Array<RoleType & { children: RoleType[]; }>;
    error: unknown;
  };
  reportTagReportTypesMap: {};
};

export const INITIAL_STATE: State = {
  getRoleById: {
    isPending: false,
    data: {} as RoleType,
    error: null,
  },
  pageAndComponentPermissionsOfRole: {
    isPending: false,
    isRequested: false,
    data: [],
  },
  updateRole: {
    isPending: false,
    data: {} as RoleType,
    error: null,
  },
  updateRoleMemberType: {
    isPending: false,
    data: { success: false },
    error: null,
  },
  removeUsersFromRole: {
    isPending: false,
    data: { success: false },
    error: null,
  },
  getRoleUsersForExcelTable: {
    data: [],
    isPending: false,
    error: null,
  },
  exportAccessGrantedPages: { error: null },
  requestUserRole: {
    isPending: false,
    data: {} as RoleRequestType,
    error: null,
  },
  userRoleRequests: {
    isPending: false,
    data: [],
    error: null,
  },
  reportTagsByRoles: {
    isPending: false,
    isRequested: false,
    data: [],
    error: null,
  },
  reportTypes: {
    data: {
      reportTypes: [],
      totalCount: 0,
    },
    isPending: false,
    error: null,
  },
  deleteRole: {
    isPending: false,
    error: null,
  },
  roleHierarchy: {
    isPending: false,
    data: [],
    error: null,
  },
  reportTagReportTypesMap: {},
};

export const getRoleUsersForExcelTableRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getRoleUsersForExcelTable: {
      ...INITIAL_STATE.getRoleUsersForExcelTable,
      isPending: true,
    },
  };
};

export const getRoleUsersForExcelTableSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getRoleUsersForExcelTable: {
      ...INITIAL_STATE.getRoleUsersForExcelTable,
      data,
      isPending: false,
    },
  };
};

export const getRoleUsersForExcelTableFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getRoleUsersForExcelTable: {
      ...INITIAL_STATE.getRoleUsersForExcelTable,
      isPending: false,
      error,
    },
  };
};

export const getRoleByIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getRoleById: {
      ...INITIAL_STATE.getRoleById,
      isPending: true,
    },
  };
};

export const getRoleByIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getRoleById: {
      ...INITIAL_STATE.getRoleById,
      data,
      isPending: false,
    },
  };
};

export const getRoleByIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getRoleById: {
      ...INITIAL_STATE.getRoleById,
      isPending: false,
      error,
    },
  };
};

export const updateRoleRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateRole: {
      ...INITIAL_STATE.updateRole,
      isPending: true,
    },
  };
};

export const updateRoleSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateRole: {
      ...INITIAL_STATE.updateRole,
      data,
      isPending: false,
    },
  };
};

export const updateRoleFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateRole: {
      ...INITIAL_STATE.updateRole,
      isPending: false,
      error,
    },
  };
};

export const updateRoleMemberTypeRequest = state => {
  return {
    ...state,
    updateRoleMemberType: {
      ...state.updateRoleMemberType,
      isPending: true,
    },
  };
};

export const updateRoleMemberTypeSuccess = (state, { data }) => {
  return {
    ...state,
    updateRoleMemberType: {
      ...state.updateRoleMemberType,
      data,
      isPending: false,
    },
  };
};

export const updateRoleMemberTypeFailure = (state, { error }) => {
  return {
    ...state,
    updateRoleMemberType: {
      ...state.updateRoleMemberType,
      isPending: false,
      error,
    },
  };
};

export const removeUsersFromRoleRequest = state => {
  return {
    ...state,
    removeUsersFromRole: {
      ...state.removeUsersFromRole,
      isPending: true,
    },
  };
};

export const removeUsersFromRoleSuccess = (state, { data }) => {
  return {
    ...state,
    removeUsersFromRole: {
      ...state.removeUsersFromRole,
      data,
      isPending: false,
    },
  };
};

export const removeUsersFromRoleFailure = (state, { error }) => {
  return {
    ...state,
    removeUsersFromRole: {
      ...state.removeUsersFromRole,
      isPending: false,
      error,
    },
  };
};

export const getPageAndComponentPermissionsOfRoleRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    pageAndComponentPermissionsOfRole: {
      ...state.pageAndComponentPermissionsOfRole,
      isPending: true,
    },
  };
};

export const getPageAndComponentPermissionsOfRoleSuccess = (state = INITIAL_STATE, { data = [] }) => {
  return {
    ...state,
    pageAndComponentPermissionsOfRole: {
      ...state.pageAndComponentPermissionsOfRole,
      data,
      isPending: false,
      isRequested: true,
    },
  };
};

export const getPageAndComponentPermissionsOfRoleFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    pageAndComponentPermissionsOfRole: {
      ...state.pageAndComponentPermissionsOfRole,
      isPending: false,
      isRequested: false,
    },
  };
};

export const getPageAndComponentPermissionsOfRoleReset = state => ({
  ...state,
  pageAndComponentPermissionsOfRole: { ...INITIAL_STATE.pageAndComponentPermissionsOfRole },
});

const exportAccessGrantedPagesFailure = (state = INITIAL_STATE, { error = {} }) => ({
  ...state,
  exportAccessGrantedPages: {
    ...state.exportAccessGrantedPages,
    error,
  },
});

export const requestUserRoleRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    requestUserRole: {
      ...INITIAL_STATE.requestUserRole,
      isPending: true,
    },
  };
};

export const requestUserRoleSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    requestUserRole: {
      ...INITIAL_STATE.requestUserRole,
      data,
      isPending: false,
    },
  };
};

export const requestUserRoleFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    requestUserRole: {
      ...INITIAL_STATE.requestUserRole,
      isPending: false,
      error,
    },
  };
};

export const getUserRoleRequestsRequest = (state = INITIAL_STATE) => ({
  ...state,
  userRoleRequests: {
    ...INITIAL_STATE.userRoleRequests,
    isPending: true,
  },
});

export const getUserRoleRequestsSuccess = (state = INITIAL_STATE, { roleRequests }) => ({
  ...state,
  userRoleRequests: {
    ...INITIAL_STATE.userRoleRequests,
    isPending: false,
    data: roleRequests,
  },
});

export const getUserRoleRequestsFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  userRoleRequests: {
    ...INITIAL_STATE.userRoleRequests,
    isPending: false,
    error,
  },
});

export const getReportTagsByRolesRequest = (state = INITIAL_STATE) => ({
  ...state,
  reportTagsByRoles: {
    ...INITIAL_STATE.reportTagsByRoles,
    isPending: true,
    isRequested: true,
  },
});

export const getReportTagsByRolesSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  reportTagsByRoles: {
    ...INITIAL_STATE.reportTagsByRoles,
    isPending: false,
    isRequested: true,
    data,
  },
});

export const getReportTagsByRolesFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  reportTagsByRoles: {
    ...INITIAL_STATE.reportTagsByRoles,
    isPending: false,
    isRequested: true,
    error,
  },
});

export const getReportTagsByRolesReset = state => ({
  ...state,
  reportTagsByRoles: { ...INITIAL_STATE.reportTagsByRoles },
});

const getReportTypesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    reportTypes: {
      ...state.reportTypes,
      isPending: true,
    },
  };
};

const getReportTypesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    reportTypes: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const getReportTypesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    reportTypes: {
      data: [],
      error,
      isPending: false,
    },
  };
};

const updateReportTagReportTypesMap = (state = INITIAL_STATE, { request, response, isPending }) => {
  const { filter: { reportTag } = {} } = request;
  const { reportTypes } = response || {};
  return {
    ...state,
    reportTagReportTypesMap: {
      ...state.reportTagReportTypesMap,
      [reportTag]: {
        reportTypes,
        isPending,
      },
    },
  };
};

export const deleteRoleRequest = state => {
  return {
    ...state,
    deleteRole: {
      ...state.deleteRole,
      isPending: true,
      error: false,
    },
  };
};

export const deleteRoleSuccess = state => {
  return {
    ...state,
    deleteRole: {
      ...state.deleteRole,
      isPending: false,
    },
  };
};

export const deleteRoleFailure = (state, { error }) => {
  return {
    ...state,
    deleteRole: {
      ...state.deleteRole,
      isPending: false,
      error,
    },
  };
};

export const getRoleHierarchyRequest = state => {
  return {
    ...state,
    roleHierarchy: {
      ...state.roleHierarchy,
      isPending: true,
      error: false,
    },
  };
};

export const getRoleHierarchySuccess = (state, { data }) => {
  return {
    ...state,
    roleHierarchy: {
      ...state.roleHierarchy,
      data,
      isPending: false,
    },
  };
};

export const getRoleHierarchyFailure = (state, { error }) => {
  return {
    ...state,
    roleHierarchy: {
      ...state.roleHierarchy,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_ROLE_BY_ID_REQUEST]: getRoleByIdRequest,
  [Types.GET_ROLE_BY_ID_SUCCESS]: getRoleByIdSuccess,
  [Types.GET_ROLE_BY_ID_FAILURE]: getRoleByIdFailure,
  [Types.GET_PAGE_AND_COMPONENT_PERMISSIONS_OF_ROLE_REQUEST]: getPageAndComponentPermissionsOfRoleRequest,
  [Types.GET_PAGE_AND_COMPONENT_PERMISSIONS_OF_ROLE_SUCCESS]: getPageAndComponentPermissionsOfRoleSuccess,
  [Types.GET_PAGE_AND_COMPONENT_PERMISSIONS_OF_ROLE_FAILURE]: getPageAndComponentPermissionsOfRoleFailure,
  [Types.GET_PAGE_AND_COMPONENT_PERMISSIONS_OF_ROLE_FAILURE]: getPageAndComponentPermissionsOfRoleReset,
  [Types.UPDATE_ROLE_REQUEST]: updateRoleRequest,
  [Types.UPDATE_ROLE_SUCCESS]: updateRoleSuccess,
  [Types.UPDATE_ROLE_FAILURE]: updateRoleFailure,
  [Types.UPDATE_ROLE_MEMBER_TYPE_REQUEST]: updateRoleMemberTypeRequest,
  [Types.UPDATE_ROLE_MEMBER_TYPE_SUCCESS]: updateRoleMemberTypeSuccess,
  [Types.UPDATE_ROLE_MEMBER_TYPE_FAILURE]: updateRoleMemberTypeFailure,
  [Types.REMOVE_USERS_FROM_ROLE_REQUEST]: removeUsersFromRoleRequest,
  [Types.REMOVE_USERS_FROM_ROLE_SUCCESS]: removeUsersFromRoleSuccess,
  [Types.REMOVE_USERS_FROM_ROLE_FAILURE]: removeUsersFromRoleFailure,
  [Types.EXPORT_ACCESS_GRANTED_PAGES_EXCEL_FAILURE]: exportAccessGrantedPagesFailure,
  [Types.REQUEST_USER_ROLE_REQUEST]: requestUserRoleRequest,
  [Types.REQUEST_USER_ROLE_SUCCESS]: requestUserRoleSuccess,
  [Types.REQUEST_USER_ROLE_FAILURE]: requestUserRoleFailure,
  [Types.GET_USER_ROLE_REQUESTS_REQUEST]: getUserRoleRequestsRequest,
  [Types.GET_USER_ROLE_REQUESTS_SUCCESS]: getUserRoleRequestsSuccess,
  [Types.GET_USER_ROLE_REQUESTS_FAILURE]: getUserRoleRequestsFailure,
  [Types.GET_REPORT_TAGS_BY_ROLES_REQUEST]: getReportTagsByRolesRequest,
  [Types.GET_REPORT_TAGS_BY_ROLES_SUCCESS]: getReportTagsByRolesSuccess,
  [Types.GET_REPORT_TAGS_BY_ROLES_FAILURE]: getReportTagsByRolesFailure,
  [Types.GET_REPORT_TAGS_BY_ROLES_RESET]: getReportTagsByRolesReset,
  [Types.GET_REPORT_TYPES_REQUEST]: getReportTypesRequest,
  [Types.GET_REPORT_TYPES_SUCCESS]: getReportTypesSuccess,
  [Types.GET_REPORT_TYPES_FAILURE]: getReportTypesFailure,
  [Types.DELETE_ROLE_REQUEST]: deleteRoleRequest,
  [Types.DELETE_ROLE_SUCCESS]: deleteRoleSuccess,
  [Types.DELETE_ROLE_FAILURE]: deleteRoleFailure,
  [Types.UPDATE_REPORT_TAG_REPORT_TYPES_MAP]: updateReportTagReportTypesMap,
  [Types.GET_ROLE_HIERARCHY_REQUEST]: getRoleHierarchyRequest,
  [Types.GET_ROLE_HIERARCHY_SUCCESS]: getRoleHierarchySuccess,
  [Types.GET_ROLE_HIERARCHY_FAILURE]: getRoleHierarchyFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
