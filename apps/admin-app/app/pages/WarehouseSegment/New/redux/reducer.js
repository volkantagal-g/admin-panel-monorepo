import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  warehouseSegment: {
    isPending: false,
    error: null,
  },
};

export const createWarehouseSegmentRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSegment: {
      ...state.warehouseSegment,
      isPending: true,
    },
  };
};

export const createWarehouseSegmentSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSegment: {
      ...state.warehouseSegment,
      isPending: false,
    },
  };
};

export const createWarehouseSegmentFailure = (state = INITIAL_STATE, { error }) => {
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
  [Types.CREATE_WAREHOUSE_SEGMENT_REQUEST]: createWarehouseSegmentRequest,
  [Types.CREATE_WAREHOUSE_SEGMENT_SUCCESS]: createWarehouseSegmentSuccess,
  [Types.CREATE_WAREHOUSE_SEGMENT_FAILURE]: createWarehouseSegmentFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
