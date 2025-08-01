import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getMarketProductCategoriesRequest: {},
  getMarketProductCategoriesSuccess: { data: [] },
  getMarketProductCategoriesFailure: { error: null },
  createMarketProductCategoryRequest: { body: null },
  createMarketProductCategorySuccess: { data: [] },
  createMarketProductCategoryFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.CATEGORY.NEW}_` });
