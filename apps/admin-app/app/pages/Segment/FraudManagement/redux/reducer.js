import { createReducer } from 'reduxsauce';

import { Types } from '@app/pages/Segment/FraudManagement/redux/actions';

export const INITIAL_STATE = {
  segment: {
    isPending: false,
    data: {},
    error: null,
  },
  isPending: false,
  data: [],
  error: null,
};

export const addClientsToSegmentRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    segment: {
      ...INITIAL_STATE.segment,
      isPending: true,
      error: null,
    },
  };
};

export const addClientsToSegmentSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    segment: {
      ...INITIAL_STATE.segment,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const addClientsToSegmentFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    segment: {
      ...INITIAL_STATE.segment,
      isPending: false,
      error,
    },
  };
};

export const removeClientsFromSegmentRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    segment: {
      ...INITIAL_STATE.segment,
      isPending: true,
      error: null,
    },
  };
};

export const removeClientsFromSegmentSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    segment: {
      ...INITIAL_STATE.segment,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const removeClientsFromSegmentFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    segment: {
      ...INITIAL_STATE.segment,
      isPending: false,
      error,
    },
  };
};

export const getSegmentOptionsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    isPending: true,
  };
};

export const getSegmentOptionsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    data,
    isPending: false,

  };
};

export const getSegmentOptionsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    isPending: false,
    error,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.ADD_CLIENTS_TO_SEGMENT_REQUEST]: addClientsToSegmentRequest,
  [Types.ADD_CLIENTS_TO_SEGMENT_SUCCESS]: addClientsToSegmentSuccess,
  [Types.ADD_CLIENTS_TO_SEGMENT_FAILURE]: addClientsToSegmentFailure,

  [Types.REMOVE_CLIENTS_FROM_SEGMENT_REQUEST]: removeClientsFromSegmentRequest,
  [Types.REMOVE_CLIENTS_FROM_SEGMENT_SUCCESS]: removeClientsFromSegmentSuccess,
  [Types.REMOVE_CLIENTS_FROM_SEGMENT_FAILURE]: removeClientsFromSegmentFailure,

  [Types.GET_SEGMENT_OPTIONS_REQUEST]: getSegmentOptionsRequest,
  [Types.GET_SEGMENT_OPTIONS_SUCCESS]: getSegmentOptionsSuccess,
  [Types.GET_SEGMENT_OPTIONS_FAILURE]: getSegmentOptionsFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
