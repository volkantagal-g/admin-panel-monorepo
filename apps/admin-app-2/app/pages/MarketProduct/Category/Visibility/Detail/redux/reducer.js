import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getMarketProductCategoryAvailableTime: {
    isPending: false,
    data: {},
    error: null,
  },
  updateMarketProductCategoryAvailableTime: {
    isPending: false,
    error: null,
  },
};

export const getMarketProductCategoryAvailableTimeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductCategoryAvailableTime: {
      ...INITIAL_STATE.getMarketProductCategoryAvailableTime,
      isPending: true,
    },
  };
};

export const getMarketProductCategoryAvailableTimeSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductCategoryAvailableTime: {
      ...INITIAL_STATE.getMarketProductCategoryAvailableTime,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductCategoryAvailableTimeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductCategoryAvailableTime: {
      ...INITIAL_STATE.getMarketProductCategoryAvailableTime,
      isPending: false,
      error,
    },
  };
};

export const updateMarketProductCategoryAvailableTimeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateMarketProductCategoryAvailableTime: {
      ...INITIAL_STATE.updateMarketProductCategoryAvailableTime,
      isPending: true,
    },
  };
};

export const updateMarketProductCategoryAvailableTimeSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateMarketProductCategoryAvailableTime: {
      ...INITIAL_STATE.updateMarketProductCategoryAvailableTime,
      isPending: false,
    },
  };
};

export const updateMarketProductCategoryAvailableTimeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateMarketProductCategoryAvailableTime: {
      ...INITIAL_STATE.updateMarketProductCategoryAvailableTime,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST]: getMarketProductCategoryAvailableTimeRequest,
  [Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_SUCCESS]: getMarketProductCategoryAvailableTimeSuccess,
  [Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE]: getMarketProductCategoryAvailableTimeFailure,
  [Types.UPDATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST]: updateMarketProductCategoryAvailableTimeRequest,
  [Types.UPDATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_SUCCESS]: updateMarketProductCategoryAvailableTimeSuccess,
  [Types.UPDATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE]: updateMarketProductCategoryAvailableTimeFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
