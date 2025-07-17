import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createMarketProductCategoryAvailableTimeRequest: { body: null },
  createMarketProductCategoryAvailableTimeSuccess: { data: [] },
  createMarketProductCategoryAvailableTimeFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.CATEGORY.VISIBILITY.NEW}_` });
