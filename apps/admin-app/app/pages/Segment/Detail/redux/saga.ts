import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  getSegment as getSegmentApi,
  getSegmentClientCount as getSegmentClientCountApi,
  updateSegment as updateSegmentApi,
  deleteSegment as deleteSegmentApi,
  resetClientsOfSegment as resetClientsOfSegmentApi,
  updateExpirationStatus as updateExpirationStatusApi,
  updateIndefiniteExpiration as updateIndefiniteExpirationApi,
} from '@shared/api/segments';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getSegment({ segment }) {
  try {
    const data = yield call(getSegmentApi, { segment });
    yield put(Creators.getSegmentSuccess({ data: data.segment }));
  }
  catch (error) {
    yield put(Creators.getSegmentFailure({ error }));
  }
}

function* getSegmentClientCount({ segment }) {
  try {
    const { count } = yield call(getSegmentClientCountApi, { segment });
    yield put(Creators.getSegmentClientCountSuccess({ data: count }));
  }
  catch (error) {
    yield put(Creators.getSegmentClientCountFailure({ error }));
  }
}

function* updateSegment({ segment, updateData }) {
  try {
    const data = yield call(updateSegmentApi, { segmentNumber: segment, updateData });
    yield put(Creators.updateSegmentSuccess({ data: data.segment }));
  }
  catch (error) {
    yield put(Creators.updateSegmentFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* deleteSegment({ segment, onSuccess }) {
  try {
    const { data } = yield call(deleteSegmentApi, { segmentNumber: segment });
    yield put(Creators.deleteSegmentSuccess({ data }));
    yield call(onSuccess);
  }
  catch (error) {
    yield put(Creators.deleteSegmentFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* resetClientsOfSegment({ segment }: { segment: number }) {
  try {
    yield call(resetClientsOfSegmentApi, { segmentNumber: segment });
    yield put(Creators.resetClientsOfSegmentSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.resetClientsOfSegmentFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateExpirationStatusRequest({ segment, updateData }) {
  try {
    const data = yield call(updateExpirationStatusApi, { segmentNumber: segment, updateData });
    yield put(Creators.updateExpirationStatusSuccess({ data: data.segment }));
  }
  catch (error) {
    yield put(Creators.updateExpirationStatusFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateIndefiniteExpirationRequest({ segment, updateData }) {
  try {
    const data = yield call(updateIndefiniteExpirationApi, { segmentNumber: segment, updateData });
    yield put(Creators.updateIndefiniteExpirationSuccess({ data: data.segment }));
  }
  catch (error) {
    yield put(Creators.updateIndefiniteExpirationFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetSegmentRequest() {
  yield takeLatest(Types.GET_SEGMENT_REQUEST, getSegment);
}

function* watchGetSegmentClientCount() {
  yield takeLatest(Types.GET_SEGMENT_CLIENT_COUNT_REQUEST, getSegmentClientCount);
}

function* watchUpdateSegmentRequest() {
  yield takeLatest(Types.UPDATE_SEGMENT_REQUEST, updateSegment);
}

function* watchDeleteSegmentRequest() {
  yield takeLatest(Types.DELETE_SEGMENT_REQUEST, deleteSegment);
}

function* watchResetClientsOfSegmentRequest() {
  yield takeLatest(Types.RESET_CLIENTS_OF_SEGMENT_REQUEST, resetClientsOfSegment);
}

function* watchUpdateExpirationStatusRequest() {
  yield takeLatest(Types.UPDATE_EXPIRATION_STATUS_REQUEST, updateExpirationStatusRequest);
}

function* watchUpdateIndefiniteExpirationRequest() {
  yield takeLatest(Types.UPDATE_INDEFINITE_EXPIRATION_REQUEST, updateIndefiniteExpirationRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetSegmentRequest),
      fork(watchGetSegmentClientCount),
      fork(watchUpdateSegmentRequest),
      fork(watchDeleteSegmentRequest),
      fork(watchResetClientsOfSegmentRequest),
      fork(watchUpdateExpirationStatusRequest),
      fork(watchUpdateIndefiniteExpirationRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
