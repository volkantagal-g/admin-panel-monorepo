import { createReducer } from 'reduxsauce';

import { FILE_UPLOAD_STATE_KEY } from '../../constants';

import { Types } from './actions';

export const INITIAL_STATE = {
  announcement: {
    isPending: false,
    data: [],
    error: null,
  },
  fileUploads: {
    [FILE_UPLOAD_STATE_KEY.NOTIFICATION_CENTER_CONTENT_IMAGE]: {
      isPending: false,
      data: [],
      error: null,
    },
  },
  pageOptions: [],
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

export const announcementCreateRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    announcement: {
      ...state.announcement,
      isPending: true,
    },
  };
};

export const announcementCreateSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    announcement: {
      ...state.announcement,
      isPending: false,
      data,
    },
  };
};

export const announcementCreateFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    announcement: {
      ...state.announcement,
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
  [Types.ANNOUNCEMENT_CREATE_REQUEST]: announcementCreateRequest,
  [Types.ANNOUNCEMENT_CREATE_SUCCESS]: announcementCreateSuccess,
  [Types.ANNOUNCEMENT_CREATE_FAILURE]: announcementCreateFailure,

  [Types.UPLOAD_FILES_TO_S3_REQUEST]: uploadFilesToS3Request,
  [Types.UPLOAD_FILES_TO_S3_SUCCESS]: uploadFilesToS3Success,
  [Types.UPLOAD_FILES_TO_S3_FAILURE]: uploadFilesToS3Failure,

  [Types.SET_PAGE_OPTIONS]: setPageOptions,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
