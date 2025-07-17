import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getCourierPlan,
  getCourierPlanFileSignedUploadUrl,
  proceedCourierPlanProcess,
  getCourierPlanFileSignedDownloadUrl,
  publishCourierPlanProcess,
} from '@shared/api/e2eCourierPlan';
import { uploadToS3 } from '@shared/api/upload';
import { ROUTE } from '@app/routes';
import history from '@shared/utils/history';

import { Types, Creators } from './actions';

function* courierPlanRequest({ id }) {
  try {
    const plan = yield call(getCourierPlan, { id });
    yield put(Creators.getCourierPlanSuccess({ plan }));
  }
  catch (error) {
    yield put(Creators.getCourierPlanFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCourierPlanRequest() {
  yield takeLatest(Types.GET_COURIER_PLAN_REQUEST, courierPlanRequest);
}

function* uploadCourierPlanExcelFileRequest({
  planId,
  stepKey,
  uploadParams,
  data,
}) {
  const { file, key, finalFile, finalKey } = uploadParams;
  try {
    const proceedData = { ...data };
    if (file && key) {
      const signedFile = yield call(getCourierPlanFileSignedUploadUrl, { key });
      proceedData.file = signedFile.fileName;
      yield call(uploadToS3, { signedUrl: signedFile.url, data: file });
    }
    if (finalFile && finalKey) {
      const signedFinalFile = yield call(getCourierPlanFileSignedUploadUrl, { key: finalKey });
      proceedData.finalFile = signedFinalFile.fileName;
      yield call(uploadToS3, {
        signedUrl: signedFinalFile.url,
        data: finalFile,
      });
    }
    yield put(
      Creators.proceedCourierPlanProcessRequest({
        planId,
        stepKey,
        data: proceedData,
      }),
    );
  }
  catch (error) {
    yield put(Creators.uploadCourierPlanExcelFileFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUploadCourierPlanExcelFileRequest() {
  yield takeLatest(
    Types.UPLOAD_COURIER_PLAN_EXCEL_FILE_REQUEST,
    uploadCourierPlanExcelFileRequest,
  );
}

function* proceedCourierPlanProcessRequest({ planId, stepKey, data }) {
  try {
    yield call(proceedCourierPlanProcess, { planId, stepKey, data });
    yield put(ToastCreators.success());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.proceedCourierPlanProcessFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchProceedCourierPlanProcessRequest() {
  yield takeLatest(
    Types.PROCEED_COURIER_PLAN_PROCESS_REQUEST,
    proceedCourierPlanProcessRequest,
  );
}

function* updateTTPRequest({ planId, stepKey, uploadParams, data }) {
  const { file, key, finalFile, finalKey } = uploadParams;
  try {
    const proceedData = { ...data };
    if (file && key) {
      const signedFile = yield call(getCourierPlanFileSignedUploadUrl, { key });
      yield call(uploadToS3, { signedUrl: signedFile.url, data: file });
      const { fileName } = signedFile;

      proceedData.file = fileName;
      proceedData.ttp.fileName = fileName;
    }
    if (finalFile && finalKey) {
      const signedFile = yield call(getCourierPlanFileSignedUploadUrl, { key: finalKey });
      yield call(uploadToS3, { signedUrl: signedFile.url, data: finalFile });
      const { fileName } = signedFile;

      proceedData.finalFile = fileName;
      proceedData.ttp.finalFileName = fileName;
    }

    yield put(
      Creators.proceedCourierPlanProcessRequest({
        planId,
        stepKey,
        data: proceedData,
      }),
    );
  }
  catch (error) {
    yield put(Creators.updateTTPFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateTTPRequest() {
  yield takeLatest(Types.UPDATE_TTP_REQUEST, updateTTPRequest);
}

function* downloadSignedFileRequest({ key }) {
  try {
    const { url } = yield call(getCourierPlanFileSignedDownloadUrl, { key });
    window.open(url);
    yield put(Creators.downloadSignedFileSuccess());
  }
  catch (error) {
    yield put(Creators.downloadSignedFileFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchDownloadSignedFileRequest() {
  yield takeLatest(
    Types.DOWNLOAD_SIGNED_FILE_REQUEST,
    downloadSignedFileRequest,
  );
}

function* publishCourierPlanProcessRequest({ planId, publishType }) {
  try {
    yield call(publishCourierPlanProcess, { planId, publishType });
    yield put(ToastCreators.success());
    const { path } = ROUTE.E2E_COURIER_PLAN_LIST;
    history.push(path);
  }
  catch (error) {
    yield put(Creators.publishCourierPlanProcessFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchPublishCourierPlanProcessRequest() {
  yield takeLatest(
    Types.PUBLISH_COURIER_PLAN_PROCESS_REQUEST,
    publishCourierPlanProcessRequest,
  );
}

export default function* courierPlanRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCourierPlanRequest),
      fork(watchUploadCourierPlanExcelFileRequest),
      fork(watchProceedCourierPlanProcessRequest),
      fork(watchPublishCourierPlanProcessRequest),
      fork(watchDownloadSignedFileRequest),
      fork(watchUpdateTTPRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
