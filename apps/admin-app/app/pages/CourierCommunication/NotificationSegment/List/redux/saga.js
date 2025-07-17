import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { segmentList } from '@shared/api/CourierCommunication';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import segmentListParams from '../utils';

export function* segmentListRequest({
  client,
  currentPage,
  rowsPerPage,
  segmentName,
  creationDateTime,
}) {
  try {
    const params = segmentListParams({ client, segmentName, creationDateTime, currentPage, rowsPerPage });
    const data = yield call(segmentList, params);
    yield put(Creators.segmentListSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.segmentListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchSegmentList() {
  yield takeLatest(Types.SEGMENT_LIST, segmentListRequest);
}

export default function* notificationList() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchSegmentList),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
