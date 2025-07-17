import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getPopupRequest: { popupId: null },
  getPopupSuccess: { data: {} },
  getPopupFailure: { error: null },

  updatePopupRequest: { popupId: null, data: {} },
  updatePopupSuccess: { popupDetail: {} },
  updatePopupFailure: { error: null },

  getS3SignedImageUrlRequest: {
    loadedImage: null,
    file: null,
    isAppliedToOtherLanguanges: false,
    fileLang: null,
    onUploadSuccess: null,
  },

  getS3SignedImageUrlSuccess: { cdnUrl: null, fileLang: null },
  getS3SignedImageUrlFailure: { error: null },

  setPageOptions: { pageOptions: [] },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.POPUP.DETAIL}_` });
