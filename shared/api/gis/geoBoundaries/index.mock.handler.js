import {
  mockCityBoundaryData,
  mockCountryBoundaryData,
  mockCreateCityBoundarySuccesData,
  mockCreateCountryBoundarySuccesData,
} from './index.mock.data';

const getCountryBoundary = {
  url: '/gis/geoBoundaries/getCountryBoundary',
  method: 'post',
  successData: mockCountryBoundaryData,
};
const createCountryBoundarySuccess = {
  url: '/gis/geoBoundaries/createCountryBoundary',
  method: 'post',
  successData: mockCreateCountryBoundarySuccesData,
};

const createCountryBoundaryFailure = {
  url: '/gis/geoBoundaries/createCountryBoundary',
  method: 'post',
  errorData: 'error',
};

const getCityBoundary = {
  url: '/gis/geoBoundaries/getCityBoundary',
  method: 'post',
  successData: mockCityBoundaryData,
};

const createCityBoundarySuccess = {
  url: '/gis/geoBoundaries/createCityBoundary',
  method: 'post',
  successData: mockCreateCityBoundarySuccesData,
};

const createCityBoundaryFailure = {
  url: '/gis/geoBoundaries/createCityBoundary',
  method: 'post',
  errorData: 'error',
};

export default [
  getCountryBoundary,
  createCountryBoundarySuccess,
  createCountryBoundaryFailure,
  getCityBoundary,
  createCityBoundarySuccess,
  createCityBoundaryFailure,
];
