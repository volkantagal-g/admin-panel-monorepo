import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { IVehicleDamageRecord } from '@shared/containers/AssetManagementModules/types';

export type State = {
  isFirstLoadDone: boolean;
  damageRecord: {
    isPending: boolean;
    data: IVehicleDamageRecord[] | null;
    error: Error | undefined;
  }
}

export const INITIAL_STATE: State = {
  isFirstLoadDone: false,
  damageRecord: {
    isPending: false,
    data: null,
    error: undefined,
  },
};

export const filterVehicleDamageRequest = (state: State) => ({
  ...state,
  damageRecord: {
    ...state.damageRecord,
    isPending: true,
  },
});

export const filterVehicleDamageSuccess = (state: State, { vehicleDamage }: { vehicleDamage: IVehicleDamageRecord[] }) => ({
  ...state,
  isFirstLoadDone: true,
  damageRecord: {
    data: vehicleDamage,
    isPending: false,
    error: undefined,
  },
});

export const filterVehicleDamageFailure = (state: State, { error }: { error: Error }) => ({
  ...state,
  damageRecord: {
    ...state.damageRecord,
    isPending: false,
    error,
  },
});

export const createVehicleDamageRequest = (state: State) => ({
  ...state,
  damageRecord: {
    ...state.damageRecord,
    isPending: true,
  },
});

export const createVehicleDamageSuccess = (state: State, { vehicleDamageRecord }: { vehicleDamageRecord: IVehicleDamageRecord[] }) => ({
  ...state,
  damageRecord: {
    data: vehicleDamageRecord,
    isPending: false,
    error: undefined,
  },
});

export const createVehicleDamageFailure = (state: State, { error }: { error: Error }) => ({
  ...state,
  damageRecord: {
    ...state.damageRecord,
    isPending: false,
    error,
  },
});

export const updateVehicleDamageRequest = (state: State) => ({
  ...state,
  damageRecord: {
    ...state.damageRecord,
    isPending: true,
  },
});

export const updateVehicleDamageSuccess = (state: State, { vehicleDamageRecord }: { vehicleDamageRecord: IVehicleDamageRecord[] }) => ({
  ...state,
  damageRecord: {
    data: vehicleDamageRecord,
    isPending: false,
    error: undefined,
  },
});

export const updateVehicleDamageFailure = (state: State, { error }: { error: Error }) => ({
  ...state,
  damageRecord: {
    ...state.damageRecord,
    isPending: false,
    error,
  },
});

export const deleteVehicleDamageRequest = (state: State) => ({
  ...state,
  damageRecord: {
    ...state.damageRecord,
    isPending: true,
  },
});

export const deleteVehicleDamageSuccess = (state: State, { vehicleDamageRecord }: { vehicleDamageRecord: IVehicleDamageRecord[] }) => ({
  ...state,
  damageRecord: {
    data: vehicleDamageRecord,
    isPending: false,
    error: undefined,
  },
});

export const deleteVehicleDamageFailure = (state: State, { error }: { error: Error }) => ({
  ...state,
  damageRecord: {
    ...state.damageRecord,
    isPending: false,
    error,
  },
});

export const destroyContainer = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.FILTER_VEHICLE_DAMAGE_REQUEST]: filterVehicleDamageRequest,
  [Types.FILTER_VEHICLE_DAMAGE_SUCCESS]: filterVehicleDamageSuccess,
  [Types.FILTER_VEHICLE_DAMAGE_FAILURE]: filterVehicleDamageFailure,

  [Types.CREATE_VEHICLE_DAMAGE_REQUEST]: createVehicleDamageRequest,
  [Types.CREATE_VEHICLE_DAMAGE_SUCCESS]: createVehicleDamageSuccess,
  [Types.CREATE_VEHICLE_DAMAGE_FAILURE]: createVehicleDamageFailure,

  [Types.UPDATE_VEHICLE_DAMAGE_REQUEST]: updateVehicleDamageRequest,
  [Types.UPDATE_VEHICLE_DAMAGE_SUCCESS]: updateVehicleDamageSuccess,
  [Types.UPDATE_VEHICLE_DAMAGE_FAILURE]: updateVehicleDamageFailure,

  [Types.DELETE_VEHICLE_DAMAGE_REQUEST]: deleteVehicleDamageRequest,
  [Types.DELETE_VEHICLE_DAMAGE_SUCCESS]: deleteVehicleDamageSuccess,
  [Types.DELETE_VEHICLE_DAMAGE_FAILURE]: deleteVehicleDamageFailure,

  [Types.DESTROY_CONTAINER]: destroyContainer,
};

export default createReducer(INITIAL_STATE, HANDLERS);
