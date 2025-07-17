import { all, takeLatest, takeEvery, call, cancel, fork, put, take } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { FILE_UPLOAD_TYPE } from '@app/pages/Email/constants';
import {
  getS3UploadUrl,
  getEmail,
  emailUpdate,
  previewImageRequest,
  testEmail, getStatistics,
  getTargetAudienceStatistics,
} from '@shared/api/email';
import { uploadToS3 } from '@shared/api/upload';
import { getMarketConfig } from '@shared/api/marketConfig';
import { t } from '@shared/i18n';

export function* getEmailRequest({ emailId }) {
  try {
    const { data } = yield call(getEmail, { id: emailId });
    yield put(Creators.getEmailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getEmailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* updateEmailRequest({ id, body }) {
  try {
    const { data } = yield call(emailUpdate, { id, body });
    yield put(Creators.updateEmailSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessageToastModel = error.response.data.errors.map(item => item.message);
    const errorMessage = { message: errorMessageToastModel.toString() };
    yield put(Creators.updateEmailFailure({ error: errorMessage }));
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

function* getPreviewImageRequest({ designId, domainType, phoneLanguage, emailCampaignId }) {
  try {
    const { data } = yield call(previewImageRequest, { designId, domainType, phoneLanguage, emailCampaignId });
    yield put(Creators.getPreviewImageSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPreviewImageFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* sendTestEmailRequest({ body }) {
  try {
    const { data } = yield call(testEmail, { body });
    yield put(ToastCreators.success());
    yield put(Creators.sendTestEmailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.sendTestEmailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getStatisticsRequest({ emailId }) {
  try {
    const { data } = yield call(getStatistics, { id: emailId });
    yield put(Creators.getStatisticsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getStatisticsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getTargetAuidienceStatisticsRequest({ clientListName, clientListType, campaignId }) {
  try {
    const { data } = yield call(getTargetAudienceStatistics, { clientListName, clientListType, campaignId });
    yield put(Creators.getTargetAudienceStatisticsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getTargetAudienceStatisticsFailure({ error }));
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

function* watchGetEmailConfigRequest() {
  yield takeLatest(Types.GET_EMAIL_CONFIG_REQUEST, getEmailConfigRequest);
}

function* watchGetEmailRequest() {
  yield takeLatest(Types.GET_EMAIL_REQUEST, getEmailRequest);
}

function* watchUploadFilesToS3Request() {
  yield takeLatest(Types.UPLOAD_FILES_TO_S3_REQUEST, uploadFilesToS3Request);
}

function* watchUpdateEmailRequest() {
  yield takeLatest(Types.UPDATE_EMAIL_REQUEST, updateEmailRequest);
}

function* watchGetSenderInfoFromConfigRequest() {
  yield takeEvery(Types.GET_SENDER_INFO_FROM_CONFIG_REQUEST, getSenderInfoFromConfigRequest);
}

function* watchGetPreviewImageRequest() {
  yield takeLatest(Types.GET_PREVIEW_IMAGE_REQUEST, getPreviewImageRequest);
}

function* watchSendTestEmailRequest() {
  yield takeLatest(Types.SEND_TEST_EMAIL_REQUEST, sendTestEmailRequest);
}

function* watchGetStatisticsRequest() {
  yield takeLatest(Types.GET_STATISTICS_REQUEST, getStatisticsRequest);
}

function* watchGetTargetAudienceStatistics() {
  yield takeLatest(Types.GET_TARGET_AUDIENCE_STATISTICS_REQUEST, getTargetAuidienceStatisticsRequest);
}

export default function* emailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetEmailRequest),
      fork(watchUploadFilesToS3Request),
      fork(watchUpdateEmailRequest),
      fork(watchGetSenderInfoFromConfigRequest),
      fork(watchGetPreviewImageRequest),
      fork(watchSendTestEmailRequest),
      fork(watchGetStatisticsRequest),
      fork(watchGetTargetAudienceStatistics),
      fork(watchGetEmailConfigRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
