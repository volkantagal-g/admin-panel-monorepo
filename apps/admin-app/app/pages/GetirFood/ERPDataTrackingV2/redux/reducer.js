import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { FAILED_INITIAL_FILTERS, SUCCESSFUL_INITIAL_FILTERS, TAB_ITEMS } from '../constants';

export const INITIAL_STATE = {
  activeTab: TAB_ITEMS.SUMMARY,
  failedFilters: { ...FAILED_INITIAL_FILTERS },
  successfulFilters: { ...SUCCESSFUL_INITIAL_FILTERS },
  ERPDataTrackingSummary: {
    data: [],
    isPending: false,
    error: null,
  },
  ERPDataTrackingSummaryExcelExport: {
    data: {},
    isPending: false,
    error: null,
  },
  ERPDataTrackingFailed: {
    data: {},
    isPending: false,
    error: null,
  },
  ERPDataTrackingSuccessful: {
    data: {},
    isPending: false,
    error: null,
  },
};

const setActiveTab = (state = INITIAL_STATE, { activeTab }) => {
  return {
    ...state,
    activeTab,
  };
};

export const setFailedFilters = (
  state = INITIAL_STATE,
  { dateRange, currentPage, rowsPerPage, orderTypes, traceId, orderId },
) => {
  return {
    ...state,
    failedFilters: {
      ...state.failedFilters,
      dateRange,
      currentPage,
      rowsPerPage,
      orderTypes,
      traceId,
      orderId,
    },
  };
};

export const setSuccessfulFilters = (
  state = INITIAL_STATE,
  { dateRange, currentPage, rowsPerPage, orderTypes, traceId, orderId },
) => {
  return {
    ...state,
    successfulFilters: {
      ...state.successfulFilters,
      dateRange,
      currentPage,
      rowsPerPage,
      orderTypes,
      traceId,
      orderId,
    },
  };
};

export const getERPDataTrackingSummaryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    ERPDataTrackingSummary: {
      ...state.ERPDataTrackingSummary,
      isPending: true,
    },
  };
};

export const getERPDataTrackingSummarySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    ERPDataTrackingSummary: {
      ...state.ERPDataTrackingSummary,
      data,
      isPending: false,
    },
  };
};

export const getERPDataTrackingSummaryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    ERPDataTrackingSummary: {
      ...state.ERPDataTrackingSummary,
      isPending: false,
      error,
    },
  };
};

export const getERPDataTrackingSummaryExcelExportRequest = state => {
  return {
    ...state,
    ERPDataTrackingSummaryExcelExport: {
      ...state.ERPDataTrackingSummaryExcelExport,
      isPending: true,
    },
  };
};

export const getERPDataTrackingSummaryExcelExportSuccess = (state, { data }) => {
  return {
    ...state,
    ERPDataTrackingSummaryExcelExport: {
      ...state.ERPDataTrackingSummaryExcelExport,
      isPending: false,
      data,
    },
  };
};

export const getERPDataTrackingSummaryExcelExportFailure = (state, { error }) => {
  return {
    ...state,
    ERPDataTrackingSummaryExcelExport: {
      ...state.ERPDataTrackingSummaryExcelExport,
      isPending: false,
      error,
    },
  };
};

export const getERPDataTrackingFailedRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    ERPDataTrackingFailed: {
      ...state.ERPDataTrackingFailed,
      isPending: true,
    },
  };
};

export const getERPDataTrackingFailedSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    ERPDataTrackingFailed: {
      ...state.ERPDataTrackingFailed,
      data,
      isPending: false,
    },
  };
};

export const getERPDataTrackingFailedFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    ERPDataTrackingFailed: {
      ...state.ERPDataTrackingFailed,
      isPending: false,
      error,
    },
  };
};

export const getERPDataTrackingSuccessfulRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    ERPDataTrackingSuccessful: {
      ...state.ERPDataTrackingSuccessful,
      isPending: true,
    },
  };
};

export const getERPDataTrackingSuccessfulSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    ERPDataTrackingSuccessful: {
      ...state.ERPDataTrackingSuccessful,
      data,
      isPending: false,
    },
  };
};

export const getERPDataTrackingSuccessfulFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    ERPDataTrackingSuccessful: {
      ...state.ERPDataTrackingSuccessful,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_ERP_DATA_TRACKING_SUMMARY_REQUEST]: getERPDataTrackingSummaryRequest,
  [Types.GET_ERP_DATA_TRACKING_SUMMARY_SUCCESS]: getERPDataTrackingSummarySuccess,
  [Types.GET_ERP_DATA_TRACKING_SUMMARY_FAILURE]: getERPDataTrackingSummaryFailure,

  [Types.GET_ERP_DATA_TRACKING_SUMMARY_EXCEL_EXPORT_REQUEST]: getERPDataTrackingSummaryExcelExportRequest,
  [Types.GET_ERP_DATA_TRACKING_SUMMARY_EXCEL_EXPORT_SUCCESS]: getERPDataTrackingSummaryExcelExportSuccess,
  [Types.GET_ERP_DATA_TRACKING_SUMMARY_EXCEL_EXPORT_FAILURE]: getERPDataTrackingSummaryExcelExportFailure,

  [Types.GET_ERP_DATA_TRACKING_FAILED_REQUEST]: getERPDataTrackingFailedRequest,
  [Types.GET_ERP_DATA_TRACKING_FAILED_SUCCESS]: getERPDataTrackingFailedSuccess,
  [Types.GET_ERP_DATA_TRACKING_FAILED_FAILURE]: getERPDataTrackingFailedFailure,

  [Types.GET_ERP_DATA_TRACKING_SUCCESSFUL_REQUEST]: getERPDataTrackingSuccessfulRequest,
  [Types.GET_ERP_DATA_TRACKING_SUCCESSFUL_SUCCESS]: getERPDataTrackingSuccessfulSuccess,
  [Types.GET_ERP_DATA_TRACKING_SUCCESSFUL_FAILURE]: getERPDataTrackingSuccessfulFailure,

  [Types.SET_ACTIVE_TAB]: setActiveTab,
  [Types.SET_FAILED_FILTERS]: setFailedFilters,
  [Types.SET_SUCCESSFUL_FILTERS]: setSuccessfulFilters,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
