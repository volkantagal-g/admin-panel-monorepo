import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getMarketProductCategoriesRequest: { limit: 10, offset: 0, queryText: '', status: undefined, domainType: undefined },
  getMarketProductCategoriesSuccess: { data: [] },
  getMarketProductCategoriesFailure: { error: null },
  getMarketProductSubCategoriesRequest: { limit: 10, offset: 0, queryText: '', status: undefined },
  getMarketProductSubCategoriesSuccess: { data: [] },
  getMarketProductSubCategoriesFailure: { error: null },
  initPage: null,
  destroyPage: null,
  setFilterOptions: { selectedStatuses: [] },
  setSearchValue: { searchValue: '' },
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.CATEGORY.LIST}_` });
