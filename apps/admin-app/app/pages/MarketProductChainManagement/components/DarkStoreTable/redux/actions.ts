import type { TableParams } from '../types';

const PREFIX = 'marketProductChain/darkStoresTable';

export const DARK_STORES_TABLE_ACTIONS = {
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

export const fetchDarkStoresRequest = (payload: any) => ({
  type: DARK_STORES_TABLE_ACTIONS.FETCH_DARK_STORES_REQUEST,
  payload,
});

export const fetchDarkStoresSuccess = (payload: any) => ({
  type: DARK_STORES_TABLE_ACTIONS.FETCH_DARK_STORES_SUCCESS,
  payload,
});

export const fetchDarkStoresFailure = (payload: Error) => ({
  type: DARK_STORES_TABLE_ACTIONS.FETCH_DARK_STORES_FAILURE,
  payload,
});

// Lookup actions
export const fetchLookupsRequest = () => ({ type: DARK_STORES_TABLE_ACTIONS.FETCH_LOOKUPS_REQUEST });

export const fetchLookupsSuccess = (payload: any) => ({
  type: DARK_STORES_TABLE_ACTIONS.FETCH_LOOKUPS_SUCCESS,
  payload,
});

export const fetchLookupsFailure = (payload: Error) => ({
  type: DARK_STORES_TABLE_ACTIONS.FETCH_LOOKUPS_FAILURE,
  payload,
});

export const setFilters = (payload: any) => ({
  type: DARK_STORES_TABLE_ACTIONS.SET_FILTERS,
  payload,
});

export const setPagination = (payload: any) => ({
  type: DARK_STORES_TABLE_ACTIONS.SET_PAGINATION,
  payload,
});

export const setSort = (payload: any) => ({
  type: DARK_STORES_TABLE_ACTIONS.SET_SORT,
  payload,
});

export type DarkStoreActionTypes =
  | ReturnType<typeof fetchDarkStoresRequest>
  | ReturnType<typeof fetchDarkStoresSuccess>
  | ReturnType<typeof fetchDarkStoresFailure>;
