import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  isPending: false,
  data: [],
  error: null,
};

export const getInAppRedirectionRequest = (state = INITIAL_STATE) => {
  return {
    ...state,

    isPending: true,
  };
};

export const getInAppRedirectionSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    data,
    isPending: false,

  };
};

export const getInAppRedirectionFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    isPending: false,
    error,
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_IN_APP_REDIRECTION_REQUEST]: getInAppRedirectionRequest,
  [Types.GET_IN_APP_REDIRECTION_SUCCESS]: getInAppRedirectionSuccess,
  [Types.GET_IN_APP_REDIRECTION_FAILURE]: getInAppRedirectionFailure,

  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
