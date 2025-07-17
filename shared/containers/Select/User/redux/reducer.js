import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  users: {
    data: [],
    isPending: false,
  },
};

export const getUsersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    users: {
      ...state.users,
      isPending: true,
    },
  };
};

export const getUsersSuccess = (state = INITIAL_STATE, { data = [] }) => {
  return {
    ...state,
    users: {
      ...state.users,
      data,
      isPending: false,
    },
  };
};

export const getUsersFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    users: {
      ...state.users,
      data: [],
      isPending: false,
    },
  };
};

export const clearUsersData = (state = INITIAL_STATE) => {
  return {
    ...state,
    users: INITIAL_STATE.users,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_USERS_REQUEST]: getUsersRequest,
  [Types.GET_USERS_SUCCESS]: getUsersSuccess,
  [Types.GET_USERS_FAILURE]: getUsersFailure,
  [Types.CLEAR_USERS_DATA]: clearUsersData,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
