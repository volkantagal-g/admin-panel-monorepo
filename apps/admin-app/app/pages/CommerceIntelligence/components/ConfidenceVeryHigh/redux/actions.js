import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  // Level 3 Categories
  fetchLevel3CategoriesRequest: null,
  fetchLevel3CategoriesSuccess: ['data'],
  fetchLevel3CategoriesFailure: ['error'],

  // Level 4 Sub Categories
  fetchLevel4CategoriesRequest: ['l3CategoryIds'],
  fetchLevel4CategoriesSuccess: ['data'],
  fetchLevel4CategoriesFailure: ['error'],

  // Filters
  updateFilters: ['filters'],
  resetState: null,

  // Bulk Actions
  bulkDeleteMatches: null,
  bulkDirectMatch: null,
});

export { Creators, Types };
