import { Input, Select } from 'antd';

import { t } from '@shared/i18n';
import { getCountryOptions } from '@app/pages/PushNotification/List/utils';
import { GETIR_DOMAIN_TYPE_CODES } from '@shared/shared/constants';
import DeliveryTime from '../DeliveryTime';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { notificationDomainType } from '@shared/shared/constantValues';
import { convertNotificationDomainTypes } from '@app/pages/PushNotification/utils';

export const isNumberKey = event => event.key.length > 1 || !!event.key.match(/^\d*$/);

const setIfNumber = event => !isNumberKey(event) && event.preventDefault();

export const DEFAULT_MAX_NOTIF_SEND_PER_MINUTE = 1000;

export const FORM_CONSTANTS = {
  getirArtisanDeliveryTypes: {
    1: {
      en: 'Getir Delivery',
      tr: 'Getir Getirsin',
    },
    2: {
      en: 'Shop Delivery',
      tr: 'İşletme Getirsin',
    },
  },
  getirArtisanTimeTypes: {
    instant: {
      en: 'Instant Order',
      tr: 'Anlık Sipariş',
    },
    scheduled: {
      en: 'Schedule Order',
      tr: 'İleri Tarihli Sipariş',
    },
  },
  getirArtisanDeviceTypes: {
    Web: {
      en: 'Web',
      tr: 'Web',
    },
    Mobile: {
      en: 'Mobile',
      tr: 'Mobil',
    },
  },
  orderStatuses: {
    SUCCESS_ORDERS: {
      en: 'Success Orders',
      tr: 'Başarılı Siparişler',
    },
    CANCELED_ORDERS: {
      en: 'Canceled Orders',
      tr: 'İptal Siparişler',
    },
    ACTIVE_ORDERS: {
      en: 'Active Orders',
      tr: 'Aktif Siparişler',
    },
  },
};

export const marketDomainTypesList = GETIR_DOMAIN_TYPE_CODES.map(tag => {
  const label = t(`global:GETIR_MARKET_DOMAIN_TYPES:${tag}`);
  const value = tag;
  return { label, value };
});

export const getTimezoneOptions = (timezones = []) => {
  return timezones.map(tz => ({ value: tz.timezone, label: tz.timezone }));
};

const hoursOptions = [...Array(24)].map((_, index) => ['00', '15', '30', '45'].map(suffix => ({
  value: index < 10 ? `-0${index}:${suffix}` : `-${index}:${suffix}`,
  label: index < 10 ? `0${index}:${suffix}` : `${index}:${suffix}`,
}))).flat();

export const FILTER_FORM = ({ langKey, data, disabled = false, countries = [], activeDomainsFromConfig }) => ({
  COUNTRY: {
    name: 'country',
    label: t('global:COUNTRY'),
    placeholder: t('global:COUNTRY'),
    component: Select,
    allowClear: true,
    disabled,
    options: getCountryOptions(countries, langKey),
  },
  DELIVERY_TIME: {
    name: 'deliveryTime',
    defaultValue: {
      startTime: data?.rule?.defaultStartTime || '09:30',
      endTime: data?.rule?.defaultEndTime || '21:30',
    },
    component: DeliveryTime,
    defaultDataValue: data?.rule,
    disabled,
    options: hoursOptions,
  },
  PUSH_CAPS_PER_MINUTE: {
    name: 'defaultMaxNotifSendPerMinutes',
    dataIndex: 'defaultMaxNotifSendPerMinutes',
    component: Input,
    onKeyDown: setIfNumber,
    defaultValue: data?.rule?.defaultMaxNotifSendPerMinutes,
    disabled,
  },
  DAILY_CAP: {
    name: 'dailyLimitPerUser',
    placeholder: 1,
    component: Input,
    onKeyDown: setIfNumber,
    defaultValue: data?.rule?.dailyLimitPerUser || 1,
    disabled,
  },
  DAILY_SERVICE_CAP: {
    name: 'dailyServiceCap',
    component: Input,
    onKeyDown: setIfNumber,
    defaultValue: data?.rule?.dailyServiceCap || 0,
    disabled,
  },
  DAILY_HARD_CAP: {
    name: 'dailyHardCap',
    component: Input,
    onKeyDown: setIfNumber,
    defaultValue: data?.rule?.dailyHardCap || 0,
    disabled,
  },
  SERVICE_CAP: {
    name: 'domainLimitPerUser',
    dataIndex: 'domainLimitPerUser',
    placeholder: 2,
    component: Input,
    onKeyDown: setIfNumber,
    defaultValue: data?.rule?.domainLimitPerUser || 2,
    disabled,
  },
  FREQUENCY_CAP: {
    name: 'dayLimitPerUser',
    dataIndex: 'dayLimitPerUser',
    placeholder: 2,
    component: Input,
    onKeyDown: setIfNumber,
    defaultValue: data?.rule?.dayLimitPerUser || 2,
    disabled,
  },
  SERVICE_SELECTOR: {
    name: 'serviceSelector',
    placeholder: t('SELECT_SERVICE'),
    component: Select,
    allowClear: true,
    options: convertNotificationDomainTypes(
      notificationDomainType,
      activeDomainsFromConfig?.customValue?.[getSelectedCountry()?.code?.alpha2],
    ),
    disabled,
  },
  SERVICE_DELIVERY_TIME: (serviceCode, value) => ({
    name: `domainTypes['service-${serviceCode}']`,
    serviceCode,
    defaultValue: {
      startTime: value?.startTime || '09:30',
      endTime: value?.endTime || '21:30',
    },
    component: DeliveryTime,
    options: hoursOptions,
    disabled,
  }),
  SERVICE_PUSH_CAPS_PER_MINUTE: (service, value) => ({
    name: `domainTypes['service-${service}'][maxNotifSendPerMinutes]`,
    serviceCode: service,
    component: Input,
    defaultValue: value || 1000,
    onKeyDown: setIfNumber,
    disabled,
  }),
});
