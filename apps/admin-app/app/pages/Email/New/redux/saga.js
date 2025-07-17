import { all, takeLatest, call, cancel, fork, put, take, takeEvery } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { FILE_UPLOAD_TYPE } from '@app/pages/Email/constants';
import history from '@shared/utils/history';
import { ROUTE } from '@app/routes';
import { emailSave, getS3UploadUrl, previewImageRequest } from '@shared/api/email';
import { uploadToS3 } from '@shared/api/upload';
import { getRelativeRouteWithSlug } from '@shared/utils/common';
import { getMarketConfig } from '@shared/api/marketConfig';
import { t } from '@shared/i18n';

export function* emailSaveRequest({ body }) {
  try {
    const { data } = yield call(emailSave, body);
    yield put(Creators.emailSaveSuccess({ data }));
    yield put(ToastCreators.success());
    history.push(getRelativeRouteWithSlug(ROUTE.EMAIL_DETAIL.path, { id: data.id }));
  }
  catch (error) {
    const errorMessageToastModel = error.response.data.errors.map(item => item.message);
    const errorMessage = { message: errorMessageToastModel.toString() };
    yield put(Creators.emailSaveFailure({ error: errorMessage }));
    yield put(ToastCreators.error({ error: errorMessage }));
  }
}

function* uploadFilesToS3Request({ file, fileStateKey }) {
  try {
    if (fileStateKey === FILE_UPLOAD_TYPE.CLIENT_IMPORT_TEMPLATE || FILE_UPLOAD_TYPE.EXCLUDED_CLIENT_IMPORT_TEMPLATE) {
      const urlData = yield call(getS3UploadUrl, { csvName: file.name });
      yield call(uploadToS3, { signedUrl: urlData.data, data: file.base64 });
    }
    yield put(ToastCreators.success({ message: t('marketing:UPLOAD_SUCCESS') }));
    yield put(Creators.uploadFilesToS3Success({ file: { name: file.name }, fileStateKey }));
  }
  catch (error) {
    yield put(Creators.uploadFilesToS3Failure({ error, fileStateKey }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getSenderInfoFromConfigRequest({ body, stateKey }) {
  const { key, type } = body;
  try {
    const data = yield call(getMarketConfig, { key, type });
    yield put(Creators.getSenderInfoFromConfigSuccess({ data, stateKey }));
  }
  catch (error) {
    yield put(Creators.getSenderInfoFromConfigFailure({ error, stateKey }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getPreviewImageRequest({ designId, domainType }) {
  try {
    const { data } = yield call(previewImageRequest, { designId, domainType });
    yield put(Creators.getPreviewImageSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPreviewImageFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getEmailConfigRequest({ body }) {
  const { key, type } = body;
  try {
    const data = yield call(getMarketConfig, { key, type });
    yield put(Creators.getEmailConfigSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getEmailConfigFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUploadFilesToS3Request() {
  yield takeLatest(Types.UPLOAD_FILES_TO_S3_REQUEST, uploadFilesToS3Request);
}

function* watchEmailSaveRequest() {
  yield takeLatest(Types.EMAIL_SAVE_REQUEST, emailSaveRequest);
}

function* watchGetSenderInfoFromConfigRequest() {
  yield takeEvery(Types.GET_SENDER_INFO_FROM_CONFIG_REQUEST, getSenderInfoFromConfigRequest);
}

function* watchGetPreviewImageRequest() {
  yield takeLatest(Types.GET_PREVIEW_IMAGE_REQUEST, getPreviewImageRequest);
}

function* watchGetEmailConfigRequest() {
  yield takeLatest(Types.GET_EMAIL_CONFIG_REQUEST, getEmailConfigRequest);
}

export default function* emailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchUploadFilesToS3Request),
      fork(watchEmailSaveRequest),
      fork(watchGetSenderInfoFromConfigRequest),
      fork(watchGetPreviewImageRequest),
      fork(watchGetEmailConfigRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
