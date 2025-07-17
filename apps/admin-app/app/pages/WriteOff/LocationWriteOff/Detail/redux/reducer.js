import { createReducer } from 'reduxsauce';

import { Types } from './action';

export const INITIAL_STATE = {
  locationWriteOff: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getLocationWriteOffRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    locationWriteOff: {
      ...state.locationWriteOff,
      isPending: true,
    },
  };
};

export const getLocationWriteOffSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    locationWriteOff: {
      ...state.locationWriteOff,
      data,
      isPending: false,
    },
  };
};

export const getLocationWriteOffFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    locationWriteOff: {
      ...state.locationWriteOff,
      isPending: false,
      error,
    },
  };
};

export const approveLocationWriteOffRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    locationWriteOff: {
      ...state.locationWriteOff,
      isPending: true,
    },
  };
};

export const cancelLocationWriteOffRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    locationWriteOff: {
      ...state.locationWriteOff,
      isPending: true,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_LOCATION_WRITE_OFF_REQUEST]: getLocationWriteOffRequest,
  [Types.GET_LOCATION_WRITE_OFF_SUCCESS]: getLocationWriteOffSuccess,
  [Types.GET_LOCATION_WRITE_OFF_FAILURE]: getLocationWriteOffFailure,
  [Types.APPROVE_LOCATION_WRITE_OFF_REQUEST]: approveLocationWriteOffRequest,
  [Types.CANCEL_LOCATION_WRITE_OFF_REQUEST]: cancelLocationWriteOffRequest,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
