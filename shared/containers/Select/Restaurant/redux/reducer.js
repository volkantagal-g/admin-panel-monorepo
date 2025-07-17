import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getRestaurantsByName: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const getRestaurantsByNameRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getRestaurantsByName: {
      ...INITIAL_STATE.getRestaurantsByName,
      isPending: true,
    },
  };
};

export const getRestaurantsByNameSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getRestaurantsByName: {
      ...INITIAL_STATE.getRestaurantsByName,
      data,
      isPending: false,
    },
  };
};

export const getRestaurantsByNameFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getRestaurantsByName: {
      ...INITIAL_STATE.getRestaurantsByName,
      isPending: false,
      error,
    },
  };
};

export const getRestaurantByIdRequest = state => {
  return {
    ...state,
    getRestaurantsByName: {
      ...state.getRestaurantsByName,
      isPending: true,
      error: null,
      data: [],
    },
  };
};

export const getRestaurantByIdSuccess = (state, { data }) => {
  return {
    ...state,
    getRestaurantsByName: {
      ...state.getRestaurantsByName,
      isPending: false,
      data,
      error: null,
    },
  };
};

export const getRestaurantByIdFailure = (state, { error }) => {
  return {
    ...state,
    getRestaurantsByName: {
      ...state.getRestaurantsByName,
      isPending: false,
      data: [],
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_RESTAURANTS_BY_NAME_REQUEST]: getRestaurantsByNameRequest,
  [Types.GET_RESTAURANTS_BY_NAME_SUCCESS]: getRestaurantsByNameSuccess,
  [Types.GET_RESTAURANTS_BY_NAME_FAILURE]: getRestaurantsByNameFailure,

  [Types.GET_RESTAURANT_BY_ID_REQUEST]: getRestaurantByIdRequest,
  [Types.GET_RESTAURANT_BY_ID_SUCCESS]: getRestaurantByIdSuccess,
  [Types.GET_RESTAURANT_BY_ID_FAILURE]: getRestaurantByIdFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
