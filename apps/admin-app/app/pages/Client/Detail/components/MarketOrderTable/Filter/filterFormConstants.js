import { DatePicker, Select } from 'antd';
import moment from 'moment-timezone';

import { MARKET_ORDER_STATUS } from '@shared/shared/constants';

const { RangePicker } = DatePicker;

const FILTERABLE_GETIR_DOMAIN_TYPES = {
  GETIR10: 1,
  MARKET: 3,
  VOYAGER: 4,
};

export const FORM_CONTANTS = {
  marketDomain: {
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
      label: {
        en: 'Success Orders',
        tr: 'Başarılı Siparişler',
      },
      value: [
        MARKET_ORDER_STATUS.DELIVERED,
        MARKET_ORDER_STATUS.RATED,
      ],
    },
    CANCELED_ORDERS: {
      label: {
        en: 'Canceled Orders',
        tr: 'İptal Siparişler',
      },
      value: [
        MARKET_ORDER_STATUS.CANCELED_ADMIN,
        MARKET_ORDER_STATUS.CANCELED_CLIENT,
        MARKET_ORDER_STATUS.CANCELED_STAFF,
        MARKET_ORDER_STATUS.CANCELED_SYSTEM,
        MARKET_ORDER_STATUS.CANCELED_COURIER,
      ],
    },
    ACTIVE_ORDERS: {
      label: {
        en: 'Active Orders',
        tr: 'Aktif Siparişler',
      },
      value: [
        MARKET_ORDER_STATUS.WAITING_FOR_PICKER,
        MARKET_ORDER_STATUS.VERIFYING,
        MARKET_ORDER_STATUS.PREPARING,
        MARKET_ORDER_STATUS.PREPARED,
        MARKET_ORDER_STATUS.HANDOVER,
        MARKET_ORDER_STATUS.ONWAY,
        MARKET_ORDER_STATUS.REACHED,
      ],
    },
    NOT_INVOICED: {
      label: {
        en: 'Not Invoiced',
        tr: 'Faturalanmamış',
      },
      value: [
        MARKET_ORDER_STATUS.INCOMPLETE,
        MARKET_ORDER_STATUS.ABORTED,
      ],
    },
    OTHER_ORDERS: {
      label: {
        en: 'Other Orders',
        tr: 'Diğer Siparişler',
      },
      value: [
        MARKET_ORDER_STATUS.BROWSING,
      ],
    },
  },
};

const getCities = (cities, langKey) => {
  return cities?.map(city => ({ value: city._id, label: city?.name?.[langKey] }));
};

const getDomainTypes = t => (
  Object.keys(FILTERABLE_GETIR_DOMAIN_TYPES).map(domain => ({
    value: FILTERABLE_GETIR_DOMAIN_TYPES[domain],
    label: t(`global:GETIR_MARKET_DOMAIN_TYPES.${FILTERABLE_GETIR_DOMAIN_TYPES[domain]}`),
  }))
);

const getStatuses = (statuses, langKey) => (
  Object.keys(statuses).map(key => ({ value: key, label: statuses[key]?.label[langKey] }))
);

export const FILTER_FORM = ({ t, langKey, cities }) => ({
  DATE_RANGE: {
    name: 'dateRange',
    placeholder: t('global:DATE'),
    component: RangePicker,
    className: 'w-100',
    allowClear: false,
    disabledDate: current => current > moment().endOf('d'),
  },
  DOMAIN_TYPE: {
    name: 'domainType',
    placeholder: t('DOMAIN_TYPE'),
    component: Select,
    options: getDomainTypes(t),
  },
  CITY: {
    name: 'city',
    placeholder: t('global:CITY'),
    component: Select,
    options: getCities(cities, langKey),
    allowClear: true,
    showSearch: true,
    filterOption: (input, option) => (
      option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
    ),
  },
  STATUS: {
    name: 'statuses',
    placeholder: t('STATUS'),
    allowClear: true,
    component: Select,
    options: getStatuses(FORM_CONTANTS.orderStatuses, langKey),
  },
});
