import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  feedbackSources: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getFeedbackSourceRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    feedbackSources: {
      ...state.feedbackSources,
      isPending: true,
    },
  };
};

export const getFeedbackSourceSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    feedbackSources: {
      ...state.feedbackSources,
      data,
      isPending: false,
    },
  };
};

export const getFeedbackSourceFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    feedbackSources: {
      ...state.feedbackSources,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_FEEDBACK_SOURCE_REQUEST]: getFeedbackSourceRequest,
  [Types.GET_FEEDBACK_SOURCE_SUCCESS]: getFeedbackSourceSuccess,
  [Types.GET_FEEDBACK_SOURCE_FAILURE]: getFeedbackSourceFailure,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
