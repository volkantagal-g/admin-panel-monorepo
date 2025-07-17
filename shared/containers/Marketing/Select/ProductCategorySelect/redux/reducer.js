import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  isPending: false,
  data: [],
  error: null,
};
export const getMarketProductCategoriesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    isPending: true,
  };
};

export const getMarketProductCategoriesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    data,
    isPending: false,
  };
};

export const getMarketProductCategoriesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    isPending: false,
    error,
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MARKET_PRODUCT_CATEGORIES_REQUEST]: getMarketProductCategoriesRequest,
  [Types.GET_MARKET_PRODUCT_CATEGORIES_SUCCESS]: getMarketProductCategoriesSuccess,
  [Types.GET_MARKET_PRODUCT_CATEGORIES_FAILURE]: getMarketProductCategoriesFailure,

  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
