import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  algorithmDomainConfigList: {
    isPending: false,
    data: [],
  },
  algorithmDomainSettings: {
    isPending: false,
    data: {},
  },
  bulkEditCsv: {
    isPending: false,
    error: null,
    file: null,
    isDomain: null,
  },
  exportCsv: {
    data: null,
    isPending: false,
    error: [],
  },
  constants: {},
  namespace: 'general',
  filters: {},
};
const algorithmDomainConfigListRequest = (state = INITIAL_STATE) => ({
  ...state,
  algorithmDomainConfigList: {
    ...state.algorithmDomainConfigList,
    isPending: true,
    data: [],
  },
});

const algorithmDomainConfigListSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  algorithmDomainConfigList: {
    ...state.algorithmDomainConfigList,
    isPending: false,
    data,
  },
});

const algorithmDomainConfigListFailure = (state = INITIAL_STATE) => ({
  ...state,
  algorithmDomainConfigList: {
    ...state.algorithmDomainConfigList,
    isPending: false,
  },
});

const algorithmDomainSettingsRequest = (state = INITIAL_STATE) => ({
  ...state,
  algorithmDomainSettings: {
    ...state.algorithmDomainSettings,
    isPending: true,
    data: {},
  },
});

const algorithmDomainSettingsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  algorithmDomainSettings: {
    ...state.algorithmDomainSettings,
    isPending: false,
    data,
  },
});

const algorithmDomainSettingsFailure = (state = INITIAL_STATE) => ({
  ...state,
  algorithmDomainSettings: {
    ...state.algorithmDomainSettings,
    isPending: false,
  },
});

const addFilterParameter = (state = INITIAL_STATE, { field, value, operator }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      [field]: { field, value, operator },
    },
  };
};

const setNamespace = (state = INITIAL_STATE, { namespace }) => {
  return {
    ...state,
    namespace,
  };
};

const setConstants = (state = INITIAL_STATE, { constants }) => {
  return {
    ...state,
    constants,
  };
};

const bulkEditCsvRequest = (state = INITIAL_STATE, { file, isDomain }) => {
  return {
    ...state,
    bulkEditCsv: {
      ...state.bulkEditCsv,
      isPending: true,
      file,
      isDomain,
    },
  };
};

const bulkEditCsvSuccess = (state = INITIAL_STATE, { file, isDomain }) => {
  return {
    ...state,
    bulkEditCsv: {
      ...state.bulkEditCsv,
      isPending: false,
      file,
      isDomain,
    },
  };
};

const bulkEditCsvFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    bulkEditCsv: {
      ...INITIAL_STATE.bulkEditCsv,
      isPending: false,
      error,
    },
  };
};

const exportCsvRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    exportCsv: {
      ...state.exportCsv,
      isPending: true,
    },
  };
};

const exportCsvSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    exportCsv: {
      ...state.exportCsv,
      isPending: false,
    },
  };
};

const exportCsvFailure = (state = INITIAL_STATE, { error }) => {
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
  [Types.GET_ALGORITHM_DOMAIN_CONFIG_LIST_REQUEST]: algorithmDomainConfigListRequest,
  [Types.GET_ALGORITHM_DOMAIN_CONFIG_LIST_SUCCESS]: algorithmDomainConfigListSuccess,
  [Types.GET_ALGORITHM_DOMAIN_CONFIG_LIST_FAILURE]: algorithmDomainConfigListFailure,
  [Types.GET_ALGORITHM_DOMAIN_SETTINGS_REQUEST]: algorithmDomainSettingsRequest,
  [Types.GET_ALGORITHM_DOMAIN_SETTINGS_SUCCESS]: algorithmDomainSettingsSuccess,
  [Types.GET_ALGORITHM_DOMAIN_SETTINGS_FAILURE]: algorithmDomainSettingsFailure,
  [Types.ADD_FILTER_PARAMETER]: addFilterParameter,
  [Types.SET_NAMESPACE]: setNamespace,
  [Types.SET_CONSTANTS]: setConstants,
  [Types.BULK_EDIT_CSV_REQUEST]: bulkEditCsvRequest,
  [Types.BULK_EDIT_CSV_SUCCESS]: bulkEditCsvSuccess,
  [Types.BULK_EDIT_CSV_FAILURE]: bulkEditCsvFailure,
  [Types.EXPORT_CSV_REQUEST]: exportCsvRequest,
  [Types.EXPORT_CSV_SUCCESS]: exportCsvSuccess,
  [Types.EXPORT_CSV_FAILURE]: exportCsvFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
