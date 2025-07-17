import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  emailSaveRequest: { body: {} },
  emailSaveSuccess: { data: [] },
  emailSaveFailure: { error: null },

  uploadFilesToS3Request: { file: { base64: null, name: null }, fileStateKey: null },
  uploadFilesToS3Success: { file: {}, fileStateKey: null },
  uploadFilesToS3Failure: { error: null },

  getSenderInfoFromConfigRequest: { body: null, stateKey: null },
  getSenderInfoFromConfigSuccess: { data: {}, stateKey: null },
  getSenderInfoFromConfigFailure: { error: null },

  getPreviewImageRequest: { designId: null, domainType: null },
  getPreviewImageSuccess: { data: {} },
  getPreviewImageFailure: { error: null },

  getEmailConfigRequest: { body: {} },
  getEmailConfigSuccess: { data: [] },
  getEmailConfigFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.EMAIL.NEW}_` });
