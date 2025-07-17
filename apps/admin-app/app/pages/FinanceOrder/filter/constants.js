export const ALL_OPTION_KEY = 'ALL';

export const FILTER_DOMAINS = [
  { name: ALL_OPTION_KEY, trans: { en: 'All', tr: 'Hepsi' } },
  { name: 'CUSTOMER_TEAM', trans: { en: 'Customer', tr: 'Müşteri' } },
  { name: 'CARD_TEAM', trans: { en: 'Card', tr: 'Kart' } },
  { name: 'ONBOARDING_TEAM', trans: { en: 'Onboarding', tr: 'Onboarding' } },
];

export const FILTER_STATUSES = [
  {
    name: 'all',
    codes: ['900', '1000', '1100', '1200', '1300', '1400', '1500', '300', '350', '375', '400', '500', '550', '600', '650', '700', '775', '750', '800'],
    trans: { en: 'All', tr: 'Hepsi' },
  },
  {
    name: 'success',
    codes: ['900'],
    trans: { en: 'Success Orders', tr: 'Başarılı Siparişler' },
  }, {
    name: 'cancel',
    codes: ['1000', '1100', '1200', '1300', '1400', '1500'],
    trans: { en: 'Canceled Orders', tr: 'İptal Siparişler' },
  }, {
    name: 'active',
    codes: ['350', '375', '400', '500', '550', '600', '650', '700', '775', '750', '800'],
    trans: { en: 'Active Orders', tr: 'Aktif Siparişler' },
  }];

export const DEFAULT_ROWS_PER_PAGE = 10;

export const DEFAULT_FILTERS = {
  page: 1,
  size: 10,
  domainTypes: '',
  startCheckoutDate: '',
  endCheckoutDate: '',
  status: '',
  orderId: '',
  fullName: '',
  warehouseId: '',
  barcode: '',
  phoneNumber: '',
};

export const MAX_NAME_SURNAME_LENGTH = 255;

export const MAX_DELIVERY_MINUTE = 45;
