import { SERVICE_TYPES } from '@app/pages/CommunicationCallbackUrls/constants';

export const serviceTypes = {
  1: {
    en: 'Notification',
    tr: 'Bildirim',
  },
  2: {
    en: 'SMS',
    tr: 'SMS',
  },
  3: {
    en: 'E-Mail',
    tr: 'E-Mail',
  },
};

export const requestErrorReasonOptions = {
  INVALID_PATH_VARIABLE: {
    en: 'İnvalid path variable',
    tr: 'Hatalı url parametresi',
  },
  ENTITY_NOT_FOUND: {
    en: 'Callback Urls Not Found',
    tr: 'Callback Urller Bulunamadı',
  },
  ACCESS_DENIED: {
    en: 'Please change selected country',
    tr: 'Bu bildirimi görebilmek için ülke seçimini değiştirmeniz gerekmektedir',
  },
};

export const statuses = {
  1: {
    en: 'Active',
    tr: 'Aktif',
  },
  2: {
    en: 'Inactive',
    tr: 'İnaktif',
  },
};

export const serviceUrls = {
  communicationCallbackUrlsSave: {
    [SERVICE_TYPES.NOTIF]: '/communicationCallbackUrls/notificationCreate',
    [SERVICE_TYPES.SMS]: '/communicationCallbackUrls/smsCreate',
    [SERVICE_TYPES.EMAIL]: '/communicationCallbackUrls/emailCreate',
  },
  communicationCallbackUrlsUpdate: {
    [SERVICE_TYPES.NOTIF]: '/communicationCallbackUrls/notificationUpdate/',
    [SERVICE_TYPES.SMS]: '/communicationCallbackUrls/smsUpdate/',
    [SERVICE_TYPES.EMAIL]: '/communicationCallbackUrls/emailUpdate/',
  },
  communicationCallbackUrlsGet: {
    [SERVICE_TYPES.NOTIF]: '/communicationCallbackUrls/notificationGet/',
    [SERVICE_TYPES.SMS]: '/communicationCallbackUrls/smsGet/',
    [SERVICE_TYPES.EMAIL]: '/communicationCallbackUrls/emailGet/',
  },
  getResults: {
    [SERVICE_TYPES.NOTIF]: '/communicationCallbackUrls/notificationFilter/',
    [SERVICE_TYPES.SMS]: '/communicationCallbackUrls/smsFilter/',
    [SERVICE_TYPES.EMAIL]: '/communicationCallbackUrls/emailFilter/',
  },
};
