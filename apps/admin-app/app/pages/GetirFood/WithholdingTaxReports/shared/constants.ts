export const TAB_ITEMS = {
  SIMPLE_PROCEDURE: 'simple_procedure',
  INDIVIDUAL: 'individual',
  CORPORATE: 'corporate',
};

export enum COMMERCIAL_COMPANY_TYPES {
  INDIVIDUAL = 1, // Personal
  CORPORATE = 2, // Corporate
  SIMPLE_PROCEDURE = 3, // Simple
}

export const VerticalType = {
  Food: 1,
  Locals: 2,
};

export const TAB_TO_COMPANY_TYPE_MAP = {
  [TAB_ITEMS.SIMPLE_PROCEDURE]: COMMERCIAL_COMPANY_TYPES.SIMPLE_PROCEDURE,
  [TAB_ITEMS.INDIVIDUAL]: COMMERCIAL_COMPANY_TYPES.INDIVIDUAL,
  [TAB_ITEMS.CORPORATE]: COMMERCIAL_COMPANY_TYPES.CORPORATE,
} as const;

export const DEFAULT_PARAMS = {
  tab: TAB_ITEMS.SIMPLE_PROCEDURE,
  page: 1,
  size: 25,
  period: null,
  partnerId: null,
  partnerName: null,
} as const;

export const WITHHOLDING_TAX_REPORT_FILTER_TYPE = {
  ALL: 0,
  INCLUDED: 1,
  NOT_INCLUDED: 2,
  PAYMENT_AT_DOOR: 3,
};

export const FILE_TYPE = {
  XML: 0,
  EXCEL: 1,
};

export const COMMERCIAL_TYPE_MAPPING = {
  [COMMERCIAL_COMPANY_TYPES.SIMPLE_PROCEDURE]: {
    titleKey: 'TABS.SIMPLE_PROCEDURE',
    fields: [
      { labelKey: 'SUMMARY.TOTAL_WITHHOLDING_TAX', valueKey: 'totalWithholdingTax', isCurrency: true },
      { labelKey: 'SUMMARY.PAID_TOTAL_REVENUE_AMOUNT', valueKey: 'paidTotalRevenueAmount', isCurrency: true },
      { labelKey: 'SUMMARY.PARTNER_COUNT', valueKey: 'partnerCount' },
    ],
  },
  [COMMERCIAL_COMPANY_TYPES.INDIVIDUAL]: {
    titleKey: 'TABS.INDIVIDUAL',
    fields: [
      { labelKey: 'SUMMARY.TOTAL_WITHHOLDING_TAX', valueKey: 'totalWithholdingTax', isCurrency: true },
      { labelKey: 'SUMMARY.PAID_TOTAL_REVENUE_AMOUNT', valueKey: 'paidTotalRevenueAmount', isCurrency: true },
      { labelKey: 'SUMMARY.PARTNER_COUNT', valueKey: 'partnerCount' },
    ],
  },
  [COMMERCIAL_COMPANY_TYPES.CORPORATE]: {
    titleKey: 'TABS.CORPORATE',
    fields: [
      { labelKey: 'SUMMARY.TOTAL_WITHHOLDING_TAX', valueKey: 'totalWithholdingTax', isCurrency: true },
      { labelKey: 'SUMMARY.PAID_TOTAL_REVENUE_AMOUNT', valueKey: 'paidTotalRevenueAmount', isCurrency: true },
      { labelKey: 'SUMMARY.PARTNER_COUNT', valueKey: 'partnerCount' },
    ],
  },
};
