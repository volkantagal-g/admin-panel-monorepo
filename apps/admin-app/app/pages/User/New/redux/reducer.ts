import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createUser: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const createUserRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createUser: {
      ...INITIAL_STATE.createUser,
      isPending: true,
    },
  };
};

export const createUserSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createUser: {
      ...INITIAL_STATE.createUser,
      data,
      isPending: false,
    },
  };
};

export const createUserFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createUser: {
      ...INITIAL_STATE.createUser,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_USER_REQUEST]: createUserRequest,
  [Types.CREATE_USER_SUCCESS]: createUserSuccess,
  [Types.CREATE_USER_FAILURE]: createUserFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
