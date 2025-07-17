import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  categories: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getCategoryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    categories: {
      ...state.categories,
      isPending: true,
    },
  };
};

export const getCategorySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    categories: {
      ...state.categories,
      data,
      isPending: false,
    },
  };
};

export const getCategoryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    categories: {
      ...state.categories,
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
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
