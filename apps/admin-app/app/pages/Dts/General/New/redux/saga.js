import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { base64ToBinary, getHeaderFromBase64 } from '@shared/utils/upload';
import history from '@shared/utils/history';
import { Types, Creators } from './actions';
import {
  createDtsViolation as createDtsViolationApi,
  getSignedUrlUploadForViolation as getSignedUrlUploadForViolationApi,
} from '@shared/api/dts';

export function* createDtsRequest({
  description,
  feedbackSource,
  person,
  realized,
  rule,
  warehouse,
  files,
  isActive,
}) {
  try {
    let fileNames = [];
    if (files.length) {
      const signedUrlsCall = yield files.map(file => {
        return call(getSignedUrlUploadForViolationApi, { contentType: file.type, fileName: file.name });
      });
      const signedUrlsAndFileKeys = yield all(signedUrlsCall);

      fileNames = yield all(signedUrlsAndFileKeys.map((signedUrlAndFileKey, index) => {
        const { url, fileKey } = signedUrlAndFileKey;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files[index]);
        return new Promise((resolve, reject) => {
          fileReader.onloadend = async e => {
            const { result } = e.target;
            try {
              await axios.put(url, base64ToBinary(result), { headers: getHeaderFromBase64(result) });
              resolve({ name: files[index].name, url: fileKey });
            }
            catch (error) {
              reject(error);
            }
            fileReader.onerror = reject;
          };
        });
      }));
    }
    yield call(createDtsViolationApi, {
      description,
      feedbackSource,
      person,
      realized,
      rule,
      warehouse,
      files: fileNames,
      isActive,
    });
    yield put(Creators.createDtsSuccess());
    yield put(ToastCreators.success());
    history.push('/dts/list');
  }
  catch (error) {
    yield put(Creators.createDtsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchCreateDtsRequest() {
  yield takeLatest(Types.CREATE_DTS_REQUEST, createDtsRequest);
}

export default function* createDtsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateDtsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
