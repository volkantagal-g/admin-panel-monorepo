import { AllEffect, CallEffect, ForkEffect, PutEffect, SelectEffect } from 'redux-saga/effects';

import { CentralWarehouse, CentralWarehouseFilters, FilterOption, PaginationParams, SortParams, TableParams } from '../types';

const PREFIX = 'marketProductChain/darkStoreCentralWarehouses';

// Action Types
export const FETCH_CENTRAL_WAREHOUSES_REQUEST = `${PREFIX}/FETCH_CENTRAL_WAREHOUSES_REQUEST`;
export const FETCH_CENTRAL_WAREHOUSES_SUCCESS = `${PREFIX}/FETCH_CENTRAL_WAREHOUSES_SUCCESS`;
export const FETCH_CENTRAL_WAREHOUSES_FAILURE = `${PREFIX}/FETCH_CENTRAL_WAREHOUSES_FAILURE`;

export const FETCH_DOMAIN_TYPES_REQUEST = `${PREFIX}/FETCH_DOMAIN_TYPES_REQUEST`;
export const FETCH_DOMAIN_TYPES_SUCCESS = `${PREFIX}/FETCH_DOMAIN_TYPES_SUCCESS`;
export const FETCH_DOMAIN_TYPES_FAILURE = `${PREFIX}/FETCH_DOMAIN_TYPES_FAILURE`;

export const UPDATE_FILTERS = `${PREFIX}/UPDATE_FILTERS`;
export const UPDATE_PAGINATION = `${PREFIX}/UPDATE_PAGINATION`;
export const UPDATE_SORT = `${PREFIX}/UPDATE_SORT`;

export const REFRESH_CENTRAL_WAREHOUSES_REQUEST = `${PREFIX}/REFRESH_CENTRAL_WAREHOUSES_REQUEST`;

export interface CentralWarehouseState {
  data: CentralWarehouse[];
  loading: boolean;
  error: Error | null;
  totalCount: number;
  filters: CentralWarehouseFilters;
  pagination: PaginationParams;
  sort?: SortParams;
  cities: FilterOption[];
  citiesLoading: boolean;
  regions: FilterOption[];
  regionsLoading: boolean;
  domainTypes: FilterOption[];
  domainTypesLoading: boolean;
  domains: FilterOption[];
  demographies: FilterOption[];
  lookupsLoading: boolean;
}

export type FetchCentralWarehousesRequestPayload = TableParams;
export type FetchCentralWarehousesSuccessPayload = { items: CentralWarehouse[]; totalCount: number };
export type FetchCentralWarehousesFailurePayload = Error;

export type FetchDomainTypesRequestPayload = string;
export type FetchDomainTypesSuccessPayload = FilterOption[];
export type FetchDomainTypesFailurePayload = Error;

export type UpdateFiltersPayload = Partial<CentralWarehouseFilters>;
export type UpdatePaginationPayload = PaginationParams;
export type UpdateSortPayload = SortParams;
export type RefreshCentralWarehousesRequestPayload = TableParams | undefined;

export interface Action<T = any> {
  type: string;
  payload?: T;
}

export interface FetchCentralWarehousesRequestAction extends Action<FetchCentralWarehousesRequestPayload> {
  type: typeof FETCH_CENTRAL_WAREHOUSES_REQUEST;
}

export interface FetchCentralWarehousesSuccessAction extends Action<FetchCentralWarehousesSuccessPayload> {
  type: typeof FETCH_CENTRAL_WAREHOUSES_SUCCESS;
}

export interface FetchCentralWarehousesFailureAction extends Action<FetchCentralWarehousesFailurePayload> {
  type: typeof FETCH_CENTRAL_WAREHOUSES_FAILURE;
}

export interface FetchDomainTypesRequestAction extends Action<FetchDomainTypesRequestPayload> {
  type: typeof FETCH_DOMAIN_TYPES_REQUEST;
}

export interface FetchDomainTypesSuccessAction extends Action<FetchDomainTypesSuccessPayload> {
  type: typeof FETCH_DOMAIN_TYPES_SUCCESS;
}

export interface FetchDomainTypesFailureAction extends Action<FetchDomainTypesFailurePayload> {
  type: typeof FETCH_DOMAIN_TYPES_FAILURE;
}

export interface UpdateFiltersAction extends Action<UpdateFiltersPayload> {
  type: typeof UPDATE_FILTERS;
}

export interface UpdatePaginationAction extends Action<UpdatePaginationPayload> {
  type: typeof UPDATE_PAGINATION;
}

export interface UpdateSortAction extends Action<UpdateSortPayload> {
  type: typeof UPDATE_SORT;
}

export interface RefreshCentralWarehousesRequestAction extends Action<RefreshCentralWarehousesRequestPayload> {
  type: typeof REFRESH_CENTRAL_WAREHOUSES_REQUEST;
}

export type RequestFilter = {
  domainType?: string | number;
  demographyVertexIds?: string[];
};

export type RequestBody = {
  filter: RequestFilter;
  search?: string;
  pagination: {
    page: number;
    pageSize: number;
  };
  sort: {
    field: string;
    order: 'asc' | 'desc';
  };
};

export type DarkStoreRequestBody = RequestBody & {
  darkstoreVertexId: string;
};

export interface DomainTypeLookupResponse {
  id: string;
  domainType: number;
  name: string;
}

export interface CityLookupResponse {
  id: string;
  cityId: string;
  name: {
    tr: string;
    en: string;
  };
}

export interface DomainTypesResponse {
  success: boolean;
  data: {
    domainTypes: DomainTypeLookupResponse[];
  };
}

export type DemographiesResponse = {
  success: boolean;
  data: {
    demographies: Array<{
      id: string;
      demography: number;
    }>;
  };
};

export type CentralWarehousesResponse = {
  success: boolean;
  data: {
    centralWarehouses: Array<{
      centralWarehouseVertexId: string;
      name: Record<string, string>;
      domains: Array<{ domainType: number } | number>;
      demographies: Array<{ demography: number }>;
      sizes: Array<{ size: number }>;
      masterCategory?: { nameEN: string };
      segment?: number;
      local: boolean | null;
      state?: string;
    }>;
    totalCount: number;
  };
};

export type SagaEffect = CallEffect | PutEffect | SelectEffect | AllEffect<ForkEffect<never>>;
export type SagaResult<T> = Generator<SagaEffect, T, any>;

export type FetchDomainTypesSagaResult = SagaResult<void>;
export type FetchDemographiesSagaResult = SagaResult<Array<{ id: string; demography: number }>>;
export type FetchDomainTypesDataResult = SagaResult<Array<{ domainType: number; name: string }>>;
export type FetchCentralWarehousesSagaResult = SagaResult<void>;
export type CentralWarehouseTableSagaResult = SagaResult<void>;

export interface DomainWithName {
  domainType: number;
  name: string;
}

export interface CentralWarehouseResponse {
  centralWarehouseVertexId: string;
  name: string;
  domains: Array<{ domainType: number } | number>;
  city?: {
    nameEN: string;
  };
  region?: {
    nameEN: string;
  };
  masterCategoryCount?: number;
  productCount?: number;
  supplierCount?: number;
}

export interface CentralWarehouseData {
  id: string;
  name: string;
  domain: string;
  domainClasses: string[];
  city: string;
  region: string;
  categories: number;
  products: number;
  suppliers: number;
}
