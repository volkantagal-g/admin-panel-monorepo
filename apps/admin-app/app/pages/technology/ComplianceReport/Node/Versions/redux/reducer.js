import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  nodeVersions: {
    data: [],
    error: null,
    isPending: false,
  },
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const getNodeVersionsRequest = state => {
  return {
    ...state,
    nodeVersions: {
      ...state.nodeVersions,
      isPending: true,
    },
  };
};

export const getNodeVersionsSuccess = (state, { data }) => {
  return {
    ...state,
    nodeVersions: {
      ...state.nodeVersions,
      data,
      isPending: false,
    },
  };
};

export const getNodeVersionsFailure = (state, { error }) => {
  return {
    ...state,
    nodeVersions: {
      ...state.nodeVersions,
      isPending: false,
      error,
    },
  };
};

export const HANDLERS = {
  [Types.GET_NODE_VERSIONS_REQUEST]: getNodeVersionsRequest,
  [Types.GET_NODE_VERSIONS_SUCCESS]: getNodeVersionsSuccess,
  [Types.GET_NODE_VERSIONS_FAILURE]: getNodeVersionsFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
