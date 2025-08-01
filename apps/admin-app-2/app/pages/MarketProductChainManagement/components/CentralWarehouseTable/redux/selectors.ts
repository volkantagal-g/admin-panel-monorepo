import { createSelector } from 'reselect';

import { CentralWarehouseState } from './reducer';

// Base selector with fallback to prevent undefined errors
export const selectCentralWarehouseTableState = (state: any): CentralWarehouseState => state.centralWarehouseTable || {
  data: [],
  loading: false,
  error: null,
  totalCount: 0,
  filters: {
    search: '',
    domain: null,
    city: null,
    region: null,
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

// Data selectors
export const selectCentralWarehouses = createSelector(
  selectCentralWarehouseTableState,
  state => state.data || [],
);

export const selectCentralWarehousesLoading = createSelector(
  selectCentralWarehouseTableState,
  state => state.loading || false,
);

export const selectCentralWarehousesError = createSelector(
  selectCentralWarehouseTableState,
  state => state.error || null,
);

export const selectCentralWarehousesTotalCount = createSelector(
  selectCentralWarehouseTableState,
  state => state.totalCount || 0,
);

// UI state selectors
export const selectCentralWarehousesFilters = createSelector(
  selectCentralWarehouseTableState,
  state => state.filters || {
    search: '',
    domain: null,
    city: null,
    region: null,
  },
);

export const selectCentralWarehousesPagination = createSelector(
  selectCentralWarehouseTableState,
  state => state.pagination || {
    page: 1,
    pageSize: 10,
  },
);

export const selectCentralWarehousesSort = createSelector(
  selectCentralWarehouseTableState,
  state => state.sort || undefined,
);

// Lookup data selectors
export const selectCities = createSelector(
  selectCentralWarehouseTableState,
  state => state.cities || [],
);

export const selectCitiesLoading = createSelector(
  selectCentralWarehouseTableState,
  state => state.citiesLoading || false,
);

export const selectRegions = createSelector(
  selectCentralWarehouseTableState,
  state => state.regions || [],
);

export const selectRegionsLoading = createSelector(
  selectCentralWarehouseTableState,
  state => state.regionsLoading || false,
);

export const selectDomainTypes = createSelector(
  selectCentralWarehouseTableState,
  state => state.domainTypes || [],
);

export const selectDomainTypesLoading = createSelector(
  selectCentralWarehouseTableState,
  state => state.domainTypesLoading || false,
);
