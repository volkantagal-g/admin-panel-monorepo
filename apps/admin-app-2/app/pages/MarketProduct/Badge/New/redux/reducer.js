import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createBadge: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const createBadgeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createBadge: {
      ...INITIAL_STATE.createBadge,
      isPending: true,
    },
  };
};

export const createBadgeSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createBadge: {
      ...INITIAL_STATE.createBadge,
      data,
      isPending: false,
    },
  };
};

export const createBadgeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createBadge: {
      ...INITIAL_STATE.createBadge,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_BADGE_REQUEST]: createBadgeRequest,
  [Types.CREATE_BADGE_SUCCESS]: createBadgeSuccess,
  [Types.CREATE_BADGE_FAILURE]: createBadgeFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
