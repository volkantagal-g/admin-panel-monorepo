import { createReducer } from 'reduxsauce';

import { Types } from './action';

export const INITIAL_STATE = {
  vehicleDetails: {
    data: [],
    isPending: false,
    error: null,
  },
  vehicleType: {
    data: [],
    isPending: false,
    error: null,
  },
  updateVehicle: {
    data: [],
    isPending: false,
    error: null,
  },
  vehicleLogs: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getVehicleDetailsRequest = state => {
  return {
    ...state,
    vehicleDetails: {
      ...state.vehicleDetails,
      isPending: true,
    },
  };
};

export const getVehicleDetailsSuccess = (state, { data }) => {
  return {
    ...state,
    vehicleDetails: {
      ...state.vehicleDetails,
      data,
      isPending: false,
    },
  };
};

export const getVehicleDetailsFailure = (state, { error }) => {
  return {
    ...state,
    vehicleDetails: {
      ...state.vehicleDetails,
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

export const updateVehicle = state => {
  return {
    ...state,
    updateVehicle: {
      ...state.updateVehicle,
      isPending: true,
    },
  };
};

export const updateVehicleRequestSuccess = (state, { data }) => {
  return {
    ...state,
    updateVehicle: {
      ...state.updateVehicle,
      data,
      isPending: false,
    },
  };
};

export const updateVehicleRequestFailure = (state, { error }) => {
  return {
    ...state,
    updateVehicle: {
      ...state.updateVehicle,
      isPending: true,
      error,
    },
  };
};

export const getVehicleLogsRequest = state => {
  return {
    ...state,
    vehicleLogs: {
      ...state.vehicleLogs,
      isPending: true,
    },
  };
};

export const getVehicleLogsSuccess = (state, { data }) => {
  return {
    ...state,
    vehicleLogs: {
      ...state.vehicleLogs,
      data,
      isPending: false,
    },
  };
};

export const getVehicleLogsFailure = (state, { error }) => {
  return {
    ...state,
    vehicleLogs: {
      ...state.vehicleLogs,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_VEHICLE_DETAILS]: getVehicleDetailsRequest,
  [Types.GET_VEHICLE_DETAILS_SUCCESS]: getVehicleDetailsSuccess,
  [Types.GET_VEHICLE_DETAILS_FAILURE]: getVehicleDetailsFailure,
  [Types.GET_VEHICLE_TYPE]: getVehicleType,
  [Types.GET_VEHICLE_TYPE_SUCCESS]: getVehicleTypeSuccess,
  [Types.GET_VEHICLE_TYPE_FAILURE]: getVehicleTypeFailure,
  [Types.UPDATE_VEHICLE_REQUEST]: updateVehicle,
  [Types.UPDATE_VEHICLE_REQUEST_SUCCESS]: updateVehicleRequestSuccess,
  [Types.UPDATE_VEHICLE_REQUEST_FAILURE]: updateVehicleRequestFailure,
  [Types.GET_VEHICLE_LOGS_REQUEST]: getVehicleLogsRequest,
  [Types.GET_VEHICLE_LOGS_SUCCESS]: getVehicleLogsSuccess,
  [Types.GET_VEHICLE_LOGS_FAILURE]: getVehicleLogsFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
