import {
  BenefitType,
  DiscountReason,
  MobileAppActionType,
  PROMO_AGGRESSION_STATE,
  PromoDomains,
  PromoHierarchy,
  PromoMechanic,
  PromoStatus,
  PromoTarget,
  PromoType,
} from '@app/pages/Promo/types';

export const promoClasses = {
  1: { tr: 'Kampanyalar', en: 'Promotions' },
  2: { tr: 'Departman Kampanyaları', en: 'Department Promotions' },
};

export const promoOccasionTypes = {
  1: {
    en: 'Breakfast',
    tr: 'Kahvaltı',
    priority: 1,
  },
  2: {
    en: 'Sports Watching',
    tr: 'Spor İzleme',
    priority: 2,
  },
  3: {
    en: 'TV Watching',
    tr: 'TV İzleme',
    priority: 3,
  },
  4: {
    en: 'Snacking',
    tr: 'Atıştırma',
    priority: 4,
  },
  5: {
    en: 'Dinner',
    tr: 'Yemek',
    priority: 5,
  },
  6: {
    en: 'Baby',
    tr: 'Bebek',
    priority: 6,
  },
  7: {
    en: 'Home Care',
    tr: 'Ev Bakımı',
    priority: 7,
  },
  8: {
    en: 'Personal Care',
    tr: 'Kişisel Bakım',
    priority: 8,
  },
  9: {
    en: 'Sexual Wellness',
    tr: 'Cinsel Sağlık',
    priority: 9,
  },
  10: {
    en: 'Special Occasions',
    tr: 'Özel Günler',
    priority: 10,
  },
  12: {
    en: 'New Year\'s Day',
    tr: 'Yılbaşı',
    priority: 11,
  },
  13: {
    en: 'Valentine\'s Day',
    tr: 'Sevgililer Günü',
    priority: 12,
  },
  14: {
    en: '23 April',
    tr: '23 Nisan',
    priority: 13,
  },
  15: {
    en: 'Mother\'s Day',
    tr: 'Anneler Günü',
    priority: 14,
  },
  16: {
    en: 'Father\'s Day',
    tr: 'Babalar Günü',
    priority: 15,
  },
  17: {
    en: 'Ramadan Holiday',
    tr: 'Ramazan Bayramı',
    priority: 16,
  },
  18: {
    en: 'National Match',
    tr: 'Milli Maç',
    priority: 17,
  },
  19: {
    en: 'Derby Day',
    tr: 'Derbi Günü',
    priority: 18,
  },
  20: {
    en: 'Getir Birthday',
    tr: 'Getir Doğum Günü',
    priority: 19,
  },
  21: {
    en: 'GetirMore Birthday',
    tr: 'GetirBüyük Doğum Günü',
    priority: 20,
  },
  22: {
    en: 'Purple Discount',
    tr: 'Mor İndirimler',
    priority: 21,
  },
  23: {
    en: 'Office Hours',
    tr: 'Proje Mesai Savar',
    priority: 22,
  },
  24: {
    en: 'TGI Weekend',
    tr: 'Yaşasın Hafta sonu',
    priority: 23,
  },
  25: {
    en: 'Family Weekend Fun',
    tr: 'Hafta Sonu Keyfi',
    priority: 24,
  },
  26: {
    en: 'Half of Hours',
    tr: 'YYS',
    priority: 25,
  },
  27: {
    en: 'Big Buy Thursday',
    tr: 'Halk Günü',
    priority: 26,
  },
  28: {
    en: 'You Deserve It',
    tr: 'Şımart Kendini',
    priority: 27,
  },
  29: {
    en: 'Shop Your Way',
    tr: 'Seç Beğen Al',
    priority: 28,
  },
  30: {
    en: 'Outstanding Prices',
    tr: 'Kaçmaz Fiyatlar',
    priority: 29,
  },
  11: {
    en: 'All',
    tr: 'Hepsi',
    priority: 30,
  },
};

export const promoDaypartTypes = {
  1: {
    en: 'Morning',
    tr: 'Sabah',
  },
  2: {
    en: 'Noon',
    tr: 'Öğle',
  },
  3: {
    en: 'Afternoon',
    tr: 'Öğleden Sonra',
  },
  4: {
    en: 'Evening',
    tr: 'Akşam',
  },
  5: {
    en: 'Night',
    tr: 'Gece',
  },
  6: {
    en: 'All',
    tr: 'Hepsi',
  },
};

export const promoWeekpartTypes = {
  1: {
    en: 'Weekend',
    tr: 'Haftasonu',
  },
  2: {
    en: 'Weekday',
    tr: 'Haftaiçi',
  },
  3: {
    en: 'All',
    tr: 'Hepsi',
  },
};

export const promoFunnelSegmentTypes = {
  1: {
    en: '1st',
    tr: '1.',
  },
  2: {
    en: '2nd',
    tr: '2.',
  },
  3: {
    en: '3rd',
    tr: '3.',
  },
  4: {
    en: '+3',
    tr: '+3',
  },
  5: {
    en: '+10',
    tr: '+10',
  },
  6: {
    en: 'Everyone',
    tr: 'Herkes',
  },
};

export const promoBenefitGroupTypes = {
  1: {
    en: 'Benefit >: Condition (Charged)',
    tr: 'Benefit >: Condition (Charged)',
  },
  2: {
    en: 'Benefit >: 25% of Condition (Charged)',
    tr: 'Benefit >: 25% of Condition (Charged)',
  },
  3: {
    en: 'Other',
    tr: 'Diğer',
  },
};

export const promoProductTLGroupTypes = {
  1: {
    en: 'PtoP',
    tr: 'PtoP',
  },
  2: {
    en: 'PtoTL',
    tr: 'PtoTL',
  },
  3: {
    en: 'TLtoTL',
    tr: 'TLtoTL',
  },
  4: {
    en: 'TLtoP',
    tr: 'TLtoP',
  },
};

export const promoLocationTypes = {
  1: {
    en: 'Home',
    tr: 'Ev',
  },
  2: {
    en: 'Office',
    tr: 'Ofis',
  },
  3: {
    en: 'Outdoor',
    tr: 'Açık Hava',
  },
  4: {
    en: 'All',
    tr: 'Hepsi',
  },
};

export const promoObjectiveTypes = {
  1: {
    en: 'Acquisition',
    tr: 'Acquisition',
  },
  2: {
    en: 'Habit Building',
    tr: 'Habit Building',
  },
  3: {
    en: 'Upsell - Frequency',
    tr: 'Upsell - Frequency',
  },
  4: {
    en: 'Upsell - Basket',
    tr: 'Upsell - Basket',
  },
  5: {
    en: 'Activation - Watch-out',
    tr: 'Activation - Watch-out',
  },
  6: {
    en: 'Activation - Re-Activate - Churn',
    tr: 'Activation - Re-Activate - Churn',
  },
  7: {
    en: 'Activation - Re-Activate - Cohort',
    tr: 'Activation - Re-Activate - Cohort',
  },
  8: {
    en: 'Burn - Bayi Mutluluk',
    tr: 'Burn - Bayi Mutluluk',
  },
  9: {
    en: 'Discount Code',
    tr: 'Discount Code',
  },
  10: {
    en: 'Waste',
    tr: 'Waste',
  },
  11: {
    en: 'RAF - Sender',
    tr: 'RAF - Sender',
  },
  15: {
    en: 'GetirSelect',
    tr: 'GetirSeç',
  },
};

export const UPDATE_SIGNED_URL_PARAMS = {
  bucket: 'getir',
  folder: 'misc',
  promoFolder: 'promos',
};

type PromoMechanics = {
  [key: number]: {
    [key: string]: string;
  };
};

export const promoMechanics: PromoMechanics = {
  1: {
    en: 'Pay X get product Y for free',
    tr: 'X birim öde Y ürünü hediye',
  },
  2: {
    en: 'pay X unit take Y unit discount',
    tr: 'X birim öde Y birim al',
  },
  3: {
    en: '% discount',
    tr: '% indirimi',
  },
  4: {
    en: 'Buy X and get Y for free',
    tr: 'X ürünü alana Y ürünü hediye',
  },
  5: {
    en: 'Buy X and get Y unit discount',
    tr: 'X ürünü alana Y birim indirim',
  },
  6: {
    en: 'Change Price',
    tr: 'Fiyat Değişikliği',
  },
  7: {
    en: 'Basket-based Change Price',
    tr: 'Sepet bazlı Fiyat Değişikliği',
  },
  8: {
    en: 'Star Deals',
    tr: 'Sepetin Yıldızları',
  },
};

export const tabPromoMechanics: PromoMechanics = {
  1: {
    en: 'Pay X get product Y for free',
    tr: 'X birim öde Y ürünü hediye',
  },
  2: {
    en: 'pay X unit take Y unit discount',
    tr: 'X birim öde Y birim al',
  },
  3: {
    en: '% discount',
    tr: '% indirimi',
  },
  7: {
    en: 'Basket-based Change Price',
    tr: 'Sepet bazlı Fiyat Değişikliği',
  },
};

export const basketPromoMechanics: PromoMechanics = {
  8: {
    en: 'Star Deals',
    tr: 'Sepetin Yıldızları',
  },
};

export const badgePromoMechanics: PromoMechanics = {
  4: {
    en: 'Buy X and get Y for free',
    tr: 'X ürünü alana Y ürünü hediye',
  },
  5: {
    en: 'Buy X and get Y unit discount',
    tr: 'X ürünü alana Y birim indirim',
  },
  6: {
    en: 'Change Price',
    tr: 'Fiyat Değişikliği',
  },
};

export const discountReasons = {
  [DiscountReason.Subscription]: {
    en: 'Subscription',
    tr: 'Abonelik',
  },
  [DiscountReason.General]: {
    en: 'General',
    tr: 'Genel',
  },
};

export const promoTargets = {
  [PromoTarget.MarketFoodLocals]: {
    en: 'Market & Food & Locals',
    tr: 'Market & Yemek & Çarşı',
  },
  [PromoTarget.IstanbulGetir10]: {
    en: 'Istanbul Getir10',
    tr: 'İstanbul Getir10',
  },
  [PromoTarget.GetirYemek]: {
    en: 'GetirYemek',
    tr: 'GetirYemek',
  },
  [PromoTarget.GetirMoreGetir10GetirWaterGorillas]: {
    en: 'GetirMore & Getir10 & GetirWater & Gorillas',
    tr: 'GetirBüyük & Getir10 & GetirSu & Gorillas',
  },
  [PromoTarget.GetirLocals]: {
    en: 'GetirLocals',
    tr: 'GetirÇarşı',
  },
};

export const allDomainTypeValues = [1, 2, 3, 4, 6, 17];

export const allDomainTypes = {
  1: { en: 'Getir10', tr: 'Getir10' },
  2: { en: 'GetirFood', tr: 'GetirYemek' },
  3: { en: 'GetirMore', tr: 'GetirBüyük' },
  4: { en: 'GetirWater', tr: 'GetirSu' },
  6: { en: 'GetirLocals', tr: 'GetirÇarşı' },
  17: { en: 'Gorillas', tr: 'Gorillas' },
};

export const promoTargetToDomainMap = {
  [PromoTarget.MarketFoodLocals]: {
    1: { en: 'Getir10', tr: 'Getir10' },
    2: { en: 'GetirFood', tr: 'GetirYemek' },
    3: { en: 'GetirMore', tr: 'GetirBüyük' },
    6: { en: 'GetirLocals', tr: 'GetirÇarşı' },
  },
  [PromoTarget.IstanbulGetir10]: { 1: { en: 'Getir10', tr: 'Getir10' } },
  [PromoTarget.GetirYemek]: { 2: { en: 'GetirYemek', tr: 'GetirYemek' } },
  [PromoTarget.GetirMoreGetir10GetirWaterGorillas]: {
    1: { en: 'Getir10', tr: 'Getir10' },
    3: { en: 'GetirMore', tr: 'GetirBüyük' },
    4: { en: 'GetirWater', tr: 'GetirSu' },
    17: { en: 'Gorillas', tr: 'Gorillas' },
  },
  [PromoTarget.GetirLocals]: { 6: { en: 'GetirLocals', tr: 'GetirÇarşı' } },
};

const BENEFIT_TYPE_TRANSLATIONS = {
  [BenefitType.Percent]: {
    en: '% Discount',
    tr: '% İndirim',
  },
  [BenefitType.Amount]: {
    en: 'Amount Discount',
    tr: 'Tutar İndirimi',
  },
  [BenefitType.DiscountedAmount]: {
    en: 'Discounted Amount',
    tr: 'İndirimli Tutar',
  },
};
export const discountTypes = {
  [PromoMechanic.X_TL_PLUS_ORDERS_GET_Y_FOR_FREE]: {
    [BenefitType.Percent]: BENEFIT_TYPE_TRANSLATIONS[BenefitType.Percent],
    [BenefitType.Amount]: BENEFIT_TYPE_TRANSLATIONS[BenefitType.Amount],
  },
  [PromoMechanic.PAY_X_TL_TAKE_Y_TL]: { [BenefitType.Amount]: BENEFIT_TYPE_TRANSLATIONS[BenefitType.Amount] },
  [PromoMechanic.PERCENT_DISCOUNT]: { [BenefitType.Percent]: BENEFIT_TYPE_TRANSLATIONS[BenefitType.Percent] },
  [PromoMechanic.BUY_X_AND_GET_Y_FOR_FREE]: {
    [BenefitType.Percent]: BENEFIT_TYPE_TRANSLATIONS[BenefitType.Percent],
    [BenefitType.Amount]: BENEFIT_TYPE_TRANSLATIONS[BenefitType.Amount],
  },
  [PromoMechanic.BUY_X_GET_Y_TL_DISCOUNT]: { [BenefitType.Amount]: BENEFIT_TYPE_TRANSLATIONS[BenefitType.Amount] },
  [PromoMechanic.CHANGE_PRICE]: { [BenefitType.DiscountedAmount]: BENEFIT_TYPE_TRANSLATIONS[BenefitType.DiscountedAmount] },
  [PromoMechanic.BASKET_CHANGE_PRICE]: { [BenefitType.DiscountedAmount]: BENEFIT_TYPE_TRANSLATIONS[BenefitType.DiscountedAmount] },
  [PromoMechanic.STAR_DEALS]: { [BenefitType.DiscountedAmount]: BENEFIT_TYPE_TRANSLATIONS[BenefitType.DiscountedAmount] },
};

export const foodPromoBasketValueBehaviorTypes = {
  1: {
    en: 'Discounted Price can be below min. basket size',
    tr: 'Promolu tutar min. sepet altına insin',
  },
  2: {
    en: 'Discounted Price is over min. basket size',
    tr: 'Promolu tutar min. sepet üzerinde kalsın',
  },
  3: {
    en: 'Restaurant-financed Discounted Price is over min. basket size',
    tr: 'Restoran-financed promolu tutar min. sepet üzerinde kalsın',
  },
};

export const excludedPromoAbusers = [
  {
    id: '',
    level: { tr: 'Hiçbiri', en: 'None' },
    excludedSegments: [],
  },
  {
    id: 21927,
    level: { tr: 'Şüpheli', en: 'Suspicious' },
    excludedSegments: [21927, 21928, 21929],
  },
  {
    id: 21928,
    level: { tr: 'Kötüye Kullanım', en: 'Abuser' },
    excludedSegments: [21928, 21929],
  },
  {
    id: 21929,
    level: { tr: 'Suistimal', en: 'Fraudster' },
    excludedSegments: [21929],
  },
];

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

export const statusTypes = {
  0: { en: 'All', tr: 'her şey' },
  [PromoStatus.Inactive]: { en: 'Inactive', tr: 'İnaktif' },
  [PromoStatus.Active]: { en: 'Active', tr: 'Aktif' },
};

export const promoStatuses = {
  [PromoStatus.Inactive]: {
    en: 'Inactive',
    tr: 'İnaktif',
  },
  [PromoStatus.Active]: {
    en: 'Active',
    tr: 'Aktif',
  },
  [PromoStatus.Expired]: {
    en: 'Expired',
    tr: 'Süresi Bitti',
  },
  [PromoStatus.OrderLimitReached]: {
    en: 'Order Limit Reached',
    tr: 'Sipariş Limitine Ulaşıldı',
  },
  [PromoStatus.ClientLimitReached]: {
    en: 'Client Limit Reached',
    tr: 'Kullanıcı Limitine Ulaşıldı',
  },
  [PromoStatus.Used]: {
    en: 'Used',
    tr: 'Kullanıldı',
  },
  [PromoStatus.Preparing]: {
    en: 'Preparing',
    tr: 'Hazırlanıyor',
  },
};

export const countryPaymentMethods = {
  '55999ad00000010000000000': [
    {
      _id: 1,
      name: {
        en: 'MasterPass',
        tr: 'MasterPass',
      },
    },
    {
      _id: 2,
      name: {
        en: 'BKM Express',
        tr: 'BKM Express',
      },
    },
    {
      _id: 13,
      name: {
        en: 'İstanbulkart',
        tr: 'IstanbulCard',
      },
    },
    {
      _id: 16,
      name: {
        en: 'GetirAccount',
        tr: 'GetirHesap',
      },
    },
    {
      _id: 20,
      name: {
        en: 'GetirMoney',
        tr: 'GetirPara',
      },
    },
  ],
  '55999ad00000020000000000': [
    {
      _id: 14,
      name: {
        en: 'Adyen',
        tr: 'Adyen',
      },
    },
  ],
  '6059b3a1252472aba0790d64': [
    {
      _id: 14,
      name: {
        en: 'Adyen',
        tr: 'Adyen',
      },
    },
  ],
  '6059b3a7252472aba0790d65': [
    {
      _id: 14,
      name: {
        en: 'Adyen',
        tr: 'Adyen',
      },
    },
  ],
  '6059b3ad252472aba0790d66': [
    {
      _id: 14,
      name: {
        en: 'Adyen',
        tr: 'Adyen',
      },
    },
  ],
  '60e83e3c5bde82e31d9d8733': [
    {
      _id: 14,
      name: {
        en: 'Adyen',
        tr: 'Adyen',
      },
    },
  ],
  '60e83e3e5bde82e31d9d8735': [
    {
      _id: 14,
      name: {
        en: 'Adyen',
        tr: 'Adyen',
      },
    },
  ],
  '60e83e3d5bde82e31d9d8734': [
    {
      _id: 14,
      name: {
        en: 'Adyen',
        tr: 'Adyen',
      },
    },
  ],
  '61370da7a937eb4e96795fec': [
    {
      _id: 14,
      name: {
        en: 'Adyen',
        tr: 'Adyen',
      },
    },
  ],
  '61370da7a937eb4e96795fed': [
    {
      _id: 14,
      name: {
        en: 'Adyen',
        tr: 'Adyen',
      },
    },
  ],
  '61370da7a937eb4e96795fee': [
    {
      _id: 14,
      name: {
        en: 'Adyen',
        tr: 'Adyen',
      },
    },
  ],
  '61371db7a937eb4e96795fee': [
    {
      _id: 14,
      name: {
        en: 'Adyen',
        tr: 'Adyen',
      },
    },
  ],
};

export const promoSegmentTypes = {
  1: { tr: 'Promosyonu kullananlar', en: 'Already used' },
  2: { tr: 'Promosyonu kullanabilecekler', en: 'Can use' },
  3: { tr: 'Promosyonu kullanamayacaklar', en: 'Cannot use' },
};
export const contentSections = {
  tr: 'İndirim Detayları',
  en: 'Offer Details',
  de: 'Details zum Angebot',
  nl: 'Promotie Details',
  'en-us': 'Offer Details',
};

export const PROMO_CLASS = {
  PROMOTIONS: 1,
  DEPARTMENT_PROMOTIONS: 2,
};

const PROMO_OBJECTIVE_TYPE = {
  ACQUISITION: 1,
  HABIT_BUILDING: 2,
  UPSELL_FREQUENCY: 3,
  UPSELL_BASKET: 4,
  ACTIVATION_WATCH_OUT: 5,
  ACTIVATION_RE_ACTIVATE_CHURN: 6,
  ACTIVATION_RE_ACTIVATE_COHORT: 7,
  BURN_BAYI_MUTLULUK: 8,
  DISCOUNT_CODE: 9,
  WASTE: 10,
  RAF_SENDER: 11,
  GETIR_SELECT: 15,
};

export const PROMO_MECHANIC_TYPES = {
  PAY_X_GET_PRODUCT_Y_FOR_FREE: 1,
  PAY_X_UNIT_TAKE_Y_UNIT_DISCOUNT: 2,
  PERCENT_DISCOUNT: 3,
  BUY_X_GET_Y_FOR_FREE: 4,
  BUY_X_GET_Y_UNIT_DISCOUNT: 5,
  CHANGE_PRICE: 6,
  STAR_DEALS: 8,
};

export const promotionsObjectiveTypes = [
  PROMO_OBJECTIVE_TYPE.ACQUISITION,
  PROMO_OBJECTIVE_TYPE.HABIT_BUILDING,
  PROMO_OBJECTIVE_TYPE.UPSELL_FREQUENCY,
  PROMO_OBJECTIVE_TYPE.UPSELL_BASKET,
  PROMO_OBJECTIVE_TYPE.ACTIVATION_WATCH_OUT,
  PROMO_OBJECTIVE_TYPE.ACTIVATION_RE_ACTIVATE_CHURN,
  PROMO_OBJECTIVE_TYPE.ACTIVATION_RE_ACTIVATE_COHORT,
  PROMO_OBJECTIVE_TYPE.RAF_SENDER,
  PROMO_OBJECTIVE_TYPE.GETIR_SELECT,
];

export const departmentPromotionsObjectiveTypes = [
  PROMO_OBJECTIVE_TYPE.BURN_BAYI_MUTLULUK,
  PROMO_OBJECTIVE_TYPE.DISCOUNT_CODE,
  PROMO_OBJECTIVE_TYPE.WASTE,
];

export const PROMO_IMAGES = {
  PIC_URL: {
    DIMENSIONS: {
      width: 2453,
      height: 1072,
    },
  },
  THUMBNAIL_URL: { RATIO: ['1:1'] },
};

export enum PromoUsageType {
  NORMAL = 0,
  GENERAL = 1,
  PERSONAL = 2,
}

export const PAGINATION_SETTINGS = {
  DEFAULT: 1,
  ROWSPERPAGE: 10,
};

export const DATE_DISPLAY_FORMAT = 'DD/MM/YYYY hh:mm A';

export const GETIR_LOCAL_DOMAIN_TYPE = 6;
export const ERROR_TIMEOUT_MS = 3000;

export const PROMO_PAYMENT_METHODS = {
  MASTERPASS: 1,
  BKM_EXPRESS: 2,
  ISTANBUL_CARD: 13,
  ADYEN: 14,
  GETIR_ACCOUNT: 16,
};

export const WORKING_HOURS_MINS_RANGE = 30;

export const DEFAULT_EXCLUDED_PROMO_ABUSER = {
  id: '',
  level: { tr: 'Hiçbiri', en: 'None' },
  excludedSegments: [],
};

export const DEFAULT_EXCLUDED_PROMO_ABUSER_UNIT = {
  id: 21928,
  level: { tr: 'Kötüye Kullanım', en: 'Abuser' },
  excludedSegments: [21928, 21929],
};

export const ALL_PROMO_EXCLUDED_SEGMENTS = [21927, 21928, 21929];

export const CLIENT_SEGMENT_EVERYONE = 0;
export const CLIENT_SEGMENT_SUCCESSFUL_ORDER = 200;

export const PROMO_APPLY_TYPES = {
  NORMAL: 0,
  FORCED: 1,
};

export const PROMO_FINANCED_BY = {
  SUPPLIER: 1,
  THIRD_PARTY: 2,
  GETIR: 3,
};

export const PROMO_TARGET = {
  ALL: 1,
  GETIR_10: 2,
  GETIR_FOOD: 3,
  GETIR_MARKET: 4,
  GETIR_ARTISAN: 6,
};

export const ALL_PROMO_DEVICE_TYPES = ['Android', 'iPhone', 'Web'];

export const PROMO_MECHANICS = {
  X_TL_PLUS_ORDERS_GET_Y_FOR_FREE: 1,
  PAY_X_TL_TAKE_Y_TL: 2,
  PERCENT_DISCOUNT: 3,
  BUY_X_AND_GET_Y_FOR_FREE: 4,
  BUY_X_GET_Y_TL_DISCOUNT: 5,
  CHANGE_PRICE: 6,
  BASKET_BASED_CHANGE_PRICE: 7,
  STAR_DEALS: 8,
};

export function getNumericValues(enumeration: any) {
  return Object.values(enumeration).filter(value => typeof value === 'number');
}

export const ACTIVE_PROMO_AGGRESSION_STATES = getNumericValues(PROMO_AGGRESSION_STATE)
  .filter((item: any) => item !== PROMO_AGGRESSION_STATE.NEVER_CLOSE) as PROMO_AGGRESSION_STATE[];

export const PROMO_DISCOUNT_CODE_URLS = {
  tr: 'https://cdn.getir.com/misc/discountcode_tr.jpg',
  en: 'https://cdn.getir.com/misc/discountcode_en.jpg',
  nl: 'https://cdn.getir.com/misc/discountcode_nl.jpeg',
  de: 'https://cdn.getir.com/misc/discountcode_de.jpeg',
  fr: 'https://cdn.getir.com/misc/discountcode_fr.jpeg',
  enUS: 'https://cdn.getir.com/misc/discountcode_en.jpg',
};

export const ALL_DOMAIN_TYPES = [1, 2, 3, 4, 6];

export const PROMO_PIC_CONFIG = {
  key: 'co:market:incentives:PIC_URL',
  type: 'Object',
};

export const EXCLUDE_PROMO_PRODUCTS_ACTIONS = {
  OVERRIDE: 1,
  EXCLUDE: 2,
  INCLUDE: 3,
};

export const ALREADY_EXISTS_ERROR_CODE = '11000';

export const PROMO_BADGE_VARIABLE = {
  REQUIRED_PRODUCT_COUNT: 'REQUIRED_PRODUCT_COUNT',
  REQUIRED_PRODUCT_AMOUNT: 'REQUIRED_PRODUCT_AMOUNT',
  DISCOUNT_AMOUNT: 'DISCOUNT_AMOUNT',
  DISCOUNTED_PRICE: 'DISCOUNTED_PRICE',
  MAX_ITEM_COUNT: 'MAX_ITEM_COUNT',
  MIN_REQUIRED_ITEM_COUNT: 'MIN_REQUIRED_ITEM_COUNT',
};

export const DOCUMENTATION_LINK = { PROMO_BADGE_VARIABLES: 'https://getirdev.atlassian.net/wiki/spaces/~63b68c108a07cbd184ac3b82/pages/2018313500/Usage+of+Variables+within+Badges' };

export const P3_STATUS = {
  IN_PROGRESS: 'IN_PROGRESS',
  FAILED: 'FAILED',
  DONE: 'DONE',
};

export const P3_ERROR = { CLIENT_NOT_FOUND: 'Client Not Found', PROCESSING: 'Processing CSV file creation' };

export const COMMS_ASSETS = { Notification: 1 };

export const promoDomainTypes = {
  [PromoDomains.Getir10]: { en: 'Getir10', tr: 'Getir10' },
  [PromoDomains.GetirFood]: { en: 'GetirFood', tr: 'GetirYemek' },
  [PromoDomains.GetirMore]: { en: 'GetirMore', tr: 'GetirBüyük' },
  [PromoDomains.GetirWater]: { en: 'GetirWater', tr: 'GetirSu' },
  [PromoDomains.GetirLocals]: { en: 'GetirLocals', tr: 'GetirÇarşı' },
  [PromoDomains.Gorillas]: { en: 'Gorillas', tr: 'Gorillas' },
};

export const PROMO_HIERARCHY_TRANSLATIONS = {
  [PromoHierarchy.Parent]: {
    en: 'Parent Promo',
    tr: 'Çatı Promo',
  },
  [PromoHierarchy.Master]: {
    en: 'Master  Promo',
    tr: 'Toplu promo',
  },
  [PromoHierarchy.Single]: {
    en: 'Single Promo',
    tr: 'Tekil Promo',
  },
  [PromoHierarchy.Child]: {
    en: 'Child Promo',
    tr: 'Alt Promo',
  },
};

export enum DeviceTypes {
  Android = 'Android',
  iPhone = 'iPhone',
  Web = 'Web',
}

export const mobileAppActionTypes = {
  [MobileAppActionType.None]: { en: 'None', tr: 'Hiçbiri' },
  [MobileAppActionType.RedirectToURL]: { en: 'Redirect to URL', tr: 'URL\'e Yönlendir' },
  [MobileAppActionType.InAppRedirection]: { en: 'In-App Redirection', tr: 'Uygulama İçi Yönlendirme' },
  [MobileAppActionType.ShowProduct]: { en: 'Show Product ', tr: 'Ürüne Giden' },
  [MobileAppActionType.ShowCategory]: { en: 'Show Category', tr: 'Kategoriye Giden' },
  [MobileAppActionType.SearchInApplication]: { en: 'Search in Application', tr: 'Uygulamada Arama Yapan' },
  [MobileAppActionType.ShowMultipleProducts]: { en: 'Show Multiple Products', tr: 'Ürün Listesi Açan' },
  [MobileAppActionType.OpenApplication]: { en: 'Open Application', tr: 'Uygulama Açan' },
  [MobileAppActionType.AddToBasket]: { en: 'Add To Basket', tr: 'Sepete Ürün Ekleyen' },
  [MobileAppActionType.PhoneCall]: { en: 'Phone Call', tr: 'Telefon ile Arama Yaptıran' },
  [MobileAppActionType.OpenPromotion]: { en: 'Open Promotion', tr: 'Kampanyaya Giden' },
  [MobileAppActionType.ShowPromotionProducts]: { en: 'Show Promotion Products', tr: 'Promosyon Ürünlerini Açan' },
  [MobileAppActionType.OpenAnnouncement]: { en: 'Open Announcement', tr: 'Duyuruya Giden' },
  [MobileAppActionType.RedirectToRestaurantDetail]: {
    en: 'Redirect to Restaurant Detail',
    tr: 'Restoran Detayına Yönlendirme',
  },
  [MobileAppActionType.RedirectToRestaurantList]: {
    en: 'Redirect to Restaurant List',
    tr: 'Restoran Listesine Yönlendirme',
  },
  [MobileAppActionType.LoyaltyListPage]: { en: 'Loyalty List Page', tr: 'Müdavim Listeleme Sayfası' },
  [MobileAppActionType.RedirectToLocalsStoreList]: {
    en: 'Redirect to Locals Store List',
    tr: 'İşletme Listesine Yönlendir',
  },
  [MobileAppActionType.RedirectToLocalsStoreDetail]: {
    en: 'Redirect to Locals Store Detail',
    tr: 'İşletme Detayına Yönlendir',
  },
  [MobileAppActionType.GetirLocalsMerchantDetail]: { en: 'GetirLocals Merchant Detail', tr: 'GetirÇarşı İşletme Detayı' },
  [MobileAppActionType.GetirLocalsFilteredMerchantList]: {
    en: 'GetirLocals Filtered Merchant List',
    tr: 'GetirÇarşı Filtreli İşletme Listesi',
  },
  [MobileAppActionType.GetirLocalsChainMerchantDetail]: {
    en: 'GetirLocals Chain Merchant Detail',
    tr: 'GetirÇarşı Zincir İşletme Detayı',
  },
  [MobileAppActionType.GetirLocalsCuisineFilteringList]: {
    en: 'GetirLocals Cuisine Filtering List',
    tr: 'GetirÇarşı İşletme Kategorisi Filtreleme Listesi',
  },
  [MobileAppActionType.GetirLocalsMerchantSearchTaggedList]: {
    en: 'GetirLocals Merchant Search Tagged List',
    tr: 'GetirÇarşı Tagli Arama Listesi',
  },
};

export const DefaultTermsAndConditions = {
  checkboxes: {
    isMinBasketEnabled: false,
    isMaxBenefitEnabled: false,
    isValidDatesEnabled: false,
    isExampleUsagesEnabled: false,
    isExcludedProductsEnabled: false,
    isFreeDeliveryEnabled: false,
    isLegalEnabled: false,
    isValidityEnabled: false,
  },
  campaignDetails: {
    autoApply: {
      tr: '• İndirim miktarı koşullara uyulduğunda otomatik olarak düşecektir.',
      en: '• The amount of discount will be automatically deducted during checkout.',
    },
    canBeCombined: {
      tr: '• Ödeme sayfasında yer alan diğer kampanyalar ile birlikte kullanılabilir.',
      en: '• It can be used together with other campaigns available on the payment page.',
    },
    checkoutApply: {
      tr: '• Ödeme sayfasında yalnız bir kampanya seçilebilir.',
      en: '• Only one campaign can be selected on the Order page.',
    },
    mustSelect: {
      tr: '• Bu kampanyadan yararlanmak için "Sipariş Ver" ekranında bu kampanyayı seçmen gerekir.',
      en: '• To benefit from this campaign, you need to select it on the "Place Order" screen.',
    },
    minBasket: {
      tr: '• Kampanyadan faydalanmak için X₺ sepet tutarına ulaşman gerekir.',
      en: '• To use the promo, you must exceed X TL minimum basket size.',
    },
    maxBenefit: {
      tr: '• Kampanya maksimum X TL indirim sağlar.',
      en: '• The campaign provides a maximum discount of X TL.',
    },
    freeDelivery: {
      tr: '• Kampanya kullanımında getirme ücreti alınmamaktadır.',
      en: '• The delivery fee is not charged when using the campaign.',
    },
    validDates: {
      tr: '• DDMMYY saat hh:mm\'a kadar geçerlidir.',
      en: '• Valid until DDMMYY at hh:mm PM.',
    },
  },
  exampleUsages: {
    tr:
      `• Örnek 1: Sepet 600 TL => 500 TL ödenir.
• Örnek 2: Sepet 700 TL => 600 TL ödenir.
• Örnek 3: Sepet 950 TL => 850 TL ödenir.`,
    en:
      `• Example 1: Example 600 TL => 500 TL is paid.
• Example 2: Example 700 TL => 600 TL is paid.
• Example 3: Example 950 TL => 850 TL is paid.`,
  },
  excludedProducts: {
    tr:
      `• Nutella kakaolu fındık kreması,
• Red Bull enerji içeceği,
• Kuzeyden su (5L) kampanyaya dahil değildir.
`,
    en:
      `• Nutella kakaolu fındık kreması,
• Red Bull enerji içeceği,
• Kuzeyden su (5L) are not included in the campaign.
`,
  },
  conditions: {
    validity: {
      tr: '• Bu kampanya tarafınıza otomatik olarak tanımlanmakta olup, anlık olarak değişebilecektir. ' +
        'Getir\'in kampanyanın geçerliliği ile ilgili taahhüdü, bu kampanyanın size tanımlanmasından itibaren 15 dakika ile sınırlıdır.',
      en: '• Getir\'s commitment to the campaign\'s validity is limited to 15 minutes from the moment it is assigned to you.',
    },
    legal: {
      tr: '• Bu kampanya Getir Perakende Lojistik A.Ş. tarafından Milli Piyango İdaresi Genel Müdürlüğü’nün 04.03.2025 ' +
        'tarihli ve E-58259698-255.01.02-69325 sayılı izni ile... ',
      en: '• This campaign is organized by Getir Perakende Lojistik A.Ş. with the permission of the General Directorate ' +
        'of National Lottery Administration dated 04.03.2025 and numbered E-58259698-255.01.02-69325.',
    },
    exclusion: {
      tr: '• Kampanyanın koşulları satın alma alışkanlıkların, bulunduğun bölgedeki yoğunluk gibi çeşitli değişkenlere bağlı olarak farklılık gösterebilir.',
      en: '• This campaign is exclusive to you and your location.',
    },
    stockAvailability: {
      tr: '• Kampanya stoklarla sınırlıdır.',
      en: '• The campaign is subject to stock availability.',
    },
  },
};

export const PromoTypeBenefitTypeMap = {
  [PromoType.Percentage]: BenefitType.Percent,
  [PromoType.Amount]: BenefitType.Amount,
  [PromoType.ChangePrice]: BenefitType.DiscountedAmount,
};

type GetBenefitTypeParam = {
  benefitType?: BenefitType
  promoType: PromoType
}

export function getBenefitType(promo: GetBenefitTypeParam): BenefitType {
  return promo.benefitType ?? PromoTypeBenefitTypeMap[promo.promoType];
}
