import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createMarketProductCategoryAvailableTime: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const createMarketProductCategoryAvailableTimeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createMarketProductCategoryAvailableTime: {
      ...INITIAL_STATE.createMarketProductCategoryAvailableTime,
      isPending: true,
    },
  };
};

export const createMarketProductCategoryAvailableTimeSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createMarketProductCategoryAvailableTime: {
      ...INITIAL_STATE.createMarketProductCategoryAvailableTime,
      data,
      isPending: false,
    },
  };
};

export const createMarketProductCategoryAvailableTimeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createMarketProductCategoryAvailableTime: {
      ...INITIAL_STATE.createMarketProductCategoryAvailableTime,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST]: createMarketProductCategoryAvailableTimeRequest,
  [Types.CREATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_SUCCESS]: createMarketProductCategoryAvailableTimeSuccess,
  [Types.CREATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE]: createMarketProductCategoryAvailableTimeFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
