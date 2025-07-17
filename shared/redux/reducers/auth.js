import { createReducer } from 'reduxsauce';

import { Types } from '@shared/redux/actions/auth';

export const INITIAL_STATE = {
  user: {},
  token: null,
  isLoginSuccess: false,
  isLoginPending: false,
  isAuthTempTokenPending: false,
  isAuthGoogleTokenPending: false,
  redirectUrlPath: { data: null },
  refreshLoggedInUser: { error: null },
};

export const loginRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    isLoginSuccess: false,
    isLoginPending: true,
  };
};

export const loginSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    isLoginSuccess: true,
    isLoginPending: false,
  };
};

export const loginFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    isLoginSuccess: false,
    isLoginPending: false,
  };
};

export const authTempTokenRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    isAuthTempTokenPending: true,
    user: {},
    token: null,
  };
};

export const authTempTokenSuccess = (state = INITIAL_STATE, { user = {}, token }) => {
  return {
    ...state,
    isAuthTempTokenPending: false,
    user,
    token,
  };
};

export const authTempTokenFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    isAuthTempTokenPending: false,
    user: {},
    token: null,
  };
};

export const authGoogleTokenRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    isAuthGoogleTokenPending: true,
    user: {},
    token: null,
  };
};

export const authGoogleTokenSuccess = (state = INITIAL_STATE, { user = {}, token }) => {
  return {
    ...state,
    isAuthGoogleTokenPending: false,
    user,
    token,
  };
};

export const authGoogleTokenFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    isAuthGoogleTokenPending: false,
    user: {},
    token: null,
  };
};

export const logoutRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    user: {},
    token: null,
  };
};

export const redirectUrlPathRequest = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    redirectUrlPath: {
      ...INITIAL_STATE.redirectUrlPath,
      data,
    },
  };
};

export const refreshLoggedInUserRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    refreshLoggedInUser: { ...state.refreshLoggedInUser },
  };
};

export const refreshLoggedInUserFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    refreshLoggedInUser: {
      ...state.refreshLoggedInUser,
      error,
    },
  };
};

export const HANDLERS = {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.AUTH_TEMP_TOKEN_REQUEST]: authTempTokenRequest,
  [Types.AUTH_TEMP_TOKEN_SUCCESS]: authTempTokenSuccess,
  [Types.AUTH_TEMP_TOKEN_FAILURE]: authTempTokenFailure,
  [Types.AUTH_GOOGLE_TOKEN_REQUEST]: authGoogleTokenRequest,
  [Types.AUTH_GOOGLE_TOKEN_SUCCESS]: authGoogleTokenSuccess,
  [Types.AUTH_GOOGLE_TOKEN_FAILURE]: authGoogleTokenFailure,
  [Types.REDIRECT_URL_PATH_REQUEST]: redirectUrlPathRequest,
  [Types.LOGOUT_REQUEST]: logoutRequest,
  [Types.REFRESH_LOGGED_IN_USER_REQUEST]: refreshLoggedInUserRequest,
  [Types.REFRESH_LOGGED_IN_USER_FAILURE]: refreshLoggedInUserFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
