import { createSelector } from 'reselect';

import { REDUX_STORE_KEYS } from '@app/pages/MarketProductChainManagement/constants';
import { selectLookups } from '../../DarkStoreTable/redux/selectors';
import type { SupplierState } from './types';

export const selectSuppliersState = (state: any): SupplierState => {
  const storeState = state[REDUX_STORE_KEYS.DARK_STORE_SUPPLIERS_TABLE] || {
    data: [],
    loading: false,
    error: null,
    totalCount: 0,
    filters: {
      search: '',
      type: undefined,
      preferred: undefined,
    },
    pagination: {
      page: 1,
      pageSize: 10,
    },
    sort: undefined,
    cities: [],
    citiesLoading: false,
    regions: [],
    regionsLoading: false,
    domainTypes: [],
    domainTypesLoading: false,
  };

  return storeState;
};

export const selectSuppliers = createSelector(
  selectSuppliersState,
  state => state.data || [],
);

export const selectLoading = createSelector(
  selectSuppliersState,
  state => state.loading || false,
);

export const selectError = createSelector(
  selectSuppliersState,
  state => state.error || null,
);

export const selectTotalCount = createSelector(
  selectSuppliersState,
  state => state.totalCount || 0,
);

export const selectFilters = createSelector(
  selectSuppliersState,
  state => state.filters || {
    search: '',
    type: undefined,
    preferred: undefined,
  },
);

export const selectPagination = createSelector(
  selectSuppliersState,
  state => state.pagination || {
    page: 1,
    pageSize: 10,
  },
);

export const selectSort = createSelector(
  selectSuppliersState,
  state => state.sort || undefined,
);

export const selectCities = createSelector(
  selectSuppliersState,
  state => state.cities || [],
);

export const selectCitiesLoading = createSelector(
  selectSuppliersState,
  state => state.citiesLoading || false,
);

export const selectRegions = createSelector(
  selectSuppliersState,
  state => state.regions || [],
);

export const selectRegionsLoading = createSelector(
  selectSuppliersState,
  state => state.regionsLoading || false,
);

export const selectDomainTypes = createSelector(
  selectSuppliersState,
  state => state.domainTypes || [],
);

export const selectDomainTypesLoading = createSelector(
  selectSuppliersState,
  state => state.domainTypesLoading || false,
);

export const selectDomains = createSelector(
  selectSuppliersState,
  state => state.domains || [],
);

export const selectDemographies = createSelector(
  selectSuppliersState,
  state => state.demographies || [],
);

export const selectLookupsLoading = createSelector(
  selectSuppliersState,
  state => state.lookupsLoading || false,
);

export const selectLookupsError = createSelector(
  selectLookups,
  lookups => lookups?.error || null,
);

export const selectDarkStoresTableState = (state: any) => state[REDUX_STORE_KEYS.DARK_STORES_TABLE] || {};

export const selectDarkStoresTableLookups = createSelector(
  selectDarkStoresTableState,
  state => state.lookups || { domains: [], demographies: [] },
);

export const selectDarkStoresTableDomains = createSelector(
  selectDarkStoresTableLookups,
  lookups => lookups.domains || [],
);

export const selectDarkStoresTableDemographies = createSelector(
  selectDarkStoresTableLookups,
  lookups => lookups.demographies || [],
);
