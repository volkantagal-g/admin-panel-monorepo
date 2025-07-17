import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getBannerRequest: { bannerId: null },
  getBannerSuccess: { data: {} },
  getBannerFailure: { error: null },

  updateBannerRequest: { id: null, body: null },
  updateBannerSuccess: { data: [] },
  updateBannerFailure: { error: null },

  uploadFilesToS3Request: { content: {}, fileStateKey: null, onUploadSuccess: null },
  uploadFilesToS3Success: { file: {}, fileStateKey: null },
  uploadFilesToS3Failure: { error: null, fileStateKey: null },

  getGameAnimationUrlRequest: { body: {} },
  getGameAnimationUrlSuccess: { data: [] },
  getGameAnimationUrlFailure: { error: null },

  saveGameBannerFlow: { id: '', values: {} },

  setPageOptions: { pageOptions: [] },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.BANNER.NEW}_` });
