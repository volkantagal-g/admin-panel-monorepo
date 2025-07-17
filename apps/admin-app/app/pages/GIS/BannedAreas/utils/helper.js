import { difference, get, isArray, isEmpty, isNumber, keys } from 'lodash';
import * as Yup from 'yup';

import { featureCollection, polygon as turfPolygon } from '@turf/turf';

import moment from 'moment';

import {
  BANNED_COURIERS_POLYGON_TYPE,
  BANNED_FOR_COURIER_GETIR_MARKET_POLYGON_TYPE,
  WAREHOUSE_ACTIVE_STATE,
} from '@shared/shared/constants';

import { VEHICLE_TYPE_REQUIRED_POLYGON_TYPES, warehouseTypesForMaps } from './constants';

export const getPolygonRequestBody = ({ filters }) => {
  const reqBody = {};

  if (isNumber(filters.domainType)) {
    reqBody.domainTypes = [filters.domainType];
  }
  if (isArray(filters.polygonTypes)) {
    reqBody.polygonTypes = filters.polygonTypes;
  }

  return reqBody;
};

export const createBannedPolygonRequestBody = ({ formValues, geometry }) => {
  const reqBody = { ...formValues, polygon: geometry };

  if (!VEHICLE_TYPE_REQUIRED_POLYGON_TYPES.includes(reqBody.polygonType)) {
    delete reqBody.vehicleTypes;
  }
  if (reqBody.polygonType !== BANNED_COURIERS_POLYGON_TYPE) {
    delete reqBody.courierId;
  }
  return reqBody;
};

export const transformScheduledBannedPolygonRequestBody = ({ body }) => {
  const reqBody = { ...body };
  if (body?.vehicleTypes) {
    if (body.polygonType !== BANNED_FOR_COURIER_GETIR_MARKET_POLYGON_TYPE) {
      delete reqBody.vehicleTypes;
    }
  }
  return reqBody;
};

export const validationSchema = () => {
  return Yup.object().shape({
    city: Yup.string().trim(),
    domainTypes: Yup.array().min(1).required(),
    polygonType: Yup.number().min(1).required(),
    name: Yup.string().min(3).required(),
    courierId: Yup.string().when(
      'polygonType',
      {
        is: BANNED_COURIERS_POLYGON_TYPE,
        then: Yup.string().trim().required(),
        otherwise: Yup.string().notRequired(),
      },
    ),
  });
};

export const validateGeoJSON = (data, t) => {
  let geoJson = null;
  const requiredGeoJsonKeys = ['type', 'features'];
  const requiredFeaturesKeys = ['geometry', 'type', 'properties'];
  const requiredGeometryKeys = ['type', 'coordinates'];

  try {
    geoJson = JSON.parse(data);
  }
  catch (err) {
    throw new Error(t('gisBannedAreasPage:INVALID_JSON'));
  }
  if (!isEmpty(difference(requiredGeoJsonKeys, keys(geoJson)))) {
    throw new Error(t('gisBannedAreasPage:INVALID_JSON'));
  }
  if (geoJson.type !== 'FeatureCollection') {
    throw new Error(t('gisBannedAreasPage:INVALID_FEATURE_TYPE'));
  }
  if (isEmpty(geoJson.features)) {
    throw new Error(t('gisBannedAreasPage:EMPTY_FEATURES'));
  }
  if (geoJson.features.length > 100) {
    throw new Error(t('gisBannedAreasPage:MAX_FEATURE_COUNT'));
  }
  geoJson.features.forEach(feature => {
    if (!isEmpty(difference(requiredFeaturesKeys, keys(feature)))) {
      throw new Error(t('gisBannedAreasPage:INVALID_FEATURE_KEYS'));
    }
    if (feature.geometry.type !== 'Polygon') {
      throw new Error(t('gisBannedAreasPage:INVALID_GEOMETRY_TYPE'));
    }
    if (feature.type !== 'Feature') {
      throw new Error(t('gisBannedAreasPage:INVALID_FEATURE_TYPE'));
    }
    if (!isEmpty(difference(requiredGeometryKeys, keys(feature.geometry)))) {
      throw new Error(t('gisBannedAreasPage:INVALID_GEOMETRY_KEYS'));
    }
    if (isEmpty(feature.geometry.coordinates?.[0])) {
      throw new Error(t('gisBannedAreasPage:EMPTY_GEOMETRY'));
    }
  });

  return geoJson;
};

export const informResponseStatus = responses => {
  const { responseArray } = responses;
  const errorList = [];
  responseArray.forEach(response => {
    if (response.message !== undefined) {
      errorList.push(responseArray.indexOf(response));
    }
    return null;
  });
  return errorList;
};

export const getPolygonsGeojson = polygons => {
  return featureCollection(polygons?.map(polygon => {
    const geom = polygon?.geometry?.coordinates;
    return turfPolygon(geom, polygon);
  }));
};

export const getFilteredWarehouses = ({ warehouses = [], domainType = '', city = '' }) => {
  return warehouses?.filter(warehouse => (
    warehouse.state === WAREHOUSE_ACTIVE_STATE &&
    warehouseTypesForMaps.has(warehouse.warehouseType)) &&
      (isNumber(domainType) && warehouse?.domainTypes.includes(domainType)) &&
      (!isEmpty(city) && get(warehouse, 'city._id', warehouse.city) === city));
};

export const transformTimeStringToTimeZone = (timeString, targetTimeZone) => {
  const sourceTime = moment.tz(timeString, 'HH:mm', 'UTC');
  const targetTime = sourceTime.clone().tz(targetTimeZone);
  return targetTime.format('HH:mm');
};
