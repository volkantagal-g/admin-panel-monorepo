import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  response: {
    data: [],
    isPending: false,
    error: null,
  },
  paymentMethods: {
    data: [],
    isPending: false,
    error: null,
  },
  merchantTypes: {
    data: [],
    isPending: false,
    error: null,
  },
  shops: {
    data: [],
    isPending: false,
    error: null,
  },
  fetchers: {
    country: '',
    city: '',
  },
  filters: {
    searchLocalsValue: '',
    city: [],
    localsValue: '',
    deliveryValue: '',
    platformValue: '',
    couriers: [],
    paymentTypes: [],
    domainType: '',
    lastActivity: [],
    orderStatusTypes: [],
    merchantTypes: [],
    searchValue: '',
    filterRetailOrders: false,
    filterScheduledOrders: false,
  },
  mappedResults: { data: [] },
};

export const getActivesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    response: {
      ...INITIAL_STATE.response,
      isPending: true,
    },
  };
};

export const getActivesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    response: {
      ...INITIAL_STATE.response,
      data,
      isPending: false,
    },
  };
};

export const getActivesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    response: {
      ...INITIAL_STATE.response,
      isPending: false,
      error,
    },
  };
};

export const getPaymentMethodsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    paymentMethods: {
      ...INITIAL_STATE.paymentMethods,
      isPending: true,
    },
  };
};

export const getPaymentMethodsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    paymentMethods: {
      ...INITIAL_STATE.paymentMethods,
      data,
      isPending: false,
    },
  };
};

export const getPaymentMethodsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    paymentMethods: {
      ...INITIAL_STATE.paymentMethods,
      isPending: false,
      error,
    },
  };
};

export const getMerchantTypesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    merchantTypes: {
      ...INITIAL_STATE.merchantTypes,
      isPending: true,
    },
  };
};

export const getMerchantTypesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    merchantTypes: {
      ...INITIAL_STATE.merchantTypes,
      data,
      isPending: false,
    },
  };
};

export const getMerchantTypesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    merchantTypes: {
      ...INITIAL_STATE.merchantTypes,
      isPending: false,
      error,
    },
  };
};

export const getShopsByNameRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    shops: {
      ...INITIAL_STATE.shops,
      isPending: true,
    },
  };
};

export const getShopsByNameSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    shops: {
      ...INITIAL_STATE.shops,
      data,
      isPending: false,
    },
  };
};

export const getShopsByNameFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    shops: {
      ...INITIAL_STATE.shops,
      isPending: false,
      error,
    },
  };
};

export const setCity = (state = INITIAL_STATE, { city }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      city,
    },
  };
};

export const setLocals = (state = INITIAL_STATE, { localsValue }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      localsValue,
    },
  };
};

export const setSearchLocals = (state = INITIAL_STATE, { searchLocalsValue }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      searchLocalsValue,
    },
  };
};

export const setDeliveryType = (state = INITIAL_STATE, { deliveryValue }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      deliveryValue,
    },
  };
};

export const setPlatformType = (state = INITIAL_STATE, { platformValue }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      platformValue,
    },
  };
};

export const setCourierTypes = (state = INITIAL_STATE, { couriers }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      couriers,
    },
  };
};

export const setPaymentTypes = (state = INITIAL_STATE, { paymentTypes }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      paymentTypes,
    },
  };
};

export const setOrderStatusTypes = (state = INITIAL_STATE, { orderStatusTypes }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      orderStatusTypes,
    },
  };
};

export const setMerchantTypes = (state = INITIAL_STATE, { merchantTypes }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      merchantTypes,
    },
  };
};

export const setCourierDomainTypes = (state = INITIAL_STATE, { domainType }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      domainType,
    },
  };
};

export const setLastActivity = (state = INITIAL_STATE, { lastActivity }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      lastActivity,
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

export const setFilterRetailOrders = (state = INITIAL_STATE, { filterRetailOrders }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      filterRetailOrders,
    },
  };
};

export const setFilterScheduledOrders = (state = INITIAL_STATE, { filterScheduledOrders }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      filterScheduledOrders,
    },
  };
};

export const setFetchersCity = (state = INITIAL_STATE, { city }) => {
  return {
    ...state,
    fetchers: {
      ...state.fetchers,
      city,
    },
  };
};

export const setFetchersCountry = (state = INITIAL_STATE, { country }) => {
  return {
    ...state,
    fetchers: {
      ...state.fetchers,
      country,
    },
  };
};

export const setMappedResults = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    mappedResults: {
      ...state.mappedResults,
      data,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_ACTIVES_REQUEST]: getActivesRequest,
  [Types.GET_ACTIVES_SUCCESS]: getActivesSuccess,
  [Types.GET_ACTIVES_FAILURE]: getActivesFailure,
  [Types.GET_PAYMENT_METHODS_REQUEST]: getPaymentMethodsRequest,
  [Types.GET_PAYMENT_METHODS_SUCCESS]: getPaymentMethodsSuccess,
  [Types.GET_PAYMENT_METHODS_FAILURE]: getPaymentMethodsFailure,
  [Types.GET_MERCHANT_TYPES_REQUEST]: getMerchantTypesRequest,
  [Types.GET_MERCHANT_TYPES_SUCCESS]: getMerchantTypesSuccess,
  [Types.GET_MERCHANT_TYPES_FAILURE]: getMerchantTypesFailure,
  [Types.GET_SHOPS_BY_NAME_REQUEST]: getShopsByNameRequest,
  [Types.GET_SHOPS_BY_NAME_SUCCESS]: getShopsByNameSuccess,
  [Types.GET_SHOPS_BY_NAME_FAILURE]: getShopsByNameFailure,
  [Types.SET_FETCHERS_CITY]: setFetchersCity,
  [Types.SET_FETCHERS_COUNTRY]: setFetchersCountry,
  [Types.SET_CITY]: setCity,
  [Types.SET_LOCALS]: setLocals,
  [Types.SET_SEARCH_LOCALS]: setSearchLocals,
  [Types.SET_DELIVERY_TYPE]: setDeliveryType,
  [Types.SET_PLATFORM_TYPE]: setPlatformType,
  [Types.SET_COURIER_TYPES]: setCourierTypes,
  [Types.SET_PAYMENT_TYPES]: setPaymentTypes,
  [Types.SET_COURIER_DOMAIN_TYPES]: setCourierDomainTypes,
  [Types.SET_LAST_ACTIVITY]: setLastActivity,
  [Types.SET_ORDER_STATUS_TYPES]: setOrderStatusTypes,
  [Types.SET_MERCHANT_TYPES]: setMerchantTypes,
  [Types.SET_SEARCH_VALUE]: setSearchValue,
  [Types.SET_FILTER_RETAIL_ORDERS]: setFilterRetailOrders,
  [Types.SET_FILTER_SCHEDULED_ORDERS]: setFilterScheduledOrders,
  [Types.SET_MAPPED_RESULTS]: setMappedResults,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
