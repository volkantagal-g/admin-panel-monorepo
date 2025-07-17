import { get } from 'lodash';
import { createSelector } from 'reselect';

import { REDUX_STORE_KEYS } from '@app/pages/MarketProductChainManagement/constants';

const reducerKey = REDUX_STORE_KEYS.MATCH_SUPPLIERS;
const getMatchSupplierState = state => get(state, reducerKey, {});

export const matchSupplierSelector = {
  getWarehouses: createSelector(
    getMatchSupplierState,
    state => get(state, 'warehouses', []),
  ),

  getEditingPlatform: createSelector(
    getMatchSupplierState,
    state => get(state, 'editingPlatform', null),
  ),

  getSelectedPlatforms: createSelector(
    getMatchSupplierState,
    state => get(state, 'selectedPlatforms', {}),
  ),

  getMatchedSuppliers: createSelector(
    getMatchSupplierState,
    state => get(state, 'matchedSuppliers', []),
  ),

  getUnmatchedSuppliers: createSelector(
    getMatchSupplierState,
    state => get(state, 'unmatchedSuppliers', []),
  ),

  getInitialMatchedSuppliers: createSelector(
    getMatchSupplierState,
    state => get(state, 'initialMatchedSuppliers', []),
  ),

  getMatchedSearchValue: createSelector(
    getMatchSupplierState,
    state => get(state, 'matchedSearchValue', ''),
  ),

  getUnmatchedSearchValue: createSelector(
    getMatchSupplierState,
    state => get(state, 'unmatchedSearchValue', ''),
  ),

  getSelectedWarehouse: createSelector(
    getMatchSupplierState,
    state => get(state, 'selectedWarehouse', null),
  ),

  getLoading: createSelector(
    getMatchSupplierState,
    state => get(state, 'loading', {}),
  ),

  getError: createSelector(
    getMatchSupplierState,
    state => get(state, 'error', null),
  ),
};
