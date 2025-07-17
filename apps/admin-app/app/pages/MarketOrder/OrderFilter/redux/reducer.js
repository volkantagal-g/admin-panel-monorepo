import { createReducer } from 'reduxsauce';

import {
  defaultRowsPerPage,
  defaultDomainType,
  Types,
  defaultDates,
} from './actions';
import { FILTER_STATUSES } from '../components/Filter/constants';

export const INITIAL_STATE = {
  getFilteredOrders: {
    data: [],
    isPending: false,
    error: null,
    count: 0,
  },
  filters: {
    domainType: defaultDomainType,
    city: null,
    status: FILTER_STATUSES.SUCCESS,
    errorcode: null,
    deviceTypes: [],
    warehouse: null,
    pagination: { currentPage: 1, rowsPerPage: defaultRowsPerPage },
    selectedDateRange: defaultDates,
    referenceId: null,
    integrationType: null,
    initialStatusForSuccessDuration: null,
    minDuration: null,
    maxDuration: null,
    isSlottedDelivery: false,
    isFresh: null,
  },
  lastUsedFilters: {},
};

const setLastUsedFilters = (state, { lastUsedFilters }) => {
  return {
    ...state,
    lastUsedFilters,
  };
};

const getFilteredOrdersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getFilteredOrders: {
      ...state.getFilteredOrders,
      isPending: true,
    },
  };
};

const getFilteredOrdersSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getFilteredOrders: {
      ...state.getFilteredOrders,
      isPending: false,
      data: data?.orders || [],
      count: data?.totalCount,
    },
  };
};

const getFilteredOrdersFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getFilteredOrders: {
      ...state.getFilteredOrders,
      isPending: false,
      error,
      data: [],
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
const setReferenceId = (state = INITIAL_STATE, { referenceId }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      referenceId,
    },
  };
};

const setSelectedCity = (state = INITIAL_STATE, { city }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      city,
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

const setSelectedDateRange = (state = INITIAL_STATE, { selectedDateRange }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      selectedDateRange,
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
const setStatus = (state = INITIAL_STATE, { status }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      status,
    },
  };
};
const setErrorCode = (state = INITIAL_STATE, { errorCode }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      errorCode,
    },
  };
};

const setDeviceTypes = (state = INITIAL_STATE, { deviceTypes }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      deviceTypes,
    },
  };
};
const setIntegrationType = (state = INITIAL_STATE, { integrationType }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      integrationType,
    },
  };
};

const setInitialStatusForSuccessDuration = (state, { status }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      initialStatusForSuccessDuration: status,
    },
  };
};

const setMinDuration = (state, { dur }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      minDuration: dur,
    },
  };
};

const setMaxDuration = (state, { dur }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      maxDuration: dur,
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

const setFreshFilter = (state, { isFresh }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      isFresh,
    },
  };
};

const initPage = (state = INITIAL_STATE, { initialDomainType }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      domainType: initialDomainType,
    },
  };
};
const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_FILTERED_ORDERS_REQUEST]: getFilteredOrdersRequest,
  [Types.GET_FILTERED_ORDERS_SUCCESS]: getFilteredOrdersSuccess,
  [Types.GET_FILTERED_ORDERS_FAILURE]: getFilteredOrdersFailure,
  [Types.SET_SELECTED_DOMAIN_TYPE]: setSelectedDomainType,
  [Types.SET_SELECTED_CITY]: setSelectedCity,
  [Types.SET_PAGINATION]: setPagination,
  [Types.SET_SELECTED_DATE_RANGE]: setSelectedDateRange,
  [Types.SET_WAREHOUSE]: setWarehouse,
  [Types.SET_ERROR_CODE]: setErrorCode,
  [Types.SET_STATUS]: setStatus,
  [Types.SET_INTEGRATION_TYPE]: setIntegrationType,
  [Types.SET_DEVICE_TYPES]: setDeviceTypes,
  [Types.SET_REFERENCE_ID]: setReferenceId,
  [Types.SET_INITIAL_STATUS_FOR_SUCCESS_DURATION]: setInitialStatusForSuccessDuration,
  [Types.SET_MIN_DURATION]: setMinDuration,
  [Types.SET_MAX_DURATION]: setMaxDuration,
  [Types.SET_LAST_USED_FILTERS]: setLastUsedFilters,
  [Types.SET_IS_SLOTTED_DELIVERY]: setIsSlottedDelivery,
  [Types.INIT_PAGE]: initPage,
  [Types.DESTROY_PAGE]: destroy,
  [Types.SET_FRESH_FILTER]: setFreshFilter,
};

export default createReducer(INITIAL_STATE, HANDLERS);
