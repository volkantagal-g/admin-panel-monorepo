import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  isPending: false,
  data: [],
  error: null,
  map: {},
};

export const getMarketProductsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    isPending: true,
  };
};

export const getMarketProductsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    data,
    isPending: false,
  };
};

export const getMarketProductsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    isPending: false,
    error,
  };
};

export const setMarketProductsMap = (state = INITIAL_STATE, { data }) => {
  const copyMap = { ...state.map };
  data.forEach(item => {
    if (!copyMap[item._id]) {
      copyMap[item._id] = item;
    }
  });
  return {
    ...state,
    map: copyMap,
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MARKET_PRODUCTS_REQUEST]: getMarketProductsRequest,
  [Types.GET_MARKET_PRODUCTS_SUCCESS]: getMarketProductsSuccess,
  [Types.GET_MARKET_PRODUCTS_FAILURE]: getMarketProductsFailure,

  [Types.SET_MARKET_PRODUCTS_MAP]: setMarketProductsMap,

  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
