import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  smsDetail: {
    isPending: false,
    data: {},
    error: null,
  },
  userDraftList: {
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
  testSms: {
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
  contentValidation: { content: {} },
  config: {
    isPending: false,
    error: null,
  },
};

export const getSmsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    smsDetail: {
      ...INITIAL_STATE.smsDetail,
      isPending: true,
    },
  };
};

export const getSmsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    smsDetail: {
      ...INITIAL_STATE.smsDetail,
      data,
      isPending: false,
    },
  };
};

export const getSmsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    smsDetail: {
      ...INITIAL_STATE.smsDetail,
      isPending: false,
      error,
    },
  };
};

export const updateSmsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    smsDetail: {
      ...state.smsDetail,
      isPending: true,
    },
  };
};

export const updateSmsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    smsDetail: {
      ...state.smsDetail,
      isPending: false,
      error: null,
      data,
    },
  };
};

export const updateSmsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    smsDetail: {
      ...state.smsDetail,
      error,
      isPending: false,
    },
  };
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

export const sendTestSmsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    testSms: { isPending: true },
  };
};

export const sendTestSmsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    testSms: {
      ...state.testSms,
      data,
      isPending: false,
      submitted: true,
    },
  };
};

export const sendTestSmsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    testSms: {
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

export const validateContentRequest = (state = INITIAL_STATE, { lang, message }) => {
  return {
    ...state,
    contentValidation: {
      ...state.contentValidation,
      content: {
        ...state.contentValidation.content,
        [lang]: { isPending: true, message },
      },
    },
  };
};

export const validateContentSuccess = (state = INITIAL_STATE, { data, lang }) => {
  return {
    ...state,
    contentValidation: {
      ...state.contentValidation,
      content: {
        ...state.contentValidation.content,
        [lang]: {
          ...state.contentValidation.content[lang],
          isPending: false,
          data,
        },
      },
    },
  };
};

export const validateContentFailure = (state = INITIAL_STATE, { error, lang }) => {
  return {
    ...state,
    contentValidation: {
      ...state.contentValidation,
      content: {
        ...state.contentValidation.content,
        [lang]: {
          ...state.contentValidation.content[lang],
          isPending: false,
          error,
        },
      },
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
  [Types.GET_SMS_REQUEST]: getSmsRequest,
  [Types.GET_SMS_SUCCESS]: getSmsSuccess,
  [Types.GET_SMS_FAILURE]: getSmsFailure,

  [Types.UPDATE_SMS_REQUEST]: updateSmsRequest,
  [Types.UPDATE_SMS_SUCCESS]: updateSmsSuccess,
  [Types.UPDATE_SMS_FAILURE]: updateSmsFailure,

  [Types.UPLOAD_FILES_TO_S3_REQUEST]: uploadFilesToS3Request,
  [Types.UPLOAD_FILES_TO_S3_SUCCESS]: uploadFilesToS3Success,
  [Types.UPLOAD_FILES_TO_S3_FAILURE]: uploadFilesToS3Failure,

  [Types.SEND_TEST_SMS_REQUEST]: sendTestSmsRequest,
  [Types.SEND_TEST_SMS_SUCCESS]: sendTestSmsSuccess,
  [Types.SEND_TEST_SMS_FAILURE]: sendTestSmsFailure,

  [Types.GET_STATISTICS_REQUEST]: getStatisticsRequest,
  [Types.GET_STATISTICS_SUCCESS]: getStatisticsSuccess,
  [Types.GET_STATISTICS_FAILURE]: getStatisticsFailure,

  [Types.VALIDATE_CONTENT_REQUEST]: validateContentRequest,
  [Types.VALIDATE_CONTENT_SUCCESS]: validateContentSuccess,
  [Types.VALIDATE_CONTENT_FAILURE]: validateContentFailure,

  [Types.GET_TARGET_AUDIENCE_STATISTICS_REQUEST]: getTargetAudienceStatisticsRequest,
  [Types.GET_TARGET_AUDIENCE_STATISTICS_SUCCESS]: getTargetAudienceStatisticsSuccess,
  [Types.GET_TARGET_AUDIENCE_STATISTICS_FAILURE]: getTargetAudienceStatisticsFailure,

  [Types.GET_SMS_CONFIG_REQUEST]: getSmsConfigRequest,
  [Types.GET_SMS_CONFIG_SUCCESS]: getSmsConfigSuccess,
  [Types.GET_SMS_CONFIG_FAILURE]: getSmsConfigFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
