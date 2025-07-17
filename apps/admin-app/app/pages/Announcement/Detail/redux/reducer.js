import { createReducer } from 'reduxsauce';

import { FILE_UPLOAD_STATE_KEY } from '../../constants';

import { Types } from './actions';

export const INITIAL_STATE = {
  announcementDetail: {
    isPending: false,
    data: {},
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

export const getAnnouncementRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    announcementDetail: {
      ...INITIAL_STATE.announcementDetail,
      isPending: true,
    },
  };
};

export const getAnnouncementSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    announcementDetail: {
      ...INITIAL_STATE.announcementDetail,
      data,
      isPending: false,
    },
  };
};

export const getAnnouncementFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    announcementDetail: {
      ...INITIAL_STATE.announcementDetail,
      isPending: false,
      error,
    },
  };
};

export const updateAnnouncementRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    announcementDetail: {
      ...state.announcementDetail,
      isPending: true,
    },
  };
};

export const updateAnnouncementSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    announcementDetail: {
      ...state.announcementDetail,
      isPending: false,
      data,
    },
  };
};

export const updateAnnouncementFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    announcementDetail: {
      ...state.announcementDetail,
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

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_ANNOUNCEMENT_REQUEST]: getAnnouncementRequest,
  [Types.GET_ANNOUNCEMENT_SUCCESS]: getAnnouncementSuccess,
  [Types.GET_ANNOUNCEMENT_FAILURE]: getAnnouncementFailure,

  [Types.UPDATE_ANNOUNCEMENT_REQUEST]: updateAnnouncementRequest,
  [Types.UPDATE_ANNOUNCEMENT_SUCCESS]: updateAnnouncementSuccess,
  [Types.UPDATE_ANNOUNCEMENT_FAILURE]: updateAnnouncementFailure,

  [Types.UPLOAD_FILES_TO_S3_REQUEST]: uploadFilesToS3Request,
  [Types.UPLOAD_FILES_TO_S3_SUCCESS]: uploadFilesToS3Success,
  [Types.UPLOAD_FILES_TO_S3_FAILURE]: uploadFilesToS3Failure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
