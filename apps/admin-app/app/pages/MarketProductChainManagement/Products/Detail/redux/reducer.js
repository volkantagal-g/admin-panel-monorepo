import { createReducer } from 'reduxsauce';

import { PRODUCT_DETAIL_TABS, PRODUCT_TABS, REDUX_STORE_KEYS, getirMarketDomainTypes } from '@app/pages/MarketProductChainManagement/constants';
import { Types } from './actions';

// State interface (for documentation and better intellisense)
/**
 * @typedef {Object} ProductDetailState
 * @property {Object} data - Product detail data
 * @property {Object} loading - Loading states
 * @property {boolean} loading.fetch - Fetch loading state
 * @property {Object|null} error - Error state
 * @property {number} activeTab - Active tab key
 * @property {Object} filters - Filter values
 * @property {Object} pagination - Pagination state
 * @property {number} pagination.page - Current page
 * @property {number} pagination.pageSize - Page size
 * @property {Object} sort - Sort state
 * @property {string} sort.field - Sort field
 * @property {string} sort.order - Sort order
 */

/** @type {ProductDetailState} */
const INITIAL_STATE = {
  productId: null,
  data: null,
  darkStores: {
    data: [],
    totalCount: 0,
    isLoaded: false,
  },
  suppliers: {
    data: [],
    totalCount: 0,
    isLoaded: false,
  },
  warehouses: {
    data: [],
    totalCount: 0,
    isLoaded: false,
  },
  loading: {
    fetch: false,
    darkStores: false,
    suppliers: false,
    warehouses: false,
  },
  error: null,
  activeTab: PRODUCT_DETAIL_TABS.DARK_STORE,
  filters: {
    search: '',
    status: null,
  },
  pagination: {
    page: 1,
    pageSize: 10,
  },
  sort: {
    field: 'name',
    order: 'asc',
  },
};

// Product Detail
const fetchProductDetailRequest = (state, { productId }) => ({
  ...state,
  productId,
  loading: { ...state.loading, fetch: true },
  error: null,
});

const fetchProductDetailSuccess = (state, { data }) => ({
  ...state,
  data,
  loading: { ...state.loading, fetch: false },
  error: null,
});

const fetchProductDetailFailure = (state, { error }) => ({
  ...state,
  loading: { ...state.loading, fetch: false },
  error,
});

// Dark Store
const fetchDarkStoresRequest = state => ({
  ...state,
  loading: {
    ...state.loading,
    darkStores: true,
  },
  error: null,
});

const fetchDarkStoresSuccess = (state, { darkstoreList, totalCount }) => ({
  ...state,
  darkStores: {
    data: darkstoreList.map(ds => ({
      id: ds.id || ds.darkStoreId,
      key: ds.id || ds.darkStoreId,
      name: ds.name,
      domainTypes: ds.domainTypes || [],
      domain: (ds.domainTypes || [])
        .map(type => {
          try {
            const domainType = getirMarketDomainTypes && getirMarketDomainTypes[type];
            return domainType ? domainType.name : `Domain ${type}`;
          }
          catch (e) {
            return `Domain ${type}`;
          }
        })
        .filter(Boolean)
        .join(', ') || '-',
      warehouseType: ds.warehouseType,
      type: ds.warehouseType || '-',
      cityId: ds.cityId,
      city: ds.cityName?.tr || ds.cityName?.en || '-',
      cityName: ds.cityName?.tr || ds.cityName?.en || '-',
      regionId: ds.regionId,
      region: ds.regionName?.tr || ds.regionName?.en || '-',
      regionName: ds.regionName?.tr || ds.regionName?.en || '-',
      demography: ds.demography,
      size: ds.size,
      masterCategoryCount: ds.masterCategoryCount || 0,
      productCount: ds.productCount || 0,
      products: ds.productCount || 0,
      centeralWarehouseCount: ds.centeralWarehouseCount || 0,
      cws: ds.centeralWarehouseCount || 0,
      supplierCount: ds.supplierCount || 0,
      suppliers: ds.supplierCount || 0,
    })),
    totalCount,
    isLoaded: true,
    count: totalCount,
  },
  loading: {
    ...state.loading,
    darkStores: false,
  },
  error: null,
});

const fetchDarkStoresFailure = (state, { error }) => ({
  ...state,
  loading: {
    ...state.loading,
    darkStores: false,
  },
  darkStores: {
    ...state.darkStores,
    isLoaded: false,
  },
  error,
});

// Suppliers
const fetchSuppliersRequest = state => ({
  ...state,
  loading: { ...state.loading, suppliers: true },
  error: null,
});

const fetchSuppliersSuccess = (state, action) => ({
  ...state,
  suppliers: {
    data: action.suppliers || [],
    totalCount: action.totalCount || 0,
    isLoaded: true,
  },
  loading: { ...state.loading, suppliers: false },
  error: null,
});

const fetchSuppliersFailure = (state, { error }) => ({
  ...state,
  loading: { ...state.loading, suppliers: false },
  error,
});

// Warehouses
const fetchWarehousesRequest = state => ({
  ...state,
  loading: { ...state.loading, warehouses: true },
  error: null,
});

const fetchWarehousesSuccess = (state, action) => ({
  ...state,
  warehouses: {
    data: action.warehouses || [],
    totalCount: action.totalCount || 0,
    isLoaded: true,
  },
  loading: { ...state.loading, warehouses: false },
  error: null,
});

const fetchWarehousesFailure = (state, { error }) => ({
  ...state,
  loading: { ...state.loading, warehouses: false },
  error,
});

// UI Actions
const updateActiveTab = (state, { tabKey }) => ({
  ...state,
  activeTab: tabKey,
});

const updateFilters = (state, { filters }) => ({
  ...state,
  filters,
  pagination: { ...state.pagination, page: 1 },
});

const updatePagination = (state, { pagination }) => ({
  ...state,
  pagination: { ...state.pagination, ...pagination },
});

const updateSort = (state, { sort }) => ({
  ...state,
  sort,
  pagination: { ...state.pagination, page: 1 },
});

const resetState = () => ({
  ...INITIAL_STATE,
  darkStores: { ...INITIAL_STATE.darkStores, isLoaded: false },
  suppliers: { ...INITIAL_STATE.suppliers, isLoaded: false },
  warehouses: { ...INITIAL_STATE.warehouses, isLoaded: false },
});

const HANDLERS = {
  [Types.FETCH_PRODUCT_DETAIL_REQUEST]: fetchProductDetailRequest,
  [Types.FETCH_PRODUCT_DETAIL_SUCCESS]: fetchProductDetailSuccess,
  [Types.FETCH_PRODUCT_DETAIL_FAILURE]: fetchProductDetailFailure,
  [Types.FETCH_DARK_STORES_REQUEST]: fetchDarkStoresRequest,
  [Types.FETCH_DARK_STORES_SUCCESS]: fetchDarkStoresSuccess,
  [Types.FETCH_DARK_STORES_FAILURE]: fetchDarkStoresFailure,
  [Types.FETCH_SUPPLIERS_REQUEST]: fetchSuppliersRequest,
  [Types.FETCH_SUPPLIERS_SUCCESS]: fetchSuppliersSuccess,
  [Types.FETCH_SUPPLIERS_FAILURE]: fetchSuppliersFailure,
  [Types.FETCH_WAREHOUSES_REQUEST]: fetchWarehousesRequest,
  [Types.FETCH_WAREHOUSES_SUCCESS]: fetchWarehousesSuccess,
  [Types.FETCH_WAREHOUSES_FAILURE]: fetchWarehousesFailure,
  [Types.UPDATE_ACTIVE_TAB]: updateActiveTab,
  [Types.UPDATE_FILTERS]: updateFilters,
  [Types.UPDATE_PAGINATION]: updatePagination,
  [Types.UPDATE_SORT]: updateSort,
  [Types.RESET_STATE]: resetState,
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);

// Selectors
const getProductDetailState = state => state?.[REDUX_STORE_KEYS.PRODUCT_DETAIL] || INITIAL_STATE;

// Base selectors
export const selectProductId = state => getProductDetailState(state).productId;
export const selectProductData = state => getProductDetailState(state).data;
export const selectProductLoading = state => getProductDetailState(state).loading;
export const selectProductError = state => getProductDetailState(state).error;
export const selectActiveTab = state => getProductDetailState(state).activeTab;
export const selectFilters = state => getProductDetailState(state).filters;
export const selectPagination = state => getProductDetailState(state).pagination;
export const selectSort = state => getProductDetailState(state).sort;

// Tab data selectors
export const selectDarkStores = state => getProductDetailState(state).darkStores;
export const selectSuppliers = state => getProductDetailState(state).suppliers;
export const selectWarehouses = state => getProductDetailState(state).warehouses;

// Current tab data selector
export const selectCurrentTabData = state => {
  const productDetailState = getProductDetailState(state);
  const { activeTab } = productDetailState;

  switch (Number(activeTab)) {
    case PRODUCT_TABS.DARK_STORE:
      return productDetailState.darkStores;
    case PRODUCT_TABS.SUPPLIERS:
      return productDetailState.suppliers;
    case PRODUCT_TABS.CENTRAL_WAREHOUSE:
      return productDetailState.warehouses;
    default:
      return null;
  }
};

// Form values selector
export const selectFormValues = state => ({
  filters: selectFilters(state),
  pagination: selectPagination(state),
  sort: selectSort(state),
});
