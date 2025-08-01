import { message } from 'antd';
import { all, call, put, select, takeLatest, fork, cancel, take } from 'redux-saga/effects';

import { getCentralWarehouses, getDarkStores, marketProductChainManagementAPI } from '@shared/api/marketProductChainManagement';
import { uploadToS3SignedUrl } from '@shared/api/public';
import { t } from '@shared/i18n';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Creators, Types } from './actions';
import {
  selectWarehousesFilters,
  selectWarehousesPagination,
  selectWarehousesSort,
} from './reducer';

const getCleanFilters = (filters, searchKey) => {
  const cleanFilters = {};
  const arrayFilters = [
    'cityVertexIds',
    'demographyVertexIds',
    'domainTypeVertexIds',
    'regionVertexIds',
    'sizeVertexIds',
    'warehouseTypeVertexIds',
  ];

  Object.entries(filters).forEach(([key, value]) => {
    if (arrayFilters.includes(key)) {
      if (Array.isArray(value) && value.length > 0) {
        cleanFilters[key] = value;
      }
    }
    else if (value !== null && value !== '' && value !== undefined) {
      cleanFilters[key] = value;
    }
  });

  if (searchKey && filters.search) {
    cleanFilters[searchKey] = filters.search;
    delete cleanFilters.search;
  }

  return cleanFilters;
};

function* fetchCentralWarehouses({ params }) {
  try {
    const filters = params?.filters || (yield select(selectWarehousesFilters));
    const pagination = params?.pagination || (yield select(selectWarehousesPagination));
    const sort = params?.sort || (yield select(selectWarehousesSort));

    const cleanFilters = getCleanFilters(filters);
    const requestBody = {
      filter: cleanFilters,
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
      },
    };

    if (sort?.field) {
      requestBody.sort = {
        field: sort.field,
        order: sort.order,
      };
    }

    const response = yield call(getCentralWarehouses, requestBody);

    if (response.success && response.data) {
      yield put(Creators.fetchCentralWarehousesSuccess(
        response.data.centralWarehouses || [],
        response.data.totalCount || 0,
      ));
    }
    else {
      throw new Error('Invalid response format');
    }
  }
  catch (error) {
    if (!error.response || error.response.status !== 401) {
      yield put(Creators.fetchCentralWarehousesFailure(error.message || 'An unknown error occurred'));
    }
  }
}

function* fetchDarkStores({ params }) {
  try {
    const filters = params?.filters || (yield select(selectWarehousesFilters));

    const cleanFilters = getCleanFilters(filters, 'name');
    const requestBody = { filter: cleanFilters };

    const response = yield call(getDarkStores, requestBody);

    if (response.success && response.data) {
      yield put(Creators.fetchDarkStoresSuccess(
        response.data.darkStores || [],
        response.data.totalCount || 0,
      ));
    }
    else {
      throw new Error('Invalid response format');
    }
  }
  catch (error) {
    if (!error.response || error.response.status !== 401) {
      yield put(Creators.fetchDarkStoresFailure(error.message || 'An unknown error occurred'));
    }
  }
}

function* handleFiltersChange() {
  const filters = yield select(selectWarehousesFilters);
  const pagination = yield select(selectWarehousesPagination);
  const sort = yield select(selectWarehousesSort);
  const params = { filters, pagination, sort };

  yield all([
    call(fetchCentralWarehouses, { params }),
    call(fetchDarkStores, { params }),
  ]);
}

function* exportCentralWarehouse() {
  try {
    yield call(marketProductChainManagementAPI.centralWarehouse.exportCentralWarehouse);
    yield put(Creators.exportCentralWarehouseSuccess());
    message.success('Export successful');
  }
  catch (error) {
    yield put(Creators.exportCentralWarehouseFailure(error?.message || 'Export failed'));
    message.error('Export failed');
  }
}

function* importCentralWarehouses({ file }) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = yield call(marketProductChainManagementAPI.centralWarehouse.importCentralWarehouse, formData);

    if (response.success) {
      yield put(Creators.importCentralWarehousesSuccess());
      message.success('Import successful');
      yield put(Creators.fetchCentralWarehousesRequest());
    }
    else {
      throw new Error(response.message || 'Import failed');
    }
  }
  catch (error) {
    yield put(Creators.importCentralWarehousesFailure(error?.message || 'Import failed'));
    message.error('Import failed');
  }
}
function* importDarkStores({ loadedFile }) {
  try {
    const { signedUrl, fileName } = yield call(marketProductChainManagementAPI.darkstore.getDarkStoreImportUrl);
    yield call(uploadToS3SignedUrl, { signedUrl, data: loadedFile });
    yield call(marketProductChainManagementAPI.darkstore.importDarkStore, { fileName });
    yield put(Creators.importDarkStoresSuccess());
    yield put(ToastCreators.success({ message: t('YOUR_REQUEST_HAS_BEEN_CREATED') }));
  }
  catch (error) {
    yield put(Creators.importDarkStoresFailure(error));
    yield put(ToastCreators.error({ error }));
  }
}

function* exportDarkStores() {
  try {
    yield call(marketProductChainManagementAPI.darkstore.exportDarkStore);
    yield put(Creators.exportDarkStoreSuccess());
    yield put(ToastCreators.success({
      message: t('FILE_WILL_BE_SENT'),
      toastOptions: { autoClose: 3000 },
    }));
  }
  catch (error) {
    yield put(Creators.exportDarkStoreFailure(error));
    yield put(ToastCreators.error({ error }));
  }
}

export function* centralWarehouseSagas() {
  const sagaTaskId = yield fork(function* () {
    yield all([
      takeLatest(Types.FETCH_CENTRAL_WAREHOUSES_REQUEST, fetchCentralWarehouses),
      takeLatest(Types.FETCH_DARK_STORES_REQUEST, fetchDarkStores),
      takeLatest(Types.IMPORT_CENTRAL_WAREHOUSES_REQUEST, importCentralWarehouses),
      takeLatest(Types.IMPORT_DARK_STORES_REQUEST, importDarkStores),
      takeLatest([
        Types.UPDATE_FILTERS,
        Types.UPDATE_SORT,
        Types.UPDATE_PAGINATION,
      ], handleFiltersChange),
      takeLatest(Types.EXPORT_CENTRAL_WAREHOUSE_REQUEST, exportCentralWarehouse),
      takeLatest(Types.EXPORT_DARK_STORE_REQUEST, exportDarkStores),
    ]);
  });

  yield take(Types.CLEAR_WAREHOUSES_STATE);
  yield cancel(sagaTaskId);
}
