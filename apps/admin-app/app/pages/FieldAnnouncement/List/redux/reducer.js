import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  announcementList: {
    data: [],
    total: 0,
    isPending: false,
    error: null,
  },
  deleteAnnouncement: {
    data: null,
    isPending: false,
    error: null,
  },
};

export const getAnnouncementListRequest = state => {
  return {
    ...state,
    announcementList: {
      ...state.announcementList,
      isPending: true,
    },
  };
};

export const getAnnouncementListSuccess = (state, { data = [], count }) => {
  return {
    ...state,
    announcementList: {
      ...state.announcementList,
      data,
      total: count,
      isPending: false,
    },
  };
};

export const getAnnouncementListFailure = (state, { error }) => {
  return {
    ...state,
    announcementList: {
      ...state.announcementList,
      isPending: false,
      error,
    },
  };
};
export const deleteAnnouncementRequest = state => {
  return {
    ...state,
    deleteAnnouncement: {
      ...state.deleteAnnouncement,
      data: null,
      isPending: true,
    },
  };
};

export const deleteAnnouncementSuccess = state => {
  return {
    ...state,
    deleteAnnouncement: {
      ...state.deleteAnnouncement,
      data: true,
      isPending: false,
    },
  };
};

export const deleteAnnouncementFailure = (state, { error }) => {
  return {
    ...state,
    deleteAnnouncement: {
      ...state.deleteAnnouncement,
      isPending: false,
      data: null,
      error,
    },
  };
};

export const deleteAnnouncementReset = state => {
  return {
    ...state,
    deleteAnnouncement: {
      ...state.deleteAnnouncement,
      isPending: false,
      data: null,
    },
  };
};
export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_ANNOUNCEMENT_LIST_REQUEST]: getAnnouncementListRequest,
  [Types.GET_ANNOUNCEMENT_LIST_SUCCESS]: getAnnouncementListSuccess,
  [Types.GET_ANNOUNCEMENT_LIST_FAILURE]: getAnnouncementListFailure,
  [Types.DELETE_ANNOUNCEMENT_REQUEST]: deleteAnnouncementRequest,
  [Types.DELETE_ANNOUNCEMENT_SUCCESS]: deleteAnnouncementSuccess,
  [Types.DELETE_ANNOUNCEMENT_FAILURE]: deleteAnnouncementFailure,
  [Types.DELETE_ANNOUNCEMENT_RESET]: deleteAnnouncementReset,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
