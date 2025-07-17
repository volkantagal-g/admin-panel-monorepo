import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  sms: {
    isPending: false,
    data: [],
    error: null,
  },
  fileUploads: {
    clientImportTemplate: {
      isPending: false,
      data: [],
      error: null,
    },
    excludedClientImportTemplate: {
      isPending: false,
      data: [],
      error: null,
    },
  },
  config: {
    isPending: false,
    error: null,
  },
};

export const uploadFilesToS3Request = (state = INITIAL_STATE, { fileStateKey }) => {
  return {
    ...state,
    fileUploads: {
      ...state.fileUploads,
      [fileStateKey]: { isPending: true },
    },
  };
};

export const uploadFilesToS3Success = (state = INITIAL_STATE, { file, fileStateKey }) => {
  return {
    ...state,
    fileUploads: {
      ...state.fileUploads,
      [fileStateKey]: { data: file, isPending: false },
    },
  };
};

export const uploadFilesToS3Failure = (state = INITIAL_STATE, { error, fileStateKey }) => {
  return {
    ...state,
    fileUploads: {
      ...state.fileUploads,
      [fileStateKey]: {
        isPending: false,
        error,
      },
    },
  };
};

export const smsSaveRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    sms: {
      ...state.sms,
      isPending: true,
    },
  };
};

export const smsSaveSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    sms: {
      ...state.sms,
      isPending: false,
      data,
      error: null,
    },
  };
};

export const smsSaveFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    sms: {
      ...state.sms,
      isPending: false,
      error,
    },
  };
};

export const getSmsConfigRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    config: { isPending: true },
  };
};

export const getSmsConfigSuccess = (state = INITIAL_STATE, { data }) => {
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

export const getSmsConfigFailure = (state = INITIAL_STATE, { error }) => {
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
  [Types.SMS_SAVE_REQUEST]: smsSaveRequest,
  [Types.SMS_SAVE_SUCCESS]: smsSaveSuccess,
  [Types.SMS_SAVE_FAILURE]: smsSaveFailure,

  [Types.UPLOAD_FILES_TO_S3_REQUEST]: uploadFilesToS3Request,
  [Types.UPLOAD_FILES_TO_S3_SUCCESS]: uploadFilesToS3Success,
  [Types.UPLOAD_FILES_TO_S3_FAILURE]: uploadFilesToS3Failure,

  [Types.GET_SMS_CONFIG_REQUEST]: getSmsConfigRequest,
  [Types.GET_SMS_CONFIG_SUCCESS]: getSmsConfigSuccess,
  [Types.GET_SMS_CONFIG_FAILURE]: getSmsConfigFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
