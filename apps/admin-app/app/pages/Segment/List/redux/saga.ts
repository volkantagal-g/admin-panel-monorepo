import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { chunk } from 'lodash';

import {
  getSegments as getSegmentsApi,
  deleteSegment as deleteSegmentApi,
  removeSegmentFromClients as removeSegmentFromClientsApi,
  getSignedUploadUrl, triggerClientAddSegment,
  resetClientsOfSegment as resetClientsOfSegmentApi, sendStats,
} from '@shared/api/segments';
import { uploadToS3 } from '@shared/api/upload';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Types, Creators } from './actions';
import { t } from '@shared/i18n.ts';

const CHUNK_SIZE = 20_000;

function* getSegments({ limit, offset, search }) {
  try {
    const { segments, totalCount } = yield call(getSegmentsApi, { limit, offset, search });
    yield put(Creators.getSegmentsSuccess({ data: segments, totalCount }));
  }
  catch (error) {
    yield put(Creators.getSegmentsFailure({ error }));
  }
}

function* deleteSegment({ segment }) {
  try {
    const data = yield call(deleteSegmentApi, { segmentNumber: segment });
    yield put(Creators.deleteSegmentSuccess({ data }));
    yield put(Creators.getSegmentsRequest());
  }
  catch (error) {
    yield put(Creators.deleteSegmentFailure({ error }));
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

function* addSegmentToClients({ segment, loadedFile, loadedBase64File, onFinish }) {
  try {
    const { url: signedUrl, fileKey } = yield call(getSignedUploadUrl, {
      fileName: `${segment}_${moment().valueOf()}`,
      contentType: loadedFile.type,
      folderPath: 'clientLists',
    });
    yield call(uploadToS3, { signedUrl, data: loadedBase64File });
    yield call(triggerClientAddSegment, {
      awsPath: fileKey.replace('clientList/', ''),
      segment,
    });
    yield put(Creators.addSegmentToClientsSuccess());
  }
  catch (error) {
    yield put(Creators.addSegmentToClientsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
  finally {
    yield call(onFinish);
  }
}

function* removeSegmentFromClients({ pendingMessage, segment, clientIds, onFinish }) {
  let toastId = null;
  try {
    if (clientIds.length >= CHUNK_SIZE) {
      toastId = `remove_segment_from_clients_pending:${segment}`;
      yield put(ToastCreators.pending({ message: pendingMessage(CHUNK_SIZE), toastOptions: { autoClose: false, toastId } }));
    }

    const chunkedClientIds = chunk(clientIds, CHUNK_SIZE);
    for (let i = 0; i < chunkedClientIds.length; i++) {
      yield call(removeSegmentFromClientsApi, { segment, clientIds: chunkedClientIds[i] });
    }

    yield put(Creators.removeSegmentFromClientsSuccess());
  }
  catch (error) {
    yield put(Creators.removeSegmentFromClientsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
  finally {
    yield put(ToastCreators.dismiss({ toastId }));
    yield call(onFinish);
  }
}

function* sendSegmentListAudienceInfoMail({ segmentNumbers, email, onSuccess }) {
  try {
    yield call(sendStats, { segmentNumbers, email });
    yield put(ToastCreators.success({ message: t('segment:SEGMENT_STATS_REQUEST_SUCCESSFULLY_SENT') }));
    if (onSuccess) {
      onSuccess();
    }
    yield put(Creators.sendSegmentListAudienceInfoMailSuccess());
  }
  catch (error) {
    yield put(Creators.sendSegmentListAudienceInfoMailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetSegmentsRequest() {
  yield takeLatest(Types.GET_SEGMENTS_REQUEST, getSegments);
}

function* watchDeleteSegmentRequest() {
  yield takeLatest(Types.DELETE_SEGMENT_REQUEST, deleteSegment);
}

function* watchResetClientsOfSegmentRequest() {
  yield takeLatest(Types.RESET_CLIENTS_OF_SEGMENT_REQUEST, resetClientsOfSegment);
}

function* watchAddSegmentToClientsRequest() {
  yield takeLatest(Types.ADD_SEGMENT_TO_CLIENTS_REQUEST, addSegmentToClients);
}

function* watchRemoveSegmentFromClientsRequest() {
  yield takeLatest(Types.REMOVE_SEGMENT_FROM_CLIENTS_REQUEST, removeSegmentFromClients);
}

function* watchSendSegmentListAudienceInfoMailRequest() {
  yield takeLatest(Types.SEND_SEGMENT_LIST_AUDIENCE_INFO_MAIL_REQUEST, sendSegmentListAudienceInfoMail);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetSegmentsRequest),
      fork(watchDeleteSegmentRequest),
      fork(watchResetClientsOfSegmentRequest),
      fork(watchAddSegmentToClientsRequest),
      fork(watchRemoveSegmentFromClientsRequest),
      fork(watchSendSegmentListAudienceInfoMailRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
