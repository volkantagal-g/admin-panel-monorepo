import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getMarketFranchisesRequest: {
    name: undefined,
    cities: undefined,
    domainTypes: undefined,
    franchiseTypes: undefined,
    isActivated: undefined,
    limit: undefined,
    offset: undefined,
  },
  getMarketFranchisesSuccess: { data: [], total: 0 },
  getMarketFranchisesFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_FRANCHISE.LIST}_` });
