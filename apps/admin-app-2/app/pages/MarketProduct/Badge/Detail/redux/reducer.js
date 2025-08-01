import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getBadge: {
    isPending: false,
    data: {},
    error: null,
  },
  updateBadge: {
    isPending: false,
    error: null,
  },
  updateBadgeImageUrl: {
    isPending: false,
    error: null,
  },
};

export const getBadgeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getBadge: {
      ...INITIAL_STATE.getBadge,
      isPending: true,
    },
  };
};

export const getBadgeSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getBadge: {
      ...INITIAL_STATE.getBadge,
      data,
      isPending: false,
    },
  };
};

export const getBadgeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getBadge: {
      ...INITIAL_STATE.getBadge,
      isPending: false,
      error,
    },
  };
};

export const updateBadgeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateBadge: {
      ...INITIAL_STATE.updateBadge,
      isPending: true,
    },
  };
};

export const updateBadgeSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateBadge: {
      ...INITIAL_STATE.updateBadge,
      isPending: false,
    },
  };
};

export const updateBadgeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateBadge: {
      ...INITIAL_STATE.updateBadge,
      isPending: false,
      error,
    },
  };
};

export const updateBadgeImageUrlRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateBadgeImageUrl: {
      ...INITIAL_STATE.updateBadgeImageUrl,
      isPending: true,
    },
  };
};

export const updateBadgeImageUrlSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateBadgeImageUrl: {
      ...INITIAL_STATE.updateBadgeImageUrl,
      isPending: false,
    },
  };
};

export const updateBadgeImageUrlFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateBadgeImageUrl: {
      ...INITIAL_STATE.updateBadgeImageUrl,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_BADGE_REQUEST]: getBadgeRequest,
  [Types.GET_BADGE_SUCCESS]: getBadgeSuccess,
  [Types.GET_BADGE_FAILURE]: getBadgeFailure,
  [Types.UPDATE_BADGE_REQUEST]: updateBadgeRequest,
  [Types.UPDATE_BADGE_SUCCESS]: updateBadgeSuccess,
  [Types.UPDATE_BADGE_FAILURE]: updateBadgeFailure,
  [Types.UPDATE_BADGE_IMAGE_URL_REQUEST]: updateBadgeImageUrlRequest,
  [Types.UPDATE_BADGE_IMAGE_URL_SUCCESS]: updateBadgeImageUrlSuccess,
  [Types.UPDATE_BADGE_IMAGE_URL_FAILURE]: updateBadgeImageUrlFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
