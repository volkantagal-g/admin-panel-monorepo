import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { communicationBulkSmsSave, getConfig, getS3CsvUploadUrl } from '@shared/api/communicationBulkSms';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { uploadToS3 } from '@shared/api/upload';

function* communicationBulkSmsSaveRequest({ body }) {
  try {
    const data = yield call(communicationBulkSmsSave, { body });
    yield put(Creators.communicationBulkSmsSaveSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessageToastModel = error?.response?.data?.message;
    const errorMessage = { message: errorMessageToastModel?.toString() };
    yield put(Creators.communicationBulkSmsSaveFailure({ error: errorMessage }));
    yield put(ToastCreators.error({ error: errorMessage }));
  }
}

export function* getConfigRequest({ clientLanguage }) {
  try {
    const results = yield call(getConfig, clientLanguage);
    yield put(Creators.getConfigSuccess({ data: results }));
  }
  catch (error) {
    yield put(Creators.getConfigFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getS3CsvUploadUrlRequest({ base64File, file }) {
  try {
    const { name } = file;
    const { fileName, signedUrl } = yield call(getS3CsvUploadUrl, { fileName: name, presignedMethodType: 'PUT' });
    yield call(uploadToS3, { signedUrl, data: base64File });
    yield put(Creators.getS3CsvUploadUrlSuccess({ name: fileName, signedUrl, originalFileName: name }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.getS3CsvUploadUrlFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchBulkSmsSaveRequest() {
  yield takeLatest(Types.COMMUNICATION_BULK_SMS_SAVE_REQUEST, communicationBulkSmsSaveRequest);
}

function* watchGetConfigRequest() {
  yield takeLatest(Types.GET_CONFIG_REQUEST, getConfigRequest);
}

function* watchgetS3CsvUploadUrlRequest() {
  yield takeLatest(Types.GET_S3_CSV_UPLOAD_URL_REQUEST, getS3CsvUploadUrlRequest);
}

export default function* communicationBulkSmsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchBulkSmsSaveRequest),
      fork(watchGetConfigRequest),
      fork(watchgetS3CsvUploadUrlRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
