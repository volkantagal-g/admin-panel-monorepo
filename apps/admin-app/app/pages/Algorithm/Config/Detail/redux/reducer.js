import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  configDetail: {
    isPending: false,
    data: [],
  },
  configValue: {
    isPending: false,
    data: [],
  },
  configUpdating: false,
  configLinking: false,
  configUnlinking: false,
  configDeleting: false,
  configDeleteStatus: {},
  configNodeUpdating: false,
  customConfigList: {
    isPending: false,
    data: [],
  },
  linkedConfigs: {
    isPending: false,
    data: [],
  },
  configSchema: {
    isPending: false,
    data: {},
  },
  validateConfigValue: {
    isPending: false,
    data: {},
  },
};

const configDetailRequest = (state = INITIAL_STATE) => ({
  ...state,
  configDetail: {
    ...state.configDetail,
    isPending: true,
    data: {},
  },
});

const configDetailSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  configDetail: {
    ...state.configDetail,
    isPending: false,
    data,
  },
});

const configDetailFailure = (state = INITIAL_STATE) => ({
  ...state,
  configDetail: {
    ...state.configDetail,
    isPending: false,
  },
});

const configValueRequest = (state = INITIAL_STATE) => ({
  ...state,
  configValue: {
    ...state.configValue,
    isPending: true,
    data: {},
  },
});

const configValueSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  configValue: {
    ...state.configValue,
    isPending: false,
    data,
  },
});

const configValueFailure = (state = INITIAL_STATE) => ({
  ...state,
  configValue: {
    ...state.configValue,
    isPending: false,
  },
});

const updateConfigValueRequest = (state = INITIAL_STATE) => ({
  ...state,
  configUpdating: true,
});

const updateConfigValueSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  configUpdating: false,
  configDetail: { data },
});

const updateConfigValueFailure = (state = INITIAL_STATE) => ({
  ...state,
  configUpdating: false,
});

const searchCustomConfigRequest = (state = INITIAL_STATE) => ({
  ...state,
  customConfigList: {
    ...state.customConfigList,
    data: [],
    isPending: true,
  },
});

const searchCustomConfigSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  customConfigList: {
    ...state.customConfigList,
    data,
    isPending: false,
  },
});

const searchCustomConfigFailure = (state = INITIAL_STATE) => ({
  ...state,
  customConfigList: {
    ...state.customConfigList,
    isPending: false,
  },
});

const updateConfigNodeRequest = (state = INITIAL_STATE) => ({
  ...state,
  configNodeUpdating: true,
});

const updateConfigNodeSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  configDetail: {
    ...state.configDetail,
    data,
  },
  configNodeUpdating: false,
});

const updateConfigNodeFailure = (state = INITIAL_STATE) => ({
  ...state,
  configNodeUpdating: false,
});

const deleteConfigNodeRequest = (state = INITIAL_STATE) => ({
  ...state,
  configDeleting: true,
});

const deleteConfigNodeSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  configDeleteStatus: data,
  configDeleting: false,
});

const deleteConfigNodeFailure = (state = INITIAL_STATE) => ({
  ...state,
  configDeleting: false,
});

const linkCustomConfigRequest = (state = INITIAL_STATE) => ({
  ...state,
  configLinking: true,
  customConfigList: { data: [] },
});

const linkCustomConfigSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  configDetail: {
    ...state.configDetail,
    data,
  },
  configLinking: false,
});

const linkCustomConfigFailure = (state = INITIAL_STATE) => ({
  ...state,
  configLinking: false,
});

const unlinkCustomConfigRequest = (state = INITIAL_STATE) => ({
  ...state,
  configUnlinking: true,
});

const unlinkCustomConfigSuccess = (state = INITIAL_STATE) => ({
  ...state,
  configUnlinking: false,
});

const unlinkCustomConfigFailure = (state = INITIAL_STATE) => ({
  ...state,
  configUnlinking: false,
});

const getLinkedConfigRequest = (state = INITIAL_STATE) => ({
  ...state,
  linkedConfigs: {
    ...state.configDetail,
    isPending: true,
    data: [],
  },
});

const getLinkedConfigSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  linkedConfigs: {
    ...state.linkedConfigs,
    isPending: false,
    data,
  },
});

const getLinkedConfigFailure = (state = INITIAL_STATE) => ({
  ...state,
  linkedConfigs: {
    ...state.linkedConfigs,
    isPending: false,
  },
});

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

const validateConfigValueRequest = (state = INITIAL_STATE) => ({
  ...state,
  validateConfigValue: {
    ...state.validateConfigValue,
    isPending: true,
    data: {},
  },
});

const validateConfigValueSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  validateConfigValue: {
    ...state.validateConfigValue,
    isPending: false,
    data,
  },
});

const validateConfigValueFailure = (state = INITIAL_STATE) => ({
  ...state,
  validateConfigValue: {
    ...state.validateConfigValue,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_CONFIG_DETAIL_REQUEST]: configDetailRequest,
  [Types.GET_CONFIG_DETAIL_SUCCESS]: configDetailSuccess,
  [Types.GET_CONFIG_DETAIL_FAILURE]: configDetailFailure,
  [Types.GET_CONFIG_VALUE_REQUEST]: configValueRequest,
  [Types.GET_CONFIG_VALUE_SUCCESS]: configValueSuccess,
  [Types.GET_CONFIG_VALUE_FAILURE]: configValueFailure,
  [Types.UPDATE_CONFIG_VALUE_REQUEST]: updateConfigValueRequest,
  [Types.UPDATE_CONFIG_VALUE_SUCCESS]: updateConfigValueSuccess,
  [Types.UPDATE_CONFIG_VALUE_FAILURE]: updateConfigValueFailure,
  [Types.SEARCH_CUSTOM_CONFIG_REQUEST]: searchCustomConfigRequest,
  [Types.SEARCH_CUSTOM_CONFIG_SUCCESS]: searchCustomConfigSuccess,
  [Types.SEARCH_CUSTOM_CONFIG_FAILURE]: searchCustomConfigFailure,
  [Types.UPDATE_CONFIG_NODE_REQUEST]: updateConfigNodeRequest,
  [Types.UPDATE_CONFIG_NODE_SUCCESS]: updateConfigNodeSuccess,
  [Types.UPDATE_CONFIG_NODE_FAILURE]: updateConfigNodeFailure,
  [Types.DELETE_CONFIG_NODE_REQUEST]: deleteConfigNodeRequest,
  [Types.DELETE_CONFIG_NODE_SUCCESS]: deleteConfigNodeSuccess,
  [Types.DELETE_CONFIG_NODE_FAILURE]: deleteConfigNodeFailure,
  [Types.LINK_CUSTOM_CONFIG_REQUEST]: linkCustomConfigRequest,
  [Types.LINK_CUSTOM_CONFIG_SUCCESS]: linkCustomConfigSuccess,
  [Types.LINK_CUSTOM_CONFIG_FAILURE]: linkCustomConfigFailure,
  [Types.UNLINK_CUSTOM_CONFIG_REQUEST]: unlinkCustomConfigRequest,
  [Types.UNLINK_CUSTOM_CONFIG_SUCCESS]: unlinkCustomConfigSuccess,
  [Types.UNLINK_CUSTOM_CONFIG_FAILURE]: unlinkCustomConfigFailure,
  [Types.GET_LINKED_CONFIGS_REQUEST]: getLinkedConfigRequest,
  [Types.GET_LINKED_CONFIGS_SUCCESS]: getLinkedConfigSuccess,
  [Types.GET_LINKED_CONFIGS_FAILURE]: getLinkedConfigFailure,
  [Types.GET_CONFIG_SCHEMA_REQUEST]: configSchemaRequest,
  [Types.GET_CONFIG_SCHEMA_SUCCESS]: configSchemaSuccess,
  [Types.GET_CONFIG_SCHEMA_FAILURE]: configSchemaFailure,
  [Types.VALIDATE_CONFIG_VALUE_REQUEST]: validateConfigValueRequest,
  [Types.VALIDATE_CONFIG_VALUE_SUCCESS]: validateConfigValueSuccess,
  [Types.VALIDATE_CONFIG_VALUE_FAILURE]: validateConfigValueFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
