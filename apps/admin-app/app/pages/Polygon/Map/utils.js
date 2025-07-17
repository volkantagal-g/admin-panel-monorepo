import { get, isEmpty, isNumber } from 'lodash';

import {
  REGULAR_WAREHOUSE_TYPE,
  SC_GROCER_WAREHOUSE_TYPE,
  STORE_CONVERSION_WAREHOUSE_TYPE,
  OTHER_WAREHOUSE_TYPE,
  WAREHOUSE_ACTIVE_STATE,
  BANNED_FOR_PRODUCT_DISPLAY_GETIR_MARKET_POLYGON_TYPE,
  BANNED_FOR_PROMO_GETIR_MARKET_POLYGON_TYPE,
  TOTALLY_BANNED_GETIR_MARKET_POLYGON_TYPE,
  BANNED_FOR_COURIER_GETIR_MARKET_POLYGON_TYPE,
  GETIR_GORILLAS_DOMAIN_TYPE,
  GETIR_DOMAIN_TYPE_CODES,
  VEHICLE_TYPE,
  FORBIDDEN_COURIER_ROUTES_POLYGON_TYPE,
  GETIR_MARKET_POLYGON_TYPES,
  GORILLAS_RELATED_POLYGON_TYPES,
} from '@shared/shared/constants';

const warehouseTypesForMaps = new Set([
  REGULAR_WAREHOUSE_TYPE,
  SC_GROCER_WAREHOUSE_TYPE,
  STORE_CONVERSION_WAREHOUSE_TYPE,
  OTHER_WAREHOUSE_TYPE,
]);

export const polygonTypesForMaps = [
  ...GETIR_MARKET_POLYGON_TYPES,
  FORBIDDEN_COURIER_ROUTES_POLYGON_TYPE,
  ...GORILLAS_RELATED_POLYGON_TYPES,
];

export const banPolygonTypesForMaps = [
  BANNED_FOR_PRODUCT_DISPLAY_GETIR_MARKET_POLYGON_TYPE,
  BANNED_FOR_PROMO_GETIR_MARKET_POLYGON_TYPE,
  TOTALLY_BANNED_GETIR_MARKET_POLYGON_TYPE,
  BANNED_FOR_COURIER_GETIR_MARKET_POLYGON_TYPE,
  FORBIDDEN_COURIER_ROUTES_POLYGON_TYPE,
];

export const vehicleTypes = [
  VEHICLE_TYPE.ON_FOOT,
  VEHICLE_TYPE.MOTO,
  VEHICLE_TYPE.MOTO_50CC,
  VEHICLE_TYPE.MITU,
  VEHICLE_TYPE.VAN,
  VEHICLE_TYPE.E_BICYCLE,
  VEHICLE_TYPE.E_MOTORCYCLE,
  VEHICLE_TYPE.E_CAR,
];

export const bannedForCourierPolygonType = BANNED_FOR_COURIER_GETIR_MARKET_POLYGON_TYPE;

export const gorillasWarehouseConfig = {
  type: 'Array',
  key: 'GORILLAS_WAREHOUSES',
};

export const deliveryFeeConfig = {
  type: 'Array',
  key: 'SLOTTED_DELIVERY',
};

export const getFilteredWarehouses = ({ warehouses = [], pageFilters = {} }) => {
  return warehouses?.filter(warehouse => (
    warehouse.state === WAREHOUSE_ACTIVE_STATE &&
    warehouseTypesForMaps.has(warehouse.warehouseType)) &&
    (isNumber(pageFilters.domainType) && warehouse?.domainTypes.includes(pageFilters?.domainType)) &&
    (!isEmpty(pageFilters.city) && get(warehouse, 'city._id', warehouse.city) === pageFilters.city));
};

export const getPolygonRequestBody = ({ filters }) => {
  const reqBody = {};

  if (isNumber(filters.domainType)) {
    reqBody.domainTypes = [filters.domainType];
  }
  if (isNumber(filters.polygonType)) {
    reqBody.polygonTypes = [filters.polygonType];
  }
  if (isNumber(filters.subregionIntervalType)) {
    reqBody.subregionIntervalTypes = [filters.subregionIntervalType];
  }
  if (filters.city) {
    reqBody.city = filters.city;
  }
  if (banPolygonTypesForMaps.includes(filters.polygonType)) {
    delete reqBody.subregionIntervalTypes;
    delete reqBody.city;
  }
  if (bannedForCourierPolygonType === filters.polygonType) {
    reqBody.vehicleTypes = filters.vehicleTypes;
  }
  return reqBody;
};

export const GETIR_DOMAIN_TYPES = [...GETIR_DOMAIN_TYPE_CODES, GETIR_GORILLAS_DOMAIN_TYPE];
