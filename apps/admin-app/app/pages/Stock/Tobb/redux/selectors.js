import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.STOCK.TOBB;

export const getTobbGibRequestSelector = {
  getData: state => state?.[reducerKey]?.tobbGibRequest.data,
  getIsPending: state => state?.[reducerKey]?.tobbGibRequest?.isPending,
  getIds: state => state?.[reducerKey]?.ids,
  getProcessedRequests: state => state?.[reducerKey]?.processedRequests,
  getInvalidRequests: state => state?.[reducerKey]?.invalidRequests,
  getFailedRequests: state => state?.[reducerKey]?.failedRequests,
};

export const exportTobbGibRequestSuccessRequestsSelector = { getIsPending: state => state?.[reducerKey]?.exportTobbGibRequestSuccessRequests?.isPending };

export const exportTobbGibRequestInvalidRequestsSelector = { getIsPending: state => state?.[reducerKey]?.exportTobbGibRequestRequests?.isPending };

export const exportTobbGibRequestFailedRequestsSelector = { getIsPending: state => state?.[reducerKey]?.exportTobbGibRequestFailedRequests?.isPending };
