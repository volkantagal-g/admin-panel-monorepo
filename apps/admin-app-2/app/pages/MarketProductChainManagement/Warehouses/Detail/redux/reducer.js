import { createReducer } from 'reduxsauce';
import { createSelector } from 'reselect';

import { REDUX_STORE_KEYS, WAREHOUSE_TABS } from '@app/pages/MarketProductChainManagement/constants';
import { Types } from './actions';

const INITIAL_STATE = {
  warehouseId: null,
  data: null,
  products: {
    data: [],
    totalCount: 0,
  },
  darkStores: {
    data: [],
    totalCount: 0,
  },
  suppliers: {
    data: [],
    totalCount: 0,
  },
  loading: {
    detail: false,
    products: false,
    darkStores: false,
    suppliers: false,
    activeRequests: 0,
  },
  error: null,
  activeTab: WAREHOUSE_TABS.PRODUCTS,
  filters: {},
  pagination: { page: 1, pageSize: 10 },
  sort: { field: 'name', order: 'asc' },
};

const createError = (error, type = 'API') => ({
  message: error?.message || 'An error occurred',
  code: error?.code || 'UNKNOWN_ERROR',
  type,
  details: error,
  timestamp: Date.now(),
});

// Warehouse Detail Handlers
const fetchWarehouseDetailRequest = (state, { warehouseId }) => ({
  ...state,
  warehouseId,
  loading: {
    ...state.loading,
    detail: true,
    activeRequests: state.loading.activeRequests + 1,
  },
  error: null,
});

const fetchWarehouseDetailSuccess = (state, { data }) => ({
  ...state,
  data,
  loading: {
    ...state.loading,
    detail: false,
    activeRequests: Math.max(0, state.loading.activeRequests - 1),
  },
  error: null,
});

const fetchWarehouseDetailFailure = (state, { error }) => ({
  ...state,
  loading: {
    ...state.loading,
    detail: false,
    activeRequests: Math.max(0, state.loading.activeRequests - 1),
  },
  error: createError(error),
});

// Products Handlers
const fetchProductsRequest = state => ({
  ...state,
  loading: {
    ...state.loading,
    products: true,
    activeRequests: state.loading.activeRequests + 1,
  },
  error: null,
});

const fetchProductsSuccess = (state, { products, totalCount }) => ({
  ...state,
  products: {
    data: products,
    totalCount,
  },
  loading: {
    ...state.loading,
    products: false,
    activeRequests: Math.max(0, state.loading.activeRequests - 1),
  },
  error: null,
});

const fetchProductsFailure = (state, { error }) => ({
  ...state,
  loading: {
    ...state.loading,
    products: false,
    activeRequests: Math.max(0, state.loading.activeRequests - 1),
  },
  error: createError(error),
});

// Dark Stores Handlers
const fetchDarkStoresRequest = state => ({
  ...state,
  loading: {
    ...state.loading,
    darkStores: true,
    activeRequests: state.loading.activeRequests + 1,
  },
  error: null,
});

const fetchDarkStoresSuccess = (state, { darkStores, totalCount }) => ({
  ...state,
  darkStores: {
    data: darkStores,
    totalCount,
  },
  loading: {
    ...state.loading,
    darkStores: false,
    activeRequests: Math.max(0, state.loading.activeRequests - 1),
  },
  error: null,
});

const fetchDarkStoresFailure = (state, { error }) => ({
  ...state,
  loading: {
    ...state.loading,
    darkStores: false,
    activeRequests: Math.max(0, state.loading.activeRequests - 1),
  },
  error: createError(error),
});

// Suppliers Handlers
const fetchSuppliersRequest = state => ({
  ...state,
  loading: {
    ...state.loading,
    suppliers: true,
    activeRequests: state.loading.activeRequests + 1,
  },
  error: null,
});

const fetchSuppliersSuccess = (state, { suppliers, totalCount }) => ({
  ...state,
  suppliers: {
    data: suppliers,
    totalCount,
  },
  loading: {
    ...state.loading,
    suppliers: false,
    activeRequests: Math.max(0, state.loading.activeRequests - 1),
  },
  error: null,
});

const fetchSuppliersFailure = (state, { error }) => ({
  ...state,
  loading: {
    ...state.loading,
    suppliers: false,
    activeRequests: Math.max(0, state.loading.activeRequests - 1),
  },
  error: createError(error),
});

// UI Action Handlers
const updateFilters = (state, { filters }) => ({
  ...state,
  filters: {
    ...state.filters,
    ...filters,
  },
  pagination: {
    ...state.pagination,
    page: 1,
  },
});

const updateSort = (state, { sort }) => ({
  ...state,
  sort: {
    ...state.sort,
    ...sort,
  },
  pagination: {
    ...state.pagination,
    page: 1,
  },
});

const updatePagination = (state, { pagination }) => ({
  ...state,
  pagination: {
    ...state.pagination,
    ...pagination,
  },
});

const updateActiveTab = (state, { tabKey }) => ({
  ...state,
  activeTab: tabKey,
  filters: INITIAL_STATE.filters,
  pagination: INITIAL_STATE.pagination,
  sort: INITIAL_STATE.sort,
});

const resetFilters = state => ({
  ...state,
  filters: INITIAL_STATE.filters,
  pagination: INITIAL_STATE.pagination,
  sort: INITIAL_STATE.sort,
});

const resetState = () => INITIAL_STATE;

const HANDLERS = {
  [Types.FETCH_WAREHOUSE_DETAIL_REQUEST]: fetchWarehouseDetailRequest,
  [Types.FETCH_WAREHOUSE_DETAIL_SUCCESS]: fetchWarehouseDetailSuccess,
  [Types.FETCH_WAREHOUSE_DETAIL_FAILURE]: fetchWarehouseDetailFailure,
  [Types.FETCH_PRODUCTS_REQUEST]: fetchProductsRequest,
  [Types.FETCH_PRODUCTS_SUCCESS]: fetchProductsSuccess,
  [Types.FETCH_PRODUCTS_FAILURE]: fetchProductsFailure,
  [Types.FETCH_DARK_STORES_REQUEST]: fetchDarkStoresRequest,
  [Types.FETCH_DARK_STORES_SUCCESS]: fetchDarkStoresSuccess,
  [Types.FETCH_DARK_STORES_FAILURE]: fetchDarkStoresFailure,
  [Types.FETCH_SUPPLIERS_REQUEST]: fetchSuppliersRequest,
  [Types.FETCH_SUPPLIERS_SUCCESS]: fetchSuppliersSuccess,
  [Types.FETCH_SUPPLIERS_FAILURE]: fetchSuppliersFailure,
  [Types.UPDATE_FILTERS]: updateFilters,
  [Types.UPDATE_SORT]: updateSort,
  [Types.UPDATE_PAGINATION]: updatePagination,
  [Types.UPDATE_ACTIVE_TAB]: updateActiveTab,
  [Types.RESET_FILTERS]: resetFilters,
  [Types.RESET_STATE]: resetState,
};

const reducer = createReducer(INITIAL_STATE, HANDLERS);

// Base selector
const getWarehouseDetailState = state => state?.[REDUX_STORE_KEYS.WAREHOUSE_DETAIL] || INITIAL_STATE;

// Memoized selectors
export const selectWarehouseId = createSelector(
  [getWarehouseDetailState],
  state => state.warehouseId,
);

export const selectWarehouseData = createSelector(
  [getWarehouseDetailState],
  state => state.data,
);

export const selectProducts = createSelector(
  [getWarehouseDetailState],
  state => state.products,
);

export const selectDarkStores = createSelector(
  [getWarehouseDetailState],
  state => state.darkStores,
);

export const selectSuppliers = createSelector(
  [getWarehouseDetailState],
  state => state.suppliers,
);

export const selectLoading = createSelector(
  [getWarehouseDetailState],
  state => state.loading,
);

export const selectError = createSelector(
  [getWarehouseDetailState],
  state => state.error,
);

export const selectActiveTab = createSelector(
  [getWarehouseDetailState],
  state => state.activeTab,
);

export const selectFilters = createSelector(
  [getWarehouseDetailState],
  state => state.filters,
);

export const selectPagination = createSelector(
  [getWarehouseDetailState],
  state => state.pagination,
);

export const selectSort = createSelector(
  [getWarehouseDetailState],
  state => state.sort,
);

// Derived selectors
export const selectIsDetailLoading = createSelector(
  [selectLoading],
  loading => loading.detail,
);

export const selectIsProductsLoading = createSelector(
  [selectLoading],
  loading => loading.products,
);

export const selectIsDarkStoresLoading = createSelector(
  [selectLoading],
  loading => loading.darkStores,
);

export const selectIsSuppliersLoading = createSelector(
  [selectLoading],
  loading => loading.suppliers,
);

export const selectHasActiveRequests = createSelector(
  [selectLoading],
  loading => loading.activeRequests > 0,
);

export const selectCurrentTabLoading = createSelector(
  [selectLoading, selectActiveTab],
  (loading, activeTab) => {
    switch (activeTab) {
      case WAREHOUSE_TABS.PRODUCTS:
        return loading.products;
      case WAREHOUSE_TABS.DARK_STORE:
        return loading.darkStores;
      case WAREHOUSE_TABS.SUPPLIERS:
        return loading.suppliers;
      default:
        return false;
    }
  },
);

export { reducer };
export default reducer;
