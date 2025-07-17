import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getMarketProductGroupsRequest: { limit: 10, offset: 0, queryText: null, filterOptions: {} },
  getMarketProductGroupsSuccess: { data: [] },
  getMarketProductGroupsFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.GROUP.LIST}_` });
