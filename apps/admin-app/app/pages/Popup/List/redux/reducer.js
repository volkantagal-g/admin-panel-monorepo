import { createReducer } from 'reduxsauce';

import { Types } from '@app/pages/Popup/List/redux/actions';
import { POPUP_STATUS_TYPE } from '@app/pages/Popup/constants';

export const INITIAL_STATE = {
  globalRuleset: {
    data: {},
    isPending: false,
    error: null,
  },
  results: {
    data: { content: [] },
    isPending: false,
    error: null,
  },
  filters: {
    status: POPUP_STATUS_TYPE.ACTIVE,
    page: 0,
    size: 10,
  },
};

export const setTableFilters = (state = INITIAL_STATE, { filters }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      ...filters,
    },
    results: {
      ...state.results,
      error: null,
      isPending: true,
    },
  };
};

// Get filtered results
export const getResultsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    results: {
      ...state.results,
      isPending: true,
      error: null,
    },
  };
};

export const getResultsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    results: {
      ...state.results,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getResultsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    results: {
      ...state.results,
      isPending: false,
      error,
    },
  };
};

// Global Ruleset
export const setGlobalRulesetRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    globalRuleset: {
      ...state.globalRuleset,
      isPending: true,
      error: null,
    },
  };
};

export const setGlobalRulesetSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    globalRuleset: {
      ...state.globalRuleset,
      data,
      error: null,
      isPending: false,
    },
  };
};

export const setGlobalRulesetFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    globalRuleset: {
      ...state.globalRuleset,
      isPending: false,
      error,
    },
  };
};

export const getGlobalRulesetRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    globalRuleset: {
      ...state.globalRuleset,
      isPending: true,
      error: null,
    },
  };
};

export const getGlobalRulesetSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    globalRuleset: {
      ...state.globalRuleset,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getGlobalRulesetFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    globalRuleset: {
      ...state.globalRuleset,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.SET_TABLE_FILTERS]: setTableFilters,
  [Types.GET_RESULTS_REQUEST]: getResultsRequest,
  [Types.GET_RESULTS_SUCCESS]: getResultsSuccess,
  [Types.GET_RESULTS_FAILURE]: getResultsFailure,

  [Types.GET_GLOBAL_RULESET_REQUEST]: getGlobalRulesetRequest,
  [Types.GET_GLOBAL_RULESET_SUCCESS]: getGlobalRulesetSuccess,
  [Types.GET_GLOBAL_RULESET_FAILURE]: getGlobalRulesetFailure,

  [Types.SET_GLOBAL_RULESET_REQUEST]: setGlobalRulesetRequest,
  [Types.SET_GLOBAL_RULESET_SUCCESS]: setGlobalRulesetSuccess,
  [Types.SET_GLOBAL_RULESET_FAILURE]: setGlobalRulesetFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
