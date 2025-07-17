import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  topics: {
    data: [],
    isPending: false,
  },
};

export const getTopicsRequest = state => {
  return {
    ...state,
    topics: {
      ...state.topics,
      isPending: true,
    },
  };
};

export const getTopicsSuccess = (state, { data }) => {
  return {
    ...state,
    topics: {
      ...state.topics,
      data,
      isPending: false,
    },
  };
};

export const getTopicsFailure = state => {
  return {
    ...state,
    topics: {
      ...state.topics,
      data: [],
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_TOPICS_REQUEST]: getTopicsRequest,
  [Types.GET_TOPICS_SUCCESS]: getTopicsSuccess,
  [Types.GET_TOPICS_FAILURE]: getTopicsFailure,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
