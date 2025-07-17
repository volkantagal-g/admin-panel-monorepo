import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  announcements: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getAnnouncementsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    announcements: {
      ...INITIAL_STATE.announcements,
      isPending: true,
    },
  };
};

export const getAnnouncementsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    announcements: {
      ...INITIAL_STATE.announcements,
      data,
      isPending: false,
    },
  };
};

export const getAnnouncementsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    announcements: {
      ...INITIAL_STATE.announcements,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_ANNOUNCEMENTS_REQUEST]: getAnnouncementsRequest,
  [Types.GET_ANNOUNCEMENTS_SUCCESS]: getAnnouncementsSuccess,
  [Types.GET_ANNOUNCEMENTS_FAILURE]: getAnnouncementsFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
