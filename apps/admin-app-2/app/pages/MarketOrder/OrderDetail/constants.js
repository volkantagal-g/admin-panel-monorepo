import { CLIENT_FEEDBACK_SOURCE_TYPE_WAREHOUSE } from '@shared/shared/constants';

export const MARKET_ORDER_FEEDBACK_SOURCE = [
  { en: 'Telephone', tr: 'Telefon', id: 1, key: 'TELEPHONE' },
  { en: 'Mail', tr: 'Mail', id: 2, key: 'MAIL' },
  { en: 'Warehouse', tr: 'Depo', id: CLIENT_FEEDBACK_SOURCE_TYPE_WAREHOUSE, key: 'WAREHOUSE' },
  { en: 'Chat', tr: 'Chat', id: 5, key: 'CHAT' },
  { en: 'Social Media', tr: 'Sosyal Medya', id: 6, key: 'SOCIAL_MEDIA' },
  { en: 'Other', tr: 'Diğer', id: 3, key: 'OTHER' },
];

export const MAX_DISCOUNT_WARN_CONFIG = {
  key: 'co:customer:WARN_DISCOUNT_AMOUNT',
  type: 'Number',
};

export const MAX_DISCOUNT_AMOUNT = 100;
export const MAX_DISCOUNT_EXPIRY_DAYS = 360;
export const DEFAULT_DISCOUNT_AMOUNT = 1.0;
export const DEFAULT_DISCOUNT_EXPIRY_DAYS = 180;

export const DISCOUNT_OPTIONS = [
  {
    id: 'discount',
    en: 'Add Discount',
    tr: 'İndirim Ekle',
    key: 'ADD_DISCOUNT',
  },
  {
    id: null,
    en: 'None',
    tr: 'Hiçbiri',
    key: 'DISCOUNT_NONE',
  },
];

export const MARKET_ORDER_WHOLE_REFUND_REASONS = [
  {
    tr: 'Eksik Ürün',
    en: 'Missing Product',
    id: 3,
    key: 'MISSING_PRODUCT',
  },
  {
    tr: 'Hasarlı Ürün',
    en: 'Damaged Product',
    id: 4,
    key: 'DAMAGED_PRODUCT',
  },
  {
    tr: 'Yanlış Ürün',
    en: 'Wrong Product',
    id: 6,
    key: 'WRONG_PRODUCT',
  },
  {
    tr: 'SKT Geçti',
    en: 'Best Before Date Passed',
    id: 9,
    key: 'BEST_BEFORE_DATE_PASSED',
  },
  {
    tr: 'Bozuk / Çürük Ürün',
    en: 'Old / Rotten Product',
    id: 10,
    key: 'OLD_ROTTEN_PRODUCT',
  },
  {
    tr: 'Eski Basımlı Yayın',
    en: 'Outdated Magazine / Newspaper',
    id: 11,
    key: 'OUTDATED_MAGAZINE_NEWSPAPER',
  },
  {
    tr: 'Erimiş Ürün',
    en: 'Melted Product',
    id: 12,
    key: 'MELTED_PRODUCT',
  },
  {
    tr: 'Ilık Ürün',
    en: 'Warm Product',
    id: 13,
    key: 'WARM_PRODUCT',
  },
  {
    tr: 'Görünenden Farklı Ürün',
    en: 'Different Looking Product',
    id: 14,
    key: 'DIFFERENT_LOOKING_PRODUCT',
  },
  {
    en: 'Best Before Date Close',
    tr: 'SKT Kapat',
    id: 15,
    key: 'BEST_BEFORE_DATE_CLOSE',
  },
];

export const MARKET_ORDER_REFUND = 'refund';

export const MARKET_ORDER_REFUND_TYPE_MAP = [
  {
    id: MARKET_ORDER_REFUND,
    key: 'REFUND',
    en: 'Refund',
    tr: 'İade Et',
  },
];

export const marketOrderColorCodes = {
  danger: 'danger',
  warning: 'warning',
  success: 'active_contrast',
  primary: 'primary',
};

export const PRODUCT_TYPES = {
  PIECE: 1,
  WEIGHT: 2,
  RECIPE: 3,
  EQUIPMENT: 4,
  BAG: 5,
};

export const PRODUCT_UNITS = {
  KG: 'kg',
  G: 'g',
  PIECE: 'piece',
};

export const PRODUCT_UNITS_LOOKUP = {
  1: PRODUCT_UNITS.PIECE,
  2: PRODUCT_UNITS.KG,
  3: PRODUCT_UNITS.G,
};

const PRODUCT_UNITS_TO_ENUM_LOOKUP = Object.fromEntries(
  Object.keys(PRODUCT_UNITS_LOOKUP).map(unit => [
    PRODUCT_UNITS_LOOKUP[unit],
    parseInt(unit, 10),
  ]),
);

export const FRESH_PRODUCT_UNIT_CONVERT_CALCULATION_LOOKUP = {
  [PRODUCT_UNITS_TO_ENUM_LOOKUP[PRODUCT_UNITS.G]]: [
    {
      targetUnit: PRODUCT_UNITS_TO_ENUM_LOOKUP[PRODUCT_UNITS.G],
      value: 1,
    },
    {
      targetUnit: PRODUCT_UNITS_TO_ENUM_LOOKUP[PRODUCT_UNITS.KG],
      value: 1000,
    },
  ],
  [PRODUCT_UNITS_TO_ENUM_LOOKUP[PRODUCT_UNITS.KG]]: [
    {
      targetUnit: PRODUCT_UNITS_TO_ENUM_LOOKUP[PRODUCT_UNITS.KG],
      value: 1,
    },
    {
      targetUnit: PRODUCT_UNITS_TO_ENUM_LOOKUP[PRODUCT_UNITS.G],
      value: 1 / 1000,
    },
  ],
};

export const marketOrderFeedbackSourceMap = (key = 'key') => MARKET_ORDER_FEEDBACK_SOURCE.reduce(
  (sourceMap, source) => ({
    ...sourceMap,
    [source?.[key]]: source,
  }),
  {},
);

export const marketOrderActions = {
  cancel: 'cancel',
  refund: 'refund',
  discount: 'discount',
};

export const dateFeedbackReasonIds = {
  BEST_BEFORE_DATE_PASSED: 9,
  BEST_BEFORE_DATE_CLOSE: 47,
};

export const MISSING_WRONG_PRODUCT_ID = 1;
export const MISSING_PRODUCT_ID = 3;

export const INTEGRATION_CHANNELS = { salesforce: 'salesforce' };
