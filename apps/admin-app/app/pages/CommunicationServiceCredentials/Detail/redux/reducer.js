import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { parseProviderObj } from '@app/pages/CommunicationServiceCredentials/utils';
import { providersObj } from '@app/pages/CommunicationServiceCredentials/constantValues';

export const INITIAL_STATE = {
  communicationServiceCredentialsUpdate: {
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

export const communicationServiceCredentialsGetRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    communicationServiceCredentialsUpdate: {
      ...INITIAL_STATE.communicationServiceCredentialsUpdate,
      isPending: true,
    },
  };
};

export const communicationServiceCredentialsGetSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    communicationServiceCredentialsUpdate: {
      ...INITIAL_STATE.communicationServiceCredentialsUpdate,
      data,
      isPending: false,
    },
  };
};

export const communicationServiceCredentialsGetFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    communicationServiceCredentialsUpdate: {
      ...INITIAL_STATE.communicationServiceCredentialsUpdate,
      isPending: false,
      error,
    },
  };
};

export const communicationServiceCredentialsUpdateRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    communicationServiceCredentialsUpdate: {
      ...state.communicationServiceCredentialsUpdate,
      isPending: true,
    },
  };
};

export const communicationServiceCredentialsUpdateSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    communicationServiceCredentialsUpdate: {
      ...state.communicationServiceCredentialsUpdate,
      isPending: false,
      data,
    },
  };
};

export const communicationServiceCredentialsUpdateFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    communicationServiceCredentialsUpdate: {
      ...state.communicationServiceCredentialsUpdate,
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
  [Types.COMMUNICATION_SERVICE_CREDENTIALS_UPDATE_REQUEST]: communicationServiceCredentialsUpdateRequest,
  [Types.COMMUNICATION_SERVICE_CREDENTIALS_UPDATE_SUCCESS]: communicationServiceCredentialsUpdateSuccess,
  [Types.COMMUNICATION_SERVICE_CREDENTIALS_UPDATE_FAILURE]: communicationServiceCredentialsUpdateFailure,

  [Types.COMMUNICATION_SERVICE_CREDENTIALS_GET_REQUEST]: communicationServiceCredentialsGetRequest,
  [Types.COMMUNICATION_SERVICE_CREDENTIALS_GET_SUCCESS]: communicationServiceCredentialsGetSuccess,
  [Types.COMMUNICATION_SERVICE_CREDENTIALS_GET_FAILURE]: communicationServiceCredentialsGetFailure,

  [Types.GET_CONFIG_REQUEST]: getConfigRequest,
  [Types.GET_CONFIG_SUCCESS]: getConfigSuccess,
  [Types.GET_CONFIG_FAILURE]: getConfigFailure,

  [Types.GET_PROVIDER_REQUEST]: getProviderRequest,
  [Types.GET_PROVIDER_SUCCESS]: getProviderSuccess,
  [Types.GET_PROVIDER_FAILURE]: getProviderFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
