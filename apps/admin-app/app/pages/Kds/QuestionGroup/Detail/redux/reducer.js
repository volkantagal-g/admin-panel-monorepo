import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  kdsQuestionGroupDetail: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getKdsQuestionGroupDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    kdsQuestionGroupDetail: {
      ...state.kdsQuestionGroupDetail,
      isPending: true,
    },
  };
};

export const getKdsQuestionGroupDetailSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    kdsQuestionGroupDetail: {
      ...state.kdsQuestionGroupDetail,
      data,
      isPending: false,
    },
  };
};

export const getKdsQuestionGroupDetailFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    kdsQuestionGroupDetail: {
      ...state.kdsQuestionGroupDetail,
      isPending: false,
      error,
    },
  };
};

export const updateKdsQuestionGroupRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    kdsQuestionGroupDetail: {
      ...state.kdsQuestionGroupDetail,
      isPending: true,
    },
  };
};

export const updateKdsQuestionGroupFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    kdsQuestionGroupDetail: {
      ...state.kdsQuestionGroupDetail,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_KDS_QUESTION_GROUP_DETAIL_REQUEST]: getKdsQuestionGroupDetailRequest,
  [Types.GET_KDS_QUESTION_GROUP_DETAIL_SUCCESS]: getKdsQuestionGroupDetailSuccess,
  [Types.GET_KDS_QUESTION_GROUP_DETAIL_FAILURE]: getKdsQuestionGroupDetailFailure,
  [Types.UPDATE_KDS_QUESTION_GROUP_REQUEST]: updateKdsQuestionGroupRequest,
  [Types.UPDATE_KDS_QUESTION_GROUP_FAILURE]: updateKdsQuestionGroupFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);