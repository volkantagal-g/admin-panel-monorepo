import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.COMMUNICATION_BULK_SMS.DETAIL;

export const communicationBulkSmsUpdateSelector = {
  getData: state => state?.[reducerKey]?.communicationBulkSmsUpdate?.data,
  getIsPending: state => state?.[reducerKey]?.communicationBulkSmsUpdate?.isPending,
  getError: state => state?.[reducerKey]?.communicationBulkSmsUpdate?.error,
};

export const configSelector = {
  getConfig: state => state?.[reducerKey]?.config?.data,
  isPending: state => state?.[reducerKey]?.config?.isPending,
};

export const getCsvFilesSelector = {
  getData: state => state?.[reducerKey]?.csvFiles?.data,
  getIsPending: state => state?.[reducerKey]?.csvFiles?.isPending,
};
