import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  financialConfigsVerticals: {
    data: [],
    isPending: false,
    error: null,
  },
  financialConfigsDomainsByVertical: {
    data: [],
    isPending: false,
    error: null,
  },
  financialConfigsDomain: {
    data: {},
    isPending: false,
    error: null,
  },
  updateFinancialConfigValues: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getFinancialConfigsVerticalsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    financialConfigsVerticals: {
      ...state.financialConfigsVerticals,
      isPending: true,
    },
  };
};

export const getFinancialConfigsVerticalsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    financialConfigsVerticals: {
      ...state.financialConfigsVerticals,
      data,
      isPending: false,
    },
  };
};

export const getFinancialConfigsVerticalsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    financialConfigsVerticals: {
      ...state.financialConfigsVerticals,
      isPending: false,
      error,
    },
  };
};

export const getFinancialConfigsDomainsByVerticalRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    financialConfigsDomainsByVertical: {
      ...state.financialConfigsDomainsByVertical,
      isPending: true,
    },
  };
};

export const getFinancialConfigsDomainsByVerticalSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    financialConfigsDomainsByVertical: {
      ...state.financialConfigsDomainsByVertical,
      data,
      isPending: false,
    },
  };
};

export const getFinancialConfigsDomainsByVerticalFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    financialConfigsDomainsByVertical: {
      ...state.financialConfigsDomainsByVertical,
      isPending: false,
      error,
    },
  };
};

export const getFinancialConfigsDomainRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    financialConfigsDomain: {
      ...state.financialConfigsDomain,
      isPending: true,
    },
  };
};

export const getFinancialConfigsDomainSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    financialConfigsDomain: {
      ...state.financialConfigsDomain,
      data,
      isPending: false,
    },
  };
};

export const getFinancialConfigsDomainFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    financialConfigsDomain: {
      ...state.financialConfigsDomain,
      isPending: false,
      error,
    },
  };
};

export const updateFinancialConfigValuesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateFinancialConfigValues: {
      ...state.updateFinancialConfigValues,
      isPending: true,
    },
  };
};

export const updateFinancialConfigValuesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateFinancialConfigValues: {
      ...state.updateFinancialConfigValues,
      data,
      isPending: false,
    },
  };
};

export const updateFinancialConfigValuesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateFinancialConfigValues: {
      ...state.updateFinancialConfigValues,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_FINANCIAL_CONFIGS_VERTICALS_REQUEST]: getFinancialConfigsVerticalsRequest,
  [Types.GET_FINANCIAL_CONFIGS_VERTICALS_SUCCESS]: getFinancialConfigsVerticalsSuccess,
  [Types.GET_FINANCIAL_CONFIGS_VERTICALS_FAILURE]: getFinancialConfigsVerticalsFailure,

  [Types.GET_FINANCIAL_CONFIGS_DOMAINS_BY_VERTICAL_REQUEST]: getFinancialConfigsDomainsByVerticalRequest,
  [Types.GET_FINANCIAL_CONFIGS_DOMAINS_BY_VERTICAL_SUCCESS]: getFinancialConfigsDomainsByVerticalSuccess,
  [Types.GET_FINANCIAL_CONFIGS_DOMAINS_BY_VERTICAL_FAILURE]: getFinancialConfigsDomainsByVerticalFailure,

  [Types.GET_FINANCIAL_CONFIGS_DOMAIN_REQUEST]: getFinancialConfigsDomainRequest,
  [Types.GET_FINANCIAL_CONFIGS_DOMAIN_SUCCESS]: getFinancialConfigsDomainSuccess,
  [Types.GET_FINANCIAL_CONFIGS_DOMAIN_FAILURE]: getFinancialConfigsDomainFailure,

  [Types.UPDATE_FINANCIAL_CONFIG_VALUES_REQUEST]: updateFinancialConfigValuesRequest,
  [Types.UPDATE_FINANCIAL_CONFIG_VALUES_SUCCESS]: updateFinancialConfigValuesSuccess,
  [Types.UPDATE_FINANCIAL_CONFIG_VALUES_FAILURE]: updateFinancialConfigValuesFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
