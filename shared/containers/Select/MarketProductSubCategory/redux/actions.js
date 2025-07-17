import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getMarketProductSubCategoriesRequest: { body: null },
  getMarketProductSubCategoriesSuccess: { data: {} },
  getMarketProductSubCategoriesFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.SELECT.MARKET_PRODUCT_SUB_CATEGORY}_` });
