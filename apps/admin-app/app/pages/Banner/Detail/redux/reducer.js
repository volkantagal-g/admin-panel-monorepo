import { createReducer } from 'reduxsauce';

import { FILE_UPLOAD_STATE_KEY } from '../../constants';

import { Types } from './actions';

export const INITIAL_STATE = {
  pageOptions: [],
  bannerDetail: {
    isPending: false,
    data: {},
    error: null,
  },
  fileUploads: {
    [FILE_UPLOAD_STATE_KEY.BANNER_CONTENT_IMAGE]: {
      isPending: false,
      data: [],
      error: null,
    },
  },
  gameAnimationUrl: {
    isPending: false,
    data: null,
    error: null,
  },
};

export const getBannerRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    bannerDetail: {
      ...INITIAL_STATE.bannerDetail,
      isPending: true,
    },
  };
};

export const getBannerSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    bannerDetail: {
      ...INITIAL_STATE.bannerDetail,
      data,
      isPending: false,
    },
  };
};

export const getBannerFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    bannerDetail: {
      ...INITIAL_STATE.bannerDetail,
      isPending: false,
      error,
    },
  };
};

export const updateBannerRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    bannerDetail: {
      ...state.bannerDetail,
      isPending: true,
    },
  };
};

export const updateBannerSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    bannerDetail: {
      ...state.bannerDetail,
      isPending: false,
      data,
    },
  };
};

export const updateBannerFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    bannerDetail: {
      ...state.bannerDetail,
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

export const uploadFilesToS3Success = (state = INITIAL_STATE, { fileStateKey }) => {
  return {
    ...state,
    fileUploads: {
      ...state.fileUploads,
      [fileStateKey]: { data: null, isPending: false },
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

export const setPageOptions = (state, { pageOptions }) => {
  return {
    ...state,
    pageOptions,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const getGameAnimationUrlRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    gameAnimationUrl: {
      isPending: true,
      data: null,
      error: null,
    },
  };
};

export const getGameAnimationUrlSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    gameAnimationUrl: {
      isPending: false,
      data,
      error: null,
    },
  };
};

export const getGameAnimationUrlFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    gameAnimationUrl: {
      isPending: false,
      data: null,
      error,
    },
  };
};

export const HANDLERS = {
  [Types.GET_BANNER_REQUEST]: getBannerRequest,
  [Types.GET_BANNER_SUCCESS]: getBannerSuccess,
  [Types.GET_BANNER_FAILURE]: getBannerFailure,

  [Types.UPDATE_BANNER_REQUEST]: updateBannerRequest,
  [Types.UPDATE_BANNER_SUCCESS]: updateBannerSuccess,
  [Types.UPDATE_BANNER_FAILURE]: updateBannerFailure,

  [Types.UPLOAD_FILES_TO_S3_REQUEST]: uploadFilesToS3Request,
  [Types.UPLOAD_FILES_TO_S3_SUCCESS]: uploadFilesToS3Success,
  [Types.UPLOAD_FILES_TO_S3_FAILURE]: uploadFilesToS3Failure,

  [Types.SET_PAGE_OPTIONS]: setPageOptions,

  [Types.DESTROY_PAGE]: destroy,

  [Types.GET_GAME_ANIMATION_URL_REQUEST]: getGameAnimationUrlRequest,
  [Types.GET_GAME_ANIMATION_URL_SUCCESS]: getGameAnimationUrlSuccess,
  [Types.GET_GAME_ANIMATION_URL_FAILURE]: getGameAnimationUrlFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
