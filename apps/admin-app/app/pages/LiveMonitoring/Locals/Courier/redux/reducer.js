import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  courierPlanAndCounts: {
    data: [],
    isPending: false,
    error: null,
  },
  filters: { selectedVehicleTypes: [] },
};

export const getCourierPlanAndCountsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    courierPlanAndCounts: {
      ...state.courierPlanAndCounts,
      isPending: true,
    },
  };
};

export const getCourierPlanAndCountsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    courierPlanAndCounts: {
      ...state.courierPlanAndCounts,
      data,
      isPending: false,
    },
  };
};

export const getCourierPlanAndCountsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    courierPlanAndCounts: {
      ...state.courierPlanAndCounts,
      isPending: false,
      error,
    },
  };
};

const setSelectedVehicleTypes = (state = INITIAL_STATE, { selectedVehicleTypes }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      selectedVehicleTypes,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_COURIER_PLAN_AND_COUNTS_REQUEST]: getCourierPlanAndCountsRequest,
  [Types.GET_COURIER_PLAN_AND_COUNTS_SUCCESS]: getCourierPlanAndCountsSuccess,
  [Types.GET_COURIER_PLAN_AND_COUNTS_FAILURE]: getCourierPlanAndCountsFailure,

  [Types.SET_SELECTED_VEHICLE_TYPES]: setSelectedVehicleTypes,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
