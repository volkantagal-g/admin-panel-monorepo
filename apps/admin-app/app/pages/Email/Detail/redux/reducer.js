import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  emailDetail: {
    isPending: false,
    data: {},
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
  testEmail: {
    isPending: false,
    data: false,
    error: null,
  },
  statistic: {
    isPending: false,
    data: false,
    error: null,
  },
  targetAudienceStatistics: {
    isPending: false,
    data: {},
    error: null,
  },
  config: {
    isPending: false,
    error: null,
  },
};

export const getEmailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    emailDetail: {
      ...INITIAL_STATE.emailDetail,
      isPending: true,
    },
  };
};

export const getEmailSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    emailDetail: {
      ...INITIAL_STATE.emailDetail,
      data,
      isPending: false,
    },
  };
};

export const getEmailFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    emailDetail: {
      ...INITIAL_STATE.emailDetail,
      isPending: false,
      error,
    },
  };
};

export const updateEmailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    emailDetail: {
      ...state.emailDetail,
      isPending: true,
    },
  };
};

export const updateEmailSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    emailDetail: {
      ...state.emailDetail,
      isPending: false,
      error: null,
      data,
    },
  };
};

export const updateEmailFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    emailDetail: {
      ...state.emailDetail,
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

export const sendTestEmailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    testEmail: { isPending: true },
  };
};

export const sendTestEmailSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    testEmail: {
      ...state.testEmail,
      data,
      isPending: false,
      submitted: true,
    },
  };
};

export const sendTestEmailFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    testEmail: {
      isPending: false,
      submitted: false,
      error,
    },
  };
};

export const getStatisticsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    statistic: {
      ...INITIAL_STATE.statistic,
      isPending: true,
    },
  };
};

export const getStatisticsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    statistic: {
      ...INITIAL_STATE.statistic,
      data,
      isPending: false,
    },
  };
};

export const getStatisticsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    statistic: {
      ...INITIAL_STATE.statistic,
      isPending: false,
      error,
    },
  };
};

export const getTargetAudienceStatisticsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    targetAudienceStatistics: {
      ...state.targetAudienceStatistics,
      isPending: true,
    },
  };
};

export const getTargetAudienceStatisticsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    targetAudienceStatistics: {
      ...state.targetAudienceStatistics,
      data,
      isPending: false,
    },
  };
};

export const getTargetAudienceStatisticsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    targetAudienceStatistics: {
      ...state.targetAudienceStatistics,
      isPending: false,
      error,
    },
  };
};

export const getEmailConfigRequest = state => {
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
  [Types.GET_EMAIL_REQUEST]: getEmailRequest,
  [Types.GET_EMAIL_SUCCESS]: getEmailSuccess,
  [Types.GET_EMAIL_FAILURE]: getEmailFailure,

  [Types.UPDATE_EMAIL_REQUEST]: updateEmailRequest,
  [Types.UPDATE_EMAIL_SUCCESS]: updateEmailSuccess,
  [Types.UPDATE_EMAIL_FAILURE]: updateEmailFailure,

  [Types.UPLOAD_FILES_TO_S3_REQUEST]: uploadFilesToS3Request,
  [Types.UPLOAD_FILES_TO_S3_SUCCESS]: uploadFilesToS3Success,
  [Types.UPLOAD_FILES_TO_S3_FAILURE]: uploadFilesToS3Failure,

  [Types.GET_SENDER_INFO_FROM_CONFIG_REQUEST]: getSenderInfoFromConfigRequest,
  [Types.GET_SENDER_INFO_FROM_CONFIG_SUCCESS]: getSenderInfoFromConfigSuccess,
  [Types.GET_SENDER_INFO_FROM_CONFIG_FAILURE]: getSenderInfoFromConfigFailure,

  [Types.GET_PREVIEW_IMAGE_REQUEST]: getPreviewImageRequest,
  [Types.GET_PREVIEW_IMAGE_SUCCESS]: getPreviewImageSuccess,
  [Types.GET_PREVIEW_IMAGE_FAILURE]: getPreviewImageFailure,

  [Types.SEND_TEST_EMAIL_REQUEST]: sendTestEmailRequest,
  [Types.SEND_TEST_EMAIL_SUCCESS]: sendTestEmailSuccess,
  [Types.SEND_TEST_EMAIL_FAILURE]: sendTestEmailFailure,

  [Types.GET_STATISTICS_REQUEST]: getStatisticsRequest,
  [Types.GET_STATISTICS_SUCCESS]: getStatisticsSuccess,
  [Types.GET_STATISTICS_FAILURE]: getStatisticsFailure,

  [Types.GET_TARGET_AUDIENCE_STATISTICS_REQUEST]: getTargetAudienceStatisticsRequest,
  [Types.GET_TARGET_AUDIENCE_STATISTICS_SUCCESS]: getTargetAudienceStatisticsSuccess,
  [Types.GET_TARGET_AUDIENCE_STATISTICS_FAILURE]: getTargetAudienceStatisticsFailure,

  [Types.GET_EMAIL_CONFIG_REQUEST]: getEmailConfigRequest,
  [Types.GET_EMAIL_CONFIG_SUCCESS]: getEmailConfigSuccess,
  [Types.GET_EMAIL_CONFIG_FAILURE]: getEmailConfigFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
