/* eslint-disable max-len */

export const IMPORT_EXPORT_KEYS = {
  IMPORT_PRODUCT_DOMAIN_LIMITS_FROM_EXCEL:
    'IMPORT_PRODUCT_DOMAIN_LIMITS_FROM_EXCEL',
  EXPORT_PRODUCT_DOMAIN_LIMITS_TO_EXCEL:
    'EXPORT_PRODUCT_DOMAIN_LIMITS_TO_EXCEL',
  EXPORT_ACTIVE_PRODUCTS: 'EXPORT_ACTIVE_PRODUCTS',
  IMPORT_PRODUCT_DETAILS_FROM_EXCEL: 'IMPORT_PRODUCT_DETAILS_FROM_EXCEL',
  EXPORT_PRODUCT_DETAILS_TO_EXCEL: 'EXPORT_PRODUCT_DETAILS_TO_EXCEL',
  IMPORT_PRODUCT_NUTRITIONAL_INFO_FROM_EXCEL:
    'IMPORT_PRODUCT_NUTRITIONAL_INFO_FROM_EXCEL',
  EXPORT_PRODUCT_NUTRITIONAL_INFO_TO_EXCEL:
    'EXPORT_PRODUCT_NUTRITIONAL_INFO_TO_EXCEL',
  IMPORT_PRODUCT_CATEGORY_POSITIONS_FROM_EXCEL:
    'IMPORT_PRODUCT_CATEGORY_POSITIONS_FROM_EXCEL',
  EXPORT_PRODUCT_CATEGORY_POSITIONS_TO_EXCEL:
    'EXPORT_PRODUCT_CATEGORY_POSITIONS_TO_EXCEL',
  IMPORT_PRODUCT_SUPPLY_AND_LOGISTIC_FROM_EXCEL:
    'IMPORT_PRODUCT_SUPPLY_AND_LOGISTIC_FROM_EXCEL',
  IMPORT_MARKET_PRODUCT_PRICING_METADATA_FROM_EXCEL:
    'IMPORT_MARKET_PRODUCT_PRICING_METADATA_FROM_EXCEL',
  EXPORT_MARKET_PRODUCT_PRICING_METADATA_TO_EXCEL:
    'EXPORT_MARKET_PRODUCT_PRICING_METADATA_TO_EXCEL',
  EXPORT_PRODUCT_SUPPLY_AND_LOGISTIC_TO_EXCEL:
    'EXPORT_PRODUCT_SUPPLY_AND_LOGISTIC_TO_EXCEL',
  IMPORT_PRODUCT_TOGGLES_FROM_EXCEL: 'IMPORT_PRODUCT_TOGGLES_FROM_EXCEL',
};

export const exampleDomainLimit = {
  _id: '559831e0b1dc700c006a71b0',
  getir10: 4,
  getir30: 10,
  getirWater: undefined,
};

export const exampleProductDetails = {
  _id: '565c07f5762af60c00783f3c',
  'description.en':
    "Coca-Cola Classic is the world's favourite soft drink and has been enjoyed since 1886. Great Coke taste. Only natural flavours. No added preservatives. Gluten-free, dairy-free and nut-free. Serve ice cold for maximum refreshment. Keep one cold in the fridge. Please recycle.",
  'ingredients.en':
    'Carbonated Water, Sugar, Colour (Caramel E150d), Phosphoric Acid, Natural Flavourings including Caffeine',
  tags: '[6098f2865776820e5cebe09f, 6098f2895776820e5cebe0a0, 6092b912f1359d651fefde7c]',
  'usage.en': 'Preparation and Usage: Best served chilled. Packaging Type: Can',
  'additionalInfos.en': 'Safety Warning: Contains a Source of Phenylalanine.',
  'disclaimer.en': 'Safety Warning: Contains a Source of Phenylalanine.',
};

export const exampleNutritionalInfo = {
  _id: '5c938221906d4100017a7030',
  'tableTitle.en': 'Nutritional Data',
  tableIndex: 0,
  'sectionTitle.en': 'Per 150g',
  sectionIndex: 0,
  'itemName.en': 'Calories',
  'itemValue.en': 100,
  'itemUnit.en': 'kJ',
  itemIndex: 0,
};

export const exampleSupplyAndLogistic = {
  productId: '5c938221906d4100017a7030',
  brandImport: { brandId: '5c938221906d4100017a7030' },
  packagingInfoImport: {
    // !NOTE: Packaging Info for Unit
    unitInboxQuantity: 2,
    unitGrossWeight: 200,
    unitNetWeight: 100,
    unitHeight: 20,
    unitWidth: 20,
    unitDepth: 20,

    pickingType: 'UNIT',

    // !NOTE: Packaging Info for Sub-Pack
    subInboxQuantity: 2,
    subGrossWeight: 200,
    subNetWeight: 150,
    subBarcodes: '[4587789652]',
    subHeight: 25,
    subWidth: 25,
    subDepth: 25,

    // !NOTE: Packaging Info for Box
    boxInboxQuantity: 5,
    boxGrossWeight: 500,
    boxNetWeight: 450,
    boxBarcodes: '[4587789652]',
    boxHeight: 25,
    boxWidth: 25,
    boxDepth: 25,

    // !NOTE: Packaging Info for Palet
    paletInboxQuantity: 45,
    paletGrossWeight: 750,
    paletNetWeight: 650,
    paletBarcodes: '[4587789652]',
    paletHeight: 65,
    paletWidth: 65,
    paletDepth: 65,
  },
  transferInfoImport: {
    transferLimitType: 'CITY',
    shipmentType: 'CENTRAL_WAREHOUSE',
    transferColiCount: 5,
    isInFrozenLocation: true,
    isPickedToZero: false,
    planningSegment: 'A',
    transferType: 'AMBIENT',
    transferToleranceMinLimit: 1,
    transferToleranceMaxLimit: 5,
  },
  generalInfoImport: {
    criticalStockStore: 7,
    minStock: 10,
    maxStock: 120,
    minStockDay: 3,
    maxStockDay: 15,
    inventoryCheckPeriod: 30,
    isCriticalStockWarningEnabled: true,
    isIncludedToGeneralInventoryCheck: false,
    isConsumable: true,
    isEquipment: false,
    isKuzeydenEquipment: true,
  },
  masterCategoryV2Import: { level4Id: '5c938221906d4100017a7030' },
  expiryDateInfoImport: {
    expActive: true,
    lifetime: 20,
    allowed: 8,
    warning: 30,
    dead: 33,
  },
  demandAndStorageInfoImport: {
    demandType: 'IMPULSE',
    storageType: 'FROZEN',
    refrigeratorTemperature: '-23-18C',
  },
  segmentsImport: {
    segments: '[CONSUMABLE]',
    segments2: '[CORE]',
  },
};

export const exampleCategoryPositions = {
  categoryId: '5bc0aa99f22ea7001406108d',
  subCategoryId: '5bc0aac5b2d7d6001aa13749',
  _id: '5be3f1662201b20012a3a4d7',
  position: 19,
  main: 'false',
};

export const examplePricingMetadata = {
  productId: '5be3f1662201b20012a3a4d7',
  manufacturer: { manufacturerId: '5be3f1662201b20012a3a4d7' },
  depositAndEcoContribution: {
    depositPrice: 50,
    ecoContributionPrice: 10,
  },
  unitPriceInfo: {
    'unitPriceProperties.perUnit': 100,
    'unitPriceProperties.quantity': 100,
    'unitPriceProperties.unit': 'g',
  },
  sellingPriceVAT: { vat: 2.1 },
};

export const exampleProductToggles = {
  _id: '565c07f5762af60c00783f3c',
  isEnabled: true,
};
