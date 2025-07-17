import { getOrderCountsForCountryMockData, getOrderCountsForGlobalMockData } from './index.mock.data';

const getOrderCountsForCountry = {
  url: '/orderCounter/getOrderCountsForCountry',
  method: 'post',
  successData: getOrderCountsForCountryMockData,
};

const getOrderCountsForGlobal = {
  url: '/orderCounter/getOrderCountsForGlobal',
  method: 'post',
  successData: getOrderCountsForGlobalMockData,
};

export default [
  getOrderCountsForCountry,
  getOrderCountsForGlobal,
];
