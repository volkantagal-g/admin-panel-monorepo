export const PRECISION_NUMBER_FOR_AMOUNT = 100;
export const DEFAULT_AMOUNT = 0;
export const NON_PROVISION_CARDS_MULTIPLY_AMOUNT = 1.15;

export const STATUS_OPTIONS = [
  {
    label: 'PREPARED',
    value: 'PREPARED',
  },
  {
    label: 'RECEIVED',
    value: 'RECEIVED',
  },
  {
    label: 'INITIALIZED',
    value: 'INITIALIZED',
  },
  {
    label: 'INITIALIZED_3DS1',
    value: 'INITIALIZED_3DS1',
  },
  {
    label: 'INITIALIZED_3DS2',
    value: 'INITIALIZED_3DS2',
  },
  {
    label: 'PENDING',
    value: 'PENDING',
  },
  {
    label: 'PENDING_EXPIRED',
    value: 'PENDING_EXPIRED',
  },
  {
    label: 'VERIFYING',
    value: 'VERIFYING',
  },
  {
    label: 'ERROR',
    value: 'ERROR',
  },
  {
    label: 'REFUSED',
    value: 'REFUSED',
  },
  {
    label: 'PRE_AUTHORIZED',
    value: 'PRE_AUTHORIZED',
  },
  {
    label: 'AUTHORIZE_EXPIRED',
    value: 'AUTHORIZE_EXPIRED',
  },
  {
    label: 'AUTHORIZED',
    value: 'AUTHORIZED',
  },
  {
    label: 'CAPTURED',
    value: 'CAPTURED',
  },
  {
    label: 'REFUND_RECEIVED',
    value: 'REFUND_RECEIVED',
  },
  {
    label: 'REFUND_PROCESSING',
    value: 'REFUND_PROCESSING',
  },
  {
    label: 'REFUND_SCHEDULED',
    value: 'REFUND_SCHEDULED',
  },
  {
    label: 'REFUND_FAILED',
    value: 'REFUND_FAILED',
  },
  {
    label: 'REFUNDED',
    value: 'REFUNDED',
  },
  {
    label: 'CANCEL_RECEIVED',
    value: 'CANCEL_RECEIVED',
  },
  {
    label: 'CANCEL_PROCESSING',
    value: 'CANCEL_PROCESSING',
  },
  {
    label: 'CANCEL_SCHEDULED',
    value: 'CANCEL_SCHEDULED',
  },
  {
    label: 'CANCEL_FAILED',
    value: 'CANCEL_FAILED',
  },
  {
    label: 'CANCELLED',
    value: 'CANCELLED',
  },
  {
    label: 'CHARGE_BACKED',
    value: 'CHARGE_BACKED',
  },
  {
    label: 'CHARGE_BACK_REVERSED',
    value: 'CHARGE_BACK_REVERSED',
  },
  {
    label: 'CAPTURE_FAILED',
    value: 'CAPTURE_FAILED',
  },
];

export const STATUS_TAG_COLOR_MAP = {
  PREPARED: 'blue',
  RECEIVED: 'blue',
  INITIALIZED: 'blue',
  INITIALIZED_3DS1: 'blue',
  INITIALIZED_3DS2: 'blue',
  PENDING: 'yellow',
  PENDING_EXPIRED: 'red',
  VERIFYING: 'blue',
  ERROR: 'red',
  REFUSED: 'red',
  PRE_AUTHORIZED: 'blue',
  AUTHORIZE_EXPIRED: 'red',
  AUTHORIZED: 'green',
  CAPTURED: 'green',
  REFUND_RECEIVED: 'green',
  REFUND_PROCESSING: 'blue',
  REFUND_SCHEDULED: 'blue',
  REFUND_FAILED: 'red',
  REFUNDED: 'green',
  REFUND: 'green',
  CANCEL_RECEIVED: 'yellow',
  CANCEL_PROCESSING: 'blue',
  CANCEL_SCHEDULED: 'blue',
  CANCEL_FAILED: 'red',
  CANCELLED: 'red',
  CHARGE_BACKED: 'red',
  CHARGE_BACK_REVERSED: 'green',
  CAPTURE_FAILED: 'red',
  SUCCESS: 'green',
  PROCESSING: 'yellow',
  FAILED: 'red',
  SCHEDULED: 'orange',
};

export const customIdentifierTypeList = [
  { label: 'Number', value: 'number' },
  { label: 'String', value: 'text' },
  { label: 'Object', value: 'textarea' },
];

export const CUSTOM_DATE_FORMAT = 'DD-MM-YYYY HH:mm:ss';

export const REFUND_REASONS = [
  {
    label: 'RECONCILIATION_FAILURE',
    value: 'Reconciliation Failure',
  },
  {
    label: 'DUPLICATE_PAYMENT',
    value: 'Duplicate Payment',
  },
  {
    label: 'RETURN',
    value: 'Return',
  },
  {
    label: 'OTHER_REASON',
    value: 'Other',
  },
];

export const DEFAULT_STATUS_TAG_COLOR = 'blue';

export const THREE_D_ACTIVE_PROVIDERS = ['adyen'];

export const DEVICE_TYPE_OPTIONS = [
  {
    label: 'iPhone',
    value: 'iPhone',
  },
  {
    label: 'Android',
    value: 'Android',
  },
  {
    label: 'Web',
    value: 'Web',
  },
];
