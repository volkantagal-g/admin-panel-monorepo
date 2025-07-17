import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  bulkInactivateExternalCustomerServicesAccounts: {
    isPending: false,
    data: [],
    isRequested: false,
    error: '',
  },
  bulkCreateTeleperformanceUsers: {
    isPending: false,
    data: [],
    isRequested: false,
    error: '',
  },
  bulkCreateConcentrixUsersTurkey: {
    isPending: false,
    data: [],
    isRequested: false,
    error: '',
  },
  bulkCreateAssisttUsers: {
    isPending: false,
    data: [],
    isRequested: false,
    error: '',
  },
};

const bulkInactivateExternalCustomerServicesAccountsRequest = state => ({
  ...state,
  bulkInactivateExternalCustomerServicesAccounts: {
    ...state.bulkInactivateExternalCustomerServicesAccounts,
    isPending: true,
    data: [],
    isRequested: true,
  },
});

const bulkInactivateExternalCustomerServicesAccountsSuccess = (state, { data }) => ({
  ...state,
  bulkInactivateExternalCustomerServicesAccounts: {
    ...state.bulkInactivateExternalCustomerServicesAccounts,
    isPending: false,
    data,
    error: '',
  },
});

const bulkInactivateExternalCustomerServicesAccountsFailure = (state, { error }) => ({
  ...state,
  bulkInactivateExternalCustomerServicesAccounts: {
    ...state.bulkInactivateExternalCustomerServicesAccounts,
    isPending: false,
    error,
  },
});

const bulkCreateTeleperformanceUsersRequest = state => ({
  ...state,
  bulkCreateTeleperformanceUsers: {
    ...state.bulkCreateTeleperformanceUsers,
    isPending: true,
    data: [],
    isRequested: true,
  },
});

const bulkCreateTeleperformanceUsersSuccess = (state, { data }) => ({
  ...state,
  bulkCreateTeleperformanceUsers: {
    ...state.bulkCreateTeleperformanceUsers,
    isPending: false,
    data,
    error: '',
  },
});

const bulkCreateTeleperformanceUsersFailure = (state, { error }) => ({
  ...state,
  bulkCreateTeleperformanceUsers: {
    ...state.bulkCreateTeleperformanceUsers,
    isPending: false,
    error,
  },
});

const bulkCreateConcentrixUsersTurkeyRequest = state => ({
  ...state,
  bulkCreateConcentrixUsersTurkey: {
    ...state.bulkCreateConcentrixUsersTurkey,
    isPending: true,
    data: [],
    isRequested: true,
  },
});

const bulkCreateConcentrixUsersTurkeySuccess = (state, { data }) => ({
  ...state,
  bulkCreateConcentrixUsersTurkey: {
    ...state.bulkCreateConcentrixUsersTurkey,
    isPending: false,
    data,
    error: '',
  },
});

const bulkCreateConcentrixUsersTurkeyFailure = (state, { error }) => ({
  ...state,
  bulkCreateConcentrixUsersTurkey: {
    ...state.bulkCreateConcentrixUsersTurkey,
    isPending: false,
    error,
  },
});

const bulkCreateAssisttUsersRequest = state => ({
  ...state,
  bulkCreateAssisttUsers: {
    ...state.bulkCreateAssisttUsers,
    isPending: true,
    data: [],
    isRequested: true,
  },
});

const bulkCreateAssisttUsersSuccess = (state, { data }) => ({
  ...state,
  bulkCreateAssisttUsers: {
    ...state.bulkCreateAssisttUsers,
    isPending: false,
    data,
    error: '',
  },
});

const bulkCreateAssisttUsersFailure = (state, { error }) => ({
  ...state,
  bulkCreateAssisttUsers: {
    ...state.bulkCreateAssisttUsers,
    isPending: false,
    error,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.BULK_INACTIVATE_EXTERNAL_CUSTOMER_SERVICES_ACCOUNTS_REQUEST]: bulkInactivateExternalCustomerServicesAccountsRequest,
  [Types.BULK_INACTIVATE_EXTERNAL_CUSTOMER_SERVICES_ACCOUNTS_SUCCESS]: bulkInactivateExternalCustomerServicesAccountsSuccess,
  [Types.BULK_INACTIVATE_EXTERNAL_CUSTOMER_SERVICES_ACCOUNTS_FAILURE]: bulkInactivateExternalCustomerServicesAccountsFailure,
  [Types.BULK_CREATE_TELEPERFORMANCE_USERS_REQUEST]: bulkCreateTeleperformanceUsersRequest,
  [Types.BULK_CREATE_TELEPERFORMANCE_USERS_SUCCESS]: bulkCreateTeleperformanceUsersSuccess,
  [Types.BULK_CREATE_TELEPERFORMANCE_USERS_FAILURE]: bulkCreateTeleperformanceUsersFailure,
  [Types.BULK_CREATE_CONCENTRIX_USERS_TURKEY_REQUEST]: bulkCreateConcentrixUsersTurkeyRequest,
  [Types.BULK_CREATE_CONCENTRIX_USERS_TURKEY_SUCCESS]: bulkCreateConcentrixUsersTurkeySuccess,
  [Types.BULK_CREATE_CONCENTRIX_USERS_TURKEY_FAILURE]: bulkCreateConcentrixUsersTurkeyFailure,
  [Types.BULK_CREATE_ASSISTT_USERS_REQUEST]: bulkCreateAssisttUsersRequest,
  [Types.BULK_CREATE_ASSISTT_USERS_SUCCESS]: bulkCreateAssisttUsersSuccess,
  [Types.BULK_CREATE_ASSISTT_USERS_FAILURE]: bulkCreateAssisttUsersFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
