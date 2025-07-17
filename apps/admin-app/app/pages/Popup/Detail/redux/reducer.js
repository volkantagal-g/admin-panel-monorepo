import { createReducer } from 'reduxsauce';

import { Types } from '@app/pages/Popup/Detail/redux/actions';

export const INITIAL_STATE = {
  pageOptions: [],
  popupDetail: {
    isPending: false,
    data: {},
    error: null,
  },
  popupImages: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const getPopupRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    popupDetail: {
      ...INITIAL_STATE.popupDetail,
      isPending: true,
    },
  };
};

export const getPopupSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    popupDetail: {
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getPopupFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    popupDetail: {
      ...INITIAL_STATE.popupDetail,
      isPending: false,
      error,
    },
  };
};

export const updatePopupRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    popupDetail: {
      ...state.popupDetail,
      isPending: true,
    },
  };
};

export const updatePopupSuccess = (state = INITIAL_STATE, { popupDetail }) => {
  return {
    ...state,
    popupDetail: {
      ...state.popupDetail,
      isPending: false,
      error: null,
      data: { ...popupDetail },
    },
  };
};

export const updatePopupFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    popupDetail: {
      ...state.popupDetail,
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

export const setPageOptions = (state = INITIAL_STATE, { pageOptions }) => {
  return {
    ...state,
    pageOptions,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_POPUP_REQUEST]: getPopupRequest,
  [Types.GET_POPUP_SUCCESS]: getPopupSuccess,
  [Types.GET_POPUP_FAILURE]: getPopupFailure,

  [Types.UPDATE_POPUP_REQUEST]: updatePopupRequest,
  [Types.UPDATE_POPUP_SUCCESS]: updatePopupSuccess,
  [Types.UPDATE_POPUP_FAILURE]: updatePopupFailure,

  [Types.GET_S3_SIGNED_IMAGE_URL_REQUEST]: getS3SignedImageUrlRequest,
  [Types.GET_S3_SIGNED_IMAGE_URL_SUCCESS]: getS3SignedImageUrlSuccess,
  [Types.GET_S3_SIGNED_IMAGE_URL_FAILURE]: getS3SignedImageUrlFailure,

  [Types.SET_PAGE_OPTIONS]: setPageOptions,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
