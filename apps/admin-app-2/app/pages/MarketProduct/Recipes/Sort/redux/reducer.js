import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getRecipeOrders: {
    isPending: false,
    data: [],
    error: null,
  },
  updateRecipeOrderBulk: {
    isPending: false,
    data: [],
    error: null,
  },
  toggleRecipeActivenessSwitch: { data: false },
};

export const updateRecipeOrderBulkRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateRecipeOrderBulk: {
      ...INITIAL_STATE.updateRecipeOrderBulkRequest,
      isPending: true,
    },
  };
};

export const updateRecipeOrderBulkSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateRecipeOrderBulk: {
      ...INITIAL_STATE.updateRecipeOrderBulkSuccess,
      data,
      isPending: false,
    },
  };
};

export const updateRecipeOrderBulkFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateRecipeOrderBulk: {
      ...INITIAL_STATE.updateRecipeOrderBulkFailure,
      isPending: false,
      error,
    },
  };
};

export const toggleRecipeActivenessSwitch = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    toggleRecipeActivenessSwitch: {
      ...INITIAL_STATE.toggleRecipeActivenessSwitch,
      data,
    },
  };
};

export const getRecipeOrdersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getRecipeOrders: {
      ...INITIAL_STATE.getRecipeOrders,
      isPending: true,
    },
  };
};

export const getRecipeOrdersSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getRecipeOrders: {
      ...INITIAL_STATE.getRecipeOrders,
      data,
      isPending: false,
    },
  };
};

export const getRecipeOrdersFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getRecipeOrders: {
      ...INITIAL_STATE.getRecipeOrders,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.UPDATE_RECIPE_ORDER_BULK_REQUEST]: updateRecipeOrderBulkRequest,
  [Types.UPDATE_RECIPE_ORDER_BULK_SUCCESS]: updateRecipeOrderBulkSuccess,
  [Types.UPDATE_RECIPE_ORDER_BULK_FAILURE]: updateRecipeOrderBulkFailure,
  [Types.TOGGLE_RECIPE_ACTIVENESS_SWITCH]: toggleRecipeActivenessSwitch,
  [Types.GET_RECIPE_ORDERS_REQUEST]: getRecipeOrdersRequest,
  [Types.GET_RECIPE_ORDERS_SUCCESS]: getRecipeOrdersSuccess,
  [Types.GET_RECIPE_ORDERS_FAILURE]: getRecipeOrdersFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
