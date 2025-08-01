import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchProductsRequest: null,
  fetchProductsSuccess: ['productList', 'totalCount'],
  fetchProductsFailure: ['error'],

  updateFilters: ['filters'],
  updateSort: ['sort'],
  updatePagination: ['pagination'],
  updateFormValues: ['formValues'],
  resetFilters: null,

  // Component unmount olduğunda state'i temizlemek için yeni action
  clearProductsState: null,

  importProductsRequest: ['loadedFile'],
  importProductsSuccess: null,
  importProductsFailure: ['error'],

  exportProductsRequest: null,
  exportProductsSuccess: null,
  exportProductsFailure: ['error'],

  // Demography verilerini çekmek için action'lar
  fetchDemographiesRequest: null,
  fetchDemographiesSuccess: ['demographies'],
  fetchDemographiesFailure: ['error'],

  // Size verilerini çekmek için action'lar
  fetchSizesRequest: null,
  fetchSizesSuccess: ['sizes'],
  fetchSizesFailure: ['error'],

  // Domain Type verilerini çekmek için action'lar
  fetchDomainTypesRequest: null,
  fetchDomainTypesSuccess: ['domainTypes'],
  fetchDomainTypesFailure: ['error'],

  // Category verilerini çekmek için action'lar
  fetchCategoriesRequest: null,
  fetchCategoriesSuccess: ['categories'],
  fetchCategoriesFailure: ['error'],
});

export { Creators, Types };
