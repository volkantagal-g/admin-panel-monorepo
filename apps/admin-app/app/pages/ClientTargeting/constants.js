import {
  GETIR_10_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_SELECT_MEMBERSHIP_STATUSES,
  GETIR_SELECT_MEMBERSHIP_DATE_TYPES,
  GETIR_SELECT_PAYMENT_TYPES,
  GETIR_SELECT_BENEFIT_TYPES,
  COMMUNICATION_CHANNEL_TYPES,
  GETIR_VOYAGER_DOMAIN_TYPE,
  MARKET_ORDER_STATUS,
} from '@shared/shared/constants';
import { convertConstantValueTranslationsToSelectOptions, removeNonDigits } from '@shared/utils/common';
import { INTERNATIONAL_DIALING_CODES } from '../Employee/constants';
import { BASKET_DETAIL_TYPES } from './components/GetirGeneralDetail/OrderProductDetail/constants';

export const clientListSections = {
  getir10ServiceDetail: 'getir10',
  getirGeneralDetail: 'getir',
  getirLocalsServiceDetail: 'getirLocals',
  getirMoreServiceDetail: 'getir30',
  getirWaterServiceDetail: 'getirVoyager',
  getirFoodServiceDetail: 'getirFood',
  getirBitaksiServiceDetail: 'getirBitaksi',
  getirWaterMarketPlaceServiceDetail: 'getirWaterMarketPlace',
  getirJobServiceDetail: 'getirJob',
  getirDriveServiceDetail: 'getirDrive',
  getirN11ServiceDetail: 'getirN11',
  getirSelectServiceDetail: 'getirSelect',
  getirFinanceServiceDetail: 'getirFinance',
};

export const GETIR_JOBS_DATE_TYPES = {
  POST_CREATION_DATE: { value: 'PostCreationDate' },
  APPLICATION_CREATION_DATE: { value: 'ApplicationCreationDate' },
  POST_UPDATE_DATE: { value: 'PostUpdateDate' },
  POST_EXPIRE_DATE: { value: 'PostExpireDate' },
  APPLICATION_UPDATE_DATE: { value: 'ApplicationUpdateDate' },
};

export const financialTypes = t => {
  return [
    {
      type: 'netRevenueVatIncluded',
      name: t('clientTargetingPage:NET_REVENUE_VAT_INCLUDED'),
    },
    {
      type: 'netRevenueVatExcluded',
      name: t('clientTargetingPage:NET_REVENUE_VAT_EXCLUDED'),
    },
    {
      type: 'basketAmountVatIncluded',
      name: t('clientTargetingPage:BASKET_AMOUNT_VAT_INCLUDED'),
    },
    {
      type: 'basketAmountVatExcluded',
      name: t('clientTargetingPage:BASKET_AMOUNT_VAT_EXCLUDED'),
    },
    {
      type: 'aAndMVatIncluded',
      name: t('clientTargetingPage:A_AND_M_VAT_INCLUDED'),
    },
    {
      type: 'aAndMVatExcluded',
      name: t('clientTargetingPage:A_AND_M_VAT_EXCLUDED'),
    },
    {
      type: 'grossMarginVatIncluded',
      name: t('clientTargetingPage:GROSS_MARGIN_VAT_INCLUDED'),
    },
    {
      type: 'grossMarginVatExcluded',
      name: t('clientTargetingPage:GROSS_MARGIN_VAT_EXCLUDED'),
    },
    {
      type: 'chargedAmountVatIncluded',
      name: t('clientTargetingPage:CHARGED_AMOUNT_VAT_INCLUDED'),
    },
    {
      type: 'chargedAmountVatExcluded',
      name: t('clientTargetingPage:CHARGED_AMOUNT_VAT_EXCLUDED'),
    },
    {
      type: 'discountAmountVatIncluded',
      name: t('clientTargetingPage:DISCOUNT_AMOUNT_VAT_INCLUDED'),
    },
    {
      type: 'discountAmountVatExcluded',
      name: t('clientTargetingPage:DISCOUNT_AMOUNT_VAT_EXCLUDED'),
    },
    {
      type: 'cpVatIncluded',
      name: t('clientTargetingPage:CONTRIBUTION_PROFIT_VAT_INCLUDED'),
    },
    {
      type: 'cpVatExcluded',
      name: t('clientTargetingPage:CONTRIBUTION_PROFIT_VAT_EXCLUDED'),
    },
    {
      type: 'gmvVatIncluded',
      name: t('clientTargetingPage:GROSS_MERCHANDISE_VALUE_VAT_INCLUDED'),
    },
    {
      type: 'gmvVatExcluded',
      name: t('clientTargetingPage:GROSS_MERCHANDISE_VALUE_VAT_EXCLUDED'),
    },
    {
      type: 'productNetRevenueVatExcluded',
      name: t('clientTargetingPage:PRODUCT_NET_REVENUE_VAT_EXCLUDED'),
    },
    {
      type: 'productNetRevenueVatIncluded',
      name: t('clientTargetingPage:PRODUCT_NET_REVENUE_VAT_INCLUDED'),
    },
  ];
};

export const orderPriceValueTypes = t => {
  return [
    {
      type: 'average',
      name: t('clientTargetingPage:AVERAGE'),
    },
    {
      type: 'total',
      name: t('clientTargetingPage:TOTAL'),
    },
    {
      type: 'anyOrderAmount',
      name: t('clientTargetingPage:ANY_ORDER_AMOUNT'),
    },
    {
      type: 'amountPerOrder',
      name: t('clientTargetingPage:AMOUNT_PER_ORDER'),
    },
  ];
};

export const productPriceValueTypes = t => {
  return [
    {
      type: 'average',
      name: t('clientTargetingPage:AVERAGE'),
    },
    {
      type: 'total',
      name: t('clientTargetingPage:TOTAL'),
    },
    {
      type: 'minMaxValues',
      name: t('clientTargetingPage:MIN_MAX_VALUE'),
    },
  ];
};

export const sortOptions = t => {
  return [
    { key: 1, value: t('clientTargetingPage:RANDOM') },
    { key: 2, value: t('clientTargetingPage:NEWEST') },
    { key: 3, value: t('clientTargetingPage:OLDEST') },
  ];
};

export const SEGMENT_KEYS = {
  SUSPICIOUS: '21927',
  ABUSER: '21928',
  FRAUDSTER: '21929',
  NONE: 'none',
};

export const SEGMENT_IDS = t => {
  return [
    { key: SEGMENT_KEYS.NONE, value: t('global:NONE') },
    { key: SEGMENT_KEYS.SUSPICIOUS, value: t('clientTargetingPage:SUSPICIOUS') },
    { key: SEGMENT_KEYS.ABUSER, value: t('clientTargetingPage:ABUSER') },
    { key: SEGMENT_KEYS.FRAUDSTER, value: t('clientTargetingPage:FRAUDSTER') },
  ];
};

export const MULTIPLE_SELECT_COL = 24;
export const MULTIPLE_SELECT_WITH_CSV_IMPORT_COL = 22;
export const MULTIPLE_SELECT_WITH_SELECT_ALL_COL = 21;
export const CSV_IMPORT_BUTTON_COL = 1;
export const SELECT_ALL_BUTTON_COL = 3;
export const MULTIPLE_SELECT_WITH_SELECT_ALL_AND_CSV_IMPORT_COL = 18;

export const PERSONA_DETAIL_OPTIONS = [
  { id: '0', name: 'Getir Core' },
  { id: '1', name: 'Budget Promo Browser' },
  { id: '2', name: 'Reliable' },
  { id: '3', name: 'Wanderer' },
  { id: '4', name: 'Premium Low Habit' },
  { id: '5', name: 'Impulsive' },
  { id: '6', name: 'Getir Promo Core' },
];

export const ORDER_RATE_OPTIONS = [
  { id: 0, name: 0 },
  { id: 1, name: 1 },
  { id: 2, name: 2 },
  { id: 3, name: 3 },
  { id: 4, name: 4 },
  { id: 5, name: 5 },
];

export const PRODUCT_PURCHASE_COUNT_TYPE = 'PRODUCT_PURCHASE_COUNT';
export const ORDER_COUNT_TYPE = 'ORDER_COUNT';
export const PURCHASE_COUNT_PER_ORDER_TYPE = 'PURCHASE_COUNT_PER_ORDER';
export const DEFAULT_COUNT_TYPE = PRODUCT_PURCHASE_COUNT_TYPE;

export const LAST_ORDER_OF_CLIENTS_IN_SELECTED_FIELDS = 0;
export const LAST_ORDER_OF_CLIENTS_ALL_TIME_COUNTRY = 1;
export const LAST_ORDER_OF_CLIENTS_ALL_TIME_GLOBAL = 2;

export const LAST_TRIP_OF_CLIENTS_IN_SELECTED_FIELDS = 0;
export const LAST_TRIP_OF_CLIENTS_ALL_TIME_COUNTRY = 1;
export const LAST_TRIP_OF_CLIENTS_ALL_TIME_GLOBAL = 2;

export const DEFAULT_CALCULATION_TYPE = 0;

export const CARBOY_PURCHASE_FREQUENCY_COUNT_TYPE_ORDER_COUNT = 'ORDER_COUNT';
export const CARBOY_PURCHASE_FREQUENCY_COUNT_TYPE_PRODUCT_PURCHASE_COUNT = 'PRODUCT_PURCHASE_COUNT';
export const CARBOY_PURCHASE_FREQUENCY_COUNT_TYPE_PURCHASE_COUNT_PER_ORDER = 'PURCHASE_COUNT_PER_ORDER';
export const DEFAULT_CARBOY_PURCHASE_FREQUENCY_COUNT_TYPE = CARBOY_PURCHASE_FREQUENCY_COUNT_TYPE_PRODUCT_PURCHASE_COUNT;

export const GETIR_LOCALS_STORE_CALCULATION_TYPES = {
  TOTAL_ORDER_COUNT: 1,
  ORDER_COUNT_PER_STORE: 2,
};

export const lastOrderCalculationTypes = t => {
  return [
    {
      _id: LAST_ORDER_OF_CLIENTS_IN_SELECTED_FIELDS,
      name: t('clientTargetingPage:LAST_ORDER_OF_CLIENTS_IN_SELECTED_FIELDS'),
    },
    {
      _id: LAST_ORDER_OF_CLIENTS_ALL_TIME_COUNTRY,
      name: t('clientTargetingPage:LAST_ORDER_OF_CLIENTS_ALL_TIME_COUNTRY'),
    },
    {
      _id: LAST_ORDER_OF_CLIENTS_ALL_TIME_GLOBAL,
      name: t('clientTargetingPage:LAST_ORDER_OF_CLIENTS_ALL_TIME_GLOBAL'),
    },
  ];
};

export const carboyPurchaseFrequencyCountTypes = t => {
  return [
    {
      _id: CARBOY_PURCHASE_FREQUENCY_COUNT_TYPE_ORDER_COUNT,
      name: t('clientTargetingPage:CARBOY_PURCHASE_FREQUENCY_COUNT_TYPE.ORDER_COUNT'),
    },
    {
      _id: CARBOY_PURCHASE_FREQUENCY_COUNT_TYPE_PRODUCT_PURCHASE_COUNT,
      name: t('clientTargetingPage:CARBOY_PURCHASE_FREQUENCY_COUNT_TYPE.PRODUCT_PURCHASE_COUNT'),
    },
    {
      _id: CARBOY_PURCHASE_FREQUENCY_COUNT_TYPE_PURCHASE_COUNT_PER_ORDER,
      name: t('clientTargetingPage:CARBOY_PURCHASE_FREQUENCY_COUNT_TYPE.PURCHASE_COUNT_PER_ORDER'),
    },
  ];
};

export const lastTripCalculationTypes = t => {
  return [
    {
      _id: LAST_TRIP_OF_CLIENTS_IN_SELECTED_FIELDS,
      name: t('clientTargetingPage:LAST_TRIP_OF_CLIENTS_IN_SELECTED_FIELDS'),
    },
    {
      _id: LAST_TRIP_OF_CLIENTS_ALL_TIME_COUNTRY,
      name: t('clientTargetingPage:LAST_TRIP_OF_CLIENTS_ALL_TIME_COUNTRY'),
    },
    {
      _id: LAST_TRIP_OF_CLIENTS_ALL_TIME_GLOBAL,
      name: t('clientTargetingPage:LAST_TRIP_OF_CLIENTS_ALL_TIME_GLOBAL'),
    },
  ];
};

export const FIRST_ORDER_OF_CLIENTS_IN_SELECTED_FIELDS = 0;
export const FIRST_ORDER_OF_CLIENTS_ALL_TIME_COUNTRY = 1;
export const FIRST_ORDER_OF_CLIENTS_ALL_TIME_GLOBAL = 2;

export const FIRST_TRIP_OF_CLIENTS_IN_SELECTED_FIELDS = 0;
export const FIRST_TRIP_OF_CLIENTS_ALL_TIME_COUNTRY = 1;
export const FIRST_TRIP_OF_CLIENTS_ALL_TIME_GLOBAL = 2;

export const firstOrderCalculationTypes = t => {
  return [
    {
      _id: FIRST_ORDER_OF_CLIENTS_IN_SELECTED_FIELDS,
      name: t('clientTargetingPage:FIRST_ORDER_OF_CLIENTS_IN_SELECTED_FIELDS'),
    },
    {
      _id: FIRST_ORDER_OF_CLIENTS_ALL_TIME_COUNTRY,
      name: t('clientTargetingPage:FIRST_ORDER_OF_CLIENTS_ALL_TIME_COUNTRY'),
    },
    {
      _id: FIRST_ORDER_OF_CLIENTS_ALL_TIME_GLOBAL,
      name: t('clientTargetingPage:FIRST_ORDER_OF_CLIENTS_ALL_TIME_GLOBAL'),
    },
  ];
};

export const firstTripCalculationTypes = t => {
  return [
    {
      _id: FIRST_TRIP_OF_CLIENTS_IN_SELECTED_FIELDS,
      name: t('clientTargetingPage:FIRST_TRIP_OF_CLIENTS_IN_SELECTED_FIELDS'),
    },
    {
      _id: FIRST_TRIP_OF_CLIENTS_ALL_TIME_COUNTRY,
      name: t('clientTargetingPage:FIRST_TRIP_OF_CLIENTS_ALL_TIME_COUNTRY'),
    },
    {
      _id: FIRST_TRIP_OF_CLIENTS_ALL_TIME_GLOBAL,
      name: t('clientTargetingPage:FIRST_TRIP_OF_CLIENTS_ALL_TIME_GLOBAL'),
    },
  ];
};

export const NEW_NOTIF_DETAIL_MAX_DATE_RANGE_DAY = 30;
export const SENT_NOTIF_COUNT_MAX_DATE_RANGE_DAY = 2;

export const DELIVERY_DURATION_TOP_X_ORDER_TYPE = {
  FIRST: 'FIRST',
  LAST: 'LAST',
};

export const getDeliveryDurationTopXOrderTypeOptions = t => [
  {
    label: t(`TOP_X_ORDER_TYPE_${DELIVERY_DURATION_TOP_X_ORDER_TYPE.FIRST}`),
    value: DELIVERY_DURATION_TOP_X_ORDER_TYPE.FIRST,
  },
  {
    label: t(`TOP_X_ORDER_TYPE_${DELIVERY_DURATION_TOP_X_ORDER_TYPE.LAST}`),
    value: DELIVERY_DURATION_TOP_X_ORDER_TYPE.LAST,
  },
];

export const GETIR_BASED = 'GetirBased';
export const CUSTOMER_BASED = 'CustomerBased';

export const DEFAULT_CANCELLATION_TYPE = 'GetirBased';

export const cancelledOrderTypes = t => [
  {
    _id: GETIR_BASED,
    name: t('clientTargetingPage:GETIR_BASED'),
  },
  {
    _id: CUSTOMER_BASED,
    name: t('clientTargetingPage:CUSTOMER_BASED'),
  },
];

export const EMPLOYMENT_TYPE = {
  FULLTIME: { value: 1 },
  PARTTIME: { value: 2 },
  TEMPORARY: { value: 3 },
  VOLUNTEER: { value: 4 },
  INTERN: { value: 5 },
  PROJECTBASED: { value: 6 },
  REMOTE: { value: 7 },
};

export const getEmploymentTypeOptions = () => convertConstantValueTranslationsToSelectOptions({
  constants: EMPLOYMENT_TYPE,
  translationBaseKey: 'clientTargetingPage:GETIR_JOBS_EMPLOYMENT_TYPE',
});

export const getGetirJobsDateTypes = () => convertConstantValueTranslationsToSelectOptions({
  constants: GETIR_JOBS_DATE_TYPES,
  translationBaseKey: 'clientTargetingPage:GETIR_JOBS_DATE_TYPES',
});

const GETIR_JOBS_POST_STATUS = {
  ACTIVE_POST: { value: 1 },
  POST_HISTORY: { value: 2 },
  PENDING_POSTS: { value: 3 },
  REJECTED_POSTS: { value: 4 },
};

export const getGetirJobsPostStatusOptions = () => convertConstantValueTranslationsToSelectOptions({
  constants: GETIR_JOBS_POST_STATUS,
  translationBaseKey: 'clientTargetingPage:POST_STATUS',
});

export const GETIR_JOBS_DATE_TYPES_FOR_USER_DETAIL = {
  REGISTER: { value: 'Register' },
  VISIT: { value: 'Visit' },
};

export const getGetirJobsDateTypesForUserDetail = () => convertConstantValueTranslationsToSelectOptions({
  constants: GETIR_JOBS_DATE_TYPES_FOR_USER_DETAIL,
  translationBaseKey: 'clientTargetingPage:GETIR_JOBS_DATE_TYPES_FOR_USER_DETAIL',
});

const GETIR_JOBS_DELETED_STATUS = {
  DELETED: { value: 'Deleted' },
  UNDELETED: { value: 'Undeleted' },
};

export const getGetirJobsDeletedStatusOptions = () => convertConstantValueTranslationsToSelectOptions({
  constants: GETIR_JOBS_DELETED_STATUS,
  translationBaseKey: 'clientTargetingPage:GETIR_JOBS_DELETED_STATUS',
});

const GETIR_JOBS_APPLICATION_STATUS = {
  ACCEPTED: { value: 1 },
  PENDING: { value: 0 },
  REJECTED: { value: -1 },
  WITHDRAW: { value: -2 },
};

export const getGetirJobsApplicationStatusOptions = () => convertConstantValueTranslationsToSelectOptions({
  constants: GETIR_JOBS_APPLICATION_STATUS,
  translationBaseKey: 'clientTargetingPage:APPLICATION_STATUS',
});

const GETIR_JOBS_PROFILE_STATUS = {
  LANGUAGE: { value: 'language' },
  ABILITY: { value: 'ability' },
  RESUME: { value: 'resume' },
  EXPERIENCE: { value: 'experience' },
  CERTIFICATE: { value: 'certificate' },
  SCHOOL: { value: 'school' },
};

export const getGetirJobsProfileStatusOptions = () => convertConstantValueTranslationsToSelectOptions({
  constants: GETIR_JOBS_PROFILE_STATUS,
  translationBaseKey: 'clientTargetingPage:GETIR_JOBS_PROFILE_STATUS',
});

const ORDER_PRICE_DETAIL_TOP_X_ORDER_TYPE = {
  FIRST: { label: 'TOP_X_ORDER_TYPE_FIRST', value: 'FIRST' },
  LAST: { label: 'TOP_X_ORDER_TYPE_LAST', value: 'LAST' },
};

export const getOrderPriceDetailTopXOrderTypeOptions = t => (
  Object.keys(ORDER_PRICE_DETAIL_TOP_X_ORDER_TYPE)
    .map(key => ({
      label: t(`clientTargetingPage:${ORDER_PRICE_DETAIL_TOP_X_ORDER_TYPE[key].label}`),
      value: ORDER_PRICE_DETAIL_TOP_X_ORDER_TYPE[key].value,
    }))
);

export const TOP_X_ORDER_TYPE = {
  FIRST: 'FIRST',
  LAST: 'LAST',
};

const TOP_X_ORDER_TYPE_OPTIONS = {
  FIRST: { label: 'TOP_X_ORDER_TYPE_FIRST', value: TOP_X_ORDER_TYPE.FIRST },
  LAST: { label: 'TOP_X_ORDER_TYPE_LAST', value: TOP_X_ORDER_TYPE.LAST },
};

export const getTopXOrderTypeOptions = t => (
  Object.keys(TOP_X_ORDER_TYPE_OPTIONS)
    .map(key => ({
      label: t(`clientTargetingPage:${TOP_X_ORDER_TYPE_OPTIONS[key].label}`),
      value: TOP_X_ORDER_TYPE_OPTIONS[key].value,
    }))
);

const ORDER_OF_CLIENTS = {
  SELECTED_FIELDS: { label: 'ORDER_OF_CLIENTS_IN_SELECTED_FIELDS', value: 0 },
  ALL_TIME_COUNTRY: { label: 'ALL_ORDER_OF_CLIENTS_ALL_TIME_COUNTRY', value: 1 },
  ALL_TIME_GLOBAL: { label: 'ALL_ORDER_OF_CLIENTS_ALL_TIME_GLOBAL', value: 2 },
};

export const getOrderCalculationTypes = t => (
  Object.keys(ORDER_OF_CLIENTS)
    .map(key => ({
      label: t(`clientTargetingPage:${ORDER_OF_CLIENTS[key].label}`),
      value: ORDER_OF_CLIENTS[key].value,
    }))
);

export const GETIR_DRIVE_EXTERNAL_SOURCE_OPTIONS = [
  { _id: 'GETIR', name: 'Getir' },
  { _id: 'MOOV', name: 'MOOV' },
  { _id: 'BITAKSI', name: 'BiTaksi' },
];

export const getGetirDriveRentStatusOptions = t => [
  { _id: 'finish', name: t('clientTargetingPage:GETIR_DRIVE_RENT_STATUS_FINISH') },
  { _id: 'in_rent', name: t('clientTargetingPage:GETIR_DRIVE_RENT_STATUS_IN_RENT') },
  { _id: 'cancelled', name: t('clientTargetingPage:GETIR_DRIVE_RENT_STATUS_CANCELLED') },
  { _id: 'error', name: t('clientTargetingPage:GETIR_DRIVE_RENT_STATUS_ERROR') },
  { _id: 'waiting_for_start', name: t('clientTargetingPage:GETIR_DRIVE_RENT_STATUS_WAITING_FOR_START') },
  { _id: 'pre_rent', name: t('clientTargetingPage:GETIR_DRIVE_RENT_STATUS_PRE_RENT') },
];

export const getGetirDrivePaymentTypeOptions = t => [
  { _id: 'credit_card', name: t('clientTargetingPage:GETIR_DRIVE_PAYMENT_TYPE_CREDIT_CARD') },
  { _id: 'corporate', name: t('clientTargetingPage:GETIR_DRIVE_PAYMENT_TYPE_CORPORATE') },
];

const MEMBERSHIP_DETAIL_DATE_TYPE = {
  REGISTER: { label: 'REGISTER', value: 'registerDate' },
  DRIVERS_LICENCE_UPLOAD: { label: 'DRIVERS_LICENCE_UPLOAD', value: 'driversLicenceUploadDate' },
  DRIVERS_LICENCE_APROVE: { label: 'DRIVERS_LICENCE_APPROVE', value: 'driversLicenceApproveDate' },
  VIDEO_UPLOAD: { label: 'VIDEO_UPLOAD', value: 'videoUploadDate' },
  VIDEO_APROVE: { label: 'VIDEO_APPROVE', value: 'videoApproveDate' },
  AGREEMENT_APROVE: { label: 'AGREEMENT_APPROVE', value: 'agreementApproveDate' },
};

export const getMembershipDetailDateTypes = t => (
  Object.keys(MEMBERSHIP_DETAIL_DATE_TYPE)
    .map(key => ({
      label: t(`clientTargetingPage:GETIR_DRIVE_MEMBERSHIP_DATE_TYPE.${MEMBERSHIP_DETAIL_DATE_TYPE[key].label}`),
      value: MEMBERSHIP_DETAIL_DATE_TYPE[key].value,
    }))
);

export const getISODayOptions = t => [
  { _id: 0, name: t('clientTargetingPage:SUNDAY') },
  { _id: 1, name: t('clientTargetingPage:MONDAY') },
  { _id: 2, name: t('clientTargetingPage:TUESDAY') },
  { _id: 3, name: t('clientTargetingPage:WEDNESDAY') },
  { _id: 4, name: t('clientTargetingPage:THURSDAY') },
  { _id: 5, name: t('clientTargetingPage:FRIDAY') },
  { _id: 6, name: t('clientTargetingPage:SATURDAY') },
];

const PROMO_OBJECTIVE_TYPE = {
  ACQUISITION: { label: 'ACQUISITION', value: 1 },
  HABIT_BUILDING: { label: 'HABIT_BUILDING', value: 2 },
  UPSELL_FREQUENCY: { label: 'UPSELL_FREQUENCY', value: 3 },
  UPSELL_BASKET: { label: 'UPSELL_BASKET', value: 4 },
  ACTIVATION_WATCH_OUT: { label: 'ACTIVATION_WATCH_OUT', value: 5 },
  ACTIVATION_RE_ACTIVATE_CHURN: { label: 'ACTIVATION_RE_ACTIVATE_CHURN', value: 6 },
  ACTIVATION_RE_ACTIVATE_COHORT: { label: 'ACTIVATION_RE_ACTIVATE_COHORT', value: 7 },
  BURN_FRANCHISE: { label: 'BURN_FRANCHISE', value: 8 },
  DISCOUNT_CODE: { label: 'DISCOUNT_CODE', value: 9 },
  WASTE: { label: 'WASTE', value: 10 },
  ACQUISITION_CHAIN: { label: 'ACQUISITION_CHAIN', value: 11 },
  UPSELL_FREQUENCY_CHAIN: { label: 'UPSELL_FREQUENCY_CHAIN', value: 12 },
  UPSELL_MERCHANT_SHARED: { label: 'UPSELL_MERCHANT_SHARED', value: 13 },
  UPSELL_SUPPLIER_SHARED: { label: 'UPSELL_SUPPLIER_SHARED', value: 14 },
};

const GETIR_SELECT_MEMBERSHIP_HAS_RIGHT_STATUS_TYPE = {
  ACTIVE: { value: GETIR_SELECT_MEMBERSHIP_STATUSES.ACTIVE },
  CANCEL_REQUESTED: { value: GETIR_SELECT_MEMBERSHIP_STATUSES.CANCEL_REQUESTED },
  ON_HOLD: { value: GETIR_SELECT_MEMBERSHIP_STATUSES.ON_HOLD },
};

const GETIR_SELECT_MEMBERSHIP_HAS_NO_RIGHT_STATUS_TYPE = {
  CANCELLED: { value: GETIR_SELECT_MEMBERSHIP_STATUSES.CANCELLED },
  UNPAID: { value: GETIR_SELECT_MEMBERSHIP_STATUSES.UNPAID },
  BLOCKED: { value: GETIR_SELECT_MEMBERSHIP_STATUSES.BLOCKED },
};

export const getGetirSelectMembershipHasRightStatusOptions = () => convertConstantValueTranslationsToSelectOptions({
  constants: GETIR_SELECT_MEMBERSHIP_HAS_RIGHT_STATUS_TYPE,
  translationBaseKey: 'clientTargetingPage:GETIR_SELECT_MEMBERSHIP.STATUS',
});

export const getGetirSelectMembershipHasNoRightStatusOptions = () => convertConstantValueTranslationsToSelectOptions({
  constants: GETIR_SELECT_MEMBERSHIP_HAS_NO_RIGHT_STATUS_TYPE,
  translationBaseKey: 'clientTargetingPage:GETIR_SELECT_MEMBERSHIP.STATUS',
});

export const GETIR_SELECT_MEMBERSHIP_DATE_TYPE = {
  REGISTER: { value: GETIR_SELECT_MEMBERSHIP_DATE_TYPES.REGISTER },
  LAST_CANCEL: { value: GETIR_SELECT_MEMBERSHIP_DATE_TYPES.LAST_CANCEL },
};

export const getGetirSelectMembershipDateOptions = () => convertConstantValueTranslationsToSelectOptions({
  constants: GETIR_SELECT_MEMBERSHIP_DATE_TYPE,
  translationBaseKey: 'clientTargetingPage:GETIR_SELECT_MEMBERSHIP.DATE_TYPE',
});

export const GETIR_SELECT_PAYMENT_TYPE = {
  FREE: { value: GETIR_SELECT_PAYMENT_TYPES.FREE },
  DISCOUNTED: { value: GETIR_SELECT_PAYMENT_TYPES.DISCOUNTED },
  PAID: { value: GETIR_SELECT_PAYMENT_TYPES.PAID },
};

export const getGetirSelectPaymentTypeOptions = () => convertConstantValueTranslationsToSelectOptions({
  constants: GETIR_SELECT_PAYMENT_TYPE,
  translationBaseKey: 'clientTargetingPage:GETIR_SELECT_PAYMENT_TYPE',
});

export const GETIR_SELECT_SERVICE_TYPE = {
  GETIR10: GETIR_10_DOMAIN_TYPE,
  GETIRFOOD: GETIR_FOOD_DOMAIN_TYPE,
  GETIRMORE: GETIR_MARKET_DOMAIN_TYPE,
  GETIRLOCALS: GETIR_LOCALS_DOMAIN_TYPE,
};

export const getGetirSelectServiceTypeOptions = () => convertConstantValueTranslationsToSelectOptions({
  constants: GETIR_SELECT_SERVICE_TYPE,
  translationBaseKey: 'clientTargetingPage:GETIR_MARKET_DOMAIN_TYPES',
});

export const GETIR_FINANCE_SERVICE_TYPE = {
  GETIR10: GETIR_10_DOMAIN_TYPE,
  GETIRMORE: GETIR_MARKET_DOMAIN_TYPE,
  GETIRWATER: GETIR_VOYAGER_DOMAIN_TYPE,
  GETIRFOOD: GETIR_FOOD_DOMAIN_TYPE,
  GETIRLOCALS: GETIR_LOCALS_DOMAIN_TYPE,
};

export const getGetirFinanceServiceTypeOptions = () => convertConstantValueTranslationsToSelectOptions({
  constants: GETIR_FINANCE_SERVICE_TYPE,
  translationBaseKey: 'global:GETIR_MARKET_DOMAIN_TYPES',
});

export const GETIR_SELECT_BENEFIT_TYPE = {
  FREE_DELIVERY: { value: GETIR_SELECT_BENEFIT_TYPES.FREE_DELIVERY },
  GETIR_FINANCED: { value: GETIR_SELECT_BENEFIT_TYPES.GETIR_FINANCED },
  SUPPLIER_FINANCED: { value: GETIR_SELECT_BENEFIT_TYPES.SUPPLIER_FINANCED },
};

export const getGetirSelectBenefitTypeOptions = () => convertConstantValueTranslationsToSelectOptions({
  constants: GETIR_SELECT_BENEFIT_TYPE,
  translationBaseKey: 'clientTargetingPage:GETIR_SELECT_BENEFIT.TYPE',
});

export const getPromoObjectiveTypes = t => (
  Object.values(PROMO_OBJECTIVE_TYPE)
    .map(({ value, label }) => ({
      label: t(`clientTargetingPage:PROMO_OBJECTIVE_TYPE.${label}`),
      value,
    }))
);

export const getGSMCountryCodes = () => {
  return INTERNATIONAL_DIALING_CODES.filter(country => country.value.dialingCode)
    .map(country => {
      return {
        label: `(${country.value.dialingCode}) ${country.value.country} `,
        value: `(${country.value.countryCode})-${removeNonDigits(country.value.dialingCode)}`,
      };
    });
};

const COMMUNICATION_PREFERENCES_TYPE = {
  PUSH_NOTIFICATION: { value: COMMUNICATION_CHANNEL_TYPES.PUSH_NOTIFICATION },
  SMS: { value: COMMUNICATION_CHANNEL_TYPES.SMS },
  EMAIL: { value: COMMUNICATION_CHANNEL_TYPES.EMAIL },
};

export const getCommunicationPreferencesOptions = () => convertConstantValueTranslationsToSelectOptions({
  constants: COMMUNICATION_PREFERENCES_TYPE,
  translationBaseKey: 'clientTargetingPage:NOTIF_TYPE',
});

const BASKET_DETAIL_TYPES_SELECT = {
  BRAND: { value: BASKET_DETAIL_TYPES.BRAND },
  SUPPLIER: { value: BASKET_DETAIL_TYPES.SUPPLIER },
  CATEGORY: { value: BASKET_DETAIL_TYPES.CATEGORY },
  SUB_CATEGORY: { value: BASKET_DETAIL_TYPES.SUB_CATEGORY },
  MANUFACTURER: { value: BASKET_DETAIL_TYPES.MANUFACTURER },
};

export const getBasketDetailTypesOptions = () => convertConstantValueTranslationsToSelectOptions({
  constants: BASKET_DETAIL_TYPES_SELECT,
  translationBaseKey: 'clientTargetingPage:BASKET_DETAIL_TYPES',
});

export const ORDER_STATUS_GROUPS = {
  SUCCESSFUL: 'SUCCESSFUL',
  CANCELLED: 'CANCELLED',
};

export const ETA_FIELDS = {
  CETA: 'CETA', // checkout page ETA
  META: 'META', // main page ETA
  TETA: 'TETA', // tracking page ETA
};

export const selectableETAs = [
  {
    key: ETA_FIELDS.CETA,
    value: ETA_FIELDS.CETA,
  },
];

export const ORDER_STATUSES_BY_STATUS_GROUP = {
  [ORDER_STATUS_GROUPS.SUCCESSFUL]: [
    MARKET_ORDER_STATUS.DELIVERED,
    MARKET_ORDER_STATUS.RATED,
  ],
  [ORDER_STATUS_GROUPS.CANCELLED]: [
    MARKET_ORDER_STATUS.CANCELED_ADMIN,
    MARKET_ORDER_STATUS.CANCELED_STAFF,
    MARKET_ORDER_STATUS.CANCELED_CLIENT,
    MARKET_ORDER_STATUS.CANCELED_SYSTEM,
    MARKET_ORDER_STATUS.CANCELED_COURIER,
  ],
};

export const PROBLEMATIC_ORDERS_DOMAIN_TYPE = [GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE];
