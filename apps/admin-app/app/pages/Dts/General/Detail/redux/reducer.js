import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  dtsDetail: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getDtsDetailRequest = state => {
  return {
    ...state,
    dtsDetail: {
      ...state.dtsDetail,
      isPending: true,
    },
  };
};

export const getDtsDetailSuccess = (state, { data }) => {
  return {
    ...state,
    dtsDetail: {
      ...state.dtsDetail,
      data,
      isPending: false,
    },
  };
};

export const getDtsDetailFailure = (state, { error }) => {
  return {
    ...state,
    dtsDetail: {
      ...state.dtsDetail,
      isPending: false,
      error,
    },
  };
};

export const updateDtsDetailRequest = state => {
  return {
    ...state,
    dtsDetail: {
      ...state.dtsDetail,
      isPending: true,
    },
  };
};

export const updateDtsDetailFailure = (state, { error }) => {
  return {
    ...state,
    dtsDetail: {
      ...state.dtsDetail,
      isPending: false,
      error,
    },
  };
};

export const updateDtsDecisionRequest = state => {
  return {
    ...state,
    dtsDetail: {
      ...state.dtsDetail,
      isPending: true,
    },
  };
};

export const updateDtsDecisionFailure = (state, { error }) => {
  return {
    ...state,
    dtsDetail: {
      ...state.dtsDetail,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_DTS_DETAIL_REQUEST]: getDtsDetailRequest,
  [Types.GET_DTS_DETAIL_SUCCESS]: getDtsDetailSuccess,
  [Types.GET_DTS_DETAIL_FAILURE]: getDtsDetailFailure,
  [Types.UPDATE_DTS_DETAIL_REQUEST]: updateDtsDetailRequest,
  [Types.UPDATE_DTS_DETAIL_FAILURE]: updateDtsDetailFailure,
  [Types.UPDATE_DTS_DECISION_REQUEST]: updateDtsDecisionRequest,
  [Types.UPDATE_DTS_DECISION_FAILURE]: updateDtsDecisionFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
