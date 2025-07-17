import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getOperationStatsRequest: { data: {} },
  getOperationStatsSuccess: { data: [] },
  getOperationStatsFailure: { error: null },
  getLiveMapDataBySelectedCityRequest: { data: {} },
  getLiveMapDataBySelectedCitySuccess: { data: [] },
  getLiveMapDataBySelectedCityFailure: { error: null },

  fetchInitialData: { selectedCity: null },
  setFilters: { filters: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.LIVE_MONITORING.OPERATIONS}_` });
