import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  warehouseSegments: {
    data: [],
    total: 0,
    isPending: false,
    error: null,
  },
  warehouseSegmentReport: {
    isPending: false,
    error: null,
  },
};

export const getWarehouseSegmentsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSegments: {
      ...state.warehouseSegments,
      isPending: true,
    },
  };
};

export const getWarehouseSegmentsSuccess = (state = INITIAL_STATE, { data, total }) => {
  return {
    ...state,
    warehouseSegments: {
      ...state.warehouseSegments,
      data,
      total,
      isPending: false,
    },
  };
};

export const getWarehouseSegmentsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseSegments: {
      ...state.warehouseSegments,
      isPending: false,
      error,
    },
  };
};

export const getWarehouseSegmentReportRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSegmentReport: {
      ...state.warehouseSegmentReport,
      isPending: true,
    },
  };
};

export const getWarehouseSegmentReportSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSegmentReport: {
      ...state.warehouseSegmentReport,
      isPending: false,
    },
  };
};

export const getWarehouseSegmentReportFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseSegmentReport: {
      ...state.warehouseSegmentReport,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_WAREHOUSE_SEGMENTS_REQUEST]: getWarehouseSegmentsRequest,
  [Types.GET_WAREHOUSE_SEGMENTS_SUCCESS]: getWarehouseSegmentsSuccess,
  [Types.GET_WAREHOUSE_SEGMENTS_FAILURE]: getWarehouseSegmentsFailure,
  [Types.GET_WAREHOUSE_SEGMENT_REPORT_REQUEST]: getWarehouseSegmentReportRequest,
  [Types.GET_WAREHOUSE_SEGMENT_REPORT_SUCCESS]: getWarehouseSegmentReportSuccess,
  [Types.GET_WAREHOUSE_SEGMENT_REPORT_FAILURE]: getWarehouseSegmentReportFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
