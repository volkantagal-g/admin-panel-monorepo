import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { getS3SignedUrl, transactionalNotificationSave, getConfig } from '@shared/api/transactionalNotification';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import history from '@shared/utils/history';
import { getRelativeRouteWithSlug } from '@shared/utils/common';
import { ROUTE } from '@app/routes';
import { uploadToS3 } from '@shared/api/upload';

function* transactionalNotificationSaveRequest({ body, clientLanguage }) {
  try {
    const data = yield call(transactionalNotificationSave, { body, clientLanguage });
    yield put(Creators.transactionalNotificationSaveSuccess({ data }));
    yield put(ToastCreators.success());
    history.push(getRelativeRouteWithSlug(ROUTE.TRANSACTIONAL_NOTIFICATION_DETAIL.path, { id: data.id }));
  }
  catch (error) {
    const errorMessageToastModel = error?.response?.data?.errors?.map(item => item.message);
    const errorMessage = { message: errorMessageToastModel?.toString() };
    yield put(Creators.transactionalNotificationSaveFailure({ error: errorMessage }));
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

function* watchGetConfigRequest() {
  yield takeLatest(Types.GET_CONFIG_REQUEST, getConfigRequest);
}

function* watchGetS3SignedImageUrlRequest() {
  yield takeLatest(Types.GET_S3_SIGNED_IMAGE_URL_REQUEST, getS3SignedImageUrlRequest);
}
function* watchTransactionalNotificationSaveRequest() {
  yield takeLatest(Types.TRANSACTIONAL_NOTIFICATION_SAVE_REQUEST, transactionalNotificationSaveRequest);
}

export default function* transactionalNotificationRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchTransactionalNotificationSaveRequest),
      fork(watchGetS3SignedImageUrlRequest),
      fork(watchGetConfigRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
