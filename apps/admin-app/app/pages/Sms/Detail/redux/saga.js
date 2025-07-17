import { all, takeLatest, call, cancel, fork, put, take, takeEvery } from 'redux-saga/effects';

import {
  getS3UploadUrl,
  getSms,
  smsUpdate,
  sendTestSms,
  getStatistics,
  getTargetAudienceStatistics,
  validateContent,
} from '@shared/api/sms';
import { uploadToS3 } from '@shared/api/upload';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { FILE_UPLOAD_TYPE } from '@app/pages/Sms/constants';
import { t } from '@shared/i18n';
import { getMarketConfig } from '@shared/api/marketConfig';

export function* getSmsRequest({ smsId }) {
  try {
    const { data } = yield call(getSms, { id: smsId });
    yield put(Creators.getSmsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSmsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* updateSmsRequest({ id, body }) {
  try {
    const { data } = yield call(smsUpdate, { id, body });
    yield put(Creators.updateSmsSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessageToastModel = error?.response?.data?.errors?.map(item => item.message);
    const errorMessage = { message: errorMessageToastModel?.toString() };
    yield put(Creators.updateSmsFailure({ error: errorMessage }));
    yield put(ToastCreators.error({ error: errorMessage }));
  }
}

function* uploadFilesToS3Request({ file, fileStateKey }) {
  try {
    if (fileStateKey === FILE_UPLOAD_TYPE.USER_LIST || FILE_UPLOAD_TYPE.EXCLUDED_USER_LIST) {
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

function* sendTestSmsRequest({ id, phoneNumbers }) {
  try {
    const formattedPhoneNumbers = phoneNumbers.map(phoneNumber => {
      // Remove spaces from phone numbers
      return phoneNumber.replace(/\s/g, '');
    });
    const { data } = yield call(sendTestSms, { id, phoneNumbers: formattedPhoneNumbers });
    yield put(ToastCreators.success());
    yield put(Creators.sendTestSmsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.sendTestSmsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getStatisticsRequest({ smsId }) {
  try {
    const { data } = yield call(getStatistics, { id: smsId });
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

function* validateContentRequest({ message, lang }) {
  try {
    const { data } = yield call(validateContent, { content: message });
    yield put(Creators.validateContentSuccess({ data, lang }));
  }
  catch (error) {
    yield put(Creators.validateContentFailure({ error, lang }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getSmsConfigRequest({ body }) {
  const { key, type } = body;
  try {
    const data = yield call(getMarketConfig, { key, type });
    yield put(Creators.getSmsConfigSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSmsConfigFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetSmsRequest() {
  yield takeLatest(Types.GET_SMS_REQUEST, getSmsRequest);
}

function* watchUploadFilesToS3Request() {
  yield takeLatest(Types.UPLOAD_FILES_TO_S3_REQUEST, uploadFilesToS3Request);
}

function* watchUpdateSmsRequest() {
  yield takeLatest(Types.UPDATE_SMS_REQUEST, updateSmsRequest);
}

function* watchTestSmsRequest() {
  yield takeLatest(Types.SEND_TEST_SMS_REQUEST, sendTestSmsRequest);
}

function* watchGetStatisticsRequest() {
  yield takeLatest(Types.GET_STATISTICS_REQUEST, getStatisticsRequest);
}

function* watchGetTargetAudienceStatistics() {
  yield takeLatest(Types.GET_TARGET_AUDIENCE_STATISTICS_REQUEST, getTargetAuidienceStatisticsRequest);
}

function* watchValidateContentRequest() {
  yield takeEvery(Types.VALIDATE_CONTENT_REQUEST, validateContentRequest);
}

function* watchGetSmsConfigRequest() {
  yield takeLatest(Types.GET_SMS_CONFIG_REQUEST, getSmsConfigRequest);
}

export default function* smsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetSmsRequest),
      fork(watchUploadFilesToS3Request),
      fork(watchUpdateSmsRequest),
      fork(watchTestSmsRequest),
      fork(watchGetStatisticsRequest),
      fork(watchGetTargetAudienceStatistics),
      fork(watchValidateContentRequest),
      fork(watchGetSmsConfigRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
