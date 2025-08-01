import { call, put, takeLatest } from 'redux-saga/effects';

import { marketProductChainManagementAPI } from '@shared/api/marketProductChainManagement';
import {
  fetchSuppliersRequest,
  fetchSuppliersSuccess,
  fetchSuppliersFailure,
} from './actions';
import { FETCH_SUPPLIERS_REQUEST } from './types';
import { Supplier } from '../types';

function* fetchSuppliersSaga({ payload }: ReturnType<typeof fetchSuppliersRequest>) {
  try {
    const filters: Record<string, any> = {};

    if (payload.filters?.search) {
      filters.search = payload.filters.search;
    }

    if (payload.filters?.type) {
      filters.type = payload.filters.type;
    }

    if (payload.filters?.preferred === 'true') {
      filters.isPreferred = true;
    }
    else if (payload.filters?.preferred === 'false') {
      filters.isPreferred = false;
    }

    let sortOrder = 'asc';
    if (payload.sort?.order === 'ascend') {
      sortOrder = 'asc';
    }
    else if (payload.sort?.order === 'descend') {
      sortOrder = 'desc';
    }

    const { data } = yield call({
      context: marketProductChainManagementAPI.products,
      fn: marketProductChainManagementAPI.products.getSuppliers,
    }, payload.productId, {
      filters,
      pagination: {
        page: payload.pagination?.page || 1,
        pageSize: payload.pagination?.pageSize || 10,
      },
      sort: {
        field: payload.sort?.field || 'name',
        order: sortOrder,
      },
    });

    const formattedSuppliers = data.supplierList.map((supplier: Omit<Supplier, 'key' | 'type' | 'preferred'>) => ({
      ...supplier,
      key: supplier.id,
      type: supplier.isManufacturer ? 'manufacturer' : 'supplier',
      preferred: supplier.isPreferred,
    }));

    if (payload.sort) {
      yield put({
        type: 'suppliers/UPDATE_SORT',
        payload: {
          field: payload.sort.field,
          order: payload.sort.order,
        },
      });
    }

    yield put(fetchSuppliersSuccess(formattedSuppliers, data.totalCount));
  }
  catch (error) {
    yield put(fetchSuppliersFailure(error as Error));
  }
}

export function* suppliersSaga() {
  yield takeLatest(FETCH_SUPPLIERS_REQUEST, fetchSuppliersSaga);
}

export default suppliersSaga;
