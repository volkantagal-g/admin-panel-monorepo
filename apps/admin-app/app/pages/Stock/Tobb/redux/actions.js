import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getTobbGibRequestRequest: { ids: [], isRetryFailedRequests: null },
    getTobbGibRequestSuccess: { data: [], failedRequests: [], invalidRequests: [] },
    getTobbGibRequestFailure: { error: null, data: [], failedRequests: [], invalidRequests: [] },

    exportTobbGibRequestSuccessRequestsRequest: { data: {} },
    exportTobbGibRequestSuccessRequestsSuccess: {},
    exportTobbGibRequestSuccessRequestsFailure: { error: null },

    exportTobbGibRequestInvalidRequestsRequest: { data: {} },
    exportTobbGibRequestInvalidRequestsSuccess: {},
    exportTobbGibRequestInvalidRequestsFailure: { error: null },

    exportTobbGibRequestFailedRequestsRequest: { data: {} },
    exportTobbGibRequestFailedRequestsSuccess: {},
    exportTobbGibRequestFailedRequestsFailure: { error: null },

    setTobbGibRequestProcessedRequests: { processedRequests: [] },
    resetTobbGibRequestProcessedRequests: { processedRequests: [] },

    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.STOCK.TOBB}_` },
);
