import { t } from '@shared/i18n';

export const CSV_UPLOAD_TEST_TYPE = 0;
export const TEMPLATE_TEST_TYPE = 1;

export const MAX_VARIATIONS_COUNT = 9;
export const MIN_SEARCH_INPUT_LENGTH = 3;
export const ERROR_CODE_DUPLICATE_KEY = 'DUPLICATE_KEY_ERROR';

export const MIN_HTML_EXPERIMENT_MOTIVATION_LIMIT = 80;
export const MIN_EXPERIMENT_MOTIVATION_LIMIT = 50;

export const TEST_TYPES = {
  BUSINESS: 'Business',
  DATA: 'Data',
  PRODUCT: 'Product',
};

export const TEST_STATUSES = {
  IN_PROG: 1,
  READY: 2,
  CREATING: 3,
  COMPLETED: 4,
  FAILED: 5,
  OUTDATED: 6,
};

export const MESSAGE_WITH_STATUS_CODE = {
  200: t('SUCCESS'),
  400: t('error:DIFFERENT_VALUE_WITH_FIELD_NAME'),
  500: t('ERROR_TITLE'),
};

export const CSV_UPLOAD_TEST_TYPE_MIN_FILE_SIZE = 2;
export const MIN_VARIATIONS_COUNT = 1;

export const TEST_STATUS_COLOR_MAP = {
  [TEST_STATUSES.IN_PROG]: 'primary',
  [TEST_STATUSES.READY]: 'active',
  [TEST_STATUSES.CREATING]: 'secondary',
  [TEST_STATUSES.COMPLETED]: 'inactive',
  [TEST_STATUSES.FAILED]: 'danger',
  [TEST_STATUSES.OUTDATED]: 'inactive',
};
