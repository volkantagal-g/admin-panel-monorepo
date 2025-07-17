import { createReducer } from 'reduxsauce';

import { FILE_UPLOAD_STATE_KEY } from '../../constants';

import { Types } from './actions';

export const INITIAL_STATE = {
  announcementSave: {
    isPending: false,
    data: [],
    error: null,
  },
  fileUploads: {
    [FILE_UPLOAD_STATE_KEY.ANNOUNCEMENT_CONTENT_IMAGE]: {
      isPending: false,
      data: [],
      error: null,
    },
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

export const announcementSaveRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    announcementSave: {
      ...state.announcementSave,
      isPending: true,
    },
  };
};

export const announcementSaveSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    announcementSave: {
      ...state.announcementSave,
      isPending: false,
      data,
    },
  };
};

export const announcementSaveFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    announcementSave: {
      ...state.announcementSave,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.ANNOUNCEMENT_SAVE_REQUEST]: announcementSaveRequest,
  [Types.ANNOUNCEMENT_SAVE_SUCCESS]: announcementSaveSuccess,
  [Types.ANNOUNCEMENT_SAVE_FAILURE]: announcementSaveFailure,

  [Types.UPLOAD_FILES_TO_S3_REQUEST]: uploadFilesToS3Request,
  [Types.UPLOAD_FILES_TO_S3_SUCCESS]: uploadFilesToS3Success,
  [Types.UPLOAD_FILES_TO_S3_FAILURE]: uploadFilesToS3Failure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
