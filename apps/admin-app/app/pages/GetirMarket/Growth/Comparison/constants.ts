export const START_DATE_RANGE = 'startDateRange';
export const END_DATE_RANGE = 'endDateRange';

export const CLIENT_ORDER_COUNTS_GROWTH_COMPARISON_GROUPS = [
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
    max: 49,
    key: '10-49',
  },
  {
    min: 50,
    max: 99,
    key: '50-99',
  },
  {
    min: 100,
    max: Number.MAX_SAFE_INTEGER,
    key: '100+',
  },
] as const;
