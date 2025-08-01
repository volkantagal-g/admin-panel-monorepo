import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getDeviceTypeStatistics: {
    isPending: false,
    data: [],
    error: null,
  },
  getDeviceStatusStatistics: {
    isPending: false,
    data: [],
    error: null,
  },
  getAssignmentStatusStatistics: {
    isPending: false,
    data: {},
    error: null,
  },
  getRentalStatistics: {
    isPending: false,
    data: {},
    error: null,
  },
  getMDMStatistics: {
    isPending: false,
    data: {},
    error: null,
  },
  getBrandsStatistics: {
    isPending: false,
    data: [],
    error: null,
  },
  getAssetOwnersStatistics: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const getDeviceTypeStatisticsRequest = state => {
  return {
    ...state,
    getDeviceTypeStatistics: {
      ...INITIAL_STATE.getDeviceTypeStatistics,
      isPending: true,
    },
  };
};

export const getDeviceTypeStatisticsSuccess = (state, { data }) => {
  return {
    ...state,
    getDeviceTypeStatistics: {
      ...INITIAL_STATE.getDeviceTypeStatistics,
      data,
      isPending: false,
    },
  };
};

export const getDeviceTypeStatisticsFailure = (state, { error }) => {
  return {
    ...state,
    getDeviceTypeStatistics: {
      ...INITIAL_STATE.getDeviceTypeStatistics,
      isPending: false,
      error,
    },
  };
};

export const getDeviceStatusStatisticsRequest = state => {
  return {
    ...state,
    getDeviceStatusStatistics: {
      ...INITIAL_STATE.getDeviceStatusStatistics,
      isPending: true,
    },
  };
};

export const getDeviceStatusStatisticsSuccess = (state, { data }) => {
  return {
    ...state,
    getDeviceStatusStatistics: {
      ...INITIAL_STATE.getDeviceStatusStatistics,
      data,
      isPending: false,
    },
  };
};

export const getDeviceStatusStatisticsFailure = (state, { error }) => {
  return {
    ...state,
    getDeviceStatusStatistics: {
      ...INITIAL_STATE.getDeviceStatusStatistics,
      isPending: false,
      error,
    },
  };
};

export const getAssignmentStatusStatisticsRequest = state => {
  return {
    ...state,
    getAssignmentStatusStatistics: {
      ...INITIAL_STATE.getAssignmentStatusStatistics,
      isPending: true,
    },
  };
};

export const getAssignmentStatusStatisticsSuccess = (state, { data }) => {
  return {
    ...state,
    getAssignmentStatusStatistics: {
      ...INITIAL_STATE.getAssignmentStatusStatistics,
      data,
      isPending: false,
    },
  };
};

export const getAssignmentStatusStatisticsFailure = (state, { error }) => {
  return {
    ...state,
    getAssignmentStatusStatistics: {
      ...INITIAL_STATE.getAssignmentStatusStatistics,
      isPending: false,
      error,
    },
  };
};

export const getRentalStatisticsRequest = state => {
  return {
    ...state,
    getRentalStatistics: {
      ...INITIAL_STATE.getRentalStatistics,
      isPending: true,
    },
  };
};

export const getRentalStatisticsSuccess = (state, { data }) => {
  return {
    ...state,
    getRentalStatistics: {
      ...INITIAL_STATE.getRentalStatistics,
      data,
      isPending: false,
    },
  };
};

export const getRentalStatisticsFailure = (state, { error }) => {
  return {
    ...state,
    getRentalStatistics: {
      ...INITIAL_STATE.getRentalStatistics,
      isPending: false,
      error,
    },
  };
};

export const getMDMStatisticsRequest = state => {
  return {
    ...state,
    getMDMStatistics: {
      ...INITIAL_STATE.getMDMStatistics,
      isPending: true,
    },
  };
};

export const getMDMStatisticsSuccess = (state, { data }) => {
  return {
    ...state,
    getMDMStatistics: {
      ...INITIAL_STATE.getMDMStatistics,
      data,
      isPending: false,
    },
  };
};

export const getMDMStatisticsFailure = (state, { error }) => {
  return {
    ...state,
    getMDMStatistics: {
      ...INITIAL_STATE.getMDMStatistics,
      isPending: false,
      error,
    },
  };
};

export const getBrandsStatisticsRequest = state => {
  return {
    ...state,
    getBrandsStatistics: {
      ...INITIAL_STATE.getBrandsStatistics,
      isPending: true,
    },
  };
};

export const getBrandsStatisticsSuccess = (state, { data }) => {
  return {
    ...state,
    getBrandsStatistics: {
      ...INITIAL_STATE.getBrandsStatistics,
      data,
      isPending: false,
    },
  };
};

export const getBrandsStatisticsFailure = (state, { error }) => {
  return {
    ...state,
    getBrandsStatistics: {
      ...INITIAL_STATE.getBrandsStatistics,
      isPending: false,
      error,
    },
  };
};

export const getAssetOwnersStatisticsRequest = state => {
  return {
    ...state,
    getAssetOwnersStatistics: {
      ...INITIAL_STATE.getAssetOwnersStatistics,
      isPending: true,
    },
  };
};

export const getAssetOwnersStatisticsSuccess = (state, { data }) => {
  return {
    ...state,
    getAssetOwnersStatistics: {
      ...INITIAL_STATE.getAssetOwnersStatistics,
      data,
      isPending: false,
    },
  };
};

export const getAssetOwnersStatisticsFailure = (state, { error }) => {
  return {
    ...state,
    getAssetOwnersStatistics: {
      ...INITIAL_STATE.getAssetOwnersStatistics,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_DEVICE_TYPE_STATISTICS_REQUEST]: getDeviceTypeStatisticsRequest,
  [Types.GET_DEVICE_TYPE_STATISTICS_SUCCESS]: getDeviceTypeStatisticsSuccess,
  [Types.GET_DEVICE_TYPE_STATISTICS_FAILURE]: getDeviceTypeStatisticsFailure,
  [Types.GET_DEVICE_STATUS_STATISTICS_REQUEST]: getDeviceStatusStatisticsRequest,
  [Types.GET_DEVICE_STATUS_STATISTICS_SUCCESS]: getDeviceStatusStatisticsSuccess,
  [Types.GET_DEVICE_STATUS_STATISTICS_FAILURE]: getDeviceStatusStatisticsFailure,
  [Types.GET_ASSIGNMENT_STATUS_STATISTICS_REQUEST]: getAssignmentStatusStatisticsRequest,
  [Types.GET_ASSIGNMENT_STATUS_STATISTICS_SUCCESS]: getAssignmentStatusStatisticsSuccess,
  [Types.GET_ASSIGNMENT_STATUS_STATISTICS_FAILURE]: getAssignmentStatusStatisticsFailure,
  [Types.GET_RENTAL_STATISTICS_REQUEST]: getRentalStatisticsRequest,
  [Types.GET_RENTAL_STATISTICS_SUCCESS]: getRentalStatisticsSuccess,
  [Types.GET_RENTAL_STATISTICS_FAILURE]: getRentalStatisticsFailure,
  [Types.GET_MDM_STATISTICS_REQUEST]: getMDMStatisticsRequest,
  [Types.GET_MDM_STATISTICS_SUCCESS]: getMDMStatisticsSuccess,
  [Types.GET_MDM_STATISTICS_FAILURE]: getMDMStatisticsFailure,
  [Types.GET_BRANDS_STATISTICS_REQUEST]: getBrandsStatisticsRequest,
  [Types.GET_BRANDS_STATISTICS_SUCCESS]: getBrandsStatisticsSuccess,
  [Types.GET_BRANDS_STATISTICS_FAILURE]: getBrandsStatisticsFailure,
  [Types.GET_ASSET_OWNERS_STATISTICS_REQUEST]: getAssetOwnersStatisticsRequest,
  [Types.GET_ASSET_OWNERS_STATISTICS_SUCCESS]: getAssetOwnersStatisticsSuccess,
  [Types.GET_ASSET_OWNERS_STATISTICS_FAILURE]: getAssetOwnersStatisticsFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
