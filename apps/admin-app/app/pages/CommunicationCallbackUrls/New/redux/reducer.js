import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  communicationCallbackUrlsSave: {
    isPending: false,
    data: [],
    error: null,
  },
};
export const communicationCallbackUrlsSaveRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    communicationCallbackUrlsSave: {
      ...state.communicationCallbackUrlsSave,
      isPending: true,
    },
  };
};

export const communicationCallbackUrlsSaveSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    communicationCallbackUrlsSave: {
      ...state.communicationCallbackUrlsSave,
      isPending: false,
      data,
    },
  };
};

export const communicationCallbackUrlsSaveFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    communicationCallbackUrlsSave: {
      ...state.communicationCallbackUrlsSave,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.COMMUNICATION_CALLBACK_URLS_SAVE_REQUEST]: communicationCallbackUrlsSaveRequest,
  [Types.COMMUNICATION_CALLBACK_URLS_SAVE_SUCCESS]: communicationCallbackUrlsSaveSuccess,
  [Types.COMMUNICATION_CALLBACK_URLS_SAVE_FAILURE]: communicationCallbackUrlsSaveFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
