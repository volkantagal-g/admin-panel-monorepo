import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  kdsQuestionsList: {
    data: [],
    total: 0,
    isPending: false,
    error: null,
  },
};

export const getKdsQuestionsListRequest = state => {
  return {
    ...state,
    kdsQuestionsList: {
      ...state.kdsQuestionsList,
      isPending: true,
    },
  };
};

export const getKdsQuestionsListSuccess = (state, { data, total }) => {
  return {
    ...state,
    kdsQuestionsList: {
      ...state.kdsQuestionsList,
      data,
      total,
      isPending: false,
    },
  };
};

export const getKdsQuestionsListFailure = (state, { error }) => {
  return {
    ...state,
    kdsQuestionsList: {
      ...state.kdsQuestionsList,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_KDS_QUESTION_LIST_REQUEST]: getKdsQuestionsListRequest,
  [Types.GET_KDS_QUESTION_LIST_SUCCESS]: getKdsQuestionsListSuccess,
  [Types.GET_KDS_QUESTION_LIST_FAILURE]: getKdsQuestionsListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
