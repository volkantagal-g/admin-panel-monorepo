import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getCourierIds, createSegmentRequest } from '@shared/api/CourierCommunication';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { courierListParams, createSegmentParams } from '../utils';
import history from '@shared/utils/history';

export function* getCourierRequest({ general, courierStarRating, totalOrderCount }) {
  try {
    const params = courierListParams({ general, courierStarRating, totalOrderCount });
    const data = yield call(getCourierIds, params);
    yield put(Creators.getCourierIdsSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.getCourierIdsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchCourierIds() {
  yield takeLatest(Types.GET_COURIER_IDS, getCourierRequest);
}

export function* postCreateSegmentRequest({ name, segmentType, filter, targetIds, client }) {
  try {
    const params = createSegmentParams({ name, segmentType, filter, targetIds, client });
    const data = yield call(createSegmentRequest, params);
    yield put(Creators.newSegmentSuccess({ data }));
    yield put(ToastCreators.success());
    history.push('/courierNotification/segment/list');
  }
  catch (error) {
    yield put(Creators.newSegmentFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchSegmentCreation() {
  yield takeLatest(Types.NEW_SEGMENT, postCreateSegmentRequest);
}

export default function* createSegment() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCourierIds),
      fork(watchSegmentCreation),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
