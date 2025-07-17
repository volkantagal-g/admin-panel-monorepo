import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getLangKey } from '@shared/i18n';
import { getWarehouseSegmentReport, getWarehouseSegments } from '@shared/api/warehouse';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* warehouseSegmentsRequest({
  name,
  segmentTypes,
  isDefault,
  startDate,
  endDate,
  limit,
  offset,
}) {
  try {
    const { segments, totalCount } = yield call(getWarehouseSegments, {
      name,
      types: segmentTypes,
      isDefault,
      startDate,
      endDate,
      limit,
      offset,
    });
    yield put(Creators.getWarehouseSegmentsSuccess({ data: segments, total: totalCount }));
  }
  catch (error) {
    yield put(Creators.getWarehouseSegmentsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchWarehouseSegmentsRequest() {
  yield takeLatest(Types.GET_WAREHOUSE_SEGMENTS_REQUEST, warehouseSegmentsRequest);
}

function* warehouseSegmentReportRequest({
  name,
  segmentTypes,
  isDefault,
  startDate,
  endDate,
}) {
  try {
    const { url } = yield call(getWarehouseSegmentReport, {
      name,
      types: segmentTypes,
      isDefault,
      startDate,
      endDate,
      lang: getLangKey(),
    });
    window.open(url);
    yield put(Creators.getWarehouseSegmentReportSuccess());
  }
  catch (error) {
    yield put(Creators.getWarehouseSegmentReportFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchWarehouseSegmentReportRequest() {
  yield takeLatest(Types.GET_WAREHOUSE_SEGMENT_REPORT_REQUEST, warehouseSegmentReportRequest);
}

export default function* WarehouseSegmentsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchWarehouseSegmentsRequest),
      fork(watchWarehouseSegmentReportRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
