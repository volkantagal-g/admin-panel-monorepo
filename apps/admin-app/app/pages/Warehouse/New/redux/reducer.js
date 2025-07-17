import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  form: {
    data: {},
    isPending: false,
    error: null,
  },
  sapDraftWarehouses: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const createWarehouseRequest = (state = INITIAL_STATE, { requestBody }) => {
  return {
    ...state,
    form: {
      ...state.form,
      data: requestBody,
      isPending: true,
    },
  };
};

export const createWarehouseSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    form: {
      ...state.form,
      data,
      isPending: false,
    },
  };
};

export const createWarehouseFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    form: {
      ...state.form,
      isPending: false,
      error,
    },
  };
};

export const getSAPDraftWarehousesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    sapDraftWarehouses: {
      ...state.sapDraftWarehouses,
      isPending: true,
    },
  };
};

export const getSAPDraftWarehousesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    sapDraftWarehouses: {
      ...state.sapDraftWarehouses,
      data,
      isPending: false,
    },
  };
};

export const getSAPDraftWarehousesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    sapDraftWarehouses: {
      ...state.sapDraftWarehouses,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_WAREHOUSE_REQUEST]: createWarehouseRequest,
  [Types.CREATE_WAREHOUSE_SUCCESS]: createWarehouseSuccess,
  [Types.CREATE_WAREHOUSE_FAILURE]: createWarehouseFailure,
  [Types.GET_SAP_DRAFT_WAREHOUSES_REQUEST]: getSAPDraftWarehousesRequest,
  [Types.GET_SAP_DRAFT_WAREHOUSES_SUCCESS]: getSAPDraftWarehousesSuccess,
  [Types.GET_SAP_DRAFT_WAREHOUSES_FAILURE]: getSAPDraftWarehousesFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
