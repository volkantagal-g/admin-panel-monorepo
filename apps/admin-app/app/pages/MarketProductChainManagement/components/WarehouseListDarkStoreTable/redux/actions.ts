import {
  FETCH_DARK_STORES_REQUEST,
  FETCH_DARK_STORES_SUCCESS,
  FETCH_DARK_STORES_FAILURE,
  FETCH_LOOKUPS_REQUEST,
  FETCH_LOOKUPS_SUCCESS,
  FETCH_LOOKUPS_FAILURE,
} from './constants';
import type {
  DarkStore,
  DarkStoreFilters,
  TablePagination,
  TableSort,
  FetchDarkStoresRequestPayload,
  FetchDarkStoresSuccessPayload,
  FetchLookupsSuccessPayload,
} from './types';
import type { TableParams } from '../types';

const PREFIX = 'marketProductChain/warehouseListDarkStoreTable';

export const WAREHOUSE_LIST_DARK_STORE_TABLE_ACTIONS = {
  FETCH_DARK_STORES_REQUEST: `${PREFIX}/FETCH_DARK_STORES_REQUEST`,
  FETCH_DARK_STORES_SUCCESS: `${PREFIX}/FETCH_DARK_STORES_SUCCESS`,
  FETCH_DARK_STORES_FAILURE: `${PREFIX}/FETCH_DARK_STORES_FAILURE`,

  FETCH_LOOKUPS_REQUEST: `${PREFIX}/FETCH_LOOKUPS_REQUEST`,
  FETCH_LOOKUPS_SUCCESS: `${PREFIX}/FETCH_LOOKUPS_SUCCESS`,
  FETCH_LOOKUPS_FAILURE: `${PREFIX}/FETCH_LOOKUPS_FAILURE`,

  SET_FILTERS: `${PREFIX}/SET_FILTERS`,
  SET_PAGINATION: `${PREFIX}/SET_PAGINATION`,
  SET_SORT: `${PREFIX}/SET_SORT`,
} as const;

// Dark stores actions
export const fetchDarkStoresRequest = (payload: FetchDarkStoresRequestPayload) => ({
  type: FETCH_DARK_STORES_REQUEST,
  payload,
});

export const fetchDarkStoresSuccess = (payload: FetchDarkStoresSuccessPayload) => ({
  type: FETCH_DARK_STORES_SUCCESS,
  payload,
});

export const fetchDarkStoresFailure = (error: Error) => ({
  type: FETCH_DARK_STORES_FAILURE,
  payload: error,
});

// Lookups actions
export const fetchLookupsRequest = () => ({ type: FETCH_LOOKUPS_REQUEST });

export const fetchLookupsSuccess = (payload: FetchLookupsSuccessPayload) => ({
  type: FETCH_LOOKUPS_SUCCESS,
  payload,
});

export const fetchLookupsFailure = (error: Error) => ({
  type: FETCH_LOOKUPS_FAILURE,
  payload: error,
});

export const setFilters = (payload: any) => ({
  type: WAREHOUSE_LIST_DARK_STORE_TABLE_ACTIONS.SET_FILTERS,
  payload,
});

export const setPagination = (payload: any) => ({
  type: WAREHOUSE_LIST_DARK_STORE_TABLE_ACTIONS.SET_PAGINATION,
  payload,
});

export const setSort = (payload: any) => ({
  type: WAREHOUSE_LIST_DARK_STORE_TABLE_ACTIONS.SET_SORT,
  payload,
});

export type WarehouseListDarkStoreActionTypes =
  | ReturnType<typeof fetchDarkStoresRequest>
  | ReturnType<typeof fetchDarkStoresSuccess>
  | ReturnType<typeof fetchDarkStoresFailure>;
