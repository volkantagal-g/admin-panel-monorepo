import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({

  getCompetitorListRequest: { data: {} },
  getCompetitorListSuccess: { data: [] },
  getCompetitorListFailure: { error: null },

  postProductMatchDataRequest: { crawlDate: '', competitorName: '' },
  postProductMatchDataSuccess: { data: [] },
  postProductMatchDataFailure: { error: null },

  exportProductsRequest: { data: {} },
  exportProductsSuccess: {},
  exportProductsFailure: { error: null },

  initPage: null,
  destroyPage: null,

}, { prefix: `${REDUX_KEY.MARKET_INTELLIGENCE_PRODUCTS}_` });
