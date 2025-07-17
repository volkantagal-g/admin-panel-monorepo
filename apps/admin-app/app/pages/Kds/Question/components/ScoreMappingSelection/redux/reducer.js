import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  scoreMapping: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getScoreMappingsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    scoreMapping: {
      ...state.scoreMapping,
      isPending: true,
    },
  };
};

export const getScoreMappingsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    scoreMapping: {
      ...state.scoreMapping,
      data,
      isPending: false,
    },
  };
};

export const getScoreMappingsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    scoreMapping: {
      ...state.scoreMapping,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_SCORE_MAPPING_LIST_REQUEST]: getScoreMappingsRequest,
  [Types.GET_SCORE_MAPPING_LIST_SUCCESS]: getScoreMappingsSuccess,
  [Types.GET_SCORE_MAPPING_LIST_FAILURE]: getScoreMappingsFailure,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
