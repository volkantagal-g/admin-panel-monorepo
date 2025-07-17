export const COUNT_LIMIT = 2000;
export const MIN_DELIVERY_FEE = 0;
export const MAX_DELIVERY_FEE = 100;
export const DELIVERY_FEE_CONFIRMATION_THRESHOLD = 10;

export const PROMO_TARGET = {
  ALL: 1,
  GETIR_10: 2,
  GETIR_FOOD: 3,
  GETIR_MARKET: 4,
  GETIR_ARTISAN: 6,
};

export const PROMO_FINANCED_BY = {
  SUPPLIER: 1,
  THIRD_PARTY: 2,
  GETIR: 3,
};

export const promoTargets = {
  1: {
    en: 'Market & Food & Locals',
    tr: 'Market & Yemek & Çarşı',
  },
  2: {
    en: 'Istanbul Getir10',
    tr: 'İstanbul Getir10',
  },
  3: {
    en: 'GetirYemek',
    tr: 'GetirYemek',
  },
  4: {
    en: 'GetirMore & Getir10 & GetirWater',
    tr: 'GetirBüyük & Getir10 & GetirSu',
  },
  6: {
    en: 'GetirLocals',
    tr: 'GetirÇarşı',
  },
};

export const getirMarketDomainTypes = {
  1: { en: 'Getir10', tr: 'Getir10' },
  2: { en: 'GetirFood', tr: 'GetirYemek' },
  3: { en: 'GetirMore', tr: 'GetirBüyük' },
  4: { en: 'GetirWater', tr: 'GetirSu' },
  6: { en: 'GetirLocals', tr: 'GetirÇarşı' },
};

export const promoFinancedBy = {
  1: {
    tr: 'Tedarikçi Desteği',
    en: 'Supplier Support',
  },
  2: {
    tr: 'Üçüncü Parti Desteği',
    en: 'Third Party Support',
  },
  3: {
    tr: 'Getir',
    en: 'Getir',
  },
};
