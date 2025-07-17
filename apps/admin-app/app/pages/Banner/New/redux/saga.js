import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { bannerSave, getS3ImageUploadUrl } from '@shared/api/banner';
import { uploadToS3 } from '@shared/api/upload';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { FILE_UPLOAD_STATE_KEY } from '@app/pages/Banner/constants';
import { t } from '@shared/i18n';
import history from '@shared/utils/history';
import { getRelativeRouteWithSlug } from '@shared/utils/common';
import { ROUTE } from '@app/routes';
import { getConfigKey } from '@shared/api/marketing';
import { PAGE_TYPES } from '@shared/constants/marketing/pageTypes';
import { NormalizeBannerFormValues } from '@shared/utils/marketing/normalizers';

function* bannerSaveRequest({ body }) {
  try {
    let bannerPayload = yield call(bannerSave, { body });
    bannerPayload = bannerPayload?.data;
    yield put(Creators.bannerSaveSuccess({ bannerPayload }));
    history.push(getRelativeRouteWithSlug(ROUTE.BANNER_DETAIL.path, { id: bannerPayload.id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessageToastModel = error?.response?.data?.errors?.map(item => item.message);
    const errorMessage = { message: errorMessageToastModel?.toString() };
    yield put(Creators.bannerSaveFailure({ error: errorMessage }));
    yield put(ToastCreators.error({ error: errorMessage }));
  }
}

function* uploadFilesToS3Request({ content, fileStateKey, onUploadSuccess }) {
  try {
    if (fileStateKey === FILE_UPLOAD_STATE_KEY.BANNER_CONTENT_IMAGE) {
      const fileExtension = content.file.name.split('.').pop();
      const { data } = yield call(getS3ImageUploadUrl, { extension: fileExtension, language: content.fileLang });

      yield call(uploadToS3, { signedUrl: data.signedUrl, data: content.loadedImage });
      // TODO: This flow needs to be change on future dev
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

export function* getGameAnimationUrlRequest({ body }) {
  try {
    const data = yield call(getConfigKey, { body });

    yield put(Creators.getGameAnimationUrlSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getGameAnimationUrlFailure({ error }));
  }
}

export function* saveGameBannerFlow({ values }) {
  try {
    yield put(Creators.getGameAnimationUrlRequest({
      body: {
        key: 'co:usercomms:GAME_BANNER_ANIMATION_URL',
        type: 'String',
      },
    }));

    const { data } = yield take(Types.GET_GAME_ANIMATION_URL_SUCCESS);

    let body = NormalizeBannerFormValues(values, PAGE_TYPES.BANNER_NEW);
    body = {
      ...body,
      contents: { en: { picUrl: data?.value || '' }, tr: { picUrl: data?.value || '' } },
    };

    yield put(Creators.bannerSaveRequest({ body }));
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

function* watchUploadFilesToS3Request() {
  yield takeLatest(Types.UPLOAD_FILES_TO_S3_REQUEST, uploadFilesToS3Request);
}

function* watchBannerSaveRequest() {
  yield takeLatest(Types.BANNER_SAVE_REQUEST, bannerSaveRequest);
}

export default function* bannerRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchUploadFilesToS3Request),
      fork(watchBannerSaveRequest),
      fork(watchSaveGameBannerFlow),
      fork(watchGetGameAnimationUrlRequest),

    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
