import { take, cancel, all, put, call, takeLatest, fork } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getConfigKey,
  getUploadSignedUrl,
  updateMobileAnimationConfig,
} from '@shared/api/marketConfig';
import { uploadToS3 } from '@shared/api/upload';
import { t } from '@shared/i18n';

function* getConfigGeneralKeyRequest({ body }) {
  try {
    const data = yield call(getConfigKey, { body });
    yield put(Creators.getConfigGeneralKeySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getConfigGeneralKeyFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getConfigSplashKeyRequest({ body }) {
  try {
    const data = yield call(getConfigKey, { body });
    yield put(Creators.getConfigSplashKeySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getConfigSplashKeyFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getConfigOnBoardingKeyRequest({ body }) {
  try {
    const data = yield call(getConfigKey, { body });
    yield put(Creators.getConfigOnBoardingKeySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getConfigOnBoardingKeyFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* uploadConfigJsonFileRequest({ data, langKey, fileName, contentType, folderPath, bucketName }) {
  try {
    const urlData = yield call(getUploadSignedUrl, { fileName, contentType, folderPath, bucketName });
    const { url } = urlData;
    yield call(uploadToS3, { signedUrl: url, data });
    yield put(Creators.uploadConfigJsonFileSuccess({ data: { urlData, langKey } }));
    yield put(ToastCreators.success({ message: t('configPage:FILE_UPLOAD_SUCCESS') }));
  }
  catch (error) {
    yield put(Creators.uploadConfigJsonFileFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateConfigKeyRequest({ __v, key, configType, isCustomEnabled, value }) {
  try {
    const data = yield call(updateMobileAnimationConfig, { __v, key, isCustomEnabled, value, type: configType });
    yield put(Creators.updateConfigKeySuccess({ data }));
    yield put(ToastCreators.success({ message: t('configPage:FILE_UPLOAD_SUCCESS') }));
  }
  catch (error) {
    yield put(Creators.updateConfigKeyFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateConfigKeyRequest() {
  yield takeLatest(Types.UPDATE_CONFIG_KEY_REQUEST, updateConfigKeyRequest);
}

function* watchUploadConfigJsonFileRequest() {
  yield takeLatest(Types.UPLOAD_CONFIG_JSON_FILE_REQUEST, uploadConfigJsonFileRequest);
}

function* watchGetConfigGeneralKeyRequest() {
  yield takeLatest(Types.GET_CONFIG_GENERAL_KEY_REQUEST, getConfigGeneralKeyRequest);
}

function* watchGetConfigSplashKeyRequest() {
  yield takeLatest(Types.GET_CONFIG_SPLASH_KEY_REQUEST, getConfigSplashKeyRequest);
}

function* watchGetConfigOnBoardingKeyRequest() {
  yield takeLatest(Types.GET_CONFIG_ON_BOARDING_KEY_REQUEST, getConfigOnBoardingKeyRequest);
}

export default function* mobileAnimationRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetConfigGeneralKeyRequest),
      fork(watchGetConfigSplashKeyRequest),
      fork(watchGetConfigOnBoardingKeyRequest),
      fork(watchUploadConfigJsonFileRequest),
      fork(watchUpdateConfigKeyRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
