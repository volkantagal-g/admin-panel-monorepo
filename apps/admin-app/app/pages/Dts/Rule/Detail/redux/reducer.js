import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  dtsRuleDetail: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getDtsRuleDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    dtsRuleDetail: {
      ...state.dtsRuleDetail,
      isPending: true,
    },
  };
};

export const getDtsRuleDetailSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    dtsRuleDetail: {
      ...state.dtsRuleDetail,
      data,
      isPending: false,
    },
  };
};

export const getDtsRuleDetailFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    dtsRuleDetail: {
      ...state.dtsRuleDetail,
      isPending: false,
      error,
    },
  };
};

export const updateDtsRuleDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    dtsRuleDetail: {
      ...state.dtsRuleDetail,
      isPending: true,
    },
  };
};

export const updateDtsRuleDetailFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    dtsRuleDetail: {
      ...state.dtsRuleDetail,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_DTS_RULE_DETAIL_REQUEST]: getDtsRuleDetailRequest,
  [Types.GET_DTS_RULE_DETAIL_SUCCESS]: getDtsRuleDetailSuccess,
  [Types.GET_DTS_RULE_DETAIL_FAILURE]: getDtsRuleDetailFailure,
  [Types.UPDATE_DTS_RULE_DETAIL_REQUEST]: updateDtsRuleDetailRequest,
  [Types.UPDATE_DTS_RULE_DETAIL_FAILURE]: updateDtsRuleDetailFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
