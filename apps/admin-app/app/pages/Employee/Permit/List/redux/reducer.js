import moment from 'moment';
import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  filters: {
    dateRange: [moment(), moment()],
    status: undefined,
    permitType: undefined,
    departments: undefined,
    supervisor: undefined,
    locationId: undefined,
    office: undefined,
    businessCountry: undefined,
    payrollCountry: undefined,
    employee: undefined,
    reason: undefined,
  },
  pagination: {
    nextPageCursor: undefined,
    previousPageCursor: undefined,
    limit: 10,
  },
  filteredPermits: {
    isPending: false,
    data: [],
  },
  exportedPermitsExcelDownloadURL: { isPending: false },
  actionButton: {
    isSucceeded: false,
    isPending: false,
  },
};

const filteredPermitsRequest = state => ({
  ...state,
  filteredPermits: {
    ...state.filteredPermits,
    isPending: true,
    data: [],
  },
});

const filteredPermitsSuccess = (state, { data }) => ({
  ...state,
  filteredPermits: {
    ...state.filteredPermits,
    isPending: false,
    data,
  },
});

const filteredPermitsFailure = state => ({
  ...state,
  filteredPermits: {
    ...state.filteredPermits,
    isPending: false,
  },
});

export const setFilters = (state, { filters }) => ({
  ...state,
  filters,
});

export const setPagination = (state, { pagination }) => ({
  ...state,
  pagination: {
    ...state.pagination,
    ...pagination,
  },
});

export const getExportedPermitsExcelDownloadURLRequest = state => ({
  ...state,
  exportedPermitsExcelDownloadURL: {
    ...state.exportedPermitsExcelDownloadURL,
    isPending: true,
  },
});

export const getExportedPermitsExcelDownloadURLSuccess = state => ({
  ...state,
  exportedPermitsExcelDownloadURL: {
    ...state.exportedPermitsExcelDownloadURL,
    isPending: false,
  },
});

export const getExportedPermitsExcelDownloadURLFailure = state => ({
  ...state,
  exportedPermitsExcelDownloadURL: {
    ...state.exportedPermitsExcelDownloadURL,
    isPending: false,
  },
});

export const resetFilters = state => ({
  ...state,
  filters: { ...INITIAL_STATE.filters },
});

export const actionButtonRequest = state => {
  return {
    ...state,
    actionButton: {
      ...state.actionButton,
      isPending: true,
    },
  };
};

export const actionButtonReset = state => {
  return {
    ...state,
    actionButton: INITIAL_STATE.actionButton,
  };
};

export const actionButtonSuccess = state => {
  return {
    ...state,
    actionButton: {
      ...state.actionButton,
      isSucceeded: true,
      isPending: false,
    },
  };
};

export const actionButtonFailure = state => {
  return {
    ...state,
    actionButton: {
      ...state.actionButton,
      isPending: false,
    },
  };
};

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.SET_FILTERS]: setFilters,
  [Types.RESET_FILTERS]: resetFilters,
  [Types.SET_PAGINATION]: setPagination,
  [Types.GET_FILTERED_PERMITS_REQUEST]: filteredPermitsRequest,
  [Types.GET_FILTERED_PERMITS_SUCCESS]: filteredPermitsSuccess,
  [Types.GET_FILTERED_PERMITS_FAILURE]: filteredPermitsFailure,
  [Types.GET_EXPORTED_PERMITS_EXCEL_DOWNLOAD_URL_REQUEST]: getExportedPermitsExcelDownloadURLRequest,
  [Types.GET_EXPORTED_PERMITS_EXCEL_DOWNLOAD_URL_SUCCESS]: getExportedPermitsExcelDownloadURLSuccess,
  [Types.GET_EXPORTED_PERMITS_EXCEL_DOWNLOAD_URL_FAILURE]: getExportedPermitsExcelDownloadURLFailure,
  [Types.APPROVE_PERMIT_REQUEST]: actionButtonRequest,
  [Types.REJECT_PERMIT_REQUEST]: actionButtonRequest,
  [Types.CANCEL_PERMIT_REQUEST]: actionButtonRequest,
  [Types.CANCEL_REQUESTED_PERMIT_REQUEST]: actionButtonRequest,
  [Types.ACTION_BUTTON_SUCCESS]: actionButtonSuccess,
  [Types.ACTION_BUTTON_FAILURE]: actionButtonFailure,
  [Types.ACTION_BUTTON_RESET]: actionButtonReset,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
