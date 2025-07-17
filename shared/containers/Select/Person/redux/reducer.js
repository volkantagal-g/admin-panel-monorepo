import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  people: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getPeopleRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    people: {
      ...state.people,
      isPending: true,
    },
  };
};

export const getPeopleSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    people: {
      ...state.people,
      data,
      isPending: false,
    },
  };
};

export const getPeopleFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    people: {
      ...state.people,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_PEOPLE_REQUEST]: getPeopleRequest,
  [Types.GET_PEOPLE_SUCCESS]: getPeopleSuccess,
  [Types.GET_PEOPLE_FAILURE]: getPeopleFailure,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
