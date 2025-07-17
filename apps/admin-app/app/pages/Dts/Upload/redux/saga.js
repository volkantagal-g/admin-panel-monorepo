import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';
import moment from 'moment';

import { uploadToS3 } from '@shared/api/upload';
import { getSignedUrlUpload, uploadDtsLogs } from '@shared/api/dts';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import history from '@shared/utils/history';

function* uploadDTSLogsRequest({ data, fileName, contentType }) {
  try {
    const { url, fileKey } = yield call(getSignedUrlUpload, { fileName, contentType });
    yield call(uploadToS3, { signedUrl: url, data });
    yield call(uploadDtsLogs, { fileName: fileKey, utcOffset: moment().utcOffset() });

    yield put(Creators.uploadDTSLogsSuccess());
    yield put(ToastCreators.success());

    history.push('/dts/summary');
  }
  catch (error) {
    yield put(Creators.uploadDTSLogsFailure({ error }));
    yield put(ToastCreators.error({ error, message: error.response.data.message }));
  }
}

function* watchUploadDTSLogsRequest() {
  yield takeLatest(Types.UPLOAD_DTS_LOGS_REQUEST, uploadDTSLogsRequest);
}

export default function* uploadDTSLogsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchUploadDTSLogsRequest)]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
