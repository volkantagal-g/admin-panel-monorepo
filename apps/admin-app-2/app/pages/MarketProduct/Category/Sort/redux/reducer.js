import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getCategoryOrders: {
    isPending: false,
    data: [],
    error: null,
  },
  updateCategoryOrderBulk: {
    isPending: false,
    data: [],
    error: null,
  },
  toggleCategoryActivenessSwitch: { data: false },
  toggleCategoryListablesSwitch: { data: true },
};

export const updateCategoryOrderBulkRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateCategoryOrderBulk: {
      ...INITIAL_STATE.updateCategoryOrderBulkRequest,
      isPending: true,
    },
  };
};

export const updateCategoryOrderBulkSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateCategoryOrderBulk: {
      ...INITIAL_STATE.updateCategoryOrderBulkSuccess,
      data,
      isPending: false,
    },
  };
};

export const updateCategoryOrderBulkFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateCategoryOrderBulk: {
      ...INITIAL_STATE.updateCategoryOrderBulkFailure,
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

export const toggleCategoryListablesSwitch = (state, { data }) => {
  return {
    ...state,
    toggleCategoryListablesSwitch: {
      ...INITIAL_STATE.toggleCategoryListablesSwitch,
      data,
    },
  };
};

export const getCategoryOrdersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getCategoryOrders: {
      ...INITIAL_STATE.getCategoryOrders,
      isPending: true,
    },
  };
};

export const getCategoryOrdersSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getCategoryOrders: {
      ...INITIAL_STATE.getCategoryOrders,
      data,
      isPending: false,
    },
  };
};

export const getCategoryOrdersFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getCategoryOrders: {
      ...INITIAL_STATE.getCategoryOrders,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.UPDATE_CATEGORY_ORDER_BULK_REQUEST]: updateCategoryOrderBulkRequest,
  [Types.UPDATE_CATEGORY_ORDER_BULK_SUCCESS]: updateCategoryOrderBulkSuccess,
  [Types.UPDATE_CATEGORY_ORDER_BULK_FAILURE]: updateCategoryOrderBulkFailure,
  [Types.TOGGLE_CATEGORY_ACTIVENESS_SWITCH]: toggleCategoryActivenessSwitch,
  [Types.TOGGLE_CATEGORY_LISTABLES_SWITCH]: toggleCategoryListablesSwitch,
  [Types.GET_CATEGORY_ORDERS_REQUEST]: getCategoryOrdersRequest,
  [Types.GET_CATEGORY_ORDERS_SUCCESS]: getCategoryOrdersSuccess,
  [Types.GET_CATEGORY_ORDERS_FAILURE]: getCategoryOrdersFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
