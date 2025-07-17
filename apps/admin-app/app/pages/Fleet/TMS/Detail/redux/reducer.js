import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  tmsVehicle: {
    isPending: false,
    data: {},
    error: null,
  },
};

const getTmsVehicleRequest = (state = INITIAL_STATE) => ({
  ...state,
  tmsVehicle: {
    ...state.tmsVehicle,
    isPending: true,
  },
});

const getTmsVehicleSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  tmsVehicle: {
    ...state.tmsVehicle,
    isPending: false,
    data,
  },
});

const getTmsVehicleSuccessFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  tmsVehicle: {
    ...state.tmsVehicle,
    isPending: false,
    error,
  },
});

const updateTmsVehicleRequest = (state = INITIAL_STATE) => ({
  ...state,
  tmsVehicle: {
    ...state.tmsVehicle,
    isPending: true,
  },
});

const updateTmsVehicleSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  tmsVehicle: {
    ...state.tmsVehicle,
    isPending: false,
    data,
  },
});

const updateTmsVehicleFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  tmsVehicle: {
    ...state.tmsVehicle,
    isPending: false,
    error,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_TMS_VEHICLE_REQUEST]: getTmsVehicleRequest,
  [Types.GET_TMS_VEHICLE_SUCCESS]: getTmsVehicleSuccess,
  [Types.GET_TMS_VEHICLE_FAILURE]: getTmsVehicleSuccessFailure,
  [Types.UPDATE_TMS_VEHICLE_REQUEST]: updateTmsVehicleRequest,
  [Types.UPDATE_TMS_VEHICLE_SUCCESS]: updateTmsVehicleSuccess,
  [Types.UPDATE_TMS_VEHICLE_FAILURE]: updateTmsVehicleFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
