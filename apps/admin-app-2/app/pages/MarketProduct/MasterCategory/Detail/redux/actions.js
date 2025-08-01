import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getMarketProductMasterCategoryRequest: { id: null },
  getMarketProductMasterCategorySuccess: { data: {} },
  getMarketProductMasterCategoryFailure: { error: null },
  updateMarketProductMasterCategoryRequest: { id: null, body: null },
  updateMarketProductMasterCategorySuccess: { data: {} },
  updateMarketProductMasterCategoryFailure: { error: null },
  getChildrenOfMarketProductMasterCategoryRequest: { id: null, limit: null, offset: null },
  getChildrenOfMarketProductMasterCategorySuccess: { data: {} },
  getChildrenOfMarketProductMasterCategoryFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.MASTER_CATEGORY.DETAIL}_` });
