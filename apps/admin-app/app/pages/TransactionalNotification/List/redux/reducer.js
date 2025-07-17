import { createReducer } from 'reduxsauce';

import { Types } from '@app/pages/TransactionalNotification/List/redux/actions';
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
    sort: 'createdAt,desc',
  },
  config: {
    data: {},
    isPending: false,
  },
  exportNotificationList: {
    data: {},
    isPending: false,
    error: null,
  },
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

export const getConfigRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    config: {
      ...state.config,
      isPending: true,
      error: null,
    },
  };
};

export const getConfigSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    config: {
      ...state.config,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getConfigFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    config: {
      ...state.config,
      isPending: false,
      error,
    },
  };
};

export const getExportNotificationListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    exportNotificationList: {
      ...state.exportNotificationList,
      isPending: true,
      error: null,
    },
  };
};

export const getExportNotificationListSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    exportNotificationList: {
      ...state.exportNotificationList,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getExportNotificationListFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    exportNotificationList: {
      ...state.exportNotificationList,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.SET_TABLE_FILTERS]: setTableFilters,

  [Types.GET_RESULTS_REQUEST]: getResultsRequest,
  [Types.GET_RESULTS_SUCCESS]: getResultsSuccess,
  [Types.GET_RESULTS_FAILURE]: getResultsFailure,

  [Types.GET_CONFIG_REQUEST]: getConfigRequest,
  [Types.GET_CONFIG_SUCCESS]: getConfigSuccess,
  [Types.GET_CONFIG_FAILURE]: getConfigFailure,

  [Types.GET_EXPORT_NOTIFICATION_LIST_REQUEST]: getExportNotificationListRequest,
  [Types.GET_EXPORT_NOTIFICATION_LIST_SUCCESS]: getExportNotificationListSuccess,
  [Types.GET_EXPORT_NOTIFICATION_LIST_FAILURE]: getExportNotificationListFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
