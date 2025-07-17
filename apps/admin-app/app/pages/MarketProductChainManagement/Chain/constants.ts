export const FORM_FIELDS = {
  PRODUCT: 'products',
  SUPPLIER: 'suppliers',
  LOCATION: 'locations',
  DOMAINS: 'domains',
  CATEGORY_LEVEL_3: 'categoryLevel3',
  CATEGORY_LEVEL_4: 'categoryLevel4',
  ENABLED: 'isEnabled',
  LOCATION_TYPES: 'locationTypes',
  SUPPLIER_TYPES: 'supplierTypes',
} as const;

export const API_FIELDS = {
  [FORM_FIELDS.CATEGORY_LEVEL_3]: 'categoryLevel3',
  [FORM_FIELDS.CATEGORY_LEVEL_4]: 'categoryLevel4',
  [FORM_FIELDS.PRODUCT]: 'products',
  [FORM_FIELDS.SUPPLIER]: 'suppliers',
  [FORM_FIELDS.LOCATION]: 'locations',
  [FORM_FIELDS.DOMAINS]: 'domains',
  [FORM_FIELDS.ENABLED]: 'isEnabled',
  [FORM_FIELDS.LOCATION_TYPES]: 'locationTypes',
  [FORM_FIELDS.SUPPLIER_TYPES]: 'supplierTypes',
} as const;

export const FIELD_LABELS: Record<string, string> = {
  [FORM_FIELDS.PRODUCT]: 'Product',
  [FORM_FIELDS.SUPPLIER]: 'Supplier',
  [FORM_FIELDS.LOCATION]: 'Location',
  [FORM_FIELDS.DOMAINS]: 'Domains',
  [FORM_FIELDS.CATEGORY_LEVEL_3]: 'Level 3',
  [FORM_FIELDS.CATEGORY_LEVEL_4]: 'Level 4',
  [FORM_FIELDS.ENABLED]: 'Enabled',
  [FORM_FIELDS.LOCATION_TYPES]: 'Location Type',
  [FORM_FIELDS.SUPPLIER_TYPES]: 'Supplier Type',
};

export const L4_CATEGORIES_STORAGE = {
  KEY: 'marketProductChainManagement_L4Categories',
  EXPIRY_KEY: 'marketProductChainManagement_L4CategoriesExpiry',
  EXPIRY_TIME: 24 * 60 * 60 * 1000, // 24 saat
} as const;

export const SUPPLIER_TYPE_OPTIONS = [
  { value: 'CentralWarehouse', label: 'Central Warehouse' },
  { value: 'Supplier', label: 'Supplier' },
  { value: 'Platform', label: 'Platform' },
];

export const LOCATION_TYPE_OPTIONS = [
  { value: 'DarkStore', label: 'Dark Store' },
  { value: 'CentralWarehouse', label: 'Central Warehouse' },
  { value: 'Platform', label: 'Platform' },
];
