import {
  PRODUCT_GROUP_FILTER,
  PRODUCT_REFRIGERATOR_TEMPERATURE_TYPE,
  PRODUCT_STORAGE_TYPE,
  PRODUCT_GROUP_TYPE,
  PRODUCT_GROUP_PLACEMENT,
  PRODUCT_GROUP_HIERARCHY,
  KVI_LABEL,
  DOMAIN_TYPE,
} from '@app/pages/MarketProduct/constants';
import { MARKET_PRODUCT_TYPE } from '@shared/shared/constants';

export const productDemandTypes = {
  impulse: {
    en: 'Impulse',
    tr: 'Anlık tüketim',
  },
  convenience: {
    en: 'Convenience',
    tr: 'Kolay Tüketim',
  },
  emergency: {
    en: 'Emergency',
    tr: 'Acil Tüketim',
  },
};

export const productStorageTypes = {
  [PRODUCT_STORAGE_TYPE.FROZEN]: {
    en: 'Frozen (-18C and lower)',
    tr: 'Donuk (-18 ve daha düşük)',
  },
  [PRODUCT_STORAGE_TYPE.CHILLED]: {
    en: 'Chilled (0/+4C)',
    tr: 'Soğuk Zincir (0/+4)',
  },
  [PRODUCT_STORAGE_TYPE.MEAT_CHICKEN_FISH]: {
    en: 'Meat & Chicken & Fish (0/+2C)',
    tr: 'Et & Tavuk & Balık (0/+2)',
  },
  [PRODUCT_STORAGE_TYPE.AMBIENT]: {
    en: 'Ambient',
    tr: 'Oda koşulları',
  },
  [PRODUCT_STORAGE_TYPE.LOCKDOWN]: {
    en: 'Lockdown',
    tr: 'Değerli Ürün',
  },
  [PRODUCT_STORAGE_TYPE.FRUIT_AND_VEGETABLE]: {
    en: 'Fruit & Vegetable (+8/+12C)',
    tr: 'Meyve & Sebze (+8/+12)',
  },
  [PRODUCT_STORAGE_TYPE.DELIQUESCENT]: {
    en: 'Deliquescent',
    tr: 'Erime Riski',
  },
};

export const imperialProductStorageTypes = {
  [PRODUCT_STORAGE_TYPE.FROZEN]: {
    en: 'Frozen (20F and below)',
    tr: 'Donuk (20F ve altı)',
  },
  [PRODUCT_STORAGE_TYPE.CHILLED]: {
    en: 'Chilled (32-40F)',
    tr: 'Soğuk Zincir (32-40F)',
  },
  [PRODUCT_STORAGE_TYPE.MEAT_CHICKEN_FISH]: {
    en: 'Meat & Chicken & Fish',
    tr: 'Et & Tavuk & Balık',
  },
  [PRODUCT_STORAGE_TYPE.AMBIENT]: {
    en: 'Ambient (41F and above)',
    tr: 'Oda koşulları (41F ve üzeri)',
  },
  [PRODUCT_STORAGE_TYPE.LOCKDOWN]: {
    en: 'Lockdown',
    tr: 'Değerli Ürün',
  },
  [PRODUCT_STORAGE_TYPE.FRUIT_AND_VEGETABLE]: {
    en: 'Fruit & Vegetable',
    tr: 'Meyve & Sebze',
  },
  [PRODUCT_STORAGE_TYPE.DELIQUESCENT]: {
    en: 'Deliquescent',
    tr: 'Erime Riski',
  },
};

export const productRefrigeratorTemperatureTypes = {
  [PRODUCT_REFRIGERATOR_TEMPERATURE_TYPE.C10]: {
    en: '-23 / -18',
    tr: '-23 / -18',
  },
  [PRODUCT_REFRIGERATOR_TEMPERATURE_TYPE.C20]: {
    en: '-18 / -15',
    tr: '-18 / -15',
  },
  [PRODUCT_REFRIGERATOR_TEMPERATURE_TYPE.C30]: {
    en: '-22 / -12',
    tr: '-22 / -12',
  },
  [PRODUCT_REFRIGERATOR_TEMPERATURE_TYPE.C40]: {
    en: '-25 / -18',
    tr: '-25 / -18',
  },
  [PRODUCT_REFRIGERATOR_TEMPERATURE_TYPE.C50]: {
    en: '+1 / +10',
    tr: '+1 / +10',
  },
  [PRODUCT_REFRIGERATOR_TEMPERATURE_TYPE.C60]: {
    en: '-2 / +11',
    tr: '-2 / +11',
  },
};

export const imperialProductRefrigeratorTemperatureTypes = {
  [PRODUCT_REFRIGERATOR_TEMPERATURE_TYPE.C10]: {
    en: '-9.4 / -0.4',
    tr: '-9.4 / -0.4',
  },
  [PRODUCT_REFRIGERATOR_TEMPERATURE_TYPE.C20]: {
    en: '-0.4 / 5',
    tr: '-0.4 / 5',
  },
  [PRODUCT_REFRIGERATOR_TEMPERATURE_TYPE.C30]: {
    en: '-7.6 / 10.4',
    tr: '-7.6 / 10.4',
  },
  [PRODUCT_REFRIGERATOR_TEMPERATURE_TYPE.C40]: {
    en: '-13 / -0.4',
    tr: '-13 / -0.4',
  },
  [PRODUCT_REFRIGERATOR_TEMPERATURE_TYPE.C50]: {
    en: '33.8 / 50',
    tr: '33.8 / 50',
  },
  [PRODUCT_REFRIGERATOR_TEMPERATURE_TYPE.C60]: {
    en: '28.4 / 51.8',
    tr: '28.4 / 51.8',
  },
};

export const pieceTypeProductUnits = { 1: { en: 'piece', tr: 'adet' } };

export const weightTypeProductUnits = { 2: { en: 'kg', tr: 'kg' } };

export const typeBasedProductUnits = {
  [MARKET_PRODUCT_TYPE.PIECE]: pieceTypeProductUnits,
  [MARKET_PRODUCT_TYPE.WEIGHT]: weightTypeProductUnits,
};

export const productGroupFilters = {
  [PRODUCT_GROUP_FILTER.NAME]: {
    en: 'Group Name',
    tr: 'Grup İsmi',
  },
  [PRODUCT_GROUP_FILTER.USER_ID]: {
    en: 'User Id',
    tr: 'Kullanıcı Id',
  },
  [PRODUCT_GROUP_FILTER.ACTIVE]: {
    en: 'Active',
    tr: 'Aktif',
  },
  [PRODUCT_GROUP_FILTER.INACTIVE]: {
    en: 'Inactive',
    tr: 'İnaktif',
  },
  [PRODUCT_GROUP_FILTER.PLACEMENT]: {
    en: 'Placement',
    tr: 'Yerleşim',
  },
  [PRODUCT_GROUP_FILTER.AB_TEST_VALUE_ID]: {
    en: 'AB Test Value ID',
    tr: 'AB Testi Değişken Id',
  },
  [PRODUCT_GROUP_FILTER.AB_TEST_VARIABLE_NAME]: {
    en: 'AB Test Variable Name',
    tr: 'AB Testi Değişken Adı',
  },
};

export const operationTypeEnums = { PERCENTAGE: 'PERCENTAGE' };

export const hfssFoodCategoryTypes = [
  '1 - Prepared soft drinks containing added sugar ingredients',
  '2 - Savoury Snacks',
  '3 - Breakfast Cereals',
  '4 - Confectionary inc. chocolate and sweets',
  '5 - Ice cream etc',
  '6 - Cakes and cupcakes',
  '7 - Sweet biscuits and bars',
  '8 - Morning goods',
  '9 - Desserts and Puddings',
  '10 - Sweetened yoghurt and fromage frais',
  '11 - Pizza',
  '12 - Potato products',
  '13 - Complete Ready Meals, Meal centres, breaded or battered products',
];

export const productSegments2 = {
  1: {
    en: 'Core',
    tr: 'Core',
  },
  2: {
    en: 'Essentials',
    tr: 'Essentials',
  },
  3: {
    en: 'Complimentary',
    tr: 'Complimentary',
  },
  4: {
    en: 'Delist',
    tr: 'Delist',
  },
};

export const getirMarketDomainTypes = {
  [DOMAIN_TYPE.GETIR10]: { en: 'Getir10', tr: 'Getir10' },
  [DOMAIN_TYPE.GETIR_MORE]: { en: 'GetirMore', tr: 'GetirBüyük' },
  [DOMAIN_TYPE.GETIR_WATER]: { en: 'GetirWater', tr: 'GetirSu' },
  [DOMAIN_TYPE.GETIR_N11]: { en: 'GetirN11', tr: 'GetirN11' },
  [DOMAIN_TYPE.GORILLAS]: { en: 'Gorillas', tr: 'Gorillas' },
};

export const productSources = {
  getir: {
    en: 'Getir',
    tr: 'Getir',
  },
  gorillas_only: {
    en: 'Gorillas only',
    tr: 'Gorillas only',
  },
  gorillas_merged: {
    en: 'Gorillas merged',
    tr: 'Gorillas merged',
  },
};

export const productGroupTypes = {
  [PRODUCT_GROUP_TYPE.MANUAL]: {
    en: 'Manual',
    tr: 'El ile',
  },
  [PRODUCT_GROUP_TYPE.ALGORITHM]: {
    en: 'Algorithm',
    tr: 'Algoritma',
  },
};

export const productGroupPlacements = {
  [PRODUCT_GROUP_PLACEMENT.DBL]: 'DBL',
  [PRODUCT_GROUP_PLACEMENT.PERSONAL_CATEGORY]: 'Personal Category',
  [PRODUCT_GROUP_PLACEMENT.PRE_SEARCH]: 'Pre Search',
  [PRODUCT_GROUP_PLACEMENT.PRODUCT_DETAIL]: 'Product Detail',
  [PRODUCT_GROUP_PLACEMENT.BASKET]: 'Basket',
  [PRODUCT_GROUP_PLACEMENT.PROMO_DETAIL]: 'Promo Detail',
  [PRODUCT_GROUP_PLACEMENT.CHECKOUT_WALK]: 'Checkout Walk',
  [PRODUCT_GROUP_PLACEMENT.PRE_DBL]: 'Pre DBL',
  [PRODUCT_GROUP_PLACEMENT.RECOGNIZER]: 'Recognizer',
  [PRODUCT_GROUP_PLACEMENT.BASKET_SUBSTITUTE]: 'Basket Substitute',
};

export const productGroupHierarchies = {
  [PRODUCT_GROUP_HIERARCHY.PRIMARY]: {
    en: 'Primary',
    tr: 'Birincil',
  },
  [PRODUCT_GROUP_HIERARCHY.FALLBACK]: {
    en: 'Fallback',
    tr: 'İkincil',
  },
};

export const kviLabels = {
  [KVI_LABEL.KVI]: { en: 'KVI', tr: 'KVI' },
  [KVI_LABEL.FOREGROUND]: { en: 'Foreground', tr: 'Foreground' },
  [KVI_LABEL.BACKGROUND]: { en: 'Background', tr: 'Background' },
};
