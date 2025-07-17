import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getBrand: {
    isPending: false,
    data: {},
    error: null,
  },
  updateBrand: {
    isPending: false,
    error: null,
  },
  activateBrand: {
    isPending: false,
    error: null,
  },
  deactivateBrand: {
    isPending: false,
    error: null,
  },
};

export const getBrandRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getBrand: {
      ...INITIAL_STATE.getBrand,
      isPending: true,
    },
  };
};

export const getBrandSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getBrand: {
      ...INITIAL_STATE.getBrand,
      data,
      isPending: false,
    },
  };
};

export const getBrandFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getBrand: {
      ...INITIAL_STATE.getBrand,
      isPending: false,
      error,
    },
  };
};

export const updateBrandRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateBrand: {
      ...INITIAL_STATE.updateBrand,
      isPending: true,
    },
  };
};

export const updateBrandSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateBrand: {
      ...INITIAL_STATE.updateBrand,
      isPending: false,
    },
  };
};

export const updateBrandFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateBrand: {
      ...INITIAL_STATE.updateBrand,
      isPending: false,
      error,
    },
  };
};

export const activateBrandRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    activateBrand: {
      ...INITIAL_STATE.activateBrand,
      isPending: true,
    },
  };
};

export const activateBrandSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    activateBrand: {
      ...INITIAL_STATE.activateBrand,
      isPending: false,
    },
  };
};

export const activateBrandFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    activateBrand: {
      ...INITIAL_STATE.activateBrand,
      isPending: false,
      error,
    },
  };
};

export const deactivateBrandRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    deactivateBrand: {
      ...INITIAL_STATE.deactivateBrand,
      isPending: true,
    },
  };
};

export const deactivateBrandSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    deactivateBrand: {
      ...INITIAL_STATE.deactivateBrand,
      isPending: false,
    },
  };
};

export const deactivateBrandFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    deactivateBrand: {
      ...INITIAL_STATE.deactivateBrand,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_BRAND_REQUEST]: getBrandRequest,
  [Types.GET_BRAND_SUCCESS]: getBrandSuccess,
  [Types.GET_BRAND_FAILURE]: getBrandFailure,
  [Types.UPDATE_BRAND_REQUEST]: updateBrandRequest,
  [Types.UPDATE_BRAND_SUCCESS]: updateBrandSuccess,
  [Types.UPDATE_BRAND_FAILURE]: updateBrandFailure,
  [Types.ACTIVATE_BRAND_REQUEST]: activateBrandRequest,
  [Types.ACTIVATE_BRAND_SUCCESS]: activateBrandSuccess,
  [Types.ACTIVATE_BRAND_FAILURE]: activateBrandFailure,
  [Types.DEACTIVATE_BRAND_REQUEST]: deactivateBrandRequest,
  [Types.DEACTIVATE_BRAND_SUCCESS]: deactivateBrandSuccess,
  [Types.DEACTIVATE_BRAND_FAILURE]: deactivateBrandFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
