import { CentralWarehouseFilters, PaginationParams, SortParams } from '../types';
import * as types from './types';

// Central Warehouses
export const fetchCentralWarehousesRequest = (params?: {
  productId?: string;
  filters?: CentralWarehouseFilters;
  pagination?: PaginationParams;
  sort?: SortParams;
}) => ({
  type: types.FETCH_CENTRAL_WAREHOUSES_REQUEST,
  payload: params,
});

export const fetchCentralWarehousesSuccess = (centralWarehouses: any[], totalCount: number) => ({
  type: types.FETCH_CENTRAL_WAREHOUSES_SUCCESS,
  payload: { centralWarehouses, totalCount },
});

export const fetchCentralWarehousesFailure = (error: Error) => ({
  type: types.FETCH_CENTRAL_WAREHOUSES_FAILURE,
  payload: { error },
});

// Cities
export const fetchCitiesRequest = (search?: string) => ({
  type: types.FETCH_CITIES_REQUEST,
  payload: { search },
});

export const fetchCitiesSuccess = (cities: any[]) => ({
  type: types.FETCH_CITIES_SUCCESS,
  payload: { cities },
});

export const fetchCitiesFailure = (error: Error) => ({
  type: types.FETCH_CITIES_FAILURE,
  payload: { error },
});

// Regions
export const fetchRegionsRequest = (search?: string) => ({
  type: types.FETCH_REGIONS_REQUEST,
  payload: { search },
});

export const fetchRegionsSuccess = (regions: any[]) => ({
  type: types.FETCH_REGIONS_SUCCESS,
  payload: { regions },
});

export const fetchRegionsFailure = (error: Error) => ({
  type: types.FETCH_REGIONS_FAILURE,
  payload: { error },
});

// Domain Types
export const fetchDomainTypesRequest = () => ({ type: types.FETCH_DOMAIN_TYPES_REQUEST });

export const fetchDomainTypesSuccess = (domainTypes: any[]) => ({
  type: types.FETCH_DOMAIN_TYPES_SUCCESS,
  payload: { domainTypes },
});

export const fetchDomainTypesFailure = (error: Error) => ({
  type: types.FETCH_DOMAIN_TYPES_FAILURE,
  payload: { error },
});

// UI State
export const updateFilters = (filters: Partial<CentralWarehouseFilters>) => ({
  type: types.UPDATE_FILTERS,
  payload: { filters },
});

export const updatePagination = (pagination: PaginationParams) => ({
  type: types.UPDATE_PAGINATION,
  payload: { pagination },
});

export const updateSort = (sort: SortParams) => ({
  type: types.UPDATE_SORT,
  payload: { sort },
});
