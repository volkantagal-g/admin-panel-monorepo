import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  questionGroup: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getQuestionGroupsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    questionGroup: {
      ...state.questionGroup,
      isPending: true,
    },
  };
};

export const getQuestionGroupSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    questionGroup: {
      ...state.questionGroup,
      data,
      isPending: false,
    },
  };
};

export const getQuestionGroupFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    questionGroup: {
      ...state.questionGroup,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_QUESTION_GROUP_LIST_REQUEST]: getQuestionGroupsRequest,
  [Types.GET_QUESTION_GROUP_LIST_SUCCESS]: getQuestionGroupSuccess,
  [Types.GET_QUESTION_GROUP_LIST_FAILURE]: getQuestionGroupFailure,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
