export const FOOD_LIVE_MAP_STATS_COLUMNS = [
  'planned',
  'total',
  'free',
  'activeFoodCouriers',
  'activeNonFoodCouriers',
  'busy',
  'utilization',
];

export const DOMAIN_TYPES = {
  1: {
    tr: 'G10',
    en: 'G10',
  },
  2: {
    tr: 'GY Dedike',
    en: 'GF Dedicated',
  },
  3: {
    tr: 'GB',
    en: 'GM',
  },
};

export const DOMAIN_TYPE_LIST = [2, 1, 3];

export const DEFFAULT_TOTAL_STATS = {
  planned: 0,
  total: 0,
  free: 0,
  activeFoodCouriers: 0,
  activeNonFoodCouriers: 0,
  busy: 0,
  utilization: 0,
};
