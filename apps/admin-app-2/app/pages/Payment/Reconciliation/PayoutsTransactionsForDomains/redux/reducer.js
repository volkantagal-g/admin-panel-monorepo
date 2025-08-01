import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { INIT_FILTERS } from '../constants';

export const INITIAL_STATE = {
  payoutDetailedReports: {
    isPending: false,
    data: [],
    error: null,
  },
  domainTab: { domain: 'Food' },
  pagination: {
    pageNumber: INIT_FILTERS.pageNumber,
    pageSize: INIT_FILTERS.pageSize,
  },
  filters: { ...INIT_FILTERS },
  exportCsv: {
    data: null,
    isPending: false,
    error: [],
  },
};

const domainTabChange = (state = INITIAL_STATE, { domain }) => ({
  ...state,
  domainTab: { domain },
});

const submitFilters = (state = INITIAL_STATE, { filters }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      ...filters,
    },
  };
};

const payoutDetailedReportsRequest = (state = INITIAL_STATE) => ({
  ...state,
  payoutDetailedReports: {
    ...state.payoutDetailedReports,
    isPending: true,
    data: [],
    error: null,
  },
});

const payoutDetailedReportsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  payoutDetailedReports: {
    ...state.payoutDetailedReports,
    isPending: false,
    data,
    error: null,
  },
});

const payoutDetailedReportsFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  payoutDetailedReports: {
    ...state.payoutDetailedReports,
    isPending: false,
    error,
  },
});

const setPagination = (state = INITIAL_STATE, { pageNumber, pageSize }) => {
  return {
    ...state,
    pagination: {
      pageNumber,
      pageSize,
    },
  };
};

export const exportCsvRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    exportCsv: {
      ...state.exportCsv,
      isPending: true,
    },
  };
};

export const exportCsvSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    exportCsv: {
      ...state.exportCsv,
      isPending: false,
      data,
    },
  };
};

export const exportCsvFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    exportCsv: {
      ...state.exportCsv,
      isPending: false,
      error,
    },
  };
};

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_PAYOUT_DETAILED_REPORTS_REQUEST]: payoutDetailedReportsRequest,
  [Types.GET_PAYOUT_DETAILED_REPORTS_SUCCESS]: payoutDetailedReportsSuccess,
  [Types.GET_PAYOUT_DETAILED_REPORTS_FAILURE]: payoutDetailedReportsFailure,
  [Types.EXPORT_CSV_REQUEST]: exportCsvRequest,
  [Types.EXPORT_CSV_SUCCESS]: exportCsvSuccess,
  [Types.EXPORT_CSV_FAILURE]: exportCsvFailure,

  [Types.HANDLE_DOMAIN_TAB]: domainTabChange,
  [Types.SUBMIT_FILTERS]: submitFilters,
  [Types.SET_PAGINATION]: setPagination,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
