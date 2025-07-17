import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  mentors: {
    data: [],
    isPending: false,
  },
};

export const getMentorsRequest = state => {
  return {
    ...state,
    mentors: {
      ...state.mentors,
      isPending: true,
    },
  };
};

export const getMentorsSuccess = (state, { data }) => {
  return {
    ...state,
    mentors: {
      ...state.mentors,
      data,
      isPending: false,
    },
  };
};

export const getMentorsFailure = state => {
  return {
    ...state,
    mentors: {
      ...state.mentors,
      data: [],
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MENTORS_REQUEST]: getMentorsRequest,
  [Types.GET_MENTORS_SUCCESS]: getMentorsSuccess,
  [Types.GET_MENTORS_FAILURE]: getMentorsFailure,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
