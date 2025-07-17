import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  summary: {
    data: [],
    error: null,
    isPending: false,
  },
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const getSummaryRequest = state => {
  return {
    ...state,
    summary: {
      ...state.summary,
      isPending: true,
    },
  };
};

export const getSummarySuccess = (state, { data }) => {
  return {
    ...state,
    summary: {
      ...state.summary,
      data,
      isPending: false,
    },
  };
};

export const getSummaryFailure = (state, { error }) => {
  return {
    ...state,
    summary: {
      ...state.summary,
      isPending: false,
      error,
    },
  };
};

export const HANDLERS = {
  [Types.GET_SUMMARY_REQUEST]: getSummaryRequest,
  [Types.GET_SUMMARY_SUCCESS]: getSummarySuccess,
  [Types.GET_SUMMARY_FAILURE]: getSummaryFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
