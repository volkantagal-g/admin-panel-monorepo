import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  crisisTopics: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getCrisisTopicsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    crisisTopics: {
      ...state.crisisTopics,
      isPending: true,
    },
  };
};

export const getCrisisTopicsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    crisisTopics: {
      ...state.crisisTopics,
      data,
      isPending: false,
    },
  };
};

export const getCrisisTopicsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    crisisTopics: {
      ...state.crisisTopics,
      isPending: false,
      error,
    },
  };
};

export const destroy = state => {
  return { ...INITIAL_STATE, crisisTopics: { ...INITIAL_STATE.crisisTopics, data: state.crisisTopics.data } };
};

export const HANDLERS = {
  [Types.GET_CRISIS_TOPICS_REQUEST]: getCrisisTopicsRequest,
  [Types.GET_CRISIS_TOPICS_SUCCESS]: getCrisisTopicsSuccess,
  [Types.GET_CRISIS_TOPICS_FAILURE]: getCrisisTopicsFailure,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
