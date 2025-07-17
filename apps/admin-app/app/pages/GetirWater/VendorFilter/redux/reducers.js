import { createReducer } from 'reduxsauce';

import { Types } from '@app/pages/GetirWater/VendorFilter/redux/actions';
import { initialVendorFilter } from '../components/Filter/constants';

export const INITIAL_STATE = {
  brands: {
    data: [],
    isPending: false,
    error: null,
  },
  vendors: {
    data: [],
    isPending: false,
    error: null,
  },
  count: {
    data: {},
    isPending: false,
    error: null,
  },
  firms: {
    data: [],
    isPending: false,
    error: null,
  },
  statuses: {
    data: [],
    isPending: false,
    error: null,
  },
  excel: {
    data: [],
    isPending: false,
    error: null,
  },
  filters: initialVendorFilter,
};

export const getBrandsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    brands: {
      ...state.brands,
      isPending: true,
    },
  };
};

export const getBrandsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    brands: {
      ...state.brands,
      data,
      isPending: false,
    },
  };
};

export const getBrandsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    brands: {
      ...state.brands,
      isPending: false,
      error,
    },
  };
};

export const getFirmsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    firms: {
      ...state.firms,
      isPending: true,
    },
  };
};

export const getFirmsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    firms: {
      ...state.firms,
      data,
      isPending: false,
    },
  };
};

export const getFirmsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    firms: {
      ...state.firms,
      isPending: false,
      error,
    },
  };
};

export const filterVendorsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    vendors: {
      ...state.vendors,
      isPending: true,
    },
  };
};

export const filterVendorsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    vendors: {
      ...state.vendors,
      data,
      isPending: false,
    },
  };
};

export const filterVendorsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    vendors: {
      ...state.vendors,
      isPending: false,
      error,
    },
  };
};

export const getStatusRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    statuses: {
      ...state.statuses,
      isPending: true,
    },
  };
};

export const getStatusSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    statuses: {
      ...state.statuses,
      data,
      isPending: false,
    },
  };
};

export const getStatusFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    statuses: {
      ...state.statuses,
      isPending: false,
      error,
    },
  };
};

export const vendorFilterCountRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    count: {
      ...state.count,
      isPending: true,
    },
  };
};

export const vendorFilterCountSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    count: {
      ...state.count,
      data,
      isPending: false,
    },
  };
};

export const vendorFilterCountFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    count: {
      ...state.count,
      isPending: false,
      error,
    },
  };
};

export const excelRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    excel: {
      ...state.excel,
      isPending: true,
    },
  };
};

export const excelSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    excel: {
      ...state.excel,
      data,
      isPending: false,
    },
  };
};

export const excelFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    excel: {
      ...state.excel,
      isPending: false,
      error,
    },
  };
};

export const setFilters = (state = INITIAL_STATE, { filters }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      ...filters,
    },
  };
};

export const resetFilters = (state = INITIAL_STATE) => {
  return {
    ...state,
    filters: initialVendorFilter,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_BRANDS_REQUEST]: getBrandsRequest,
  [Types.GET_BRANDS_SUCCESS]: getBrandsSuccess,
  [Types.GET_BRANDS_FAILURE]: getBrandsFailure,
  [Types.GET_FIRMS_REQUEST]: getFirmsRequest,
  [Types.GET_FIRMS_SUCCESS]: getFirmsSuccess,
  [Types.GET_FIRMS_FAILURE]: getFirmsFailure,
  [Types.FILTER_VENDORS_REQUEST]: filterVendorsRequest,
  [Types.FILTER_VENDORS_SUCCESS]: filterVendorsSuccess,
  [Types.FILTER_VENDORS_FAILURE]: filterVendorsFailure,
  [Types.GET_STATUS_REQUEST]: getStatusRequest,
  [Types.GET_STATUS_SUCCESS]: getStatusSuccess,
  [Types.GET_STATUS_FAILURE]: getStatusFailure,
  [Types.GET_VENDOR_FILTER_COUNT_REQUEST]: vendorFilterCountRequest,
  [Types.GET_VENDOR_FILTER_COUNT_SUCCESS]: vendorFilterCountSuccess,
  [Types.GET_VENDOR_FILTER_COUNT_FAILURE]: vendorFilterCountFailure,
  [Types.GET_EXCEL_REQUEST]: excelRequest,
  [Types.GET_EXCEL_SUCCESS]: excelSuccess,
  [Types.GET_EXCEL_FAILURE]: excelFailure,
  [Types.SET_FILTERS]: setFilters,
  [Types.RESET_FILTERS]: resetFilters,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
