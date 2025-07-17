import { featureCollection, polygon } from '@turf/turf';

import moment from 'moment';

import {
  getPolygonRequestBody,
  createBannedPolygonRequestBody,
  validateGeoJSON,
  transformTimeStringToTimeZone,
} from './helper';
import { mockedBannedPolygon } from '@shared/api/polygon/index.mock.data';

const getBanPolygonFilters = {
  domainType: 1,
  polygonTypes: [2],
};

const getPolygonReqBody = {
  domainTypes: [1],
  polygonTypes: [2],
};

const createBanPolygonFilters = {
  isActive: true,
  domainType: mockedBannedPolygon.domainTypes,
  polygonTypes: mockedBannedPolygon.polygonType,
  name: mockedBannedPolygon.name,
  city: mockedBannedPolygon.city,
};

const createBanPolygonRequestBody = {
  isActive: true,
  domainType: mockedBannedPolygon.domainTypes,
  polygonTypes: mockedBannedPolygon.polygonType,
  name: mockedBannedPolygon.name,
  city: mockedBannedPolygon.city,
  polygon: {
    type: mockedBannedPolygon.polygon.type,
    coordinates: mockedBannedPolygon.polygon.coordinates,
  },
};

const mockedPolygon = polygon(
  mockedBannedPolygon.polygon.coordinates,
  { name: mockedBannedPolygon.polygon.name },
);
const mockedFeatureCollection = featureCollection([mockedPolygon]);

const mockedGeoJson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: mockedBannedPolygon.polygon.type,
        coordinates: mockedBannedPolygon.polygon.coordinates,
      },
    },
  ],
};

const mockedTimeZone = 'America/Chicago';
const mockedUtcTimeString = '12:00';
const mockedChicagoTime = moment().tz(mockedTimeZone).isDST() ? '07:00' : '06:00';

describe('Utils Units', () => {
  describe('Ban Polygon Requests', () => {
    it('should return correct get polygon request for ban polygon types', () => {
      const filteredBanPolygon = getPolygonRequestBody({ filters: getBanPolygonFilters });
      expect(filteredBanPolygon).toEqual(getPolygonReqBody);
    });
    it('should return correct create ban polygon request', () => {
      const newBanPolygonReqBody = createBannedPolygonRequestBody({ formValues: createBanPolygonFilters, geometry: mockedBannedPolygon.polygon });
      expect(newBanPolygonReqBody).toEqual(createBanPolygonRequestBody);
    });
    it('should validate geojson object', () => {
      const stringValue = JSON.stringify(mockedFeatureCollection);
      const validatedObject = validateGeoJSON(stringValue, () => {});
      expect(mockedGeoJson).toEqual(validatedObject);
    });
    it('should transform UTC to specific timezone', () => {
      const transformedTimeString = transformTimeStringToTimeZone(mockedUtcTimeString, mockedTimeZone);
      expect(transformedTimeString).toEqual(mockedChicagoTime);
    });
  });
});
