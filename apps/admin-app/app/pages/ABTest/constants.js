import { TAG_COLORS } from '@shared/shared/constants';

export const CSV_UPLOAD_TEST_TYPE = 0;
export const TEMPLATE_TEST_TYPE = 1;
export const TEST_TYPES = {
  CSV_UPLOAD: 0,
  CLIENT_LIST_TEMPLATE: 1,
};
export const MAX_VARIATIONS_COUNT = 9;
export const VARIATIONS_PERCENTAGE_THRESHOLD = 2;
export const MIN_SEARCH_INPUT_LENGTH = 3;
export const ERROR_CODE_DUPLICATE_KEY = 'DUPLICATE_KEY_ERROR';

export const TEST_STATUSES = {
  IN_PROG: 100,
  READY: 200,
  FAILED: 300,
};

export const CSV_UPLOAD_TEST_TYPE_MIN_FILE_SIZE = 2;
export const MIN_VARIATIONS_COUNT = 2;

export const TEST_STATUS_COLOR_MAP = {
  [TEST_STATUSES.IN_PROG]: TAG_COLORS.default,
  [TEST_STATUSES.READY]: TAG_COLORS.success,
  [TEST_STATUSES.FAILED]: TAG_COLORS.danger,
};
