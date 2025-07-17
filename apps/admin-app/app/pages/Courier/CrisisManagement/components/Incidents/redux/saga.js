import moment from 'moment';
import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import {
  delCourierCrisis as delCourierCrisisApi,
  deleteAttachments as deleteAttachmentsApi,
  downloadAttachments as downloadAttachmentsApi,
  exportCourierCrises as exportCourierCrisesApi,
  getCourierCrises as getCourierCrisesApi,
  getUploadUrl as getUploadUrlApi,
  saveCourierCrisis as saveCourierCrisisApi,
  updateCourierCrisis as updateCourierCrisisApi,
} from '@shared/api/courierCrisis';
import { uploadToS3 } from '@shared/api/upload';
import { getLangKey } from '@shared/i18n';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getLimitAndOffset } from '@shared/utils/common';
import { formatIncidentFilters } from '../../../helpers';
import { Creators, Types } from './actions';

function* uploadFiles({ files = [] }) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const body = {
      fileName: file.name,
      contentType: file.type,
    };
    try {
      yield put(
        Creators.uploadCourierCrisisFilesProgress({ currentFile: { ...file, status: 'uploading', percent: 50 } }),
      );
      const data = yield call(getUploadUrlApi, body);
      yield call(uploadToS3, {
        data: file.result,
        signedUrl: data.url,
      });
      yield put(
        Creators.uploadCourierCrisisFilesProgress({
          currentFile: {
            ...file,
            percent: 100,
            status: 'success',
            fileName: file.name,
            fileType: file.type,
            uploadedFileName: data.fileName,
          },
        }),
      );
    }
    catch (error) {
      yield put(
        Creators.uploadCourierCrisisFilesProgress({ currentFile: { ...file, status: 'error', error } }),
      );
    }
  }
  yield put(Creators.uploadCourierCrisisFilesEnd());
}

function* watchUploadFiles() {
  yield takeLatest(Types.UPLOAD_COURIER_CRISIS_FILES_START, uploadFiles);
}

function* getCourierCrises({ filters, pagination }) {
  try {
    const body = formatIncidentFilters(filters, getLimitAndOffset(pagination));
    const data = yield call(getCourierCrisesApi, body);
    yield put(
      Creators.getCourierCrisesSuccess({
        data: data.records,
        count: data.totalCount,
      }),
    );
  }
  catch (error) {
    yield put(Creators.getCourierCrisesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetCourierCrisesRequest() {
  yield takeLatest(Types.GET_COURIER_CRISES_REQUEST, getCourierCrises);
}

function* exportCourierCrises({ filters }) {
  try {
    const body = {
      lang: getLangKey(),
      utcOffset: moment().utcOffset(),
      filters: formatIncidentFilters(filters),
    };
    const { url } = yield call(exportCourierCrisesApi, body);
    window.open(url);
    yield put(Creators.exportCourierCrisesSuccess());
  }
  catch (error) {
    yield put(Creators.exportCourierCrisesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchExportCourierCrisesRequest() {
  yield takeLatest(Types.EXPORT_COURIER_CRISES_REQUEST, exportCourierCrises);
}

function* delCourierCrisis({ id, deletedBy }) {
  try {
    const body = { id, deletedBy };
    const data = yield call(delCourierCrisisApi, body);
    yield put(Creators.deleteCourierCrisisSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.deleteCourierCrisisFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchDelCourierCrisis() {
  yield takeLatest(Types.DELETE_COURIER_CRISIS_REQUEST, delCourierCrisis);
}

function* saveCourierCrisis({ details }) {
  try {
    let data = null;
    if (details._id) {
      const body = {
        _id: details._id,
        updatedBy: details.updatedBy,
        files: details.files,
        incidentDate: details.incidentDate,
        topic: details.topic,
        note: details.note,
      };
      data = yield call(updateCourierCrisisApi, body);
    }
    else {
      const body = {
        courierId: details.courierId,
        createdBy: details.createdBy,
        files: details.files,
        incidentDate: details.incidentDate,
        topic: details.topic,
        note: details.note,
      };
      data = yield call(saveCourierCrisisApi, body);
    }
    yield put(Creators.saveCourierCrisisSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.saveCourierCrisisFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchSaveCourierCrisis() {
  yield takeLatest(Types.SAVE_COURIER_CRISIS_REQUEST, saveCourierCrisis);
}

function* downloadAttachment({ file }) {
  try {
    const body = { fileNames: [file.uploadedFileName] };
    const { urls } = yield call(downloadAttachmentsApi, body);
    window.open(urls[0]);
    yield put(Creators.downloadAttachmentSuccess());
  }
  catch (error) {
    yield put(Creators.downloadAttachmentFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchDownloadAttachment() {
  yield takeLatest(Types.DOWNLOAD_ATTACHMENT_REQUEST, downloadAttachment);
}

function* deleteAttachment({ file }) {
  try {
    const body = { fileName: file.uploadedFileName };
    yield call(deleteAttachmentsApi, body);
    yield put(Creators.deleteAttachmentSuccess({ data: file }));
  }
  catch (error) {
    yield put(Creators.deleteAttachmentFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchDeleteAttachment() {
  yield takeLatest(Types.DELETE_ATTACHMENT_REQUEST, deleteAttachment);
}

export default function* courierCrisesPageRootSaga() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchGetCourierCrisesRequest),
      fork(watchUploadFiles),
      fork(watchDelCourierCrisis),
      fork(watchSaveCourierCrisis),
      fork(watchExportCourierCrisesRequest),
      fork(watchDownloadAttachment),
      fork(watchDeleteAttachment),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
