import moment from 'moment';

import { getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';
import { t } from '@shared/i18n';
import { PAGE_TYPES } from '@shared/constants/marketing/pageTypes';

import {
  NormalizeAnnouncementFormValues,
  NormalizeBannerFormValues,
  NormalizeNotificationCenterFormValues,
  NormalizePopupFormValues,
  NormalizePushNotificationFormValues,
} from '@shared/utils/marketing/normalizers';

import {
  initializeAnnouncementFormValues,
  initializeBannerFormValues,
  initializeNotificationCenterFormValues,
  initializePopupFormValues,
  initializePushNotificationFormValues,
  initializeAnnouncementDetailFormValues,
  initializeBannerDetailFormValues,
  initializeNotificationCenterDetailFormValues,
  initializePopupDetailFormValues,
  initializePushNotificationDetailFormValues,
} from '@shared/utils/marketing/initializers';

export function normalizeFormValues(values, type) {
  const normalizerMap = {
    [PAGE_TYPES.ANNOUNCEMENT_NEW]: NormalizeAnnouncementFormValues,
    [PAGE_TYPES.ANNOUNCEMENT_DETAIL]: NormalizeAnnouncementFormValues,
    [PAGE_TYPES.BANNER_NEW]: NormalizeBannerFormValues,
    [PAGE_TYPES.BANNER_DETAIL]: NormalizeBannerFormValues,
    [PAGE_TYPES.POPUP_NEW]: NormalizePopupFormValues,
    [PAGE_TYPES.POPUP_DETAIL]: NormalizePopupFormValues,
    [PAGE_TYPES.PUSH_NOTIFICATION_NEW]: NormalizePushNotificationFormValues,
    [PAGE_TYPES.PUSH_NOTIFICATION_DETAIL]: NormalizePushNotificationFormValues,
    [PAGE_TYPES.NOTIFICATION_NEW]: NormalizeNotificationCenterFormValues,
    [PAGE_TYPES.NOTIFICATION_DETAIL]: NormalizeNotificationCenterFormValues,
  };

  const normalize = normalizerMap[type];
  return normalize ? normalize(values, type) : { ...values };
}

export const rules = {
  // General Rules
  requiredArray: [{ required: true, message: t('error:REQUIRED'), type: 'array' }],
  onlyRequired: [{ required: true, message: t('error:REQUIRED') }],
  totalOrderCountControlRequired: [{ required: true, message: t('error:ONE_FIELD_REQUIRED') }],
  // General Information Rules
  responsibleDepartmentRule: [],
  targetCitiesRule: [],
  // Content Rules
  phoneLanguageRule: [{ required: true, message: t('error:REQUIRED'), type: 'array' }],
  titleRule: [{ required: true, message: t('error:REQUIRED') }],
  messageRule: [{ required: true, message: t('error:REQUIRED') }],
  // Sending Information Rules
  validDatesRule: [{ required: true, message: t('error:REQUIRED') }],
};

export const formatDate = date => {
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  const selectedCountryPrimaryTimeZone = getSelectedCountryTimeZones()[0]?.timezone;
  return moment(moment.utc(date).tz(selectedCountryPrimaryTimeZone).format(dateFormat));
};

export function getInitialValues(type, values) {
  const initializerMap = {
    [PAGE_TYPES.ANNOUNCEMENT_NEW]: initializeAnnouncementFormValues,
    [PAGE_TYPES.ANNOUNCEMENT_DETAIL]: initializeAnnouncementDetailFormValues,
    [PAGE_TYPES.BANNER_NEW]: initializeBannerFormValues,
    [PAGE_TYPES.BANNER_DETAIL]: initializeBannerDetailFormValues,
    [PAGE_TYPES.NOTIFICATION_NEW]: initializeNotificationCenterFormValues,
    [PAGE_TYPES.NOTIFICATION_DETAIL]: initializeNotificationCenterDetailFormValues,
    [PAGE_TYPES.POPUP_NEW]: initializePopupFormValues,
    [PAGE_TYPES.POPUP_DETAIL]: initializePopupDetailFormValues,
    [PAGE_TYPES.PUSH_NOTIFICATION_NEW]: initializePushNotificationFormValues,
    [PAGE_TYPES.PUSH_NOTIFICATION_DETAIL]: initializePushNotificationDetailFormValues,
  };

  const fn = initializerMap[type];
  return fn ? fn(values) : {};
}
