import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getTransactionalNotificationRequest: { transactionalNotificationId: null, clientLanguage: null },
  getTransactionalNotificationSuccess: { data: {} },
  getTransactionalNotificationFailure: { error: null },

  updateTransactionalNotificationRequest: { id: null, body: null, clientLanguage: null },
  updateTransactionalNotificationSuccess: { data: [] },
  updateTransactionalNotificationFailure: { error: null },

  getS3SignedImageUrlRequest: {
    loadedImage: null,
    file: null,
    isAppliedToOtherLanguanges: false,
    fileLang: null,
    onUploadSuccess: null,
  },

  getS3SignedImageUrlSuccess: { cdnUrl: null, fileLang: null },
  getS3SignedImageUrlFailure: { error: null },

  getConfigRequest: { clientLanguage: null },
  getConfigSuccess: { data: {} },
  getConfigFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.TRANSACTIONAL_NOTIFICATION.NEW}_` });
