import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getConfigGeneralKeyRequest: { body: null },
  getConfigGeneralKeySuccess: { data: {} },
  getConfigGeneralKeyFailure: { error: null },
  getConfigSplashKeyRequest: { body: null },
  getConfigSplashKeySuccess: { data: {} },
  getConfigSplashKeyFailure: { error: null },
  getConfigOnBoardingKeyRequest: { body: null },
  getConfigOnBoardingKeySuccess: { data: {} },
  getConfigOnBoardingKeyFailure: { error: null },
  uploadConfigJsonFileRequest: {
    data: null,
    langKey: null,
    fileName: null,
    contentType: null,
    folderPath: null,
    bucketName: null,
  },
  uploadConfigJsonFileSuccess: { data: {} },
  uploadConfigJsonFileFailure: { error: null },
  updateConfigKeyRequest: {
    __v: null,
    key: null,
    configType: null,
    isCustomEnabled: null,
    value: null,
  },
  updateConfigKeySuccess: { data: {} },
  updateConfigKeyFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.CONFIG.MOBILE_ANIMATION}_` });
