import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  taskHistory: {
    isPending: false,
    data: [],
  },
};

export const getTaskHistoryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    taskHistory: {
      ...state.taskHistory,
      isPending: true,
    },
  };
};

export const getTaskHistorySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    taskHistory: {
      ...state.taskHistory,
      isPending: false,
      data,
    },
  };
};

export const getTaskHistoryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    taskHistory: {
      ...state.taskHistory,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_TASK_HISTORY_REQUEST]: getTaskHistoryRequest,
  [Types.GET_TASK_HISTORY_SUCCESS]: getTaskHistorySuccess,
  [Types.GET_TASK_HISTORY_FAILURE]: getTaskHistoryFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
