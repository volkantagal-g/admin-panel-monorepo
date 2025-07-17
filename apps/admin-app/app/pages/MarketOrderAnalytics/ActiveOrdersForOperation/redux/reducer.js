import { createReducer } from 'reduxsauce';

import { defaultRowsPerPage, Types } from './actions';

const generateCustomInitialState = () => ({
  activeOrdersData: {
    data: {
      orders: [],
      count: 0,
      totalKuzeydenCarboyCount: 0,
      courierOrderAssigmentStats: {},
    },
    isPending: false,
    error: null,
  },
  getActiveOrderStats: {
    data: {},
    isPending: false,
    error: null,
  },
  fieldManagersData: {
    data: [],
    isPending: false,
    error: null,
  },
  courierData: {
    data: [],
    isPending: false,
    error: null,
  },
  filters: {
    // Initial domain is null, it will be set after fetching available domain types
    domainType: null,
    city: null,
    fieldManagers: [],
    courierId: null,
    warehouses: [],
    isSlottedDelivery: null,
    orderStatus: [],
    orderStatusMoreThan: null,
    pagination: { currentPage: 1, rowsPerPage: defaultRowsPerPage },
    sortOptions: {},
    integrationTypes: [],
    excludedIntegrationTypes: [],
  },
});

export const INITIAL_STATE = generateCustomInitialState();

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

const getActiveOrdersRequest = state => {
  return {
    ...state,
    activeOrdersData: {
      ...state.activeOrdersData,
      isPending: true,
    },
  };
};

const getActiveOrdersSuccess = (state, { data }) => {
  return {
    ...state,
    activeOrdersData: {
      ...state.activeOrdersData,
      isPending: false,
      data,
    },
  };
};

const getActiveOrdersFailure = (state, { error }) => {
  return {
    ...state,
    activeOrdersData: {
      ...state.activeOrdersData,
      isPending: false,
      error,
    },
  };
};

const getActiveOrderStatsRequest = state => {
  return {
    ...state,
    getActiveOrderStats: {
      ...state.getActiveOrderStats,
      isPending: true,
    },
  };
};

const getActiveOrderStatsSuccess = (state, { data }) => {
  return {
    ...state,
    getActiveOrderStats: {
      ...state.getActiveOrderStats,
      isPending: false,
      data,
    },
  };
};

const getActiveOrderStatsFailure = (state, { error }) => {
  return {
    ...state,
    getActiveOrderStats: {
      ...state.getActiveOrderStats,
      isPending: false,
      error,
    },
  };
};

const getFieldManagersRequest = state => {
  return {
    ...state,
    fieldManagersData: {
      ...state.fieldManagersData,
      isPending: true,
    },
  };
};

const getFieldManagersSuccess = (state, { data }) => {
  return {
    ...state,
    fieldManagersData: {
      ...state.fieldManagersData,
      isPending: false,
      data,
    },
  };
};

const getFieldManagersFailure = (state, { error }) => {
  return {
    ...state,
    fieldManagersData: {
      ...state.fieldManagersData,
      isPending: false,
      error,
    },
  };
};

const resetFieldManagers = state => {
  return {
    ...state,
    fieldManagersData: {
      data: [],
      isPending: false,
      error: null,
    },
  };
};

const courierSearchRequest = state => ({
  ...state,
  courierData: {
    ...state.courierData,
    isPending: true,
    data: [],
  },
});
const courierSearchSuccess = (state, { data }) => ({
  ...state,
  courierData: {
    ...state.courierData,
    isPending: false,
    data,
  },
});
const courierSearchFailure = state => ({
  ...state,
  courierData: {
    ...state.courierData,
    isPending: false,
  },
});

const setCourierId = (state, { courierId }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      courierId,
    },
  };
};

const setDomainType = (state, { domainType }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      domainType,
    },
  };
};

const setCity = (state, { city }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      city,
    },
  };
};

const setFieldManagers = (state, { fieldManagers }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      fieldManagers,
    },
  };
};

const setWarehouses = (state, { warehouses }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      warehouses,
    },
  };
};

const setIsSlottedDelivery = (state, { isSlottedDelivery }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      isSlottedDelivery,
    },
  };
};

const setOrderStatus = (state, { orderStatus }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      orderStatus,
    },
  };
};

const setOrderStatusMoreThan = (state, { orderStatusMoreThan }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      orderStatusMoreThan,
    },
  };
};

const setPagination = (state, { currentPage, rowsPerPage }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      pagination: { currentPage, rowsPerPage },
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

export const initAndDestroyPage = () => {
  return generateCustomInitialState();
};

export const HANDLERS = {
  [Types.GET_ACTIVE_ORDERS_REQUEST]: getActiveOrdersRequest,
  [Types.GET_ACTIVE_ORDERS_SUCCESS]: getActiveOrdersSuccess,
  [Types.GET_ACTIVE_ORDERS_FAILURE]: getActiveOrdersFailure,
  [Types.GET_ACTIVE_ORDER_STATS_REQUEST]: getActiveOrderStatsRequest,
  [Types.GET_ACTIVE_ORDER_STATS_SUCCESS]: getActiveOrderStatsSuccess,
  [Types.GET_ACTIVE_ORDER_STATS_FAILURE]: getActiveOrderStatsFailure,
  [Types.GET_FIELD_MANAGERS_REQUEST]: getFieldManagersRequest,
  [Types.GET_FIELD_MANAGERS_SUCCESS]: getFieldManagersSuccess,
  [Types.GET_FIELD_MANAGERS_FAILURE]: getFieldManagersFailure,
  [Types.RESET_FIELD_MANAGERS]: resetFieldManagers,
  [Types.GET_COURIER_SEARCH_REQUEST]: courierSearchRequest,
  [Types.GET_COURIER_SEARCH_SUCCESS]: courierSearchSuccess,
  [Types.GET_COURIER_SEARCH_FAILURE]: courierSearchFailure,
  [Types.SET_COURIER_ID]: setCourierId,
  [Types.SET_DOMAIN_TYPE]: setDomainType,
  [Types.SET_CITY]: setCity,
  [Types.SET_FIELD_MANAGERS]: setFieldManagers,
  [Types.SET_WAREHOUSES]: setWarehouses,
  [Types.SET_IS_SLOTTED_DELIVERY]: setIsSlottedDelivery,
  [Types.SET_ORDER_STATUS]: setOrderStatus,
  [Types.SET_ORDER_STATUS_MORE_THAN]: setOrderStatusMoreThan,
  [Types.SET_PAGINATION]: setPagination,
  [Types.SET_SORT_OPTIONS]: setSortOptions,
  [Types.SET_INTEGRATION_TYPES]: setIntegrationTypes,
  [Types.SET_EXCLUDED_INTEGRATION_TYPES]: setExcludedIntegrationTypes,
  [Types.INIT_PAGE]: initAndDestroyPage,
  [Types.DESTROY_PAGE]: initAndDestroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
