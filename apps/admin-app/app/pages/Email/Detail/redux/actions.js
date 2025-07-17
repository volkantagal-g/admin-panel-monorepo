import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getEmailRequest: { emailId: null },
  getEmailSuccess: { data: {} },
  getEmailFailure: { error: null },

  updateEmailRequest: { id: null, body: {} },
  updateEmailSuccess: { data: [] },
  updateEmailFailure: { error: null },

  uploadFilesToS3Request: { file: { base64: null, name: null }, fileStateKey: null },
  uploadFilesToS3Success: { file: {}, fileStateKey: null },
  uploadFilesToS3Failure: { error: null },

  getSenderInfoFromConfigRequest: { body: null, stateKey: null },
  getSenderInfoFromConfigSuccess: { data: {}, stateKey: null },
  getSenderInfoFromConfigFailure: { error: null },

  getPreviewImageRequest: { designId: null, phoneLanguage: null, emailCampaignId: null, domainType: null },
  getPreviewImageSuccess: { data: {} },
  getPreviewImageFailure: { error: null },

  sendTestEmailRequest: { body: null },
  sendTestEmailSuccess: { data: [] },
  sendTestEmailFailure: { error: null },

  getStatisticsRequest: { emailId: null },
  getStatisticsSuccess: { data: [] },
  getStatisticsFailure: { error: null },

  getTargetAudienceStatisticsRequest: { clientListName: null, clientListType: null, campaignId: null },
  getTargetAudienceStatisticsSuccess: { data: [] },
  getTargetAudienceStatisticsFailure: { error: null },

  getEmailConfigRequest: { body: {} },
  getEmailConfigSuccess: { data: [] },
  getEmailConfigFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.EMAIL.DETAIL}_` });
