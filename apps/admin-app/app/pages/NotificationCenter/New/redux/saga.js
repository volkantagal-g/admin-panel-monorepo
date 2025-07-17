import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { saveAnnouncement, getS3ImageUploadUrl } from '@shared/api/notificationCenter';
import { uploadToS3 } from '@shared/api/upload';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { FILE_UPLOAD_STATE_KEY } from '@app/pages/NotificationCenter/constants';
import { t } from '@shared/i18n';
import history from '@shared/utils/history';
import { getRelativeRouteWithSlug } from '@shared/utils/common';
import { ROUTE } from '@app/routes';

function* announcementCreateRequest({ body }) {
  try {
    const { data } = yield call(saveAnnouncement, { body });
    yield put(Creators.announcementCreateSuccess({ data }));
    yield put(ToastCreators.success());
    history.push(getRelativeRouteWithSlug(ROUTE.NOTIFICATION_CENTER_DETAIL.path, { id: data.id }));
  }
  catch (error) {
    const errorMessageToastModel = error?.response?.data?.errors?.map(item => item.message);
    const errorMessage = { message: errorMessageToastModel?.toString() };
    yield put(Creators.announcementCreateFailure({ error: errorMessage }));
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
    else {
      throw new Error('File state key required & must cover state key list');
    }
    yield put(ToastCreators.success({ message: t('marketing:UPLOAD_SUCCESS') }));
    yield put(Creators.uploadFilesToS3Success({ file: { name: content.file.name }, fileStateKey }));
  }
  catch (error) {
    yield put(Creators.uploadFilesToS3Failure({ error, fileStateKey }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUploadFilesToS3Request() {
  yield takeLatest(Types.UPLOAD_FILES_TO_S3_REQUEST, uploadFilesToS3Request);
}

function* watchAnnouncementCreateRequest() {
  yield takeLatest(Types.ANNOUNCEMENT_CREATE_REQUEST, announcementCreateRequest);
}

export default function* notificationCenterRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchUploadFilesToS3Request),
      fork(watchAnnouncementCreateRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
