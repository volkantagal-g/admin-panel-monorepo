import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { announcementSave, getS3ImageUploadUrl } from '@shared/api/announcement';
import { uploadToS3 } from '@shared/api/upload';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { FILE_UPLOAD_STATE_KEY } from '@app/pages/Announcement/constants';
import { t } from '@shared/i18n';
import history from '@shared/utils/history';
import { getRelativeRouteWithSlug } from '@shared/utils/common';
import { ROUTE } from '@app/routes';

function* announcementSaveRequest({ body }) {
  try {
    const { data } = yield call(announcementSave, { body });
    yield put(Creators.announcementSaveSuccess({ data }));
    yield put(ToastCreators.success());
    history.push(getRelativeRouteWithSlug(ROUTE.ANNOUNCEMENT_DETAIL.path, { id: data.id }));
  }
  catch (error) {
    const errorMessageToastModel = error?.response?.data?.errors?.map(item => item.message);
    const errorMessage = { message: errorMessageToastModel?.toString() };
    yield put(Creators.announcementSaveFailure({ error: errorMessage }));
    yield put(ToastCreators.error({ error: errorMessage }));
  }
}

function* uploadFilesToS3Request({ content, fileStateKey, onUploadSuccess }) {
  try {
    if (fileStateKey === FILE_UPLOAD_STATE_KEY.ANNOUNCEMENT_CONTENT_IMAGE) {
      const fileExtension = content.file.name.split('.').pop();
      const { data } = yield call(getS3ImageUploadUrl, { extension: fileExtension, language: content.fileLang });
      yield call(uploadToS3, { signedUrl: data.signedUrl, data: content.loadedImage });
      if (onUploadSuccess) {
        onUploadSuccess({ cdnUrl: data.cdnUrl });
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

function* watchAnnouncementSaveRequest() {
  yield takeLatest(Types.ANNOUNCEMENT_SAVE_REQUEST, announcementSaveRequest);
}

export default function* announcementRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchUploadFilesToS3Request),
      fork(watchAnnouncementSaveRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
