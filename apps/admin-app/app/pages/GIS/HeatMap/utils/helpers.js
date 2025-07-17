import { get, isEmpty, isNumber, isString } from 'lodash';

import { banPolygonTypes, warehouseTypes, WAREHOUSE_STATE } from './constants';

export const warehouseTypesForMaps = new Set(warehouseTypes);

export const getPolygonReqBody = ({ filters }) => {
  const requestBody = {};

  if (isNumber(filters.domainTypes)) {
    requestBody.domainTypes = [filters.domainTypes];
  }
  if (isNumber(filters.polygonTypes)) {
    requestBody.polygonTypes = [filters.polygonTypes];
  }
  if (isNumber(filters.subregionIntervalType)) {
    requestBody.subregionIntervalTypes = [filters.subregionIntervalType];
  }
  if (filters.city) {
    requestBody.city = filters.city;
  }

  if (banPolygonTypes.includes(filters.polygonTypes)) {
    delete requestBody.subregionIntervalTypes;
    delete requestBody.city;
  }
  return requestBody;
};

export const getDataGWReqBody = ({ filters }) => {
  const requestBody = {};

  if (isString(filters.startDate)) {
    requestBody.startDate = filters.startDate;
  }
  if (isString(filters.endDate)) {
    requestBody.endDate = filters.endDate;
  }
  if (filters.selectedCity) {
    requestBody.city = filters.selectedCity;
  }
  if (isNumber(filters.domainTypes)) {
    requestBody.domainTypes = [filters.domainTypes];
  }
  requestBody.hours = filters.hours;
  return requestBody;
};

export const getFilteredWarehouses = ({ warehouses = [], polygonFilters = {} }) => {
  return warehouses?.filter(warehouse => (
    warehouse.state === WAREHOUSE_STATE &&
      warehouseTypesForMaps.has(warehouse.warehouseType)) &&
    (isNumber(polygonFilters.domainTypes) && warehouse?.domainTypes.includes(polygonFilters?.domainTypes)) &&
    (!isEmpty(polygonFilters.city) && get(warehouse, 'city._id', warehouse.city) === polygonFilters.city));
};
