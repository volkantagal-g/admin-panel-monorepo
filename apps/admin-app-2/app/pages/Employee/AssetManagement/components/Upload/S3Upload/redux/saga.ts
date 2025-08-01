import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import { isFunction as _isFunction } from 'lodash';

import axios from 'axios';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getSignedUrl, uploadDocument } from '@shared/api/employeeAssetManagement/asset';
import { uploadToS3 } from '@shared/api/upload';
import { Types, Creators } from './actions';

function* uploadDocumentRequest({
  file,
  folderPath,
  base64,
  onSuccess,
} : {
  file: any,
  folderPath: any,
  base64: any,
  onSuccess: Function
}) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();
    const {
      name,
      type,
    } = file;

    // @ts-ignore
    const { url: signedUrl, fileKey } = yield call(uploadDocument, {
      cancelSource,
      fileName: name,
      contentType: type,
      folderPath,
    });
    // @ts-ignore
    yield call(uploadToS3, { signedUrl, data: base64 });
    yield put(Creators.uploadDocumentSuccess({ data: fileKey }));
    if (_isFunction(onSuccess)) {
      onSuccess(fileKey);
    }
  }
  catch (error) {
    yield put(Creators.uploadDocumentFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* watchUploadDocumentRequest() {
  yield takeLatest(Types.UPLOAD_DOCUMENT_REQUEST as any, uploadDocumentRequest);
}

function* getSignedUrlForDocumentRequest({ fileKey, onSuccess }: { fileKey: string, onSuccess: Function }): any {
  try {
    // @ts-ignore
    const response = yield call(getSignedUrl, { fileKey });
    yield put(Creators.getSignedUrlForDocumentSuccess({ signedUrl: response?.url }));

    if (_isFunction(onSuccess)) {
      onSuccess(response);
    }
  }
  catch (error: any) {
    yield put(Creators.getSignedUrlForDocumentFailure());
    yield put(ToastCreators.error({ error }));
  }
}
function* watchGetSignedUrlForDocumentRequest() {
  yield takeLatest(Types.GET_SIGNED_URL_FOR_DOCUMENT_REQUEST as any, getSignedUrlForDocumentRequest);
}

export default function* citySelectComponentRootSaga(): Generator {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks: unknown = yield all([
      fork(watchUploadDocumentRequest),
      fork(watchGetSignedUrlForDocumentRequest),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    // @ts-ignore
    yield all(backgroundTasks.map(task => cancel(task)));
  }
}
