import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  transactionalNotificationSave: {
    isPending: false,
    data: [],
    error: null,
  },
  config: {
    data: {},
    isPending: false,
  },
  notificationImages: {
    isPending: false,
    data: {},
    error: null,
  },
  notificationCenter: {
    data: {},
    isPending: false,
  },
};

export const transactionalNotificationSaveRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    transactionalNotificationSave: {
      ...state.transactionalNotificationSave,
      isPending: true,
    },
  };
};

export const transactionalNotificationSaveSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    transactionalNotificationSave: {
      ...state.transactionalNotificationSave,
      isPending: false,
      data,
    },
  };
};

export const transactionalNotificationSaveFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    transactionalNotificationSave: {
      ...state.transactionalNotificationSave,
      isPending: false,
      error,
    },
  };
};

export const getS3SignedImageUrlRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    notificationImages: { isPending: true },
  };
};

export const getS3SignedImageUrlSuccess = (state = INITIAL_STATE, { fileLang, cdnUrl }) => {
  return {
    ...state,
    notificationImages: {
      data: {
        cdnUrl,
        fileLang,
      },
      isPending: false,
    },
  };
};

export const getS3SignedImageUrlFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    notificationImages: {
      ...INITIAL_STATE.notificationImages,
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

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.TRANSACTIONAL_NOTIFICATION_SAVE_REQUEST]: transactionalNotificationSaveRequest,
  [Types.TRANSACTIONAL_NOTIFICATION_SAVE_SUCCESS]: transactionalNotificationSaveSuccess,
  [Types.TRANSACTIONAL_NOTIFICATION_SAVE_FAILURE]: transactionalNotificationSaveFailure,

  [Types.GET_S3_SIGNED_IMAGE_URL_REQUEST]: getS3SignedImageUrlRequest,
  [Types.GET_S3_SIGNED_IMAGE_URL_SUCCESS]: getS3SignedImageUrlSuccess,
  [Types.GET_S3_SIGNED_IMAGE_URL_FAILURE]: getS3SignedImageUrlFailure,

  [Types.GET_CONFIG_REQUEST]: getConfigRequest,
  [Types.GET_CONFIG_SUCCESS]: getConfigSuccess,
  [Types.GET_CONFIG_FAILURE]: getConfigFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
