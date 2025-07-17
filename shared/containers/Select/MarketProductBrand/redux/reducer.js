import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  brands: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getBrandsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    brands: {
      ...INITIAL_STATE.brands,
      isPending: true,
    },
  };
};

export const getBrandsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    brands: {
      ...INITIAL_STATE.brands,
      data,
      isPending: false,
    },
  };
};

export const getBrandsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    brands: {
      ...INITIAL_STATE.brands,
      isPending: false,
      error,
    },
  };
};

export const clearBrands = (state = INITIAL_STATE) => {
  return {
    ...state,
    brands: INITIAL_STATE.brands,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_BRANDS_REQUEST]: getBrandsRequest,
  [Types.GET_BRANDS_SUCCESS]: getBrandsSuccess,
  [Types.GET_BRANDS_FAILURE]: getBrandsFailure,
  [Types.CLEAR_BRANDS]: clearBrands,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
