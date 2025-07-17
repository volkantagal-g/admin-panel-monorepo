import { createReducer } from 'reduxsauce';

import moment from 'moment';

import { Types } from '@app/pages/GetirFood/FilterOrders/redux/actions';

export const INITIAL_STATE = {
  results: {
    data: [],
    isPending: false,
    error: null,
  },
  filteredResults: {
    data: [],
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
  filters: {
    page: 1,
    count: 30,
    startDate: moment().startOf('day'),
    endDate: moment().endOf('day'),
    paymentMethods: [],
    deliveryTypes: [],
    isRDU: undefined,
    platformTypes: [],
    timeTypes: [],
    confirmationCode: '',
    status: null,
    cityId: null,
    restaurantId: null,
  },
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const getResultsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    results: {
      ...state.results,
      isPending: true,
    },
  };
};

export const getResultsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    results: {
      ...state.results,
      data,
      isPending: false,
    },
  };
};

export const getResultsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    results: {
      ...state.results,
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

export const setFilterPage = (state = INITIAL_STATE, { page }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      page,
    },
  };
};

export const setFiltersPagePerRow = (state = INITIAL_STATE, { pagePerRow }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      count: pagePerRow,
    },
  };
};

export const setStartDate = (state = INITIAL_STATE, { startDate }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      startDate,
    },
  };
};

export const setEndDate = (state = INITIAL_STATE, { endDate }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      endDate,
    },
  };
};

export const setPaymentMethods = (state = INITIAL_STATE, { paymentMethods }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      paymentMethods,
    },
  };
};

export const setDeliveryTypes = (state = INITIAL_STATE, { deliveryTypes }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      deliveryTypes,
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

export const setPlatformTypes = (state = INITIAL_STATE, { platformTypes }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      platformTypes,
    },
  };
};

export const setTimeTypes = (state = INITIAL_STATE, { timeTypes }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      timeTypes,
    },
  };
};

export const setConfirmationCode = (state = INITIAL_STATE, { confirmationCode }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      confirmationCode,
    },
  };
};

export const setOrderStatus = (state = INITIAL_STATE, { status }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      status,
    },
  };
};

export const setCityId = (state = INITIAL_STATE, { cityId }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      cityId,
    },
  };
};

export const setRestaurantId = (state = INITIAL_STATE, { restaurantId }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      restaurantId,
    },
  };
};

export const HANDLERS = {
  // reset
  [Types.DESTROY_PAGE]: destroy,

  // Network
  [Types.GET_RESULTS_REQUEST]: getResultsRequest,
  [Types.GET_RESULTS_SUCCESS]: getResultsSuccess,
  [Types.GET_RESULTS_FAILURE]: getResultsFailure,
  [Types.GET_PAYMENT_METHODS_REQUEST]: getPaymentMethodsRequest,
  [Types.GET_PAYMENT_METHODS_SUCCESS]: getPaymentMethodsSuccess,
  [Types.GET_PAYMENT_METHODS_FAILURE]: getPaymentMethodsFailure,
  [Types.GET_RESTAURANTS_BY_NAME_REQUEST]: getRestaurantsByNameRequest,
  [Types.GET_RESTAURANTS_BY_NAME_SUCCESS]: getRestaurantsByNameSuccess,
  [Types.GET_RESTAURANTS_BY_NAME_FAILURE]: getRestaurantsByNameFailure,

  // Filter setters
  [Types.SET_FILTERS_PAGE]: setFilterPage,
  [Types.SET_FILTERS_PAGE_PER_ROW]: setFiltersPagePerRow,
  [Types.SET_START_DATE]: setStartDate,
  [Types.SET_END_DATE]: setEndDate,
  [Types.SET_PAYMENT_METHODS]: setPaymentMethods,
  [Types.SET_DELIVERY_TYPES]: setDeliveryTypes,
  [Types.SET_IS_RDU]: setIsRDUTypes,
  [Types.SET_PLATFORM_TYPES]: setPlatformTypes,
  [Types.SET_TIME_TYPES]: setTimeTypes,
  [Types.SET_CONFIRMATION_CODE]: setConfirmationCode,
  [Types.SET_ORDER_STATUS]: setOrderStatus,
  [Types.SET_CITY_ID]: setCityId,
  [Types.SET_RESTAURANT_ID]: setRestaurantId,
};

export default createReducer(INITIAL_STATE, HANDLERS);
