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
  delPickerCrisis as delPickerCrisisApi,
  deleteAttachments as deleteAttachmentsApi,
  downloadAttachments as downloadAttachmentsApi,
  exportPickerCrises as exportPickerCrisesApi,
  getPickerCrises as getPickerCrisesApi,
  getUploadUrl as getUploadUrlApi,
  savePickerCrisis as savePickerCrisisApi,
  updatePickerCrisis as updatePickerCrisisApi,
} from '@shared/api/pickerCrisis';
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
        Creators.uploadPickerCrisisFilesProgress({ currentFile: { ...file, status: 'uploading', percent: 50 } }),
      );
      const data = yield call(getUploadUrlApi, body);
      yield call(uploadToS3, {
        data: file.result,
        signedUrl: data.url,
      });
      yield put(
        Creators.uploadPickerCrisisFilesProgress({
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
        Creators.uploadPickerCrisisFilesProgress({ currentFile: { ...file, status: 'error', error } }),
      );
    }
  }
  yield put(Creators.uploadPickerCrisisFilesEnd());
}

function* watchUploadFiles() {
  yield takeLatest(Types.UPLOAD_PICKER_CRISIS_FILES_START, uploadFiles);
}

function* getPickerCrises({ filters, pagination }) {
  try {
    const body = formatIncidentFilters(filters, getLimitAndOffset(pagination));
    const data = yield call(getPickerCrisesApi, body);
    yield put(
      Creators.getPickerCrisesSuccess({
        data: data.records,
        count: data.totalCount,
      }),
    );
  }
  catch (error) {
    yield put(Creators.getPickerCrisesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetPickerCrisesRequest() {
  yield takeLatest(Types.GET_PICKER_CRISES_REQUEST, getPickerCrises);
}

function* exportPickerCrises({ filters }) {
  try {
    const body = {
      lang: getLangKey(),
      utcOffset: moment().utcOffset(),
      filters: formatIncidentFilters(filters),
    };
    const { url } = yield call(exportPickerCrisesApi, body);
    window.open(url);
    yield put(Creators.exportPickerCrisesSuccess());
  }
  catch (error) {
    yield put(Creators.exportPickerCrisesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchExportPickerCrisesRequest() {
  yield takeLatest(Types.EXPORT_PICKER_CRISES_REQUEST, exportPickerCrises);
}

function* delPickerCrisis({ id, deletedBy }) {
  try {
    const body = { id, deletedBy };
    const data = yield call(delPickerCrisisApi, body);
    yield put(Creators.deletePickerCrisisSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.deletePickerCrisisFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchDelPickerCrisis() {
  yield takeLatest(Types.DELETE_PICKER_CRISIS_REQUEST, delPickerCrisis);
}

function* savePickerCrisis({ details }) {
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
      data = yield call(updatePickerCrisisApi, body);
    }
    else {
      const body = {
        pickerId: details.pickerId,
        createdBy: details.createdBy,
        files: details.files,
        incidentDate: details.incidentDate,
        topic: details.topic,
        note: details.note,
      };
      data = yield call(savePickerCrisisApi, body);
    }
    yield put(Creators.savePickerCrisisSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.savePickerCrisisFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchSavePickerCrisis() {
  yield takeLatest(Types.SAVE_PICKER_CRISIS_REQUEST, savePickerCrisis);
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

export default function* pickerCrisesPageRootSaga() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchGetPickerCrisesRequest),
      fork(watchUploadFiles),
      fork(watchDelPickerCrisis),
      fork(watchSavePickerCrisis),
      fork(watchExportPickerCrisesRequest),
      fork(watchDownloadAttachment),
      fork(watchDeleteAttachment),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
