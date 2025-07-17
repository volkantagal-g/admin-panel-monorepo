import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  kdsQuestionGroupList: {
    data: [],
    total: 0,
    isPending: false,
  },
};

export const kdsQuestionGroupListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    kdsQuestionGroupList: {
      ...state.kdsQuestionGroupList,
      isPending: true,
    },
  };
};

export const kdsQuestionGroupListSuccess = (state = INITIAL_STATE, { data = [], total = 0 }) => {
  return {
    ...state,
    kdsQuestionGroupList: {
      ...state.kdsQuestionGroupList,
      data,
      total,
      isPending: false,
    },
  };
};

export const kdsQuestionGroupListFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    kdsQuestionGroupList: {
      ...state.kdsQuestionGroupList,
      data: [],
      total: 0,
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_KDS_QUESTION_GROUP_LIST_REQUEST]: kdsQuestionGroupListRequest,
  [Types.GET_KDS_QUESTION_GROUP_LIST_SUCCESS]: kdsQuestionGroupListSuccess,
  [Types.GET_KDS_QUESTION_GROUP_LIST_FAILURE]: kdsQuestionGroupListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
