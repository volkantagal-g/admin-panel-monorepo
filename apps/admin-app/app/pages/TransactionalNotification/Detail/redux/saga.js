import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { getConfig, getTransactionalNotification, transactionalNotificationUpdate, getS3SignedUrl } from '@shared/api/transactionalNotification';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { uploadToS3 } from '@shared/api/upload';

function* getTransactionalNotificationRequest({ transactionalNotificationId, clientLanguage }) {
  try {
    const data = yield call(getTransactionalNotification, { id: transactionalNotificationId, clientLanguage });
    yield put(Creators.getTransactionalNotificationSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getTransactionalNotificationFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateTransactionalNotificationRequest({ id, body, clientLanguage }) {
  try {
    const data = yield call(transactionalNotificationUpdate, { id, body, clientLanguage });
    yield put(ToastCreators.success());
    yield put(Creators.updateTransactionalNotificationSuccess({ data }));
  }
  catch (error) {
    const errorMessageToastModel = error?.response?.data?.errors?.map(item => item.message);
    const errorMessage = { message: errorMessageToastModel?.toString() };
    yield put(Creators.updateTransactionalNotificationFailure({ error: errorMessage }));
    yield put(ToastCreators.error({ error: errorMessage }));
  }
}

function* getS3SignedImageUrlRequest({ loadedImage, file, fileLang, onUploadSuccess }) {
  try {
    const { name } = file;
    const { cdnUrl, signedUrl } = yield call(getS3SignedUrl, { name });
    yield call(uploadToS3, { signedUrl, data: loadedImage });

    if (onUploadSuccess) {
      onUploadSuccess({ cdnUrl });
    }

    yield put(Creators.getS3SignedImageUrlSuccess({ cdnUrl, fileLang }));
  }
  catch (error) {
    yield put(Creators.getS3SignedImageUrlFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getConfigRequest({ clientLanguage }) {
  try {
    const results = yield call(getConfig, clientLanguage);
    yield put(Creators.getConfigSuccess({ data: results }));
  }
  catch (error) {
    yield put(Creators.getConfigFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetTransactionalNotificationRequest() {
  yield takeLatest(Types.GET_TRANSACTIONAL_NOTIFICATION_REQUEST, getTransactionalNotificationRequest);
}

function* watchUpdateTransactionalNotificationRequest() {
  yield takeLatest(Types.UPDATE_TRANSACTIONAL_NOTIFICATION_REQUEST, updateTransactionalNotificationRequest);
}

function* watchGetS3SignedImageUrlRequest() {
  yield takeLatest(Types.GET_S3_SIGNED_IMAGE_URL_REQUEST, getS3SignedImageUrlRequest);
}

function* watchGetConfigRequest() {
  yield takeLatest(Types.GET_CONFIG_REQUEST, getConfigRequest);
}

export default function* transactionalNotificationRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetTransactionalNotificationRequest),
      fork(watchUpdateTransactionalNotificationRequest),
      fork(watchGetS3SignedImageUrlRequest),
      fork(watchGetConfigRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
