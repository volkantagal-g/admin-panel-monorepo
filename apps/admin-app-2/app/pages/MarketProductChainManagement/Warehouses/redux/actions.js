import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  // Central Warehouse Actions
  fetchCentralWarehousesRequest: ['params'],
  fetchCentralWarehousesSuccess: ['centralWarehouses', 'totalCount'],
  fetchCentralWarehousesFailure: ['error'],

  // Import Actions
  importCentralWarehousesRequest: ['file'],
  importCentralWarehousesSuccess: null,
  importCentralWarehousesFailure: ['error'],

  importDarkStoresRequest: ['loadedFile'],
  importDarkStoresSuccess: null,
  importDarkStoresFailure: ['error'],

  // Dark Store Actions
  fetchDarkStoresRequest: ['params'],
  fetchDarkStoresSuccess: ['darkStores', 'totalCount'],
  fetchDarkStoresFailure: ['error'],

  // UI Actions
  updateFilters: ['filters'],
  updateSort: ['sort'],
  updatePagination: ['pagination'],
  updateActiveTab: ['tabKey'],
  resetFilters: null,
  resetState: null,

  exportCentralWarehouseRequest: null,
  exportCentralWarehouseSuccess: null,
  exportCentralWarehouseFailure: ['error'],

  exportDarkStoreRequest: null,
  exportDarkStoreSuccess: null,
  exportDarkStoreFailure: ['error'],

  // State temizleme action'ı - saga'ları durdurmak için
  clearWarehousesState: null,
});

export { Creators, Types };
