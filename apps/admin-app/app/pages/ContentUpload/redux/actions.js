import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.CONTENT_UPLOAD.S3}_`;

export const { Types, Creators } = createActions({
  getUploadDocumentURLRequest: { body: null },
  getUploadDocumentURLSuccess: { data: null },
  getUploadDocumentURLFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
