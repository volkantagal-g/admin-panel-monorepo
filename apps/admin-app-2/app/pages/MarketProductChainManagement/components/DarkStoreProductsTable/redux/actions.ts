import type { FilterOption, PaginationParams, Products, ProductsFilters, SortParams, TableParams } from '../types';
import {
  FETCH_DEMOGRAPHICS_FAILURE,
  FETCH_DEMOGRAPHICS_REQUEST,
  FETCH_DEMOGRAPHICS_SUCCESS,
  FETCH_DOMAIN_TYPES_FAILURE,
  FETCH_DOMAIN_TYPES_REQUEST,
  FETCH_DOMAIN_TYPES_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  REFRESH_PRODUCTS_REQUEST,
  UPDATE_FILTERS,
  UPDATE_PAGINATION,
  UPDATE_SORT,
} from './types';

export const fetchProductsRequest = (params: TableParams) => ({
  type: FETCH_PRODUCTS_REQUEST,
  payload: params,
});

export const fetchProductsSuccess = (items: Products[], totalCount: number) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { items, totalCount },
});

export const fetchProductsFailure = (error: Error) => ({
  type: FETCH_PRODUCTS_FAILURE,
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

export const fetchDemographicsRequest = (search: string) => ({
  type: FETCH_DEMOGRAPHICS_REQUEST,
  payload: search,
});

export const fetchDemographicsSuccess = (data: FilterOption[]) => ({
  type: FETCH_DEMOGRAPHICS_SUCCESS,
  payload: data,
});

export const fetchDemographicsFailure = (error: Error) => ({
  type: FETCH_DEMOGRAPHICS_FAILURE,
  payload: error,
});

export const updateFilters = (filters: Partial<ProductsFilters>) => ({
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

export const refreshProductsRequest = (payload?: any) => ({
  type: REFRESH_PRODUCTS_REQUEST,
  payload,
});
