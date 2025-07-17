import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createMarketFranchiseUserRequest: { requestBody: {} },
  createMarketFranchiseUserSuccess: null,
  createMarketFranchiseUserFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_FRANCHISE.USER.NEW}_` });
