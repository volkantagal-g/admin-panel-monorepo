import moment from 'moment';

export interface LanguageGlobal {
  tr?: string;
  en?: string;
  fr?: string;
  de?: string;
  nl?: string;
  it?: string;
  pt?: string;
  es?: string;
  'en-US'?: string;
}

export enum PROMO_AGGRESSION_STATE {
  NEVER_CLOSE = 0,
  OPET_AT_FIRST = 1,
  OPEN_AT_SECOND = 2,
  OPEN_AT_THIRD = 3,
  OPEN_AT_FOURTH = 4,
  OPEN_AT_FIFTH = 5,
}

export enum MobileAppActionType {
  None = 1,
  RedirectToURL = 2,
  InAppRedirection = 3,
  ShowProduct = 5,
  ShowCategory = 6,
  SearchInApplication = 7,
  ShowMultipleProducts = 8,
  OpenApplication = 10,
  AddToBasket = 11,
  PhoneCall = 13,
  OpenPromotion = 15,
  ShowPromotionProducts = 16,
  OpenAnnouncement = 17,
  RedirectToRestaurantDetail = 30,
  RedirectToRestaurantList = 31,
  LoyaltyListPage = 32,
  RedirectToLocalsStoreList = 34,
  RedirectToLocalsStoreDetail = 35,
  GetirLocalsMerchantDetail = 60,
  GetirLocalsFilteredMerchantList = 66,
  GetirLocalsChainMerchantDetail = 67,
  GetirLocalsCuisineFilteringList = 69,
  GetirLocalsMerchantSearchTaggedList = 70,
}

export interface ConfirmationPopup {
  message: LanguageGlobal | null;
  positiveButton: { text: LanguageGlobal | null };
  negativeButton: { text: LanguageGlobal | null };
}

export interface RestaurantActionPayload {
  id: MongoIDType
  name: string
}

export interface MobileAppActionData {
  url?: string
  redirectToBrowser?: boolean
  pageId?: number
  productId?: MongoIDType
  categoryId?: MongoIDType
  products?: MongoIDType[]
  keyword?: string
  playStoreUrl?: string
  appId?: string
  packageName?: string
  urlSchema?: string
  productName?: string
  gsm?: string;
  promoId?: string
  promoCode?: string
  announcementId?: MongoIDType
  announcementTitle?: string
  restaurantId?: MongoIDType
  restaurantName?: string
  restaurants?: RestaurantActionPayload[]
  stores?: RestaurantActionPayload[]
  store?: MongoIDType
  storeName?: string
  shop?: MongoIDType
  shopName?: string
  chainId?: MongoIDType
  filterShops?: MongoIDType
  getirLocalsMerchantType?: number | string
  clickCategory?: MongoIDType
  tagId?: MongoIDType
  merchantTypeId?: MongoIDType
}

export interface MobileAppAction {
  confirmationPopup?: ConfirmationPopup
  type: MobileAppActionType;
  data: MobileAppActionData
  isConfirmationPopupEnabled?: boolean | null;
  dataBackup?: any;
  service?: number;
  text?: LanguageGlobal;
  ownerService?: number;
}

export interface Banner {
  priority?: number;
  isLandingPageBanner?: boolean;
  isServiceHomePageBanner?: boolean;
  picUrl?: LanguageGlobal;
  picBackgroundUrl?: LanguageGlobal;
  picForegroundUrl?: LanguageGlobal;
  title?: LanguageGlobal;
  description?: LanguageGlobal;
  action?: MobileAppAction;
  button?: {
    text?: LanguageGlobal;
    action?: MobileAppAction;
  };
  isServiceCategoryDetailPageBanner?: boolean;
  serviceCategoryVerticalPages?: number[];
  isServiceBusinessDetailPageBanner?: boolean;
  serviceBusinessMerchantShops?: any[];
}

export interface BenefitItem {
  id: string;
  saleLimit: number;
  alreadySold: number;
  discountedPrice?: number;
  supplierSupport: number | null;
  thirdPartySupport: number | null;
  supplierSupportReferenceId: string | null;
  thirdPartyReferenceId: string | null;
  isBundle?: boolean;
  type?: number;
  isSold?: boolean;
}

export interface ConditionItem {
  id: string;
  discountedPrice?: number;
  supplierSupport: number | null;
  thirdPartySupport: number | null;
  supplierSupportReferenceId: string | null;
  thirdPartyReferenceId: string | null;
  isSold: boolean;
}

export interface AvailableTime {
  startMin?: number;
  endMin?: number
}

export enum PromoStatus {
  Inactive = 1,
  Active = 2,
  Expired = 3,
  OrderLimitReached = 4,
  ClientLimitReached = 5,
  Used = 6,
  Preparing = 7
}

export interface PromoTagType {
  _id: MongoIDType
  promoCode: string
  bgColor?: string
  textColor?: string
}

export interface ParentPromo extends PromoTagType {
  status: PromoStatus,
  validFrom: string,
  validUntil: string,
  createdAt: string,
}

export interface ChildPromo {
  _id: MongoIDType
  createdAt: string
  promoCode: string
  status: PromoStatus
  bgColor?: string
  textColor?: string
  domainTypes: Promo['domainTypes']
  creatorParentId?: MongoIDType
  parentId: MongoIDType | null
  isParent: boolean
  master: PromoTagType | null
}

export enum AICommunicationsAsset {
  Notification = 1
}

export enum AICommunicationsStatus {
  Failed = 1,
  InProgress = 2,
  Waiting = 3,
  Sending = 4,
  Success = 5
}

export interface AICommunicationsDetails {
  data: {
    assets: AICommunicationsAsset[]
    description: string;
    status: AICommunicationsStatus
  } | null;
  status: 'success',
  timestamp: number
}

export interface City {
  _id: MongoIDType;
  name: LanguageGlobal;
}

export interface Warehouse {
  _id: MongoIDType;
  name: string;
  city: City;
}

export enum CallerType {
  Unknown = -1,
  Client = 0,
  Courier = 1,
  Store = 2,
  Admin = 3,
  System = 4,
  TestDriveCourier = 5
}

export enum FlowType {
  Normal = 0,
  Gain = 1
}

export enum PromoTarget {
  MarketFoodLocals = 1,
  IstanbulGetir10 = 2,
  GetirYemek = 3,
  GetirMoreGetir10GetirWaterGorillas = 4,
  GetirLocals = 6
}

export enum PromoDomains {
  Getir10 = 1,
  GetirFood = 2,
  GetirMore = 3,
  GetirWater = 4,
  GetirLocals = 6,
  Gorillas = 17
}

export enum PromoMechanic {
  X_TL_PLUS_ORDERS_GET_Y_FOR_FREE = 1,
  PAY_X_TL_TAKE_Y_TL = 2,
  PERCENT_DISCOUNT = 3,
  BUY_X_AND_GET_Y_FOR_FREE = 4,
  BUY_X_GET_Y_TL_DISCOUNT = 5,
  CHANGE_PRICE = 6,
  BASKET_CHANGE_PRICE = 7,
  STAR_DEALS = 8
}

export enum DiscountReason {
  Subscription = 1,
  General = 2
}

export interface Promo {
  _id: MongoIDType;
  createdAt: string;
  updatedAt: string;
  updatedAtL: string;
  createdBy?: MongoIDType;
  createdRef: CallerType;
  flowType: FlowType;
  flow?: {
    isValidWithPromo: boolean;
    promoIds: MongoIDType[];
    validAfterDay?: number;
    validAfterMin?: number;
    gainedSegment: number[];
    lostSegment: number[];
    expireSegment: number[];
    gainedOrderCount: number;
    gainedTotalPrice: number;
    gainedTotalWholesalePrice: number;
    gainedTotalVatValue: number;
    gainedTotalDiscountAmount: number;
    expireAfterMin?: number;
  };
  validFrom: string;
  validUntil: string;
  validTimes?: any;
  validRanges?: { start?: string; end?: string }[];
  region?: number[];
  applyType?: number;
  status: PromoStatus;
  useLimit: number;
  useLimitPerDay?: number;
  useLimitPerRestaurant?: number;
  dailyUseLimitPerRestaurant?: number;
  isRestaurantBadgeEnabled?: boolean;
  clientLimitCount?: number;
  orderLimitCount?: number;
  clientSegments: number[];
  clientExSegments?: number[];
  usedOrderCount: number;
  usedTotalPrice: number;
  usedTotalWholesalePrice: number;
  usedTotalVatValue: number;
  usedTotalDiscountAmount: number;
  promoType: PromoType;
  foodDeliveryType?: number;
  foodBasketValueBehaviorType?: number;
  promoTarget: PromoTarget;
  promoMechanic: PromoMechanic;
  discountReason?: number;
  discountAmount: number;
  originalDiscountAmount: number;
  changePrice?: number;
  maxOrderTotalPrice: number;
  minOrderTotalPrice: number;
  reqDaysAfterLastOrder: number;
  reqDaysAfterLastFoodOrder: number;
  minSucOrderCount: number;
  maxSucOrderCount: number;
  minSucFoodOrderCount: number;
  maxSucFoodOrderCount: number;
  minSucArtisanOrderCount: number;
  maxSucArtisanOrderCount: number;
  minSucLocalsChainOrderCount: number;
  maxSucLocalsChainOrderCount: number;
  maxSucKuzeydenOrderCount: number;
  minSucKuzeydenOrderCount: number;
  maxSucWaterOrderCount: number;
  minSucWaterOrderCount: number;
  maxSucMarketOrderCount: number;
  minSucMarketOrderCount: number;
  minSucGorillasOrderCount: number;
  maxSucGorillasOrderCount: number;
  minChurnProbability: number;
  maxChurnProbability: number;
  promoCode: string;
  thirdPartyCodePromo?: MongoIDType;
  priority: number;
  promoURL?: LanguageGlobal;
  thumbnailURL?: LanguageGlobal;
  picURL?: LanguageGlobal;
  title?: LanguageGlobal;
  titleV2?: LanguageGlobal;
  description?: LanguageGlobal;
  descriptionV2?: LanguageGlobal;
  accessibilityLabel?: LanguageGlobal;
  items: BenefitItem[];
  exItems?: MongoIDType[];
  excludedProductCategories?: MongoIDType[];
  excludedProductSubCategories?: MongoIDType[];
  maxItemCount: number;
  client?: MongoIDType;
  promoUsageType: PromoUsageType;
  condition: {
    items: ConditionItem[];
    categories?: MongoIDType[];
    discountRateByItems: number;
    minItemCount: number;
    minItemTotalAmount: number;
  };
  popup?: {
    message?: LanguageGlobal;
    imageUrl?: LanguageGlobal;
    negativeButton?: {
      text?: LanguageGlobal;
    };
    positiveButton?: {
      text?: LanguageGlobal;
      type?: number;
      data?: any;
    };
  };
  popupShowPeriodMin?: number;
  maxPopupShowCount?: number;
  isPopupEnabled?: boolean;
  isAbleToAddStamp?: boolean;
  discountedAmounts?: any[];
  bgColor?: string;
  textColor?: string;
  platforms?: number[];
  paymentMethods?: number[];
  segmentsToAdd?: number[];
  isBalanceEnabled?: boolean;
  isEnableBottomPrice?: boolean;
  thirdPartySupportRate: number;
  supplierSupportRate: number;
  isFreeProduct: boolean;
  includeItemsToMinOrder?: boolean;
  discountPromoItemPriceOnly?: boolean;
  isDemandIncrease?: boolean;
  isLocationPromo?: boolean;
  supplier?: string;
  promoClassification?: {
    promoClass?: number;
    responsibleDepartment?: string;
    objective?: number;
    occasion?: number;
    daypart?: number;
    weekpart?: number;
    funnelSegment?: number;
    benefitGroup?: number;
    productTLGroup?: number;
    location?: number;
    internalReason?: string;
  };
  doNotChargeDeliveryFee: boolean;
  deliveryFee: {
    amount?: number;
    doNotCharge: boolean;
  };
  doNotApplyMinimumBasketSize?: boolean;
  stores?: MongoIDType[];
  notification?: any;
  availableTimes?: AvailableTime[];
  deviceTypes: string[];
  deviceModels?: string[];
  isHealthCareProfessionalsPromo?: boolean;
  isOnlyPremiumDeviceModels?: boolean;
  isLocalCountryPhoneCodeRequired?: boolean;
  isPublic?: boolean;
  isOnlyNotPremiumDeviceModels?: boolean;
  visibleStores?: MongoIDType[];
  excludedProductsMastercategoriesV2?: any[];
  visibleWarehouses?: MongoIDType[];
  visibleWarehousesZones?: {
    warehouse?: MongoIDType;
    visibleZones?: number[];
  }[];
  isVisible?: boolean;
  aggressionLevel?: number;
  isAggressionStateNonAffected: boolean;
  openAggressionStates: PROMO_AGGRESSION_STATE[];
  clientRfmSegments?: string[];
  clientExRfmSegments?: string[];
  cardBins?: string[];
  promoContentSectionTitle?: any;
  promoContentURL?: any;
  promoContentHTML?: any;
  promoBodyContentURL?: any;
  domainMinBasketSizes?: {
    getir10?: number;
    market?: number;
    water?: number;
    gorillas?: number;
  };
  promoBodyContentHTML?: any;
  isBannerEnabled?: boolean;
  banner?: Banner;
  button: {
    text: LanguageGlobal | null;
    action: MobileAppAction;
  };
  promoGroup?: MongoIDType;
  restaurants?: MongoIDType[];
  excludedRestaurants?: MongoIDType[];
  shareButtons?: {
    packageName?: string;
    bundleId?: string;
    iconUrl?: string;
    deeplink?: string;
    includeMedia?: boolean;
    text?: string;
  }[];
  isAutoAggressionLevelEnabled?: boolean;
  autoAggressionLevels?: {
    startMin?: number;
    endMin?: number;
    aggressionLevel?: number;
  }[];
  domainTypes: PromoDomains[];
  warehouses: MongoIDType[];
  country?: MongoIDType;
  parentId: MongoIDType | null;
  countryCode?: string;
  foodProductTag?: string;
  cities: MongoIDType[];
  isChainRestaurant?: boolean;
  chainRestaurant?: MongoIDType;
  foodProducts?: MongoIDType[];
  masterFoodProducts?: MongoIDType[];
  foodProductMinItemCount?: number;
  tag?: MongoIDType;
  isAnalyticsTracking?: boolean;
  analyticsTrackingKey?: string;
  foodCampaignTrackerType?: string;
  periodicUsageLimit?: {
    timePeriod?: number;
    usageLimit?: number;
  };
  linkedPromos: MongoIDType[];
  dependentPromos: MongoIDType[];
  discountedWeekdayCount?: number;
  benefitType?: BenefitType;
  badgeId?: MongoIDType;
  sentToSap?: boolean;
  isParent: boolean;
  doNotAllowMultiUsage: boolean;
  promoMechanicsSet: PromoMechanicsSet;
  sapCorrelationId?: string;
  isP3Enabled?: boolean;
  isCommsEnabled?: boolean;
  uniqueClientCount: number,
  children: ChildPromo[]
  aiCommunicationsStatus: AICommunicationsDetails | null
  isParentPromo: boolean
  childIds: MongoIDType[]
  parentIds: MongoIDType[]
  parentPromoDetails: {
    createdChildrenCount: number
    totalChildrenCount: number
    addedChildrenCount: number
    activePromoCount: number
  }
  master: PromoTagType | null
  hierarchy: PromoHierarchy
  parents: ParentPromo[]
  multipleTimeUsageLimit: number
  termsAndConditions?: TermsAndConditions
}

export interface GeneralInformationFormType {
  promoTarget: PromoTarget,
  domainTypes: PromoDomains[],
  promoCode: string,
  deviceTypes: string[],
  openAggressionStates: PROMO_AGGRESSION_STATE[]
  isAggressionStateNonAffected: boolean
  priority: number
  validFrom: moment.Moment,
  validUntil: moment.Moment,
  cities: MongoIDType[],
  warehouses: MongoIDType[]
}

export interface Supplier {
  _id: MongoIDType
  name: string
  supplierReferenceId?: string
}

export enum ChildPromoGenerationType {
  ThroughBenefitProducts = 1,
  ThroughSegment = 2
}

export interface MarketProduct {
  _id: MongoIDType
  type?: ProductType
  isBundle?: boolean
  name?: {
    tr?: string
    en?: string
  }
  fullName?: {
    tr?: string
    en?: string
  }
  picURL?: {
    tr?: string
    en?: string
  }
}

export enum PromoHierarchy {
  Parent = 1,
  Master = 2,
  Single = 3,
  Child = 4
}

export enum BulkOpMessage {
  NotFound = 'NOT_FOUND',
  Success = 'SUCCESS',
  InvalidPromoMechanic = 'INVALID_PROMO_MECHANIC',
  CannotAddChildPromoToNonParentError = 'CANNOT_ADD_CHILD_PROMO_TO_NON_PARENT_ERROR',
  CannotRemoveChildPromoFromNonParentError = 'CANNOT_REMOVE_CHILD_PROMO_FROM_NON_PARENT_ERROR',
  EmptyDiscountProductsError = 'ERR_PROMO_DISCOUNT_PRODUCTS',
  MinReqItemCannotBeZeroError = 'ERR_MIN_REQ_ITEM_COUNT_SHOULD_BE_GREATER_THAN_0',
  EmptyCampaignUrlError = 'ERR_EMPTY_CAMPAIGN_URL',
  EmptyClassificationError = 'ERR_EMPTY_CLASSIFICATION',
  EmptyBadgeError = 'ERR_EMPTY_BADGE',
  EmptyPromoImageError = 'ERR_EMPTY_PROMO_IMAGE',
  InvalidAggressionStateForNeverCloseError = 'INVALID_AGGRESSION_STATE_FOR_NEVER_CLOSE',
  InvalidAggressionStateForActiveError = 'INVALID_AGGRESSION_STATE_FOR_ACTIVE',
  Fail = 'FAIL'
}

export type RelationalBulkOpMessage = {
  _id: MongoIDType
  promoCode: string
  bgColor?: string
  textColor?: string
  message: BulkOpMessage
}

export enum RelationalBulkOperation {
  AddRemove = 'add-remove',
  StatusChange = 'status-change'
}

// Discount Type
export enum BenefitType {
  Percent = 1,
  Amount = 2,
  DiscountedAmount = 3,
}

export enum PromoType {
  Amount = 1,
  Percentage = 2,
  ChangePrice = 3,
}

export type SupplierProjection = {
  supplierReferenceId?: string
}

export enum ProductType {
  Piece = 1,
  Weight = 2,
  Recipe = 3,
  Equipment = 4,
  Bag = 5,
}

export interface BenefitProduct {
  id: MongoIDType,
  fullName?: LanguageGlobal,
  picURL?: LanguageGlobal,
  type?: ProductType,
  isBundle?: boolean,
  saleLimit?: number | null,
  discountedPrice?: number | null,
  supplierSupport: number | null,
  thirdPartySupport: number | null,
  alreadySold?: number | null,
  supplierSupportReferenceId: string | null,
  thirdPartyReferenceId: string | null,
}

export enum PromoUsageType {
  General = 1,
  Personal = 2,
}

export interface TermsAndConditions {
  checkboxes: {
    isMinBasketEnabled: boolean;
    isMaxBenefitEnabled: boolean;
    isValidDatesEnabled: boolean;
    isExampleUsagesEnabled: boolean;
    isExcludedProductsEnabled: boolean;
    isFreeDeliveryEnabled: boolean;
    isLegalEnabled: boolean;
    isValidityEnabled: boolean;
  },
  campaignDetails: {
    minBasket: LanguageGlobal;
    maxBenefit: LanguageGlobal;
    freeDelivery: LanguageGlobal;
    validDates: LanguageGlobal;
  },
  exampleUsages: LanguageGlobal
  excludedProducts: LanguageGlobal
  conditions: {
    legal: LanguageGlobal
  }
}

export enum PromoMechanicsSet {
  Tab = 1,
  Listing = 2,
  Basket = 3
}
