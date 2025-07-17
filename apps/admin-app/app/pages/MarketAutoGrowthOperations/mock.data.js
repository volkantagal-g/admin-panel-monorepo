export const MOCK_HIGH_LOW_SET = [
  {
    _id: '83',
    set: -2,
  },
  {
    _id: '84',
    set: -1,
  },
  {
    _id: '89',
    set: 4,
  },
];

export const MOCK_FIND_BUCKET_GROUPS_REQUEST = [
  {
    _id: '44',
    bucketType: '5-9',
    set: -2,
  },
  {
    _id: '50',
    bucketType: '10+',
    set: -2,
  },
  {
    _id: '57',
    bucketType: '20+',
    set: 0,
  },
];

export const MOCK_FIND_BUCKET_GROUPS_RESPONSE = {
  '5-9': [
    {
      _id: '44',
      bucketType: '5-9',
      set: -2,
    },
  ],
  '10+': [
    {
      _id: '50',
      bucketType: '10+',
      set: -2,
    },
  ],
  '20+': [
    {
      _id: '57',
      bucketType: '20+',
      set: 0,
    },
  ],
};

export const MOCK_VALUES = {
  DOMAIN_TYPE: 'Domain Type',
  WAREHOUSE_TYPE: 'Warehouse Type',
  PROMO_TYPE: 'Promo Type',
  SIDEBAR: 'Auto Growth',
  TITLE: 'Market Auto Growth Operations Tool Settings',
  SET: 'Set',
  DAILY_ORDER: 'Daily Order',
  TARGET: 'Target',
  DAILY_CMX: 'Daily CMX',
  PROMO_SET: 'Promo Set',
  PACKET: 'Packet',
  ACTION: 'Actiom',
  LIMIT: 'Limit',
  AGG1: 'Agg1',
  AGG2: 'Agg2',
  AGG3: 'Agg3',
  AGG4: 'Agg4',
  AGG5: 'Agg5',
  CSV_EXPORT: 'CSV Export',
  TARGET_DATE: 'Target Date',
  DAILY_ORDER_TARGET: 'Daily Order Target',
  DAILY_CMX_TARGET: 'Daily CMX Target',
};
