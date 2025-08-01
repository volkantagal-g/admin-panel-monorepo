import { createReducer } from 'reduxsauce';

import { INITIAL_PAGINATION, Types } from './actions';

const INITIAL_FILTERS = {
  domainType: null,
  city: null,
  pagination: INITIAL_PAGINATION,
  warehouse: null,
  courierId: null,
  integrationTypes: [],
  excludedIntegrationTypes: [],
  slottedState: null,
  orderStatuses: [],
};

const generateCustomInitialState = () => ({
  activeOrdersForCustomerServices: {
    isPending: false,
    data: {
      orders: [],
      count: 0,
    },
  },
  courierData: {
    isPending: false,
    data: [],
  },
  filters: INITIAL_FILTERS,
});

export const INITIAL_STATE = generateCustomInitialState();

const activeOrdersForCustomerServicesRequest = (state = INITIAL_STATE) => ({
  ...state,
  activeOrdersForCustomerServices: {
    ...state.activeOrdersForCustomerServices,
    isPending: true,
  },
});

const activeOrdersForCustomerServicesSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  activeOrdersForCustomerServices: {
    ...state.activeOrdersForCustomerServices,
    isPending: false,
    data,
  },
});

const activeOrdersForCustomerServicesFailure = (state = INITIAL_STATE) => ({
  ...state,
  activeOrdersForCustomerServices: {
    ...state.activeOrdersForCustomerServices,
    isPending: false,
  },
});

const setDomainType = (state = INITIAL_STATE, { domainType }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      domainType,
    },
  };
};

const setCity = (state = INITIAL_STATE, { city }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      city,
    },
  };
};

const setWarehouse = (state = INITIAL_STATE, { warehouse }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      warehouse,
    },
  };
};

const setCourierId = (state = INITIAL_STATE, { courierId }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      courierId,
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

const setPagination = (state = INITIAL_STATE, { currentPage, rowsPerPage }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      pagination: { currentPage, rowsPerPage },
    },
  };
};

const courierSearchRequest = (state = INITIAL_STATE) => ({
  ...state,
  courierData: {
    ...state.courierData,
    isPending: true,
    data: [],
  },
});

const courierSearchSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  courierData: {
    ...state.courierData,
    isPending: false,
    data,
  },
});

const courierSearchFailure = (state = INITIAL_STATE) => ({
  ...state,
  courierData: {
    ...state.courierData,
    isPending: false,
  },
});

const setIntegrationTypes = (state, { integrationTypes }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      integrationTypes,
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
  [Types.GET_ACTIVE_ORDERS_FOR_CUSTOMER_SERVICES_REQUEST]: activeOrdersForCustomerServicesRequest,
  [Types.GET_ACTIVE_ORDERS_FOR_CUSTOMER_SERVICES_SUCCESS]: activeOrdersForCustomerServicesSuccess,
  [Types.GET_ACTIVE_ORDERS_FOR_CUSTOMER_SERVICES_FAILURE]: activeOrdersForCustomerServicesFailure,
  [Types.GET_COURIER_SEARCH_REQUEST]: courierSearchRequest,
  [Types.GET_COURIER_SEARCH_SUCCESS]: courierSearchSuccess,
  [Types.GET_COURIER_SEARCH_FAILURE]: courierSearchFailure,
  [Types.SET_DOMAIN_TYPE]: setDomainType,
  [Types.SET_CITY]: setCity,
  [Types.SET_WAREHOUSE]: setWarehouse,
  [Types.SET_SLOTTED_STATE]: setSlottedState,
  [Types.SET_ORDER_STATUSES]: setOrderStatuses,
  [Types.SET_PAGINATION]: setPagination,
  [Types.SET_COURIER_ID]: setCourierId,
  [Types.SET_INTEGRATION_TYPES]: setIntegrationTypes,
  [Types.SET_EXCLUDED_INTEGRATION_TYPES]: setExcludedIntegrationTypes,
  [Types.INIT_PAGE]: initAndDestroyPage,
  [Types.DESTROY_PAGE]: initAndDestroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
