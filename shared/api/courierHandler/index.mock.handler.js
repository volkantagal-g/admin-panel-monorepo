import * as MOCKS from './index.mock.data';

const getCourierListURL = '/courierHandler/couriers/filter';
const getCourierWithPersonDetailsURL = '/courierHandler/couriers/getCourierWithPersonDetails';

const getCourierListConfigMock = {
  url: getCourierListURL,
  method: 'post',
  successData: MOCKS.courierListMock,
};

const getCourierDetailsConfigMock = {
  url: getCourierWithPersonDetailsURL,
  method: 'post',
  successData: MOCKS.courierDetailMock,
};

export default [
  getCourierListConfigMock,
  getCourierDetailsConfigMock,
];
