import {
  GETIR_10_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
  GETIR_MALL_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
  GETIR_BITAKSI_DOMAIN_TYPE,
  GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
  GETIR_JOB_DOMAIN_TYPE,
  GETIR_DRIVE_DOMAIN_TYPE,
  GETIR_N11_DOMAIN_TYPE,
} from '@shared/shared/constants';

export const optionalControlOption = {
  1: {
    name: 'totalOrderCountControl',
    label: {
      en: 'Total Order Count Control',
      tr: 'Toplam Sipariş Sayısı Kontrolü',
    },
    eligibleDomains: [
      GETIR_10_DOMAIN_TYPE,
      GETIR_FOOD_DOMAIN_TYPE,
      GETIR_MARKET_DOMAIN_TYPE,
      GETIR_VOYAGER_DOMAIN_TYPE,
      GETIR_MALL_DOMAIN_TYPE,
      GETIR_LOCALS_DOMAIN_TYPE,
      GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
      GETIR_N11_DOMAIN_TYPE,
    ],
    totalOrderCountControllerOption: {
      1: { en: 'Getir10', tr: 'Getir10' },
      2: { en: 'GetirFood', tr: 'GetirYemek' },
      3: { en: 'GetirMore', tr: 'GetirBüyük' },
      4: { en: 'GetirWater', tr: 'GetirSu' },
      6: { en: 'GetirLocal', tr: 'GetirÇarşı' },
    },
  },
  2: {
    name: 'stock',
    label: {
      en: 'Stock Level Control',
      tr: 'Stok Seviyesi Kontrolü',
    },
    inclusionTypeOptions: {
      1: { en: 'All', tr: 'Tümü' },
      2: { en: 'Any', tr: 'Herhangi biri' },
    },
    eligibleDomains: [
      GETIR_10_DOMAIN_TYPE,
      GETIR_MARKET_DOMAIN_TYPE,
      GETIR_VOYAGER_DOMAIN_TYPE,
      GETIR_MALL_DOMAIN_TYPE,
      GETIR_LOCALS_DOMAIN_TYPE,
      GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
      GETIR_N11_DOMAIN_TYPE,
    ],
  },
  3: {
    name: 'aggression',
    label: {
      en: 'Aggression Level Control',
      tr: 'Agresiflik Seviyesi Kontrolü',
    },
    aggressionLevel: {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
    },
    eligibleDomains: [
      GETIR_10_DOMAIN_TYPE,
      GETIR_MARKET_DOMAIN_TYPE,
      GETIR_VOYAGER_DOMAIN_TYPE,
      GETIR_MALL_DOMAIN_TYPE,
      GETIR_LOCALS_DOMAIN_TYPE,
      GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
      GETIR_JOB_DOMAIN_TYPE,
      GETIR_N11_DOMAIN_TYPE,
    ],
  },
  4: {
    name: 'cityAndWarehouseControl',
    label: {
      en: 'Location Based Controls',
      tr: 'Lokasyon Bazlı Kontroller',
    },
    eligibleDomains: [
      GETIR_10_DOMAIN_TYPE,
      GETIR_FOOD_DOMAIN_TYPE,
      GETIR_MARKET_DOMAIN_TYPE,
      GETIR_VOYAGER_DOMAIN_TYPE,
      GETIR_MALL_DOMAIN_TYPE,
      GETIR_LOCALS_DOMAIN_TYPE,
      GETIR_BITAKSI_DOMAIN_TYPE,
      GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
      GETIR_JOB_DOMAIN_TYPE,
      GETIR_DRIVE_DOMAIN_TYPE,
      GETIR_N11_DOMAIN_TYPE,
    ],
  },
  5: {
    name: 'availableDayPeriods',
    label: {
      en: 'Daily Planner',
      tr: 'Günlük Planlama',
    },
    eligibleDomains: [
      GETIR_10_DOMAIN_TYPE,
      GETIR_FOOD_DOMAIN_TYPE,
      GETIR_MARKET_DOMAIN_TYPE,
      GETIR_VOYAGER_DOMAIN_TYPE,
      GETIR_MALL_DOMAIN_TYPE,
      GETIR_LOCALS_DOMAIN_TYPE,
      GETIR_BITAKSI_DOMAIN_TYPE,
      GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
      GETIR_JOB_DOMAIN_TYPE,
      GETIR_DRIVE_DOMAIN_TYPE,
      GETIR_N11_DOMAIN_TYPE,
    ],
  },
  6: {
    name: 'segment',
    label: {
      en: 'Segment',
      tr: 'Segment',
    },
    inclusionTypeOptions: {
      1: { en: 'All', tr: 'Tümü' },
      2: { en: 'Any', tr: 'Herhangi biri' },
    },
    eligibleDomains: [
      GETIR_10_DOMAIN_TYPE,
      GETIR_FOOD_DOMAIN_TYPE,
      GETIR_MARKET_DOMAIN_TYPE,
      GETIR_VOYAGER_DOMAIN_TYPE,
      GETIR_MALL_DOMAIN_TYPE,
      GETIR_LOCALS_DOMAIN_TYPE,
      GETIR_BITAKSI_DOMAIN_TYPE,
      GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
      GETIR_JOB_DOMAIN_TYPE,
      GETIR_DRIVE_DOMAIN_TYPE,
      GETIR_N11_DOMAIN_TYPE,
    ],
  },
  7: {
    name: 'marketCategoryIds',
    label: {
      en: 'Getir Sub Category Control',
      tr: 'Getir Alt Kategori Kontrol',
    },
    eligibleDomains: [
      GETIR_10_DOMAIN_TYPE,
      GETIR_MARKET_DOMAIN_TYPE,
    ],
  },
  8: {
    name: 'localVerticalShopIds',
    label: {
      en: 'Getir Locals Shop Control',
      tr: 'Getir Çarşı Mağaza Kontrol',
    },
    eligibleDomains: [
      GETIR_LOCALS_DOMAIN_TYPE,
    ],
  },
  9: {
    name: 'localVerticalIds',
    label: {
      en: 'Getir Locals Vertical Control',
      tr: 'Getir Çarşı Dikey Kontrol',
    },
    eligibleDomains: [
      GETIR_LOCALS_DOMAIN_TYPE,
    ],
  },
  10: {
    name: 'localServiceAreaShopIds',
    label: {
      en: 'Getir Locals Shop Service Areea Control',
      tr: 'Getir Çarşı Servis Alanı Mağaza Kontrol',
    },
    eligibleDomains: [
      GETIR_LOCALS_DOMAIN_TYPE,
    ],
  },
  11: {
    name: 'versionControl',
    label: {
      en: 'Version Control',
      tr: 'Versiyon Kontrolü',
    },
    eligibleDomains: [
      GETIR_10_DOMAIN_TYPE,
      GETIR_FOOD_DOMAIN_TYPE,
      GETIR_MARKET_DOMAIN_TYPE,
      GETIR_VOYAGER_DOMAIN_TYPE,
      GETIR_MALL_DOMAIN_TYPE,
      GETIR_LOCALS_DOMAIN_TYPE,
      GETIR_BITAKSI_DOMAIN_TYPE,
      GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
      GETIR_JOB_DOMAIN_TYPE,
      GETIR_DRIVE_DOMAIN_TYPE,
      GETIR_N11_DOMAIN_TYPE,
    ],
  },

};
