import {
  GETIR_10_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
  GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
  GETIR_DRIVE_DOMAIN_TYPE,
} from '@shared/shared/constants';

export const WAREHOUSE_STATS_TYPES = {
  CURRENT: 'current',
  PREVIOUS: 'previous',
};

export const CLIENT_ORDER_COUNTS_GROUPS = [
  {
    min: 1,
    max: 1,
    key: '1',
  },
  {
    min: 2,
    max: 2,
    key: '2',
  },
  {
    min: 3,
    max: 3,
    key: '3',
  },
  {
    min: 4,
    max: 5,
    key: '4-5',
  },
  {
    min: 6,
    max: 9,
    key: '6-9',
  },
  {
    min: 10,
    max: Number.MAX_SAFE_INTEGER,
    key: '10+',
  },
];

export const NPS_MIN_ACCEPTABLE_SURVEY_COUNT = 30;

export const NPS_ENABLED_DOMAIN_TYPES = [
  GETIR_10_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
  GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
  GETIR_DRIVE_DOMAIN_TYPE,
];
