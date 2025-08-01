import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchCitiesRequest: null,
  fetchCitiesSuccess: ['cities'],
  fetchCitiesFailure: ['error'],

  fetchSuppliersRequest: null,
  fetchSuppliersSuccess: ['suppliers'],
  fetchSuppliersFailure: ['error'],

  searchProductsRequest: ['searchTerm'],
  searchProductsSuccess: ['products'],
  searchProductsFailure: ['error'],
  setProductSearchLoading: ['isLoading'],
  clearProductSearchResults: null,

  fetchLevelsRequest: null,
  fetchLevelsSuccess: null,
  fetchLevelsFailure: ['error'],

  fetchAllChildrenOfMasterCategoryRequest: ['baseCategoryId'],
  fetchAllChildrenOfMasterCategorySuccess: ['children'],
  fetchAllChildrenOfMasterCategoryFailure: ['error'],

  fetchMarketProductMasterCategoriesRequest: ['level'],
  fetchMarketProductMasterCategoriesSuccess: ['categories'],
  fetchMarketProductMasterCategoriesFailure: ['error'],

  fetchCentralWarehousesForMatchRequest: null,
  fetchCentralWarehousesForMatchSuccess: ['centralWarehouses'],
  fetchCentralWarehousesForMatchFailure: ['error'],

  fetchDarkStoreListRequest: null,
  fetchDarkStoreListSuccess: ['darkStores'],
  fetchDarkStoreListFailure: ['error'],

  fetchDarkStoresMatchRequest: ['dataset', 'selectedValue', 'filters'],
  fetchDarkStoresMatchSuccess: ['data'],
  fetchDarkStoresMatchFailure: ['error'],

  updateFilters: ['filters'],
  resetState: null,
});

export { Creators, Types };
