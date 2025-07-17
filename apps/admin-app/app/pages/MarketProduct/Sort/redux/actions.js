import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getProductPositionsByCategoryRequest: { id: null },
  getProductPositionsByCategorySuccess: { data: [] },
  getProductPositionsByCategoryFailure: { error: null },
  updateProductPositionsBulkRequest: { id: null, body: null },
  updateProductPositionsBulkSuccess: { data: [] },
  updateProductPositionsBulkFailure: { error: null },
  toggleCategoryActivenessSwitch: { data: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.SORT}_` });
