import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createCustomerSatisfactionRequest: {
    isPending: false,
    data: null,
  },
  filterProducts: {
    isPending: false,
    data: [],
    total: 0,
  },
};
const resetCreateRequest = () => ({ ...INITIAL_STATE });
const createCustomerSatisfactionRequestRequest = (state = INITIAL_STATE) => ({
  ...state,
  createCustomerSatisfactionRequest: {
    ...state.createCustomerSatisfactionRequest,
    isPending: true,
    data: null,
    error: null,
  },
});

const createCustomerSatisfactionRequestSuccess = (
  state = INITIAL_STATE,
  { data },
) => ({
  ...state,
  createCustomerSatisfactionRequest: {
    ...state.createCustomerSatisfactionRequest,
    isPending: false,
    data,
    error: null,
  },
});

const createCustomerSatisfactionRequestFailure = (
  state = INITIAL_STATE,
  error,
) => ({
  ...state,
  createCustomerSatisfactionRequest: {
    ...state.createCustomerSatisfactionRequest,
    isPending: false,
    data: null,
    error,
  },
});
const filterProductsRequest = (state = INITIAL_STATE) => ({
  ...state,
  filterProducts: {
    ...state.filterProducts,
    isPending: true,
    total: 0,
    error: null,
  },
});

const filterProductsSuccess = (state = INITIAL_STATE, { data, total }) => ({
  ...state,
  filterProducts: {
    ...state.filterProducts,
    isPending: false,
    data,
    total,
    error: null,
  },
});

const filterProductsFailure = (state = INITIAL_STATE, error) => ({
  ...state,
  filterProducts: {
    ...state.filterProducts,
    isPending: false,
    error,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.CREATE_CUSTOMER_SATISFACTION_REQUEST_REQUEST]:
    createCustomerSatisfactionRequestRequest,
  [Types.CREATE_CUSTOMER_SATISFACTION_REQUEST_SUCCESS]:
    createCustomerSatisfactionRequestSuccess,
  [Types.CREATE_CUSTOMER_SATISFACTION_REQUEST_FAILURE]:
    createCustomerSatisfactionRequestFailure,
  [Types.FILTER_PRODUCTS_REQUEST]: filterProductsRequest,
  [Types.FILTER_PRODUCTS_SUCCESS]: filterProductsSuccess,
  [Types.FILTER_PRODUCTS_FAILURE]: filterProductsFailure,
  [Types.RESET_CREATE_REQUEST]: resetCreateRequest,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
