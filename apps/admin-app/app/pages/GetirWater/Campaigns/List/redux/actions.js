import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getCampaignsRequest: { data: {} },
  getCampaignsSuccess: { data: [] },
  getCampaignsFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.GETIR_WATER.CAMPAIGNS}_` });
