export const typeListValues = {
  PRODUCT_LIST: 81,
  PRODUCT: 82,
  PROMO_DETAIL: 15,
};

export const distributionRates = Object.freeze({
  MAX_VALUE: 1,
  MIN_VALUE: 0,
});

export const distributionTypes = Object.freeze({
  GETIR_WATER: {
    value: 'GETIR_WATER',
    tr: 'GetirSu',
    en: 'GetirWater',

  },
  VENDOR: {

    value: 'VENDOR',
    tr: 'Bayi',
    en: 'Vendor',

  },
  FIRM: {
    value: 'FIRM',

    tr: 'Firma',
    en: 'Firm',

  },
  HYBRID: {
    value: 'HYBRID',
    tr: 'Hibrit',
    en: 'Hybrid',

  },
});

export const typeList = {
  81: {
    tr: 'Ürün Listeleme',
    en: 'Product List',
  },
  82: {
    tr: 'Ürün',
    en: 'Product',
  },
  15: {
    tr: 'Kampanya Detay',
    en: 'Promo Detail',
  },
};

export const buttonActionTypeListValues = {
  BRAND_PAGE: 81,
  PRODUCT: 82,
  PROMO_DETAIL: 15,
};

export const buttonActionTypeList = {
  81: {
    tr: 'Marka Sayfası',
    en: 'Brand Page',
  },
  82: {
    tr: 'Ürün',
    en: 'Product',
  },
  15: {
    tr: 'Kampanya Detay',
    en: 'Promo Detail',
  },
};

export const redirectToListValues = {
  PRODUCT_LIST: 81,
  PRODUCT: 82,
  PROMO_DETAIL: 15,
};

export const redirectToList = {
  81: {
    tr: 'Ürün Listeleme',
    en: 'Product List',
  },
  82: {
    tr: 'Ürün',
    en: 'Product',
  },
  15: {
    tr: 'Kampanya Detay',
    en: 'Promo Detail',
  },
};

export const abusivesList = {
  1: { en: 'Suspicious', tr: 'Şüpheli' },
  2: { en: 'Abuse', tr: 'Kötüye Kullanım' },
  3: { en: 'Fraudster', tr: 'Suistimal' },
};

export const platformListValues = {
  IOS: 1,
  Android: 2,
};

export const platformList = [
  {
    value: 1,
    label: 'IOS',
  },
  {
    value: 2,
    label: 'Android',
  },
];

export const paymentMethodsList = {
  1: {
    tr: 'Online',
    en: 'Online',
  },
  2: {
    tr: 'Kapıda Ödeme',
    en: 'Door',
  },
};

export const targetListValues = { GETIRWATER_MARKETPLACE: 1 };

export const targetList = {
  1: {
    tr: 'GetirSu MarketPlace',
    en: 'GetirWater MarketPlace',
  },
};

export const segmentTypeList = {
  2: {
    tr: 'Promosyonu Kullanabilecekler',
    en: 'Can Use',
  },
  3: {
    tr: 'Promosyonu Kullanamayacaklar',
    en: 'Cannot Use',
  },
};

export const promoTypes = {
  DISCOUNT: 1,
  PAY_X_GET_Y: 2,
};

export const ALL_OPTION = 'ALL';

export const getAllOption = t => {
  return { value: ALL_OPTION, label: t('getirWaterCampaignsPage:ALL') };
};
