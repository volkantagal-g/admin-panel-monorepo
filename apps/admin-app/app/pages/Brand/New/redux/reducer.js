import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createBrand: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const createBrandRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createBrand: {
      ...INITIAL_STATE.createBrand,
      isPending: true,
    },
  };
};

export const createBrandSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createBrand: {
      ...INITIAL_STATE.createBrand,
      data,
      isPending: false,
    },
  };
};

export const createBrandFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createBrand: {
      ...INITIAL_STATE.createBrand,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_BRAND_REQUEST]: createBrandRequest,
  [Types.CREATE_BRAND_SUCCESS]: createBrandSuccess,
  [Types.CREATE_BRAND_FAILURE]: createBrandFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
