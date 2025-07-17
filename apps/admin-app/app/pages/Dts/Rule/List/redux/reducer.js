import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  dtsRuleList: {
    data: [],
    total: 0,
    isPending: false,
    error: null,
  },
};

export const getDtsRuleListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    dtsRuleList: {
      ...state.dtsRuleList,
      isPending: true,
    },
  };
};

export const getDtsRuleListSuccess = (state = INITIAL_STATE, { data, total }) => {
  return {
    ...state,
    dtsRuleList: {
      ...state.dtsRuleList,
      data,
      total,
      isPending: false,
    },
  };
};

export const getDtsRuleListFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    dtsRuleList: {
      ...state.dtsRuleList,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_DTS_RULE_LIST_REQUEST]: getDtsRuleListRequest,
  [Types.GET_DTS_RULE_LIST_SUCCESS]: getDtsRuleListSuccess,
  [Types.GET_DTS_RULE_LIST_FAILURE]: getDtsRuleListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
