export const INCIDENT_PRIORITIES = {
  WARNING: 1,
  CRITICAL: 2,
};

export const INCIDENT_STATUSES = {
  OPEN: 100,
  CLOSED: 1000,
};

export const CONDITION_STATUSES = {
  ACTIVE: 100,
  INACTIVE: 200,
};

export const CHANNELS = {
  EMAIL: 'email',
  SLACK: 'slack',
};

export const THRESHOLD_OPERATORS_HUMAN_READABLE = {
  ABOVE: 1,
  ABOVE_OR_EQUAL: 2,
  BELOW: 3,
  BELOW_OR_EQUAL: 4,
  EQUAL: 5,
  NOT_EQUAL: 6,
};

export const THRESHOLD_OCCURENCES = {
  IMMEDIATELY: 1,
  AT_LEAST: 2,
};

export const ABSTRACT_COURIER_DOMAIN_TYPES = {
  G10_DEDICATED: 1,
  G30_DEDICATED: 2,
  GW_DEDICATED: 3,
  G10_AND_G30_MERGE: 4,
};

export const SLACK_WORKSPACES = {
  GETIR: 'getir',
  GETIR_DEV: 'getir-auto',
};

export const THRESHOLD_FORMAT = {
  NUMBER: 1,
  PERCENTAGE: 2,
};

export const THRESHOLD_PRIORITY = {
  CRITICAL: 'critical',
  WARNING: 'warning',
};

export const INITIAL_PAGINATION_OBJECT = {
  currentPage: 1,
  rowsPerPage: 10,
};

export const WAREHOUSE_ID_BREAKDOWN_FIELD = 'warehouse_id';

export const INCIDENT_PRIORITY_VALUES: { [x: string]: number } = {
  warning: INCIDENT_PRIORITIES.WARNING,
  critical: INCIDENT_PRIORITIES.CRITICAL,
};

export const incidentConditions = {
  [INCIDENT_PRIORITIES.WARNING]: 'warning',
  [INCIDENT_PRIORITIES.CRITICAL]: 'critical',
};

export const MAX_MINUTE_FOR_TIME_PERIOD = 1800000;

export const FILTER_COMPONENT_FIELDS = {
  WAREHOUSE: 'warehouse',
  CITY: 'city',
  VEHICLE_TYPE: 'vehicleType',
  MARKET_ORDER_STATUS: 'marketOrderStatus',
  ORDER_CHANNEL: 'orderChannel',
  PAYMENT_POS_BANK: 'paymentPosBank',
  MARKET_ORDER_DOMAIN_TYPE: 'marketOrderDomainType',
  COURIER_DOMAIN_TYPE: 'courierDomainType',
  MARKET_ORDER_ERROR_REASON: 'marketOrderErrorReason',
  PAYMENT_METHOD: 'paymentMethod',
};

export const ONE_HOUR_AS_MINUTES = 60;
export const ONE_DAY_AS_MINUTES = 1440;
export const ONE_WEEK_AS_MINUTES = 10080;

export const NOTIFICATION_RECEIVER_LIMIT : number = 10;

export const COMPARE_WITH_PAST_SELECT_OPTIONS = {
  PREVIOUS_HOUR: ONE_HOUR_AS_MINUTES,
  PREVIOUS_DAY: ONE_DAY_AS_MINUTES,
  PREVIOUS_WEEK: ONE_WEEK_AS_MINUTES,
};
