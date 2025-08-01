import { createSelector } from 'reselect';

import { SuppliersState } from './reducer';

// Base selector with fallback to prevent undefined errors
const selectSuppliersState = (state: any): SuppliersState => state.suppliersTable || {
  data: [],
  loading: false,
  error: null,
  totalCount: 0,
  filters: {
    search: '',
    cityIds: [],
    regionIds: [],
    domainTypes: [],
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
    cityIds: [],
    regionIds: [],
    domainTypes: [],
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
