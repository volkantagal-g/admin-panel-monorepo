import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { createSegment as createSegmentApi } from '@shared/api/segments';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Types, Creators } from './actions';

function* createSegment({ values, onSuccess }) {
  try {
    const { segment } = yield call(createSegmentApi, values);
    yield put(Creators.createSegmentSuccess({ data: segment }));
    yield call(onSuccess, segment.segment);
  }
  catch (error) {
    yield put(Creators.createSegmentFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateSegmentRequest() {
  yield takeLatest(Types.CREATE_SEGMENT_REQUEST, createSegment);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateSegmentRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
