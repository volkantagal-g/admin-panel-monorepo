import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getConfigGeneralKey: {
    isPending: false,
    data: {},
    error: null,
  },
  getConfigSplashKey: {
    isPending: false,
    data: {},
    error: null,
  },
  getConfigOnBoardingKey: {
    isPending: false,
    data: {},
    error: null,
  },
  uploadConfigJsonFile: {
    isPending: false,
    data: {},
    isSuccess: false,
    error: null,
  },
  updateConfigKey: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const updateConfigKeyRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateConfigKey: {
      ...INITIAL_STATE.updateConfigKey,
      isPending: true,
    },
  };
};

export const updateConfigKeySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateConfigKey: {
      ...INITIAL_STATE.updateConfigKey,
      data,
      error: null,
      isPending: false,
    },
  };
};

export const updateConfigKeyFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateConfigKey: {
      ...INITIAL_STATE.updateConfigKey,
      isPending: false,
      error,
    },
  };
};

export const uploadConfigJsonFileRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    uploadConfigJsonFile: {
      ...INITIAL_STATE.uploadConfigJsonFile,
      isPending: true,
    },
  };
};

export const uploadConfigJsonFileSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    uploadConfigJsonFile: {
      ...INITIAL_STATE.uploadConfigJsonFile,
      data,
      isSuccess: true,
      isPending: false,
    },
  };
};

export const uploadConfigJsonFileFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    uploadConfigJsonFile: {
      ...INITIAL_STATE.uploadConfigJsonFile,
      isPending: false,
      error,
    },
  };
};

export const getConfigGeneralKeyRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getConfigGeneralKey: {
      ...INITIAL_STATE.getConfigGeneralKey,
      isPending: true,
    },
  };
};

export const getConfigGeneralKeySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getConfigGeneralKey: {
      ...INITIAL_STATE.getConfigGeneralKey,
      data,
      error: null,
      isPending: false,
    },
  };
};

export const getConfigGeneralKeyFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getConfigGeneralKey: {
      ...INITIAL_STATE.getConfigGeneralKey,
      isPending: false,
      error,
    },
  };
};

export const getConfigSplashKeyRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getConfigSplashKey: {
      ...INITIAL_STATE.getConfigSplashKey,
      isPending: true,
    },
  };
};

export const getConfigSplashKeySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getConfigSplashKey: {
      ...INITIAL_STATE.getConfigSplashKey,
      data,
      error: null,
      isPending: false,
    },
  };
};

export const getConfigSplashKeyFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getConfigSplashKey: {
      ...INITIAL_STATE.getConfigSplashKey,
      isPending: false,
      error,
    },
  };
};

export const getConfigOnBoardingKeyRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getConfigOnBoardingKey: {
      ...INITIAL_STATE.getConfigOnBoardingKey,
      isPending: true,
    },
  };
};

export const getConfigOnBoardingKeySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getConfigOnBoardingKey: {
      ...INITIAL_STATE.getConfigOnBoardingKey,
      data,
      error: null,
      isPending: false,
    },
  };
};

export const getConfigOnBoardingKeyFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getConfigOnBoardingKey: {
      ...INITIAL_STATE.getConfigOnBoardingKey,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_CONFIG_GENERAL_KEY_REQUEST]: getConfigGeneralKeyRequest,
  [Types.GET_CONFIG_GENERAL_KEY_SUCCESS]: getConfigGeneralKeySuccess,
  [Types.GET_CONFIG_GENERAL_KEY_FAILURE]: getConfigGeneralKeyFailure,
  [Types.GET_CONFIG_SPLASH_KEY_REQUEST]: getConfigSplashKeyRequest,
  [Types.GET_CONFIG_SPLASH_KEY_SUCCESS]: getConfigSplashKeySuccess,
  [Types.GET_CONFIG_SPLASH_KEY_FAILURE]: getConfigSplashKeyFailure,
  [Types.GET_CONFIG_ON_BOARDING_KEY_REQUEST]: getConfigOnBoardingKeyRequest,
  [Types.GET_CONFIG_ON_BOARDING_KEY_SUCCESS]: getConfigOnBoardingKeySuccess,
  [Types.GET_CONFIG_ON_BOARDING_KEY_FAILURE]: getConfigOnBoardingKeyFailure,
  [Types.UPLOAD_CONFIG_JSON_FILE_REQUEST]: uploadConfigJsonFileRequest,
  [Types.UPLOAD_CONFIG_JSON_FILE_SUCCESS]: uploadConfigJsonFileSuccess,
  [Types.UPLOAD_CONFIG_JSON_FILE_FAILURE]: uploadConfigJsonFileFailure,
  [Types.UPDATE_CONFIG_KEY_REQUEST]: updateConfigKeyRequest,
  [Types.UPDATE_CONFIG_KEY_SUCCESS]: updateConfigKeySuccess,
  [Types.UPDATE_CONFIG_KEY_FAILURE]: updateConfigKeyFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
