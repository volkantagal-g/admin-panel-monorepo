import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createPopupRequest: { data: {} },
  createPopupSuccess: { data: {} },
  createPopupFailure: { error: null },

  getS3SignedImageUrlRequest: {
    loadedImage: null,
    file: null,
    isAppliedToOtherLanguanges: false,
    fileLang: null,
    onUploadSuccess: null,
  },
  getS3SignedImageUrlSuccess: { cdnUrl: null, fileLang: null },
  getS3SignedImageUrlFailure: { error: null },

  getConfigKeyRequest: { body: null },
  getConfigKeySuccess: { data: {} },
  getConfigKeyFailure: { error: null },

  setPageOptions: { pageOptions: [] },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.POPUP.NEW}_` });
