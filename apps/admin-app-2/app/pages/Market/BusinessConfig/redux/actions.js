import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getMarketBusinessConfigsRequest: { configKeys: [] },
  getMarketBusinessConfigsSuccess: { marketBusinessConfigs: {} },
  getMarketBusinessConfigsFailure: { error: null },
  updateBusinessConfigValueRequest: { configBody: {} },
  updateBusinessConfigValueSuccess: { businessConfigValue: {} },
  updateBusinessConfigValueFailure: { error: null },
  updateBusinessConfigCustomValueRequest: { configCustomBody: {} },
  updateBusinessConfigCustomValueSuccess: { businessConfigCustomValue: {} },
  updateBusinessConfigCustomValueFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET.BUSINESS_CONFIG}_` });
