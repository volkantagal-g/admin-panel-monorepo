import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getAnnouncementRequest: { announcementId: null },
  getAnnouncementSuccess: { data: {} },
  getAnnouncementFailure: { error: null },

  updateAnnouncementRequest: { id: null, body: null },
  updateAnnouncementSuccess: { data: [] },
  updateAnnouncementFailure: { error: null },

  uploadFilesToS3Request: { content: {}, fileStateKey: null, onUploadSuccess: null },
  uploadFilesToS3Success: { file: {}, fileStateKey: null },
  uploadFilesToS3Failure: { error: null, fileStateKey: null },

  setPageOptions: { pageOptions: [] },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.NOTIFICATION_CENTER.NEW}_` });
