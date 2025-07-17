import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import { difference, get, uniq, isString, isEmpty } from 'lodash';

import {
  deleteFiles,
  getById as getPanelDocByIdApi,
  update as panelDocUpdate,
  updateActiveness, updateHighlight,
  uploadFiles,
} from '@shared/api/panelDoc';
import { getLangKey } from '@shared/i18n';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Types, Creators } from './actions';
import { getCleanFilesForUpdate } from '../../utils';

function* getPanelDocById({ _id }) {
  try {
    const data = yield call(getPanelDocByIdApi, { _id, populate: { page: true } });
    yield put(Creators.getPanelDocByIdSuccess({ data }));
  }
  catch (error) {
    const message = error.message?.[getLangKey()];
    yield put(Creators.getPanelDocByIdFailure({ error }));
    yield put(ToastCreators.error({ error, message }));
  }
}

function* panelDocUpdateActivenessRequest({ existingPanelDoc, isActive }) {
  try {
    yield call(updateActiveness, { _id: existingPanelDoc._id, pageId: existingPanelDoc.pageId, isActive });
    yield put(Creators.getPanelDocByIdRequest({ _id: existingPanelDoc._id }));
    yield put(Creators.panelDocUpdateActivenessSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    const message = error.message?.[getLangKey()];
    yield put(Creators.panelDocUpdateActivenessFailure({ error }));
    yield put(ToastCreators.error({ error, message, toastOptions: { autoClose: 5000 } }));
  }
}

function* panelDocUpdateHighlightRequest({ existingPanelDoc, isHighlighted }) {
  try {
    yield call(updateHighlight, { _id: existingPanelDoc._id, pageId: existingPanelDoc.pageId, isHighlighted });
    yield put(Creators.panelDocUpdateHighlightSuccess());
    yield put(ToastCreators.success());

    yield put(Creators.getPanelDocByIdRequest({ _id: existingPanelDoc._id }));
  }
  catch (error) {
    const message = error.message?.[getLangKey()];
    yield put(Creators.panelDocUpdateHighlightFailure({ error }));
    yield put(ToastCreators.error({ error, message, toastOptions: { autoClose: 5000 } }));
  }
}

function* uploadContentEditorFiles(existingPanelDoc, contentEditor) {
  const delta = contentEditor.getContents();
  const imageEmbedsOps = [];
  delta.ops.forEach(op => {
    if (!isString(op.insert?.s3Image) || isEmpty(op.insert.s3Image)) return;
    if (op.attributes?.['file-key']) return;
    imageEmbedsOps.push(op);
  });

  const filesToUpload = imageEmbedsOps.map((op, index) => {
    const contentType = op.insert.s3Image.split(',')[0].split(':')[1].split(';')[0];
    return {
      data: op.insert.s3Image,
      fileName: `image${index}.${contentType.split('/')[1]}`,
      contentType,
    };
  });
  const uploadedFiles = yield call(uploadFiles, { files: filesToUpload, pageId: existingPanelDoc.pageId });
  uploadedFiles.forEach(({ fileKey }, index) => {
    imageEmbedsOps[index].insert.s3Image = ''; // remove temporary base64 url
    imageEmbedsOps[index].attributes = { 'file-key': fileKey };
  });

  return [delta, uploadedFiles.map(file => file.fileKey)];
}

const collectEmbeddedImages = contentEditor => {
  const delta = contentEditor.getContents();
  const embeddedImageFileKeys = [];
  delta.ops.forEach(op => {
    if (!op.insert?.s3Image) return;
    if (!op.attributes?.['file-key']) return;

    embeddedImageFileKeys.push(op.attributes['file-key']);
  });

  return embeddedImageFileKeys;
};

function* panelDocUpdateRequest({ data, contentEditor }) {
  let isS3UploadSuccess = false;
  let isPanelDocUpdateSuccess = false;

  const { existingPanelDoc, ...updateFields } = data;

  const existingFiles = get(existingPanelDoc, 'files', []);
  const existingFileKeys = existingFiles.map(file => file.fileKey);
  const existingContentFileKeys = get(existingPanelDoc, 'contentFileKeys', []);

  const updateFiles = get(updateFields, 'files', []);
  const remainingFileKeys = updateFiles ? updateFiles.filter(file => file.fileKey).map(file => file.fileKey) : existingFileKeys;
  let fileKeysToDelete = difference(existingFileKeys, remainingFileKeys);
  const contentEditorFileKeysToDelete = difference(existingContentFileKeys, collectEmbeddedImages(contentEditor));
  fileKeysToDelete = fileKeysToDelete.concat(contentEditorFileKeysToDelete);

  let newFileKeys = [];
  let newContentFileKeys = [];
  let updatedDelta = contentEditor.getContents();

  try {
    let cleanUpdateFiles;
    if (updateFiles) {
      // First try to upload new files to S3 bucket, if it succeeds then update the panel doc
      const updateFilesWithNewUploads = yield call(uploadFiles, { files: updateFiles, pageId: existingPanelDoc.pageId });
      cleanUpdateFiles = getCleanFilesForUpdate(updateFilesWithNewUploads);
      const uploadedFileKeys = cleanUpdateFiles.map(file => file.fileKey);
      newFileKeys = difference(uploadedFileKeys, existingFileKeys);
    }

    [updatedDelta, newContentFileKeys] = yield uploadContentEditorFiles(existingPanelDoc, contentEditor);
    isS3UploadSuccess = true;

    const newUpdateFields = {
      ...updateFields,
      files: cleanUpdateFiles,
      content: updatedDelta,
      contentFileKeys: uniq(existingContentFileKeys.concat(newContentFileKeys)),
    };
    // update the panel doc
    yield call(
      panelDocUpdate,
      { _id: existingPanelDoc._id, pageId: existingPanelDoc.pageId, isActive: existingPanelDoc.isActive, ...newUpdateFields },
    );
    isPanelDocUpdateSuccess = true;
    yield put(Creators.panelDocUpdateSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    const message = error.message?.[getLangKey()];
    yield put(Creators.panelDocUpdateFailure({ error }));
    yield put(ToastCreators.error({ error, message, toastOptions: { autoClose: 5000 } }));
  }

  // if upload was unsuccessful, do nothing extra
  if (!isS3UploadSuccess) return;

  // if upload was successful but doc-update was unsuccessful, delete the new files
  if (isS3UploadSuccess && !isPanelDocUpdateSuccess) {
    fileKeysToDelete = newFileKeys.concat(newContentFileKeys);
  }

  try {
    if (fileKeysToDelete.length) {
      yield call(deleteFiles, { fileKeys: fileKeysToDelete, pageId: existingPanelDoc.pageId });

      if (isS3UploadSuccess && isPanelDocUpdateSuccess) {
        yield call(
          panelDocUpdate,
          {
            _id: existingPanelDoc._id,
            pageId: existingPanelDoc.pageId,
            isActive: existingPanelDoc.isActive,
            // only remove file keys after deletion succeeded, so we don't drop any references
            contentFileKeys: difference(uniq(existingContentFileKeys.concat(newContentFileKeys)), contentEditorFileKeysToDelete),
          },
        );
      }
    }
  }
  // An error while deleting obsolete files shouldn't affect main flow
  catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error while deleting unused files', error);
  }

  if (isPanelDocUpdateSuccess) yield put(Creators.getPanelDocByIdRequest({ _id: existingPanelDoc._id }));
}

function* watchGetPanelDocByIdRequest() {
  yield takeLatest(Types.GET_PANEL_DOC_BY_ID_REQUEST, getPanelDocById);
}

function* watchPanelDocUpdateActivenessRequest() {
  yield takeLatest(Types.PANEL_DOC_UPDATE_ACTIVENESS_REQUEST, panelDocUpdateActivenessRequest);
}

function* watchPanelDocUpdateHighlightRequest() {
  yield takeLatest(Types.PANEL_DOC_UPDATE_HIGHLIGHT_REQUEST, panelDocUpdateHighlightRequest);
}

function* watchPanelDocUpdateRequest() {
  yield takeLatest(Types.PANEL_DOC_UPDATE_REQUEST, panelDocUpdateRequest);
}

export default function* panelDocDetailPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetPanelDocByIdRequest),
      fork(watchPanelDocUpdateActivenessRequest),
      fork(watchPanelDocUpdateHighlightRequest),
      fork(watchPanelDocUpdateRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
