import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export type State = {
  createRole: {
    isPending: boolean;
    data: RoleType;
    error: unknown;
  };
};
export const INITIAL_STATE: State = {
  createRole: {
    isPending: false,
    data: {} as RoleType,
    error: null,
  },
};

export const createRoleRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createRole: {
      ...INITIAL_STATE.createRole,
      isPending: true,
    },
  };
};

export const createRoleSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createRole: {
      ...INITIAL_STATE.createRole,
      data,
      isPending: false,
    },
  };
};

export const createRoleFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createRole: {
      ...INITIAL_STATE.createRole,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_ROLE_REQUEST]: createRoleRequest,
  [Types.CREATE_ROLE_SUCCESS]: createRoleSuccess,
  [Types.CREATE_ROLE_FAILURE]: createRoleFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
