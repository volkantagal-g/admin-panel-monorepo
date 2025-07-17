export const DOMAIN_TYPE = {
  GETIR10: 1,
  GETIR_MORE: 3,
  GETIR_WATER: 4,
};

export const DOMAIN_NAME = {
  GETIR10: 'Getir10',
  GETIR_MORE: 'GetirMore',
  GETIR_WATER: 'GetirWater',
};

export const SEGMENT = {
  TEST: 1,
  LAUNCH: 2,
  REGULAR: 3,
  REGIONAL_SENSITIVE: 4,
  ONLY_PROMO: 5,
  DELIST_ON_DEPLETION: 6,
  DELIST: 7,
  FIXED_ASSET: 8,
  CONSUMABLE: 9,
  SEASONAL: 10,
  SUPPLY_SHORTAGE: 11,
  STAND_BY: 12,
  N11: 13,
  INANDOUT: 14,
  LISTED: 15,
};

export const SEGMENT_NAMES = {
  1: 'TEST',
  2: 'LAUNCH',
  3: 'REGULAR',
  4: 'REGIONAL_SENSITIVE',
  5: 'ONLY_PROMO',
  6: 'DELIST_ON_DEPLETION',
  7: 'DELIST',
  8: 'FIXED_ASSET',
  9: 'CONSUMABLE',
  10: 'SEASONAL',
  11: 'SUPPLY_SHORTAGE',
  12: 'STAND_BY',
  13: 'N11',
  14: 'INANDOUT',
  15: 'LISTED',
};

export const ProductSegmentId = {
  Core: 1,
  Essentials: 2,
  Complimentary: 3,
  Delist: 4,
};

export const PRODUCT_SEGMENTS2 = {
  [ProductSegmentId.Core]: {
    en: 'Core',
    tr: 'Core',
  },
  [ProductSegmentId.Essentials]: {
    en: 'Essentials',
    tr: 'Essentials',
  },
  [ProductSegmentId.Complimentary]: {
    en: 'Complimentary',
    tr: 'Complimentary',
  },
  [ProductSegmentId.Delist]: {
    en: 'Delist',
    tr: 'Delist',
  },
};

export const STORAGE_TYPE = {
  FROZEN: '-18',
  CHILLED: '+4',
  MEAT_CHICKEN_FISH: '+2',
  AMBIENT: 'ambient',
  LOCKDOWN: 'lockdown',
  FRUIT_AND_VEGETABLE: '+8-12',
  DELIQUESCENT: '+18max',
};

export const DEMOGRAPHY = {
  PREMIUM: 1,
  METROPOL: 2,
  TRADITIONAL: 3,
  UPPER_PREMIUM: 4,
};

export const DEMOGRAPHY_LABELS = {
  [DEMOGRAPHY.PREMIUM]: { en: 'Premium', tr: 'Premium' },
  [DEMOGRAPHY.METROPOL]: { en: 'Metropol', tr: 'Metropol' },
  [DEMOGRAPHY.TRADITIONAL]: { en: 'Traditional', tr: 'Geleneksel' },
  [DEMOGRAPHY.UPPER_PREMIUM]: { en: 'Upper Premium', tr: 'Üst Premium' },
};

export const FALLBACK_DEMOGRAPHY_OPTIONS = [
  { id: DEMOGRAPHY.PREMIUM.toString(), name: DEMOGRAPHY_LABELS[DEMOGRAPHY.PREMIUM].en, value: DEMOGRAPHY.PREMIUM.toString() },
  { id: DEMOGRAPHY.METROPOL.toString(), name: DEMOGRAPHY_LABELS[DEMOGRAPHY.METROPOL].en, value: DEMOGRAPHY.METROPOL.toString() },
  { id: DEMOGRAPHY.TRADITIONAL.toString(), name: DEMOGRAPHY_LABELS[DEMOGRAPHY.TRADITIONAL].en, value: DEMOGRAPHY.TRADITIONAL.toString() },
  { id: DEMOGRAPHY.UPPER_PREMIUM.toString(), name: DEMOGRAPHY_LABELS[DEMOGRAPHY.UPPER_PREMIUM].en, value: DEMOGRAPHY.UPPER_PREMIUM.toString() },
];

export const SEGMENT_LABELS = {
  [SEGMENT.TEST]: { en: 'Test', tr: 'Test' },
  [SEGMENT.LAUNCH]: { en: 'Launch', tr: 'Launch' },
  [SEGMENT.REGULAR]: { en: 'Regular', tr: 'Regular' },
  [SEGMENT.REGIONAL_SENSITIVE]: { en: 'Regional Sensitive', tr: 'Regional Sensitive' },
  [SEGMENT.ONLY_PROMO]: { en: 'Only Promo', tr: 'Only Promo' },
  [SEGMENT.DELIST_ON_DEPLETION]: { en: 'Delist On Depletion', tr: 'Delist On Depletion' },
  [SEGMENT.DELIST]: { en: 'Delist', tr: 'Delist' },
  [SEGMENT.FIXED_ASSET]: { en: 'Fixed Asset', tr: 'Fixed Asset' },
  [SEGMENT.CONSUMABLE]: { en: 'Consumable', tr: 'Consumable' },
  [SEGMENT.SEASONAL]: { en: 'Seasonal', tr: 'Seasonal' },
  [SEGMENT.SUPPLY_SHORTAGE]: { en: 'Supply Shortage', tr: 'Supply Shortage' },
  [SEGMENT.STAND_BY]: { en: 'Stand By', tr: 'Stand By' },
  [SEGMENT.N11]: { en: 'N11', tr: 'N11' },
  [SEGMENT.INANDOUT]: { en: 'In And Out', tr: 'In And Out' },
  [SEGMENT.LISTED]: { en: 'Listed', tr: 'Listed' },
};

export const SIZE = {
  MINI: 1,
  MIDI: 2,
  MAXI: 3,
  SC_MINI: 4,
  SC_MIDI: 5,
  SC_MAXI: 6,
  EXTRA_MINI: 7,
  GB_MAXI: 8,
  GB_MIDI: 9,
};

export const SIZE_LABELS = {
  [SIZE.MINI]: { en: 'Mini', tr: 'Mini' },
  [SIZE.MIDI]: { en: 'Midi', tr: 'Midi' },
  [SIZE.MAXI]: { en: 'Maxi', tr: 'Maxi' },
  [SIZE.SC_MINI]: { en: 'SC Mini', tr: 'SC Mini' },
  [SIZE.SC_MIDI]: { en: 'SC Midi', tr: 'SC Midi' },
  [SIZE.SC_MAXI]: { en: 'SC Maxi', tr: 'SC Maxi' },
  [SIZE.EXTRA_MINI]: { en: 'Extra Mini', tr: 'Extra Mini' },
  [SIZE.GB_MAXI]: { en: 'GB Maxi', tr: 'GB Maxi' },
  [SIZE.GB_MIDI]: { en: 'GB Midi', tr: 'GB Midi' },
};

export const DEMOGRAPHY_CLASSES = {
  [DEMOGRAPHY.PREMIUM]: { name: DEMOGRAPHY_LABELS[DEMOGRAPHY.PREMIUM], class: 'demographyPremium' },
  [DEMOGRAPHY.METROPOL]: { name: DEMOGRAPHY_LABELS[DEMOGRAPHY.METROPOL], class: 'demographyMetropol' },
  [DEMOGRAPHY.TRADITIONAL]: { name: DEMOGRAPHY_LABELS[DEMOGRAPHY.TRADITIONAL], class: 'demographyTraditional' },
  [DEMOGRAPHY.UPPER_PREMIUM]: { name: DEMOGRAPHY_LABELS[DEMOGRAPHY.UPPER_PREMIUM], class: 'demographyUpperPremium' },
};

export const SIZE_CLASSES = {
  [SIZE.MINI]: { name: 'MINI', class: 'mini' },
  [SIZE.MIDI]: { name: 'MIDI', class: 'midi' },
  [SIZE.MAXI]: { name: 'MAXI', class: 'maxi' },
  [SIZE.SC_MINI]: { name: 'SC Mini', class: 'scMini' },
  [SIZE.SC_MIDI]: { name: 'SC Midi', class: 'scMidi' },
  [SIZE.SC_MAXI]: { name: 'SC Maxi', class: 'scMaxi' },
  [SIZE.EXTRA_MINI]: { name: 'Extra Mini', class: 'extraMini' },
  [SIZE.GB_MAXI]: { name: 'GB Maxi', class: 'gbMaxi' },
  [SIZE.GB_MIDI]: { name: 'GB Midi', class: 'gbMidi' },
};

export const DOMAIN_CLASSES = ['domainTag'];

export const WAREHOUSE_TYPE = {
  MAIN_WAREHOUSE: 1,
  REGULAR_WAREHOUSE: 2,
  VIRTUAL_WAREHOUSE: 3,
  SC_GROCER_WAREHOUSE: 4,
  FACTORY_WAREHOUSE: 5,
  SUPPLY_CHAIN_OPERATIONS: 6,
  VEHICLE_PARK: 7,
  STORE_CONVERSION: 8,
  PLATFORM: 99,
  OTHER: 10,
};

export const WAREHOUSE_TYPE_LABELS = {
  [WAREHOUSE_TYPE.MAIN_WAREHOUSE]: { en: 'Main Warehouse', tr: 'Ana Depo' },
  [WAREHOUSE_TYPE.REGULAR_WAREHOUSE]: { en: 'Regular Warehouse', tr: 'Normal Depo' },
  [WAREHOUSE_TYPE.VIRTUAL_WAREHOUSE]: { en: 'Virtual Warehouse', tr: 'Sanal Depo' },
  [WAREHOUSE_TYPE.SC_GROCER_WAREHOUSE]: { en: 'SC Grocer Warehouse', tr: 'SC Market Depo' },
  [WAREHOUSE_TYPE.FACTORY_WAREHOUSE]: { en: 'Factory Warehouse', tr: 'Fabrika Depo' },
  [WAREHOUSE_TYPE.SUPPLY_CHAIN_OPERATIONS]: { en: 'Supply Chain Operations', tr: 'Tedarik Zinciri İşlemleri' },
  [WAREHOUSE_TYPE.VEHICLE_PARK]: { en: 'Vehicle Park', tr: 'Araç Parkı' },
  [WAREHOUSE_TYPE.STORE_CONVERSION]: { en: 'Store Conversion', tr: 'Mağaza Dönüşümü' },
  [WAREHOUSE_TYPE.PLATFORM]: { en: 'Platform', tr: 'Platform' },
  [WAREHOUSE_TYPE.OTHER]: { en: 'Other', tr: 'Diğer' },
};

export const STORAGE_TYPE_LABELS = {
  [STORAGE_TYPE.FROZEN]: { en: 'Frozen', tr: 'Dondurma' },
  [STORAGE_TYPE.CHILLED]: { en: 'Chilled', tr: 'Soğuk' },
  [STORAGE_TYPE.MEAT_CHICKEN_FISH]: { en: 'Meat Chicken Fish', tr: 'Et Tavuk Balık' },
  [STORAGE_TYPE.AMBIENT]: { en: 'Ambient', tr: 'Ambient' },
  [STORAGE_TYPE.LOCKDOWN]: { en: 'Lockdown', tr: 'Lockdown' },
};

export const WAREHOUSE_TABS = {
  PRODUCTS: 1,
  DARK_STORE: 2,
  SUPPLIERS: 3,
  PLATFORM: 4,
  CENTRAL_WAREHOUSE: 5,
};

export const WAREHOUSE_LIST_TABS = [
  { key: WAREHOUSE_TABS.DARK_STORE, label: 'DARK_STORE_WITH_COUNT' },
  { key: WAREHOUSE_TABS.CENTRAL_WAREHOUSE, label: 'CENTRAL_WAREHOUSE_WITH_COUNT' },
];

export const DARKSTORE_TABS = {
  PRODUCTS: 1,
  CENTRAL_WAREHOUSE: 2,
  SUPPLIERS: 3,
};

export const WAREHOUSE_TABS_DETAIL = {
  [WAREHOUSE_TABS.PRODUCTS]: 'PRODUCTS',
  [WAREHOUSE_TABS.DARK_STORE]: 'DARK_STORE',
  [WAREHOUSE_TABS.SUPPLIERS]: 'SUPPLIERS',
};

export const PRODUCT_TABS = {
  DARK_STORE: 2,
  SUPPLIERS: 4,
  CENTRAL_WAREHOUSE: 1,
};

export const PRODUCT_TABS_DETAIL = {
  [PRODUCT_TABS.CENTRAL_WAREHOUSE]: 'CENTRAL_WAREHOUSE',
  [PRODUCT_TABS.DARK_STORE]: 'DARK_STORE',
  [PRODUCT_TABS.SUPPLIERS]: 'SUPPLIERS',
};

export const getirMarketDomainTypes = {
  [DOMAIN_TYPE.GETIR10]: { name: 'Getir10' },
  [DOMAIN_TYPE.GETIR_MORE]: { name: 'GetirMore' },
  [DOMAIN_TYPE.GETIR_WATER]: { name: 'GetirWater' },
};

export const getirMarketColors = {
  [DOMAIN_TYPE.GETIR10]: 'inactive',
  [DOMAIN_TYPE.GETIR_MORE]: 'secondary',
  [DOMAIN_TYPE.GETIR_WATER]: 'inactive',
};

export const productModalOptions = [
  { label: 'Name', value: 'name' },
  { label: 'Domain', value: 'domainTypes' },
  { label: 'Demographies', value: 'demographies' },
  { label: 'Sizes', value: 'sizes' },
  { label: 'Category', value: 'category' },
  { label: 'Segment', value: 'segment' },
  { label: 'Dark Stores', value: 'darkstoreCount' },
  { label: 'Suppliers', value: 'supplierCount' },
  { label: 'Chains', value: 'chainCount' },
];

export const productSupplierModalOptions = [
  { label: 'Name', value: 'name' },
  { label: 'Type', value: 'type' },
  { label: 'Net Buying Price', value: 'netBuyingPrice' },
  { label: 'Bonuses', value: 'bonuses' },
  { label: 'Preferred', value: 'preferred' },
];

export const warehouseModalOptions = {
  [WAREHOUSE_TABS.CENTRAL_WAREHOUSE]: [
    { label: 'Name', value: 'name' },
    { label: 'Domain', value: 'domain' },
    { label: 'City', value: 'city' },
    { label: 'Region', value: 'region' },
    { label: 'Dark Stores', value: 'darkStores' },
    { label: 'Products', value: 'products' },
    { label: 'Suppliers', value: 'suppliers' },
  ],
  [WAREHOUSE_TABS.DARK_STORE]: [
    { label: 'Name', value: 'name' },
    { label: 'Domain', value: 'domain' },
    { label: 'City', value: 'city' },
    { label: 'Region', value: 'region' },
    { label: 'Demography', value: 'demography' },
    { label: 'Size', value: 'size' },
    { label: 'Type', value: 'type' },
    { label: 'Products', value: 'products' },
    { label: 'Suppliers', value: 'suppliers' },
    { label: 'Central Warehouses', value: 'centralWarehouses' },
  ],
};

export const DETAIL_INFO_DOMAIN_TYPES = {
  [DOMAIN_TYPE.GETIR10]: { tr: 'GETIR10', en: 'GETIR10' },
  [DOMAIN_TYPE.GETIR_MORE]: { tr: 'GETIR MORE', en: 'GETIR MORE' },
  [DOMAIN_TYPE.GETIR_WATER]: { tr: 'GETIR WATER', en: 'GETIR WATER' },
};

export const defaultModalOptions = warehouseModalOptions[WAREHOUSE_TABS.CENTRAL_WAREHOUSE];

export const tabOptions = {
  [WAREHOUSE_TABS.CENTRAL_WAREHOUSE]: [
    'name',
    'domain',
    'city',
    'region',
    'darkStores',
    'products',
    'suppliers',
  ],
  [WAREHOUSE_TABS.DARK_STORE]: [
    'name',
    'domain',
    'city',
    'region',
    'demography',
    'size',
    'type',
    'products',
    'suppliers',
    'centralWarehouses',
  ],
  [PRODUCT_TABS.PRODUCTS]: [
    'name',
    'domain',
    'demography',
    'size',
    'category',
    'segment',
    'darkstoreCount',
    'supplierCount',
    'chainCount',
  ],
  default: [
    'name',
    'domain',
    'demography',
    'size',
    'category',
    'segment',
    'darkstoreCount',
    'supplierCount',
    'chainCount',
  ],
  [WAREHOUSE_TABS.SUPPLIERS]: ['name', 'warehouses', 'suppliers', 'products'],
  [PRODUCT_TABS.SUPPLIERS]: [
    'name',
    'type',
    'netBuyingPrice',
    'bonuses',
    'preferred',
  ],
  [WAREHOUSE_TABS.PLATFORM]: ['name', 'warehouses', 'suppliers', 'products'],
  [DARKSTORE_TABS.CENTRAL_WAREHOUSE]: ['name', 'domain', 'city', 'region', 'darkStores', 'products', 'suppliers'],
  [DARKSTORE_TABS.PRODUCTS]: [
    'name',
    'domain',
    'demography',
    'size',
    'category',
    'segment',
    'local',
  ],
  [DARKSTORE_TABS.SUPPLIERS]: [
    'name',
    'type',
    'category',
    'products',
    'cws',
  ],
};

export const DETAIL_INFO_KEYS = {
  WAREHOUSE_TYPE: 'WAREHOUSE_TYPE',
  DOMAIN: 'DOMAIN',
  CATEGORY: 'CATEGORY',
  SEGMENT: 'SEGMENT',
  STORAGE_TYPE: 'STORAGE_TYPE',
  DEMOGRAPHY: 'DEMOGRAPHY',
  SIZE: 'SIZE',
  LOCAL: 'LOCAL',
  REGION: 'REGION',
  CITY: 'CITY',
  DARK_STORES: 'DARK_STORES',
};

export const DETAIL_INFO_CONTENT_KEYS = {
  [DETAIL_INFO_KEYS.WAREHOUSE_TYPE]: 'warehouseTypes',
  [DETAIL_INFO_KEYS.DOMAIN]: 'domainTypes',
  [DETAIL_INFO_KEYS.CATEGORY]: 'masterCategoryName',
  [DETAIL_INFO_KEYS.SEGMENT]: 'segment',
  [DETAIL_INFO_KEYS.STORAGE_TYPE]: 'storageType',
  [DETAIL_INFO_KEYS.DEMOGRAPHY]: 'demography',
  [DETAIL_INFO_KEYS.SIZE]: 'size',
  [DETAIL_INFO_KEYS.LOCAL]: 'isLocal',
  [DETAIL_INFO_KEYS.REGION]: 'region',
  [DETAIL_INFO_KEYS.CITY]: 'city',
  [DETAIL_INFO_KEYS.DARK_STORES]: 'darkStores',
};

export const TRANSLATION_NAMESPACE = 'marketProductChainManagement';

export const DETAIL_INFO_LABEL_MAPPING = {
  [DETAIL_INFO_KEYS.WAREHOUSE_TYPE]: 'warehouseTypes',
  [DETAIL_INFO_KEYS.DOMAIN]: 'domainTypes',
  [DETAIL_INFO_KEYS.SEGMENT]: 'segment',
  [DETAIL_INFO_KEYS.STORAGE_TYPE]: 'storage_type',
  [DETAIL_INFO_KEYS.DEMOGRAPHY]: 'demography',
  [DETAIL_INFO_KEYS.SIZE]: 'size',
  [DETAIL_INFO_KEYS.LOCAL]: 'local',
  [DETAIL_INFO_KEYS.REGION]: 'region',
  [DETAIL_INFO_KEYS.CITY]: 'city',
  [DETAIL_INFO_KEYS.DARK_STORES]: 'darkStores',
};

export const DETAIL_INFO_SEPARATORS = {
  [DETAIL_INFO_KEYS.DOMAIN]: ' & ',
  DEFAULT: ', ',
};

export const BOOLEAN_LABELS = {
  true: { en: 'Yes', tr: 'Evet' },
  false: { en: 'No', tr: 'Hayır' },
};

export const PAGE_TYPES = {
  WAREHOUSE: 'WAREHOUSE',
  PRODUCT: 'PRODUCT',
  DARK_STORE: 'DARK_STORE',
  CHAIN: 'CHAIN',
};

export const TABS = {
  CENTRAL_WAREHOUSE: 1,
  DARK_STORE: 2,
  PLATFORM: 3,
  SUPPLIER: 4,
};

export const TABLE_COLUMN_TYPES = {
  WAREHOUSE_PRODUCTS: 'WAREHOUSE_PRODUCTS',
  WAREHOUSE_DARK_STORE: 'WAREHOUSE_DARK_STORE',
  WAREHOUSE_SUPPLIERS: 'WAREHOUSE_SUPPLIERS',
  WAREHOUSE_PLATFORM: 'WAREHOUSE_PLATFORM',
  WAREHOUSE_CENTRAL: 'WAREHOUSE_CENTRAL',
  PRODUCT_CENTRAL_WAREHOUSE: 'PRODUCT_CENTRAL_WAREHOUSE',
  PRODUCT_SUPPLIERS: 'PRODUCT_SUPPLIERS',
  DARK_STORE_PRODUCTS: 'DARK_STORE_PRODUCTS',
  DARK_STORE_CENTRAL_WAREHOUSE: 'DARK_STORE_CENTRAL_WAREHOUSE',
  DARK_STORE_SUPPLIERS: 'DARK_STORE_SUPPLIERS',
};

export const WAREHOUSE_DETAIL_TABS = [
  {
    key: WAREHOUSE_TABS.PRODUCTS,
    label: 'PRODUCTS_WITH_COUNT',
  },
  {
    key: WAREHOUSE_TABS.DARK_STORE,
    label: 'DARK_STORE_WITH_COUNT',
  },
  {
    key: WAREHOUSE_TABS.SUPPLIERS,
    label: 'SUPPLIERS_WITH_COUNT',
  },
];

export const PRODUCT_DETAIL_TABS = [
  {
    key: PRODUCT_TABS.DARK_STORE,
    label: 'DARK_STORE_WITH_COUNT',
  },
  {
    key: PRODUCT_TABS.SUPPLIERS,
    label: 'SUPPLIERS_WITH_COUNT',
  },
  {
    key: PRODUCT_TABS.CENTRAL_WAREHOUSE,
    label: 'CENTRAL_WAREHOUSE_WITH_COUNT',
  },
];

export const DARKSTORE_DETAIL_TABS = [
  {
    key: DARKSTORE_TABS.PRODUCTS,
    label: 'PRODUCTS_WITH_COUNT',
  },
  {
    key: DARKSTORE_TABS.CENTRAL_WAREHOUSE,
    label: 'CENTRAL_WAREHOUSE_WITH_COUNT',
  },
  {
    key: DARKSTORE_TABS.SUPPLIERS,
    label: 'SUPPLIERS_WITH_COUNT',
  },
];

export const MATCH_DARKSTORE = {
  DATASET_OPTIONS: {
    CITY: 'city',
    CENTRAL_WAREHOUSE: 'centralWarehouse',
    DARK_STORE: 'darkStore',
  },

  STEPS: {
    DATASET_SELECTION: 1,
    DATA_DISPLAY: 2,
  },

  CENTRAL_WAREHOUSE_OPTIONS: [
    { value: '1', label: 'CW Istanbul' },
    { value: '2', label: 'CW Ankara' },
    { value: '3', label: 'CW Izmir' },
    { value: '4', label: 'CW Bursa' },
    { value: '5', label: 'CW Kocaeli' },
    { value: '6', label: 'CW Konya' },
    { value: '7', label: 'CW Antalya' },
    { value: '8', label: 'CW Adana' },
    { value: '9', label: 'CW Kayseri' },
    { value: '10', label: 'CW Kırıkkale' },
  ],

  CITY_OPTIONS: [
    { value: '1', label: 'Istanbul' },
    { value: '2', label: 'Ankara' },
    { value: '3', label: 'Izmir' },
  ],

  DARK_STORE_OPTIONS: [
    { value: '1', label: 'DS Istanbul' },
    { value: '2', label: 'DS Ankara' },
    { value: '3', label: 'DS Izmir' },
  ],

  MOCK_DATA_KEYS: {
    darkStore: 'darkStores',
    supplier: 'suppliers',
    product: 'products',
    level1: 'level1',
    level2: 'level2',
    level3: 'level3',
    level4: 'level4',
  },
};

export const ANALYTICS_CONFIG = {
  name: 'MARKET_PRODUCT_CHAIN_MANAGEMENT_WAREHOUSES_DETAIL',
  squad: 'MARKET_PRODUCT_CHAIN_MANAGEMENT_WAREHOUSES_DETAIL',
};

export const PRODUCT_ANALYTICS_CONFIG = {
  name: 'MARKET_PRODUCT_CHAIN_MANAGEMENT_PRODUCTS_LIST',
  squad: 'MARKET_PRODUCT_CHAIN_MANAGEMENT_PRODUCTS_LIST',
};

export const PRODUCT_DETAIL_ANALYTICS_CONFIG = {
  name: 'MARKET_PRODUCT_CHAIN_MANAGEMENT_PRODUCTS_DETAIL',
  squad: 'MARKET_PRODUCT_CHAIN_MANAGEMENT_PRODUCTS_DETAIL',
};

export const DARKSTORE_DETAIL_ANALYTICS_CONFIG = {
  name: 'MARKET_PRODUCT_CHAIN_MANAGEMENT_DARK_STORE_DETAIL',
  squad: 'MARKET_PRODUCT_CHAIN_MANAGEMENT_DARK_STORE_DETAIL',
};

export const MATCH_DARKSTORE_ANALYTICS_CONFIG = {
  name: 'MARKET_PRODUCT_CHAIN_MANAGEMENT_MATCH_CW_DS',
  squad: 'MARKET_PRODUCT_CHAIN_MANAGEMENT_MATCH_CW_DS',
};

export const REDUX_STORE_KEYS = {
  CENTRAL_WAREHOUSE_TAB: 'centralWarehouseTab',
  CENTRAL_WAREHOUSE_TABLE: 'centralWarehouseTable',
  SUPPLIERS_TABLE: 'suppliersTable',
  DARK_STORES_TABLE: 'darkStoresTable',
  PRODUCTS: 'MARKET_PRODUCT_CHAIN_MANAGEMENT_PRODUCTS',
  CHAIN_MANAGEMENT: 'MARKET_PRODUCT_CHAIN_MANAGEMENT',
  CHAIN: 'MARKET_PRODUCT_CHAIN_MANAGEMENT_CHAIN',
  CHAIN_DETAIL: 'MARKET_PRODUCT_CHAIN_MANAGEMENT_CHAIN_DETAIL',
  PRODUCT_DETAIL: 'MARKET_PRODUCT_CHAIN_MANAGEMENT_PRODUCT_DETAIL',
  CENTRAL_WAREHOUSES: 'MARKET_PRODUCT_CHAIN_MANAGEMENT_CENTRAL_WAREHOUSES',
  MATCH_SUPPLIERS: 'MARKET_PRODUCT_CHAIN_MANAGEMENT_MATCH_SUPPLIERS',
  WAREHOUSE_DETAIL: 'MARKET_PRODUCT_CHAIN_MANAGEMENT_WAREHOUSE_DETAIL',
  MATCH_DARKSTORE: 'PAGE_MARKET_PRODUCT_CHAIN_MANAGEMENT_MATCH_CW_DS',
  DARK_STORE_DETAIL: 'PAGE_MARKET_PRODUCT_CHAIN_MANAGEMENT_DARK_STORE_DETAIL',
  WAREHOUSE_LIST_DARK_STORE_TABLE: 'warehouseListDarkStoreTable',
  DARK_STORE_PRODUCTS_TABLE: 'darkStoreProductsTable',
  DARK_STORE_CENTRAL_WAREHOUSES_TABLE: 'darkStoreCentralWarehousesTable',
  DARK_STORE_SUPPLIERS_TABLE: 'darkStoreSuppliersTable',
};

export const PRODUCT_TABLE_COLUMN_TYPES = {
  CENTRAL_WAREHOUSE: 'PRODUCT_CENTRAL_WAREHOUSE',
  DARK_STORE: 'PRODUCT_DARK_STORE',
  SUPPLIERS: 'PRODUCT_SUPPLIERS',
};

export const CENTRAL_WAREHOUSE_ANALYTICS_CONFIG = {
  name: 'MARKET_PRODUCT_CHAIN_MANAGEMENT_WAREHOUSES_LIST',
  squad: 'SUPPLY.COMMERCE.COMMERCE',
};

export const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];

export const darkStoreDetailModalOptions = {
  [DARKSTORE_TABS.PRODUCTS]: [
    { label: 'Name', value: 'name' },
    { label: 'Domain', value: 'domain' },
    { label: 'Demography', value: 'demography' },
    { label: 'Size', value: 'size' },
    { label: 'Category', value: 'category' },
    { label: 'Segment', value: 'segment' },
    { label: 'Local', value: 'local' },
  ],
  [DARKSTORE_TABS.CENTRAL_WAREHOUSE]: [
    { label: 'Name', value: 'name' },
    { label: 'Domain', value: 'domain' },
    { label: 'City', value: 'city' },
    { label: 'Region', value: 'region' },
    { label: 'Category', value: 'category' },
    { label: 'Products', value: 'products' },
    { label: 'Suppliers', value: 'suppliers' },
  ],
  [DARKSTORE_TABS.SUPPLIERS]: [
    'name',
    'type',
    'category',
    'products',
    'cws',
  ],
};

export const CATEGORY_LEVEL = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
};

export const CATEGORY_LEVELS = {
  [CATEGORY_LEVEL.ONE]: 10,
  [CATEGORY_LEVEL.TWO]: 20,
  [CATEGORY_LEVEL.THREE]: 30,
  [CATEGORY_LEVEL.FOUR]: 40,
};

export const domainTypeLabels = {
  [DOMAIN_TYPE.GETIR10]: { en: 'Getir10', tr: 'Getir10' },
  [DOMAIN_TYPE.GETIR_MORE]: { en: 'GetirMore', tr: 'GetirMore' },
  [DOMAIN_TYPE.GETIR_WATER]: { en: 'GetirWater', tr: 'GetirWater' },
};

export const LEVEL_KEYS = ['level1', 'level2', 'level3', 'level4'];

export const WAREHOUSE_TYPE_MAP = {
  REGULAR_WAREHOUSE: 2,
  MAIN_WAREHOUSE: 1,
  VIRTUAL_WAREHOUSE: 3,
  SC_GROCER_WAREHOUSE: 4,
  FACTORY_WAREHOUSE: 5,
  SUPPLY_CHAIN_OPERATIONS_WAREHOUSE: 6,
  VEHICLE_PARK_WAREHOUSE: 7,
  STORE_CONVERSION_WAREHOUSE: 8,
  NONAGREEMENT_WAREHOUSE: 9,
  OTHER_WAREHOUSE: 10,
  HUB_WAREHOUSE: 11,
};

export const FALLBACK_DOMAIN_OPTIONS = [
  { id: DOMAIN_TYPE.GETIR10.toString(), name: 'Getir10', value: DOMAIN_TYPE.GETIR10.toString() },
  { id: DOMAIN_TYPE.GETIR_MORE.toString(), name: 'GetirMore', value: DOMAIN_TYPE.GETIR_MORE.toString() },
  { id: DOMAIN_TYPE.GETIR_WATER.toString(), name: 'GetirWater', value: DOMAIN_TYPE.GETIR_WATER.toString() },
];

export const DEBOUNCE_TIME = 500;

export const MATCH_FILTER_IDS = {
  level4: 'masterCategoryLevel4LegacyIds',
  darkStore: 'darkstoreVertexIds',
  supplier: 'supplierVertexIds',
  product: 'productVertexIds',
};

export const MATCH_FILTER_KEYS = {
  LEVEL1: 'level1',
  LEVEL2: 'level2',
  LEVEL3: 'level3',
  LEVEL4: 'level4',
  DARK_STORE: 'darkStore',
  SUPPLIER: 'supplier',
  PRODUCT: 'product',
};

export const ITEM_TYPES = {
  PRODUCT: 'product',
  CATEGORY: 'category',
};
