import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.MENTORSHIP.UPLOAD_PICTURE}_`;

export const { Types, Creators } = createActions({

  getUploadPictureURLRequest: { file: null, callback: null },
  getUploadPictureURLSuccess: { url: null },
  getUploadPictureURLFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix });
