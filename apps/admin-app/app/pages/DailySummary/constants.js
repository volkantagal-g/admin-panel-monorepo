import { INTEGRATION_TYPES } from '@shared/shared/constants';

export const INTEGRATION_TYPES_SORT = [
  INTEGRATION_TYPES.GETIR,
  INTEGRATION_TYPES.N11,
  INTEGRATION_TYPES.GORILLAS,
  INTEGRATION_TYPES.JET,
  INTEGRATION_TYPES.UBER,
];

export const DAILY_SUMMARY_DATE_TYPE = {
  YESTERDAY: 'YESTERDAY',
  LAST_WEEK: 'LAST_WEEK',
  LAST_FOUR_WEEKS: 'LAST_FOUR_WEEKS',
};

export const DAILY_SUMMARY_SORT_TYPE = {
  ALPHABETICAL: 'ALPHABETICAL',
  VALUE: 'VALUE',
};

export const CURRENCY_TYPE = {
  USD: 'USD',
  EUR: 'EUR',
  TRY: 'TRY',
  GBP: 'GBP',
};

export const CURRENCY_KEYS = Object.values(CURRENCY_TYPE);

export const PAGE_URL_QUERY_PARAMS = { currency: 'currency' };

// used for changing local date with local datetime into UTC timezoned date
export const DAILY_SUMMARY_DATE_CONVERSION_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';

export const DAILY_SUMMARY_DATE_STEP_UNITS = {
  days: 'days',
  months: 'months',
};

export const MIN_MAX_DATE_COUNT = {
  min: 1,
  max: 100,
};

export const DEFAULT_DATE_COUNT = 13;

export const BASE_DATE_FORMAT = 'D/M';

export const BAD_KEYS_FOR_GETIR_JOBS = ['null', null, 'undefined', undefined];

export const COMMON_RESTRICTED_ROW_KEYS = ['null', null, 'undefined', undefined];

export const BAD_KEYS_SET_FOR_ROW_DATA = new Set(['null', null, 'undefined', undefined]);

export const GETIR_N11_SOURCE_TYPE = {
  N11: 'n11',
  GETIR: 'Getir',
  N11_QUICK: 'n11cabuk',
};

export const SOURCE_COLORS_BY_SOURCE_TYPE_FOR_GETIR_11 = {
  N11: '#ea2230',
  GETIR: '#5d3ebc',
  N11_QUICK: '#58666E',
};

export const GETIR_N11_TRAFFIC_SOURCE = {
  APP: 'App',
  MWEB: 'MWEB', // mobile web,
  WEB: 'WEB',
};

export const DECIMAL_COUNT_BY_CURRENCY = {
  [CURRENCY_TYPE.TRY]: { minDecimal: 0, maxDecimal: 0 },
  [CURRENCY_TYPE.USD]: { minDecimal: 2, maxDecimal: 2 },
  [CURRENCY_TYPE.EUR]: { minDecimal: 2, maxDecimal: 2 },
  [CURRENCY_TYPE.GBP]: { minDecimal: 2, maxDecimal: 2 },
};

export const GETIR_FINANCIALS_DOMAIN_TYPES = {
  getir10: 1,
  getirFood: 2,
  getir30: 3,
  getirVoyager: 4,
  getirLocals: 6,
  getirBiTaksi: 7,
  getirWaterMarketplace: 8,
};
