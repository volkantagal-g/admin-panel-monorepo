import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  updateCategoryOrderBulkRequest: { body: null, domainType: null },
  updateCategoryOrderBulkSuccess: { data: [] },
  updateCategoryOrderBulkFailure: { error: null },
  toggleCategoryActivenessSwitch: { data: null },
  toggleCategoryListablesSwitch: { data: null },
  getCategoryOrdersRequest: { domainType: null, showInactives: null, isListable: null },
  getCategoryOrdersSuccess: { data: [] },
  getCategoryOrdersFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.CATEGORY.SORT}_` });
