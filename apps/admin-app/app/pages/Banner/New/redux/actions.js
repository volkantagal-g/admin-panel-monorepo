import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  bannerSaveRequest: { body: {} },
  bannerSaveSuccess: { data: [] },
  bannerSaveFailure: { error: null },

  uploadFilesToS3Request: { content: {}, fileStateKey: null, onUploadSuccess: null },
  uploadFilesToS3Success: { file: {}, fileStateKey: null },
  uploadFilesToS3Failure: { error: null, fileStateKey: null },

  setPageOptions: { pageOptions: [] },

  getGameAnimationUrlRequest: { body: {} },
  getGameAnimationUrlSuccess: { data: [] },
  getGameAnimationUrlFailure: { error: null },

  saveGameBannerFlow: { values: {} },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.BANNER.NEW}_` });
