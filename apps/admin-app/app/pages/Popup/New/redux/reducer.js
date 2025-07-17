import { createReducer } from 'reduxsauce';

import { Types } from '@app/pages/Popup/New/redux/actions';

export const INITIAL_STATE = {
  pageOptions: [],
  popup: {
    isPending: false,
    data: {},
    error: null,
  },
  popupImages: {
    isPending: false,
    data: {},
    error: null,
  },
  getConfigKey: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const createPopupRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    popup: {
      ...INITIAL_STATE.popup,
      isPending: true,
      error: null,
    },
  };
};

export const createPopupSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    popup: {
      ...INITIAL_STATE.popup,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const createPopupFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    popup: {
      ...INITIAL_STATE.popup,
      isPending: false,
      error,
    },
  };
};

export const getS3SignedImageUrlRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    popupImages: { isPending: true },
  };
};

export const getS3SignedImageUrlSuccess = (state = INITIAL_STATE, { fileLang, cdnUrl }) => {
  return {
    ...state,
    popupImages: {
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
    popupImages: {
      ...INITIAL_STATE.popupImages,
      isPending: false,
      error,
    },
  };
};

export const getConfigKeyRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getConfigKey: {
      ...INITIAL_STATE.getConfigKey,
      isPending: true,
    },
  };
};

export const getConfigKeySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getConfigKey: {
      ...INITIAL_STATE.getConfigKey,
      data,
      isPending: false,
    },
  };
};

export const getConfigKeyFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getConfigKey: {
      ...INITIAL_STATE.getConfigKey,
      isPending: false,
      error,
    },
  };
};

export const setPageOptions = (state, { pageOptions }) => {
  return {
    ...state,
    pageOptions,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_POPUP_REQUEST]: createPopupRequest,
  [Types.CREATE_POPUP_SUCCESS]: createPopupSuccess,
  [Types.CREATE_POPUP_FAILURE]: createPopupFailure,

  [Types.GET_S3_SIGNED_IMAGE_URL_REQUEST]: getS3SignedImageUrlRequest,
  [Types.GET_S3_SIGNED_IMAGE_URL_SUCCESS]: getS3SignedImageUrlSuccess,
  [Types.GET_S3_SIGNED_IMAGE_URL_FAILURE]: getS3SignedImageUrlFailure,

  [Types.GET_CONFIG_KEY_REQUEST]: getConfigKeyRequest,
  [Types.GET_CONFIG_KEY_SUCCESS]: getConfigKeySuccess,
  [Types.GET_CONFIG_KEY_FAILURE]: getConfigKeyFailure,

  [Types.SET_PAGE_OPTIONS]: setPageOptions,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
