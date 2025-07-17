import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  warehouses: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getWarehousesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouses: {
      ...state.warehouses,
      isPending: true,
    },
  };
};

export const getWarehousesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouses: {
      ...state.warehouses,
      data,
      isPending: false,
    },
  };
};

export const getWarehousesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouses: {
      ...state.warehouses,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_WAREHOUSES_REQUEST]: getWarehousesRequest,
  [Types.GET_WAREHOUSES_SUCCESS]: getWarehousesSuccess,
  [Types.GET_WAREHOUSES_FAILURE]: getWarehousesFailure,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
