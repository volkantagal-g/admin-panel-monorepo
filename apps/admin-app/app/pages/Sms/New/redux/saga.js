import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { smsSave, getS3UploadUrl } from '@shared/api/sms';
import { uploadToS3 } from '@shared/api/upload';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { FILE_UPLOAD_TYPE } from '@app/pages/Sms/constants';
import { t } from '@shared/i18n';
import history from '@shared/utils/history';
import { getRelativeRouteWithSlug } from '@shared/utils/common';
import { ROUTE } from '@app/routes';
import { getMarketConfig } from '@shared/api/marketConfig';

export function* smsSaveRequest({ body }) {
  try {
    const { data } = yield call(smsSave, { body });
    yield put(Creators.smsSaveSuccess({ data }));
    yield put(ToastCreators.success());
    history.push(getRelativeRouteWithSlug(ROUTE.SMS_DETAIL.path, { id: data.id }));
  }
  catch (error) {
    const errorMessageToastModel = error?.response?.data?.errors?.map(item => item.message);
    const errorMessage = { message: errorMessageToastModel?.toString() };
    yield put(Creators.smsSaveFailure({ error: errorMessage }));
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

function* watchUploadFilesToS3Request() {
  yield takeLatest(Types.UPLOAD_FILES_TO_S3_REQUEST, uploadFilesToS3Request);
}

function* watchSmsSaveRequest() {
  yield takeLatest(Types.SMS_SAVE_REQUEST, smsSaveRequest);
}

function* watchGetSmsConfigRequest() {
  yield takeLatest(Types.GET_SMS_CONFIG_REQUEST, getSmsConfigRequest);
}

export default function* smsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchUploadFilesToS3Request),
      fork(watchSmsSaveRequest),
      fork(watchGetSmsConfigRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
