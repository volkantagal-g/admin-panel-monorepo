import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getOrderPromoDistributionBetweenDatesRequest: { payload: null },
  getOrderPromoDistributionBetweenDatesSuccess: { data: {} },
  getOrderPromoDistributionBetweenDatesFailure: {},

  getClientOrderCountsRequest: { payload: null },
  getClientOrderCountsSuccess: { data: {} },
  getClientOrderCountsFailure: {},

  getClientDownloadSignupStatsRequest: { payload: null },
  getClientDownloadSignupStatsSuccess: { data: {} },
  getClientDownloadSignupStatsFailure: {},

  getWarehouseStatsRequest: { payload: null },
  getWarehouseStatsSuccess: { data: {} },
  getWarehouseStatsFailure: {},

  clearStateData: { stateKey: '', data: [] },
  setFilters: { params: {} },

  getActiveIntegrationTypesConfigRequest: {},
  getActiveIntegrationTypesConfigSuccess: { data: null },
  getActiveIntegrationTypesConfigFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.GETIR_MARKET.GROWTH_COMPARISON}_` });
