import { AllEffect, CallEffect, ForkEffect, PutEffect, SelectEffect } from 'redux-saga/effects';

import { FilterOption, PaginationParams, SortParams, Supplier, SupplierFilters, TableParams } from '../types';

const PREFIX = 'marketProductChain/darkStoreCentralWarehouses';

// Action Types
export const FETCH_SUPPLIERS_REQUEST = `${PREFIX}/FETCH_SUPPLIERS_REQUEST`;
export const FETCH_SUPPLIERS_SUCCESS = `${PREFIX}/FETCH_SUPPLIERS_SUCCESS`;
export const FETCH_SUPPLIERS_FAILURE = `${PREFIX}/FETCH_SUPPLIERS_FAILURE`;

export const FETCH_DOMAIN_TYPES_REQUEST = `${PREFIX}/FETCH_DOMAIN_TYPES_REQUEST`;
export const FETCH_DOMAIN_TYPES_SUCCESS = `${PREFIX}/FETCH_DOMAIN_TYPES_SUCCESS`;
export const FETCH_DOMAIN_TYPES_FAILURE = `${PREFIX}/FETCH_DOMAIN_TYPES_FAILURE`;

export const UPDATE_FILTERS = `${PREFIX}/UPDATE_FILTERS`;
export const UPDATE_PAGINATION = `${PREFIX}/UPDATE_PAGINATION`;
export const UPDATE_SORT = `${PREFIX}/UPDATE_SORT`;

export const REFRESH_SUPPLIERS_REQUEST = `${PREFIX}/REFRESH_SUPPLIERS_REQUEST`;

export interface SupplierState {
  data: Supplier[];
  loading: boolean;
  error: Error | null;
  totalCount: number;
  filters: SupplierFilters;
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

export type FetchSuppliersRequestPayload = TableParams;
export type FetchSuppliersSuccessPayload = { items: Supplier[]; totalCount: number };
export type FetchSuppliersFailurePayload = Error;

export type FetchDomainTypesRequestPayload = string;
export type FetchDomainTypesSuccessPayload = FilterOption[];
export type FetchDomainTypesFailurePayload = Error;

export type UpdateFiltersPayload = Partial<SupplierFilters>;
export type UpdatePaginationPayload = PaginationParams;
export type UpdateSortPayload = SortParams;
export type RefreshSuppliersRequestPayload = TableParams | undefined;

export interface Action<T = any> {
  type: string;
  payload?: T;
}

export interface FetchSuppliersRequestAction extends Action<FetchSuppliersRequestPayload> {
  type: typeof FETCH_SUPPLIERS_REQUEST;
}

export interface FetchSuppliersSuccessAction extends Action<FetchSuppliersSuccessPayload> {
  type: typeof FETCH_SUPPLIERS_SUCCESS;
}

export interface FetchSuppliersFailureAction extends Action<FetchSuppliersFailurePayload> {
  type: typeof FETCH_SUPPLIERS_FAILURE;
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

export interface RefreshSuppliersRequestAction extends Action<RefreshSuppliersRequestPayload> {
  type: typeof REFRESH_SUPPLIERS_REQUEST;
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

export type SuppliersResponse = {
  success: boolean;
  data: {
    suppliers: Array<{
      supplierVertexId: string;
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
export type FetchSuppliersSagaResult = SagaResult<void>;
export type SupplierTableSagaResult = SagaResult<void>;

export interface DomainWithName {
  domainType: number;
  name: string;
}

export interface SupplierResponse {
  supplierVertexId: string;
  supplierId: string;
  name: string;
  type: string;
  masterCategoryCount?: number;
  productCount?: number;
  centralWarehouseCount?: number;
}

export interface SupplierData {
  id: string;
  name: string;
  type: string;
  categories: number;
  products: number;
  centralWarehouses: number;
}
