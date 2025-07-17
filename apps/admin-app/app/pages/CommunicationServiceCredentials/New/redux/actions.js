import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  communicationServiceCredentialsSaveRequest: { body: {}, serviceType: null },
  communicationServiceCredentialsSaveSuccess: { data: [] },
  communicationServiceCredentialsSaveFailure: { error: null },

  getConfigRequest: { clientLanguage: null, serviceType: null },
  getConfigSuccess: { data: {} },
  getConfigFailure: { error: null },

  getProviderRequest: { clientLanguage: null, providerType: null },
  getProviderSuccess: { data: {}, providerType: null },
  getProviderFailure: { error: null, providerType: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.COMMUNICATION_SERVICE_CREDENTIALS.NEW}_` });
