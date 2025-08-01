import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const { Types, Creators } = createActions({
  fetchCentralWarehousesForMatchRequest: null,
  fetchCentralWarehousesForMatchSuccess: ['response'],
  fetchCentralWarehousesForMatchFailure: ['error'],
  fetchWarehouseDataRequest: ['warehouseId'],
  fetchWarehouseDataSuccess: ['response'],
  fetchWarehouseDataFailure: ['error'],
  moveSupplier: ['supplierId', 'direction'],
  moveSupplierSuccess: ['matchedSuppliers', 'unmatchedSuppliers'],
  updateSupplierMatches: ['warehouseId', 'matchedSuppliers'],
  updateSupplierMatchesSuccess: ['response'],
  updateSupplierMatchesFailure: ['error'],
  updatePlatform: ['supplierId', 'platformId'],
  updatePlatformSuccess: ['supplierId', 'platformId', 'selectedPlatform'],
  saveChanges: ['changes'],
  saveChangesSuccess: ['data'],
  saveChangesFailure: ['error'],
  resetState: null,
  setEditingPlatform: ['recordId'],
  updateSearchValue: ['searchType', 'value'],
  resetForms: null,
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT_CHAIN_MANAGEMENT.MATCH_SUPPLIERS}_` });

export { Creators, Types };
