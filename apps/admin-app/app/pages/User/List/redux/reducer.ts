import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getUsers: {
    data: [],
    isPending: false,
    error: null,
  },
  getUserRoles: {
    data: [],
    isPending: false,
    error: null,
  },
  getUsersForExcelTable: {
    data: [],
    isPending: false,
    error: null,
  },
  getDepartments: {
    data: [],
    isPending: false,
    error: null,
  },
  sortOptions: { name: 1 },
};

export const getUsersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getUsers: {
      ...INITIAL_STATE.getUsers,
      isPending: true,
    },
  };
};

export const getUsersSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getUsers: {
      ...INITIAL_STATE.getUsers,
      data,
      isPending: false,
    },
  };
};

export const getUsersFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getUsers: {
      ...INITIAL_STATE.getUsers,
      isPending: false,
      error,
    },
  };
};

export const getUserRolesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getUserRoles: {
      ...INITIAL_STATE.getUserRoles,
      isPending: true,
    },
  };
};

export const getUserRolesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getUserRoles: {
      ...INITIAL_STATE.getUserRoles,
      data,
      isPending: false,
    },
  };
};

export const getUserRolesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getUserRoles: {
      ...INITIAL_STATE.getUserRoles,
      isPending: false,
      error,
    },
  };
};

export const getUsersForExcelTableRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getUsersForExcelTable: {
      ...INITIAL_STATE.getUsersForExcelTable,
      isPending: true,
    },
  };
};

export const getUsersForExcelTableSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    getUsersForExcelTable: {
      ...INITIAL_STATE.getUsersForExcelTable,
      isPending: false,
    },
  };
};

export const getUsersForExcelTableFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    getUsersForExcelTable: {
      ...INITIAL_STATE.getUsersForExcelTable,
      isPending: false,
      error: true,
    },
  };
};

export const getDepartmentsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getDepartments: {
      ...INITIAL_STATE.getDepartments,
      isPending: true,
    },
  };
};

export const getDepartmentsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getDepartments: {
      ...INITIAL_STATE.getDepartments,
      data,
      isPending: false,
    },
  };
};

export const getDepartmentsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getDepartments: {
      ...INITIAL_STATE.getDepartments,
      isPending: false,
      error,
    },
  };
};

export const setSortOptions = (state, { sortOptions }) => {
  return {
    ...state,
    sortOptions,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_USERS_REQUEST]: getUsersRequest,
  [Types.GET_USERS_SUCCESS]: getUsersSuccess,
  [Types.GET_USERS_FAILURE]: getUsersFailure,
  [Types.GET_USER_ROLES_REQUEST]: getUserRolesRequest,
  [Types.GET_USER_ROLES_SUCCESS]: getUserRolesSuccess,
  [Types.GET_USER_ROLES_FAILURE]: getUserRolesFailure,
  [Types.GET_DEPARTMENTS_REQUEST]: getDepartmentsRequest,
  [Types.GET_DEPARTMENTS_SUCCESS]: getDepartmentsSuccess,
  [Types.GET_DEPARTMENTS_FAILURE]: getDepartmentsFailure,
  [Types.GET_USERS_FOR_EXCEL_TABLE_REQUEST]: getUsersForExcelTableRequest,
  [Types.GET_USERS_FOR_EXCEL_TABLE_SUCCESS]: getUsersForExcelTableSuccess,
  [Types.GET_USERS_FOR_EXCEL_TABLE_FAILURE]: getUsersForExcelTableFailure,
  [Types.SET_SORT_OPTIONS]: setSortOptions,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
