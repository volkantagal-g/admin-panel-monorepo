import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  communicationCallbackUrlsUpdate: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const communicationCallbackUrlsGetRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    communicationCallbackUrlsUpdate: {
      ...INITIAL_STATE.communicationCallbackUrlsUpdate,
      isPending: true,
    },
  };
};

export const communicationCallbackUrlsGetSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    communicationCallbackUrlsUpdate: {
      ...INITIAL_STATE.communicationCallbackUrlsUpdate,
      data,
      isPending: false,
    },
  };
};

export const communicationCallbackUrlsGetFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    communicationCallbackUrlsUpdate: {
      ...INITIAL_STATE.communicationCallbackUrlsUpdate,
      isPending: false,
      error,
    },
  };
};

export const communicationCallbackUrlsUpdateRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    communicationCallbackUrlsUpdate: {
      ...state.communicationCallbackUrlsUpdate,
      isPending: true,
    },
  };
};

export const communicationCallbackUrlsUpdateSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    communicationCallbackUrlsUpdate: {
      ...state.communicationCallbackUrlsUpdate,
      isPending: false,
      data,
    },
  };
};

export const communicationCallbackUrlsUpdateFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    communicationCallbackUrlsUpdate: {
      ...state.communicationCallbackUrlsUpdate,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.COMMUNICATION_CALLBACK_URLS_UPDATE_REQUEST]: communicationCallbackUrlsUpdateRequest,
  [Types.COMMUNICATION_CALLBACK_URLS_UPDATE_SUCCESS]: communicationCallbackUrlsUpdateSuccess,
  [Types.COMMUNICATION_CALLBACK_URLS_UPDATE_FAILURE]: communicationCallbackUrlsUpdateFailure,

  [Types.COMMUNICATION_CALLBACK_URLS_GET_REQUEST]: communicationCallbackUrlsGetRequest,
  [Types.COMMUNICATION_CALLBACK_URLS_GET_SUCCESS]: communicationCallbackUrlsGetSuccess,
  [Types.COMMUNICATION_CALLBACK_URLS_GET_FAILURE]: communicationCallbackUrlsGetFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
