import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  repositories: {
    data: [],
    error: null,
    isPending: false,
  },
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const getRepositoriesRequest = state => {
  return {
    ...state,
    repositories: {
      ...state.repositories,
      isPending: true,
    },
  };
};

export const getRepositoriesSuccess = (state, { data }) => {
  return {
    ...state,
    repositories: {
      ...state.repositories,
      data,
      isPending: false,
    },
  };
};

export const getRepositoriesFailure = (state, { error }) => {
  return {
    ...state,
    repositories: {
      ...state.repositories,
      isPending: false,
      error,
    },
  };
};

export const HANDLERS = {
  [Types.GET_REPOSITORIES_REQUEST]: getRepositoriesRequest,
  [Types.GET_REPOSITORIES_SUCCESS]: getRepositoriesSuccess,
  [Types.GET_REPOSITORIES_FAILURE]: getRepositoriesFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
