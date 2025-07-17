export const SELLING_PRICE_TYPE_NAMES = {
  3: { en: 'Domain', tr: 'Domain', title: 'PRODUCT_DOMAIN_PRICE' },
  2: { en: 'Warehouse', tr: 'Depo', title: 'PRODUCT_WAREHOUSE_PRICE' },
  1: { en: 'Waste', tr: 'Atık', title: 'PRODUCT_WASTE_PRICE' },
};
export const UPDATE_REQUEST_TYPES = {
  NORMAL_PRICE: 1,
  DISCOUNTED_PRICE: 2,
};

export const IMPORT_EXPORT_KEYS = {
  IMPORT_DOMAIN: 'import_domain_prices',
  IMPORT_WAREHOUSE: 'import_warehouse_prices',
  IMPORT_WASTE: 'import_waste_prices',
  IMPORT_BUYING_PRICES: 'import_buying_prices',
  EXPORT_PRICES: 'export_prices',
  EXPORT_DISCOUNTED_PRICES: 'export-discounted-prices',
  EXPORT_SUPPLIER_BUYING_PRICES: 'export_supplier_buying_prices',
};

export const PRICE_OPTION = {
  DISCOUNTED_AND_PRICE: 0,
  DISCOUNTED: 1,
  PRICE: 2,
};

export const DENIED_COUNTRIES_ON_OPERATIONS_SET = new Set(['TR']);
