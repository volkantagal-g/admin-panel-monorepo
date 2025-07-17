import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getCategory: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const getCategoryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getCategory: {
      isPending: true,
      error: null,
    },
  };
};

export const getCategorySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getCategory: {
      isPending: false,
      data,
      error: false,
    },
  };
};

export const getCategoryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getCategory: {
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_CATEGORY_REQUEST]: getCategoryRequest,
  [Types.GET_CATEGORY_SUCCESS]: getCategorySuccess,
  [Types.GET_CATEGORY_FAILURE]: getCategoryFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
