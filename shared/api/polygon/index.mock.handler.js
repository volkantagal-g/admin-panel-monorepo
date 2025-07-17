import * as MOCKS from './index.mock.data';

const getPolygonsByPolygonTypesUrl = '/polygon/getPolygonsByPolygonTypes';
const getPolygonsByPolygonTypesMockOptions = {
  url: getPolygonsByPolygonTypesUrl,
  method: 'post',
  successData: MOCKS.mockedPolygons,
};

const getPolygonsByPolygonTypesError = {
  url: getPolygonsByPolygonTypesUrl,
  method: 'post',
  errorData: { msg: 'Get Polygon Error' },
};

const updatePolygonsByPolygonTypeUrl = '/polygon/updatePolygonsByPolygonType';
const updatePolygonsByPolygonTypeMockOptions = {
  url: updatePolygonsByPolygonTypeUrl,
  method: 'post',
  successData: MOCKS.mockedUpdatePolygons,
};

const updatePolygonsByPolygonTypeError = {
  url: updatePolygonsByPolygonTypeUrl,
  method: 'post',
  errorData: { msg: 'Polygon Update Error' },
};

export default [
  getPolygonsByPolygonTypesMockOptions,
  getPolygonsByPolygonTypesError,
  updatePolygonsByPolygonTypeMockOptions,
  updatePolygonsByPolygonTypeError,
];
