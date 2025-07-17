export const paymentTypesPropMap = {
  masterPass: {
    color: 'green',
    label: 'MasterPass',
  },
  oldBkms: {
    color: 'blue',
    label: 'BKM',
  },
  adyen: {
    color: 'orange',
    label: 'Adyen',
  },
  istanbulCard: {
    color: 'brown',
    lable: 'Istanbul Card',
  },
  na: {
    color: '',
    label: 'N/A',
  },
};

export const PROMO_ABUSER_CLIENT_SEGMENTS = {
  ORGANIC: 21926,
  SUSPICIOUS: 21927,
  ABUSER: 21928,
  FRAUDSTER: 21929,
};

export const PROMO_ABUSER_CLIENT_SEGMENTS_TO_KEYS = {
  21926: 'ORGANIC',
  21927: 'SUSPICIOUS',
  21928: 'ABUSER',
  21929: 'FRAUDSTER',
};

export const PROMO_ABUSER_CLIENT_SEGMENT_COLORS = {
  [PROMO_ABUSER_CLIENT_SEGMENTS.ORGANIC]: '#69B34C',
  [PROMO_ABUSER_CLIENT_SEGMENTS.SUSPICIOUS]: '#FFDC00',
  [PROMO_ABUSER_CLIENT_SEGMENTS.ABUSER]: '#F68000',
  [PROMO_ABUSER_CLIENT_SEGMENTS.FRAUDSTER]: '#FF0D0D',
};

export const PROMO_ABUSER_CLIENT_SEGMENT_SET = new Set(Object.values(PROMO_ABUSER_CLIENT_SEGMENTS));

export const marketOrderStatuses = {
  100: { en: 'Incomplete', tr: 'Tamamlanmadı' },
  200: { en: 'Aborted', tr: 'Durduruldu' },
  300: { en: 'Browsing', tr: 'Gözatılıyor' },
  350: { en: 'Reserved', tr: 'Rezerve' },
  375: { en: 'Waiting For Picker', tr: 'Toplayıcı Bekliyor' },
  400: { en: 'Verifying', tr: 'Doğrulanıyor' },
  500: { en: 'Preparing', tr: 'Hazırlanıyor' },
  550: { en: 'Prepared', tr: 'Hazırlandı' },
  600: { en: 'Handover', tr: 'El değiştiriliyor' },
  700: { en: 'Onway', tr: 'Yolda' },
  800: { en: 'Reached', tr: 'Ulaştı' },
  900: { en: 'Delivered', tr: 'Teslim edildi' },
  1000: { en: 'Rated', tr: 'Oylandı' },
  1100: { en: 'Canceled by Courier', tr: 'Kurye iptal etti' },
  1200: { en: 'Canceled by Client', tr: 'Müşteri iptal etti' },
  1300: { en: 'Canceled by Staff', tr: 'Depo Personeli iptal etti' },
  1400: { en: 'Canceled by System', tr: 'Sistem iptal etti' },
  1500: { en: 'Canceled by Admin', tr: 'Admin iptal etti' },
  1600: { en: 'Canceled by Restaurant', tr: 'Restoran iptal etti' },
};

export const MARKETING_COMMUNICATIONS_PREFERENCES_SOURCE = 7;

export const LOYALTY_DETAILS = {
  LOYALTY_STAMP_TYPES: {
    VIRTUAL: 'virtual',
    ORDER: 'order',
  },
};

export const CLIENT_MAX_DISCOUNT_WARN_CONFIG = {
  key: 'co:customer:WARN_DISCOUNT_AMOUNT',
  type: 'Number',
};

export const CLIENT_DEFAULT_DISCOUNT_AMOUNT = 1.00;
