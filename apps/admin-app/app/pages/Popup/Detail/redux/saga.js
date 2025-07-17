import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators, Types } from '@app/pages/Popup/Detail/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getPopup,
  getS3SignedUrl,
  updatePopup,
} from '@shared/api/popup';
import { uploadToS3 } from '@shared/api/upload';

export function* getPopupRequest({ popupId }) {
  try {
    const data = yield call(getPopup, { popupId });
    yield put(Creators.getPopupSuccess({ ...data }));
  }
  catch (error) {
    yield put(Creators.getPopupFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* updatePopupRequest({ data, popupId }) {
  try {
    const { data: popupDetail } = yield call(updatePopup, { id: popupId, data });
    yield put(Creators.updatePopupSuccess({ popupDetail }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updatePopupFailure({ error }));
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

function* cancelWarehouseRequest() {
  const task = yield fork(watchCancelWarehouseRequest);
  yield cancel(task);
}

function* watchGetPopupRequest() {
  yield takeLatest(Types.GET_POPUP_REQUEST, getPopupRequest);
}

function* watchUpdatePopupRequest() {
  yield takeLatest(Types.UPDATE_POPUP_REQUEST, updatePopupRequest);
}

function* watchGetS3SignedImageUrlRequest() {
  yield takeLatest(Types.GET_S3_SIGNED_IMAGE_URL_REQUEST, getS3SignedImageUrlRequest);
}

function* watchCancelWarehouseRequest() {
  yield takeLatest(Types.CANCEL_WAREHOUSE_REQUEST, cancelWarehouseRequest);
}

export default function* popupDetailSagaRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetPopupRequest),
      fork(watchUpdatePopupRequest),
      fork(watchGetS3SignedImageUrlRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
