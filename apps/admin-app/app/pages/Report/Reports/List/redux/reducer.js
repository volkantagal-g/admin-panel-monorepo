import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { getInitialDateRange } from '../utils';

export const INITIAL_STATE = {
  getMyReportTypes: {
    data: [],
    isPending: false,
    error: null,
  },
  getMyReports: {
    data: [],
    nextPageToken: '',
    prevPageToken: '',
    isPending: false,
    error: null,
  },
  filters: {
    dateRange: getInitialDateRange(),
    isOnlyMyReports: true,
  },
};

const getMyReportTypesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMyReportTypes: {
      ...state.getMyReportTypes,
      isPending: true,
    },
  };
};

const setFilters = (state = INITIAL_STATE, { filters }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      ...filters,
    },
  };
};

const getMyReportTypesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMyReportTypes: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const getMyReportTypesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMyReportTypes: {
      ...state.getMyReportTypes,
      error,
      isPending: false,
    },
  };
};

const getMyReportsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMyReports: {
      ...state.getMyReports,
      isPending: true,
    },
  };
};

const getMyReportsSuccess = (state = INITIAL_STATE, { data, nextPageToken, prevPageToken }) => {
  return {
    ...state,
    getMyReports: {
      data,
      nextPageToken,
      prevPageToken,
      isPending: false,
      error: null,
    },
  };
};

const getMyReportsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMyReports: {
      data: [],
      error,
      isPending: false,
    },
  };
};

const initPage = () => {
  return { ...INITIAL_STATE };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.INIT_PAGE]: initPage,
  [Types.DESTROY_PAGE]: destroy,
  [Types.GET_MY_REPORT_TYPES_REQUEST]: getMyReportTypesRequest,
  [Types.GET_MY_REPORT_TYPES_SUCCESS]: getMyReportTypesSuccess,
  [Types.GET_MY_REPORT_TYPES_FAILURE]: getMyReportTypesFailure,
  [Types.GET_MY_REPORTS_REQUEST]: getMyReportsRequest,
  [Types.GET_MY_REPORTS_SUCCESS]: getMyReportsSuccess,
  [Types.GET_MY_REPORTS_FAILURE]: getMyReportsFailure,
  [Types.SET_FILTERS]: setFilters,
};

export default createReducer(INITIAL_STATE, HANDLERS);
