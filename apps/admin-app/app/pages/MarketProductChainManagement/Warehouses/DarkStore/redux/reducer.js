import { createReducer } from 'reduxsauce';

import { DARKSTORE_TABS, REDUX_STORE_KEYS } from '@app/pages/MarketProductChainManagement/constants';
import { Types } from './actions';

const INITIAL_STATE = {
  darkStoreId: null,
  data: null,
  products: {
    data: [],
    totalCount: 0,
    isLoaded: false,
  },
  warehouses: {
    data: [],
    totalCount: 0,
    isLoaded: false,
  },
  suppliers: {
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
  activeTab: DARKSTORE_TABS.PRODUCTS,
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

const fetchDarkStoreDetailRequest = (state, { darkStoreId }) => ({
  ...state,
  darkStoreId,
  loading: { ...state.loading, fetch: true },
  error: null,
});

const fetchDarkStoreDetailSuccess = (state, { data }) => ({
  ...state,
  data,
  loading: { ...state.loading, fetch: false },
  error: null,
});

const fetchDarkStoreDetailFailure = (state, { error }) => ({
  ...state,
  loading: { ...state.loading, fetch: false },
  error,
});

const fetchProductsRequest = state => ({
  ...state,
  loading: {
    ...state.loading,
    products: true,
  },
  error: null,
});

const fetchProductsSuccess = (state, { products, totalCount }) => {
  return {
    ...state,
    products: {
      data: products.map(product => ({
        id: product.id,
        name: product.name.en,
      })),
      totalCount,
      isLoaded: true,
      count: totalCount,
    },
    loading: {
      ...state.loading,
      products: false,
    },
    error: null,
  };
};

const fetchProductsFailure = (state, { error }) => ({
  ...state,
  loading: {
    ...state.loading,
    products: false,
  },
  products: {
    ...state.products,
    isLoaded: false,
  },
  error,
});

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
  products: { ...INITIAL_STATE.products, isLoaded: false },
  suppliers: { ...INITIAL_STATE.suppliers, isLoaded: false },
  warehouses: { ...INITIAL_STATE.warehouses, isLoaded: false },
});

const HANDLERS = {
  [Types.FETCH_DARK_STORE_DETAIL_REQUEST]: fetchDarkStoreDetailRequest,
  [Types.FETCH_DARK_STORE_DETAIL_SUCCESS]: fetchDarkStoreDetailSuccess,
  [Types.FETCH_DARK_STORE_DETAIL_FAILURE]: fetchDarkStoreDetailFailure,
  [Types.FETCH_PRODUCTS_REQUEST]: fetchProductsRequest,
  [Types.FETCH_PRODUCTS_SUCCESS]: fetchProductsSuccess,
  [Types.FETCH_PRODUCTS_FAILURE]: fetchProductsFailure,
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

const getDarkStoreDetailState = state => state?.[REDUX_STORE_KEYS.DARK_STORE_DETAIL] || INITIAL_STATE;

export const selectDarkStoreId = state => getDarkStoreDetailState(state).darkStoreId;
export const selectDarkStoreData = state => getDarkStoreDetailState(state).data;
export const selectDarkStoreLoading = state => getDarkStoreDetailState(state).loading;
export const selectDarkStoreError = state => getDarkStoreDetailState(state).error;
export const selectActiveTab = state => getDarkStoreDetailState(state).activeTab;
export const selectFilters = state => getDarkStoreDetailState(state).filters;
export const selectPagination = state => getDarkStoreDetailState(state).pagination;
export const selectSort = state => getDarkStoreDetailState(state).sort;

export const selectProducts = state => {
  const { products } = getDarkStoreDetailState(state);
  return products;
};

export const selectSuppliers = state => getDarkStoreDetailState(state).suppliers;
export const selectWarehouses = state => getDarkStoreDetailState(state).warehouses;

export const selectCurrentTabData = state => {
  const productDetailState = getDarkStoreDetailState(state);
  const { activeTab } = productDetailState;

  switch (Number(activeTab)) {
    case DARKSTORE_TABS.PRODUCTS:
      return productDetailState.products;
    case DARKSTORE_TABS.CENTRAL_WAREHOUSE:
      return productDetailState.warehouses;
    case DARKSTORE_TABS.SUPPLIERS:
      return productDetailState.suppliers;
    default:
      return null;
  }
};

export const selectFormValues = state => ({
  filters: selectFilters(state),
  pagination: selectPagination(state),
  sort: selectSort(state),
});
