import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { getBanner, bannerUpdate, getS3ImageUploadUrl } from '@shared/api/banner';
import { uploadToS3 } from '@shared/api/upload';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { t } from '@shared/i18n';
import { FILE_UPLOAD_STATE_KEY } from '@app/pages/Banner/constants';
import { getConfigKey } from '@shared/api/marketConfig';
import { NormalizeBannerFormValues } from '@shared/utils/marketing/normalizers';
import { PAGE_TYPES } from '@shared/constants/marketing/pageTypes';

function* getBannerRequest({ bannerId }) {
  try {
    const { data } = yield call(getBanner, { id: bannerId });
    yield put(Creators.getBannerSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getBannerFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateBannerRequest({ id, body }) {
  try {
    const { data } = yield call(bannerUpdate, { id, body });
    yield put(ToastCreators.success());
    yield put(Creators.updateBannerSuccess({ data }));
  }
  catch (error) {
    const errorMessageToastModel = error?.response?.data?.errors?.map(item => item.message);
    const errorMessage = { message: errorMessageToastModel?.toString() };
    yield put(Creators.updateBannerFailure({ error: errorMessage }));
    yield put(ToastCreators.error({ error: errorMessage }));
  }
}

function* uploadFilesToS3Request({ content, fileStateKey, onUploadSuccess }) {
  try {
    if (fileStateKey === FILE_UPLOAD_STATE_KEY.BANNER_CONTENT_IMAGE) {
      const fileExtension = content.file.name.split('.').pop();
      const { data } = yield call(getS3ImageUploadUrl, { extension: fileExtension, language: content.fileLang });
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

export function* getGameAnimationUrlRequest({ body }) {
  try {
    const data = yield call(getConfigKey, { body });

    yield put(Creators.getGameAnimationUrlSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getGameAnimationUrlFailure({ error }));
  }
}

export function* saveGameBannerFlow({ id, values }) {
  try {
    yield put(Creators.getGameAnimationUrlRequest({
      body: {
        key: 'co:usercomms:GAME_BANNER_ANIMATION_URL',
        type: 'String',
      },
    }));

    const { data } = yield take(Types.GET_GAME_ANIMATION_URL_SUCCESS);

    let body = NormalizeBannerFormValues(values, PAGE_TYPES.BANNER_DETAIL);
    body = {
      ...body,
      contents: { en: { picUrl: data?.value || '' }, tr: { picUrl: data?.value || '' } },
    };

    yield put(Creators.updateBannerRequest({ id, body }));
  }
  catch (error) {
    yield put(Creators.getGameAnimationUrlFailure({ error }));
  }
}

function* watchSaveGameBannerFlow() {
  yield takeLatest(Types.SAVE_GAME_BANNER_FLOW, saveGameBannerFlow);
}
function* watchGetGameAnimationUrlRequest() {
  yield takeLatest(Types.GET_GAME_ANIMATION_URL_REQUEST, getGameAnimationUrlRequest);
}

function* watchGetBannerRequest() {
  yield takeLatest(Types.GET_BANNER_REQUEST, getBannerRequest);
}

function* watchUploadFilesToS3Request() {
  yield takeLatest(Types.UPLOAD_FILES_TO_S3_REQUEST, uploadFilesToS3Request);
}

function* watchUpdateBannerRequest() {
  yield takeLatest(Types.UPDATE_BANNER_REQUEST, updateBannerRequest);
}

export default function* BannerRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetBannerRequest),
      fork(watchUploadFilesToS3Request),
      fork(watchUpdateBannerRequest),
      fork(watchSaveGameBannerFlow),
      fork(watchGetGameAnimationUrlRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
