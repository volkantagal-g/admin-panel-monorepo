import { call, all, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  getGetirWaterSlotData,
  updateSlotCapacity,
  getGetirWaterBulkSlotData,
  updateBulkSlotCapacity,
} from '@shared/api/water';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export function* getWarehouseSlotDataRequest({ id, date }) {
  try {
    const data = yield call(getGetirWaterSlotData, { id, date });
    yield put(Creators.getWarehouseSlotDataSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getWarehouseSlotDataFailure({ error }));
  }
}
export function* updateSlotCapacityRequest({ body }) {
  try {
    const data = yield call(updateSlotCapacity, { body });
    yield put(Creators.updateSlotCapacitySuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateSlotCapacityFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getBulkSlotDataRequest() {
  try {
    const data = yield call(getGetirWaterBulkSlotData);
    yield put(Creators.getBulkSlotDataSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getBulkSlotDataFailure({ error }));
  }
}
export function* updateBulkSlotCapacitiesRequest({ body }) {
  try {
    const data = yield call(updateBulkSlotCapacity, { body });
    yield put(Creators.updateBulkSlotCapacitiesSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateBulkSlotCapacitiesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetWarehouseSlotDataRequest() {
  yield takeLatest(Types.GET_WAREHOUSE_SLOT_DATA_REQUEST, getWarehouseSlotDataRequest);
}

export function* watchUpdateSlotCapacityRequest() {
  yield takeLatest(Types.UPDATE_SLOT_CAPACITY_REQUEST, updateSlotCapacityRequest);
}

export function* watchGetBulkSlotDataRequest() {
  yield takeLatest(Types.GET_BULK_SLOT_DATA_REQUEST, getBulkSlotDataRequest);
}

export function* watchUpdateBulkSlotCapacityRequest() {
  yield takeLatest(Types.UPDATE_BULK_SLOT_CAPACITIES_REQUEST, updateBulkSlotCapacitiesRequest);
}

export default function* dataTrackingOrderRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetWarehouseSlotDataRequest),
      fork(watchUpdateSlotCapacityRequest),
      fork(watchGetBulkSlotDataRequest),
      fork(watchUpdateBulkSlotCapacityRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
