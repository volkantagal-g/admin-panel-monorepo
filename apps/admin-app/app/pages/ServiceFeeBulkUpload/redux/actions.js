import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    initPage: null,
    destroyPage: null,
    serviceFeeBulkUploadRequest: { requestBody: {} },
    serviceFeeBulkUploadSuccess: { data: {} },
    serviceFeeBulkUploadFailure: { error: null },
  },
  { prefix: `${REDUX_KEY.SERVICE_FEE.BULK_UPLOAD}_` },
);
