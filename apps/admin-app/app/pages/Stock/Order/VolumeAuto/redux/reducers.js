import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  suppliers: {
    data: [],
    isPending: false,
    error: null,
  },
  autoStockOrder: {
    data: {},
    isPending: false,
    error: null,
  },
  itemParams: { data: [] },
  supplierId: { data: undefined },
};

export const getSuppliersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    suppliers: {
      ...state.suppliers,
      isPending: true,
    },
  };
};

export const getSuppliersSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    suppliers: {
      ...state.suppliers,
      data,
      isPending: false,
    },
  };
};

export const getSuppliersFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    suppliers: {
      ...state.suppliers,
      isPending: false,
      error,
    },
  };
};

export const getAutoStockOrderRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    autoStockOrder: {
      ...state.autoStockOrder,
      isPending: true,
    },
  };
};

export const getAutoStockOrderSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    autoStockOrder: {
      ...state.autoStockOrder,
      data,
      isPending: false,
    },
  };
};

export const getAutoStockOrderFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    autoStockOrder: {
      ...state.autoStockOrder,
      isPending: false,
      error,
    },
  };
};

export const setItemParams = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    itemParams: {
      ...state.itemParams,
      data,
    },
  };
};

export const setSupplierId = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    supplierId: {
      ...state.supplierId,
      data,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_SUPPLIERS_REQUEST]: getSuppliersRequest,
  [Types.GET_SUPPLIERS_SUCCESS]: getSuppliersSuccess,
  [Types.GET_SUPPLIERS_FAILURE]: getSuppliersFailure,
  [Types.GET_AUTO_STOCK_ORDER_REQUEST]: getAutoStockOrderRequest,
  [Types.GET_AUTO_STOCK_ORDER_SUCCESS]: getAutoStockOrderSuccess,
  [Types.GET_AUTO_STOCK_ORDER_FAILURE]: getAutoStockOrderFailure,
  [Types.SET_ITEM_PARAMS]: setItemParams,
  [Types.SET_SUPPLIER_ID]: setSupplierId,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
