import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';
import _ from 'lodash';

import history from '@shared/utils/history';
import { createMap } from '@shared/utils/common';
import {
  getTransferGroupById,
  getProductTransferGroupsByFilter,
  getWarehouseTransferGroupsByFilter,
  updateTransferGroupOfWarehousesBulk,
  updateTransferGroupOfProductsBulk,
  inactivateTransferGroup,
  updateTransferGroup,
} from '@shared/api/transferGroup';
import { getMarketProducts } from '@shared/api/marketProduct';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
// eslint-disable-next-line import/named
import { exportWarehouseTransferGroupsToExcel } from '../components/WarehouseTransferGroupsTable/config';
import { exportProductTransferGroupsToExcel } from '../components/ProductTransferGroupsTable/config';
import { ROUTE } from '@app/routes';

function* getTransferGroupByIdRequest({ id }) {
  try {
    const { transferGroup: data } = yield call(getTransferGroupById, { id });
    yield put(Creators.getTransferGroupByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getTransferGroupByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* inactivateTransferGroupRequest({ transferGroup }) {
  try {
    const { transferGroup: data } = yield call(inactivateTransferGroup, { transferGroup });
    yield put(Creators.inactivateTransferGroupSuccess({ data }));
    history.push(ROUTE.TRANSFER_GROUP_LIST.path);
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.inactivateTransferGroupFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getProductTransferGroupsByFilterRequest({ transferGroup, limit, offset }) {
  try {
    const { productTransferGroups: data } = yield call(
      getProductTransferGroupsByFilter,
      { transferGroup, limit, offset },
    );
    const productIds = data.map(({ product }) => product);
    const productsActive = yield call(
      getMarketProducts,
      { isActive: true, offset, limit, ids: productIds, fields: ['name', 'fullName'] },
    );
    const productsInactive = yield call(
      getMarketProducts,
      { isActive: false, offset, limit, ids: productIds, fields: ['name', 'fullName'] },
    );
    const products = [...productsActive, ...productsInactive];
    const productMap = createMap(products);
    const populatedData = data.map(elem => ({
      ...elem,
      product: _.get(productMap, [elem.product], {}),
    }));
    yield put(Creators.getProductTransferGroupsByFilterSuccess({ data: populatedData }));
  }
  catch (error) {
    yield put(Creators.getProductTransferGroupsByFilterFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* exportProductTransferGroupsByFilterRequest({ transferGroup, products }) {
  try {
    const { productTransferGroups: data } = yield call(
      getProductTransferGroupsByFilter,
      { transferGroup: _.get(transferGroup, '_id', '') },
    );
    exportProductTransferGroupsToExcel(data, transferGroup, products);
    yield put(Creators.exportProductTransferGroupsByFilterSuccess());
  }
  catch (error) {
    yield put(Creators.exportProductTransferGroupsByFilterFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateTransferGroupOfProductsBulkRequest({ transferGroup, products }) {
  try {
    const { productTransferGroups: data } = yield call(
      updateTransferGroupOfProductsBulk,
      { transferGroup, products },
    );
    yield put(Creators.updateTransferGroupOfProductsBulkSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateTransferGroupOfProductsBulkFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getWarehouseTransferGroupsRequest({ transferGroups, limit, offset }) {
  try {
    const { warehouseTransferGroups: data } = yield call(
      getWarehouseTransferGroupsByFilter,
      { transferGroups, limit, offset },
    );
    yield put(Creators.getWarehouseTransferGroupsByFilterSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getWarehouseTransferGroupsByFilterFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* exportWarehouseTransferGroupsByFilterRequest({ transferGroups, transferGroup, warehouses }) {
  try {
    const { warehouseTransferGroups: data } = yield call(getWarehouseTransferGroupsByFilter, { transferGroups });
    exportWarehouseTransferGroupsToExcel(data, transferGroup, warehouses);
    yield put(Creators.exportWarehouseTransferGroupsByFilterSuccess());
  }
  catch (error) {
    yield put(Creators.exportWarehouseTransferGroupsByFilterFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateTransferGroupOfWarehousesBulkRequest({ transferGroup, warehouses }) {
  try {
    const { warehouseTransferGroups: data } = yield call(
      updateTransferGroupOfWarehousesBulk,
      { transferGroup, warehouses },
    );
    yield put(Creators.updateTransferGroupOfWarehousesBulkSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateTransferGroupOfWarehousesBulkFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateTransferGroupRequest({ id, body }) {
  try {
    const data = yield call(updateTransferGroup, { id, body });
    yield put(Creators.updateTransferGroupSuccess({ data }));
    yield put(Creators.getTransferGroupByIdRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateTransferGroupFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetTransferGroupByIdRequest() {
  yield takeLatest(Types.GET_TRANSFER_GROUP_BY_ID_REQUEST, getTransferGroupByIdRequest);
}

function* watchInactivateTransferGroupRequest() {
  yield takeLatest(Types.INACTIVATE_TRANSFER_GROUP_REQUEST, inactivateTransferGroupRequest);
}

function* watchGetProductTransferGroupsByFilterRequest() {
  yield takeLatest(Types.GET_PRODUCT_TRANSFER_GROUPS_BY_FILTER_REQUEST, getProductTransferGroupsByFilterRequest);
}

function* watchExportProductTransferGroupsRequest() {
  yield takeLatest(
    Types.EXPORT_PRODUCT_TRANSFER_GROUPS_BY_FILTER_REQUEST,
    exportProductTransferGroupsByFilterRequest,
  );
}

function* watchUpdateTransferGroupOfProductsBulkRequest() {
  yield takeLatest(Types.UPDATE_TRANSFER_GROUP_OF_PRODUCTS_BULK_REQUEST, updateTransferGroupOfProductsBulkRequest);
}

function* watchGetWarehouseTransferGroupsRequest() {
  yield takeLatest(Types.GET_WAREHOUSE_TRANSFER_GROUPS_BY_FILTER_REQUEST, getWarehouseTransferGroupsRequest);
}

function* watchExportWarehouseTransferGroupsRequest() {
  yield takeLatest(
    Types.EXPORT_WAREHOUSE_TRANSFER_GROUPS_BY_FILTER_REQUEST,
    exportWarehouseTransferGroupsByFilterRequest,
  );
}

function* watchUpdateTransferGroupOfWarehousesBulkRequest() {
  yield takeLatest(Types.UPDATE_TRANSFER_GROUP_OF_WAREHOUSES_BULK_REQUEST, updateTransferGroupOfWarehousesBulkRequest);
}

function* watchUpdateupdateTransferGroupRequest() {
  yield takeLatest(Types.UPDATE_TRANSFER_GROUP_REQUEST, updateTransferGroupRequest);
}

export default function* transferGroupDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetTransferGroupByIdRequest),
      fork(watchInactivateTransferGroupRequest),
      fork(watchGetProductTransferGroupsByFilterRequest),
      fork(watchExportProductTransferGroupsRequest),
      fork(watchUpdateTransferGroupOfProductsBulkRequest),
      fork(watchGetWarehouseTransferGroupsRequest),
      fork(watchExportWarehouseTransferGroupsRequest),
      fork(watchUpdateTransferGroupOfWarehousesBulkRequest),
      fork(watchUpdateupdateTransferGroupRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
