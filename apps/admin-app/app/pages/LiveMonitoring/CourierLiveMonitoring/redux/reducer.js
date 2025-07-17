import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  courierStatusData: {
    data: {},
    isPending: false,
    error: null,
  },
  downloadCourierStatusDataForAllWarehousesCSVData: {
    isPending: false,
    error: null,
  },
  filters: {
    domainType: null,
    selectedCity: null,
    selectedVehicleType: null,
    selectedWarehouse: null,
  },
};

export const getCourierStatusCountsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    courierStatusData: {
      ...INITIAL_STATE.courierStatusData,
      isPending: true,
    },
  };
};

export const getCourierStatusCountsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    courierStatusData: {
      ...INITIAL_STATE.courierStatusData,
      data,
      isPending: false,
    },
  };
};

export const getCourierStatusCountsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    courierStatusData: {
      ...INITIAL_STATE.courierStatusData,
      isPending: false,
      error,
    },
  };
};

export const downloadCourierStatusCountsCSVForAllWarehousesRequest = state => {
  return {
    ...state,
    downloadCourierStatusDataForAllWarehousesCSVData: {
      ...INITIAL_STATE.downloadCourierStatusDataForAllWarehousesCSVData,
      isPending: true,
    },
  };
};

export const downloadCourierStatusCountsCSVForAllWarehousesSuccess = state => {
  return {
    ...state,
    downloadCourierStatusDataForAllWarehousesCSVData: {
      ...INITIAL_STATE.downloadCourierStatusDataForAllWarehousesCSVData,
      isPending: false,
    },
  };
};

export const downloadCourierStatusCountsCSVForAllWarehousesFailure = (state, { error }) => {
  return {
    ...state,
    downloadCourierStatusDataForAllWarehousesCSVData: {
      ...INITIAL_STATE.downloadCourierStatusDataForAllWarehousesCSVData,
      isPending: false,
      error,
    },
  };
};

export const setFilters = (state = INITIAL_STATE, { filters }) => {
  return {
    ...state,
    filters,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_COURIER_STATUS_COUNTS_REQUEST]: getCourierStatusCountsRequest,
  [Types.GET_COURIER_STATUS_COUNTS_SUCCESS]: getCourierStatusCountsSuccess,
  [Types.GET_COURIER_STATUS_COUNTS_FAILURE]: getCourierStatusCountsFailure,

  [Types.DOWNLOAD_COURIER_STATUS_COUNTS_FOR_ALL_WAREHOUSES_CSV_REQUEST]: downloadCourierStatusCountsCSVForAllWarehousesRequest,
  [Types.DOWNLOAD_COURIER_STATUS_COUNTS_FOR_ALL_WAREHOUSES_CSV_SUCCESS]: downloadCourierStatusCountsCSVForAllWarehousesSuccess,
  [Types.DOWNLOAD_COURIER_STATUS_COUNTS_FOR_ALL_WAREHOUSES_CSV_FAILURE]: downloadCourierStatusCountsCSVForAllWarehousesFailure,

  [Types.SET_FILTERS]: setFilters,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
