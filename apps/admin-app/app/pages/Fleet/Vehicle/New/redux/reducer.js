import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createVehicle: {
    data: [],
    isPending: false,
    error: null,
  },
  vehicleType: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const createVehicleRequest = state => {
  return {
    ...state,
    createVehicle: {
      ...state.createVehicle,
      isPending: true,
    },
  };
};

export const createVehicleRequestSuccess = (state, { data }) => {
  return {
    ...state,
    createVehicle: {
      ...state.createVehicle,
      data,
      isPending: false,
    },
  };
};

export const createVehicleRequestFailure = (state, { error }) => {
  return {
    ...state,
    createVehicle: {
      ...state.createVehicle,
      isPending: false,
      error,
    },
  };
};

export const getVehicleType = state => {
  return {
    ...state,
    vehicleType: {
      ...state.vehicleType,
      isPending: true,
    },
  };
};

export const getVehicleTypeSuccess = (state, { data }) => {
  return {
    ...state,
    vehicleType: {
      ...state.vehicleType,
      data,
      isPending: false,
    },
  };
};

export const getVehicleTypeFailure = (state, { error }) => {
  return {
    ...state,
    vehicleType: {
      ...state.vehicleType,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_VEHICLE_REQUEST]: createVehicleRequest,
  [Types.CREATE_VEHICLE_REQUEST_SUCCESS]: createVehicleRequestSuccess,
  [Types.CREATE_VEHICLE_REQUEST_FAILURE]: createVehicleRequestFailure,
  [Types.GET_VEHICLE_TYPE]: getVehicleType,
  [Types.GET_VEHICLE_TYPE_SUCCESS]: getVehicleTypeSuccess,
  [Types.GET_VEHICLE_TYPE_FAILURE]: getVehicleTypeFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
