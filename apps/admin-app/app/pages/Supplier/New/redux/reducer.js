import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createSupplier: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const createSupplierRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createSupplier: {
      ...INITIAL_STATE.createSupplier,
      isPending: true,
    },
  };
};

export const createSupplierSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createSupplier: {
      ...INITIAL_STATE.createSupplier,
      data,
      isPending: false,
    },
  };
};

export const createSupplierFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createSupplier: {
      ...INITIAL_STATE.createSupplier,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_SUPPLIER_REQUEST]: createSupplierRequest,
  [Types.CREATE_SUPPLIER_SUCCESS]: createSupplierSuccess,
  [Types.CREATE_SUPPLIER_FAILURE]: createSupplierFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
