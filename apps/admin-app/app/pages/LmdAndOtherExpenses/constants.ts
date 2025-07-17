export enum EXPENSE_TYPE {
  LMD_COST = 'LMD_COST',
  LOGISTIC_COST = 'LOGISTIC_COST',
  OTHER_COST = 'OTHER_COST',
}

export const GetirDomainTypes: {[key: string]: number} = {
  Getir10: 1,
  GetirFood: 2,
  GetirMore: 3,
  GetirWater: 4,
  GetirLocals: 6,
  GetirWaterMarketplace: 8,
};

export const LmdCostCSVHeaders = [
  'month',
  'year',
  'domain',
  'warehouse_id',
  'lmd_cost',
];

export const LogisticCostCSVHeaders = [
  'month',
  'year',
  'domain',
  'warehouse_id',
  'logistic_cost',
];

export const OtherCostCSVHeaders = [
  'month',
  'year',
  'domain',
  'other_revenue',
  'total_marketing_expense',
  'marketing_cost_atl',
  'marketing_cost_digital',
];

export const ExampleCSVData = {
  lmdCostExampleCSVData: [
    {
      month: 3,
      year: 2024,
      domain: 'Getir10',
      warehouse_id: '5db69a0b40168d5d12f4da17',
      lmd_cost: 86.99,
    },
    {
      month: 3,
      year: 2024,
      domain: 'GetirMore',
      warehouse_id: '5db69a0b40168d5d12f4da17',
      lmd_cost: 876.99,
    },
    {
      month: 3,
      year: 2024,
      domain: 'GetirFood',
      warehouse_id: '5dcafe95e2c61b1e52cf170b',
      lmd_cost: 186.99,
    },
    {
      month: 3,
      year: 2024,
      domain: 'GetirLocals',
      warehouse_id: '5dcafe95e2c61b1e52cf170b',
      lmd_cost: 86.9999,
    },
    {
      month: 3,
      year: 2024,
      domain: 'GetirWater',
      warehouse_id: '5dcafe95e2c61b1e52cf170b',
      lmd_cost: 73.992,
    },
  ],
  logisticCostExampleCSVData: [
    {
      month: 2,
      year: 2024,
      domain: 'Getir10',
      warehouse_id: '5dcafe95e2c61b1e52cf170b',
      logistic_cost: 86.99,
    },
    {
      month: 2,
      year: 2024,
      domain: 'GetirMore',
      warehouse_id: '5dcafe95e2c61b1e52cf170b',
      logistic_cost: 876.99,
    },
    {
      month: 2,
      year: 2024,
      domain: 'GetirFood',
      warehouse_id: '5dcafe95e2c61b1e52cf170b',
      logistic_cost: 186.99,
    },
    {
      month: 2,
      year: 2024,
      domain: 'GetirLocals',
      warehouse_id: '5dbafe4a52caa9ca37603144',
      logistic_cost: 86.9999,
    },
    {
      month: 2,
      year: 2024,
      domain: 'GetirWater',
      warehouse_id: '5dbafe4a52caa9ca37603144',
      logistic_cost: 73.992,
    }],
  otherCostExampleCSVData: [
    {
      month: 1,
      year: 2024,
      domain: 'Getir10',
      other_revenue: 186.99,
      total_marketing_expense: 26.99,
      marketing_cost_atl: 36.99,
      marketing_cost_digital: 46.99,
    },
    {
      month: 1,
      year: 2024,
      domain: 'GetirMore',
      other_revenue: 1355.99,
      total_marketing_expense: 1234.99,
      marketing_cost_atl: 2321.99,
      marketing_cost_digital: 1234.99,
    },
    {
      month: 1,
      year: 2024,
      domain: 'GetirLocals',
      other_revenue: 19.99,
      total_marketing_expense: 28.99,
      marketing_cost_atl: 8213.324223,
      marketing_cost_digital: 1231.213,
    },
    {
      month: 1,
      year: 2024,
      domain: 'GetirFood',
      other_revenue: 86.99,
      total_marketing_expense: 12386.15,
      marketing_cost_atl: 8236.463252,
      marketing_cost_digital: 81546.23,
    },
    {
      month: 1,
      year: 2024,
      domain: 'GetirWater',
      other_revenue: 1542.99,
      total_marketing_expense: 4386.23,
      marketing_cost_atl: 8656.123219,
      marketing_cost_digital: 1235.912419,
    },
    {
      month: 1,
      year: 2024,
      domain: 'GetirWaterMarketplace',
      other_revenue: 152.99,
      total_marketing_expense: 48.23,
      marketing_cost_atl: 656.1239,
      marketing_cost_digital: 125.9129,
    },
  ],
};
