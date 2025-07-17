import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getChainRestaurantsByName: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const getChainRestaurantsByNameRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getChainRestaurantsByName: {
      ...INITIAL_STATE.getChainRestaurantsByName,
      isPending: true,
    },
  };
};

export const getChainRestaurantsByNameSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getChainRestaurantsByName: {
      ...INITIAL_STATE.getChainRestaurantsByName,
      data,
      isPending: false,
    },
  };
};

export const getChainRestaurantsByNameFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getChainRestaurantsByName: {
      ...INITIAL_STATE.getChainRestaurantsByName,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_CHAIN_RESTAURANTS_BY_NAME_REQUEST]: getChainRestaurantsByNameRequest,
  [Types.GET_CHAIN_RESTAURANTS_BY_NAME_SUCCESS]: getChainRestaurantsByNameSuccess,
  [Types.GET_CHAIN_RESTAURANTS_BY_NAME_FAILURE]: getChainRestaurantsByNameFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
