import { createReducer } from 'reduxsauce';

import { Types } from '@app/pages/CommunicationHistory/redux/actions';
import { getLangKey } from '@shared/i18n';

export const INITIAL_STATE = {
  results: {
    data: [],
    isPending: false,
    error: null,
  },
  filters: {
    page: 0,
    size: 10,
    clientLanguage: getLangKey(),
  },
  signedUrl: {
    data: {},
    isPending: false,
    error: null,
  },
  signedUrlHtml: {
    data: {},
    isPending: false,
    error: null,
  },
  notificationReportConfigs: {
    data: {},
    isPending: false,
    error: null,
  },
  exportHistory: {
    data: {},
    isPending: false,
    error: null,
  },
  visibility: { data: false },
};

export const setTableFilters = (state = INITIAL_STATE, { filters }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      ...filters,
    },
    results: {
      ...state.results,
      error: null,
      isPending: true,
    },
  };
};

export const resetTableFilters = (state = INITIAL_STATE) => {
  return {
    ...state,
    filters: INITIAL_STATE.filters,
    results: INITIAL_STATE.results,
  };
};

export const getResultsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    results: {
      ...state.results,
      isPending: true,
      error: null,
    },
  };
};

export const getResultsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    results: {
      ...state.results,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getResultsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    results: {
      ...state.results,
      isPending: false,
      error,
    },
  };
};

export const getSignedUrlRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    signedUrl: {
      ...state.signedUrl,
      isPending: true,
      error: null,
    },
  };
};

export const getSignedUrlSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    signedUrl: {
      ...state.signedUrl,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getSignedUrlFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    signedUrl: {
      ...state.signedUrl,
      isPending: false,
      error,
    },
  };
};

export const getSignedUrlHtmlRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    signedUrlHtml: {
      ...state.signedUrlHtml,
      isPending: true,
      error: null,
    },
  };
};

export const getSignedUrlHtmlSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    signedUrlHtml: {
      ...state.signedUrlHtml,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getSignedUrlHtmlFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    signedUrlHtml: {
      ...state.signedUrlHtml,
      isPending: false,
      error,
    },
  };
};

export const getNotificationReportConfigsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    notificationReportConfigs: {
      ...state.results,
      isPending: true,
      error: null,
    },
  };
};

export const getNotificationReportConfigsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    notificationReportConfigs: {
      ...state.results,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getNotificationReportConfigsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    notificationReportConfigs: {
      ...state.results,
      isPending: false,
      error,
    },
  };
};

export const getExportHistoryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    exportHistory: {
      ...state.exportHistory,
      isPending: true,
      error: null,
    },
  };
};

export const getExportHistorySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    exportHistory: {
      ...state.exportHistory,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getExportHistoryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    exportHistory: {
      ...state.exportHistory,
      isPending: false,
      error,
    },
  };
};

export const setModalVisibilityRequest = (state = INITIAL_STATE, { visibility }) => {
  return {
    ...state,
    visibility: { data: visibility },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.SET_TABLE_FILTERS]: setTableFilters,
  [Types.RESET_TABLE_FILTERS]: resetTableFilters,

  [Types.GET_RESULTS_REQUEST]: getResultsRequest,
  [Types.GET_RESULTS_SUCCESS]: getResultsSuccess,
  [Types.GET_RESULTS_FAILURE]: getResultsFailure,

  [Types.SET_MODAL_VISIBILITY_REQUEST]: setModalVisibilityRequest,
  [Types.GET_SIGNED_URL_REQUEST]: getSignedUrlRequest,
  [Types.GET_SIGNED_URL_SUCCESS]: getSignedUrlSuccess,
  [Types.GET_SIGNED_URL_FAILURE]: getSignedUrlFailure,

  [Types.GET_SIGNED_URL_HTML_REQUEST]: getSignedUrlHtmlRequest,
  [Types.GET_SIGNED_URL_HTML_SUCCESS]: getSignedUrlHtmlSuccess,
  [Types.GET_SIGNED_URL_HTML_FAILURE]: getSignedUrlHtmlFailure,

  [Types.GET_NOTIFICATION_REPORT_CONFIGS_REQUEST]: getNotificationReportConfigsRequest,
  [Types.GET_NOTIFICATION_REPORT_CONFIGS_SUCCESS]: getNotificationReportConfigsSuccess,
  [Types.GET_NOTIFICATION_REPORT_CONFIGS_FAILURE]: getNotificationReportConfigsFailure,

  [Types.GET_EXPORT_HISTORY_REQUEST]: getExportHistoryRequest,
  [Types.GET_EXPORT_HISTORY_SUCCESS]: getExportHistorySuccess,
  [Types.GET_EXPORT_HISTORY_FAILURE]: getExportHistoryFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
