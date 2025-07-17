import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { parseProviderObj } from '@app/pages/CommunicationServiceCredentials/utils';
import { providersObj } from '@app/pages/CommunicationServiceCredentials/constantValues';

export const INITIAL_STATE = {
  communicationServiceCredentialsSave: {
    isPending: false,
    data: [],
    error: null,
  },
  config: {
    data: {},
    isPending: false,
  },
  provider: parseProviderObj(),
};
export const communicationServiceCredentialsSaveRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    communicationServiceCredentialsSave: {
      ...state.communicationServiceCredentialsSave,
      isPending: true,
    },
  };
};

export const communicationServiceCredentialsSaveSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    communicationServiceCredentialsSave: {
      ...state.communicationServiceCredentialsSave,
      isPending: false,
      data,
    },
  };
};

export const communicationServiceCredentialsSaveFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    communicationServiceCredentialsSave: {
      ...state.communicationServiceCredentialsSave,
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

export const getProviderRequest = (state = INITIAL_STATE, { providerType }) => {
  return {
    ...state,
    provider: {
      ...state.provider,
      [providersObj[providerType].name]: {
        isPending: true,
        error: null,
      },
    },
  };
};

export const getProviderSuccess = (state = INITIAL_STATE, { data, providerType }) => {
  return {
    ...state,
    provider: {
      ...state.provider,
      [providersObj[providerType].name]: {
        isPending: false,
        data,
        error: null,
      },
    },
  };
};

export const getProviderFailure = (state = INITIAL_STATE, { error, providerType }) => {
  return {
    ...state,
    provider: {
      ...state.provider,
      [providersObj[providerType].name]: {
        isPending: false,
        error,
      },
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.COMMUNICATION_SERVICE_CREDENTIALS_SAVE_REQUEST]: communicationServiceCredentialsSaveRequest,
  [Types.COMMUNICATION_SERVICE_CREDENTIALS_SAVE_SUCCESS]: communicationServiceCredentialsSaveSuccess,
  [Types.COMMUNICATION_SERVICE_CREDENTIALS_SAVE_FAILURE]: communicationServiceCredentialsSaveFailure,

  [Types.GET_CONFIG_REQUEST]: getConfigRequest,
  [Types.GET_CONFIG_SUCCESS]: getConfigSuccess,
  [Types.GET_CONFIG_FAILURE]: getConfigFailure,

  [Types.GET_PROVIDER_REQUEST]: getProviderRequest,
  [Types.GET_PROVIDER_SUCCESS]: getProviderSuccess,
  [Types.GET_PROVIDER_FAILURE]: getProviderFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
