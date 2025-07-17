import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  segmentList: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getSegmentListRequest = state => {
  return {
    ...state,
    segmentList: {
      ...state.segmentList,
      isPending: true,
    },
  };
};

export const getSegmentListSuccess = (state, { data }) => {
  return {
    ...state,
    segmentList: {
      ...state.segmentList,
      data,
      isPending: false,
    },
  };
};

export const getSegmentListFailure = (state, { error }) => {
  return {
    ...state,
    segmentList: {
      ...state.segmentList,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.SEGMENT_LIST]: getSegmentListRequest,
  [Types.SEGMENT_LIST_SUCCESS]: getSegmentListSuccess,
  [Types.SEGMENT_LIST_FAILURE]: getSegmentListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
