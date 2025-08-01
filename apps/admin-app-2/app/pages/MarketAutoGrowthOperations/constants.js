import promoType from '@app/pages/MarketAutoGrowthOperations/assets/img/promo.png';
import warehouse from '@app/pages/MarketAutoGrowthOperations/assets/img/warehouse.png';
import domain from '@app/pages/MarketAutoGrowthOperations/assets/img/domain.png';
import table from '@app/pages/MarketAutoGrowthOperations/assets/img/table.png';
import month from '@app/pages/MarketAutoGrowthOperations/assets/img/month.png';
import year from '@app/pages/MarketAutoGrowthOperations/assets/img/year.png';

export const SELECT_TITLE_ICONS = {
  promoType,
  warehouse,
  domain,
  table,
  month,
  year,
};

export const DOMAIN_TYPES = {
  1: 'GETIR10',
  3: 'GETIRMORE',
  4: 'GETIRWATER',
};

export const ACTION_COLORS = {
  update: 'blue',
  add: 'green',
  delete: 'red',
};

export const CHANGE_TYPE_NAME = {
  UPDATE: 'update',
  ADD: 'add',
  DELETE: 'delete',
};

export const AUTO_TYPES = {
  PROMOSET: 'PROMOSET',
  TARGET: 'TARGET',
  LIMIT: 'LIMIT',
  ACTION: 'ACTION',
  PACKET: 'PACKET',
};

export const AUTO_TYPES_LOG = {
  PROMOSET: 'Promo Set',
  TARGET: 'Target',
  LIMIT: 'Limit',
  ACTION: 'Action',
  PACKET: 'Packet',
};
export const LIMIT_METRICS = {
  CP_PO: 'CMX',
  AANDM: 'A&M PO',
  ORDERSHARE: 'Order Share',
  NR: 'NR PO',
};

export const STATUS = { ACTIVE: 'active', PASSIVE: 'passive' };

export const UK_COUNTRY_CODE = 'UK';
export const GB_COUNTRY_CODE = 'GB';

export const SPECIFIC_AFFECTED = {
  ALL: 'all',
  INPUT_NUMBER: 'inputNumber',
  SET: 'set',
  BUCKET_TYPE: 'bucketType',
};

export const AGG_LIST = {
  AGG1: 'agg1',
  AGG2: 'agg2',
  AGG3: 'agg3',
  AGG4: 'agg4',
  AGG5: 'agg5',
};

export const UPPER_CASE_HOUR_FORMAT = 'HH';
export const UPPER_CASE_HOUR_MINUTE_FORMAT = 'HH:mm';
export const UPPER_CASE_FORMAT = 'YYYY-MM-DD';
export const UPPER_CASE_YEAR_FORMAT = 'YYYY';
export const UPPER_CASE_MONTH_FORMAT = 'MM';
export const UPPER_CASE_DAY_FORMAT = 'DD';

export const REGEX_CP_TARGET = /^[0-9]+(\.\d+)?$/;
export const REGEX_ORDER_TARGET = /^[0-9]*$/;

export const ACTION_COLUMN_DETAIL = [
  { title: 'CHANGE_TYPE', key: 'changeType' },
  { title: 'COUNTRY_CODE', key: 'countryCode' },
  { title: 'DOMAIN_TYPE', key: 'domainType' },
  { title: 'ACTION', key: 'action' },
  { title: 'PACKET', key: 'packet' },
  { title: 'WAREHOUSE_TYPE', key: 'warehouseType' },
  { title: 'DAY_TYPE', key: 'dayType' },
  { title: 'HOUR_TYPE', key: 'hourType' },
];

export const LIMIT_COLUMN_DETAIL = [
  { title: 'CHANGE_TYPE', key: 'changeType' },
  { title: 'COUNTRY_CODE', key: 'countryCode' },
  { title: 'DOMAIN_TYPE', key: 'domainType' },
  { title: 'LIMIT_METRIC', key: 'limitMetric' },
  { title: 'DAY_TYPE', key: 'dayType' },
  { title: 'HOUR_RANGE', key: 'hourRange' },
  { title: 'PROMO_TYPE', key: 'promoType' },
  { title: 'THRESHOLD_TYPE', key: 'thresholdType' },
  { title: 'LIMIT_VALUE', key: 'limitValue' },
  { title: 'WAREHOUSE_TYPE', key: 'warehouseType' },
  { title: 'LIMIT_EFFECT_TYPE', key: 'limitEffectType' },
];
export const TARGET_COLUMN_DETAIL = [
  { title: 'COUNTRY_CODE', key: 'countryCode' },
  { title: 'DOMAIN_TYPE', key: 'domainType' },
  { title: 'DATE', key: 'date' },
  { title: 'DAILY_ORDER_TARGET', key: 'orderTarget' },
  { title: 'DAILY_CMX_TARGET', key: 'cpTarget' },
];

export const PACKET_COLUMN_DETAIL = [
  { title: 'COUNTRY_CODE', key: 'countryCode' },
  { title: 'DOMAIN_TYPE', key: 'domainType' },
  { title: 'ACTIVE', key: 'active' },
  { title: 'PACKET', key: 'packet' },
  { title: 'AFFECTED_BUCKET', key: 'affectedBucket' },
  { title: 'DAY_TYPE', key: 'dayType' },
  { title: 'HOUR_TYPE', key: 'hourType' },
];

export const PROMOSET_COLUMN_DETAIL = [
  { title: 'CHANGE_TYPE', key: 'changeType' },
  { title: 'COUNTRY_CODE', key: 'countryCode' },
  { title: 'DOMAIN_TYPE', key: 'domainType' },
  { title: 'PROMO_TYPE', key: 'promoObjectiveType' },
  { title: 'WAREHOUSE_TYPE', key: 'warehouseType' },
  { title: 'BUCKET_TYPE', key: 'bucketType' },
  { title: 'SET', key: 'set' },
  { title: 'AGG1', key: 'agg1' },
  { title: 'AGG2', key: 'agg2' },
  { title: 'AGG3', key: 'agg3' },
  { title: 'AGG4', key: 'agg4' },
  { title: 'AGG5', key: 'agg5' },
];

export const COLUMN_TYPES = {
  PACKET: 'packet',
  ACTION: 'action',
  ACTIVE: 'active',
  WAREHOUSE_TYPE: 'warehouseType',
  DAY_TYPE: 'dayType',
  HOUR_TYPE: 'hourType',
  LIMIT_METRIC: 'limitMetric',
  THRESHOLD_TYPE: 'thresholdType',
  LIMIT_VALUE: 'limitValue',
  LIMIT_EFFECT_TYPE: 'limitEffectType',
  NEGATIVE: '-',
  POSITIVE: '+',
  CP_TARGET: 'cpTarget',
  ORDER_TARGET: 'orderTarget',
  CHANGE_TYPE: 'changeType',
  PROMO_TYPE: 'promoType',
  IS_UPDATED: 'is_updated',
  IS_BUCKET_NAME_CHANGED: 'isBucketNameChanged',
  HOUR_RANGE: 'hourRange',
};

export const CHANGE_REASON_TITLES = {
  PROMOSET: 'promoset',
  TARGET: 'target',
  LIMIT: 'limit',
  ACTION: 'action',
  PACKET: 'packet',
  ADD_PROMO_GROUP: 'addPromoGroup',
};

export const SET_DIRECTIONS = {
  TOP: 'TOP',
  BOTTOM: 'BOTTOM',
};

export const INVALID_HOUR_RANGE = '0_0';

// This is a random UUID that is used to represent the "All Warehouses" option in the warehouse dropdown.
// It has no relation with any db record or backend enum, just an arbitrary value to not conflict with
// other warehouse options.
export const ALL_WAREHOUSES_OPTION_VALUE = '35188a42-503d-4cd6-8e50-d23dda20812f';
