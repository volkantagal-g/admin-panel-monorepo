import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { base64ToBinary, getHeaderFromBase64 } from '@shared/utils/upload';
import { Types, Creators } from './actions';
import {
  getDtsViolation as getDtsViolationApi,
  updateDtsViolation as updateDtsViolationApi,
  getSignedUrlForViolation as getSignedUrlForViolationApi,
  updateDtsViolationDecision as updateDtsViolationDecisionApi,
  getSignedUrlUploadForViolation as getSignedUrlUploadForViolationApi,
} from '@shared/api/dts';

function* getDtsDetailRequest({ id }) {
  try {
    const { dtsViolation: data } = yield call(getDtsViolationApi, { id });
    yield put(Creators.getDtsDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getDtsDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateDtsDetailRequest({ data }) {
  try {
    const filesAlreadyUploaded = [];
    const filesWillBeUploaded = [];
    const { files } = data;
    files.forEach(file => {
      if (Object.prototype.hasOwnProperty.call(file, '_id')) {
        filesAlreadyUploaded.push({ name: file.name, url: file.url });
      }
      else {
        filesWillBeUploaded.push(file);
      }
    });
    const signedUrlsCall = yield filesWillBeUploaded.map(file => {
      return call(getSignedUrlUploadForViolationApi, { contentType: file.type, fileName: file.name });
    });

    const signedUrlsAndFileKeys = yield all(signedUrlsCall);
    let filesUploaded = [];

    if (filesWillBeUploaded.length) {
      filesUploaded = yield all(signedUrlsAndFileKeys.map((signedUrlAndFileKey, index) => {
        const { url, fileKey } = signedUrlAndFileKey;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(filesWillBeUploaded[index]);
        return new Promise((resolve, reject) => {
          fileReader.onloadend = async e => {
            const { result } = e.target;
            try {
              await axios.put(url, base64ToBinary(result), { headers: getHeaderFromBase64(result) });
              resolve({ name: filesWillBeUploaded[index].name, url: fileKey });
            }
            catch (error) {
              reject(error);
            }
            fileReader.onerror = reject;
          };
        });
      }));
    }
    yield call(updateDtsViolationApi, { data: { ...data, files: [...filesAlreadyUploaded, ...filesUploaded] } });
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.updateDtsDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateDtsDecisionRequest({ data }) {
  try {
    yield call(updateDtsViolationDecisionApi, { data });
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.updateDtsDecisionFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* downloadSignedFileRequest({ url }) {
  try {
    const { signedUrl } = yield call(getSignedUrlForViolationApi, { url });
    window.open(signedUrl);
    yield put(Creators.downloadSignedFileSuccess());
  }
  catch (error) {
    yield put(Creators.downloadSignedFileFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetDtsDetailRequest() {
  yield takeLatest(Types.GET_DTS_DETAIL_REQUEST, getDtsDetailRequest);
}

function* watchUpdateDtsDetailRequest() {
  yield takeLatest(Types.UPDATE_DTS_DETAIL_REQUEST, updateDtsDetailRequest);
}

function* watchDownloadSignedFileRequest() {
  yield takeLatest(Types.DOWNLOAD_SIGNED_FILE_REQUEST, downloadSignedFileRequest);
}

function* watchUpdateDtsDecisionRequest() {
  yield takeLatest(Types.UPDATE_DTS_DECISION_REQUEST, updateDtsDecisionRequest);
}

export default function* dtsDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetDtsDetailRequest),
      fork(watchUpdateDtsDetailRequest),
      fork(watchDownloadSignedFileRequest),
      fork(watchUpdateDtsDecisionRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
