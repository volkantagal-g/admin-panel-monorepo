import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getProductPositionsByCategory: {
    isPending: false,
    data: [],
    error: null,
  },
  updateProductPositionsBulk: {
    isPending: false,
    data: [],
    error: null,
  },
  toggleCategoryActivenessSwitch: { data: false },
};

export const getProductPositionsByCategoryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getProductPositionsByCategory: {
      ...state.getProductPositionsByCategory,
      isPending: true,
    },
  };
};

export const getProductPositionsByCategorySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getProductPositionsByCategory: {
      ...state.getProductPositionsByCategory,
      data,
      isPending: false,
    },
  };
};

export const getProductPositionsByCategoryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getProductPositionsByCategory: {
      ...state.getProductPositionsByCategory,
      isPending: false,
      error,
    },
  };
};

export const updateProductPositionsBulkRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateProductPositionsBulk: {
      ...INITIAL_STATE.updateProductPositionsBulk,
      isPending: true,
    },
  };
};

export const updateProductPositionsBulkSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateProductPositionsBulk: {
      ...INITIAL_STATE.updateProductPositionsBulk,
      data,
      isPending: false,
    },
  };
};

export const updateProductPositionsBulkFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateProductPositionsBulk: {
      ...INITIAL_STATE.updateProductPositionsBulk,
      isPending: false,
      error,
    },
  };
};

export const toggleCategoryActivenessSwitch = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    toggleCategoryActivenessSwitch: {
      ...INITIAL_STATE.toggleCategoryActivenessSwitch,
      data,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_PRODUCT_POSITIONS_BY_CATEGORY_REQUEST]: getProductPositionsByCategoryRequest,
  [Types.GET_PRODUCT_POSITIONS_BY_CATEGORY_SUCCESS]: getProductPositionsByCategorySuccess,
  [Types.GET_PRODUCT_POSITIONS_BY_CATEGORY_FAILURE]: getProductPositionsByCategoryFailure,
  [Types.UPDATE_PRODUCT_POSITIONS_BULK_REQUEST]: updateProductPositionsBulkRequest,
  [Types.UPDATE_PRODUCT_POSITIONS_BULK_SUCCESS]: updateProductPositionsBulkSuccess,
  [Types.UPDATE_PRODUCT_POSITIONS_BULK_FAILURE]: updateProductPositionsBulkFailure,
  [Types.TOGGLE_CATEGORY_ACTIVENESS_SWITCH]: toggleCategoryActivenessSwitch,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
