import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  loginRequest: { email: null, redirectUrl: null },
  loginSuccess: { response: null },
  loginFailure: { failure: null },
  logoutRequest: {},
  authTempTokenRequest: { tempToken: null },
  authTempTokenSuccess: { response: null },
  authTempTokenFailure: { failure: null },
  authGoogleTokenRequest: { clientToken: null, redirectUrl: null },
  authGoogleTokenSuccess: { response: null },
  authGoogleTokenFailure: { failure: null },
  redirectUrlPathRequest: { data: null },
  refreshLoggedInUserRequest: null,
  refreshLoggedInUserFailure: { error: null },
}, {});
