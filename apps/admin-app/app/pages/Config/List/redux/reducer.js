import _findIndex from 'lodash/findIndex';
import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  filters: { searchTerm: '' },
  configs: {
    isPending: false,
    data: [],
    nextPageToken: '',
    prevPageToken: '',
  },
  updateConfig: { isPending: false },
  deleteConfig: { isPending: false },
};

const getConfigsRequest = (state = INITIAL_STATE) => ({
  ...state,
  configs: {
    ...state.configs,
    isPending: true,
    data: [],
  },
});

const getConfigsSuccess = (state = INITIAL_STATE, { data, nextPageToken, prevPageToken }) => ({
  ...state,
  configs: {
    ...state.configs,
    isPending: false,
    data,
    nextPageToken,
    prevPageToken,
  },
});

const getConfigsFailure = (state = INITIAL_STATE) => ({
  ...state,
  configs: {
    ...state.configs,
    isPending: false,
  },
});

const updateConfigRequest = (state = INITIAL_STATE) => ({
  ...state,
  updateConfig: {
    ...state.updateConfig,
    isPending: true,
  },
});

const updateConfigSuccess = (state = INITIAL_STATE, { key, updatedConfig }) => {
  const tempConfigs = [...state.configs.data];
  const indexOfUpdatedConfig = _findIndex(tempConfigs, { key });

  if (indexOfUpdatedConfig !== -1) {
    Object.assign(tempConfigs[indexOfUpdatedConfig], { ...updatedConfig });
  }

  return {
    ...state,
    updateConfig: {
      ...state.updateConfig,
      isPending: false,
    },
    configs: {
      ...state.configs,
      data: tempConfigs,
    },
  };
};

const updateConfigFailure = (state = INITIAL_STATE) => ({
  ...state,
  updateConfig: {
    ...state.updateConfig,
    isPending: false,
  },
});

const deleteConfigRequest = state => ({
  ...state,
  deleteConfig: {
    ...state.deleteConfig,
    isPending: true,
  },
});

const deleteConfigSuccess = (state, { key }) => {
  const prevConfigs = [...state.configs.data];
  const newConfigs = prevConfigs.filter(config => config.key !== key);

  return ({
    ...state,
    deleteConfig: {
      ...state.deleteConfig,
      isPending: false,
    },
    configs: {
      ...state.configs,
      data: newConfigs,
    },
  });
};

const deleteConfigFailure = state => ({
  ...state,
  deleteConfig: {
    ...state.deleteConfig,
    isPending: false,
  },
});

const setFilters = (state = INITIAL_STATE, { filterObject = {} }) => ({
  ...state,
  filters: {
    ...state.filters,
    ...filterObject,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_CONFIGS_REQUEST]: getConfigsRequest,
  [Types.GET_CONFIGS_SUCCESS]: getConfigsSuccess,
  [Types.GET_CONFIGS_FAILURE]: getConfigsFailure,
  [Types.UPDATE_CONFIG_REQUEST]: updateConfigRequest,
  [Types.UPDATE_CONFIG_SUCCESS]: updateConfigSuccess,
  [Types.UPDATE_CONFIG_FAILURE]: updateConfigFailure,
  [Types.UPDATE_CUSTOM_CONFIG_REQUEST]: updateConfigRequest,
  [Types.UPDATE_CUSTOM_CONFIG_SUCCESS]: updateConfigSuccess,
  [Types.UPDATE_CUSTOM_CONFIG_FAILURE]: updateConfigFailure,
  [Types.DELETE_CONFIG_REQUEST]: deleteConfigRequest,
  [Types.DELETE_CONFIG_SUCCESS]: deleteConfigSuccess,
  [Types.DELETE_CONFIG_FAILURE]: deleteConfigFailure,
  [Types.SET_FILTERS]: setFilters,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
