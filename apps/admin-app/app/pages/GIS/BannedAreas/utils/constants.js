import {
  BANNED_FOR_COURIER_GETIR_MARKET_POLYGON_TYPE,
  BANNED_FOR_PRODUCT_DISPLAY_GETIR_MARKET_POLYGON_TYPE,
  BANNED_FOR_PROMO_GETIR_MARKET_POLYGON_TYPE,
  TOTALLY_BANNED_GETIR_MARKET_POLYGON_TYPE,
  VEHICLE_TYPE,
  REGULAR_WAREHOUSE_TYPE,
  SC_GROCER_WAREHOUSE_TYPE,
  STORE_CONVERSION_WAREHOUSE_TYPE,
  OTHER_WAREHOUSE_TYPE,
  GETIR_DOMAIN_TYPE_CODES,
  GETIR_GORILLAS_DOMAIN_TYPE,
  BANNED_COURIERS_POLYGON_TYPE,
  FORBIDDEN_COURIER_ROUTES_POLYGON_TYPE,
} from '@shared/shared/constants';

export const overlayOptions = {
  g10: {
    color: '#000000',
    fillOpacity: 0,
    weight: 2,
  },
  gb: {
    color: '#ff2400',
    fillOpacity: 0,
    weight: 2,
  },
  gs: {
    color: '#0000FF',
    fillOpacity: 0,
    weight: 2,
  },
};

export const tooltipDirection = 'top';
export const tooltipOffset = [0, -10];

export const subregionDomains = {
  g10: 1,
  gb: 3,
  gs: 4,
};

export const GETIR_DOMAIN_TYPES = [...GETIR_DOMAIN_TYPE_CODES, GETIR_GORILLAS_DOMAIN_TYPE];

export const BAN_POLYGON_TYPES = [
  BANNED_FOR_PRODUCT_DISPLAY_GETIR_MARKET_POLYGON_TYPE,
  BANNED_FOR_PROMO_GETIR_MARKET_POLYGON_TYPE,
  TOTALLY_BANNED_GETIR_MARKET_POLYGON_TYPE,
  BANNED_FOR_COURIER_GETIR_MARKET_POLYGON_TYPE,
  BANNED_COURIERS_POLYGON_TYPE,
  FORBIDDEN_COURIER_ROUTES_POLYGON_TYPE,
];

export const VEHICLE_TYPE_REQUIRED_POLYGON_TYPES = [
  BANNED_FOR_COURIER_GETIR_MARKET_POLYGON_TYPE,
  FORBIDDEN_COURIER_ROUTES_POLYGON_TYPE,
];

export const SCHEDULED_BAN_POLYGON_TYPES = [
  BANNED_FOR_PRODUCT_DISPLAY_GETIR_MARKET_POLYGON_TYPE,
  BANNED_FOR_PROMO_GETIR_MARKET_POLYGON_TYPE,
  TOTALLY_BANNED_GETIR_MARKET_POLYGON_TYPE,
  BANNED_FOR_COURIER_GETIR_MARKET_POLYGON_TYPE,
];

export const VEHICLE_TYPES = [
  VEHICLE_TYPE.ON_FOOT,
  VEHICLE_TYPE.MOTO,
  VEHICLE_TYPE.MOTO_50CC,
  VEHICLE_TYPE.MITU,
  VEHICLE_TYPE.VAN,
  VEHICLE_TYPE.E_BICYCLE,
  VEHICLE_TYPE.E_MOTORCYCLE,
  VEHICLE_TYPE.E_CAR,
];

export const defaultValues = {
  city: '',
  polygonType: null,
  domainTypes: [],
  name: null,
  vehicleTypes: [],
  courierId: '',
};

export const SCHEDULED_BAN_STYLE = {
  fillColor: 'red',
  weight: 1,
  opacity: 1,
  color: 'black',
  dashArray: '3',
  fillOpacity: 0.4,
};

export const optionClassNames = { success: 'bg-success', danger: 'bg-danger' };

export const warehouseTypes = [
  REGULAR_WAREHOUSE_TYPE,
  SC_GROCER_WAREHOUSE_TYPE,
  STORE_CONVERSION_WAREHOUSE_TYPE,
  OTHER_WAREHOUSE_TYPE,
];

export const warehouseTypesForMaps = new Set(warehouseTypes);

export const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
