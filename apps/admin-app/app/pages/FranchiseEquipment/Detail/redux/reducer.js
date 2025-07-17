import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  franchiseEquipmentDetail: {
    data: {},
    isPending: false,
    error: null,
  },
  franchiseEquipmentLogs: {
    data: [],
    totalCount: 0,
    isPending: false,
    error: null,
  },
};

export const getFranchiseEquipmentDetailRequest = state => {
  return {
    ...state,
    franchiseEquipmentDetail: {
      ...state.franchiseEquipmentDetail,
      isPending: true,
    },
  };
};

export const getFranchiseEquipmentDetailSuccess = (state, { data }) => {
  return {
    ...state,
    franchiseEquipmentDetail: {
      ...state.franchiseEquipmentDetail,
      data,
      isPending: false,
    },
  };
};

export const getFranchiseEquipmentDetailFailure = (state, { error }) => {
  return {
    ...state,
    franchiseEquipmentDetail: {
      ...state.franchiseEquipmentDetail,
      isPending: false,
      error,
    },
  };
};

export const updateFranchiseEquipmentRequest = state => {
  return {
    ...state,
    franchiseEquipmentDetail: {
      ...state.franchiseEquipmentDetail,
      isPending: true,
    },
  };
};

export const updateFranchiseEquipmentFailure = (state, { error }) => {
  return {
    ...state,
    franchiseEquipmentDetail: {
      ...state.franchiseEquipmentDetail,
      isPending: false,
      error,
    },
  };
};

export const getFranchiseEquipmentLogsRequest = state => {
  return {
    ...state,
    franchiseEquipmentLogs: {
      ...state.franchiseEquipmentLogs,
      isPending: true,
    },
  };
};

export const getFranchiseEquipmentLogsSuccess = (state, { data, totalCount = 0 }) => {
  return {
    ...state,
    franchiseEquipmentLogs: {
      ...state.franchiseEquipmentLogs,
      data,
      totalCount,
      isPending: false,
    },
  };
};

export const getFranchiseEquipmentLogsFailure = (state, { error }) => {
  return {
    ...state,
    franchiseEquipmentLogs: {
      ...state.franchiseEquipmentLogs,
      isPending: false,
      error,
    },
  };
};

export const updateFranchiseEquipmentVehicleCountRequest = state => {
  return {
    ...state,
    franchiseEquipmentDetail: {
      ...state.franchiseEquipmentDetail,
      isPending: true,
    },
  };
};

export const updateFranchiseEquipmentVehicleCountFailure = (state, { error }) => {
  return {
    ...state,
    franchiseEquipmentDetail: {
      ...state.franchiseEquipmentDetail,
      isPending: false,
      error,
    },
  };
};

export const archiveFranchiseEquipmentRequest = state => {
  return {
    ...state,
    franchiseEquipmentDetail: {
      ...state.franchiseEquipmentDetail,
      isPending: true,
    },
  };
};

export const archiveFranchiseEquipmentSuccess = state => {
  return {
    ...state,
    franchiseEquipmentDetail: {
      ...state.franchiseEquipmentDetail,
      isPending: false,
    },
  };
};

export const archiveFranchiseEquipmentFailure = (state, { error }) => {
  return {
    ...state,
    franchiseEquipmentDetail: {
      ...state.franchiseEquipmentDetail,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_FRANCHISE_EQUIPMENT_DETAIL_REQUEST]: getFranchiseEquipmentDetailRequest,
  [Types.GET_FRANCHISE_EQUIPMENT_DETAIL_SUCCESS]: getFranchiseEquipmentDetailSuccess,
  [Types.GET_FRANCHISE_EQUIPMENT_DETAIL_FAILURE]: getFranchiseEquipmentDetailFailure,
  [Types.GET_FRANCHISE_EQUIPMENT_LOGS_REQUEST]: getFranchiseEquipmentLogsRequest,
  [Types.GET_FRANCHISE_EQUIPMENT_LOGS_SUCCESS]: getFranchiseEquipmentLogsSuccess,
  [Types.GET_FRANCHISE_EQUIPMENT_LOGS_FAILURE]: getFranchiseEquipmentLogsFailure,
  [Types.UPDATE_FRANCHISE_EQUIPMENT_REQUEST]: updateFranchiseEquipmentRequest,
  [Types.UPDATE_FRANCHISE_EQUIPMENT_FAILURE]: updateFranchiseEquipmentFailure,
  [Types.UPDATE_FRANCHISE_EQUIPMENT_VEHICLE_COUNT_REQUEST]: updateFranchiseEquipmentVehicleCountRequest,
  [Types.UPDATE_FRANCHISE_EQUIPMENT_VEHICLE_COUNT_FAILURE]: updateFranchiseEquipmentVehicleCountFailure,
  [Types.ARCHIVE_FRANCHISE_EQUIPMENT_REQUEST]: archiveFranchiseEquipmentRequest,
  [Types.ARCHIVE_FRANCHISE_EQUIPMENT_SUCCESS]: archiveFranchiseEquipmentSuccess,
  [Types.ARCHIVE_FRANCHISE_EQUIPMENT_FAILURE]: archiveFranchiseEquipmentFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
