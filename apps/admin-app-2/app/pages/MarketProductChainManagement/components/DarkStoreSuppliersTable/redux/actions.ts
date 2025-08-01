import type { FilterOption, PaginationParams, SortParams, Supplier, SupplierFilters, TableParams } from '../types';
import { ACTION_TYPES } from './constants';

const {
  FETCH_SUPPLIERS_REQUEST,
  FETCH_SUPPLIERS_SUCCESS,
  FETCH_SUPPLIERS_FAILURE,
  FETCH_DOMAIN_TYPES_REQUEST,
  FETCH_DOMAIN_TYPES_SUCCESS,
  FETCH_DOMAIN_TYPES_FAILURE,
  FETCH_DEMOGRAPHIES_REQUEST,
  FETCH_DEMOGRAPHIES_SUCCESS,
  FETCH_DEMOGRAPHIES_FAILURE,
  UPDATE_FILTERS,
  UPDATE_PAGINATION,
  UPDATE_SORT,
} = ACTION_TYPES;

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

export const fetchDemographiesRequest = (search: string) => ({
  type: FETCH_DEMOGRAPHIES_REQUEST,
  payload: search,
});

export const fetchDemographiesSuccess = (data: FilterOption[]) => ({
  type: FETCH_DEMOGRAPHIES_SUCCESS,
  payload: data,
});

export const fetchDemographiesFailure = (error: Error) => ({
  type: FETCH_DEMOGRAPHIES_FAILURE,
  payload: error,
});

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

export const fetchCitiesRequest = (search: string) => ({
  type: ACTION_TYPES.FETCH_CITIES_REQUEST,
  payload: search,
});

export const fetchCitiesSuccess = (data: FilterOption[]) => ({
  type: ACTION_TYPES.FETCH_CITIES_SUCCESS,
  payload: data,
});

export const fetchCitiesFailure = (error: Error) => ({
  type: ACTION_TYPES.FETCH_CITIES_FAILURE,
  payload: error,
});
