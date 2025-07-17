import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  question: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const createKdsQuestionRequest = (state, { requestBody }) => {
  return {
    ...state,
    question: {
      ...state.question,
      data: requestBody,
      isPending: true,
    },
  };
};

export const createKdsQuestionSuccess = (state, { data }) => {
  return {
    ...state,
    question: {
      ...state.question,
      data,
      isPending: false,
    },
  };
};

export const createKdsQuestionFailure = (state, { error }) => {
  return {
    ...state,
    question: {
      ...state.question,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_KDS_QUESTION_REQUEST]: createKdsQuestionRequest,
  [Types.CREATE_KDS_QUESTION_SUCCESS]: createKdsQuestionSuccess,
  [Types.CREATE_KDS_QUESTION_FAILURE]: createKdsQuestionFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
