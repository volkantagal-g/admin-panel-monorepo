import { PRODUCT_PACKAGING_TYPE } from '@shared/shared/constants';
import { generateComponentId } from '@shared/utils/generateComponentId';

export const AB_TEST_VARIABLE_NAME_PATTERN = /^([^:]+:){3}[^:]+$/;

export const PRODUCT_STORAGE_TYPE = {
  FROZEN: '-18',
  CHILLED: '+4',
  MEAT_CHICKEN_FISH: '+2',
  AMBIENT: 'ambient',
  LOCKDOWN: 'lockdown',
  FRUIT_AND_VEGETABLE: '+8-12',
  DELIQUESCENT: '+18max',
};

export const DOMAIN_TYPE = {
  GETIR10: 1,
  GETIR_MORE: 3,
  GETIR_WATER: 4,
  GETIR_N11: 12,
  GORILLAS: 17,
};

export const COUNTRY_CODE = {
  TR: 'TR',
  GB: 'GB',
  NL: 'NL',
  FR: 'FR',
  DE: 'DE',
  ES: 'ES',
  PT: 'PT',
  IT: 'IT',
  XN: 'XN',
  XI: 'XI',
  XM: 'XM',
  XJ: 'XJ',
  XW: 'XW',
  XC: 'XC',
  XF: 'XF',
};

const US_COUNTRY_CODES = [
  COUNTRY_CODE.XN,
  COUNTRY_CODE.XI,
  COUNTRY_CODE.XM,
  COUNTRY_CODE.XJ,
  COUNTRY_CODE.XW,
  COUNTRY_CODE.XC,
  COUNTRY_CODE.XF,
];

export const COUNTRY_RESTRICTED_DOMAIN_TYPES_WHITELIST = {
  [DOMAIN_TYPE.GORILLAS]: [
    COUNTRY_CODE.GB,
    COUNTRY_CODE.DE,
    COUNTRY_CODE.NL,
    ...US_COUNTRY_CODES,
  ],
};

export const PRODUCT_REFRIGERATOR_TEMPERATURE_TYPE = {
  C10: '-23-18C',
  C20: '-18-15C',
  C30: '-22-12C',
  C40: '-25-18C',
  C50: '+1+10C',
  C60: '-2+11C',
};

export const SCALE_OF_TEMPERATURE = {
  CELCIUS: '°C',
  FAHRENHEIT: '°F',
};

export const HFSS_INDICATOR_TYPE = {
  HFSS: 'HFSS',
  NOT_HFSS: 'Not HFSS',
  NOT_APPLICABLE: 'Not Applicable',
};

export const HFSS_FOOD_OR_DRINK_TYPE = {
  FOOD: 'Food',
  DRINK: 'Drink',
};

export const HFSS_ENABLED_COUNTRY_CODES = ['GB'];

export const ABV_ENABLED_COUNTRY_CODES = ['DE', 'XN', 'XI', 'XM', 'GB', 'NL'];

export const SAP_REFERENCE_CODE_ENABLED_COUNTRY_CODES = ['TR'];

export const ARCHIVE_ENABLED_COUNTRY_CODES = ['TR'];

export const IMAGE_VALIDATION = {
  BADGE: {
    MAX_HEIGHT: 450,
    MAX_WIDTH: 450,
    VALID_IMAGE_RATIOS: ['1:1'],
  },
};

export const POPULATE_FIELDS_ON_GET_MARKET_PRODUCT = [
  { path: 'category', select: 'name' },
  { path: 'subCategory', select: 'name' },
  { path: 'categories', select: 'name' },
  { path: 'subCategories', select: 'name' },
];

export const PRODUCT_SOURCE = {
  GETIR: 'getir',
  GORILLAS_ONLY: 'gorillas_only',
  GORILLAS_MERGED: 'gorillas_merged',
};

export const PRODUCT_DETAIL_TEXT_EDITOR = {
  TOOLBAR_ITEMS: [['bold', 'link']],
  FORMATS: ['bold', 'link'],
};

export const PRODUCT_GROUP_FILTER = {
  ACTIVE: 'active',
  GROUP_ID: 'groupId',
  NAME: 'name',
  INACTIVE: 'inactive',
  USER_ID: 'userId',
  PLACEMENT: 'placement',
  AB_TEST_VARIABLE_NAME: 'abTestVariableName',
  AB_TEST_VALUE_ID: 'abTestValueId',
};

export const PRODUCT_GROUP_COMPONENT_ID = { IMAGE_INFO: generateComponentId(['imageInfo']) };

export const PRODUCT_GROUP_TYPE = {
  MANUAL: 'manual',
  ALGORITHM: 'algorithm',
};

export const PRODUCT_GROUP_PLACEMENT = {
  DBL: 1,
  PERSONAL_CATEGORY: 2,
  PRE_SEARCH: 3,
  PRODUCT_DETAIL: 4,
  BASKET: 5,
  PROMO_DETAIL: 6,
  CHECKOUT_WALK: 7,
  PRE_DBL: 8,
  RECOGNIZER: 9,
  BASKET_SUBSTITUTE: 10,
};

export const PRODUCT_GROUP_HIERARCHY = {
  PRIMARY: 'primary',
  FALLBACK: 'fallback',
};

export const PRODUCT_DETAIL_COMPONENT_ID = {
  GENERAL_INFO: generateComponentId(['generalInfo']),
  PRICE_INFO: generateComponentId(['priceInfo']),
  POSITION_INFO: generateComponentId(['positionInfo']),
  BUNDLE_INFO: generateComponentId(['bundleInfo']),
  PURCHASING_INFO: generateComponentId(['purchasingInfo']),
  HFSS_INFO: generateComponentId(['hfssInfo']),
  DISPLAY_TYPE_INFO: generateComponentId(['displayTypeInfo']),
  PRODUCT_TYPE_INFO: generateComponentId(['productTypeInfo']),
  DOMAIN_TYPES: generateComponentId(['domainTypes']),
  NAME: generateComponentId(['name']),
  SHORT_NAME: generateComponentId(['shortName']),
  DETAILS_INFO: generateComponentId(['detailsInfo']),
  DISPLAY_NAME: generateComponentId(['displayName']),
  SHORT_DESCRIPTION: generateComponentId(['shortDescription']),
  MANUFACTURER: generateComponentId(['manufacturer']),
  TRANSFER_LIMIT_TYPE: generateComponentId(['transferLimitType']),
  TRANSFER_ALLOWED_CITIES: generateComponentId(['transferAllowedCities']),
  TRANSFER_ALLOWED_WAREHOUSES: generateComponentId(['transferAllowedWarehouses']),
  SUPPLIERS: generateComponentId(['suppliers']),
  SUPPLIER_ACCOUNT_CODES: generateComponentId(['supplierAccountCodes']),
  BRAND: generateComponentId(['brand']),
  BARCODES: generateComponentId(['barcodes']),
  MASTER_SUB_CATEGORY: generateComponentId(['masterSubCategory']),
  MASTER_CATEGORY_V2: generateComponentId(['masterCategoryV2']),
  CATEGORY: generateComponentId(['category']),
  CATEGORIES: generateComponentId(['categories']),
  SUB_CATEGORY: generateComponentId(['subCategory']),
  SUB_CATEGORIES: generateComponentId(['subCategories']),
  KEYWORDS: generateComponentId(['keywords']),
  BOOSTED_KEYWORDS: generateComponentId(['boostedKeywords']),
  SEGMENTS: generateComponentId(['segments']),
  SEGMENTS2: generateComponentId(['segments2']),
  PRODUCT_SOURCE: generateComponentId(['productSource']),
  WHOLESALE_PRICE: generateComponentId(['wholesalePrice']),
  WHOLESALE_VAT: generateComponentId(['wholesaleVat']),
  VAT: generateComponentId(['vat']),
  PRICE: generateComponentId(['price']),
  DEPOSIT_PRICE: generateComponentId(['depositPrice']),
  ECO_CONTRIBUTION_PRICE: generateComponentId(['ecoContributionPrice']),
  WF_LIST_PRICE: generateComponentId(['wholesaleFinancials', 'listPrice']),
  WF_TOTAL_PRICE_REDUCTION: generateComponentId(['wholesaleFinancials', 'totalPriceReduction']),
  WF_NET_INVOICE_PRICE_PER_WITHOUT_VAT: generateComponentId(['wholesaleFinancials', 'netInvoicePriceWithoutVat']),
  WF_WHOLESALE_VAT: generateComponentId(['wholesaleFinancials', 'wholesaleVat']),
  WF_NET_INVOICE_PRICE_WITH_VAT: generateComponentId(['wholesaleFinancials', 'netInvoicePriceWithVat']),
  WF_NET_NET_BUYING_PRICE_WITHOUT_VAT: generateComponentId(['wholesaleFinancials', 'netNetBuyingPriceWithoutVat']),
  WF_NET_NET_BUYING_PRICE_WITH_VAT: generateComponentId(['wholesaleFinancials', 'netNetBuyingPriceWithVat']),
  PACKAGING_INFO_UNIT_INBOX_QUANTITY: generateComponentId(['packagingInfo', PRODUCT_PACKAGING_TYPE.UNIT, 'inboxQuantity']),
  PACKAGING_INFO_UNIT_DIMENSION_WIDTH: generateComponentId(['packagingInfo', PRODUCT_PACKAGING_TYPE.UNIT, 'dimension', 'width']),
  PACKAGING_INFO_UNIT_DIMENSION_HEIGHT: generateComponentId(['packagingInfo', PRODUCT_PACKAGING_TYPE.UNIT, 'dimension', 'height']),
  PACKAGING_INFO_UNIT_DIMENSION_DEPTH: generateComponentId(['packagingInfo', PRODUCT_PACKAGING_TYPE.UNIT, 'dimension', 'depth']),
  PACKAGING_INFO_UNIT_NET_WEIGHT: generateComponentId(['packagingInfo', PRODUCT_PACKAGING_TYPE.UNIT, 'netWeight']),
  PACKAGING_INFO_UNIT_GROSS_WEIGHT: generateComponentId(['packagingInfo', PRODUCT_PACKAGING_TYPE.UNIT, 'grossWeight']),
  PACKAGING_INFO_UNIT_VOLUME: generateComponentId(['packagingInfo', PRODUCT_PACKAGING_TYPE.UNIT, 'volume']),
  PACKAGING_INFO_UNIT_BARCODES: generateComponentId(['packagingInfo', PRODUCT_PACKAGING_TYPE.UNIT, 'barcodes']),
  PACKAGING_INFO_PICKING_TYPE: generateComponentId(['packagingInfo', 'pickingType']),
  PACKAGING_INFO_STOCK_TYPE: generateComponentId(['packagingInfo', 'stockInfo']),
  PRODUCT_NAMES: generateComponentId(['productNames']),
  DEMAND_TYPE: generateComponentId(['demandType']),
  STORAGE_TYPE: generateComponentId(['storageType']),
  PAYMENT_DUE_DAY: generateComponentId(['paymentDueDay']),
  DISPLAY_TYPE: generateComponentId(['displayType']),
  HFSS_INDICATOR: generateComponentId(['hfssInfo', 'hfssIndicator']),
  HFSS_FOOD_CATEGORY: generateComponentId(['hfssInfo', 'hfssFoodCategory']),
  ADDITIONAL_INFO: generateComponentId(['additionalInfo']),
  USAGE_INFO: generateComponentId(['usageInfo']),
  INGREDIENTS_INFO: generateComponentId(['ingredientsInfo']),
  AGE_RESTRICTION: generateComponentId(['age-restriction']),
  SALE_RESTRICTION: generateComponentId(['sale-restriction']),
  MARKET_INFO: generateComponentId(['marketInfo']),
  WEIGHT_INFO: generateComponentId(['weightInfo']),
  WEIGHT_INFO_APPROXIMATE_PIECE_DEVIATION: generateComponentId(['weightInfo', 'approximatePieceDeviation']),
  WEIGHT_INFO_AVERAGE_PIECE_GRAM: generateComponentId(['weightInfo', 'averagePeaceGram']),
  WEIGHT_INFO_INITIAL_WEIGHT: generateComponentId(['weightInfo', 'initialWeight']),
  WEIGHT_INFO_AMOUNT_OF_WEIGHT_INCREMENT: generateComponentId(['weightInfo', 'amountOfWeightIncrement']),
  WEIGHT_INFO_MINIMUM_WEIGHT: generateComponentId(['weightInfo', 'minimumWeight']),
  DOMAIN_BASED_STOCK_INFO: generateComponentId(['domainBasedStockInfo']),
  BARCODES_INFO: generateComponentId(['barcodesInfo']),
  SAP_REFERENCE_CODE_INFO: generateComponentId(['sapReferenceCodeInfo']),
};

export const PRODUCT_ACTIVATION_BE_KEY_TO_COMPONENT_ID_MAP = {
  positions: PRODUCT_DETAIL_COMPONENT_ID.POSITION_INFO,
  bundleProductsCount: PRODUCT_DETAIL_COMPONENT_ID.BUNDLE_INFO,
  wholesaleFinancials: PRODUCT_DETAIL_COMPONENT_ID.PURCHASING_INFO,
};

export const PRODUCT_DETAIL_TAB_ID = {
  GENERAL_INFO: generateComponentId(['generalInfo']),
  GALLERY_INFO: generateComponentId(['galleryInfo']),
  PRODUCT_INFO: generateComponentId(['productInfo']),
  PRICING_INFO: generateComponentId(['pricingInfo']),
  SUPPLY_LOGISTIC_INFO: generateComponentId(['supplyLogisticInfo']),
};

export const PRODUCT_DETAIL_CONTAINER = {
  MARKET_INFO: {
    containerId: generateComponentId(['marketInfo']),
    tabId: PRODUCT_DETAIL_TAB_ID.GENERAL_INFO,
  },
  PRODUCT_SETTINGS: {
    containerId: generateComponentId(['productSettings']),
    tabId: PRODUCT_DETAIL_TAB_ID.GENERAL_INFO,
  },
  POSITION_INFO: {
    containerId: generateComponentId(['positionInfo']),
    tabId: PRODUCT_DETAIL_TAB_ID.GENERAL_INFO,
  },
  BUNDLE_INFO: {
    containerId: generateComponentId(['bundleInfo']),
    tabId: PRODUCT_DETAIL_TAB_ID.GENERAL_INFO,
  },
  WEIGHT_INFO: {
    containerId: generateComponentId(['weightInfo']),
    tabId: PRODUCT_DETAIL_TAB_ID.GENERAL_INFO,
  },
  SALE_RESTRICTION: {
    containerId: generateComponentId(['saleRestriction']),
    tabId: PRODUCT_DETAIL_TAB_ID.GENERAL_INFO,
  },
  AGE_RESTRICTION: {
    containerId: generateComponentId(['ageRestriction']),
    tabId: PRODUCT_DETAIL_TAB_ID.GENERAL_INFO,
  },
  DISPLAY_TYPE_INFO: {
    containerId: generateComponentId(['displayTypeInfo']),
    tabId: PRODUCT_DETAIL_TAB_ID.GALLERY_INFO,
  },
  BARCODES_INFO: {
    containerId: generateComponentId(['barcodesInfo']),
    tabId: PRODUCT_DETAIL_TAB_ID.PRODUCT_INFO,
  },
  SAP_REFERENCE_CODE_INFO: {
    containerId: generateComponentId(['sapReferenceCodeInfo']),
    tabId: PRODUCT_DETAIL_TAB_ID.PRODUCT_INFO,
  },
  PRODUCT_NAMES_INFO: {
    containerId: generateComponentId(['productNamesInfo']),
    tabId: PRODUCT_DETAIL_TAB_ID.PRODUCT_INFO,
  },
  PRODUCT_TYPE_INFO: {
    containerId: generateComponentId(['productTypeInfo']),
    tabId: PRODUCT_DETAIL_TAB_ID.PRODUCT_INFO,
  },
  HFSS_INFO: {
    containerId: generateComponentId(['hfssInfo']),
    tabId: PRODUCT_DETAIL_TAB_ID.PRODUCT_INFO,
  },
  BARCODE: {
    containerId: generateComponentId(['barcode']),
    tabId: PRODUCT_DETAIL_TAB_ID.PRICING_INFO,
  },
  PACKAGING_INFO: {
    containerId: generateComponentId(['packagingInfo']),
    tabId: PRODUCT_DETAIL_TAB_ID.SUPPLY_LOGISTIC_INFO,
  },
  BRAND: {
    containerId: generateComponentId(['brand']),
    tabId: PRODUCT_DETAIL_TAB_ID.SUPPLY_LOGISTIC_INFO,
  },
  MASTER_CATEGORY_V2: {
    containerId: generateComponentId(['masterCategoryV2']),
    tabId: PRODUCT_DETAIL_TAB_ID.SUPPLY_LOGISTIC_INFO,
  },
  SEGMENTS: {
    containerId: generateComponentId(['segments']),
    tabId: PRODUCT_DETAIL_TAB_ID.SUPPLY_LOGISTIC_INFO,
  },
  DEMAND_STORAGE_INFO: {
    containerId: generateComponentId(['demandStorageInfo']),
    tabId: PRODUCT_DETAIL_TAB_ID.SUPPLY_LOGISTIC_INFO,
  },
  TRANSFER_INFO: {
    containerId: generateComponentId(['transferInfo']),
    tabId: PRODUCT_DETAIL_TAB_ID.SUPPLY_LOGISTIC_INFO,
  },
  GENERAL_INFO: {
    containerId: generateComponentId(['generalInfo']),
    tabId: PRODUCT_DETAIL_TAB_ID.SUPPLY_LOGISTIC_INFO,
  },
  SELLING_PRICE_FINANCIALS: {
    containerId: generateComponentId(['sellingPriceFinancials']),
    tabId: PRODUCT_DETAIL_TAB_ID.PRICING_INFO,
  },
  BUYING_PRICE_FINANCIALS: {
    containerId: generateComponentId(['buyingPriceFinancials']),
    tabId: PRODUCT_DETAIL_TAB_ID.PRICING_INFO,
  },
  MANUFACTURER: {
    containerId: generateComponentId(['manufacturer']),
    tabId: PRODUCT_DETAIL_TAB_ID.PRICING_INFO,
  },
};

export const PRODUCT_ACTIVATION_BE_KEY_TO_CONTAINER_MAP = {
  domainTypes: PRODUCT_DETAIL_CONTAINER.MARKET_INFO,
  category: PRODUCT_DETAIL_CONTAINER.MARKET_INFO,
  subCategory: PRODUCT_DETAIL_CONTAINER.MARKET_INFO,
  keywords: PRODUCT_DETAIL_CONTAINER.MARKET_INFO,
  productSource: PRODUCT_DETAIL_CONTAINER.MARKET_INFO,
  positions: PRODUCT_DETAIL_CONTAINER.POSITION_INFO,
  masterSubCategory: PRODUCT_DETAIL_CONTAINER.POSITION_INFO,
  categories: PRODUCT_DETAIL_CONTAINER.POSITION_INFO,
  subCategories: PRODUCT_DETAIL_CONTAINER.POSITION_INFO,
  bundleProductsCount: PRODUCT_DETAIL_CONTAINER.BUNDLE_INFO,
  bundleSubProductsForActivationCheck: PRODUCT_DETAIL_CONTAINER.BUNDLE_INFO,
  weightInfo: PRODUCT_DETAIL_CONTAINER.WEIGHT_INFO,
  displayType: PRODUCT_DETAIL_CONTAINER.DISPLAY_TYPE_INFO,
  name: PRODUCT_DETAIL_CONTAINER.PRODUCT_NAMES_INFO,
  displayName: PRODUCT_DETAIL_CONTAINER.PRODUCT_NAMES_INFO,
  shortName: PRODUCT_DETAIL_CONTAINER.PRODUCT_NAMES_INFO,
  hfssInfo: PRODUCT_DETAIL_CONTAINER.HFSS_INFO,
  barcodes: PRODUCT_DETAIL_CONTAINER.BARCODE,
  sapReferenceCode: PRODUCT_DETAIL_CONTAINER.SAP_REFERENCE_CODE_INFO,
  packagingInfo: PRODUCT_DETAIL_CONTAINER.PACKAGING_INFO,
  brandId: PRODUCT_DETAIL_CONTAINER.BRAND,
  brandName: PRODUCT_DETAIL_CONTAINER.BRAND,
  level1: PRODUCT_DETAIL_CONTAINER.MASTER_CATEGORY_V2,
  level2: PRODUCT_DETAIL_CONTAINER.MASTER_CATEGORY_V2,
  level3: PRODUCT_DETAIL_CONTAINER.MASTER_CATEGORY_V2,
  level4: PRODUCT_DETAIL_CONTAINER.MASTER_CATEGORY_V2,
  segments: PRODUCT_DETAIL_CONTAINER.SEGMENTS,
  demandType: PRODUCT_DETAIL_CONTAINER.DEMAND_STORAGE_INFO,
  storageType: PRODUCT_DETAIL_CONTAINER.DEMAND_STORAGE_INFO,
  vat: PRODUCT_DETAIL_CONTAINER.SELLING_PRICE_FINANCIALS,
  price: PRODUCT_DETAIL_CONTAINER.SELLING_PRICE_FINANCIALS,
  subProductPrices: PRODUCT_DETAIL_CONTAINER.SELLING_PRICE_FINANCIALS,
  supplierBuyingFinancials: PRODUCT_DETAIL_CONTAINER.BUYING_PRICE_FINANCIALS,
  paymentDueDay: PRODUCT_DETAIL_CONTAINER.BUYING_PRICE_FINANCIALS,
  suppliers: PRODUCT_DETAIL_CONTAINER.BUYING_PRICE_FINANCIALS,
  manufacturerId: PRODUCT_DETAIL_CONTAINER.MANUFACTURER,
  manufacturer: PRODUCT_DETAIL_CONTAINER.MANUFACTURER,
  subType: PRODUCT_DETAIL_CONTAINER.PRODUCT_TYPE_INFO,
  transferLimitType: PRODUCT_DETAIL_CONTAINER.TRANSFER_INFO,
  shipmentType: PRODUCT_DETAIL_CONTAINER.TRANSFER_INFO,
  transferColiCount: PRODUCT_DETAIL_CONTAINER.TRANSFER_INFO,
  transferType: PRODUCT_DETAIL_CONTAINER.TRANSFER_INFO,
  planningSegment: PRODUCT_DETAIL_CONTAINER.TRANSFER_INFO,
  minStock: PRODUCT_DETAIL_CONTAINER.GENERAL_INFO,
};

export const DOMAIN_STOCK_KEYS = {
  G10: 1,
  G30: 3,
  G40: 4,
};

export const PACKAGING_TYPE = {
  IMPERIAL: 1,
  UNIT: 2,
};

export const MASTER_CATEGORY_PAYLOAD_FIELDS = {
  LEVEL1: 10,
  LEVEL2: 20,
  LEVEL3: 30,
  LEVEL4: 40,
};

export const MASTER_CATEGORY_STATUS = {
  ACTIVE: 1,
  PASSIVE: 0,
};

export const CATEGORY_ROLES = {
  POWER: 'Power',
  TRAFFIC: 'Traffic',
  ESSENTIAL: 'Essential',
  BASKET_FILLER: 'Basket Filler',
};

export const KVI_LABEL = {
  KVI: 'KVI',
  FOREGROUND: 'FOREGROUND',
  BACKGROUND: 'BACKGROUND',
};
