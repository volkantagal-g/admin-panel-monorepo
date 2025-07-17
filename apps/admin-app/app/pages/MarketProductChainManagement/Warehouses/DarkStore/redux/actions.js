import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchDarkStoreDetailRequest: ['darkStoreId'],
  fetchDarkStoreDetailSuccess: ['data'],
  fetchDarkStoreDetailFailure: ['error'],

  fetchProductsRequest: ['darkStoreId'],
  fetchProductsSuccess: ['products', 'totalCount'],
  fetchProductsFailure: ['error'],

  fetchWarehousesRequest: null,
  fetchWarehousesSuccess: ['warehouses', 'totalCount'],
  fetchWarehousesFailure: ['error'],

  fetchSuppliersRequest: null,
  fetchSuppliersSuccess: ['suppliers', 'totalCount'],
  fetchSuppliersFailure: ['error'],

  updateFilters: ['filters'],
  updateSort: ['sort'],
  updatePagination: ['pagination'],
  updateActiveTab: ['tabKey'],
  resetState: null,

});

export { Creators, Types };
