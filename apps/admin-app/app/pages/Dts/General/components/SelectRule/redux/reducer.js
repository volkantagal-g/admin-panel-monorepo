import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  rules: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getRuleRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    rules: {
      ...state.rules,
      isPending: true,
    },
  };
};

export const getRuleSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    rules: {
      ...state.rules,
      data,
      isPending: false,
    },
  };
};

export const getRuleFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    rules: {
      ...state.rules,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_RULE_REQUEST]: getRuleRequest,
  [Types.GET_RULE_SUCCESS]: getRuleSuccess,
  [Types.GET_RULE_FAILURE]: getRuleFailure,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
