import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getAnnouncementsByText: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const getAnnouncementsByTextRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getAnnouncementsByText: {
      ...INITIAL_STATE.getAnnouncementsByText,
      isPending: true,
    },
  };
};

export const getAnnouncementsByTextSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getAnnouncementsByText: {
      ...INITIAL_STATE.getAnnouncementsByText,
      data,
      isPending: false,
    },
  };
};

export const getAnnouncementsByTextFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getAnnouncementsByText: {
      ...INITIAL_STATE.getAnnouncementsByText,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_ANNOUNCEMENTS_BY_TEXT_REQUEST]: getAnnouncementsByTextRequest,
  [Types.GET_ANNOUNCEMENTS_BY_TEXT_SUCCESS]: getAnnouncementsByTextSuccess,
  [Types.GET_ANNOUNCEMENTS_BY_TEXT_FAILURE]: getAnnouncementsByTextFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
