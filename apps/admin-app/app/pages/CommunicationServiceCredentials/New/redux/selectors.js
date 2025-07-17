import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.COMMUNICATION_SERVICE_CREDENTIALS.NEW;

export const configSelector = {
  getConfig: state => state?.[reducerKey]?.config?.data,
  isPending: state => state?.[reducerKey]?.config?.isPending,
};

export const providerSelector = { getProvider: state => state?.[reducerKey]?.provider };

export const communicationServiceCredentialsSaveSelector = {
  getAccessToken: state => state?.[reducerKey]?.communicationServiceCredentialsSave?.data,
  isPending: state => state?.[reducerKey]?.communicationServiceCredentialsSave?.isPending,
};
