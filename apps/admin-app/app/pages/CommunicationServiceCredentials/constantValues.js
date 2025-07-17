import { PROVIDER_TYPE } from '@app/pages/CommunicationServiceCredentials/constants';

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
    en: 'Credentials Not Found',
    tr: 'Yetkiler Bulunamadı',
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

export const providersObj = {
  [PROVIDER_TYPE.NET_GSM]: {
    name: 'netgsm',
    label: 'NET_GSM_ACCOUNT',
    preference: 'netgsmAccountPreference',
    dependentComponentName: 'netgsmHeader',
    dependentComponentLabel: 'HEADERS',
    key: 'header',
    defaultValue: 'GETIR_COMMON',
    defaultDependentValue: 'GETIRBTKSI',
  },
  [PROVIDER_TYPE.MOBILE_DEV]: {
    name: 'mobildev',
    label: 'MOBIL_DEV_ACCOUNT',
    preference: 'mobildevAccountPreference',
    dependentComponentName: 'mobildevHeader',
    dependentComponentLabel: 'HEADERS',
    key: 'header',
    defaultValue: 'GETIR_COMMON',
    defaultDependentValue: 'GetirCarsi',
  },
  [PROVIDER_TYPE.NEXMO]: {
    name: 'nexmo',
    label: 'NEXMO_ACCOUNT',
    preference: 'nexmoAccountPreference',
    dependentComponentName: 'nexmoHeader',
    dependentComponentLabel: 'HEADERS',
    key: 'header',
    defaultValue: 'GETIR_COMMON',
    defaultDependentValue: 'GetirFood',
  },
  [PROVIDER_TYPE.TWILIO]: {
    name: 'twilio',
    label: 'TWILIO_ACCOUNT',
    preference: 'twilioAccountPreference',
    defaultValue: 'GETIR_TXN',
  },
};
