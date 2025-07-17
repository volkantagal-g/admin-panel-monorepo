import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createRunner: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const createRunnerRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createRunner: {
      ...INITIAL_STATE.createRunner,
      isPending: true,
    },
  };
};

export const createRunnerSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createRunner: {
      ...INITIAL_STATE.createRunner,
      data,
      isPending: false,
    },
  };
};

export const createRunnerFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createRunner: {
      ...INITIAL_STATE.createRunner,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_RUNNER_REQUEST]: createRunnerRequest,
  [Types.CREATE_RUNNER_SUCCESS]: createRunnerSuccess,
  [Types.CREATE_RUNNER_FAILURE]: createRunnerFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
