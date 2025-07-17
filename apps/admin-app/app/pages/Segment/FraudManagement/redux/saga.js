import { all, takeLatest, cancel, fork, put, take, call } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getConfigKey } from '@shared/api/marketing';

import { addClientIdsToSegment, removeClientIdsFromSegment } from '@shared/api/segments';
import { t } from '@shared/i18n';

export function* addClientsToSegmentRequest({ clientIds, segmentId, email, onSuccess }) {
  try {
    const data = yield call(addClientIdsToSegment, { clientIds, segmentId, email });
    yield put(Creators.addClientsToSegmentSuccess({ data }));

    if (onSuccess) {
      onSuccess();
    }
    yield put(ToastCreators.success({ message: t('segment:CLIENTS_ADDED_TO_SEGMENT_SUCCESSFULLY') }));
  }
  catch (error) {
    yield put(Creators.addClientsToSegmentFailure({ error, onSuccess }));
    yield put(ToastCreators.error({ message: error?.response?.data?.message }));
  }
}

export function* removeClientsFromSegmentRequest({ clientIds, segmentId, email }) {
  try {
    const data = yield call(removeClientIdsFromSegment, { clientIds, segmentId, email });
    yield put(Creators.removeClientsFromSegmentSuccess({ data }));
    yield put(ToastCreators.success({ message: t('segment:CLIENTS_REMOVED_FROM_SEGMENT_SUCCESSFULLY') }));
  }
  catch (error) {
    yield put(Creators.removeClientsFromSegmentFailure({ error }));
    yield put(ToastCreators.error({ message: error?.response?.data?.message }));
  }
}

export function* getSegmentOptionsRequest({ body }) {
  try {
    const data = yield call(getConfigKey, { body });
    yield put(Creators.getSegmentOptionsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSegmentOptionsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchAddClientsToSegmentRequest() {
  yield takeLatest(Types.ADD_CLIENTS_TO_SEGMENT_REQUEST, addClientsToSegmentRequest);
}

function* watchRemoveClientsFromSegmentRequest() {
  yield takeLatest(Types.REMOVE_CLIENTS_FROM_SEGMENT_REQUEST, removeClientsFromSegmentRequest);
}

function* watchGetSegmentOptionsRequest() {
  yield takeLatest(Types.GET_SEGMENT_OPTIONS_REQUEST, getSegmentOptionsRequest);
}

export default function* popupNewSagaRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetSegmentOptionsRequest),
      fork(watchAddClientsToSegmentRequest),
      fork(watchRemoveClientsFromSegmentRequest),

    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
