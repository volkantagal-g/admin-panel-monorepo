import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getMarketProductCategoryAvailableTimeRequest: { id: null },
  getMarketProductCategoryAvailableTimeSuccess: { data: {} },
  getMarketProductCategoryAvailableTimeFailure: { error: null },
  updateMarketProductCategoryAvailableTimeRequest: { id: null, body: null },
  updateMarketProductCategoryAvailableTimeSuccess: {},
  updateMarketProductCategoryAvailableTimeFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.CATEGORY.VISIBILITY.DETAIL}_` });
