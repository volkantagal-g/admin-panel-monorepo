import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { createWarehouse, getSAPDraftWarehouses } from '@shared/api/warehouse';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';
import history from '@shared/utils/history';

function* createWarehouseRequest({ requestBody }) {
  const warehouse = { ...requestBody, SAPReferenceCode: (requestBody.SAPReferenceCode || undefined) };
  try {
    const data = yield call(createWarehouse, { warehouse });
    const warehouseId = _.get(data, 'warehouse._id', '');
    const path = ROUTE.WAREHOUSE_DETAIL.path.replace(':id', warehouseId);
    history.push(path);
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessage = _.get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchCreateWarehouseRequest() {
  yield takeLatest(Types.CREATE_WAREHOUSE_REQUEST, createWarehouseRequest);
}

function* getSAPDraftWarehousesRequest() {
  try {
    const data = yield call(getSAPDraftWarehouses);
    yield put(Creators.getSAPDraftWarehousesSuccess({ data: data?.bindings }));
  }
  catch (error) {
    yield put(Creators.getSAPDraftWarehousesFailure({ error }));
  }
}

function* watchGetSAPDraftWarehousesRequest() {
  yield takeLatest(Types.GET_SAP_DRAFT_WAREHOUSES_REQUEST, getSAPDraftWarehousesRequest);
}

export default function* warehousesRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateWarehouseRequest),
      fork(watchGetSAPDraftWarehousesRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
