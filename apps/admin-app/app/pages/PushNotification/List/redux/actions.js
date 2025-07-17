import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getResultsRequest: { data: {} },
  getResultsSuccess: { data: [] },
  getResultsFailure: { error: null },
  getPaymentMethods: { data: {} },
  setPaymentMethods: { paymentMethods: [] },
  getPaymentMethodsFailure: { error: null },
  createGlobalRulesetRequest: { data: {} },
  createGlobalRulesetSuccess: { data: {} },
  createGlobalRulesetFailure: { error: null },
  getGlobalRulesetRequest: { data: {} },
  getGlobalRulesetSuccess: { data: {} },
  getGlobalRulesetFailure: { error: null },
  pauseNotificationRequest: { data: {}, filters: {} },
  pauseNotificationSuccess: { data: {} },
  pauseNotificationFailure: { error: null },
  pauseAllNotificationsRequest: {},
  resumeNotificationRequest: { data: {}, filters: {} },
  resumeAllNotificationsRequest: {},
  cancelNotificationRequest: { data: {}, filters: {} },
  duplicateNotificationRequest: { data: {} },
  deleteNotificationRequest: { data: {}, filters: {} },
  downloadSuccessNotificationListRequest: { data: {} },
  downloadSuccessNotificationListSuccess: { data: {} },
  downloadSuccessNotificationListFailure: { error: null },
  setFilters: { data: {} },
  setCities: { cities: [] },
  openDownloadListModal: { data: {} },
  closeDownloadListModal: {},

  // Icon management crud
  getIconsRequest: {},
  getIconsSuccess: { data: [] },
  getIconsFailure: { error: null },

  createIconRequest: { formValues: {}, onSuccess: null },
  createIconSuccess: { icon: {} },
  createIconFailure: { error: null },

  updateIconRequest: { formValues: {}, iconId: null, onSuccess: null },
  updateIconSuccess: { icon: {} },
  updateIconFailure: { error: null },

  deleteIconRequest: { iconId: null },
  deleteIconSuccess: { iconId: {} },
  deleteIconFailure: { error: null },

  uploadIconImageToS3Request: { file: {}, cb: null, isDefault: false },
  uploadIconImageToS3Success: {},
  uploadIconImageToS3Failure: { error: null },

  getDefaultIconUrlRequest: {},
  getDefaultIconUrlSuccess: { url: '' },
  getDefaultIconUrlFailure: { error: null },

  setDefaultIconUrl: { url: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.PUSH_NOTIFICATION.LIST}_` });
