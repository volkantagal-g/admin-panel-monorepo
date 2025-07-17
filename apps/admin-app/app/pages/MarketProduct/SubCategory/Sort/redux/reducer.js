import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getSubCategoryPositions: {
    isPending: false,
    data: [],
    error: null,
  },
  updateSubCategoryOrderBulk: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const getSubCategoryPositionsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getSubCategoryPositions: {
      ...INITIAL_STATE.getSubCategoryPositions,
      isPending: true,
    },
  };
};

export const getSubCategoryPositionsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getSubCategoryPositions: {
      ...INITIAL_STATE.getSubCategoryPositions,
      data,
      isPending: false,
    },
  };
};

export const getSubCategoryPositionsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getSubCategoryPositions: {
      ...INITIAL_STATE.getSubCategoryPositions,
      isPending: false,
      error,
    },
  };
};

export const updateSubCategoryOrderBulkRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateSubCategoryOrderBulk: {
      ...INITIAL_STATE.updateSubCategoryOrderBulk,
      isPending: true,
    },
  };
};

export const updateSubCategoryOrderBulkSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateSubCategoryOrderBulk: {
      ...INITIAL_STATE.updateSubCategoryOrderBulk,
      data,
      isPending: false,
    },
  };
};

export const updateSubCategoryOrderBulkFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateSubCategoryOrderBulk: {
      ...INITIAL_STATE.updateSubCategoryOrderBulk,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_SUB_CATEGORY_POSITIONS_REQUEST]: getSubCategoryPositionsRequest,
  [Types.GET_SUB_CATEGORY_POSITIONS_SUCCESS]: getSubCategoryPositionsSuccess,
  [Types.GET_SUB_CATEGORY_POSITIONS_FAILURE]: getSubCategoryPositionsFailure,
  [Types.UPDATE_SUB_CATEGORY_ORDER_BULK_REQUEST]: updateSubCategoryOrderBulkRequest,
  [Types.UPDATE_SUB_CATEGORY_ORDER_BULK_SUCCESS]: updateSubCategoryOrderBulkSuccess,
  [Types.UPDATE_SUB_CATEGORY_ORDER_BULK_FAILURE]: updateSubCategoryOrderBulkFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
