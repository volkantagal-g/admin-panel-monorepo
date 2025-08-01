import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createMarketProductGroupRequest: { body: null },
  createMarketProductGroupSuccess: { data: [] },
  createMarketProductGroupFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.GROUP.NEW}_` });
