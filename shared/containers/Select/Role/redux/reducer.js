import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  roles: {
    data: [],
    isPending: false,
  },
};

export const getRolesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    roles: {
      ...state.roles,
      isPending: true,
    },
  };
};

export const getRolesSuccess = (state = INITIAL_STATE, { data = [] }) => {
  return {
    ...state,
    roles: {
      ...state.roles,
      data,
      isPending: false,
    },
  };
};

export const getRolesFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    roles: {
      ...state.roles,
      data: [],
      isPending: false,
    },
  };
};

export const clearRolesData = (state = INITIAL_STATE) => {
  return {
    ...state,
    roles: INITIAL_STATE.roles,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_ROLES_REQUEST]: getRolesRequest,
  [Types.GET_ROLES_SUCCESS]: getRolesSuccess,
  [Types.GET_ROLES_FAILURE]: getRolesFailure,
  [Types.CLEAR_ROLES_DATA]: clearRolesData,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
