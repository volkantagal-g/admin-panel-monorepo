export const WAREHOUSE_TYPES = {
  MAIN: 1,
  REGULAR: 2,
  VIRTUAL: 3,
  GROCER: 4,
  FACTORY: 5,
  SUPPLY_CHAIN: 6,
  VEHICLE_PARK: 7,
  SC: 8,
  OTHER: 10,
};

export const warehouseTypes = {
  1: { en: 'Main Warehouse', tr: 'Merkez Depo' },
  2: { en: 'Regular Warehouse', tr: 'Cep Depo' },
  3: { en: 'Virtual Warehouse', tr: 'Sanal Depo' },
  4: { en: 'Grocer Warehouse', tr: 'Bakkal Depo' },
  5: { en: 'Factory Warehouse', tr: 'Fabrika Depo' },
  6: { en: 'Supply Chain Operations', tr: 'Tedarik Operasyonları' },
  7: { en: 'Vehicle Park', tr: 'Araç Otoparkı' },
  8: { en: 'Store Conversion', tr: 'Store Conversion' },
  10: { en: 'Other', tr: 'Diğer' },
};

export const AUTO_TRANSFER_SERVICE_TYPE = {
  DEFAULT: '1',
  DIRECT_DISPATCH: '2',
  VOLUME_TRANSFER: '3',
};

export const AutoTransferServiceTypes = {
  1: { tr: 'Varsayılan', en: 'Default' },
  2: { tr: 'Doğrudan Sevk', en: 'Direct Dispatch' },
  3: { tr: 'Hacim Aktarımı', en: 'Volume Transfer' },
};

export const MATCH_TYPES = {
  EXACT: 'exact',
  INCLUDES: 'includes',
};

export const GETIR_MARKET_DOMAIN_TYPES = {
  G10: 1,
  G30: 3,
  VOYAGER: 4,
};

export const GETIR_MARKET_STATE = {
  ARCHIVED: 100,
  INACTIVE: 200,
  ACTIVE: 300,
};

export const PRODUCT_CATEGORY_STATUS_ACTIVE = 1;

export const domainTypes = {
  1: { en: 'Getir10', tr: 'Getir10' },
  3: { en: 'GetirMore', tr: 'GetirBüyük' },
  4: { en: 'GetirWater', tr: 'GetirSu' },
  6: { en: 'GetirLocals', tr: 'GetirÇarşı' },
};
