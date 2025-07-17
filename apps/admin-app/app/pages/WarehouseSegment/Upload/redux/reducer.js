import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = { warehouseSegmentMatching: { isPending: false } };

export const uploadWarehouseSegmentMatchingRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSegmentMatching: {
      ...state.warehouseSegmentMatching,
      isPending: true,
    },
  };
};

export const uploadWarehouseSegmentMatchingSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSegmentMatching: {
      ...state.warehouseSegmentMatching,
      isPending: false,
    },
  };
};

export const uploadWarehouseSegmentMatchingFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSegmentMatching: {
      ...state.warehouseSegmentMatching,
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.UPLOAD_WAREHOUSE_SEGMENT_MATCHING_REQUEST]: uploadWarehouseSegmentMatchingRequest,
  [Types.UPLOAD_WAREHOUSE_SEGMENT_MATCHING_SUCCESS]: uploadWarehouseSegmentMatchingSuccess,
  [Types.UPLOAD_WAREHOUSE_SEGMENT_MATCHING_FAILURE]: uploadWarehouseSegmentMatchingFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
