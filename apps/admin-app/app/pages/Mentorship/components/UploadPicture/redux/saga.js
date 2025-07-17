import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { getUploadPictureURL as getUploadPictureURLApi } from '@shared/api/mentorship';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { uploadToS3 } from '@shared/api/upload';

import { Types, Creators } from './actions';

function* getUploadPictureURLRequest({ file, callback }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();
    const {
      name,
      contentType,
      base64,
    } = file;

    const { url, cdnUrl } = yield call(getUploadPictureURLApi, { cancelSource, name, contentType });
    yield call(uploadToS3, { signedUrl: url, data: base64 });
    yield put(Creators.getUploadPictureURLSuccess({ url: cdnUrl }));
    callback(cdnUrl);
  }
  catch (error) {
    yield put(Creators.getUploadPictureURLFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetUploadPictureURLRequest() {
  yield takeLatest(Types.GET_UPLOAD_PICTURE_URL_REQUEST, getUploadPictureURLRequest);
}

export default function* uploadPictureRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetUploadPictureURLRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
