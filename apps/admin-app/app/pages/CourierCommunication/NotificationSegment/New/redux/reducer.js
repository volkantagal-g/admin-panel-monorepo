import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  courierIds: {
    data: [],
    isPending: false,
    error: null,
  },
  segment: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getCourierIdsRequest = state => {
  return {
    ...state,
    courierIds: {
      ...state.courierIds,
      isPending: true,
    },
  };
};

export const getCourierIdsSuccess = (state, { data }) => {
  return {
    ...state,
    courierIds: {
      ...state.courierIds,
      data,
      isPending: false,
    },
  };
};

export const getCourierIdsFailure = (state, { error }) => {
  return {
    ...state,
    courierIds: {
      ...state.courierIds,
      isPending: true,
      error,
    },
  };
};

export const createSegmentRequest = state => {
  return {
    ...state,
    segment: {
      ...state.segment,
      isPending: true,
    },
  };
};

export const createSegmentSuccess = (state, { data }) => {
  return {
    ...state,
    segment: {
      ...state.segment,
      data,
      isPending: false,
    },
  };
};

export const createSegmentFailure = (state, { error }) => {
  return {
    ...state,
    segment: {
      ...state.segment,
      isPending: true,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_COURIER_IDS]: getCourierIdsRequest,
  [Types.GET_COURIER_IDS_SUCCESS]: getCourierIdsSuccess,
  [Types.GET_COURIER_IDS_FAILURE]: getCourierIdsFailure,
  [Types.NEW_SEGMENT]: createSegmentRequest,
  [Types.NEW_SEGMENT_SUCCESS]: createSegmentSuccess,
  [Types.NEW_SEGMENT_FAILURE]: createSegmentFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
