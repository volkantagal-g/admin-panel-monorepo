import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  email: {
    isPending: false,
    data: [],
    error: null,
  },
  uploadedFile: {
    userList: {
      isPending: false,
      data: [],
      error: null,
    },
    excludedUserList: {
      isPending: false,
      data: [],
      error: null,
    },
  },
  mailInfoFromConfig: {
    senderMail: {
      isPending: false,
      data: {},
      error: null,
    },
    senderName: {
      isPending: false,
      data: {},
      error: null,
    },
  },
  previewImage: {
    isPending: false,
    data: null,
    error: null,
  },
  config: {
    isPending: false,
    error: null,
  },
};

export const emailSaveRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    email: {
      ...state.email,
      isPending: true,
    },
  };
};

export const emailSaveSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    email: {
      ...state.email,
      isPending: false,
      data,
      error: null,
    },
  };
};

export const emailSaveFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    email: {
      ...state.email,
      isPending: false,
      error,
    },
  };
};

export const uploadFilesToS3Request = (state = INITIAL_STATE, { fileStateKey }) => {
  return {
    ...state,
    uploadedFile: {
      ...state.uploadedFile,
      [fileStateKey]: { isPending: true },
    },
  };
};

export const uploadFilesToS3Success = (state = INITIAL_STATE, { file, fileStateKey }) => {
  return {
    ...state,
    uploadedFile: {
      ...state.uploadedFile,
      [fileStateKey]: { data: file, isPending: false },
    },
  };
};

export const uploadFilesToS3Failure = (state = INITIAL_STATE, { error, fileStateKey }) => {
  return {
    ...state,
    uploadedFile: {
      ...state.uploadedFile,
      [fileStateKey]: {
        isPending: false,
        error,
      },
    },
  };
};

export const getSenderInfoFromConfigRequest = (state = INITIAL_STATE, { stateKey }) => {
  return {
    ...state,
    mailInfoFromConfig: {
      ...state.mailInfoFromConfig,
      [stateKey]: { isPending: true },
    },
  };
};

export const getSenderInfoFromConfigSuccess = (state = INITIAL_STATE, { data, stateKey }) => {
  return {
    ...state,
    mailInfoFromConfig: {
      ...state.mailInfoFromConfig,
      [stateKey]: { data, isPending: false },
    },
  };
};

export const getSenderInfoFromConfigFailure = (state = INITIAL_STATE, { error, stateKey }) => {
  return {
    ...state,
    mailInfoFromConfig: {
      ...state.mailInfoFromConfig,
      [stateKey]: {
        isPending: false,
        error,
      },
    },
  };
};

export const getPreviewImageRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    previewImage: {
      ...state.previewImage,
      isPending: true,
    },
  };
};

export const getPreviewImageSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    previewImage: {
      ...state.previewImage,
      data,
      isPending: false,
    },
  };
};

export const getPreviewImageFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    previewImage: {
      ...state.previewImage,
      isPending: false,
      error,
    },
  };
};

export const getEmailConfigRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    config: { isPending: true },
  };
};

export const getEmailConfigSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    config: {
      ...state.config,
      isPending: false,
      data,
      error: null,
    },
  };
};

export const getEmailConfigFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    config: {
      ...state.config,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.EMAIL_SAVE_REQUEST]: emailSaveRequest,
  [Types.EMAIL_SAVE_SUCCESS]: emailSaveSuccess,
  [Types.EMAIL_SAVE_FAILURE]: emailSaveFailure,

  [Types.UPLOAD_FILES_TO_S3_REQUEST]: uploadFilesToS3Request,
  [Types.UPLOAD_FILES_TO_S3_SUCCESS]: uploadFilesToS3Success,
  [Types.UPLOAD_FILES_TO_S3_FAILURE]: uploadFilesToS3Failure,

  [Types.GET_SENDER_INFO_FROM_CONFIG_REQUEST]: getSenderInfoFromConfigRequest,
  [Types.GET_SENDER_INFO_FROM_CONFIG_SUCCESS]: getSenderInfoFromConfigSuccess,
  [Types.GET_SENDER_INFO_FROM_CONFIG_FAILURE]: getSenderInfoFromConfigFailure,

  [Types.GET_PREVIEW_IMAGE_REQUEST]: getPreviewImageRequest,
  [Types.GET_PREVIEW_IMAGE_SUCCESS]: getPreviewImageSuccess,
  [Types.GET_PREVIEW_IMAGE_FAILURE]: getPreviewImageFailure,

  [Types.GET_EMAIL_CONFIG_REQUEST]: getEmailConfigRequest,
  [Types.GET_EMAIL_CONFIG_SUCCESS]: getEmailConfigSuccess,
  [Types.GET_EMAIL_CONFIG_FAILURE]: getEmailConfigFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
