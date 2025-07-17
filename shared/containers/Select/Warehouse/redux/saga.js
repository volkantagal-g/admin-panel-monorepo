import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getWarehouses } from '@shared/api/warehouse';
import { Types, Creators } from './actions';

function* warehousesRequest() {
  try {
    const { warehouses: data } = yield call(getWarehouses, {});
    yield put(Creators.getWarehousesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getWarehousesFailure({ error }));
  }
}

function* watchWarehousesRequest() {
  yield takeLatest(Types.GET_WAREHOUSES_REQUEST, warehousesRequest);
}

export default function* getWarehousesRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchWarehousesRequest),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
