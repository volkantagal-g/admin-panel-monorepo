import { createReducer } from 'reduxsauce';

import { defaultRowsPerPage, defaultDomainType, Types } from './actions';

export const INITIAL_STATE = {
  getFraudSuspicionOrders: {
    data: [],
    isPending: false,
    error: null,
    count: 0,
  },
  filters: {
    domainType: defaultDomainType,
    warehouses: [],
    pagination: { currentPage: 0, rowsPerPage: defaultRowsPerPage },
  },
};

const getFraudSuspicionOrdersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getFraudSuspicionOrders: {
      ...state.getFraudSuspicionOrders,
      isPending: true,
      error: false,
    },
  };
};

const getFraudSuspicionOrdersSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getFraudSuspicionOrders: {
      ...state.getFraudSuspicionOrders,
      isPending: false,
      data: data?.orders || [],
      count: data?.totalCount,
      error: false,
    },
  };
};

const getFraudSuspicionOrdersFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getFraudSuspicionOrders: {
      ...state.getFraudSuspicionOrders,
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

const setPagination = (state = INITIAL_STATE, { currentPage, rowsPerPage }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      pagination: { currentPage, rowsPerPage },
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
  [Types.GET_FRAUD_SUSPICION_ORDERS_REQUEST]: getFraudSuspicionOrdersRequest,
  [Types.GET_FRAUD_SUSPICION_ORDERS_SUCCESS]: getFraudSuspicionOrdersSuccess,
  [Types.GET_FRAUD_SUSPICION_ORDERS_FAILURE]: getFraudSuspicionOrdersFailure,
  [Types.SET_SELECTED_DOMAIN_TYPE]: setSelectedDomainType,
  [Types.SET_PAGINATION]: setPagination,
  [Types.INIT_PAGE]: initPage,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
