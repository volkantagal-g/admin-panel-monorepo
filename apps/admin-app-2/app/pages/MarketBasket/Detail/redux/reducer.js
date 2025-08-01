import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getMarketBasket: {
    isPending: false,
    data: {},
    error: null,
  },
  cancelMarketBasket: {
    isPending: false,
    data: {},
    error: null,
  },
};

const getMarketBasketRequest = state => ({
  ...state,
  getMarketBasket: {
    ...state.getMarketBasket,
    isPending: true,
    data: {},
  },
});

const getMarketBasketSuccess = (state, { data }) => ({
  ...state,
  getMarketBasket: {
    ...state.getMarketBasket,
    isPending: false,
    data,
  },
});

const getMarketBasketFailure = (state, { error }) => ({
  ...state,
  getMarketBasket: {
    ...state.getMarketBasket,
    isPending: false,
    error,
  },
});

const cancelMarketBasketRequest = state => ({
  ...state,
  cancelMarketBasket: { ...state.cancelMarketBasket, isPending: true },
});
const cancelMarketBasketSuccess = (state, { data }) => ({
  ...state,
  cancelMarketBasket: { ...state.cancelMarketBasket, isPending: false, data },
});
const cancelMarketBasketFailure = (state, { error }) => ({
  ...state,
  cancelMarketBasket: { ...state.cancelMarketBasket, isPending: false, error },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_MARKET_BASKET_REQUEST]: getMarketBasketRequest,
  [Types.GET_MARKET_BASKET_SUCCESS]: getMarketBasketSuccess,
  [Types.GET_MARKET_BASKET_FAILURE]: getMarketBasketFailure,
  [Types.CANCEL_MARKET_BASKET_REQUEST]: cancelMarketBasketRequest,
  [Types.CANCEL_MARKET_BASKET_SUCCESS]: cancelMarketBasketSuccess,
  [Types.CANCEL_MARKET_BASKET_FAILURE]: cancelMarketBasketFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
