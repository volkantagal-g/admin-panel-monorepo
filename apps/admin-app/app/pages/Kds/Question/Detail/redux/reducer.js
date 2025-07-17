import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  questionDetail: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getKdsQuestionDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    questionDetail: {
      ...state.questionDetail,
      isPending: true,
    },
  };
};

export const getKdsQuestionDetailSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    questionDetail: {
      ...state.questionDetail,
      data,
      isPending: false,
    },
  };
};

export const getKdsQuestionDetailFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    questionDetail: {
      ...state.questionDetail,
      isPending: false,
      error,
    },
  };
};

export const updateKdsQuestionRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    questionDetail: {
      ...state.questionDetail,
      isPending: true,
    },
  };
};

export const updateKdsQuestionFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    questionDetail: {
      ...state.questionDetail,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_KDS_QUESTION_DETAIL_REQUEST]: getKdsQuestionDetailRequest,
  [Types.GET_KDS_QUESTION_DETAIL_SUCCESS]: getKdsQuestionDetailSuccess,
  [Types.GET_KDS_QUESTION_DETAIL_FAILURE]: getKdsQuestionDetailFailure,
  [Types.UPDATE_KDS_QUESTION_REQUEST]: updateKdsQuestionRequest,
  [Types.UPDATE_KDS_QUESTION_FAILURE]: updateKdsQuestionFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
