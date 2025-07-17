import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  algorithmConfigList: {
    isPending: false,
    data: [],
  },
  namespaceList: {
    isPending: false,
    data: [],
  },
  typeList: {
    isPending: false,
    data: [],
  },
  namespace: 'general',
  filters: {},
  configSchema: {
    isPending: false,
    data: {},
  },
  createNewConfig: {
    data: {},
    isPending: false,
  },
  bulkEditCsv: {
    isPending: false,
    error: null,
    namespace: null,
    file: null,
    isDomain: null,
  },
  exportCsv: {
    data: null,
    isPending: false,
    error: [],
  },
};
const algorithmConfigListRequest = (state = INITIAL_STATE) => ({
  ...state,
  algorithmConfigList: {
    ...state.algorithmConfigList,
    isPending: true,
    data: [],
  },
});

const algorithmConfigListSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  algorithmConfigList: {
    ...state.algorithmConfigList,
    isPending: false,
    data,
  },
});

const algorithmConfigListFailure = (state = INITIAL_STATE) => ({
  ...state,
  algorithmConfigList: {
    ...state.algorithmConfigList,
    isPending: false,
  },
});

const algorithmConfigNamespaceListRequest = (state = INITIAL_STATE) => ({
  ...state,
  namespaceList: {
    ...state.namespaceList,
    isPending: true,
    data: [],
  },
});

const algorithmConfigNamespaceListSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  namespaceList: {
    ...state.namespaceList,
    isPending: false,
    data,
  },
});

const algorithmConfigNamespaceListFailure = (state = INITIAL_STATE) => ({
  ...state,
  namespaceList: {
    ...state.namespaceList,
    isPending: false,
  },
});

const algorithmConfigTypeListRequest = (state = INITIAL_STATE) => ({
  ...state,
  typeList: {
    ...state.typeList,
    isPending: true,
    data: [],
  },
});

const algorithmConfigTypeListSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  typeList: {
    ...state.typeList,
    isPending: false,
    data,
  },
});

const algorithmConfigTypeListFailure = (state = INITIAL_STATE) => ({
  ...state,
  typeList: {
    ...state.typeList,
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

const clearTypeFilter = (state = INITIAL_STATE) => {
  if (state?.filters && Object.keys(state?.filters).includes('type')) {
    const { type, ...rest } = state.filters;
    return {
      ...state,
      filters: rest,
    };
  }
  return state;
};

const setNamespace = (state = INITIAL_STATE, { namespace }) => {
  return {
    ...state,
    namespace,
  };
};

const configSchemaRequest = (state = INITIAL_STATE) => ({
  ...state,
  configSchema: {
    ...state.configSchema,
    isPending: true,
    data: {},
  },
});

const configSchemaSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  configSchema: {
    ...state.configSchema,
    isPending: false,
    data,
  },
});

const configSchemaFailure = (state = INITIAL_STATE) => ({
  ...state,
  configSchema: {
    ...state.configSchema,
    isPending: false,
  },
});

const createAlgorithmConfigRequest = (state = INITIAL_STATE) => ({
  ...state,
  createNewConfig: {
    ...state.createNewConfig,
    isPending: true,
    data: {},
  },
});

const createAlgorithmConfigSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  createNewConfig: {
    ...state.createNewConfig,
    isPending: false,
    data,
  },
});

const createAlgorithmConfigFailure = (state = INITIAL_STATE) => ({
  ...state,
  createNewConfig: {
    ...state.createNewConfig,
    isPending: false,
  },
});

const bulkEditCsvRequest = (state = INITIAL_STATE, { namespace, file, isDomain }) => {
  return {
    ...state,
    bulkEditCsv: {
      ...state.bulkEditCsv,
      isPending: true,
      namespace,
      file,
      isDomain,
    },
  };
};

const bulkEditCsvSuccess = (state = INITIAL_STATE, { namespace, file, isDomain }) => {
  return {
    ...state,
    bulkEditCsv: {
      ...state.bulkEditCsv,
      isPending: false,
      namespace,
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
  [Types.GET_ALGORITHM_CONFIG_LIST_REQUEST]: algorithmConfigListRequest,
  [Types.GET_ALGORITHM_CONFIG_LIST_SUCCESS]: algorithmConfigListSuccess,
  [Types.GET_ALGORITHM_CONFIG_LIST_FAILURE]: algorithmConfigListFailure,
  [Types.GET_ALGORITHM_CONFIG_NAMESPACE_LIST_REQUEST]: algorithmConfigNamespaceListRequest,
  [Types.GET_ALGORITHM_CONFIG_NAMESPACE_LIST_SUCCESS]: algorithmConfigNamespaceListSuccess,
  [Types.GET_ALGORITHM_CONFIG_NAMESPACE_LIST_FAILURE]: algorithmConfigNamespaceListFailure,
  [Types.GET_ALGORITHM_CONFIG_TYPE_LIST_REQUEST]: algorithmConfigTypeListRequest,
  [Types.GET_ALGORITHM_CONFIG_TYPE_LIST_SUCCESS]: algorithmConfigTypeListSuccess,
  [Types.GET_ALGORITHM_CONFIG_TYPE_LIST_FAILURE]: algorithmConfigTypeListFailure,
  [Types.ADD_FILTER_PARAMETER]: addFilterParameter,
  [Types.CLEAR_TYPE_FILTER]: clearTypeFilter,
  [Types.SET_NAMESPACE]: setNamespace,
  [Types.GET_CONFIG_SCHEMA_REQUEST]: configSchemaRequest,
  [Types.GET_CONFIG_SCHEMA_SUCCESS]: configSchemaSuccess,
  [Types.GET_CONFIG_SCHEMA_FAILURE]: configSchemaFailure,
  [Types.CREATE_ALGORITHM_CONFIG_REQUEST]: createAlgorithmConfigRequest,
  [Types.CREATE_ALGORITHM_CONFIG_SUCCESS]: createAlgorithmConfigSuccess,
  [Types.CREATE_ALGORITHM_CONFIG_FAILURE]: createAlgorithmConfigFailure,
  [Types.BULK_EDIT_CSV_REQUEST]: bulkEditCsvRequest,
  [Types.BULK_EDIT_CSV_SUCCESS]: bulkEditCsvSuccess,
  [Types.BULK_EDIT_CSV_FAILURE]: bulkEditCsvFailure,
  [Types.EXPORT_CSV_REQUEST]: exportCsvRequest,
  [Types.EXPORT_CSV_SUCCESS]: exportCsvSuccess,
  [Types.EXPORT_CSV_FAILURE]: exportCsvFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
