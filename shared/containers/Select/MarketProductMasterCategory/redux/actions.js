import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SELECT.MARKET_PRODUCT_MASTER_CATEGORY}_`;

export const { Types, Creators } = createActions({
  getMarketProductMasterCategoriesRequest: { queryText: undefined, level: undefined, limit: undefined, offset: undefined },
  getMarketProductMasterCategoriesSuccess: { data: [] },
  getMarketProductMasterCategoriesFailure: { error: null },
  clearMarketProductMasterCategories: null,
  initContainer: null,
  destroyContainer: null,
}, { prefix });
