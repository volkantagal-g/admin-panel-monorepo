import { createReducer } from 'reduxsauce';
import { createSelector } from 'reselect';

import { REDUX_STORE_KEYS } from '@app/pages/MarketProductChainManagement/constants';
import { Types } from './actions';

/**
 * @typedef {Object} LoadingState
 * @property {boolean} fetch - Fetch loading state
 * @property {boolean} export - Export loading state
 * @property {boolean} import - Import loading state
 * @property {number} activeRequests - Number of active requests
 */

/**
 * @typedef {Object} ErrorState
 * @property {string} message - Error message
 * @property {string} code - Error code
 * @property {string} type - Error type (e.g., 'API', 'VALIDATION', 'NETWORK')
 * @property {Object} details - Additional error details
 * @property {number} timestamp - Error timestamp
 */

/**
 * @typedef {Object} Product
 * @property {string} productVertexId - Unique vertex ID of the product
 * @property {string} productId - MongoDB ID of the product
 * @property {Object} name - Product name in different languages
 * @property {string} name.tr - Turkish name
 * @property {string} name.en - English name
 * @property {number[]} domainTypes - Array of domain type IDs
 * @property {number[]} demographies - Array of demography IDs
 * @property {number[]} sizes - Array of size IDs
 * @property {Object} category - Product category in different languages
 * @property {string} category.tr - Turkish category name
 * @property {string} category.en - English category name
 * @property {number} segment - Segment ID
 * @property {number} darkstoreCount - Number of darkstores
 * @property {number} supplierCount - Number of suppliers
 * @property {number} chainCount - Number of chains
 */

/**
 * @typedef {Object} ProductsState
 * @property {Product[]} data - List of products
 * @property {LoadingState} loading - Loading states
 * @property {ErrorState|null} error - Error state
 * @property {Object} filters - Filter values
 * @property {Object} pagination - Pagination state
 * @property {number} pagination.page - Current page number
 * @property {number} pagination.pageSize - Number of items per page
 * @property {number} pagination.total - Total number of items
 * @property {Object} sort - Sort state
 * @property {string} sort.field - Field to sort by
 * @property {('asc'|'desc')} sort.order - Sort order
 */

/** @type {ProductsState} */
const INITIAL_STATE = {
  data: [],
  loading: {
    fetch: false,
    export: false,
    import: false,
    activeRequests: 0,
  },
  error: null,
  filters: {
    search: '',
    category: null,
    segment: null,
    domain: null,
    size: null,
    demography: null,
    isLocal: undefined,
  },
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
  },
  sort: {
    field: 'updatedAt',
    order: 'desc',
  },
  importProducts: {
    loading: false,
    error: null,
  },
  exportProducts: {
    loading: false,
    error: null,
  },
  demographies: [],
  demographiesLoading: false,
  demographiesError: null,
  sizes: [],
  sizesLoading: false,
  sizesError: null,
  domainTypes: [],
  domainTypesLoading: false,
  domainTypesError: null,
  categories: [],
  categoriesLoading: false,
  categoriesError: null,
};

const fetchProductsRequest = state => ({
  ...state,
  loading: {
    ...state.loading,
    fetch: true,
  },
  error: null,
});

const fetchProductsSuccess = (state, { productList, totalCount }) => ({
  ...state,
  data: productList,
  pagination: {
    ...state.pagination,
    total: totalCount,
  },
  loading: {
    ...state.loading,
    fetch: false,
  },
  error: null,
});

const fetchProductsFailure = (state, { error }) => ({
  ...state,
  loading: {
    ...state.loading,
    fetch: false,
  },
  error,
});

const updateFilters = (state, { filters }) => {
  // Create a new filters object by starting fresh
  // This ensures removed filter keys are completely gone from state
  const cleanedFilters = {};

  // Process all keys from the input filters
  Object.entries(filters).forEach(([key, value]) => {
    // Only include values that are defined, non-null, and non-empty strings
    if (value !== undefined && value !== null && value !== '') {
      // Special handling for isLocal checkbox
      if (key === 'isLocal' && value !== true) {
        return; // Skip this key if isLocal is not true
      }

      cleanedFilters[key] = value;
    }
  });

  return {
    ...state,
    filters: cleanedFilters, // Replace entire filters object
    pagination: {
      ...state.pagination,
      page: 1,
    },
  };
};

const updateSort = (state, { sort }) => ({
  ...state,
  sort,
  pagination: {
    ...state.pagination,
    page: 1,
  },
});

const updatePagination = (state, { pagination }) => {
  // Burada API'den gelen pagination değerlerini state'e uyguluyoruz
  return {
    ...state,
    pagination: {
      ...state.pagination,
      ...pagination,
    },
  };
};

const updateFormValues = (state, { formValues }) => {
  let newState = { ...state };

  // Filtreleri güncelle (varsa)
  if (formValues.filters) {
    // Temiz bir filtre objesi oluştur
    const cleanedFilters = {};

    // Tüm filtre değerlerini işle
    Object.entries(formValues.filters).forEach(([key, value]) => {
      // Sadece tanımlı, null olmayan ve boş string olmayan değerleri dahil et
      if (value !== undefined && value !== null && value !== '') {
        // isLocal için özel işleme
        if (key === 'isLocal' && value !== true) {
          return; // isLocal true değilse bu anahtarı atla
        }

        cleanedFilters[key] = value;
      }
    });

    // Filtreleri güncelle
    newState = {
      ...newState,
      filters: cleanedFilters,
      // Filtre değiştiğinde sayfa 1'e dön
      pagination: {
        ...newState.pagination,
        page: 1,
      },
    };
  }

  // Sıralamayı güncelle (varsa)
  if (formValues.sort) {
    newState = {
      ...newState,
      sort: formValues.sort,
    };
  }

  // Sayfalamayı güncelle (varsa, ancak filtre değişikliği varsa sayfa 1'e dönmüş olabilir)
  if (formValues.pagination && !formValues.filters) {
    newState = {
      ...newState,
      pagination: {
        ...newState.pagination,
        ...formValues.pagination,
      },
    };
  }

  return newState;
};

const resetFilters = state => ({
  ...state,
  filters: INITIAL_STATE.filters,
  pagination: {
    ...INITIAL_STATE.pagination,
    total: state.pagination.total,
  },
  sort: INITIAL_STATE.sort,
});

// Komponent unmount olduğunda state'i temizlemek için yeni reducer
const clearProductsState = () => ({ ...INITIAL_STATE });

const fetchDemographiesRequest = state => ({
  ...state,
  demographiesLoading: true,
  demographiesError: null,
});

const fetchDemographiesSuccess = (state, { demographies }) => ({
  ...state,
  demographies,
  demographiesLoading: false,
});

const fetchDemographiesFailure = (state, { error }) => ({
  ...state,
  demographiesLoading: false,
  demographiesError: error,
});

const fetchSizesRequest = state => ({
  ...state,
  sizesLoading: true,
  sizesError: null,
});

const fetchSizesSuccess = (state, { sizes }) => ({
  ...state,
  sizes,
  sizesLoading: false,
});

const fetchSizesFailure = (state, { error }) => ({
  ...state,
  sizesLoading: false,
  sizesError: error,
});

const fetchDomainTypesRequest = state => ({
  ...state,
  domainTypesLoading: true,
  domainTypesError: null,
});

const fetchDomainTypesSuccess = (state, { domainTypes }) => ({
  ...state,
  domainTypes,
  domainTypesLoading: false,
});

const fetchDomainTypesFailure = (state, { error }) => ({
  ...state,
  domainTypesLoading: false,
  domainTypesError: error,
});

const fetchCategoriesRequest = state => ({
  ...state,
  categoriesLoading: true,
  categoriesError: null,
});

const fetchCategoriesSuccess = (state, { categories }) => ({
  ...state,
  categories,
  categoriesLoading: false,
});

const fetchCategoriesFailure = (state, { error }) => ({
  ...state,
  categoriesLoading: false,
  categoriesError: error,
});

const importProductsRequest = state => ({
  ...state,
  importProducts: {
    loading: true,
    error: null,
  },
});

const importProductsSuccess = state => ({
  ...state,
  importProducts: {
    loading: false,
    error: null,
  },
});

const importProductsFailure = (state, { error }) => ({
  ...state,
  importProducts: {
    loading: false,
    error,
  },
});

const exportProductsRequest = state => ({
  ...state,
  exportProducts: {
    loading: true,
    error: null,
  },
});

const exportProductsSuccess = state => ({
  ...state,
  exportProducts: {
    loading: false,
    error: null,
  },
});

const exportProductsFailure = (state, { error }) => ({
  ...state,
  exportProducts: {
    loading: false,
    error,
  },
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_PRODUCTS_REQUEST]: fetchProductsRequest,
  [Types.FETCH_PRODUCTS_SUCCESS]: fetchProductsSuccess,
  [Types.FETCH_PRODUCTS_FAILURE]: fetchProductsFailure,
  [Types.UPDATE_FILTERS]: updateFilters,
  [Types.UPDATE_SORT]: updateSort,
  [Types.UPDATE_PAGINATION]: updatePagination,
  [Types.UPDATE_FORM_VALUES]: updateFormValues,
  [Types.RESET_FILTERS]: resetFilters,
  [Types.CLEAR_PRODUCTS_STATE]: clearProductsState,
  [Types.FETCH_DEMOGRAPHIES_REQUEST]: fetchDemographiesRequest,
  [Types.FETCH_DEMOGRAPHIES_SUCCESS]: fetchDemographiesSuccess,
  [Types.FETCH_DEMOGRAPHIES_FAILURE]: fetchDemographiesFailure,
  [Types.FETCH_SIZES_REQUEST]: fetchSizesRequest,
  [Types.FETCH_SIZES_SUCCESS]: fetchSizesSuccess,
  [Types.FETCH_SIZES_FAILURE]: fetchSizesFailure,
  [Types.FETCH_DOMAIN_TYPES_REQUEST]: fetchDomainTypesRequest,
  [Types.FETCH_DOMAIN_TYPES_SUCCESS]: fetchDomainTypesSuccess,
  [Types.FETCH_DOMAIN_TYPES_FAILURE]: fetchDomainTypesFailure,
  [Types.FETCH_CATEGORIES_REQUEST]: fetchCategoriesRequest,
  [Types.FETCH_CATEGORIES_SUCCESS]: fetchCategoriesSuccess,
  [Types.FETCH_CATEGORIES_FAILURE]: fetchCategoriesFailure,
  [Types.IMPORT_PRODUCTS_REQUEST]: importProductsRequest,
  [Types.IMPORT_PRODUCTS_SUCCESS]: importProductsSuccess,
  [Types.IMPORT_PRODUCTS_FAILURE]: importProductsFailure,
  [Types.EXPORT_PRODUCTS_REQUEST]: exportProductsRequest,
  [Types.EXPORT_PRODUCTS_SUCCESS]: exportProductsSuccess,
  [Types.EXPORT_PRODUCTS_FAILURE]: exportProductsFailure,
});

// Base selector
const getProductsState = state => state?.[REDUX_STORE_KEYS.PRODUCTS] || INITIAL_STATE;

// Memoized selectors
export const selectProductsData = createSelector(
  [getProductsState],
  state => state.data || [],
);

export const selectIsProductsLoading = createSelector(
  [getProductsState],
  state => state.loading.fetch,
);

export const selectProductsError = createSelector(
  [getProductsState],
  state => state.error,
);

export const selectProductsFilters = createSelector(
  [getProductsState],
  state => state.filters,
);

export const selectProductsPagination = createSelector(
  [getProductsState],
  state => state.pagination,
);

export const selectProductsSort = createSelector(
  [getProductsState],
  state => state.sort,
);

export const selectProductsCurrentPage = createSelector(
  [selectProductsPagination],
  pagination => pagination.page,
);

export const selectProductsPageSize = createSelector(
  [selectProductsPagination],
  pagination => pagination.pageSize,
);

export const selectTotalPages = createSelector(
  [selectProductsPagination],
  pagination => {
    const total = pagination.total || 0;
    const pageSize = pagination.pageSize || 10;
    return Math.ceil(total / pageSize);
  },
);

export const selectHasFilters = createSelector(
  [selectProductsFilters],
  filters => Object.keys(filters).length > 0,
);

export const selectDemographies = createSelector(
  [getProductsState],
  state => state.demographies,
);

export const selectDemographiesLoading = createSelector(
  [getProductsState],
  state => state.demographiesLoading,
);

export const selectDemographiesError = createSelector(
  [getProductsState],
  state => state.demographiesError,
);

export const selectSizes = createSelector(
  [getProductsState],
  state => state.sizes,
);

export const selectSizesLoading = createSelector(
  [getProductsState],
  state => state.sizesLoading,
);

export const selectSizesError = createSelector(
  [getProductsState],
  state => state.sizesError,
);

export const selectDomainTypes = createSelector(
  [getProductsState],
  state => state.domainTypes,
);

export const selectDomainTypesLoading = createSelector(
  [getProductsState],
  state => state.domainTypesLoading,
);

export const selectDomainTypesError = createSelector(
  [getProductsState],
  state => state.domainTypesError,
);

export const selectCategories = createSelector(
  [getProductsState],
  state => state.categories || [],
);

export const selectCategoriesLoading = createSelector(
  [getProductsState],
  state => state.categoriesLoading,
);

export const selectCategoriesError = createSelector(
  [getProductsState],
  state => state.categoriesError,
);
