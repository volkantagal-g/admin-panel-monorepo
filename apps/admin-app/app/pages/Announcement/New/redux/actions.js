import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  announcementSaveRequest: { body: {} },
  announcementSaveSuccess: { data: [] },
  announcementSaveFailure: { error: null },

  uploadFilesToS3Request: { content: {}, onUploadSuccess: null, fileStateKey: null },
  uploadFilesToS3Success: { file: {}, fileStateKey: null },
  uploadFilesToS3Failure: { error: null, fileStateKey: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.ANNOUNCEMENT.NEW}_` });
