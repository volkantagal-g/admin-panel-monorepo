import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { firmTypes } from '@shared/shared/constantValues';

const marketSupplierTypes = Object.keys(firmTypes);

export const INITIAL_STATE = {
  suppliers: {
    data: [],
    isPending: false,
    error: null,
  },
  filters: { supplierTypes: marketSupplierTypes },
};

export const getSuppliersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    suppliers: {
      ...INITIAL_STATE.suppliers,
      isPending: true,
    },
  };
};

export const getSuppliersSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    suppliers: {
      ...INITIAL_STATE.suppliers,
      data,
      isPending: false,
    },
  };
};

export const getSuppliersFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    suppliers: {
      ...INITIAL_STATE.suppliers,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const setSupplierTypes = (state = INITIAL_STATE, { supplierTypes }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      supplierTypes,
    },
  };
};

export const setSearchValue = (state = INITIAL_STATE, { searchValue }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      searchValue,
    },
  };
};

export const HANDLERS = {
  [Types.GET_SUPPLIERS_REQUEST]: getSuppliersRequest,
  [Types.GET_SUPPLIERS_SUCCESS]: getSuppliersSuccess,
  [Types.GET_SUPPLIERS_FAILURE]: getSuppliersFailure,
  [Types.DESTROY_PAGE]: destroy,
  [Types.SET_SUPPLIER_TYPES]: setSupplierTypes,
  [Types.SET_SEARCH_VALUE]: setSearchValue,
};

export default createReducer(INITIAL_STATE, HANDLERS);
