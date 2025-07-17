import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { marketProductChainManagementAPI } from '@shared/api/marketProductChainManagement';
import { WAREHOUSE_TABS } from '@app/pages/MarketProductChainManagement/constants';
import { Creators, Types } from './actions';
import {
  selectActiveTab,
  selectFilters,
  selectPagination,
  selectSort,
  selectWarehouseId,
} from './reducer';

function* fetchWarehouseDetail({ warehouseId }) {
  try {
    const response = yield call(marketProductChainManagementAPI.warehouses.getWarehouseDetail, warehouseId);

    if (response.success && response.data) {
      yield put(Creators.fetchWarehouseDetailSuccess(response.data));
      // Fetch products immediately after warehouse detail
      yield put(Creators.fetchProductsRequest());
    }
    else {
      throw new Error('Invalid response format');
    }
  }
  catch (error) {
    yield put(Creators.fetchWarehouseDetailFailure({
      message: error?.response?.data?.message || error?.message || 'An error occurred while fetching warehouse detail',
      code: error?.response?.data?.code || 'FETCH_WAREHOUSE_DETAIL_ERROR',
      details: error,
    }));
  }
}

function* fetchProducts() {
  try {
    const warehouseId = yield select(selectWarehouseId);
    const filters = yield select(selectFilters);
    const pagination = yield select(selectPagination);
    const sort = yield select(selectSort);

    const response = yield call(marketProductChainManagementAPI.warehouses.getWarehouseProducts, warehouseId, {
      filters,
      pagination,
      sort,
    });

    if (response.success && response.data) {
      yield put(Creators.fetchProductsSuccess(response.data.products, response.data.totalCount));
    }
    else {
      throw new Error('Invalid response format');
    }
  }
  catch (error) {
    yield put(Creators.fetchProductsFailure({
      message: error?.response?.data?.message || error?.message || 'An error occurred while fetching products',
      code: error?.response?.data?.code || 'FETCH_PRODUCTS_ERROR',
      details: error,
    }));
  }
}

function* fetchDarkStores() {
  try {
    const warehouseId = yield select(selectWarehouseId);
    const filters = yield select(selectFilters);
    const pagination = yield select(selectPagination);
    const sort = yield select(selectSort);

    const response = yield call(marketProductChainManagementAPI.warehouses.getWarehouseDarkStores, warehouseId, {
      filters,
      pagination,
      sort,
    });

    if (response.success && response.data) {
      yield put(Creators.fetchDarkStoresSuccess(response.data.darkStores, response.data.totalCount));
    }
    else {
      throw new Error('Invalid response format');
    }
  }
  catch (error) {
    yield put(Creators.fetchDarkStoresFailure({
      message: error?.response?.data?.message || error?.message || 'An error occurred while fetching dark stores',
      code: error?.response?.data?.code || 'FETCH_DARK_STORES_ERROR',
      details: error,
    }));
  }
}

function* fetchSuppliers() {
  try {
    const warehouseId = yield select(selectWarehouseId);
    const filters = yield select(selectFilters);
    const pagination = yield select(selectPagination);
    const sort = yield select(selectSort);

    const response = yield call(marketProductChainManagementAPI.warehouses.getWarehouseSuppliers, warehouseId, {
      filters,
      pagination,
      sort,
    });

    if (response.success && response.data) {
      yield put(Creators.fetchSuppliersSuccess(response.data.suppliers, response.data.totalCount));
    }
    else {
      throw new Error('Invalid response format');
    }
  }
  catch (error) {
    yield put(Creators.fetchSuppliersFailure({
      message: error?.response?.data?.message || error?.message || 'An error occurred while fetching suppliers',
      code: error?.response?.data?.code || 'FETCH_SUPPLIERS_ERROR',
      details: error,
    }));
  }
}

function* handleTabChange({ tabKey }) {
  const warehouseId = yield select(selectWarehouseId);

  if (!warehouseId) {
    yield put(Creators.fetchWarehouseDetailFailure({
      message: 'Warehouse ID is missing',
      code: 'MISSING_WAREHOUSE_ID',
    }));
    return;
  }

  switch (Number(tabKey)) {
    case WAREHOUSE_TABS.PRODUCTS:
      yield put(Creators.fetchProductsRequest());
      break;
    case WAREHOUSE_TABS.DARK_STORE:
      yield put(Creators.fetchDarkStoresRequest());
      break;
    case WAREHOUSE_TABS.SUPPLIERS:
      yield put(Creators.fetchSuppliersRequest());
      break;
    default:
      break;
  }
}

function* handleFiltersChange() {
  const activeTab = yield select(selectActiveTab);

  switch (activeTab) {
    case WAREHOUSE_TABS.PRODUCTS:
      yield put(Creators.fetchProductsRequest());
      break;
    case WAREHOUSE_TABS.DARK_STORE:
      yield put(Creators.fetchDarkStoresRequest());
      break;
    case WAREHOUSE_TABS.SUPPLIERS:
      yield put(Creators.fetchSuppliersRequest());
      break;
    default:
      break;
  }
}

export function* warehouseDetailSagas() {
  yield all([
    takeLatest(Types.FETCH_WAREHOUSE_DETAIL_REQUEST, fetchWarehouseDetail),
    takeLatest(Types.FETCH_PRODUCTS_REQUEST, fetchProducts),
    takeLatest(Types.FETCH_DARK_STORES_REQUEST, fetchDarkStores),
    takeLatest(Types.FETCH_SUPPLIERS_REQUEST, fetchSuppliers),
    takeLatest(Types.UPDATE_ACTIVE_TAB, handleTabChange),
    takeLatest([
      Types.UPDATE_FILTERS,
      Types.UPDATE_PAGINATION,
      Types.UPDATE_SORT,
    ], handleFiltersChange),
  ]);
}
