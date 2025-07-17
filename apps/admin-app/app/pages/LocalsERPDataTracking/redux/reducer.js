import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { FAILED_INITIAL_FILTERS, SUCCESS_INITIAL_FILTERS, TAB_ITEMS } from '../constants';

export const INITIAL_STATE = {
  activeTab: TAB_ITEMS.SUMMARY,
  failedFilters: { ...FAILED_INITIAL_FILTERS },
  successFilters: { ...SUCCESS_INITIAL_FILTERS },
  LocalsERPDataTrackingSummary: {
    data: [],
    isPending: false,
    error: null,
  },
  LocalsERPDataTrackingSummaryExcelExport: {
    data: {},
    isPending: false,
    error: null,
  },
  LocalsERPDataTrackingFailed: {
    data: {},
    isPending: false,
    error: null,
  },
  LocalsERPDataTrackingSuccess: {
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

export const setSuccessFilters = (
  state = INITIAL_STATE,
  { dateRange, currentPage, rowsPerPage, orderTypes, traceId, orderId },
) => {
  return {
    ...state,
    successFilters: {
      ...state.successFilters,
      dateRange,
      currentPage,
      rowsPerPage,
      orderTypes,
      traceId,
      orderId,
    },
  };
};

export const getLocalsERPDataTrackingSummaryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    LocalsERPDataTrackingSummary: {
      ...state.LocalsERPDataTrackingSummary,
      isPending: true,
    },
  };
};

export const getLocalsERPDataTrackingSummarySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    LocalsERPDataTrackingSummary: {
      ...state.LocalsERPDataTrackingSummary,
      data,
      isPending: false,
    },
  };
};

export const getLocalsERPDataTrackingSummaryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    LocalsERPDataTrackingSummary: {
      ...state.LocalsERPDataTrackingSummary,
      isPending: false,
      error,
    },
  };
};

export const getLocalsERPDataTrackingSummaryExcelExportRequest = state => {
  return {
    ...state,
    LocalsERPDataTrackingSummaryExcelExport: {
      ...state.LocalsERPDataTrackingSummaryExcelExport,
      isPending: true,
    },
  };
};

export const getLocalsERPDataTrackingSummaryExcelExportSuccess = (state, { data }) => {
  return {
    ...state,
    LocalsERPDataTrackingSummaryExcelExport: {
      ...state.LocalsERPDataTrackingSummaryExcelExport,
      data,
      isPending: false,
    },
  };
};

export const getLocalsERPDataTrackingSummaryExcelExportFailure = (state, { error }) => {
  return {
    ...state,
    LocalsERPDataTrackingSummaryExcelExport: {
      ...state.LocalsERPDataTrackingSummaryExcelExport,
      isPending: false,
      error,
    },
  };
};

export const getLocalsERPDataTrackingFailedRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    LocalsERPDataTrackingFailed: {
      ...state.LocalsERPDataTrackingFailed,
      isPending: true,
    },
  };
};

export const getLocalsERPDataTrackingFailedSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    LocalsERPDataTrackingFailed: {
      ...state.LocalsERPDataTrackingFailed,
      data,
      isPending: false,
    },
  };
};

export const getLocalsERPDataTrackingFailedFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    LocalsERPDataTrackingFailed: {
      ...state.LocalsERPDataTrackingFailed,
      isPending: false,
      error,
    },
  };
};

export const getLocalsERPDataTrackingSuccessRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    LocalsERPDataTrackingSuccess: {
      ...state.LocalsERPDataTrackingSuccess,
      isPending: true,
    },
  };
};

export const getLocalsERPDataTrackingSuccessSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    LocalsERPDataTrackingSuccess: {
      ...state.LocalsERPDataTrackingSuccess,
      data,
      isPending: false,
    },
  };
};

export const getLocalsERPDataTrackingSuccessFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    LocalsERPDataTrackingSuccess: {
      ...state.LocalsERPDataTrackingSuccess,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_LOCALS_ERP_DATA_TRACKING_SUMMARY_REQUEST]: getLocalsERPDataTrackingSummaryRequest,
  [Types.GET_LOCALS_ERP_DATA_TRACKING_SUMMARY_SUCCESS]: getLocalsERPDataTrackingSummarySuccess,
  [Types.GET_LOCALS_ERP_DATA_TRACKING_SUMMARY_FAILURE]: getLocalsERPDataTrackingSummaryFailure,

  [Types.GET_LOCALS_ERP_DATA_TRACKING_SUMMARY_EXCEL_EXPORT_REQUEST]: getLocalsERPDataTrackingSummaryExcelExportRequest,
  [Types.GET_LOCALS_ERP_DATA_TRACKING_SUMMARY_EXCEL_EXPORT_SUCCESS]: getLocalsERPDataTrackingSummaryExcelExportSuccess,
  [Types.GET_LOCALS_ERP_DATA_TRACKING_SUMMARY_EXCEL_EXPORT_FAILURE]: getLocalsERPDataTrackingSummaryExcelExportFailure,

  [Types.GET_LOCALS_ERP_DATA_TRACKING_FAILED_REQUEST]: getLocalsERPDataTrackingFailedRequest,
  [Types.GET_LOCALS_ERP_DATA_TRACKING_FAILED_SUCCESS]: getLocalsERPDataTrackingFailedSuccess,
  [Types.GET_LOCALS_ERP_DATA_TRACKING_FAILED_FAILURE]: getLocalsERPDataTrackingFailedFailure,

  [Types.GET_LOCALS_ERP_DATA_TRACKING_SUCCESS_REQUEST]: getLocalsERPDataTrackingSuccessRequest,
  [Types.GET_LOCALS_ERP_DATA_TRACKING_SUCCESS_SUCCESS]: getLocalsERPDataTrackingSuccessSuccess,
  [Types.GET_LOCALS_ERP_DATA_TRACKING_SUCCESS_FAILURE]: getLocalsERPDataTrackingSuccessFailure,

  [Types.SET_ACTIVE_TAB]: setActiveTab,
  [Types.SET_FAILED_FILTERS]: setFailedFilters,
  [Types.SET_SUCCESS_FILTERS]: setSuccessFilters,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
