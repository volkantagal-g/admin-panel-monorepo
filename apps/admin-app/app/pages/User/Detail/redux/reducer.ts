import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getUserById: {
    isPending: false,
    data: {},
    error: null,
  },
  updateUser: {
    isPending: false,
    data: {},
    error: null,
  },
  activateUser: {
    isPending: false,
    data: {},
    error: null,
  },
  inActivateUser: {
    isPending: false,
    data: {},
    error: null,
  },
  addRolesToUser: {
    isPending: false,
    data: {},
    error: null,
  },
  updateRoleMemberType: {
    isPending: false,
    data: {},
    error: null,
  },
  deleteRoleMembership: {
    isPending: false,
    data: {},
    error: null,
  },
  userTotalPermissions: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const getUserByIdRequest = state => {
  return {
    ...state,
    getUserById: {
      ...INITIAL_STATE.getUserById,
      isPending: true,
    },
  };
};

export const getUserByIdSuccess = (state, { data }) => {
  return {
    ...state,
    getUserById: {
      ...INITIAL_STATE.getUserById,
      data,
      isPending: false,
    },
  };
};

export const getUserByIdFailure = (state, { error }) => {
  return {
    ...state,
    getUserById: {
      ...INITIAL_STATE.getUserById,
      isPending: false,
      error,
    },
  };
};

export const updateUserRequest = state => {
  return {
    ...state,
    updateUser: {
      ...INITIAL_STATE.updateUser,
      isPending: true,
    },
  };
};

export const updateUserSuccess = (state, { data }) => {
  return {
    ...state,
    updateUser: {
      ...INITIAL_STATE.updateUser,
      data,
      isPending: false,
    },
  };
};

export const updateUserFailure = (state, { error }) => {
  return {
    ...state,
    updateUser: {
      ...INITIAL_STATE.updateUser,
      isPending: false,
      error,
    },
  };
};

export const activateUserRequest = state => {
  return {
    ...state,
    activateUser: {
      ...INITIAL_STATE.activateUser,
      isPending: true,
    },
  };
};

export const activateUserSuccess = (state, { data }) => {
  return {
    ...state,
    activateUser: {
      ...INITIAL_STATE.activateUser,
      data,
      isPending: false,
    },
  };
};

export const activateUserFailure = (state, { error }) => {
  return {
    ...state,
    activateUser: {
      ...INITIAL_STATE.activateUser,
      isPending: false,
      error,
    },
  };
};

export const inActivateUserRequest = state => {
  return {
    ...state,
    inActivateUser: {
      ...INITIAL_STATE.inActivateUser,
      isPending: true,
    },
  };
};

export const inActivateUserSuccess = (state, { data }) => {
  return {
    ...state,
    inActivateUser: {
      ...INITIAL_STATE.inActivateUser,
      data,
      isPending: false,
    },
  };
};

export const inActivateUserFailure = (state, { error }) => {
  return {
    ...state,
    inActivateUser: {
      ...INITIAL_STATE.inActivateUser,
      isPending: false,
      error,
    },
  };
};

export const addRolesToUserRequest = state => {
  return {
    ...state,
    addRolesToUser: {
      ...state.addRolesToUser,
      isPending: true,
    },
  };
};

export const addRolesToUserSuccess = (state, { data }) => {
  return {
    ...state,
    addRolesToUser: {
      ...state.addRolesToUser,
      data,
      isPending: false,
    },
  };
};

export const addRolesToUserFailure = (state, { error }) => {
  return {
    ...state,
    addRolesToUser: {
      ...state.addRolesToUser,
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

export const deleteRoleMembershipRequest = state => {
  return {
    ...state,
    deleteRoleMembership: {
      ...state.deleteRoleMembership,
      isPending: true,
    },
  };
};

export const deleteRoleMembershipSuccess = (state, { data }) => {
  return {
    ...state,
    deleteRoleMembership: {
      ...state.deleteRoleMembership,
      data,
      isPending: false,
    },
  };
};

export const deleteRoleMembershipFailure = (state, { error }) => {
  return {
    ...state,
    deleteRoleMembership: {
      ...state.deleteRoleMembership,
      isPending: false,
      error,
    },
  };
};

const getUserTotalPermissionsRequest = state => {
  return {
    ...state,
    userTotalPermissions: {
      ...state.userTotalPermissions,
      isPending: true,
    },
  };
};

const getUserTotalPermissionsSuccess = (state, { data }) => {
  return {
    ...state,
    userTotalPermissions: {
      ...state.userTotalPermissions,
      data,
      isPending: false,
    },
  };
};

const getUserTotalPermissionsFailure = (state, { error }) => {
  return {
    ...state,
    userTotalPermissions: {
      ...state.userTotalPermissions,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_USER_BY_ID_REQUEST]: getUserByIdRequest,
  [Types.GET_USER_BY_ID_SUCCESS]: getUserByIdSuccess,
  [Types.GET_USER_BY_ID_FAILURE]: getUserByIdFailure,
  [Types.UPDATE_USER_REQUEST]: updateUserRequest,
  [Types.UPDATE_USER_SUCCESS]: updateUserSuccess,
  [Types.UPDATE_USER_FAILURE]: updateUserFailure,
  [Types.ACTIVATE_USER_REQUEST]: activateUserRequest,
  [Types.ACTIVATE_USER_SUCCESS]: activateUserSuccess,
  [Types.ACTIVATE_USER_FAILURE]: activateUserFailure,
  [Types.IN_ACTIVATE_USER_REQUEST]: inActivateUserRequest,
  [Types.IN_ACTIVATE_USER_SUCCESS]: inActivateUserSuccess,
  [Types.IN_ACTIVATE_USER_FAILURE]: inActivateUserFailure,
  [Types.ADD_ROLES_TO_USER_REQUEST]: addRolesToUserRequest,
  [Types.ADD_ROLES_TO_USER_SUCCESS]: addRolesToUserSuccess,
  [Types.ADD_ROLES_TO_USER_FAILURE]: addRolesToUserFailure,
  [Types.UPDATE_ROLE_MEMBER_TYPE_REQUEST]: updateRoleMemberTypeRequest,
  [Types.UPDATE_ROLE_MEMBER_TYPE_SUCCESS]: updateRoleMemberTypeSuccess,
  [Types.UPDATE_ROLE_MEMBER_TYPE_FAILURE]: updateRoleMemberTypeFailure,
  [Types.DELETE_ROLE_MEMBERSHIP_REQUEST]: deleteRoleMembershipRequest,
  [Types.DELETE_ROLE_MEMBERSHIP_SUCCESS]: deleteRoleMembershipSuccess,
  [Types.DELETE_ROLE_MEMBERSHIP_FAILURE]: deleteRoleMembershipFailure,
  [Types.GET_USER_TOTAL_PERMISSIONS_REQUEST]: getUserTotalPermissionsRequest,
  [Types.GET_USER_TOTAL_PERMISSIONS_SUCCESS]: getUserTotalPermissionsSuccess,
  [Types.GET_USER_TOTAL_PERMISSIONS_FAILURE]: getUserTotalPermissionsFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
