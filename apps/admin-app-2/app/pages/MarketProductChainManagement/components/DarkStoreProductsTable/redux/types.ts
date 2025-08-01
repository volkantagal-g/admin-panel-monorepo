import { AllEffect, CallEffect, ForkEffect, PutEffect, SelectEffect } from 'redux-saga/effects';

import { FilterOption, PaginationParams, Products, ProductsFilters, SortParams, TableParams } from '../types';

const PREFIX = 'marketProductChain/darkStoreProducts';

// Action Types
export const FETCH_PRODUCTS_REQUEST = `${PREFIX}/FETCH_PRODUCTS_REQUEST`;
export const FETCH_PRODUCTS_SUCCESS = `${PREFIX}/FETCH_PRODUCTS_SUCCESS`;
export const FETCH_PRODUCTS_FAILURE = `${PREFIX}/FETCH_PRODUCTS_FAILURE`;

export const FETCH_DOMAIN_TYPES_REQUEST = `${PREFIX}/FETCH_DOMAIN_TYPES_REQUEST`;
export const FETCH_DOMAIN_TYPES_SUCCESS = `${PREFIX}/FETCH_DOMAIN_TYPES_SUCCESS`;
export const FETCH_DOMAIN_TYPES_FAILURE = `${PREFIX}/FETCH_DOMAIN_TYPES_FAILURE`;

export const FETCH_DEMOGRAPHICS_REQUEST = `${PREFIX}/FETCH_DEMOGRAPHICS_REQUEST`;
export const FETCH_DEMOGRAPHICS_SUCCESS = `${PREFIX}/FETCH_DEMOGRAPHICS_SUCCESS`;
export const FETCH_DEMOGRAPHICS_FAILURE = `${PREFIX}/FETCH_DEMOGRAPHICS_FAILURE`;

export const UPDATE_FILTERS = `${PREFIX}/UPDATE_FILTERS`;
export const UPDATE_PAGINATION = `${PREFIX}/UPDATE_PAGINATION`;
export const UPDATE_SORT = `${PREFIX}/UPDATE_SORT`;

export const REFRESH_PRODUCTS_REQUEST = `${PREFIX}/REFRESH_PRODUCTS_REQUEST`;

export interface ProductsState {
  data: Products[];
  loading: boolean;
  error: Error | null;
  totalCount: number;
  filters: ProductsFilters;
  pagination: PaginationParams;
  sort?: SortParams;
  cities: FilterOption[];
  citiesLoading: boolean;
  regions: FilterOption[];
  regionsLoading: boolean;
  domainTypes: FilterOption[];
  domainTypesLoading: boolean;
  demographies: FilterOption[];
  demographiesLoading: boolean;
}

export type FetchProductsRequestPayload = TableParams;
export type FetchProductsSuccessPayload = { items: Products[]; totalCount: number };
export type FetchProductsFailurePayload = Error;

export type FetchDomainTypesRequestPayload = string;
export type FetchDomainTypesSuccessPayload = FilterOption[];
export type FetchDomainTypesFailurePayload = Error;

export type FetchDemographicsRequestPayload = string;
export type FetchDemographicsSuccessPayload = FilterOption[];
export type FetchDemographicsFailurePayload = Error;

export type UpdateFiltersPayload = Partial<ProductsFilters>;
export type UpdatePaginationPayload = PaginationParams;
export type UpdateSortPayload = SortParams;
export type RefreshProductsRequestPayload = TableParams | undefined;

export interface Action<T = any> {
  type: string;
  payload?: T;
}

export interface FetchProductsRequestAction extends Action<FetchProductsRequestPayload> {
  type: typeof FETCH_PRODUCTS_REQUEST;
}

export interface FetchProductsSuccessAction extends Action<FetchProductsSuccessPayload> {
  type: typeof FETCH_PRODUCTS_SUCCESS;
}

export interface FetchProductsFailureAction extends Action<FetchProductsFailurePayload> {
  type: typeof FETCH_PRODUCTS_FAILURE;
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

export interface FetchDemographicsRequestAction extends Action<FetchDemographicsRequestPayload> {
  type: typeof FETCH_DEMOGRAPHICS_REQUEST;
}

export interface FetchDemographicsSuccessAction extends Action<FetchDemographicsSuccessPayload> {
  type: typeof FETCH_DEMOGRAPHICS_SUCCESS;
}

export interface FetchDemographicsFailureAction extends Action<FetchDemographicsFailurePayload> {
  type: typeof FETCH_DEMOGRAPHICS_FAILURE;
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

export interface RefreshProductsRequestAction extends Action<RefreshProductsRequestPayload> {
  type: typeof REFRESH_PRODUCTS_REQUEST;
}

export type RequestFilter = {
  productName?: string;
  domainTypeVertexIds?: string[];
  demographyVertexIds?: string[];
};

export type RequestBody = {
  filter: RequestFilter;
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

export interface DemographyLookupResponse {
  id: string;
  demography: number;
  name: string;
}

export type DomainTypesResponse = {
  success: boolean;
  data: {
    domainTypes: DomainTypeLookupResponse[];
  };
};

export type DemographiesResponse = {
  success: boolean;
  data: {
    demographies: DemographyLookupResponse[];
  };
};

export type ProductsResponse = {
  success: boolean;
  data: {
    products: Array<{
      productVertexId: string;
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
export type FetchProductsSagaResult = SagaResult<void>;
export type CentralWarehouseTableSagaResult = SagaResult<void>;
