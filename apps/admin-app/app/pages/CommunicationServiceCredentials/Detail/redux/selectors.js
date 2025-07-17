import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.COMMUNICATION_SERVICE_CREDENTIALS.DETAIL;

export const communicationServiceCredentialsUpdateSelector = {
  getData: state => state?.[reducerKey]?.communicationServiceCredentialsUpdate?.data,
  getIsPending: state => state?.[reducerKey]?.communicationServiceCredentialsUpdate?.isPending,
  getError: state => state?.[reducerKey]?.communicationServiceCredentialsUpdate?.error,
};

export const configSelector = {
  getConfig: state => state?.[reducerKey]?.config?.data,
  isPending: state => state?.[reducerKey]?.config?.isPending,
};

export const providerSelector = { getProvider: state => state?.[reducerKey]?.provider };
