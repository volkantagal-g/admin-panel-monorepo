import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { IVehicleTrafficPenaltyRecord } from '@shared/containers/AssetManagementModules/types';

export type State = {
  isFirstLoadDone: boolean;
  trafficPenaltyRecord: {
    isPending: boolean;
    data: IVehicleTrafficPenaltyRecord[] | null;
    error: Error | undefined;
  }
}

export const INITIAL_STATE: State = {
  isFirstLoadDone: false,
  trafficPenaltyRecord: {
    isPending: false,
    data: null,
    error: undefined,
  },
};

export const filterTrafficPenaltyRequest = (state: State) => ({
  ...state,
  trafficPenaltyRecord: {
    ...state.trafficPenaltyRecord,
    isPending: true,
  },
});

export const filterTrafficPenaltySuccess = (state: State, { trafficPenalty }: { trafficPenalty: IVehicleTrafficPenaltyRecord[] }) => ({
  ...state,
  isFirstLoadDone: true,
  trafficPenaltyRecord: {
    data: trafficPenalty,
    isPending: false,
    error: undefined,
  },
});

export const filterTrafficPenaltyFailure = (state: State, { error }: { error: Error }) => ({
  ...state,
  trafficPenaltyRecord: {
    ...state.trafficPenaltyRecord,
    isPending: false,
    error,
  },
});

export const createTrafficPenaltyRequest = (state: State) => ({
  ...state,
  trafficPenaltyRecord: {
    ...state.trafficPenaltyRecord,
    isPending: true,
  },
});

export const createTrafficPenaltySuccess = (state: State, { trafficPenaltyRecord }: { trafficPenaltyRecord: IVehicleTrafficPenaltyRecord[] }) => ({
  ...state,
  trafficPenaltyRecord: {
    data: trafficPenaltyRecord,
    isPending: false,
    error: undefined,
  },
});

export const createTrafficPenaltyFailure = (state: State, { error }: { error: Error }) => ({
  ...state,
  trafficPenaltyRecord: {
    ...state.trafficPenaltyRecord,
    isPending: false,
    error,
  },
});

export const updateTrafficPenaltyRequest = (state: State) => ({
  ...state,
  trafficPenaltyRecord: {
    ...state.trafficPenaltyRecord,
    isPending: true,
  },
});

export const updateTrafficPenaltySuccess = (state: State, { trafficPenaltyRecord }: { trafficPenaltyRecord: IVehicleTrafficPenaltyRecord[] }) => ({
  ...state,
  trafficPenaltyRecord: {
    data: trafficPenaltyRecord,
    isPending: false,
    error: undefined,
  },
});

export const updateTrafficPenaltyFailure = (state: State, { error }: { error: Error }) => ({
  ...state,
  trafficPenaltyRecord: {
    ...state.trafficPenaltyRecord,
    isPending: false,
    error,
  },
});

export const deleteTrafficPenaltyRequest = (state: State) => ({
  ...state,
  trafficPenaltyRecord: {
    ...state.trafficPenaltyRecord,
    isPending: true,
  },
});

export const deleteTrafficPenaltySuccess = (state: State, { TrafficPenaltyRecord }: { TrafficPenaltyRecord: IVehicleTrafficPenaltyRecord[] }) => ({
  ...state,
  trafficPenaltyRecord: {
    data: TrafficPenaltyRecord,
    isPending: false,
    error: undefined,
  },
});

export const deleteTrafficPenaltyFailure = (state: State, { error }: { error: Error }) => ({
  ...state,
  trafficPenaltyRecord: {
    ...state.trafficPenaltyRecord,
    isPending: false,
    error,
  },
});

export const destroyContainer = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.FILTER_TRAFFIC_PENALTY_REQUEST]: filterTrafficPenaltyRequest,
  [Types.FILTER_TRAFFIC_PENALTY_SUCCESS]: filterTrafficPenaltySuccess,
  [Types.FILTER_TRAFFIC_PENALTY_FAILURE]: filterTrafficPenaltyFailure,

  [Types.CREATE_TRAFFIC_PENALTY_REQUEST]: createTrafficPenaltyRequest,
  [Types.CREATE_TRAFFIC_PENALTY_SUCCESS]: createTrafficPenaltySuccess,
  [Types.CREATE_TRAFFIC_PENALTY_FAILURE]: createTrafficPenaltyFailure,

  [Types.UPDATE_TRAFFIC_PENALTY_REQUEST]: updateTrafficPenaltyRequest,
  [Types.UPDATE_TRAFFIC_PENALTY_SUCCESS]: updateTrafficPenaltySuccess,
  [Types.UPDATE_TRAFFIC_PENALTY_FAILURE]: updateTrafficPenaltyFailure,

  [Types.DELETE_TRAFFIC_PENALTY_REQUEST]: deleteTrafficPenaltyRequest,
  [Types.DELETE_TRAFFIC_PENALTY_SUCCESS]: deleteTrafficPenaltySuccess,
  [Types.DELETE_TRAFFIC_PENALTY_FAILURE]: deleteTrafficPenaltyFailure,

  [Types.DESTROY_CONTAINER]: destroyContainer,
};

export default createReducer(INITIAL_STATE, HANDLERS);
