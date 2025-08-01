import { createReducer } from 'reduxsauce';
import { createSelector } from 'reselect';

import { REDUX_STORE_KEYS, WAREHOUSE_TABS } from '@app/pages/MarketProductChainManagement/constants';
import { Types } from './actions';

const INITIAL_STATE = {
  data: {
    centralWarehouses: [],
    darkStores: [],
    totalCount: 0,
    darkStoresTotal: 0,
  },
  loading: {
    fetch: false,
    darkStores: false,
    centralWarehouses: false,
    importCentralWarehouses: false,
    importDarkStores: false,
    activeRequests: 0,
  },
  error: null,
  filters: {},
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
  },
  sort: { field: 'name', order: 'asc' },
  activeTab: WAREHOUSE_TABS.CENTRAL_WAREHOUSE,
};

const createError = (error, type = 'API') => ({
  message: error?.message || 'An error occurred',
  code: error?.code || 'UNKNOWN_ERROR',
  type,
  details: error,
  timestamp: Date.now(),
});

const fetchCentralWarehousesRequest = state => ({
  ...state,
  loading: {
    ...state.loading,
    centralWarehouses: true,
    activeRequests: state.loading.activeRequests + 1,
  },
  error: null,
});

const fetchCentralWarehousesSuccess = (state, { centralWarehouses, totalCount }) => ({
  ...state,
  data: {
    ...state.data,
    centralWarehouses,
    totalCount,
  },
  pagination: {
    ...state.pagination,
    total: totalCount,
  },
  loading: {
    ...state.loading,
    centralWarehouses: false,
    activeRequests: state.loading.activeRequests - 1,
  },
  error: null,
});

const fetchCentralWarehousesFailure = (state, { error }) => ({
  ...state,
  loading: {
    ...state.loading,
    centralWarehouses: false,
    activeRequests: Math.max(0, state.loading.activeRequests - 1),
  },
  error: createError(error),
});

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
  data: {
    ...state.data,
    darkStores,
    darkStoresTotal: totalCount,
  },
  pagination: {
    ...state.pagination,
    total: totalCount,
  },
  loading: {
    ...state.loading,
    darkStores: false,
    activeRequests: state.loading.activeRequests - 1,
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

const importCentralWarehousesRequest = state => ({
  ...state,
  loading: {
    ...state.loading,
    importCentralWarehouses: true,
    activeRequests: state.loading.activeRequests + 1,
  },
  error: null,
});

const importCentralWarehousesSuccess = state => ({
  ...state,
  loading: {
    ...state.loading,
    importCentralWarehouses: false,
    activeRequests: state.loading.activeRequests - 1,
  },
  error: null,
});

const importCentralWarehousesFailure = (state, { error }) => ({
  ...state,
  loading: {
    ...state.loading,
    importCentralWarehouses: false,
    activeRequests: Math.max(0, state.loading.activeRequests - 1),
  },
  error: createError(error),
});

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

const resetFilters = () => ({
  ...INITIAL_STATE,
  loading: {
    ...INITIAL_STATE.loading,
    activeRequests: 0,
  },
});

const updateActiveTab = (state, { tabKey }) => ({
  ...state,
  activeTab: tabKey,
  filters: INITIAL_STATE.filters,
  pagination: INITIAL_STATE.pagination,
  sort: INITIAL_STATE.sort,
});

const resetState = () => ({ ...INITIAL_STATE });

const HANDLERS = {
  [Types.FETCH_CENTRAL_WAREHOUSES_REQUEST]: fetchCentralWarehousesRequest,
  [Types.FETCH_CENTRAL_WAREHOUSES_SUCCESS]: fetchCentralWarehousesSuccess,
  [Types.FETCH_CENTRAL_WAREHOUSES_FAILURE]: fetchCentralWarehousesFailure,
  [Types.FETCH_DARK_STORES_REQUEST]: fetchDarkStoresRequest,
  [Types.FETCH_DARK_STORES_SUCCESS]: fetchDarkStoresSuccess,
  [Types.FETCH_DARK_STORES_FAILURE]: fetchDarkStoresFailure,
  [Types.IMPORT_CENTRAL_WAREHOUSES_REQUEST]: importCentralWarehousesRequest,
  [Types.IMPORT_CENTRAL_WAREHOUSES_SUCCESS]: importCentralWarehousesSuccess,
  [Types.IMPORT_CENTRAL_WAREHOUSES_FAILURE]: importCentralWarehousesFailure,
  [Types.UPDATE_FILTERS]: updateFilters,
  [Types.UPDATE_SORT]: updateSort,
  [Types.UPDATE_PAGINATION]: updatePagination,
  [Types.UPDATE_ACTIVE_TAB]: updateActiveTab,
  [Types.RESET_FILTERS]: resetFilters,
  [Types.RESET_STATE]: resetState,
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);

// Base selector
const getWarehousesState = state => state?.[REDUX_STORE_KEYS.CENTRAL_WAREHOUSES] || INITIAL_STATE;

// Memoized selectors
export const selectWarehousesData = createSelector(
  [getWarehousesState],
  state => state.data,
);

export const selectCentralWarehouses = createSelector(
  [selectWarehousesData],
  data => data.centralWarehouses,
);

export const selectDarkStores = createSelector(
  [selectWarehousesData],
  data => data.darkStores,
);

export const selectTotalCount = createSelector(
  [selectWarehousesData],
  data => data.totalCount,
);

export const selectDarkStoresTotalCount = createSelector(
  [selectWarehousesData],
  data => data.darkStoresTotal,
);

export const selectWarehousesLoading = createSelector(
  [getWarehousesState],
  state => state.loading,
);

export const selectWarehousesError = createSelector(
  [getWarehousesState],
  state => state.error,
);

export const selectWarehousesFilters = createSelector(
  [getWarehousesState],
  state => state.filters,
);

export const selectWarehousesPagination = createSelector(
  [getWarehousesState],
  state => state.pagination,
);

export const selectWarehousesSort = createSelector(
  [getWarehousesState],
  state => state.sort,
);

// Derived selectors
export const selectIsWarehousesLoading = createSelector(
  [selectWarehousesLoading],
  loading => loading.centralWarehouses || loading.darkStores || loading.activeRequests > 0,
);

export const selectIsCentralWarehousesLoading = createSelector(
  [selectWarehousesLoading],
  loading => loading.centralWarehouses,
);

export const selectIsDarkStoresLoading = createSelector(
  [selectWarehousesLoading],
  loading => loading.darkStores,
);

export const selectHasActiveRequests = createSelector(
  [selectWarehousesLoading],
  loading => loading.activeRequests > 0,
);

export const selectHasWarehousesError = createSelector(
  [selectWarehousesError],
  error => error !== null,
);

export const selectWarehousesCurrentPage = createSelector(
  [selectWarehousesPagination],
  pagination => pagination.page,
);

export const selectWarehousesPageSize = createSelector(
  [selectWarehousesPagination],
  pagination => pagination.pageSize,
);

export const selectTotalPages = createSelector(
  [selectTotalCount, selectWarehousesPageSize],
  (total, pageSize) => Math.ceil(total / pageSize),
);

export const selectIsFirstPage = createSelector(
  [selectWarehousesCurrentPage],
  currentPage => currentPage === 1,
);

export const selectIsLastPage = createSelector(
  [selectWarehousesCurrentPage, selectTotalPages],
  (currentPage, totalPages) => currentPage === totalPages,
);

export const selectSortField = createSelector(
  [selectWarehousesSort],
  sort => sort.field,
);

export const selectSortOrder = createSelector(
  [selectWarehousesSort],
  sort => sort.order,
);

export const selectHasFilters = createSelector(
  [selectWarehousesFilters],
  filters => Object.keys(filters).length > 0,
);

export const selectActiveTab = createSelector(
  [getWarehousesState],
  state => state.activeTab,
);
