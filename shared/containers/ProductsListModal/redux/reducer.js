import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const PROMO_OPTIONS = {
  promo: 'promo',
  organic: 'organic',
};

export const INITIAL_STATE = {
  products: {
    data: null,
    isPending: false,
    error: null,
  },
  isProductsModalVisible: false,
};

const getActiveOrdersProductsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    products: {
      ...state.products,
      isPending: true,
    },
  };
};

const getActiveOrdersProductsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    products: {
      ...state.products,
      isPending: false,
      data,
    },
  };
};

const getActiveOrdersProductsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    products: {
      ...state.products,
      isPending: false,
      error,
    },
  };
};

const toggleIsProductsModalVisible = (state = INITIAL_STATE) => {
  return {
    ...state,
    isProductsModalVisible: !state.isProductsModalVisible,
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_ACTIVE_ORDERS_PRODUCTS_REQUEST]: getActiveOrdersProductsRequest,
  [Types.GET_ACTIVE_ORDERS_PRODUCTS_SUCCESS]: getActiveOrdersProductsSuccess,
  [Types.GET_ACTIVE_ORDERS_PRODUCTS_FAILURE]: getActiveOrdersProductsFailure,
  [Types.TOGGLE_IS_PRODUCTS_MODAL_VISIBLE]: toggleIsProductsModalVisible,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
