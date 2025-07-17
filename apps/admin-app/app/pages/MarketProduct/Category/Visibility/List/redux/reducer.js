import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getMarketProductCategoryAvailableTimes: {
    isPending: false,
    data: [],
    error: null,
  },
  deleteMarketProductCategoryAvailableTimes: {
    isPending: false,
    error: null,
  },
};

export const getMarketProductCategoryAvailableTimesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductCategoryAvailableTimes: {
      ...INITIAL_STATE.getMarketProductCategoryAvailableTimes,
      isPending: true,
    },
  };
};

export const getMarketProductCategoryAvailableTimesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductCategoryAvailableTimes: {
      ...INITIAL_STATE.getMarketProductCategoryAvailableTimes,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductCategoryAvailableTimesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductCategoryAvailableTimes: {
      ...INITIAL_STATE.getMarketProductCategoryAvailableTimes,
      isPending: false,
      error,
    },
  };
};

export const deleteMarketProductCategoryAvailableTimesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    deleteMarketProductCategoryAvailableTimes: {
      ...INITIAL_STATE.deleteMarketProductCategoryAvailableTimes,
      isPending: true,
    },
  };
};

export const deleteMarketProductCategoryAvailableTimesSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    deleteMarketProductCategoryAvailableTimes: {
      ...INITIAL_STATE.deleteMarketProductCategoryAvailableTimes,
      isPending: false,
    },
  };
};

export const deleteMarketProductCategoryAvailableTimesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    deleteMarketProductCategoryAvailableTimes: {
      ...INITIAL_STATE.deleteMarketProductCategoryAvailableTimes,
      isPending: false,
      error,
    },
  };
};

export const clearMarketProductCategoryAvailableTimes = state => {
  return {
    ...state,
    getMarketProductCategoryAvailableTimes: {
      ...INITIAL_STATE.getMarketProductCategoryAvailableTimes,
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_REQUEST]: getMarketProductCategoryAvailableTimesRequest,
  [Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_SUCCESS]: getMarketProductCategoryAvailableTimesSuccess,
  [Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_FAILURE]: getMarketProductCategoryAvailableTimesFailure,
  [Types.DELETE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_REQUEST]: deleteMarketProductCategoryAvailableTimesRequest,
  [Types.DELETE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_SUCCESS]: deleteMarketProductCategoryAvailableTimesSuccess,
  [Types.DELETE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_FAILURE]: deleteMarketProductCategoryAvailableTimesFailure,
  [Types.CLEAR_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES]: clearMarketProductCategoryAvailableTimes,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
