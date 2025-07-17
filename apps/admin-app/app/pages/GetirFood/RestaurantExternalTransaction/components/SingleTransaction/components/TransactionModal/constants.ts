export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

export const noteItemWrapperCol = {
  xs: { span: 24 },
  sm: { span: 19 },
};

export const NOTE_MAX_LENGTH = 100;
export const NOTE_MIN_ROWS = 3;

export const MIN_AMOUNT = 0;

export const MANUAL_CATEGORIES = {
  CancellationDueToGg: 1,
  DelayDueToGg: 2,
  ErrorsDueToGg: 3,
  CancellationWithoutCsNotice: 4,
  ErrorDueToCs: 5,
  CustomerAddressError: 6,
  ErrorDueToCustomer: 7,
  CommissionError: 8,
  Confiscation: 9,
  Other: 10,
  Fraud: 11,
  Prim: 12,
} as const;

export const MANUAL_CATEGORY_OPTIONS = {
  [MANUAL_CATEGORIES.CancellationDueToGg]: {
    tr: 'GG Kaynaklı İptal',
    en: 'Cancellation Due to GG',
  },
  [MANUAL_CATEGORIES.DelayDueToGg]: {
    tr: 'GG Kaynaklı Gecikme',
    en: 'Latency Due to GG',
  },
  [MANUAL_CATEGORIES.ErrorsDueToGg]: {
    tr: 'GG Kaynaklı Hata',
    en: 'Error Due to GG',
  },
  [MANUAL_CATEGORIES.CancellationWithoutCsNotice]: {
    tr: 'MH Habersiz İptal',
    en: 'Cancellation Without CS Notice',
  },
  [MANUAL_CATEGORIES.ErrorDueToCs]: {
    tr: 'MH Hatası',
    en: 'Error Due to CS',
  },
  [MANUAL_CATEGORIES.CustomerAddressError]: {
    tr: 'Müşteri Adres Hatası',
    en: 'Customer Address Error',
  },
  [MANUAL_CATEGORIES.ErrorDueToCustomer]: {
    tr: 'Müşteri Kaynaklı Hata',
    en: 'Error Due to Customer',
  },
  [MANUAL_CATEGORIES.CommissionError]: {
    tr: 'Komisyon Hataları',
    en: 'Commission Errors',
  },
  [MANUAL_CATEGORIES.Confiscation]: { tr: 'Haciz', en: 'Confiscation' },
  [MANUAL_CATEGORIES.Other]: { tr: 'Diğer', en: 'Other' },
  [MANUAL_CATEGORIES.Fraud]: { tr: 'Fraud', en: 'Fraud' },
  [MANUAL_CATEGORIES.Prim]: { tr: 'Prim', en: 'Bonus' },
} as const;
