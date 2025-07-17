import moment from 'moment';
import { Input, Select, DatePicker } from 'antd';

import SelectArtisans, { fetchShopsList } from '@app/pages/ArtisanOrder/Filter/components/SelectArtisans';

const { RangePicker } = DatePicker;

export const FORM_CONTANTS = {
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

const convertToOptions = (obj, langKey) => {
  return Object.keys(obj).map(value => ({ value, label: obj[value][langKey] }));
};

const getCities = (cities, langKey) => {
  return Object.keys(cities).map(cityId => ({ value: cityId, label: cities[cityId].name[langKey] }));
};

const getPaymentMethods = (methods, langKey) => {
  return methods.map(method => ({ value: method.type, label: method.name[langKey] }));
};

const dateFormat = 'YYYY-MM-DD';

export const FILTER_FORM = ({ t, langKey, cities, filters, paymentMethods = [] }) => ({
  START_DATE: {
    name: "startDate",
    label: t("DATE"),
    defaultValue: [
      moment(filters.defaultStartDate, dateFormat),
      moment(filters.defaultEndDate, dateFormat),
    ],
    component: RangePicker,
  },
  ARTISAN: { 
    name: "shop",
    label: t("ARTISAN"),
    showSearch: true,
    placeholder: t("ARTISAN"),
    allowClear: true,
    fetchOptions: fetchShopsList,
    component: SelectArtisans,
  },
  STATUS: { 
    name: "status",
    label: t("STATUS"),
    placeholder: t("STATUS"),
    allowClear: true,
    component: Select,
    options: convertToOptions(FORM_CONTANTS.orderStatuses, langKey),
  },
  DELIVERY_TYPE: { 
    name: "deliveryTypes",
    label: t("DELIVERY_TYPE"),
    placeholder: t("DELIVERY_TYPE"),
    component: Select,
    mode: 'multiple',
    options: convertToOptions(FORM_CONTANTS.getirArtisanDeliveryTypes, langKey),
  },
  TIME_TYPE: { 
    name: "timeTypes",
    label: t("TIME_TYPE"),
    placeholder: t("TIME_TYPE"),
    component: Select,
    mode: 'multiple',
    options: convertToOptions(FORM_CONTANTS.getirArtisanTimeTypes, langKey),
  },
  PAYMENT_METHODS: { 
    name: "paymentMethods",
    label: t("PAYMENT_METHOD"),
    placeholder: t("PAYMENT_METHOD"),
    mode: 'multiple',
    options: getPaymentMethods(paymentMethods, langKey),
    component: Select,
  },
  CITY: { 
    name: "city",
    label: t("global:CITY"),
    placeholder: t("global:CITY"),
    component: Select,
    allowClear: true,
    options: getCities(cities, langKey),
  },
  PLATFORM: { 
    name: "platforms",
    label: t("PLATFORM"),
    placeholder: t("PLATFORM"),
    component: Select,
    mode: 'multiple',
    options: convertToOptions(FORM_CONTANTS.getirArtisanDeviceTypes, langKey),
  },
  CONFIRMATION_CODE: { 
    name: "confirmationId",
    label: t("CONFIRMATION_CODE"),
    placeholder: t("CONFIRMATION_CODE"),
    component: Input,
  },
  CHAIN_ORDER_NUMBER: { 
    name: "orderNumber",
    label: t("CHAIN_ORDER_NUMBER"),
    placeholder: t("CHAIN_ORDER_NUMBER"),
    component: Input,
  },
});