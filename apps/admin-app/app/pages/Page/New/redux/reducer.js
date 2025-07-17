import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createPage: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const createPageRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createPage: {
      ...INITIAL_STATE.createPage,
      isPending: true,
    },
  };
};

export const createPageSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createPage: {
      ...INITIAL_STATE.createPage,
      data,
      isPending: false,
    },
  };
};

export const createPageFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createPage: {
      ...INITIAL_STATE.createPage,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_PAGE_REQUEST]: createPageRequest,
  [Types.CREATE_PAGE_SUCCESS]: createPageSuccess,
  [Types.CREATE_PAGE_FAILURE]: createPageFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
