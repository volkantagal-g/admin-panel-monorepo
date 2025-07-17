import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  communicationBulkSmsSaveRequest: { body: {} },
  communicationBulkSmsSaveSuccess: { data: [] },
  communicationBulkSmsSaveFailure: { error: null },

  getConfigRequest: { clientLanguage: null },
  getConfigSuccess: { data: {} },
  getConfigFailure: { error: null },

  getS3CsvUploadUrlRequest: { base64File: null, file: null, onUploadSuccess: null },
  getS3CsvUploadUrlSuccess: { name: null, signedUrl: null, originalFileName: null },
  getS3CsvUploadUrlFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.COMMUNICATION_BULK_SMS.NEW}_` });
