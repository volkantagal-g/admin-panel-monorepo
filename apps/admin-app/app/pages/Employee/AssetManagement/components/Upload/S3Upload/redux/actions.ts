import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.ASSET_MANAGEMENT.UPLOAD}_`;

export const {
  Types,
  Creators,
} = createActions({
  uploadDocumentRequest: {
    file: null,
    base64: null,
    folderPath: null,
    onSuccess: null,
  },
  uploadDocumentSuccess: { data: null },
  uploadDocumentFailure: { error: null },
  resetUploadDocumentURL: {},

  getSignedUrlForDocumentRequest: { fileKey: null, onSuccess: null },
  getSignedUrlForDocumentSuccess: { signedUrl: null },
  getSignedUrlForDocumentFailure: { error: null },

  initContainer: null,
  destroyContainer: null,
}, { prefix });
