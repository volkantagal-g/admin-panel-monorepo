export const FORM_IDS = {
  BUNDLE_RULES: 'bundleRules',
  BARCODES: 'barcodes',
  BUYING_PRICE_FINANCIALS: 'buying-price-financials',
  SELLING_PRICE_VAT: 'selling-price-vat',
  BUNDLE_STRUCK_PRICE: 'bundle-struck-price',
  SELLING_PRICE_FINANCIALS: 'selling-price-financials',
  SELLING_PRICE_EDIT: 'selling-price-edit',
  BUYING_PRICE_VAT: 'buying-price-vat',
};
export const SELLING_PRICE_TYPES = {
  WASTE: 1,
  WAREHOUSE: 2,
  DOMAIN: 3,
};

export const REQUEST_TYPES = {
  SELLING_PRICE: 1,
  DISCOUNTED_SELLING_PRICE: 2,
};

export const SELLING_PRICE_TYPE_NAMES = {
  3: { en: 'Domain', tr: 'Domain Bazlı' },
  2: { en: 'Warehouse', tr: 'Depo Bazlı' },
  1: { en: 'Waste', tr: 'Atık Bazlı' },
};

export const PRECISON_VALUES = { ONE_DIGIT: 1, TWO_DIGIT: 2, THREE_DIGIT: 3 };

export const NUMBER_INPUT_STEPS = { TWO_STEP: 0.01, THREE_STEP: 0.001 };

export const DISCOUNT_TYPE = {
  PERCENTAGE: 1,
  AMOUNT: 2,
};
