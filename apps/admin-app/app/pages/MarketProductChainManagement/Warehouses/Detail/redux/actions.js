import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  // Warehouse Detail Actions
  fetchWarehouseDetailRequest: ['warehouseId'],
  fetchWarehouseDetailSuccess: ['data'],
  fetchWarehouseDetailFailure: ['error'],

  // Products Actions
  fetchProductsRequest: ['params'],
  fetchProductsSuccess: ['products', 'totalCount'],
  fetchProductsFailure: ['error'],

  // Dark Store Actions
  fetchDarkStoresRequest: ['params'],
  fetchDarkStoresSuccess: ['darkStores', 'totalCount'],
  fetchDarkStoresFailure: ['error'],

  // Suppliers Actions
  fetchSuppliersRequest: ['params'],
  fetchSuppliersSuccess: ['suppliers', 'totalCount'],
  fetchSuppliersFailure: ['error'],

  // UI Actions
  updateFilters: ['filters'],
  updateSort: ['sort'],
  updatePagination: ['pagination'],
  updateActiveTab: ['tabKey'],
  resetFilters: null,
  resetState: null,
});

export { Creators, Types };
