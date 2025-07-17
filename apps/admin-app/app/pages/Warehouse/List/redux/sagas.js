import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getFilteredWarehouses } from '@shared/api/warehouse';
import { Types, Creators } from './actions';

function* warehousesRequest({
  domainTypes,
  cities,
  states,
  statuses,
  warehouseTypes,
  name,
  SAPReferenceCodes,
  limit,
  offset,
}) {
  try {
    const { warehouses, totalCount } = yield call(getFilteredWarehouses, {
      domainTypes,
      cities,
      states,
      statuses,
      warehouseTypes,
      name,
      SAPReferenceCodes,
      limit,
      offset,
    });
    yield put(Creators.getWarehousesSuccess({ warehouses, totalCount }));
  }
  catch (error) {
    yield put(Creators.getWarehousesFailure({ error }));
  }
}

function* watchWarehousesRequest() {
  yield takeLatest(Types.GET_WAREHOUSES_REQUEST, warehousesRequest);
}

export default function* warehousesRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchWarehousesRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
