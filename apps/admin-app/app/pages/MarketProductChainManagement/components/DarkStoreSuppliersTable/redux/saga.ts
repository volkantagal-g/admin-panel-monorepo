import { all, call, debounce, put, select, takeLatest } from 'redux-saga/effects';

import { marketProductChainManagementAPI } from '@shared/api/marketProductChainManagement';
import { DEBOUNCE_TIME } from '@app/pages/MarketProductChainManagement/constants';
import * as actions from './actions';
import { ACTION_TYPES } from './constants';
import {
  selectFilters,
  selectPagination,
  selectSort,
} from './selectors';
import * as types from './types';

function getSortOrder(order?: string): 'asc' | 'desc' {
  if (order === 'ascend') return 'asc';
  if (order === 'descend') return 'desc';
  return 'asc';
}

function getSortField(field?: string): string {
  if (field === 'local') return 'isLocal';
  if (field === 'domain') return 'domainType';
  if (field === 'segment') return 'productSegmentPlanning';
  if (field === 'categories') return 'masterCategoryCount';
  if (field === 'products') return 'productCount';
  if (field === 'centralWarehouses') return 'centralWarehouseCount';
  return field || 'name';
}

function* fetchSuppliersSaga(
  action: types.FetchSuppliersRequestAction | types.RefreshSuppliersRequestAction,
): types.FetchSuppliersSagaResult {
  try {
    const { darkStoreVertexId, filters, pagination, sort } = action.payload || {};

    const effectiveFilters = filters || (yield select(selectFilters));
    const effectivePagination = pagination || (yield select(selectPagination));
    const effectiveSort = sort || (yield select(selectSort));

    if (filters) {
      yield put(actions.updateFilters(filters));
    }

    if (pagination) {
      yield put(actions.updatePagination(pagination));
    }

    if (sort) {
      yield put(actions.updateSort(sort));
    }

    const requestBody = {
      filter: { name: effectiveFilters.search || undefined },
      pagination: {
        page: effectivePagination.page,
        pageSize: effectivePagination.pageSize,
      },
      sort: {
        field: getSortField(effectiveSort?.field),
        order: getSortOrder(effectiveSort?.order),
      },
      ...(darkStoreVertexId && { darkstoreVertexId: darkStoreVertexId }),
    };

    const response = yield call(
      marketProductChainManagementAPI.darkstore.getSuppliers,
      requestBody,
    );

    if (response && response.success && response.data) {
      const suppliers = response.data.suppliers.map((supplier: types.SupplierResponse) => {
        const mappedSupplier: types.SupplierData = {
          id: supplier.supplierVertexId,
          name: supplier.name,
          type: supplier.type || '',
          categories: supplier.masterCategoryCount || 0,
          products: supplier.productCount || 0,
          centralWarehouses: supplier.centralWarehouseCount || 0,
        };

        return mappedSupplier;
      });

      const totalCount = response.data.totalCount || 0;
      yield put(actions.fetchSuppliersSuccess(suppliers, totalCount));
      if (action.payload?.onTotalCountChange) {
        action.payload.onTotalCountChange(totalCount);
      }
    }
    else {
      throw new Error('Invalid response format');
    }
  }
  catch (error) {
    yield put(actions.fetchSuppliersFailure(error instanceof Error ? error : new Error('An unknown error occurred')));
  }
}

export default function* darkStoreSuppliersTableSaga(): Generator {
  yield all([
    debounce(DEBOUNCE_TIME, ACTION_TYPES.FETCH_SUPPLIERS_REQUEST, fetchSuppliersSaga),
    takeLatest(ACTION_TYPES.REFRESH_SUPPLIERS_REQUEST, fetchSuppliersSaga),
  ]);
}
