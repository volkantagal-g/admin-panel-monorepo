import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  smsSaveRequest: { body: {} },
  smsSaveSuccess: { data: [] },
  smsSaveFailure: { error: null },

  uploadFilesToS3Request: { file: { base64: null, name: null }, fileStateKey: null },
  uploadFilesToS3Success: { file: {}, fileStateKey: null },
  uploadFilesToS3Failure: { error: null },

  getSmsConfigRequest: { body: {} },
  getSmsConfigSuccess: { data: [] },
  getSmsConfigFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.SMS.NEW}_` });
