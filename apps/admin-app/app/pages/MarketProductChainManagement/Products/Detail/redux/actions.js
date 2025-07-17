import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  // Product Detail Actions
  fetchProductDetailRequest: ['productId'],
  fetchProductDetailSuccess: ['data'],
  fetchProductDetailFailure: ['error'],

  // Dark Store Actions
  fetchDarkStoresRequest: ['productId'],
  fetchDarkStoresSuccess: ['darkstoreList', 'totalCount'],
  fetchDarkStoresFailure: ['error'],

  // Supplier Actions
  fetchSuppliersRequest: null,
  fetchSuppliersSuccess: ['suppliers', 'totalCount'],
  fetchSuppliersFailure: ['error'],

  // Warehouse Actions
  fetchWarehousesRequest: null,
  fetchWarehousesSuccess: ['warehouses', 'totalCount'],
  fetchWarehousesFailure: ['error'],

  // UI Actions
  updateFilters: ['filters'],
  updateSort: ['sort'],
  updatePagination: ['pagination'],
  updateActiveTab: ['tabKey'],
  resetState: null,
});

export { Creators, Types };
