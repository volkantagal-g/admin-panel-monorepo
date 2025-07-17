import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { getAnnouncement, updateAnnouncement, getS3ImageUploadUrl } from '@shared/api/notificationCenter';
import { uploadToS3 } from '@shared/api/upload';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { t } from '@shared/i18n';
import { FILE_UPLOAD_STATE_KEY } from '@app/pages/NotificationCenter/constants';

function* getAnnouncementRequest({ announcementId }) {
  try {
    const { data } = yield call(getAnnouncement, { id: announcementId });
    yield put(Creators.getAnnouncementSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAnnouncementFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateAnnouncementRequest({ id, body }) {
  try {
    const { data } = yield call(updateAnnouncement, { id, body });
    yield put(ToastCreators.success());
    yield put(Creators.updateAnnouncementSuccess({ data }));
  }
  catch (error) {
    const errorMessageToastModel = error?.response?.data?.errors?.map(item => item.message);
    const errorMessage = { message: errorMessageToastModel?.toString() };
    yield put(Creators.updateAnnouncementFailure({ error: errorMessage }));
    yield put(ToastCreators.error({ error: errorMessage }));
  }
}

function* uploadFilesToS3Request({ content, fileStateKey, onUploadSuccess }) {
  try {
    if (fileStateKey === FILE_UPLOAD_STATE_KEY.NOTIFICATION_CENTER_CONTENT_IMAGE) {
      const fileExtension = content?.file.name.split('.').pop();
      const { data } = yield call(getS3ImageUploadUrl, { fileExtension, language: content.fileLang, type: 'PROMO' });
      yield call(uploadToS3, { signedUrl: data.signedUrl, data: content.loadedImage });
      if (onUploadSuccess) {
        onUploadSuccess({ cdnUrl: data.cdnUrl, imageName: data.imageName });
      }
    }
    yield put(ToastCreators.success({ message: t('marketing:UPLOAD_SUCCESS') }));
    yield put(Creators.uploadFilesToS3Success({ file: { name: content.file.name }, fileStateKey }));
  }
  catch (error) {
    yield put(Creators.uploadFilesToS3Failure({ error, fileStateKey }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetAnnouncementRequest() {
  yield takeLatest(Types.GET_ANNOUNCEMENT_REQUEST, getAnnouncementRequest);
}

function* watchUploadFilesToS3Request() {
  yield takeLatest(Types.UPLOAD_FILES_TO_S3_REQUEST, uploadFilesToS3Request);
}

function* watchUpdateAnnouncementRequest() {
  yield takeLatest(Types.UPDATE_ANNOUNCEMENT_REQUEST, updateAnnouncementRequest);
}

export default function* NotificationCenterRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetAnnouncementRequest),
      fork(watchUploadFilesToS3Request),
      fork(watchUpdateAnnouncementRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
