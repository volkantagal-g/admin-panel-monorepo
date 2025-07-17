import { isNumber, isEmpty, get, cloneDeep } from 'lodash';

import { featureCollection, polygon as turfPolygon } from '@turf/turf';
import { scaleLinear, scaleQuantile, scaleQuantize, extent } from 'd3';

import {
  REGULAR_WAREHOUSE_TYPE,
  SC_GROCER_WAREHOUSE_TYPE,
  STORE_CONVERSION_WAREHOUSE_TYPE,
  OTHER_WAREHOUSE_TYPE,
  WAREHOUSE_ACTIVE_STATE,
  BANNED_FOR_COURIER_GETIR_MARKET_POLYGON_TYPE,
  BANNED_FOR_PRODUCT_DISPLAY_GETIR_MARKET_POLYGON_TYPE,
  BANNED_FOR_PROMO_GETIR_MARKET_POLYGON_TYPE,
  TOTALLY_BANNED_GETIR_MARKET_POLYGON_TYPE,
} from '@shared/shared/constants';

export const banPolygonTypes = [
  BANNED_FOR_PRODUCT_DISPLAY_GETIR_MARKET_POLYGON_TYPE,
  BANNED_FOR_PROMO_GETIR_MARKET_POLYGON_TYPE,
  TOTALLY_BANNED_GETIR_MARKET_POLYGON_TYPE,
  BANNED_FOR_COURIER_GETIR_MARKET_POLYGON_TYPE,
];

const warehouseTypesForMaps = new Set([
  REGULAR_WAREHOUSE_TYPE,
  SC_GROCER_WAREHOUSE_TYPE,
  STORE_CONVERSION_WAREHOUSE_TYPE,
  OTHER_WAREHOUSE_TYPE,
]);

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
  if (banPolygonTypes.includes(filters.polygonType)) {
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

export const getEvaluatedFeatureCollection = collection => {
  const { features } = collection;
  return featureCollection(features.map(item => {
    const statProps = item.properties?.totalStats?.map(prop => {
      return { [prop.type]: prop.value };
    });
    const mergedObject = statProps.reduce((acc, obj) => {
      return { ...acc, ...obj };
    }, {});
    const properties = { ...item.properties, ...mergedObject };
    delete properties.totalStats;
    return { ...item, properties };
  }));
};

export const getFilteredWarehouses = ({ warehouses = [], polygonFilters = {} }) => {
  return warehouses?.filter(warehouse => (
    warehouse.state === WAREHOUSE_ACTIVE_STATE &&
      warehouseTypesForMaps.has(warehouse.warehouseType)) &&
    (isNumber(polygonFilters.domainType) && warehouse?.domainTypes.includes(polygonFilters?.domainType)) &&
    (!isEmpty(polygonFilters.city) && get(warehouse, 'city._id', warehouse.city) === polygonFilters.city));
};

export const getNormalizedValues = ({ type, startDate, endDate }) => {
  const newType = cloneDeep(type);
  const grades = newType?.styles?.paint?.['fill-color'];
  const firstDay = new Date(startDate);
  const lastDay = new Date(endDate);
  const numberOfDays = (Math.floor(((lastDay.getTime() - firstDay.getTime()) / (24 * 60 * 60 * 1000) + 1)) / 1000) * 1000;
  for (let i = 0; i < grades?.length; i++) {
    if (i % 2 !== 0 && i > 0) {
      if (Array.isArray(grades[i])) {
        grades[i][2] = Math.round((grades[i][2] * numberOfDays) / 30);
      }
    }
  }
  return newType;
};

export const getStyledGeojson = ({
  data,
  colorRange,
  classificationType,
  statType,
}) => {
  const { features } = data;
  const dataRange = features.map(polygon => polygon.properties[statType]);
  const domain = extent([0, Math.max(...dataRange)]);
  let fillColor;

  const linearScale = scaleLinear()
    .domain(domain)
    .range(colorRange);

  const quantizeScale = scaleQuantize()
    .domain(domain)
    .range(colorRange);

  const quantileScale = scaleQuantile()
    .domain(domain)
    .range(colorRange);

  const updatedData = features.map(feature => {
    const value = feature.properties[statType];

    if (classificationType === 'equalInterval') {
      fillColor = linearScale(value);
    }
    if (classificationType === 'neutral') {
      fillColor = quantileScale(value);
    }
    // It is unused for now.
    // After feature that provide user to spesify intervals it might be useful. (Not Sure)
    if (classificationType === 'quantize') {
      fillColor = quantizeScale(value);
    }

    return ({
      ...feature,
      properties: {
        ...feature.properties,
        color: fillColor,
      },
    });
  });

  return featureCollection(updatedData);
};
