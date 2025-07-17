import { createReducer } from 'reduxsauce';

import { FILE_UPLOAD_STATE_KEY } from '../../constants';

import { Types } from './actions';

export const INITIAL_STATE = {
  pageOptions: [],
  bannerSave: {
    isPending: false,
    data: [],
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

export const bannerSaveRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    bannerSave: {
      ...state.bannerSave,
      isPending: true,
    },
  };
};

export const bannerSaveSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    bannerSave: {
      ...state.bannerSave,
      isPending: false,
      data,
    },
  };
};

export const bannerSaveFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    bannerSave: {
      ...state.bannerSave,
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
  [Types.BANNER_SAVE_REQUEST]: bannerSaveRequest,
  [Types.BANNER_SAVE_SUCCESS]: bannerSaveSuccess,
  [Types.BANNER_SAVE_FAILURE]: bannerSaveFailure,

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
