import { createSelector } from 'reselect';

import { REDUX_STORE_KEYS } from '@app/pages/MarketProductChainManagement/constants';
import type { DarkStoresState } from '../types';

interface RootState {
  [key: string]: any;
}

const INITIAL_STATE: DarkStoresState = {
  data: [],
  loading: false,
  error: null,
  totalCount: 0,
  filters: {},
  pagination: {
    page: 1,
    pageSize: 10,
  },
  sort: {
    field: 'name',
    order: 'asc',
  },
  lookups: {
    cities: [],
    regions: [],
    domains: [],
    demographies: [],
    sizes: [],
    loading: false,
    error: null,
  },
};

const selectDarkStoresTableState = (state: RootState) => state?.[REDUX_STORE_KEYS.DARK_STORES_TABLE] || INITIAL_STATE;

export const selectDarkStores = createSelector(
  selectDarkStoresTableState,
  state => state.data,
);

export const selectLoading = createSelector(
  selectDarkStoresTableState,
  state => state.loading,
);

export const selectError = createSelector(
  selectDarkStoresTableState,
  state => state.error,
);

export const selectTotalCount = createSelector(
  selectDarkStoresTableState,
  state => state.totalCount,
);

export const selectFilters = createSelector(
  selectDarkStoresTableState,
  state => state.filters,
);

export const selectPagination = createSelector(
  selectDarkStoresTableState,
  state => state.pagination,
);

export const selectSort = createSelector(
  selectDarkStoresTableState,
  state => state.sort,
);

// Lookup selectors
export const selectLookups = createSelector(
  selectDarkStoresTableState,
  state => state.lookups,
);

export const selectCities = createSelector(
  selectLookups,
  lookups => lookups?.cities || [],
);

export const selectRegions = createSelector(
  selectLookups,
  lookups => lookups?.regions || [],
);

export const selectDomains = createSelector(
  selectLookups,
  lookups => lookups?.domains || [],
);

export const selectDemographies = createSelector(
  selectLookups,
  lookups => lookups?.demographies || [],
);

export const selectSizes = createSelector(
  selectLookups,
  lookups => lookups?.sizes || [],
);

export const selectLookupsLoading = createSelector(
  selectLookups,
  lookups => lookups?.loading || false,
);

export const selectLookupsError = createSelector(
  selectLookups,
  lookups => lookups?.error || null,
);
