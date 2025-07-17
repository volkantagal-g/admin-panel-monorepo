import * as MOCKS from './index.mock.data';

const getMarketBusinessConfigs = {
  method: 'post',
  url: '/marketBusinessConfig/configsByKeys',
  successData: MOCKS.marketBusinessConfigMocks,
};

export default [
  getMarketBusinessConfigs,
];
