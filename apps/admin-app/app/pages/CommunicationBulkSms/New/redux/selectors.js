import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.COMMUNICATION_BULK_SMS.NEW;

export const communicationBulkSmsSaveSelector = {
  getAccessToken: state => state?.[reducerKey]?.communicationBulkSmsSave?.data,
  isPending: state => state?.[reducerKey]?.communicationBulkSmsSave?.isPending,
};

export const configSelector = {
  getConfig: state => state?.[reducerKey]?.config?.data,
  isPending: state => state?.[reducerKey]?.config?.isPending,
};

export const getCsvFilesSelector = {
  getData: state => state?.[reducerKey]?.csvFiles?.data,
  getIsPending: state => state?.[reducerKey]?.csvFiles?.isPending,
};
