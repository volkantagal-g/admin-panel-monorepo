import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  warehouseSegment: {
    data: {},
    isPending: false,
    error: null,
  },
  warehouses: {
    data: [],
    total: 0,
    isPending: false,
    error: null,
  },
};

export const getWarehouseSegmentRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSegment: {
      ...state.warehouseSegment,
      isPending: true,
    },
  };
};

export const getWarehouseSegmentSuccess = (state = INITIAL_STATE, { data = {} }) => {
  return {
    ...state,
    warehouseSegment: {
      ...state.warehouseSegment,
      data,
      isPending: false,
    },
  };
};

export const getWarehouseSegmentFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseSegment: {
      ...state.warehouseSegment,
      isPending: false,
      error,
    },
  };
};

export const getWarehousesBySegmentIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouses: {
      ...state.warehouses,
      isPending: true,
    },
  };
};

export const getWarehousesBySegmentIdSuccess = (state = INITIAL_STATE, { data = [], total = 0 }) => {
  return {
    ...state,
    warehouses: {
      ...state.warehouses,
      data,
      total,
      isPending: false,
    },
  };
};

export const getWarehousesBySegmentIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouses: {
      ...state.warehouses,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseSegmentRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSegment: {
      ...state.warehouseSegment,
      isPending: true,
    },
  };
};

export const updateWarehouseSegmentSuccess = (state = INITIAL_STATE, { data = {} }) => {
  return {
    ...state,
    warehouseSegment: {
      ...state.warehouseSegment,
      data,
      isPending: false,
    },
  };
};

export const updateWarehouseSegmentFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseSegment: {
      ...state.warehouseSegment,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_WAREHOUSE_SEGMENT_REQUEST]: getWarehouseSegmentRequest,
  [Types.GET_WAREHOUSE_SEGMENT_SUCCESS]: getWarehouseSegmentSuccess,
  [Types.GET_WAREHOUSE_SEGMENT_FAILURE]: getWarehouseSegmentFailure,
  [Types.GET_WAREHOUSES_BY_SEGMENT_ID_REQUEST]: getWarehousesBySegmentIdRequest,
  [Types.GET_WAREHOUSES_BY_SEGMENT_ID_SUCCESS]: getWarehousesBySegmentIdSuccess,
  [Types.GET_WAREHOUSES_BY_SEGMENT_ID_FAILURE]: getWarehousesBySegmentIdFailure,
  [Types.UPDATE_WAREHOUSE_SEGMENT_REQUEST]: updateWarehouseSegmentRequest,
  [Types.UPDATE_WAREHOUSE_SEGMENT_SUCCESS]: updateWarehouseSegmentSuccess,
  [Types.UPDATE_WAREHOUSE_SEGMENT_FAILURE]: updateWarehouseSegmentFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
