import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  priorities: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getPriorityRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    priorities: {
      ...state.priorities,
      isPending: true,
    },
  };
};

export const getPrioritySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    priorities: {
      ...state.priorities,
      data,
      isPending: false,
    },
  };
};

export const getPriorityFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    priorities: {
      ...state.priorities,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_PRIORITY_REQUEST]: getPriorityRequest,
  [Types.GET_PRIORITY_SUCCESS]: getPrioritySuccess,
  [Types.GET_PRIORITY_FAILURE]: getPriorityFailure,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
