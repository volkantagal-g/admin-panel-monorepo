import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  communicationBulkSmsUpdate: {
    isPending: false,
    data: [],
    error: null,
  },
  config: {
    data: {},
    isPending: false,
  },
  csvFiles: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const communicationBulkSmsGetRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    communicationBulkSmsUpdate: {
      ...INITIAL_STATE.communicationBulkSmsUpdate,
      isPending: true,
    },
    csvFiles: {
      ...INITIAL_STATE.csvFiles,
      isPending: true,
    },
  };
};

export const communicationBulkSmsGetSuccess = (state = INITIAL_STATE, { data }) => {
  const { csvDetails } = data;
  return {
    ...state,
    communicationBulkSmsUpdate: {
      ...INITIAL_STATE.communicationBulkSmsUpdate,
      data,
      isPending: false,
    },
    csvFiles: {
      ...INITIAL_STATE.communicationBulkSmsUpdate,
      data: { ...csvDetails },
      isPending: false,
    },
  };
};

export const communicationBulkSmsGetFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    communicationBulkSmsUpdate: {
      ...INITIAL_STATE.communicationBulkSmsUpdate,
      isPending: false,
      error,
    },
    csvFiles: {
      ...INITIAL_STATE.csvFiles,
      isPending: false,
      error,
    },
  };
};

export const communicationBulkSmsUpdateRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    communicationBulkSmsUpdate: {
      ...state.communicationBulkSmsUpdate,
      isPending: true,
    },
  };
};

export const communicationBulkSmsUpdateSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    communicationBulkSmsUpdate: {
      ...state.communicationBulkSmsUpdate,
      isPending: false,
      data,
    },
  };
};

export const communicationBulkSmsUpdateFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    communicationBulkSmsUpdate: {
      ...state.communicationBulkSmsUpdate,
      isPending: false,
      error,
    },
  };
};

export const getConfigRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    config: {
      ...state.config,
      isPending: true,
      error: null,
    },
  };
};

export const getConfigSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    config: {
      ...state.config,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getConfigFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    config: {
      ...state.config,
      isPending: false,
      error,
    },
  };
};

export const getS3CsvUploadUrlRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    csvFiles: { isPending: true },
  };
};

export const getS3CsvUploadUrlSuccess = (state = INITIAL_STATE, { name, signedUrl, originalFileName }) => {
  return {
    ...state,
    csvFiles: {
      data: { name, signedUrl, originalFileName },
      isPending: false,
    },
  };
};

export const getS3CsvUploadUrlFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    csvFiles: {
      ...INITIAL_STATE.csvFiles,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.COMMUNICATION_BULK_SMS_UPDATE_REQUEST]: communicationBulkSmsUpdateRequest,
  [Types.COMMUNICATION_BULK_SMS_UPDATE_SUCCESS]: communicationBulkSmsUpdateSuccess,
  [Types.COMMUNICATION_BULK_SMS_UPDATE_FAILURE]: communicationBulkSmsUpdateFailure,

  [Types.COMMUNICATION_BULK_SMS_GET_REQUEST]: communicationBulkSmsGetRequest,
  [Types.COMMUNICATION_BULK_SMS_GET_SUCCESS]: communicationBulkSmsGetSuccess,
  [Types.COMMUNICATION_BULK_SMS_GET_FAILURE]: communicationBulkSmsGetFailure,

  [Types.GET_CONFIG_REQUEST]: getConfigRequest,
  [Types.GET_CONFIG_SUCCESS]: getConfigSuccess,
  [Types.GET_CONFIG_FAILURE]: getConfigFailure,

  [Types.GET_S3_CSV_UPLOAD_URL_REQUEST]: getS3CsvUploadUrlRequest,
  [Types.GET_S3_CSV_UPLOAD_URL_SUCCESS]: getS3CsvUploadUrlSuccess,
  [Types.GET_S3_CSV_UPLOAD_URL_FAILURE]: getS3CsvUploadUrlFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
