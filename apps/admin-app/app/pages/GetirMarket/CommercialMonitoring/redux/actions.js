import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.GETIR_MARKET.COMMERCIAL_MONITORING}_`;

export const { Types, Creators } = createActions({
  getProductSaleStatsRequest: null,
  getProductSaleStatsSuccess: { data: [] },
  getProductSaleStatsFailure: { error: null },
  getAvailabilityRequest: null,
  getAvailabilitySuccess: { data: [] },
  getAvailabilityFailure: { error: null },
  getInstantAvailabilityRequest: null,
  getInstantAvailabilitySuccess: { data: [] },
  getInstantAvailabilityFailure: { error: null },
  setFilterParams: { filterParams: {} },
  setTableFilterParams: { filterParams: {} },
  initPage: null,
  destroyPage: null,
}, { prefix });
