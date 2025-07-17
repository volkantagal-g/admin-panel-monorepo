import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  orderSummary: {
    data: {},
    isPending: false,
    error: null,
  },
  restaurantSummary: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getOrderSummaryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderSummary: {
      ...state.orderSummary,
      isPending: true,
    },
  };
};

export const getOrderSummarySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    orderSummary: {
      ...INITIAL_STATE.orderSummary,
      data,
      isPending: false,
    },
  };
};

export const getOrderSummaryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderSummary: {
      ...INITIAL_STATE.orderSummary,
      isPending: false,
      error,
    },
  };
};

export const getRestaurantSummaryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    restaurantSummary: {
      ...state.restaurantSummary,
      isPending: true,
    },
  };
};

export const getRestaurantSummarySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    restaurantSummary: {
      ...INITIAL_STATE.restaurantSummary,
      data,
      isPending: false,
    },
  };
};

export const getRestaurantSummaryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    restaurantSummary: {
      ...INITIAL_STATE.restaurantSummary,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_ORDER_SUMMARY_REQUEST]: getOrderSummaryRequest,
  [Types.GET_ORDER_SUMMARY_SUCCESS]: getOrderSummarySuccess,
  [Types.GET_ORDER_SUMMARY_FAILURE]: getOrderSummaryFailure,
  [Types.GET_RESTAURANT_SUMMARY_REQUEST]: getRestaurantSummaryRequest,
  [Types.GET_RESTAURANT_SUMMARY_SUCCESS]: getRestaurantSummarySuccess,
  [Types.GET_RESTAURANT_SUMMARY_FAILURE]: getRestaurantSummaryFailure,
  // [Types.SET_SELECTED_CITY]: setSelectedCity,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
