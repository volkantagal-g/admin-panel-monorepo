import { createReducer } from 'reduxsauce';

import { Types } from './actions';

const INITIAL_STATE = {
  cities: [],
  centralWarehouses: [],
  darkStores: [],
  darkstoreMatchData: null,
  suppliers: [],
  products: [],
  categories: [],
  loading: {
    cities: false,
    centralWarehouses: false,
    darkStores: false,
    darkstoreMatch: false,
    suppliers: false,
    products: false,
    categories: false,
    productSearch: false,
  },
  error: null,
  filters: {},
};

const fetchCitiesRequest = state => ({
  ...state,
  loading: { ...state.loading, cities: true },
  error: null,
});

const fetchCitiesSuccess = (state, { cities }) => ({
  ...state,
  cities,
  loading: { ...state.loading, cities: false },
});

const fetchCitiesFailure = (state, { error }) => ({
  ...state,
  loading: { ...state.loading, cities: false },
  error,
});

const fetchSuppliersRequest = state => ({
  ...state,
  loading: { ...state.loading, suppliers: true },
  error: null,
});

const fetchSuppliersSuccess = (state, { suppliers }) => ({
  ...state,
  suppliers: suppliers || [],
  loading: { ...state.loading, suppliers: false },
});

const fetchSuppliersFailure = (state, { error }) => ({
  ...state,
  loading: { ...state.loading, suppliers: false },
  error,
});

const searchProductsRequest = state => ({
  ...state,
  loading: { ...state.loading, productSearch: true },
  error: null,
});

const searchProductsSuccess = (state, { products }) => {
  const newProducts = products || [];

  if (newProducts.length === 0) {
    return {
      ...state,
      products: [],
      loading: { ...state.loading, productSearch: false },
    };
  }

  const existingProducts = state.products || [];

  const normalizeProduct = product => ({
    ...product,
    value: product.value || product.productVertexId || product.id,
    productVertexId: product.productVertexId || product.value || product.id,
    label: product.label || product.name?.tr || product.name?.en || product.nameTR || product.nameEN,
  });

  const normalizedExisting = existingProducts.map(normalizeProduct);
  const mergedProducts = [...normalizedExisting];

  newProducts.forEach(newProduct => {
    const normalizedNewProduct = normalizeProduct(newProduct);
    const exists = normalizedExisting.some(existing => existing.value === normalizedNewProduct.value ||
      existing.productVertexId === normalizedNewProduct.productVertexId);
    if (!exists) {
      mergedProducts.push(normalizedNewProduct);
    }
  });

  return {
    ...state,
    products: mergedProducts,
    loading: { ...state.loading, productSearch: false },
  };
};

const searchProductsFailure = (state, { error }) => ({
  ...state,
  loading: { ...state.loading, productSearch: false },
  error,
});

const setProductSearchLoading = (state, { isLoading }) => ({
  ...state,
  loading: { ...state.loading, productSearch: isLoading },
});

const clearProductSearchResults = state => ({
  ...state,
  products: [],
});

const fetchCentralWarehousesForMatchRequest = state => ({
  ...state,
  loading: { ...state.loading, centralWarehouses: true },
  error: null,
});

const fetchCentralWarehousesForMatchSuccess = (state, { centralWarehouses }) => ({
  ...state,
  centralWarehouses,
  loading: { ...state.loading, centralWarehouses: false },
});

const fetchCentralWarehousesForMatchFailure = (state, { error }) => ({
  ...state,
  loading: { ...state.loading, centralWarehouses: false },
  error,
});

const fetchDarkStoreListRequest = state => ({
  ...state,
  loading: { ...state.loading, darkStores: true },
  error: null,
});

const fetchDarkStoreListSuccess = (state, { darkStores }) => ({
  ...state,
  darkStores,
  loading: { ...state.loading, darkStores: false },
});

const fetchDarkStoreListFailure = (state, { error }) => ({
  ...state,
  loading: { ...state.loading, darkStores: false },
  error,
});

const fetchDarkStoresMatchRequest = state => ({
  ...state,
  loading: { ...state.loading, darkstoreMatch: true },
  error: null,
});

const fetchDarkStoresMatchSuccess = (state, { data }) => ({
  ...state,
  darkstoreMatchData: data?.darkStores?.length > 0 ? data : null,
  loading: { ...state.loading, darkstoreMatch: false },
  error: null,
});

const fetchDarkStoresMatchFailure = (state, { error }) => ({
  ...state,
  darkstoreMatchData: null,
  loading: { ...state.loading, darkstoreMatch: false },
  error,
});

const updateFilters = (state, { filters }) => ({
  ...state,
  filters: { ...state.filters, ...filters },
});

const fetchMarketProductMasterCategoriesRequest = state => ({
  ...state,
  loading: { ...state.loading, categories: true },
  error: null,
});

const fetchMarketProductMasterCategoriesSuccess = (state, { categories }) => ({
  ...state,
  categories: {
    ...state.categories,
    ...categories,
  },
  loading: { ...state.loading, categories: false },
});

const fetchMarketProductMasterCategoriesFailure = (state, { error }) => ({
  ...state,
  loading: { ...state.loading, categories: false },
  error,
});

const fetchAllChildrenOfMasterCategoryRequest = state => ({
  ...state,
  loading: { ...state.loading, children: true },
  error: null,
});

const fetchAllChildrenOfMasterCategorySuccess = (state, { children }) => {
  if (!children) return state;

  // Get children from all levels
  const level2Children = children.level20Childs || [];
  const level3Children = children.level30Childs || [];
  const level4Children = children.level40Childs || [];

  // Format options for each level
  const formatChildren = childArray => childArray.map(child => ({
    value: child._id,
    label: child.name?.tr || child.name?.en || '',
  }));

  return {
    ...state,
    categories: {
      ...state.categories,
      level2: level2Children.length > 0 ? formatChildren(level2Children) : state.categories.level2 || [],
      level3: level3Children.length > 0 ? formatChildren(level3Children) : state.categories.level3 || [],
      level4: level4Children.length > 0 ? formatChildren(level4Children) : state.categories.level4 || [],
    },
    loading: {
      ...state.loading,
      children: false,
    },
  };
};

const fetchAllChildrenOfMasterCategoryFailure = (state, { error }) => ({
  ...state,
  loading: { ...state.loading, children: false },
  error,
});

const resetState = () => INITIAL_STATE;

const HANDLERS = {
  [Types.FETCH_CITIES_REQUEST]: fetchCitiesRequest,
  [Types.FETCH_CITIES_SUCCESS]: fetchCitiesSuccess,
  [Types.FETCH_CITIES_FAILURE]: fetchCitiesFailure,

  [Types.FETCH_SUPPLIERS_REQUEST]: fetchSuppliersRequest,
  [Types.FETCH_SUPPLIERS_SUCCESS]: fetchSuppliersSuccess,
  [Types.FETCH_SUPPLIERS_FAILURE]: fetchSuppliersFailure,

  [Types.SEARCH_PRODUCTS_REQUEST]: searchProductsRequest,
  [Types.SEARCH_PRODUCTS_SUCCESS]: searchProductsSuccess,
  [Types.SEARCH_PRODUCTS_FAILURE]: searchProductsFailure,
  [Types.SET_PRODUCT_SEARCH_LOADING]: setProductSearchLoading,
  [Types.CLEAR_PRODUCT_SEARCH_RESULTS]: clearProductSearchResults,

  [Types.FETCH_MARKET_PRODUCT_MASTER_CATEGORIES_REQUEST]: fetchMarketProductMasterCategoriesRequest,
  [Types.FETCH_MARKET_PRODUCT_MASTER_CATEGORIES_SUCCESS]: fetchMarketProductMasterCategoriesSuccess,
  [Types.FETCH_MARKET_PRODUCT_MASTER_CATEGORIES_FAILURE]: fetchMarketProductMasterCategoriesFailure,

  [Types.FETCH_ALL_CHILDREN_OF_MASTER_CATEGORY_REQUEST]: fetchAllChildrenOfMasterCategoryRequest,
  [Types.FETCH_ALL_CHILDREN_OF_MASTER_CATEGORY_SUCCESS]: fetchAllChildrenOfMasterCategorySuccess,
  [Types.FETCH_ALL_CHILDREN_OF_MASTER_CATEGORY_FAILURE]: fetchAllChildrenOfMasterCategoryFailure,

  [Types.FETCH_CENTRAL_WAREHOUSES_FOR_MATCH_REQUEST]: fetchCentralWarehousesForMatchRequest,
  [Types.FETCH_CENTRAL_WAREHOUSES_FOR_MATCH_SUCCESS]: fetchCentralWarehousesForMatchSuccess,
  [Types.FETCH_CENTRAL_WAREHOUSES_FOR_MATCH_FAILURE]: fetchCentralWarehousesForMatchFailure,

  [Types.FETCH_DARK_STORE_LIST_REQUEST]: fetchDarkStoreListRequest,
  [Types.FETCH_DARK_STORE_LIST_SUCCESS]: fetchDarkStoreListSuccess,
  [Types.FETCH_DARK_STORE_LIST_FAILURE]: fetchDarkStoreListFailure,

  [Types.FETCH_DARK_STORES_MATCH_REQUEST]: fetchDarkStoresMatchRequest,
  [Types.FETCH_DARK_STORES_MATCH_SUCCESS]: fetchDarkStoresMatchSuccess,
  [Types.FETCH_DARK_STORES_MATCH_FAILURE]: fetchDarkStoresMatchFailure,

  [Types.UPDATE_FILTERS]: updateFilters,
  [Types.RESET_STATE]: resetState,
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);
