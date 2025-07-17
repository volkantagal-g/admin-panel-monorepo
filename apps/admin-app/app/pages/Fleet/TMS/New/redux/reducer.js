import { createReducer } from 'reduxsauce';

import { Types } from '@app/pages/Fleet/TMS/New/redux/actions';

export const INITIAL_STATE = {
  tmsVehicle: {
    isPending: false,
    data: {},
    error: null,
  },
};

const createTmsVehicleRequest = (state = INITIAL_STATE) => ({
  ...state,
  tmsVehicle: {
    ...state.tmsVehicle,
    isPending: true,
  },
});

const createTmsVehicleSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  tmsVehicle: {
    ...state.tmsVehicle,
    isPending: false,
    data,
  },
});

const createTmsVehicleFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  tmsVehicle: {
    ...state.tmsVehicle,
    isPending: false,
    error,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.CREATE_TMS_VEHICLE_REQUEST]: createTmsVehicleRequest,
  [Types.CREATE_TMS_VEHICLE_SUCCESS]: createTmsVehicleSuccess,
  [Types.CREATE_TMS_VEHICLE_FAILURE]: createTmsVehicleFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
