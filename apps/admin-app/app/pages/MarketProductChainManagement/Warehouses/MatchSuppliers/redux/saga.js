import { call, put, select, takeLatest } from 'redux-saga/effects';

import { getCentralWarehousesForMatch, getSupplierMatches, updateSupplierMatches } from '@shared/api/marketProductChainManagement';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Creators, Types } from './actions';
import { matchSupplierSelector } from './selectors';

function* fetchCentralWarehousesForMatch() {
  try {
    const response = yield call(getCentralWarehousesForMatch);

    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to fetch central warehouses');
    }

    yield put(Creators.fetchCentralWarehousesForMatchSuccess(response));
  }
  catch (error) {
    yield put(Creators.fetchCentralWarehousesForMatchFailure(error));
  }
}

function* fetchWarehouseData({ warehouseId }) {
  try {
    const response = yield call(getSupplierMatches, warehouseId);
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to fetch warehouse data');
    }

    const matchedData = response.data.matchedSuppliers ? response.data.matchedSuppliers.map(supplier => ({
      id: supplier.supplierId,
      name: supplier.name,
      productCount: supplier.productCount,
      relatedPlatform: response.data.platforms,
      selectedPlatform: supplier.relatedPlatform ? {
        id: supplier.relatedPlatform.platformId,
        name: supplier.relatedPlatform.platformName,
      } : null,
    })) : [];

    const unmatchedData = response.data.unmatchedSuppliers ? response.data.unmatchedSuppliers.map(supplier => ({
      id: supplier.supplierId,
      name: supplier.name,
      productCount: supplier.productCount,
      relatedPlatform: response.data.platforms,
    })) : [];

    yield put(Creators.fetchWarehouseDataSuccess({
      matchedData,
      unmatchedData,
      platforms: response.data.platforms || [],
    }));
  }
  catch (error) {
    yield put(Creators.fetchWarehouseDataFailure(error));
    yield put(ToastCreators.error({ message: error?.response?.data?.message || 'Failed to fetch warehouse data' }));
  }
}

function* moveSupplier({ supplierId, direction }) {
  try {
    const matchedSuppliers = yield select(matchSupplierSelector.getMatchedSuppliers) || [];
    const unmatchedSuppliers = yield select(matchSupplierSelector.getUnmatchedSuppliers) || [];

    const supplier = direction === 'TO_MATCHED'
      ? unmatchedSuppliers.find(s => s.id === supplierId)
      : matchedSuppliers.find(s => s.id === supplierId);

    if (!supplier) {
      return;
    }

    const newMatchedSuppliers = direction === 'TO_MATCHED'
      ? [...matchedSuppliers, { ...supplier, selectedPlatform: null }]
      : matchedSuppliers.filter(s => s.id !== supplierId);

    const newUnmatchedSuppliers = direction === 'TO_MATCHED'
      ? unmatchedSuppliers.filter(s => s.id !== supplierId)
      : [...unmatchedSuppliers, { ...supplier, selectedPlatform: null }];

    yield put(Creators.moveSupplierSuccess(newMatchedSuppliers, newUnmatchedSuppliers));
  }
  catch (error) {
    yield put(ToastCreators.error({ message: 'Failed to move supplier' }));
  }
}

function* updatePlatform({ supplierId, platformId }) {
  try {
    const matchedSuppliers = yield select(matchSupplierSelector.getMatchedSuppliers);
    const supplier = matchedSuppliers.find(s => s.id === supplierId);

    if (!supplier) {
      return;
    }

    const selectedPlatform = platformId && supplier.relatedPlatform
      ? supplier.relatedPlatform.find(p => p.id === platformId)
      : null;

    if (platformId && !selectedPlatform) {
      return;
    }

    yield put(Creators.updatePlatformSuccess(supplierId, platformId, selectedPlatform));
  }
  catch (error) {
    yield put(ToastCreators.error({ message: 'Failed to update platform' }));
  }
}

function* saveChanges({ changes }) {
  try {
    const selectedWarehouse = yield select(matchSupplierSelector.getSelectedWarehouse);

    const formattedChanges = {
      matchedSuppliers: changes.matchedSuppliers.map(supplier => {
        const supplierData = { supplierId: supplier.id };

        if (supplier.selectedPlatform || supplier.relatedPlatform?.platformId) {
          supplierData.relatedPlatform = {
            platformId: supplier.selectedPlatform?.id || supplier.relatedPlatform?.platformId,
            platformName: supplier.selectedPlatform?.name || supplier.relatedPlatform?.platformName,
          };
        }

        return supplierData;
      }),
    };

    yield call(updateSupplierMatches, selectedWarehouse, formattedChanges);
    yield put(Creators.saveChangesSuccess(changes));
    yield put(ToastCreators.success({ message: 'Changes saved successfully' }));
  }
  catch (error) {
    yield put(Creators.saveChangesFailure(error));
    yield put(ToastCreators.error({ message: error?.message || 'Failed to save changes' }));
  }
}

export default function* matchSuppliersSaga() {
  yield takeLatest(Types.FETCH_CENTRAL_WAREHOUSES_FOR_MATCH_REQUEST, fetchCentralWarehousesForMatch);
  yield takeLatest(Types.FETCH_WAREHOUSE_DATA_REQUEST, fetchWarehouseData);
  yield takeLatest(Types.MOVE_SUPPLIER, moveSupplier);
  yield takeLatest(Types.UPDATE_PLATFORM, updatePlatform);
  yield takeLatest(Types.SAVE_CHANGES, saveChanges);
}
