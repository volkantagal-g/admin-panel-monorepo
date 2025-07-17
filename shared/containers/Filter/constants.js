import { GETIR_MARKET_DOMAIN_TYPES, DOMAIN_TYPES_WITHOUT_WAREHOUSES, ALL_DOMAIN_TYPES, DATE_TYPE } from '@shared/shared/constants';
import { getInitialDateRanges, getInitialEndDate } from './utils';

export const FILTER_CONSTANTS = {
  COLLAPSE_TITLE: 'FILTER',
  PANEL_KEY: 'filter',
};

export const ERROR_MESSAGES = { INVALID_DEFAULT_DOMAIN_TYPE: 'INVALID_DEFAULT_DOMAIN_TYPE' };

export const MAX_TAG_COUNT_ON_SELECT_INPUT = 4;

export const defaultValues = {
  SELECTED_CITY: null,
  SELECTED_CITIES: [],
  SELECTED_DOMAIN_TYPE: null,
  SELECTED_DOMAIN_TYPES: [],
  SELECTED_HOUR_RANGE: [0, 24],
  SELECTED_DATE_RANGE: getInitialDateRanges(),
  SELECTED_DATE: getInitialEndDate(),
  DATE_TYPE: DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_HOUR,
};

export const radioButtonOptionDateTypes = [
  DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_HOUR,
  DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_DAY,
  DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_WEEK,
];

export const radioButtonOptionDateDiffs = {
  last7Days: 7,
  yesterday: 1,
  today: 0,
};

export const domainTypeList = {
  market: GETIR_MARKET_DOMAIN_TYPES,
  withoutWarehouses: DOMAIN_TYPES_WITHOUT_WAREHOUSES,
  all: ALL_DOMAIN_TYPES,
};
