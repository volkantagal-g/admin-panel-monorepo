import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    initPage: null,
    destroyPage: null,
    deliveryFeeBulkUploadRequest: { requestBody: {} },
    deliveryFeeBulkUploadSuccess: { data: {} },
    deliveryFeeBulkUploadFailure: { error: null },
  },
  { prefix: `${REDUX_KEY.DELIVERY_FEE.BULK_UPLOAD}_` },
);
