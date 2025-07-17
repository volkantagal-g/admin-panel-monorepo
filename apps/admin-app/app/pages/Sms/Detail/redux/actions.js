import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getSmsRequest: { smsId: null },
  getSmsSuccess: { data: {} },
  getSmsFailure: { error: null },

  updateSmsRequest: { id: null, body: {} },
  updateSmsSuccess: { data: [] },
  updateSmsFailure: { error: null },

  uploadFilesToS3Request: { file: { base64: null, name: null }, fileStateKey: null },
  uploadFilesToS3Success: { file: {}, fileStateKey: null },
  uploadFilesToS3Failure: { error: null },

  sendTestSmsRequest: { id: null, phoneNumbers: [] },
  sendTestSmsSuccess: { data: [] },
  sendTestSmsFailure: { error: null },

  getStatisticsRequest: { smsId: null },
  getStatisticsSuccess: { data: [] },
  getStatisticsFailure: { error: null },

  validateContentRequest: { lang: null, message: null },
  validateContentSuccess: { data: {}, lang: null },
  validateContentFailure: { error: null, lang: null },

  getTargetAudienceStatisticsRequest: { clientListName: null, clientListType: null, campaignId: null },
  getTargetAudienceStatisticsSuccess: { data: [] },
  getTargetAudienceStatisticsFailure: { error: null },

  getSmsConfigRequest: { body: {} },
  getSmsConfigSuccess: { data: [] },
  getSmsConfigFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.SMS.DETAIL}_` });
