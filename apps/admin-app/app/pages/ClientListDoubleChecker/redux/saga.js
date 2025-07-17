import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { createClientListUrl, uploadClientList } from '@shared/api/clientListDobuleChecker';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { uploadToS3 } from '@shared/api/upload';

function* uploadClientListRequest({ data }) {
  try {
    const { csvData, csvFileName, clientListName, isEmailAllowed, isSMSAllowed, isNotifAllowed } = data;

    const { url, cdnUrl } = yield call(createClientListUrl, { fileName: csvFileName, contentType: csvData.type });

    yield call(uploadToS3, { signedUrl: url, data: csvData.data });

    yield call(uploadClientList, {
      listName: clientListName,
      publicUrl: cdnUrl,
      isNotifAllowed,
      isEmailAllowed,
      isSMSAllowed,
    });
    yield put(Creators.uploadClientListSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.uploadClientListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUploadClientListRequest() {
  yield takeLatest(Types.UPLOAD_CLIENT_LIST_REQUEST, uploadClientListRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchUploadClientListRequest)]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
