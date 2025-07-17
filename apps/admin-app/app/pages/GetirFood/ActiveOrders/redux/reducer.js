import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  activeOrders: {
    data: {
      data: [],
      totalFoodOrderCount: null,
    },
    isPending: false,
    error: null,
  },
  paymentMethods: {
    data: [],
    isPending: false,
    error: null,
  },
  restaurants: {
    data: [],
    isPending: false,
    error: null,
  },
  fetchers: {
    country: '',
    city: '',
  },
  filters: {
    pagination: {
      currentPage: 1,
      rowsPerPage: 100,
    },
    searchRestaurantsValue: '',
    city: '',
    restaurantsValue: '',
    deliveryValue: '',
    platformValue: '',
    couriers: [],
    paymentTypes: [],
    isRDU: undefined,
  },
  mappedResults: { data: [] },
};

export const getActivesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    activeOrders: {
      ...INITIAL_STATE.activeOrders,
      isPending: true,
    },
  };
};

export const getActivesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    activeOrders: {
      ...INITIAL_STATE.activeOrders,
      data,
      isPending: false,
    },
  };
};

export const getActivesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    activeOrders: {
      ...INITIAL_STATE.activeOrders,
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

export const getRestaurantsByNameRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    restaurants: {
      ...INITIAL_STATE.restaurants,
      isPending: true,
    },
  };
};

export const getRestaurantsByNameSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    restaurants: {
      ...INITIAL_STATE.restaurants,
      data,
      isPending: false,
    },
  };
};

export const getRestaurantsByNameFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    restaurants: {
      ...INITIAL_STATE.restaurants,
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

export const setRestaurants = (state = INITIAL_STATE, { restaurantsValue }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      restaurantsValue,
    },
  };
};

export const setSearchRestaurants = (state = INITIAL_STATE, { searchRestaurantsValue }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      searchRestaurantsValue,
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

export const setIsRDUTypes = (state = INITIAL_STATE, { isRDU }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      isRDU,
    },
  };
};

export const setPagination = (state = INITIAL_STATE, { pagination }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      pagination,
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
  [Types.GET_RESTAURANTS_BY_NAME_REQUEST]: getRestaurantsByNameRequest,
  [Types.GET_RESTAURANTS_BY_NAME_SUCCESS]: getRestaurantsByNameSuccess,
  [Types.GET_RESTAURANTS_BY_NAME_FAILURE]: getRestaurantsByNameFailure,
  [Types.SET_FETCHERS_CITY]: setFetchersCity,
  [Types.SET_FETCHERS_COUNTRY]: setFetchersCountry,
  [Types.SET_CITY]: setCity,
  [Types.SET_RESTAURANTS]: setRestaurants,
  [Types.SET_SEARCH_RESTAURANTS]: setSearchRestaurants,
  [Types.SET_DELIVERY_TYPE]: setDeliveryType,
  [Types.SET_PLATFORM_TYPE]: setPlatformType,
  [Types.SET_COURIER_TYPES]: setCourierTypes,
  [Types.SET_PAYMENT_TYPES]: setPaymentTypes,
  [Types.SET_IS_RDU]: setIsRDUTypes,
  [Types.SET_PAGINATION]: setPagination,
  [Types.SET_MAPPED_RESULTS]: setMappedResults,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
