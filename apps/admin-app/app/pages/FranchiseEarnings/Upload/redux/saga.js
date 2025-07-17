import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getFranchiseEarningsSignedUrl as getFranchiseEarningsSignedUrlApi,
  triggerFranchiseEarnigsExcelParse as triggerFranchiseEarnigsExcelParseApi,
} from '@shared/api/franchiseFinancial';
import { uploadToS3 } from '@shared/api/upload';
import { Types, Creators } from './actions';

function* uploadFranchiseEarningsRequest({ data, contentType, fileName, earningType }) {
  try {
    const { url, fileKey } = yield call(getFranchiseEarningsSignedUrlApi, { fileName, contentType });
    yield call(uploadToS3, { signedUrl: url, data });
    yield put(ToastCreators.success());
    yield put(Creators.uploadFranchiseEarningsSuccess());
    yield call(triggerFranchiseEarnigsExcelParseApi, { fileName: fileKey, earningType });
  }
  catch (error) {
    yield put(Creators.uploadFranchiseEarningsFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUploadFranchiseEarningsRequest() {
  yield takeLatest(Types.UPLOAD_FRANCHISE_EARNINGS_REQUEST, uploadFranchiseEarningsRequest);
}

export default function* uploadFranchiseEarningsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchUploadFranchiseEarningsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
