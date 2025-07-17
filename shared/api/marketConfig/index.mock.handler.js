import { ADMIN_PANEL_CONFIGS } from '@shared/shared/constants';
import * as MOCKS from './index.mock.data';

const getConfigsUrl = '/marketConfig/configs';

const getConfigsMockOptions = {
  url: getConfigsUrl,
  successData: MOCKS.mockedConfigs,
};

const getMarketConfigUrl = '/marketConfig/getConfigWKey';

const getMarketConfigMockOptions = {
  url: getMarketConfigUrl,
  handler: req => {
    const { key } = req.body;
    if (key === ADMIN_PANEL_CONFIGS.ACTIVE_INTEGRATION_TYPES) {
      return { data: MOCKS.integrationTypeMockData };
    }
    if (key === ADMIN_PANEL_CONFIGS.ACTIVE_DOMAIN_TYPES) {
      return { data: MOCKS.domainTypeMockData };
    }
    return {};
  },
};

export default [getConfigsMockOptions, getMarketConfigMockOptions];
