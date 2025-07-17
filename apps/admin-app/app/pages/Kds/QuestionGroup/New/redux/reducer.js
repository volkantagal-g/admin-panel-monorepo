import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createKdsQuestionGroup: {
    isPending: false,
    error: null,
  },
};

export const createKdsQuestionGroupRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createKdsQuestionGroup: {
      ...state.createKdsQuestionGroup,
      isPending: true,
    },
  };
};

export const createKdsQuestionGroupSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    createKdsQuestionGroup: {
      ...state.createKdsQuestionGroup,
      isPending: false,
    },
  };
};

export const createKdsQuestionGroupFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createKdsQuestionGroup: {
      ...state.createKdsQuestionGroup,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_KDS_QUESTION_GROUP_REQUEST]: createKdsQuestionGroupRequest,
  [Types.CREATE_KDS_QUESTION_GROUP_SUCCESS]: createKdsQuestionGroupSuccess,
  [Types.CREATE_KDS_QUESTION_GROUP_FAILURE]: createKdsQuestionGroupFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);