import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  users: {
    data: [],
    isPending: false,
  },
  batchUpdate: { isPending: false },
  removeWebhelpIdFromUser: { isPending: false },
};

export const getUsersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    users: {
      ...state.users,
      data: [],
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

export const getUsersFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    users: {
      ...state.users,
      isPending: false,
      error,
    },
  };
};

export const updateUsersWebhelpIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    batchUpdate: {
      ...state.batchUpdate,
      isPending: true,
    },
  };
};

export const updateUsersWebhelpIdSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    batchUpdate: {
      ...state.batchUpdate,
      isPending: false,
    },
  };
};

export const updateUsersWebhelpIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    batchUpdate: {
      ...state.batchUpdate,
      isPending: false,
      error,
    },
  };
};

export const removeWebhelpIdFromUserRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    removeWebhelpIdFromUser: {
      ...state.removeWebhelpIdFromUser,
      isPending: true,
    },
  };
};

export const removeWebhelpIdFromUserSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    removeWebhelpIdFromUser: {
      ...state.removeWebhelpIdFromUser,
      isPending: false,
    },
  };
};

export const removeWebhelpIdFromUserFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    removeWebhelpIdFromUser: {
      ...state.removeWebhelpIdFromUser,
      isPending: false,
      error,
    },
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_USERS_REQUEST]: getUsersRequest,
  [Types.GET_USERS_SUCCESS]: getUsersSuccess,
  [Types.GET_USERS_FAILURE]: getUsersFailure,
  [Types.UPDATE_USERS_WEBHELP_ID_REQUEST]: updateUsersWebhelpIdRequest,
  [Types.UPDATE_USERS_WEBHELP_ID_SUCCESS]: updateUsersWebhelpIdSuccess,
  [Types.UPDATE_USERS_WEBHELP_ID_FAILURE]: updateUsersWebhelpIdFailure,
  [Types.REMOVE_WEBHELP_ID_FROM_USER_REQUEST]: removeWebhelpIdFromUserRequest,
  [Types.REMOVE_WEBHELP_ID_FROM_USER_SUCCESS]: removeWebhelpIdFromUserSuccess,
  [Types.REMOVE_WEBHELP_ID_FROM_USER_FAILURE]: removeWebhelpIdFromUserFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
