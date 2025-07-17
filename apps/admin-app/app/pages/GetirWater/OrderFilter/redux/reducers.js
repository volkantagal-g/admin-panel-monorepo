import { createReducer } from 'reduxsauce';
import moment from 'moment-timezone';

import { Types } from './actions';

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
  paymentMethods: {
    data: [],
    isPending: false,
    error: null,
  },
  orders: {
    data: [],
    isPending: false,
    error: null,
  },
  filters: {
    startDate: moment().startOf('day'),
    endDate: moment().endOf('day'),
    brandId: undefined,
    vendorId: undefined,
    status: undefined,
    timeType: undefined,
    cityId: undefined,
    paymentMethod: undefined,
    confirmationCode: undefined,
    page: 1,
    count: 10,
  },
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

export const getVendorsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    vendors: {
      ...state.vendors,
      isPending: true,
    },
  };
};

export const getVendorsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    vendors: {
      ...state.vendors,
      data,
      isPending: false,
    },
  };
};

export const getVendorsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    vendors: {
      ...state.vendors,
      isPending: false,
      error,
    },
  };
};

export const getPaymentMethodsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    paymentMethods: {
      ...state.paymentMethods,
      isPending: true,
    },
  };
};

export const getPaymentMethodsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    paymentMethods: {
      ...state.paymentMethods,
      data,
      isPending: false,
    },
  };
};

export const getPaymentMethodsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    paymentMethods: {
      ...state.paymentMethods,
      isPending: false,
      error,
    },
  };
};

export const filterOrdersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orders: {
      ...state.orders,
      isPending: true,
    },
  };
};

export const filterOrdersSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    orders: {
      ...state.orders,
      data,
      isPending: false,
    },
  };
};

export const filterOrdersFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orders: {
      ...state.orders,
      isPending: false,
      error,
    },
  };
};

export const setFilters = (state = INITIAL_STATE, { value, fieldName, isNumber }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      [fieldName]: value && isNumber ? Number(value) : value,
    },
  };
};

export const resetFilters = (state = INITIAL_STATE) => {
  return {
    ...state,
    filters: {
      startDate: undefined,
      endDate: undefined,
      brandId: undefined,
      vendorId: undefined,
      status: undefined,
      timeType: undefined,
      cityId: undefined,
      paymentMethod: undefined,
      confirmationCode: undefined,
      page: 1,
      count: 10,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_BRANDS_REQUEST]: getBrandsRequest,
  [Types.GET_BRANDS_SUCCESS]: getBrandsSuccess,
  [Types.GET_BRANDS_FAILURE]: getBrandsFailure,
  [Types.GET_VENDORS_REQUEST]: getVendorsRequest,
  [Types.GET_VENDORS_SUCCESS]: getVendorsSuccess,
  [Types.GET_VENDORS_FAILURE]: getVendorsFailure,
  [Types.GET_PAYMENT_METHODS_REQUEST]: getPaymentMethodsRequest,
  [Types.GET_PAYMENT_METHODS_SUCCESS]: getPaymentMethodsSuccess,
  [Types.GET_PAYMENT_METHODS_FAILURE]: getPaymentMethodsFailure,
  [Types.FILTER_ORDERS_REQUEST]: filterOrdersRequest,
  [Types.FILTER_ORDERS_SUCCESS]: filterOrdersSuccess,
  [Types.FILTER_ORDERS_FAILURE]: filterOrdersFailure,
  [Types.SET_FILTERS]: setFilters,
  [Types.RESET_FILTERS]: resetFilters,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
