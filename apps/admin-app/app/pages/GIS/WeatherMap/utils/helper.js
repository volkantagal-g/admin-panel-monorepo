import { isNumber, isEmpty, get } from 'lodash';
import { buffer, featureCollection, polygon as turfPolygon } from '@turf/turf';
import { polygonToCells } from 'h3-js';

import { WAREHOUSE_ACTIVE_STATE } from '@shared/shared/constants';

import {
  POLYGON_BUFFER_DISTANCE,
  BAN_POLYGON_TYPES,
  WAREHOUSE_TYPES_FOR_MAPS,
  H3_RESOLUTION,
  POLYGON_BUFFER_UNIT,
  YELLOW_RGB,
  ORANGE_RGB,
  GREEN_RGB,
  RED_RGB,
  WIND_SPEED_FIELD,
  TEMPERATURE_FIELD,
} from './constants';

export const getPolygonReqBody = ({ filters }) => {
  const requestBody = {};

  if (isNumber(filters.domainType)) {
    requestBody.domainTypes = [filters.domainType];
  }
  if (isNumber(filters.polygonType)) {
    requestBody.polygonTypes = [filters.polygonType];
  }
  if (isNumber(filters.subregionIntervalType)) {
    requestBody.subregionIntervalTypes = [filters.subregionIntervalType];
  }
  if (filters.city) {
    requestBody.city = filters.city;
  }
  if (BAN_POLYGON_TYPES.includes(filters.polygonType)) {
    delete requestBody.subregionIntervalTypes;
    delete requestBody.city;
  }
  return requestBody;
};

export const getPolygonsGeojson = polygons => {
  return featureCollection(polygons?.map(polygon => {
    const geom = polygon.geometry.coordinates;
    return turfPolygon(geom, polygon);
  }));
};

export const getFilteredWarehouses = ({ warehouses = [], polygonFilters = {} }) => {
  return warehouses?.filter(warehouse => (
    warehouse.state === WAREHOUSE_ACTIVE_STATE &&
    WAREHOUSE_TYPES_FOR_MAPS.has(warehouse.warehouseType)) &&
    (isNumber(polygonFilters.domainType) && warehouse?.domainTypes.includes(polygonFilters?.domainType)) &&
    (!isEmpty(polygonFilters.city) && get(warehouse, 'city._id', warehouse.city) === polygonFilters.city));
};

export const getH3IdsByGeometry = polygons => {
  const hexagonIds = [];
  polygons.forEach(polygon => {
    const buffered = buffer(polygon.geometry, POLYGON_BUFFER_DISTANCE, { units: POLYGON_BUFFER_UNIT });
    const hexagons = polygonToCells(buffered.geometry.coordinates[0], H3_RESOLUTION, true);
    hexagonIds.push(...hexagons);
  });
  return [...new Set(hexagonIds)];
};

const getColorForWindSpeed = value => {
  if (value > 10) {
    return RED_RGB;
  }
  if (value > 5) {
    return YELLOW_RGB;
  }
  return GREEN_RGB;
};

const getColorForTemperature = value => {
  if (value > 30) {
    return GREEN_RGB;
  }
  if (value === 5) {
    return YELLOW_RGB;
  }
  if (value > 5) {
    return GREEN_RGB;
  }
  if (value > 0) {
    return ORANGE_RGB;
  }
  return RED_RGB;
};

export const getH3HexagonFillColor = (field, value) => {
  switch (field) {
    case WIND_SPEED_FIELD:
      return getColorForWindSpeed(value);

    case TEMPERATURE_FIELD:
      return getColorForTemperature(value);

    default:
      return null;
  }
};
