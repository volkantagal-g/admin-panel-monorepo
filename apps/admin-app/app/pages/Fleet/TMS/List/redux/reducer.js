import { createReducer } from 'reduxsauce';

import { Types } from './action';

export const INITIAL_STATE = {
  vehicleList: {
    data: [],
    isPending: false,
    error: null,
  },
  deleteVehicle: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getVehicleListRequest = state => {
  return {
    ...state,
    vehicleList: {
      ...state.vehicleList,
      isPending: true,
    },
  };
};

export const getVehicleListSuccess = (state, { data }) => {
  return {
    ...state,
    vehicleList: {
      ...state.vehicleList,
      data,
      isPending: false,
    },
  };
};

export const getVehicleListFailure = (state, { error }) => {
  return {
    ...state,
    vehicleList: {
      ...state.vehicleList,
      isPending: false,
      error,
    },
  };
};

export const deleteVehicleRequest = state => {
  return {
    ...state,
    deleteVehicle: {
      ...state.deleteVehicle,
      isPending: true,
    },
  };
};

export const deleteVehicleSuccess = (state, { data }) => {
  return {
    ...state,
    deleteVehicle: {
      ...state.deleteVehicle,
      data,
      isPending: false,
    },
  };
};

export const deleteVehicleFailure = (state, { error }) => {
  return {
    ...state,
    deleteVehicle: {
      ...state.deleteVehicle,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_VEHICLE_LIST]: getVehicleListRequest,
  [Types.GET_VEHICLE_LIST_SUCCESS]: getVehicleListSuccess,
  [Types.GET_VEHICLE_LIST_FAILURE]: getVehicleListFailure,
  [Types.DELETE_VEHICLE]: deleteVehicleRequest,
  [Types.DELETE_VEHICLE_SUCCESS]: deleteVehicleSuccess,
  [Types.DELETE_VEHICLE_FAILURE]: deleteVehicleFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
