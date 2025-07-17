import { createReducer } from 'reduxsauce';

import { Types } from '@app/pages/Email/List/redux/actions';
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
  globalSettings: {
    data: [],
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

// Global Settings

export const getGlobalSettingsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    globalSettings: {
      ...state.globalSettings,
      isPending: true,
      error: null,
    },
  };
};

export const getGlobalSettingsSuccess = (state = INITIAL_STATE, { data }) => {
  return ({
    ...state,
    globalSettings: {
      ...state.globalSettings,
      data,
      isPending: false,
      error: null,
    },
  });
};

export const getGlobalSettingsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    globalSettings: {
      ...state.globalSettings,
      isPending: false,
      error,
    },
  };
};

export const updateGlobalSettingsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    globalSettings: {
      ...state.globalSettings,
      isPending: true,
      error: null,
    },
  };
};

export const updateGlobalSettingsSuccess = (state = INITIAL_STATE, { data }) => {
  return ({
    ...state,
    globalSettings: {
      ...state.globalSettings,
      data,
      isPending: false,
      error: null,
    },
  });
};

export const updateGlobalSettingsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    globalSettings: {
      ...state.globalSettings,
      isPending: false,
      error,
    },
  };
};

// ** //

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.SET_TABLE_FILTERS]: setTableFilters,
  [Types.GET_RESULTS_REQUEST]: getResultsRequest,
  [Types.GET_RESULTS_SUCCESS]: getResultsSuccess,
  [Types.GET_RESULTS_FAILURE]: getResultsFailure,
  // Global Settings
  [Types.GET_GLOBAL_SETTINGS_REQUEST]: getGlobalSettingsRequest,
  [Types.GET_GLOBAL_SETTINGS_SUCCESS]: getGlobalSettingsSuccess,
  [Types.GET_GLOBAL_SETTINGS_FAILURE]: getGlobalSettingsFailure,
  [Types.UPDATE_GLOBAL_SETTINGS_REQUEST]: updateGlobalSettingsRequest,
  [Types.UPDATE_GLOBAL_SETTINGS_SUCCESS]: updateGlobalSettingsSuccess,
  [Types.UPDATE_GLOBAL_SETTINGS_FAILURE]: updateGlobalSettingsFailure,
  // ** //
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
