import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createMarketProductMasterCategoryRequest: { body: null },
  createMarketProductMasterCategorySuccess: { data: {} },
  createMarketProductMasterCategoryFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.MASTER_CATEGORY.NEW}_` });
