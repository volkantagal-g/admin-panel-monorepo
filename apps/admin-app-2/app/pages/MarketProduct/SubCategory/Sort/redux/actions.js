import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getSubCategoryPositionsRequest: { categoryId: null },
  getSubCategoryPositionsSuccess: { data: [] },
  getSubCategoryPositionsFailure: { error: null },
  updateSubCategoryOrderBulkRequest: { categoryId: null, body: null },
  updateSubCategoryOrderBulkSuccess: { data: [] },
  updateSubCategoryOrderBulkFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.SUB_CATEGORY.SORT}_` });
