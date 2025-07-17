import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { CALLBACK_TYPES } from '@shared/containers/Select/CallbackProperty/constants';

export const parseCallbackTypes = () => {
  const callback = {};
  Object.keys(CALLBACK_TYPES).forEach(key => {
    callback[key] = {
      isPending: false,
      data: [],
      error: null,
    };
  });
  return callback;
};

export const INITIAL_STATE = { callbackProperties: parseCallbackTypes() };

export const getCallbackPropertiesRequest = (state = INITIAL_STATE, { callbackType }) => {
  return {
    ...state,
    callbackProperties: {
      ...state.callbackProperties,
      [callbackType]: {
        isPending: true,
        error: null,
      },
    },
  };
};

export const getCallbackPropertiesSuccess = (state = INITIAL_STATE, { data, callbackType }) => {
  return {
    ...state,
    callbackProperties: {
      ...state.callbackProperties,
      [callbackType]: {
        data,
        isPending: false,
        error: false,
      },
    },
  };
};

export const getCallbackPropertiesFailure = (state = INITIAL_STATE, { error, callbackType }) => {
  return {
    ...state,
    callbackProperties: {
      ...state.callbackProperties,
      [callbackType]: {
        isPending: false,
        error,
      },
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_CALLBACK_PROPERTIES_REQUEST]: getCallbackPropertiesRequest,
  [Types.GET_CALLBACK_PROPERTIES_SUCCESS]: getCallbackPropertiesSuccess,
  [Types.GET_CALLBACK_PROPERTIES_FAILURE]: getCallbackPropertiesFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
