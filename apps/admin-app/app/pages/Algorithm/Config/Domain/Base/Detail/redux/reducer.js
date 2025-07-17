import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  algorithmDomainConfigDetail: {
    isPending: false,
    data: {},
  },
  algorithmDomainConfigValue: {
    isPending: false,
    data: {},
  },
  algorithmDomainSettings: {
    isPending: false,
    data: {},
  },
  warehouseData: {
    isPending: false,
    data: {},
  },
  isUpdating: false,
  namespace: null,
};

const algorithmDomainConfigDetailRequest = (state = INITIAL_STATE) => ({
  ...state,
  algorithmDomainConfigDetail: {
    ...state.algorithmDomainConfigDetail,
    isPending: true,
    data: {},
  },
});

const algorithmDomainConfigDetailSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    algorithmDomainConfigDetail: {
      ...state.algorithmDomainConfigDetail,
      isPending: false,
      data,
    },
  };
};

const algorithmDomainConfigDetailFailure = (state = INITIAL_STATE) => ({
  ...state,
  algorithmDomainConfigDetail: {
    ...state.algorithmDomainConfigDetail,
    isPending: false,
  },
});

const algorithmDomainConfigValueRequest = (state = INITIAL_STATE) => ({
  ...state,
  algorithmDomainConfigValue: {
    ...state.algorithmDomainConfigValue,
    isPending: true,
    data: {},
  },
});

const algorithmDomainConfigValueSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    algorithmDomainConfigValue: {
      ...state.algorithmDomainConfigValue,
      isPending: false,
      data,
    },
  };
};

const algorithmDomainConfigValueFailure = (state = INITIAL_STATE) => ({
  ...state,
  algorithmDomainConfigValue: {
    ...state.algorithmDomainConfigValue,
    isPending: false,
  },
});

const algorithmDomainConfigValueUpdateRequest = (state = INITIAL_STATE) => ({
  ...state,
  isUpdating: true,
});

const algorithmDomainConfigValueUpdateSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  isUpdating: false,
  algorithmDomainConfigDetail: {
    ...state.algorithmDomainConfigDetail,
    data: {
      ...state.algorithmDomainConfigDetail?.data,
      ...data,
    },
  },
});

const algorithmDomainConfigValueUpdateFailure = (state = INITIAL_STATE) => ({
  ...state,
  isUpdating: false,
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

const warehouseDetailRequest = (state = INITIAL_STATE) => ({
  ...state,
  warehouseData: {
    ...state.warehouseData,
    isPending: true,
    data: {},
  },
});

const warehouseDetailSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  warehouseData: {
    ...state.warehouseData,
    isPending: false,
    data,
  },
});

const warehouseDetailFailure = (state = INITIAL_STATE) => ({
  ...state,
  warehouseData: {
    ...state.warehouseData,
    isPending: false,
  },
});

const setNamespace = (state = INITIAL_STATE, { namespace }) => ({
  ...state,
  namespace,
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_ALGORITHM_DOMAIN_CONFIG_DETAIL_REQUEST]: algorithmDomainConfigDetailRequest,
  [Types.GET_ALGORITHM_DOMAIN_CONFIG_DETAIL_SUCCESS]: algorithmDomainConfigDetailSuccess,
  [Types.GET_ALGORITHM_DOMAIN_CONFIG_DETAIL_FAILURE]: algorithmDomainConfigDetailFailure,
  [Types.GET_ALGORITHM_DOMAIN_CONFIG_VALUE_REQUEST]: algorithmDomainConfigValueRequest,
  [Types.GET_ALGORITHM_DOMAIN_CONFIG_VALUE_SUCCESS]: algorithmDomainConfigValueSuccess,
  [Types.GET_ALGORITHM_DOMAIN_CONFIG_VALUE_FAILURE]: algorithmDomainConfigValueFailure,
  [Types.UPDATE_ALGORITHM_DOMAIN_CONFIG_VALUE_REQUEST]: algorithmDomainConfigValueUpdateRequest,
  [Types.UPDATE_ALGORITHM_DOMAIN_CONFIG_VALUE_SUCCESS]: algorithmDomainConfigValueUpdateSuccess,
  [Types.UPDATE_ALGORITHM_DOMAIN_CONFIG_VALUE_FAILURE]: algorithmDomainConfigValueUpdateFailure,
  [Types.GET_ALGORITHM_DOMAIN_SETTINGS_REQUEST]: algorithmDomainSettingsRequest,
  [Types.GET_ALGORITHM_DOMAIN_SETTINGS_SUCCESS]: algorithmDomainSettingsSuccess,
  [Types.GET_ALGORITHM_DOMAIN_SETTINGS_FAILURE]: algorithmDomainSettingsFailure,
  [Types.GET_WAREHOUSE_DETAIL_REQUEST]: warehouseDetailRequest,
  [Types.GET_WAREHOUSE_DETAIL_SUCCESS]: warehouseDetailSuccess,
  [Types.GET_WAREHOUSE_DETAIL_FAILURE]: warehouseDetailFailure,
  [Types.SET_NAMESPACE]: setNamespace,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
