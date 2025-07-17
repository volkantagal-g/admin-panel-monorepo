import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  autoStockOrder: {
    data: {},
    isPending: false,
    error: null,
  },
  itemParams: { data: [] },
  supplierId: { data: undefined },
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
  [Types.GET_AUTO_STOCK_ORDER_REQUEST]: getAutoStockOrderRequest,
  [Types.GET_AUTO_STOCK_ORDER_SUCCESS]: getAutoStockOrderSuccess,
  [Types.GET_AUTO_STOCK_ORDER_FAILURE]: getAutoStockOrderFailure,
  [Types.SET_ITEM_PARAMS]: setItemParams,
  [Types.SET_SUPPLIER_ID]: setSupplierId,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
