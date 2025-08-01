// library imports
import { createReducer } from 'reduxsauce';

// local imports
import { Types } from './actions';

export const INITIAL_STATE = {
  marketBusinessConfigs: {
    data: [],
    isPending: false,
    error: null,
  },
  businessConfig: {
    data: {},
    isPending: false,
    error: null,
  },
  businessCustomConfig: {
    data: {},
    isPending: false,
    error: null,
  },
};

const getMarketBusinessConfigs = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    marketBusinessConfigs: {
      ...state.marketBusinessConfigs,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { marketBusinessConfigs = {} }) => ({
    ...state,
    marketBusinessConfigs: {
      ...state.marketBusinessConfigs,
      data: marketBusinessConfigs,
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    marketBusinessConfigs: {
      ...state.marketBusinessConfigs,
      isPending: false,
      error,
    },
  }),
};

const updateBusinessConfigValue = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    businessConfig: {
      ...state.businessConfig,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { businessConfigValue = {} }) => ({
    ...state,
    businessConfig: {
      ...state.businessConfig,
      data: businessConfigValue,
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    businessConfig: {
      ...state.businessConfig,
      isPending: false,
      error,
    },
  }),
};

const updateBusinessConfigCustomValue = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    businessCustomConfig: {
      ...state.businessCustomConfig,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { businessConfigCustomValue = {} }) => ({
    ...state,
    businessCustomConfig: {
      ...state.businessCustomConfig,
      data: businessConfigCustomValue,
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    businessCustomConfig: {
      ...state.businessCustomConfig,
      isPending: false,
      error,
    },
  }),
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MARKET_BUSINESS_CONFIGS_REQUEST]: getMarketBusinessConfigs.request,
  [Types.GET_MARKET_BUSINESS_CONFIGS_SUCCESS]: getMarketBusinessConfigs.success,
  [Types.GET_MARKET_BUSINESS_CONFIGS_FAILURE]: getMarketBusinessConfigs.failure,
  [Types.UPDATE_BUSINESS_CONFIG_VALUE_REQUEST]: updateBusinessConfigValue.request,
  [Types.UPDATE_BUSINESS_CONFIG_VALUE_SUCCESS]: updateBusinessConfigValue.success,
  [Types.UPDATE_BUSINESS_CONFIG_VALUE_FAILURE]: updateBusinessConfigValue.failure,
  [Types.UPDATE_BUSINESS_CONFIG_CUSTOM_VALUE_REQUEST]: updateBusinessConfigCustomValue.request,
  [Types.UPDATE_BUSINESS_CONFIG_CUSTOM_VALUE_SUCCESS]: updateBusinessConfigCustomValue.success,
  [Types.UPDATE_BUSINESS_CONFIG_CUSTOM_VALUE_FAILURE]: updateBusinessConfigCustomValue.failure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
