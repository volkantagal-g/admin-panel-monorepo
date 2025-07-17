import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  locations: {
    data: [],
    isPending: false,
    error: null,
  },
  products: {
    data: [],
    isPending: false,
    error: null,
  },
  form: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const createLocationWriteOffRequest = (state = INITIAL_STATE, { requestBody }) => {
  return {
    ...state,
    form: {
      ...state.form,
      data: requestBody,
      isPending: true,
    },
  };
};

export const createLocationWriteOffSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    form: {
      ...state.form,
      data,
      isPending: false,
    },
  };
};

export const createLocationWriteOffFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    form: {
      ...state.form,
      isPending: false,
      error,
    },
  };
};

export const getLocationsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    locations: {
      ...state.locations,
      isPending: true,
    },
  };
};

export const getLocationsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    locations: {
      ...state.locations,
      data,
      isPending: false,
    },
  };
};

export const getLocationsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    locations: {
      ...state.locations,
      isPending: false,
      error,
    },
  };
};

export const getProductsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    products: {
      ...state.products,
      isPending: true,
    },
  };
};

export const clearProducts = (state = INITIAL_STATE) => {
  return {
    ...state,
    products: INITIAL_STATE.products,
  };
};

export const getProductsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    products: {
      ...state.products,
      data,
      isPending: false,
    },
  };
};

export const getProductsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    products: {
      ...state.products,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_LOCATION_WRITE_OFF_REQUEST]: createLocationWriteOffRequest,
  [Types.CREATE_LOCATION_WRITE_OFF_SUCCESS]: createLocationWriteOffSuccess,
  [Types.CREATE_LOCATION_WRITE_OFF_FAILURE]: createLocationWriteOffFailure,
  [Types.GET_PRODUCTS_REQUEST]: getProductsRequest,
  [Types.CLEAR_PRODUCTS]: clearProducts,
  [Types.GET_PRODUCTS_SUCCESS]: getProductsSuccess,
  [Types.GET_PRODUCTS_FAILURE]: getProductsFailure,
  [Types.GET_LOCATIONS_REQUEST]: getLocationsRequest,
  [Types.GET_LOCATIONS_SUCCESS]: getLocationsSuccess,
  [Types.GET_LOCATIONS_FAILURE]: getLocationsFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
