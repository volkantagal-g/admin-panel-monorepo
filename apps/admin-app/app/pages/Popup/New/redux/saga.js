import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  createPopup,
  getS3SignedUrl,
  getConfigKey,
} from '@shared/api/popup';
import { uploadToS3 } from '@shared/api/upload';
import history from '@shared/utils/history';
import { getRelativeRouteWithSlug } from '@shared/utils/common';
import { ROUTE } from '@app/routes';

export function* createPopupRequest({ data }) {
  try {
    const { data: popupDetail } = yield call(createPopup, data);
    yield put(Creators.createPopupSuccess({ data: popupDetail }));
    yield put(ToastCreators.success());
    history.push(getRelativeRouteWithSlug(ROUTE.POPUP_DETAIL.path, { id: popupDetail.id }));
  }
  catch (error) {
    yield put(Creators.createPopupFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getS3SignedImageUrlRequest({ loadedImage, file, fileLang, onUploadSuccess }) {
  try {
    const fileExtension = file.name.split('.').pop();
    const { data } = yield call(getS3SignedUrl, { fileExtension });
    const { cdnUrl, signedUrl } = data;
    yield call(uploadToS3, { signedUrl, data: loadedImage });
    if (onUploadSuccess) {
      onUploadSuccess({ cdnUrl, imageName: data?.imgName });
    }

    yield put(Creators.getS3SignedImageUrlSuccess({ cdnUrl, fileLang }));
  }
  catch (error) {
    yield put(Creators.getS3SignedImageUrlFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getConfigKeyRequest({ body }) {
  try {
    const data = yield call(getConfigKey, { body });
    yield put(Creators.getConfigKeySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getConfigKeyFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreatePopupRequest() {
  yield takeLatest(Types.CREATE_POPUP_REQUEST, createPopupRequest);
}

function* watchGetS3SignedImageUrlRequest() {
  yield takeLatest(Types.GET_S3_SIGNED_IMAGE_URL_REQUEST, getS3SignedImageUrlRequest);
}

function* watchGetConfigKeyRequest() {
  yield takeLatest(Types.GET_CONFIG_KEY_REQUEST, getConfigKeyRequest);
}

export default function* popupNewSagaRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreatePopupRequest),
      fork(watchGetS3SignedImageUrlRequest),
      fork(watchGetConfigKeyRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
