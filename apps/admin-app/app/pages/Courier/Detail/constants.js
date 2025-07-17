import courierMarker from '@shared/assets/markers/market_doblo_red.png';
import {
  CALLER_TYPES,
  GETIR_10_DOMAIN_TYPE,
  GETIR_FINANCE_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_GORILLAS_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
} from '@shared/shared/constants';

export const COURIER_LOCATION_PLACEMARK_OPTIONS = {
  iconLayout: 'default#image',
  iconImageHref: courierMarker,
  iconImageSize: [58, 58],
  iconImageOffset: [-29, -58],
};

export const COURIER_BUSY_OPTIONS_END_SHIFT = '555a25f9b4ff93f311ffe1fe';

export const WORK_STATUS_OPTIONS = [
  { label: { tr: 'Vardiya', en: 'Shift' }, value: 1 },
  { label: { tr: 'Destek', en: 'Support' }, value: 2 },
];

export const DOMAIN_TYPE_OPTIONS = [
  { label: { en: 'Getir10', tr: 'Getir10' }, value: GETIR_10_DOMAIN_TYPE },
  {
    label: { en: 'GetirFood', tr: 'GetirYemek' },
    value: GETIR_FOOD_DOMAIN_TYPE,
  },
  {
    label: { en: 'GetirMore', tr: 'GetirBüyük' },
    value: GETIR_MARKET_DOMAIN_TYPE,
  },
  {
    label: { en: 'GetirWater', tr: 'GetirSu' },
    value: GETIR_VOYAGER_DOMAIN_TYPE,
  },
  {
    label: { en: 'GetirLocals', tr: 'GetirÇarşı' },
    value: GETIR_LOCALS_DOMAIN_TYPE,
  },
  {
    label: { en: 'GetirFinance', tr: 'GetirFinans' },
    value: GETIR_FINANCE_DOMAIN_TYPE,
  },
  {
    label: { en: 'Gorillas', tr: 'Gorillas' },
    value: GETIR_GORILLAS_DOMAIN_TYPE,
  },
];

export const COURIER_RETURN_TASK_METHOD = {
  COURIER_ON_WAY: 'artisan-courier:see-return',
  COURIER_REACHED_TO_CUSTOMER: 'artisan-courier:reached-to-pickup-point',
  COURIER_RECEIVED_RETURN: 'artisan-courier:receive-return-verify',
  COURIER_REACHED_TO_SHOP: 'artisan-courier:reached-to-deliver-point',
  COURIER_OR_RUNNER_DELIVER_TO_SHOP: 'artisan-courier:confirm-delivery',
};

export const COURIER_DETAIL_REQUEST_FIELDS = [
  'chiefRank',
  'safeRidingTrainingDate',
  'safeRidingTrainingCertificate',
  'name',
  'gsm',
  'createdAt',
  'courierType',
  'domainTypes',
  'serviceDomainTypes',
  'person',
  'picURL',
  'location',
  'currentMarketEmployer',
  'workStatus',
  'status',
  'statusLastChangedAt',
  'lastBusyOption',
  'lastBusyOptionComment',
  'warehouse',
  'hasBusyRequest',
  'homeAddress',
  'relative',
  'personalGsm',
  'countryCode',
  'isLoginDisabled',
  'isGorillasEmployee',
  'employmentType',
  'availableVehicleTypes',
  'countryGsmCode',
  'isLoggedIn',
  'fleetVehicle',
  'fleetVehicleType',
  'fleetVehiclePlate',
  'availableVehicleTypes',
  'isActivated',
  'order',
  'artisanOrder',
  'nextArtisanOrder',
  'foodOrder',
  'marketOrder',
  'returnOrder',
  'currentDomainType',
  'assignmentType',
  'deviceType',
  'buildNumber',
  'mduDiagnosticLogInfo',
  'isGeoFenceDisabled',
].join(' ');

export const COURIER_DETAIL_FINANCE_EMPLOYEE_REQUEST_FIELDS = [
  'chiefRank',
  'name',
  'gsm',
  'person',
  'createdAt',
  'courierType',
  'domainTypes',
  'serviceDomainTypes',
  'picURL',
  'location',
  'currentMarketEmployer',
  'workStatus',
  'status',
  'statusLastChangedAt',
  'lastBusyOption',
  'lastBusyOptionComment',
  'warehouse',
  'hasBusyRequest',
  'personalGsm',
  'countryCode',
  'isLoginDisabled',
  'availableVehicleTypes',
  'countryGsmCode',
  'isLoggedIn',
  'fleetVehicle',
  'fleetVehicleType',
  'fleetVehiclePlate',
  'availableVehicleTypes',
  'isActivated',
  'order',
  'marketOrder',
  'currentDomainType',
  'assignmentType',
  'deviceType',
  'buildNumber',
  'safeRidingTrainingDate',
  'safeRidingTrainingCertificate',
  'isGeoFenceDisabled',
].join(' ');

export const CALLER_TYPES_TRANSLATIONS = {
  [CALLER_TYPES.UNKNOWN]: { en: 'Unknown', tr: 'Bilinmeyen' },
  [CALLER_TYPES.CLIENT]: { en: 'Client', tr: 'Müşteri' },
  [CALLER_TYPES.COURIER]: { en: 'Courier', tr: 'Kurye' },
  [CALLER_TYPES.STORE]: { en: 'Store', tr: 'Depo' },
  [CALLER_TYPES.ADMIN]: { en: 'Admin', tr: 'Admin' },
  [CALLER_TYPES.SYSTEM]: { en: 'System', tr: 'Sistem' },
  [CALLER_TYPES.TEST_DRIVE_COURIER]: {
    en: 'Test Drive Courier',
    tr: 'Test Sürüşü Kurye',
  },
  [CALLER_TYPES.RESTAURANT]: { en: 'Restaurant', tr: 'Restorant' },
  [CALLER_TYPES.IVR]: { en: 'IVR', tr: 'IVR' },
  [CALLER_TYPES.PICKER]: { en: 'Picker', tr: 'Toplayıcı' },
  [CALLER_TYPES.AUTO_EVENT]: { en: 'Auto Event', tr: 'Otomatik Etkinlik' },
  [CALLER_TYPES.FRANCHISE_USER]: { en: 'Franchise User', tr: 'Bayi Kullanıcısı' },
  [CALLER_TYPES.WAREHOUSE_USER]: {
    en: 'Warehouse User',
    tr: 'Depo Kullanıcısı',
  },
  [CALLER_TYPES.MDU_AUTO_EVENT]: {
    en: 'MDU Auto Event',
    tr: 'MDU Otomatik Etkinlik',
  },
};
