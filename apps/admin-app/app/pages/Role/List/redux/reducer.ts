import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export type State = {
  exportRolesExcel: { error: unknown; };
  requestRole: { error: unknown; };
  userRoleRequests: {
    isPending: boolean;
    data: RoleRequestType[];
    error: unknown;
  };
  roleRequestsForApprovalByRoleOwner: {
    isPending: boolean;
    data: RoleRequestType[];
    error: unknown;
  };
  roleRequestById: {
    isPending: boolean;
    data: RoleRequestType;
    error: unknown;
  };
  cancelRoleRequest: { error: unknown; };
  approveRoleRequest: { error: unknown; };
  rejectRoleRequest: { error: unknown; };
  extendedUserInfo: {
    isPending: boolean;
    data: UserType & { supervisor: UserType; };
    error: unknown;
  };
  teammateRoles: {
    isPending: boolean;
    data: RoleType[];
    error: unknown;
  };
};
export const INITIAL_STATE: State = {
  exportRolesExcel: { error: null },
  requestRole: { error: null },
  userRoleRequests: {
    isPending: false,
    data: [],
    error: null,
  },
  roleRequestsForApprovalByRoleOwner: {
    isPending: false,
    data: [],
    error: null,
  },
  roleRequestById: {
    isPending: false,
    data: {} as RoleRequestType,
    error: null,
  },
  cancelRoleRequest: { error: null },
  approveRoleRequest: { error: null },
  rejectRoleRequest: { error: null },
  extendedUserInfo: {
    isPending: false,
    data: {} as UserType & { supervisor: UserType; },
    error: null,
  },
  teammateRoles: {
    isPending: false,
    data: [],
    error: null,
  },
};

const exportRolesExcel = {
  failure: (state = INITIAL_STATE, { error = {} }) => ({
    ...state,
    exportRolesExcel: {
      ...state.exportRolesExcel,
      error,
    },
  }),
};

export const requestRoleRequest = (state = INITIAL_STATE) => ({
  ...state,
  requestRole: { ...INITIAL_STATE.requestRole },
});

export const requestRoleFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  requestRole: { ...INITIAL_STATE.requestRole, error },
});

export const getUserRoleRequestsRequest = (state = INITIAL_STATE) => ({
  ...state,
  userRoleRequests: { ...INITIAL_STATE.userRoleRequests, isPending: true },
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

export const getRoleRequestsForApprovalByRoleOwnerRequest = (state = INITIAL_STATE) => ({
  ...state,
  roleRequestsForApprovalByRoleOwner: { ...INITIAL_STATE.roleRequestsForApprovalByRoleOwner, isPending: true },
});

export const getRoleRequestsForApprovalByRoleOwnerSuccess = (state = INITIAL_STATE, { roleRequests }) => ({
  ...state,
  roleRequestsForApprovalByRoleOwner: {
    ...INITIAL_STATE.roleRequestsForApprovalByRoleOwner,
    isPending: false,
    data: roleRequests,
  },
});

export const getRoleRequestsForApprovalByRoleOwnerFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  roleRequestsForApprovalByRoleOwner: {
    ...INITIAL_STATE.roleRequestsForApprovalByRoleOwner,
    isPending: false,
    error,
  },
});

export const getRoleRequestByIdRequest = (state = INITIAL_STATE) => ({
  ...state,
  roleRequestById: { ...INITIAL_STATE.roleRequestById, isPending: true },
});

export const getRoleRequestByIdSuccess = (state = INITIAL_STATE, { roleRequest }) => ({
  ...state,
  roleRequestById: {
    ...INITIAL_STATE.roleRequestById,
    isPending: false,
    data: roleRequest,
  },
});

export const getRoleRequestByIdFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  roleRequestById: {
    ...INITIAL_STATE.roleRequestById,
    isPending: false,
    error,
  },
});

export const cancelRoleRequestRequest = (state = INITIAL_STATE) => ({
  ...state,
  cancelRoleRequest: { ...INITIAL_STATE.cancelRoleRequest },
});

export const cancelRoleRequestFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  cancelRoleRequest: { ...INITIAL_STATE.cancelRoleRequest, error },
});

export const approveRoleRequestRequest = (state = INITIAL_STATE) => ({
  ...state,
  approveRoleRequest: { ...INITIAL_STATE.approveRoleRequest },
});

export const approveRoleRequestFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  approveRoleRequest: { ...INITIAL_STATE.approveRoleRequest, error },
});

export const rejectRoleRequestRequest = (state = INITIAL_STATE) => ({
  ...state,
  rejectRoleRequest: { ...INITIAL_STATE.rejectRoleRequest },
});

export const rejectRoleRequestFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  rejectRoleRequest: { ...INITIAL_STATE.rejectRoleRequest, error },
});

export const getExtendedUserInfoRequest = (state = INITIAL_STATE) => ({
  ...state,
  extendedUserInfo: { ...INITIAL_STATE.extendedUserInfo, isPending: true },
});

export const getExtendedUserInfoSuccess = (state = INITIAL_STATE, { user }) => ({
  ...state,
  extendedUserInfo: {
    ...INITIAL_STATE.extendedUserInfo,
    isPending: false,
    data: user,
  },
});

export const getExtendedUserInfoFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  extendedUserInfo: {
    ...INITIAL_STATE.extendedUserInfo,
    isPending: false,
    error,
  },
});

export const getRolesOfTeammatesRequest = (state = INITIAL_STATE) => ({
  ...state,
  teammateRoles: { ...INITIAL_STATE.teammateRoles, isPending: true },
});

export const getRolesOfTeammatesSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  teammateRoles: {
    ...INITIAL_STATE.teammateRoles,
    isPending: false,
    data,
  },
});

export const getRolesOfTeammatesFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  teammateRoles: {
    ...INITIAL_STATE.teammateRoles,
    isPending: false,
    error,
  },
});

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.EXPORT_ROLES_EXCEL_FAILURE]: exportRolesExcel.failure,
  [Types.REQUEST_ROLE_REQUEST]: requestRoleRequest,
  [Types.REQUEST_ROLE_FAILURE]: requestRoleFailure,
  [Types.GET_USER_ROLE_REQUESTS_REQUEST]: getUserRoleRequestsRequest,
  [Types.GET_USER_ROLE_REQUESTS_SUCCESS]: getUserRoleRequestsSuccess,
  [Types.GET_USER_ROLE_REQUESTS_FAILURE]: getUserRoleRequestsFailure,
  [Types.GET_ROLE_REQUESTS_FOR_APPROVAL_BY_ROLE_OWNER_REQUEST]: getRoleRequestsForApprovalByRoleOwnerRequest,
  [Types.GET_ROLE_REQUESTS_FOR_APPROVAL_BY_ROLE_OWNER_SUCCESS]: getRoleRequestsForApprovalByRoleOwnerSuccess,
  [Types.GET_ROLE_REQUESTS_FOR_APPROVAL_BY_ROLE_OWNER_FAILURE]: getRoleRequestsForApprovalByRoleOwnerFailure,
  [Types.GET_ROLE_REQUEST_BY_ID_REQUEST]: getRoleRequestByIdRequest,
  [Types.GET_ROLE_REQUEST_BY_ID_SUCCESS]: getRoleRequestByIdSuccess,
  [Types.GET_ROLE_REQUEST_BY_ID_FAILURE]: getRoleRequestByIdFailure,
  [Types.CANCEL_ROLE_REQUEST_REQUEST]: cancelRoleRequestRequest,
  [Types.CANCEL_ROLE_REQUEST_FAILURE]: cancelRoleRequestFailure,
  [Types.APPROVE_ROLE_REQUEST_REQUEST]: approveRoleRequestRequest,
  [Types.APPROVE_ROLE_REQUEST_FAILURE]: approveRoleRequestFailure,
  [Types.REJECT_ROLE_REQUEST_REQUEST]: rejectRoleRequestRequest,
  [Types.REJECT_ROLE_REQUEST_FAILURE]: rejectRoleRequestFailure,
  [Types.GET_EXTENDED_USER_INFO_REQUEST]: getExtendedUserInfoRequest,
  [Types.GET_EXTENDED_USER_INFO_SUCCESS]: getExtendedUserInfoSuccess,
  [Types.GET_EXTENDED_USER_INFO_FAILURE]: getExtendedUserInfoFailure,
  [Types.GET_ROLES_OF_TEAMMATES_REQUEST]: getRolesOfTeammatesRequest,
  [Types.GET_ROLES_OF_TEAMMATES_SUCCESS]: getRolesOfTeammatesSuccess,
  [Types.GET_ROLES_OF_TEAMMATES_FAILURE]: getRolesOfTeammatesFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
