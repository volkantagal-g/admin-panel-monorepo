import { createReducer } from 'reduxsauce';
import moment from 'moment';

import { Types } from './actions';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '../constants';

export type State = {
  logs: any;
  filters: any;
  pagination: any;
};

export const INITIAL_STATE = {
  logs: {
    data: [],
    isPending: false,
    isExportPending: false,
  },
  filters: {
    dateRange: [moment().subtract(7, 'days').startOf('day'), moment().endOf('day')],
    showIntegrityLogs: true,
  },
  pagination: { currentPage: DEFAULT_PAGE, rowsPerPage: DEFAULT_PAGE_SIZE },
};

function filterEmployeeLogsRequest(state: State) {
  return {
    ...state,
    logs: {
      ...state.logs,
      isPending: true,
    },
  };
}

function filterEmployeeLogsSuccess(state: State, { data }: { data: any; }) {
  return {
    ...state,
    logs: {
      ...state.logs,
      data,
      isPending: false,
    },
  };
}

function filterEmployeeLogsFailure(state: State) {
  return {
    ...state,
    logs: {
      ...state.logs,
      isPending: false,
    },
  };
}

function exportLogsRequest(state: State) {
  return {
    ...state,
    logs: {
      ...state.logs,
      isExportPending: true,
    },
  };
}

function exportLogsSuccess(state: State) {
  return {
    ...state,
    logs: {
      ...state.logs,
      isExportPending: false,
    },
  };
}

function exportLogsFailure(state: State) {
  return {
    ...state,
    logs: {
      ...state.logs,
      isExportPending: false,
    },
  };
}

function setFilters(state: State, { filterData }: { filterData: any; }) {
  return {
    ...state,
    filters: {
      ...state.filters,
      ...filterData,
    },
  };
}

function setPagination(state: State, { paginationData }: { paginationData: any; }) {
  return {
    ...state,
    pagination: {
      ...state.pagination,
      ...paginationData,
    },
  };
}

function destroyPage() {
  return { ...INITIAL_STATE };
}

export const HANDLERS = {
  [Types.FILTER_EMPLOYEE_LOGS_REQUEST]: filterEmployeeLogsRequest,
  [Types.FILTER_EMPLOYEE_LOGS_SUCCESS]: filterEmployeeLogsSuccess,
  [Types.FILTER_EMPLOYEE_LOGS_FAILURE]: filterEmployeeLogsFailure,

  [Types.SET_FILTERS]: setFilters,
  [Types.SET_PAGINATION]: setPagination,

  [Types.EXPORT_LOGS_REQUEST]: exportLogsRequest,
  [Types.EXPORT_LOGS_SUCCESS]: exportLogsSuccess,
  [Types.EXPORT_LOGS_FAILURE]: exportLogsFailure,

  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
