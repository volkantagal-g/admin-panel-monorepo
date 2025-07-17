import { createReducer } from 'reduxsauce';

import { Types } from './actions';

const createCommonState = filters => ({
  isPending: false,
  data: [],
  count: 0,
  filters: {
    courierId: undefined,
    ...filters,
  },
  pagination: {
    currentPage: 1,
    rowsPerPage: 10,
  },
});

export const INITIAL_STATE = {
  courierCrisesLogs: createCommonState({ cardNumber: undefined }),
  courierCrisesLogsExport: {
    isPending: undefined,
    filters: { cardNumber: undefined, courierId: undefined },
  },
};

const destroyContainer = () => ({ ...INITIAL_STATE });

const courierCrisesLogsRequest = (state = INITIAL_STATE) => ({
  ...state,
  courierCrisesLogs: {
    ...state.courierCrisesLogs,
    isPending: true,
  },
});

const courierCrisesLogsSuccess = (state = INITIAL_STATE, { data, count }) => ({
  ...state,
  courierCrisesLogs: {
    ...state.courierCrisesLogs,
    isPending: false,
    count,
    data,
    error: undefined,
  },
});

const courierCrisesLogsFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  courierCrisesLogs: {
    ...state.courierCrisesLogs,
    isPending: false,
    error,
  },
});

const courierCrisesLogsExportRequest = (state = INITIAL_STATE, { filters }) => ({
  ...state,
  courierCrisesLogsExport: {
    filters,
    isPending: true,
    data: undefined,
    error: undefined,
  },
});

const courierCrisesLogsExportSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  courierCrisesLogsExport: {
    ...state.courierCrisesLogsExport,
    isPending: false,
    data,
    error: undefined,
  },
});

const courierCrisesLogsExportFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  courierCrisesLogsExport: {
    filters: undefined,
    isPending: false,
    data: undefined,
    error,
  },
});

const changeCourierCrisesLogsFilters = (state = INITIAL_STATE, filters) => ({
  ...state,
  courierCrisesLogs: {
    ...state.courierCrisesLogs,
    filters,
    pagination: { ...INITIAL_STATE.courierCrisesLogs.pagination },
  },
});

const changeCourierCrisesLogsPagination = (
  state = INITIAL_STATE,
  pagination,
) => ({
  ...state,
  courierCrisesLogs: {
    ...state.courierCrisesLogs,
    pagination,
  },
});

export const HANDLERS = {
  [Types.DESTROY_CONTAINER]: destroyContainer,

  [Types.GET_COURIER_CRISES_LOGS_REQUEST]: courierCrisesLogsRequest,
  [Types.GET_COURIER_CRISES_LOGS_SUCCESS]: courierCrisesLogsSuccess,
  [Types.GET_COURIER_CRISES_LOGS_FAILURE]: courierCrisesLogsFailure,
  [Types.CHANGE_COURIER_CRISES_LOGS_FILTERS]: changeCourierCrisesLogsFilters,
  [Types.CHANGE_COURIER_CRISES_LOGS_PAGINATION]: changeCourierCrisesLogsPagination,

  [Types.EXPORT_COURIER_CRISES_LOGS_REQUEST]: courierCrisesLogsExportRequest,
  [Types.EXPORT_COURIER_CRISES_LOGS_SUCCESS]: courierCrisesLogsExportSuccess,
  [Types.EXPORT_COURIER_CRISES_LOGS_FAILURE]: courierCrisesLogsExportFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
