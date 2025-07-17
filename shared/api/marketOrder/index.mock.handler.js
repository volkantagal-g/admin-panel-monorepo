// TESTING_PRACTICE_EXAMPLE MOCK_HANDLER_OPTIONS
import * as MOCKS from './index.mock.data';

const getMarketOrderDetails = {
  url: '/marketOrder/getOrderDetail',
  method: 'post',
  successData: MOCKS.mockedMarketOrderDetail,
};

const getFraudOrderDetails = {
  url: '/marketOrder/getFraudOrderDetail',
  method: 'post',
  successData: {},
};
const getMissingProductOrders = {
  url: '/marketOrder/getMissingProducts',
  method: 'post',
  successData: {},
};

export default [
  getMarketOrderDetails,
  getFraudOrderDetails,
  getMissingProductOrders,
];
