import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getMasterMainCategoriesRequest: { limit: 10, offset: 0, queryText: undefined },
  getMasterMainCategoriesSuccess: { data: [] },
  getMasterMainCategoriesFailure: { error: null },
  getMasterCategoriesRequest: { limit: 10, offset: 0, queryText: undefined },
  getMasterCategoriesSuccess: { data: [] },
  getMasterCategoriesFailure: { error: null },
  getMasterClassesRequest: { limit: 10, offset: 0, queryText: undefined },
  getMasterClassesSuccess: { data: [] },
  getMasterClassesFailure: { error: null },
  getMasterSubClassesRequest: { limit: 10, offset: 0, queryText: undefined },
  getMasterSubClassesSuccess: { data: [] },
  getMasterSubClassesFailure: { error: null },
  bulkUpdateMarketProductMasterCategoriesRequest: { categories: [], limit: 10, offset: 0, queryText: undefined },
  bulkUpdateMarketProductMasterCategoriesSuccess: { data: [] },
  bulkUpdateMarketProductMasterCategoriesFailure: { error: null },
  importCreateMasterCategoryRequest: { loadedFile: null },
  importCreateMasterCategorySuccess: { data: [] },
  importCreateMasterCategoryFailure: { error: null },
  importUpdateMasterCategoryRequest: { loadedFile: null },
  importUpdateMasterCategorySuccess: { data: [] },
  importUpdateMasterCategoryFailure: { error: null },
  exportMasterCategoryRequest: { levels: [] },
  exportMasterCategorySuccess: { data: [] },
  exportMasterCategoryFailure: { error: null },
  setSearchValue: { searchValue: '' },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.CATEGORY.LIST}_` });
