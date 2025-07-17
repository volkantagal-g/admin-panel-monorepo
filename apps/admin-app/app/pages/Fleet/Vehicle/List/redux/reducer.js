import { createReducer } from 'reduxsauce';

import { Types } from './action';

export const INITIAL_STATE = {
  vehicleList: {
    data: [],
    isPending: false,
    error: null,
  },
  vehicleTypeList: {
    data: [],
    isPending: false,
    error: null,
  },
  bulkVehicleCreateUpdate: {
    data: [],
    isPending: false,
    error: null,
  },
  showCsvWarningModal: false,
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

export const getVehicleTypeList = state => {
  return {
    ...state,
    vehicleTypeList: {
      ...state.vehicleTypeList,
      isPending: true,
    },
  };
};

export const getVehicleTypeListSuccess = (state, { data }) => {
  return {
    ...state,
    vehicleTypeList: {
      ...state.vehicleTypeList,
      data,
      isPending: false,
    },
  };
};

export const getVehicleTypeListFailure = (state, { error }) => {
  return {
    ...state,
    vehicleTypeList: {
      ...state.vehicleTypeList,
      isPending: false,
      error,
    },
  };
};

export const bulkVehicleCreateUpdateRequest = state => {
  return {
    ...state,
    bulkVehicleCreateUpdate: {
      ...state.bulkVehicleCreateUpdate,
      isPending: true,
    },
  };
};

export const bulkVehicleCreateUpdateSuccess = (state, { data }) => {
  return {
    ...state,
    bulkVehicleCreateUpdate: {
      ...state.bulkVehicleCreateUpdate,
      data,
      isPending: false,
    },
  };
};

export const bulkVehicleCreateUpdateFailure = (state, { error }) => {
  return {
    ...state,
    bulkVehicleCreateUpdate: {
      ...state.bulkVehicleCreateUpdate,
      isPending: false,
      error,
    },
  };
};

export const updateCsvWarningModalVisibility = (state, { showCsvWarningModal }) => {
  return {
    ...state,
    showCsvWarningModal,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_VEHICLE_LIST]: getVehicleListRequest,
  [Types.GET_VEHICLE_LIST_SUCCESS]: getVehicleListSuccess,
  [Types.GET_VEHICLE_LIST_FAILURE]: getVehicleListFailure,
  [Types.GET_VEHICLE_TYPE_LIST]: getVehicleTypeList,
  [Types.GET_VEHICLE_TYPE_LIST_SUCCESS]: getVehicleTypeListSuccess,
  [Types.GET_VEHICLE_TYPE_LIST_FAILURE]: getVehicleTypeListFailure,
  [Types.BULK_VEHICLE_UPDATE_CREATE_REQUEST]: bulkVehicleCreateUpdateRequest,
  [Types.BULK_VEHICLE_UPDATE_CREATE_SUCCESS]: bulkVehicleCreateUpdateSuccess,
  [Types.BULK_VEHICLE_UPDATE_CREATE_FAILURE]: bulkVehicleCreateUpdateFailure,
  [Types.UPDATE_CSV_WARNING_MODAL_VISIBILITY]: updateCsvWarningModalVisibility,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
