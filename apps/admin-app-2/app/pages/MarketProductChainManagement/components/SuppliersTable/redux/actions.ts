import {
  FETCH_SUPPLIERS_REQUEST,
  FETCH_SUPPLIERS_SUCCESS,
  FETCH_SUPPLIERS_FAILURE,
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAILURE,
  FETCH_REGIONS_REQUEST,
  FETCH_REGIONS_SUCCESS,
  FETCH_REGIONS_FAILURE,
  FETCH_DOMAIN_TYPES_REQUEST,
  FETCH_DOMAIN_TYPES_SUCCESS,
  FETCH_DOMAIN_TYPES_FAILURE,
  UPDATE_FILTERS,
  UPDATE_PAGINATION,
  UPDATE_SORT,
} from './types';
import type { Supplier, FilterOption, SupplierFilters, PaginationParams, SortParams, TableParams } from '../types';

// Suppliers Actions
export const fetchSuppliersRequest = (params: TableParams) => ({
  type: FETCH_SUPPLIERS_REQUEST,
  payload: params,
});

export const fetchSuppliersSuccess = (items: Supplier[], totalCount: number) => ({
  type: FETCH_SUPPLIERS_SUCCESS,
  payload: { items, totalCount },
});

export const fetchSuppliersFailure = (error: Error) => ({
  type: FETCH_SUPPLIERS_FAILURE,
  payload: error,
});

// Cities Actions
export const fetchCitiesRequest = (search: string) => ({
  type: FETCH_CITIES_REQUEST,
  payload: search,
});

export const fetchCitiesSuccess = (data: FilterOption[]) => ({
  type: FETCH_CITIES_SUCCESS,
  payload: data,
});

export const fetchCitiesFailure = (error: Error) => ({
  type: FETCH_CITIES_FAILURE,
  payload: error,
});

// Regions Actions
export const fetchRegionsRequest = (search: string) => ({
  type: FETCH_REGIONS_REQUEST,
  payload: search,
});

export const fetchRegionsSuccess = (data: FilterOption[]) => ({
  type: FETCH_REGIONS_SUCCESS,
  payload: data,
});

export const fetchRegionsFailure = (error: Error) => ({
  type: FETCH_REGIONS_FAILURE,
  payload: error,
});

// Domain Types Actions
export const fetchDomainTypesRequest = (search: string) => ({
  type: FETCH_DOMAIN_TYPES_REQUEST,
  payload: search,
});

export const fetchDomainTypesSuccess = (data: FilterOption[]) => ({
  type: FETCH_DOMAIN_TYPES_SUCCESS,
  payload: data,
});

export const fetchDomainTypesFailure = (error: Error) => ({
  type: FETCH_DOMAIN_TYPES_FAILURE,
  payload: error,
});

// Filter, Pagination, and Sort Actions
export const updateFilters = (filters: Partial<SupplierFilters>) => ({
  type: UPDATE_FILTERS,
  payload: filters,
});

export const updatePagination = (pagination: PaginationParams) => ({
  type: UPDATE_PAGINATION,
  payload: pagination,
});

export const updateSort = (sort: SortParams) => ({
  type: UPDATE_SORT,
  payload: sort,
});
