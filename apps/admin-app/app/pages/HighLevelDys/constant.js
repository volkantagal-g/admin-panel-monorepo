import moment from 'moment';

export const dysStartDate = moment().startOf('day');
export const dysEndDate = moment();

export const DysServiceTypeCode = {
  G10: {
    value: 'G10',
    payloadValue: 1,
  },
  GB: {
    value: 'GB',
    payloadValue: 3,
  },
  GW: {
    value: 'GW',
    payloadValue: 4,
  },
  SC: {
    value: 'SC',
    payloadValue: 8,
  },
  GM: {
    value: 'GM',
    payloadValue: 0,
  },
};

export const BarChartTypeCode = {
  1: {
    translation: {
      tr: 'Getir10',
      en: 'Getir10',
    },
    color: '#5D3EBC',
  },
  3: {
    translation: {
      tr: 'GetirBüyük',
      en: 'GetirMore',
    },
    color: '#F29B26',
  },
  4: {
    translation: {
      tr: 'GetirSu',
      en: 'GetirWater',
    },
    color: '#00723B',
  },
  8: {
    translation: {

      tr: 'Store Conversion',
      en: 'Store Conversion',
    },
    color: '#4472C4',
  },
  0: {
    translation: {
      tr: 'GetirMarket',
      en: 'GetirMarket',
    },
    color: '#FFD10D',
  },
  99: {
    translation: {
      tr: 'Toplam',
      en: 'Total',
    },
    color: '#0F2C3B',
  },
};

export const DEFAULT_SERVICE_TYPE_SELECT_ITEM = 'G10';
export const DEFAULT_PERFORMANCE_SELECT_ITEM = 'SPS_NEW';

export const DysPerformanceCodes = {
  SPS_NEW: {
    blockedDomains: [4, 8],
    value: 'SPS_NEW',
    payloadValue: 6,
  },
  SPS: {
    blockedDomains: [],
    value: 'SPS',
    payloadValue: 1,
  },
};

export const AVERAGE = 'AVERAGE';

export const metrics = ['dds', 'sts', 'kds', 'dts', 'dys'];

export const tableMetricOrder = ['dys', 'dds', 'sts', 'kds', 'dts'];

export const PREDEFINED_DATE_OPTIONS = t => [
  { label: `1 ${t('global:WEEK')}`, value: 1 },
  { label: `1 ${t('global:MONTH')}`, value: 2 },
  { label: `${t('highLevelDys:TWO_MONTHS')}`, value: 4 },
  { label: `90 ${t('global:DAYS')}`, value: 3 },
];

export const ONE_WEEK_DATE_RANGE = 1;
export const ONE_MONTH_DATE_RANGE = 2;
export const THREE_MONTH_DATE_RANGE = 3;
export const TWO_MONTHS_DATE_RANGE = 4;

export const SELECT_ALL_OPTION = 'SELECT_ALL';
