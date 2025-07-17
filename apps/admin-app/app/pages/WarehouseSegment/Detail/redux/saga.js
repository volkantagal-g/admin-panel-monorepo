import { all, call, put, take, takeLatest, fork, cancel } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getWarehouseSegmentDetail as getWarehouseSegmentDetailApi,
  updateWarehouseSegment as updateWarehouseSegmentApi,
  getWarehousesBySegmentId as getWarehousesBySegmentIdApi,
} from '@shared/api/warehouse';
import { Types, Creators } from './actions';

function* getWarehouseSegment({ segmentId }) {
  try {
    const warehouseSegment = yield call(getWarehouseSegmentDetailApi, { segmentId });
    yield put(Creators.getWarehouseSegmentSuccess({ data: warehouseSegment }));
  }
  catch (error) {
    yield put(Creators.getWarehouseSegmentFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getWarehousesBySegmentId({ segmentId, segmentType, limit, offset }) {
  try {
    const { warehouses, totalCount } = yield call(getWarehousesBySegmentIdApi, { segmentId, type: segmentType, limit, offset  });
    yield put(Creators.getWarehousesBySegmentIdSuccess({ data: warehouses, total: totalCount }));
  }
  catch (error) {
    yield put(Creators.getWarehousesBySegmentIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateWarehouseSegment({ segmentId, name, isDefault }) {
  try {
    const data = yield call(updateWarehouseSegmentApi, { segmentId, name, isDefault });
    yield put(Creators.updateWarehouseSegmentSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateWarehouseSegmentFailure(error));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetSegmentRequest() {
  yield takeLatest(Types.GET_WAREHOUSE_SEGMENT_REQUEST, getWarehouseSegment);
}

function* watchGetWarehousesBySegmentIdRequest() {
  yield takeLatest(Types.GET_WAREHOUSES_BY_SEGMENT_ID_REQUEST, getWarehousesBySegmentId);
}

function* watchUpdateSegmentRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_SEGMENT_REQUEST, updateWarehouseSegment);
}

export default function* warehouseSegmentRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetSegmentRequest),
      fork(watchUpdateSegmentRequest),
      fork(watchGetWarehousesBySegmentIdRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
