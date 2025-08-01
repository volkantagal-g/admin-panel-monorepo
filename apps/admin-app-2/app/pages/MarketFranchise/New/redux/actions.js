import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,
  createMarketFranchiseRequest: { requestBody: {} },
  createMarketFranchiseSuccess: { data: {} },
  createMarketFranchiseFailure: { error: null },
}, { prefix: `${REDUX_KEY.MARKET_FRANCHISE.NEW}_` });
