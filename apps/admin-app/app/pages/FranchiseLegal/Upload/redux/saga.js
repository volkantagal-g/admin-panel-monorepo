import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getFranchiseLegalAgreementSignedUrl,
  triggerFranchiseLegalAgreementParse,
} from '@shared/api/franchiseLegalAgreement';
import { uploadToS3 } from '@shared/api/upload';
import { Types, Creators } from './actions';

function* uploadFranchiseLegalRequest({ data, contentType, fileName }) {
  try {
    const response = yield call(getFranchiseLegalAgreementSignedUrl, { fileName, contentType });
    yield call(uploadToS3, { signedUrl: response.url, data });
    yield put(ToastCreators.success());
    yield put(Creators.uploadFranchiseLegalSuccess());
    yield call(triggerFranchiseLegalAgreementParse, { fileName: response.fileName });
  }
  catch (error) {
    yield put(Creators.uploadFranchiseLegalFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUploadFranchiseLegalRequest() {
  yield takeLatest(Types.UPLOAD_FRANCHISE_LEGAL_REQUEST, uploadFranchiseLegalRequest);
}

export default function* uploadFranchiseLegalRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchUploadFranchiseLegalRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
