import { createReducer } from 'reduxsauce';

import { Types, defaultRowsPerPage } from './actions';

export const INITIAL_FILTERS = {
  domainType: null,
  cities: [],
  warehouses: [],
  promos: [],
  paymentMethods: [],
  sortOptions: {},
  slottedState: null,
  orderStatuses: [],
};

export const INITIAL_PAGINATION = { currentPage: 1, rowsPerPage: defaultRowsPerPage };

const generateCustomInitialState = () => ({
  activeOrdersForGrowthData: {
    data: {
      orders: [],
      count: 0,
    },
    isPending: false,
    error: null,
  },
  filters: {
    domainType: null,
    cities: INITIAL_FILTERS.cities,
    warehouses: INITIAL_FILTERS.warehouses,
    slottedState: INITIAL_FILTERS.slottedState,
    orderStatuses: INITIAL_FILTERS.orderStatuses,
    promos: INITIAL_FILTERS.promos,
    paymentMethods: INITIAL_FILTERS.paymentMethods,
    pagination: { ...INITIAL_PAGINATION },
    integrationTypes: [],
    excludedIntegrationTypes: [],
  },
  activePromoData: {
    data: [],
    isPending: false,
    error: null,
  },
  lastSuccessfulFilters: { filters: { ...INITIAL_FILTERS } },
});

export const INITIAL_STATE = generateCustomInitialState();

const getActiveOrdersForGrowthRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    activeOrdersForGrowthData: {
      ...state.activeOrdersForGrowthData,
      isPending: true,
    },
  };
};

const getActiveOrdersForGrowthSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    activeOrdersForGrowthData: {
      ...state.activeOrdersForGrowthData,
      isPending: false,
      data,
    },
  };
};

const getActiveOrdersForGrowthFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    activeOrdersForGrowthData: {
      ...state.activeOrdersForGrowthData,
      isPending: false,
      error,
    },
  };
};

export const getPromoRequest = state => {
  return {
    ...state,
    activePromoData: {
      ...INITIAL_STATE.activePromoData,
      isPending: true,
    },
  };
};

export const getPromoSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    activePromoData: {
      ...INITIAL_STATE.activePromoData,
      data,
      isPending: false,
    },
  };
};

export const getPromoFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    activePromoData: {
      ...INITIAL_STATE.activePromoData,
      isPending: false,
      error,
    },
  };
};

const setSelectedDomainType = (state = INITIAL_STATE, { domainType }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      domainType,
    },
  };
};

const setSelectedCities = (state = INITIAL_STATE, { cities }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      cities,
    },
  };
};

const setSelectedWarehouses = (state = INITIAL_STATE, { warehouses }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      warehouses,
    },
  };
};

const setSlottedState = (state = INITIAL_STATE, { slottedState }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      slottedState,
    },
  };
};

const setOrderStatuses = (state = INITIAL_STATE, { orderStatuses }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      orderStatuses,
    },
  };
};

const setSelectedPromos = (state = INITIAL_STATE, { promos }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      promos,
    },
  };
};

const setSelectedPaymentMethods = (state = INITIAL_STATE, { paymentMethods }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      paymentMethods,
    },
  };
};

const setPagination = (state = INITIAL_STATE, { currentPage, rowsPerPage }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      pagination: { currentPage, rowsPerPage },
    },
  };
};

const setIntegrationTypes = (state, { integrationTypes }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      integrationTypes,
    },
  };
};

const setSortOptions = (state, { sortOptions }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      sortOptions,
    },
  };
};

const setExcludedIntegrationTypes = (state, { excludedIntegrationTypes }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      excludedIntegrationTypes,
    },
  };
};

export const initAndDestroyPage = () => {
  return generateCustomInitialState();
};

export const HANDLERS = {
  [Types.GET_ACTIVE_ORDERS_FOR_GROWTH_REQUEST]: getActiveOrdersForGrowthRequest,
  [Types.GET_ACTIVE_ORDERS_FOR_GROWTH_SUCCESS]: getActiveOrdersForGrowthSuccess,
  [Types.GET_ACTIVE_ORDERS_FOR_GROWTH_FAILURE]: getActiveOrdersForGrowthFailure,
  [Types.GET_PROMO_REQUEST]: getPromoRequest,
  [Types.GET_PROMO_SUCCESS]: getPromoSuccess,
  [Types.GET_PROMO_FAILURE]: getPromoFailure,
  [Types.SET_SELECTED_DOMAIN_TYPE]: setSelectedDomainType,
  [Types.SET_SELECTED_CITIES]: setSelectedCities,
  [Types.SET_SELECTED_WAREHOUSES]: setSelectedWarehouses,
  [Types.SET_SLOTTED_STATE]: setSlottedState,
  [Types.SET_ORDER_STATUSES]: setOrderStatuses,
  [Types.SET_SELECTED_PROMOS]: setSelectedPromos,
  [Types.SET_SELECTED_PAYMENT_METHODS]: setSelectedPaymentMethods,
  [Types.SET_PAGINATION]: setPagination,
  [Types.SET_INTEGRATION_TYPES]: setIntegrationTypes,
  [Types.SET_SORT_OPTIONS]: setSortOptions,
  [Types.SET_EXCLUDED_INTEGRATION_TYPES]: setExcludedIntegrationTypes,
  [Types.INIT_PAGE]: initAndDestroyPage,
  [Types.DESTROY_PAGE]: initAndDestroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
