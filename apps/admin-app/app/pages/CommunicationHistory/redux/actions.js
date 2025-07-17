import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  setTableFilters: { filters: {}, communicationType: null },
  resetTableFilters: null,

  getResultsRequest: {},
  getResultsSuccess: { data: {} },
  getResultsFailure: { error: null },

  setModalVisibilityRequest: { visibility: null },
  getSignedUrlRequest: { emailId: null },
  getSignedUrlSuccess: { data: {} },
  getSignedUrlFailure: { error: null },

  getSignedUrlHtmlRequest: { signedUrl: null },
  getSignedUrlHtmlSuccess: { data: {} },
  getSignedUrlHtmlFailure: { error: null },

  getNotificationReportConfigsRequest: {},
  getNotificationReportConfigsSuccess: { data: {} },
  getNotificationReportConfigsFailure: { error: null },

  getExportHistoryRequest: { filters: null, communicationType: null },
  getExportHistorySuccess: { data: {} },
  getExportHistoryFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.COMMUNICATION_HISTORY}_` });
