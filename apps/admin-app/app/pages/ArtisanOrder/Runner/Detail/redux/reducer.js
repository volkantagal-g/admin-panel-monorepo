import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getRunnerById: {
    isPending: false,
    data: {},
    error: null,
  },
  getTasksByRunnerId: {
    isPending: false,
    data: {},
    error: null,
  },
  updateRunner: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const getRunnerByIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getRunnerById: {
      ...INITIAL_STATE.getRunnerById,
      isPending: true,
    },
  };
};

export const getRunnerByIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getRunnerById: {
      ...INITIAL_STATE.getRunnerById,
      data,
      isPending: false,
    },
  };
};

export const getRunnerByIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getRunnerById: {
      ...INITIAL_STATE.getRunnerById,
      isPending: false,
      error,
    },
  };
};
export const getTasksByRunnerIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getTasksByRunnerId: {
      ...INITIAL_STATE.getTasksByRunnerId,
      isPending: true,
    },
  };
};

export const getTasksByRunnerIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getTasksByRunnerId: {
      ...INITIAL_STATE.getTasksByRunnerId,
      data,
      isPending: false,
    },
  };
};

export const getTasksByRunnerIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getTasksByRunnerId: {
      ...INITIAL_STATE.getTasksByRunnerId,
      isPending: false,
      error,
    },
  };
};

export const updateRunnerRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateRunner: {
      ...INITIAL_STATE.updateRunner,
      isPending: true,
    },
  };
};

export const updateRunnerSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateRunner: {
      ...INITIAL_STATE.updateRunner,
      data,
      isPending: false,
    },
  };
};

export const updateRunnerFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateRunner: {
      ...INITIAL_STATE.updateRunner,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_RUNNER_BY_ID_REQUEST]: getRunnerByIdRequest,
  [Types.GET_RUNNER_BY_ID_SUCCESS]: getRunnerByIdSuccess,
  [Types.GET_RUNNER_BY_ID_FAILURE]: getRunnerByIdFailure,
  [Types.GET_TASKS_BY_RUNNER_ID_REQUEST]: getTasksByRunnerIdRequest,
  [Types.GET_TASKS_BY_RUNNER_ID_SUCCESS]: getTasksByRunnerIdSuccess,
  [Types.GET_TASKS_BY_RUNNER_ID_FAILURE]: getTasksByRunnerIdFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
