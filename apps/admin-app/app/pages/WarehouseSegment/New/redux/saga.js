import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import history from '@shared/utils/history';
import { createWarehouseSegment } from '@shared/api/warehouse';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* createWarehouseSegmentRequest({ name, segmentType, isDefault }) {
  try {
    yield call(createWarehouseSegment, { name, type: segmentType, isDefault });
    yield put(Creators.createWarehouseSegmentSuccess());
    yield put(ToastCreators.success());

    history.push('/warehouseSegment/list');
  }
  catch (error) {
    yield put(Creators.createWarehouseSegmentFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateSegmentRequest() {
  yield takeLatest(Types.CREATE_WAREHOUSE_SEGMENT_REQUEST, createWarehouseSegmentRequest);
}

export default function* createWarehouseSegmentRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateSegmentRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
