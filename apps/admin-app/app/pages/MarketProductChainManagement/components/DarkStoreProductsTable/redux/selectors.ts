import { createSelector } from 'reselect';

import { REDUX_STORE_KEYS } from '@app/pages/MarketProductChainManagement/constants';
import { selectLookups } from '../../DarkStoreTable/redux/selectors';
import type { ProductsState } from './types';

export const selectProductsState = (state: any): ProductsState => {
  const storeState = state[REDUX_STORE_KEYS.DARK_STORE_PRODUCTS_TABLE] || {
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

export const selectProducts = createSelector(
  selectProductsState,
  state => state.data || [],
);

export const selectLoading = createSelector(
  selectProductsState,
  state => state.loading || false,
);

export const selectError = createSelector(
  selectProductsState,
  state => state.error || null,
);

export const selectTotalCount = createSelector(
  selectProductsState,
  state => state.totalCount || 0,
);

export const selectFilters = createSelector(
  selectProductsState,
  state => state.filters || {
    search: '',
    type: undefined,
    preferred: undefined,
  },
);

export const selectPagination = createSelector(
  selectProductsState,
  state => state.pagination || {
    page: 1,
    pageSize: 10,
  },
);

export const selectSort = createSelector(
  selectProductsState,
  state => state.sort || undefined,
);

export const selectCities = createSelector(
  selectProductsState,
  state => state.cities || [],
);

export const selectCitiesLoading = createSelector(
  selectProductsState,
  state => state.citiesLoading || false,
);

export const selectRegions = createSelector(
  selectProductsState,
  state => state.regions || [],
);

export const selectRegionsLoading = createSelector(
  selectProductsState,
  state => state.regionsLoading || false,
);

export const selectDomainTypes = createSelector(
  selectProductsState,
  state => state.domainTypes || [],
);

export const selectDomainTypesLoading = createSelector(
  selectProductsState,
  state => state.domainTypesLoading || false,
);

export const selectDomains = createSelector(
  selectDomainTypes,
  domainTypes => domainTypes || [],
);

export const selectDemographies = createSelector(
  selectProductsState,
  state => state.demographies || [],
);

export const selectDemographiesLoading = createSelector(
  selectProductsState,
  state => state.demographiesLoading || false,
);

export const selectLookupsLoading = createSelector(
  selectLookups,
  lookups => lookups?.loading || false,
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
