import moment from 'moment';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';

export const MAX_DATE_RANGE_IN_DAYS = 30;
export const INITIAL_DATE_RANGE = [moment(), moment()];
export const INITIAL_PAGINATION = { currentPage: 1, rowsPerPage: 10 };
export const SUMMARY_INITIAL_FILTERS = { dateRange: INITIAL_DATE_RANGE };
export const FAILED_INITIAL_FILTERS = { dateRange: INITIAL_DATE_RANGE, ...INITIAL_PAGINATION };
export const SUCCESS_INITIAL_FILTERS = { dateRange: INITIAL_DATE_RANGE, ...INITIAL_PAGINATION };

export const SUCCESS_JSON_MODAL_TYPE = {
  REQUEST: 'request',
  RESPONSE: 'response',
};

export const SUCCESS_JSON_MODAL_TITLE_KEYS = {
  [SUCCESS_JSON_MODAL_TYPE.REQUEST]: 'SUCCESS.TABLE.REQUEST',
  [SUCCESS_JSON_MODAL_TYPE.RESPONSE]: 'SUCCESS.TABLE.RESPONSE',
};

export const LOCALS_ORDER_TYPES = {
  0: { tr: 'Ödenmemiş', en: 'Not Paid' },
  2: { tr: 'Ödendi', en: 'Paid' },
  3: { tr: 'Ödeme Hatası', en: 'Payment Error' },
  5: { tr: 'İade', en: 'Refunded' },
  6: { tr: 'Kısmi İade', en: 'Partial Refunded' },
  8: { tr: 'Kapıda Ödeme', en: 'On Delivery Payment' },
  1500: { tr: 'İptal', en: 'Canceled' },
  1600: { tr: 'Kısmen İptal', en: 'Canceled Part' },
};

export const orderTypeOptions = convertConstantValuesToSelectOptions(LOCALS_ORDER_TYPES);

export const TAB_ITEMS = { SUMMARY: 'summary', FAILED: 'failed', SUCCESS: 'success' };

export const MARKETPLACE_FINANCE_DATE_FORMAT = 'DD.MM.YYYY';
export const MARKETPLACE_FINANCE_DATE_FORMAT_WITH_TIME = 'DD.MM.YYYY HH:mm:ss';
