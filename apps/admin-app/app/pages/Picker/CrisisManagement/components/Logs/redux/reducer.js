import { createReducer } from 'reduxsauce';

import { Types } from './actions';

const createCommonState = filters => ({
  isPending: false,
  data: [],
  count: 0,
  filters: {
    pickerId: undefined,
    ...filters,
  },
  pagination: {
    currentPage: 1,
    rowsPerPage: 10,
  },
});

export const INITIAL_STATE = {
  pickerCrisesLogs: createCommonState({ cardNumber: undefined }),
  pickerCrisesLogsExport: {
    isPending: undefined,
    filters: { cardNumber: undefined, pickerId: undefined },
  },
};

const destroyContainer = () => ({ ...INITIAL_STATE });

const pickerCrisesLogsRequest = (state = INITIAL_STATE) => ({
  ...state,
  pickerCrisesLogs: {
    ...state.pickerCrisesLogs,
    isPending: true,
  },
});

const pickerCrisesLogsSuccess = (state = INITIAL_STATE, { data, count }) => ({
  ...state,
  pickerCrisesLogs: {
    ...state.pickerCrisesLogs,
    isPending: false,
    count,
    data,
    error: undefined,
  },
});

const pickerCrisesLogsFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  pickerCrisesLogs: {
    ...state.pickerCrisesLogs,
    isPending: false,
    error,
  },
});

const pickerCrisesLogsExportRequest = (state = INITIAL_STATE, { filters }) => ({
  ...state,
  pickerCrisesLogsExport: {
    filters,
    isPending: true,
    data: undefined,
    error: undefined,
  },
});

const pickerCrisesLogsExportSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  pickerCrisesLogsExport: {
    ...state.pickerCrisesLogsExport,
    isPending: false,
    data,
    error: undefined,
  },
});

const pickerCrisesLogsExportFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  pickerCrisesLogsExport: {
    filters: undefined,
    isPending: false,
    data: undefined,
    error,
  },
});

const changePickerCrisesLogsFilters = (state = INITIAL_STATE, filters) => ({
  ...state,
  pickerCrisesLogs: {
    ...state.pickerCrisesLogs,
    filters,
    pagination: { ...INITIAL_STATE.pickerCrisesLogs.pagination },
  },
});

const changePickerCrisesLogsPagination = (
  state = INITIAL_STATE,
  pagination,
) => ({
  ...state,
  pickerCrisesLogs: {
    ...state.pickerCrisesLogs,
    pagination,
  },
});

export const HANDLERS = {
  [Types.DESTROY_CONTAINER]: destroyContainer,

  [Types.GET_PICKER_CRISES_LOGS_REQUEST]: pickerCrisesLogsRequest,
  [Types.GET_PICKER_CRISES_LOGS_SUCCESS]: pickerCrisesLogsSuccess,
  [Types.GET_PICKER_CRISES_LOGS_FAILURE]: pickerCrisesLogsFailure,
  [Types.CHANGE_PICKER_CRISES_LOGS_FILTERS]: changePickerCrisesLogsFilters,
  [Types.CHANGE_PICKER_CRISES_LOGS_PAGINATION]: changePickerCrisesLogsPagination,

  [Types.EXPORT_PICKER_CRISES_LOGS_REQUEST]: pickerCrisesLogsExportRequest,
  [Types.EXPORT_PICKER_CRISES_LOGS_SUCCESS]: pickerCrisesLogsExportSuccess,
  [Types.EXPORT_PICKER_CRISES_LOGS_FAILURE]: pickerCrisesLogsExportFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
