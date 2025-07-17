import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Types, Creators } from './actions';
import { uploadToS3 } from '@shared/api/upload';
import { getUploadSignedUrl } from '@shared/api/promo';

function* getUploadDocumentURLRequest({ body }) {
  try {
    const {
      fileName,
      folder,
      bucket,
      contentType,
      base64,
    } = body;

    const { url: signedUrl, cdnUrl } = yield call(getUploadSignedUrl, {
      fileName,
      contentType,
      folderPath: folder,
      bucketName: bucket,
    });
    yield call(uploadToS3, { signedUrl, data: base64 });
    yield put(Creators.getUploadDocumentURLSuccess({ data: { cdnUrl } }));
  }
  catch (error) {
    yield put(Creators.getUploadDocumentURLFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetUploadDocumentURLRequest() {
  yield takeLatest(Types.GET_UPLOAD_DOCUMENT_URL_REQUEST, getUploadDocumentURLRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetUploadDocumentURLRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
