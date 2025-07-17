import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  warehouses: {
    data: [],
    isPending: false,
    totalCount: 0,
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

export const getWarehousesSuccess = (state = INITIAL_STATE, { warehouses = [], totalCount }) => {
  return {
    ...state,
    warehouses: {
      ...state.warehouses,
      data: warehouses,
      isPending: false,
      totalCount,
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
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
