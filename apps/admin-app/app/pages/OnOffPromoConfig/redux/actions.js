import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  setSelectedCityFilter: { data: {} },
  setSelectedWarehouse: { data: [] },
  setChangedConfig: { data: {} },
  setSelectedConfig: { data: null },
  setConfigFilteredCityList: { data: [] },

  getOnOffResultRequest: { data: {} },
  getOnOffResultSuccess: { data: [] },
  getOnOffResultFailure: { error: null },

  getChangedConfigSuccess: { data: {} },
  getChangedConfigFailure: { error: null },

  initPage: null,
  destroyPage: null,

}, { prefix: `${REDUX_KEY.ON_OFF_PROMO_CONFIG}_` });
