import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createDtsRule: {
    isPending: false,
    error: null,
  },
};

export const createDtsRuleRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createDtsRule: {
      ...state.createDtsRule,
      isPending: true,
    },
  };
};

export const createDtsRuleSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    createDtsRule: {
      ...state.createDtsRule,
      isPending: false,
    },
  };
};

export const createDtsRuleFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createDtsRule: {
      ...state.createDtsRule,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_DTS_RULE_REQUEST]: createDtsRuleRequest,
  [Types.CREATE_DTS_RULE_SUCCESS]: createDtsRuleSuccess,
  [Types.CREATE_DTS_RULE_FAILURE]: createDtsRuleFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
