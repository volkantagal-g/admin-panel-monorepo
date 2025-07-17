import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  locationWriteOff: {
    data: [],
    total: 0,
    isPending: false,
    error: null,
  },
  locations: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const filterLocationWriteOffRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    locationWriteOff: {
      ...state.locationWriteOff,
      isPending: true,
    },
  };
};

export const filterLocationWriteOffSuccess = (state = INITIAL_STATE, { locationWriteOffs = [], total }) => {
  return {
    ...state,
    locationWriteOff: {
      ...state.locationWriteOff,
      data: locationWriteOffs,
      total,
      isPending: false,
    },
  };
};

export const filterLocationWriteOffFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    locationWriteOff: {
      ...state.locationWriteOff,
      isPending: false,
      error,
    },
  };
};

export const getLocationsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    locations: {
      ...state.locations,
      isPending: true,
    },
  };
};

export const getLocationsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    locations: {
      ...state.locations,
      data,
      isPending: false,
    },
  };
};

export const getLocationsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    locations: {
      ...state.locations,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.FILTER_LOCATION_WRITE_OFF_REQUEST]: filterLocationWriteOffRequest,
  [Types.FILTER_LOCATION_WRITE_OFF_SUCCESS]: filterLocationWriteOffSuccess,
  [Types.FILTER_LOCATION_WRITE_OFF_FAILURE]: filterLocationWriteOffFailure,
  [Types.GET_LOCATIONS_REQUEST]: getLocationsRequest,
  [Types.GET_LOCATIONS_SUCCESS]: getLocationsSuccess,
  [Types.GET_LOCATIONS_FAILURE]: getLocationsFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
