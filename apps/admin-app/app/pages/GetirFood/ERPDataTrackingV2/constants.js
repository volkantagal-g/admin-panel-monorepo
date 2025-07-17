import moment from 'moment';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';

export const MAX_DATE_RANGE_IN_DAYS = 30;
export const INITIAL_DATE_RANGE = [moment(), moment()];
export const INITIAL_PAGINATION = { currentPage: 1, rowsPerPage: 10 };
export const SUMMARY_INITIAL_FILTERS = { dateRange: INITIAL_DATE_RANGE };
export const FAILED_INITIAL_FILTERS = { dateRange: INITIAL_DATE_RANGE, ...INITIAL_PAGINATION };
export const SUCCESSFUL_INITIAL_FILTERS = { dateRange: INITIAL_DATE_RANGE, ...INITIAL_PAGINATION };

export const SUCCESSFUL_JSON_MODAL_TYPE = {
  REQUEST: 'request',
  RESPONSE: 'response',
};

export const SUCCESSFUL_JSON_MODAL_TITLE_KEYS = {
  [SUCCESSFUL_JSON_MODAL_TYPE.REQUEST]: 'SUCCESSFUL.TABLE.REQUEST',
  [SUCCESSFUL_JSON_MODAL_TYPE.RESPONSE]: 'SUCCESSFUL.TABLE.RESPONSE',
};

export const ORDER_TYPES_STRING = {
  0: { tr: 'Ödenmemiş', en: 'Not Paid' },
  2: { tr: 'Ödenmiş', en: 'Paid' },
  5: { tr: 'İade', en: 'Refund' },
  6: { tr: 'Parçalı İade', en: 'Partial Refund' },
  8: { tr: 'Kapıda Ödeme', en: 'On Delivery Payment' },
  1500: { tr: 'İptal', en: 'Cancelled' },
  1700: { tr: 'Müdavim Ücreti', en: 'Loyalty Fee' },
  1800: { tr: 'Manuel', en: 'Manual' },
};

export const typeOptions = convertConstantValuesToSelectOptions(ORDER_TYPES_STRING);

export const TAB_ITEMS = { SUMMARY: 'summary', FAILED: 'failed', SUCCESSFUL: 'successful' };
