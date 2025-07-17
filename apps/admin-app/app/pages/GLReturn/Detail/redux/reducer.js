import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  slotData: {
    data: [],
    isPending: false,
    error: null,
  },
  courierPlanData: {
    data: [],
    isPending: false,
    error: null,
  },
  courierReassignData: {
    data: [],
    isPending: false,
    error: null,
  },
  filters: { vehicleType: null },
  mappedResults: { data: [] },
  selectedDate: {
    startDate: null,
    endDate: null,
  },
};

export const setVehicleType = (state = INITIAL_STATE, { vehicleType }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      vehicleType,
    },
  };
};

export const getSlotDataRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    slotData: {
      ...INITIAL_STATE.slotData,
      isPending: true,
    },
  };
};

export const getSlotDataSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    slotData: {
      ...INITIAL_STATE.slotData,
      data,
      isPending: false,
    },
  };
};

export const getSlotDataFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    slotData: {
      ...INITIAL_STATE.slotData,
      isPending: false,
      error,
    },
  };
};

export const getUpdatedCourierPlanRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    slotData: {
      ...INITIAL_STATE.courierPlanData,
      isPending: true,
    },
  };
};

export const getUpdatedCourierPlanSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    slotData: {
      ...INITIAL_STATE.courierPlanData,
      data,
      isPending: false,
    },
  };
};

export const getUpdatedCourierPlanFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    slotData: {
      ...INITIAL_STATE.courierPlanData,
      isPending: false,
      error,
    },
  };
};

export const getCourierReassignDataRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    slotData: {
      ...INITIAL_STATE.courierReassignData,
      isPending: true,
    },
  };
};

export const getCourierReassignDataSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    slotData: {
      ...INITIAL_STATE.courierReassignData,
      data,
      isPending: false,
    },
  };
};

export const getCourierReassignDataFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    slotData: {
      ...INITIAL_STATE.courierReassignData,
      isPending: false,
      error,
    },
  };
};

export const setMappedResults = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    mappedResults: {
      ...state.mappedResults,
      data,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

const setSelectedDate = (state = INITIAL_STATE, { startDate, endDate }) => {
  return {
    ...state,
    selectedDate: {
      startDate,
      endDate,
    },
  };
};

const init = (state = INITIAL_STATE, { selectedDate }) => {
  return {
    ...state,
    selectedDate,
  };
};

export const HANDLERS = {
  [Types.INIT_PAGE]: init,
  [Types.SET_SELECTED_DATE]: setSelectedDate,
  [Types.DESTROY_PAGE]: destroy,
  [Types.GET_SLOT_DATA_REQUEST]: getSlotDataRequest,
  [Types.GET_SLOT_DATA_SUCCESS]: getSlotDataSuccess,
  [Types.GET_SLOT_DATA_FAILURE]: getSlotDataFailure,
  [Types.GET_UPDATED_COURIER_PLAN_REQUEST]: getUpdatedCourierPlanRequest,
  [Types.GET_UPDATED_COURIER_PLAN_SUCCESS]: getUpdatedCourierPlanSuccess,
  [Types.GET_UPDATED_COURIER_PLAN_FAILURE]: getUpdatedCourierPlanFailure,
  [Types.GET_COURIER_REASSIGN_DATA_REQUEST]: getCourierReassignDataRequest,
  [Types.GET_COURIER_REASSIGN_DATA_SUCCESS]: getCourierReassignDataSuccess,
  [Types.GET_COURIER_REASSIGN_DATA_FAILURE]: getCourierReassignDataFailure,
  [Types.SET_VEHICLE_TYPE]: setVehicleType,
  [Types.SET_MAPPED_RESULTS]: setMappedResults,
};

export default createReducer(INITIAL_STATE, HANDLERS);
