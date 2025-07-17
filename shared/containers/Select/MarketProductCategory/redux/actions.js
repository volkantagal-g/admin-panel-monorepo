import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SELECT.MARKET_PRODUCT_CATEGORY}_`;

export const { Types, Creators } = createActions({
  getMarketProductCategoriesRequest: { limit: null, offset: null, isSubCategory: null, queryText: '' },
  getMarketProductCategoriesSuccess: { data: [] },
  getMarketProductCategoriesFailure: { error: null },
  clearMarketProductCategories: null,
  initContainer: null,
  destroyContainer: null,
}, { prefix });
