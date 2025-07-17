import { createSelector } from 'reselect';

import { initialState } from './reducer';
import { REDUX_STORE_KEYS } from '@app/pages/MarketProductChainManagement/constants';

// Direct selector to the warehouseListDarkStoreTable state
export const selectDomain = (state: any) => state[REDUX_STORE_KEYS.WAREHOUSE_LIST_DARK_STORE_TABLE] || initialState;

// Select dark stores list
export const selectDarkStores = createSelector(
  selectDomain,
  substate => substate.darkStores,
);

// Select total count
export const selectTotalCount = createSelector(
  selectDomain,
  substate => substate.totalCount,
);

// Select loading state
export const selectLoading = createSelector(
  selectDomain,
  substate => substate.loading,
);

// Select error state
export const selectError = createSelector(
  selectDomain,
  substate => substate.error,
);

// Select filters
export const selectFilters = createSelector(
  selectDomain,
  substate => substate.filters,
);

// Select pagination
export const selectPagination = createSelector(
  selectDomain,
  substate => substate.pagination,
);

// Select sort
export const selectSort = createSelector(
  selectDomain,
  substate => substate.sort,
);

// Select cities
export const selectCities = createSelector(
  selectDomain,
  substate => substate.lookups.cities,
);

// Select regions
export const selectRegions = createSelector(
  selectDomain,
  substate => substate.lookups.regions,
);

// Select domains
export const selectDomains = createSelector(
  selectDomain,
  substate => substate.lookups.domains,
);

// Select demographies
export const selectDemographies = createSelector(
  selectDomain,
  substate => substate.lookups.demographies,
);

// Select sizes
export const selectSizes = createSelector(
  selectDomain,
  substate => substate.lookups.sizes,
);

// Select warehouseTypes
export const selectWarehouseTypes = createSelector(
  selectDomain,
  substate => substate.lookups.warehouseTypes,
);

// Select lookups loading state
export const selectLookupsLoading = createSelector(
  selectDomain,
  substate => substate.lookupsLoading,
);

// Select lookups error state
export const selectLookupsError = createSelector(
  selectDomain,
  substate => substate.lookupsError,
);
