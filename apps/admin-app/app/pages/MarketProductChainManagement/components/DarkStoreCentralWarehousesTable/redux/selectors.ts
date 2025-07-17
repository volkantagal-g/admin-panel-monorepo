import { createSelector } from 'reselect';

import { REDUX_STORE_KEYS } from '@app/pages/MarketProductChainManagement/constants';
import { selectLookups } from '../../DarkStoreTable/redux/selectors';
import type { CentralWarehouseState } from './types';

export const selectCentralWarehousesState = (state: any): CentralWarehouseState => {
  const storeState = state[REDUX_STORE_KEYS.DARK_STORE_CENTRAL_WAREHOUSES_TABLE] || {
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

export const selectCentralWarehouses = createSelector(
  selectCentralWarehousesState,
  state => state.data || [],
);

export const selectLoading = createSelector(
  selectCentralWarehousesState,
  state => state.loading || false,
);

export const selectError = createSelector(
  selectCentralWarehousesState,
  state => state.error || null,
);

export const selectTotalCount = createSelector(
  selectCentralWarehousesState,
  state => state.totalCount || 0,
);

export const selectFilters = createSelector(
  selectCentralWarehousesState,
  state => state.filters || {
    search: '',
    type: undefined,
    preferred: undefined,
  },
);

export const selectPagination = createSelector(
  selectCentralWarehousesState,
  state => state.pagination || {
    page: 1,
    pageSize: 10,
  },
);

export const selectSort = createSelector(
  selectCentralWarehousesState,
  state => state.sort || undefined,
);

export const selectCities = createSelector(
  selectCentralWarehousesState,
  state => state.cities || [],
);

export const selectCitiesLoading = createSelector(
  selectCentralWarehousesState,
  state => state.citiesLoading || false,
);

export const selectRegions = createSelector(
  selectCentralWarehousesState,
  state => state.regions || [],
);

export const selectRegionsLoading = createSelector(
  selectCentralWarehousesState,
  state => state.regionsLoading || false,
);

export const selectDomainTypes = createSelector(
  selectCentralWarehousesState,
  state => state.domainTypes || [],
);

export const selectDomainTypesLoading = createSelector(
  selectCentralWarehousesState,
  state => state.domainTypesLoading || false,
);

export const selectDomains = createSelector(
  selectCentralWarehousesState,
  state => state.domains || [],
);

export const selectDemographies = createSelector(
  selectCentralWarehousesState,
  state => state.demographies || [],
);

export const selectLookupsLoading = createSelector(
  selectCentralWarehousesState,
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
