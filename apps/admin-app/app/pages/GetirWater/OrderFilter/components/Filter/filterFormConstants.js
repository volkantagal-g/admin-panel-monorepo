import Constants from '@shared/utils/commonConstants';

export const FORM_CONTANTS = {
  getirArtisanTimeTypes: {
    2: {
      en: 'Immediate',
      tr: 'Hemen',
    },
    1: {
      en: 'Scheduled',
      tr: 'İleri Tarihli',
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
    SCHEDULED_ORDERS: {
      en: 'Scheduled Orders',
      tr: 'İleri Tarihli Siparişler',
    },
  },
};

const convertToOptions = (obj, langKey, isNumber = false) => {
  return Object.keys(obj).map(value => ({ value: isNumber ? Number(value) : value, label: obj[value][langKey] }));
};

export const FILTER_FORM = ({ langKey }) => ({
  STATUS: { options: convertToOptions(FORM_CONTANTS.orderStatuses, langKey) },
  TIME_TYPE: { options: convertToOptions(FORM_CONTANTS.getirArtisanTimeTypes, langKey, true) },
});

export const findOrderStatusValues = type => {
  if (type === 'SUCCESS_ORDERS') {
    return {
      statusStart: Constants.WATER_ORDER_STATUS.DELIVERED,
      statusEnd: Constants.WATER_ORDER_STATUS.RATED,
    };
  }
  if (type === 'CANCELED_ORDERS') {
    return {
      statusStart: Constants.WATER_ORDER_STATUS.CANCELED_ADMIN,
      statusEnd: Constants.WATER_ORDER_STATUS.CANCELED_VENDOR,
    };
  }
  if (type === 'ACTIVE_ORDERS') {
    return {
      statusStart: Constants.WATER_ORDER_STATUS.INCOMPLETE,
      statusEnd: Constants.WATER_ORDER_STATUS.REACHED,
    };
  }
  if (type === 'SCHEDULED_ORDERS') {
    return {
      statusStart: Constants.WATER_ORDER_STATUS.SCHEDULED,
      statusEnd: Constants.WATER_ORDER_STATUS.SCHEDULED,
    };
  }

  return undefined;
};
