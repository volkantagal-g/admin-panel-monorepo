import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  courierCrises: {
    isPending: false,
    data: [],
    count: 0,
  },
  courierCrisesExport: {
    isPending: undefined,
    filters: { topics: undefined, courierId: undefined },
  },
  saveCrisis: {
    details: null,
    data: null,
    isPending: undefined,
    isCompleted: undefined,
  },
  uploadFiles: {
    files: [],
    user: undefined,
    isPending: undefined,
    currentFile: undefined,
  },
  deleteCrisis: {
    isPending: undefined,
    refreshList: undefined,
    data: undefined,
    error: undefined,
  },
  downloadAttachment: {
    file: undefined,
    data: undefined,
    isPending: undefined,
  },
  deleteAttachment: {
    file: undefined,
    data: undefined,
    isPending: undefined,
  },
};

const destroyPage = () => ({ ...INITIAL_STATE });

const courierCrisesRequest = (state = INITIAL_STATE) => ({
  ...state,
  courierCrises: {
    ...state.courierCrises,
    isPending: true,
  },
});

const courierCrisesSuccess = (state = INITIAL_STATE, { data, count }) => ({
  ...state,
  courierCrises: {
    ...state.courierCrises,
    isPending: false,
    count,
    data,
    error: undefined,
  },
});

const courierCrisesFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  courierCrises: {
    ...state.courierCrises,
    isPending: false,
    error,
  },
});

const courierCrisesExportRequest = (state = INITIAL_STATE, { filters }) => ({
  ...state,
  courierCrisesExport: {
    filters,
    isPending: true,
    data: undefined,
    error: undefined,
  },
});

const courierCrisesExportSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  courierCrisesExport: {
    ...state.courierCrisesExport,
    isPending: false,
    data,
    error: undefined,
  },
});

const courierCrisesExportFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  courierCrisesExport: {
    filters: undefined,
    isPending: false,
    data: undefined,
    error,
  },
});

const startUploadFiles = (
  state = INITIAL_STATE,
  { files, user },
) => ({
  ...state,
  uploadFiles: {
    user,
    files,
    isPending: true,
    currentFile: undefined,
  },
});

const updateFileUploadProgress = (
  state = INITIAL_STATE,
  { currentFile },
) => ({
  ...state,
  uploadFiles: {
    ...state.uploadFiles,
    currentFile,
  },
});

const completeFileUpload = (
  state = INITIAL_STATE,
) => ({
  ...state,
  uploadFiles: {
    ...state.uploadFiles,
    files: [],
    isPending: false,
    currentFile: null,
  },
});

const deleteCrisisRequest = (
  state = INITIAL_STATE,
  { id },
) => ({
  ...state,
  deleteCrisis: {
    id,
    isPending: true,
    refreshList: false,
  },
});

const deleteCrisisSuccess = (
  state = INITIAL_STATE,
) => ({
  ...state,
  deleteCrisis: {
    ...state.deleteCrisis,
    isPending: false,
    refreshList: true,
  },
});

const deleteCrisisFailure = (
  state = INITIAL_STATE,
  { error },
) => ({
  ...state,
  deleteCrisis: {
    refreshList: undefined,
    isPending: false,
    error,
  },
});

const saveCrisisRequest = (
  state = INITIAL_STATE,
  { details },
) => ({
  ...state,
  saveCrisis: {
    details,
    data: null,
    isPending: true,
    isCompleted: false,
  },
});

const saveCrisisSuccess = (
  state = INITIAL_STATE,
  { data },
) => ({
  ...state,
  saveCrisis: {
    ...state.saveCrisis,
    data,
    isPending: false,
    isCompleted: true,
  },
});

const saveCrisisFailure = (
  state = INITIAL_STATE,
  { error },
) => ({
  ...state,
  saveCrisis: {
    error,
    data: null,
    details: null,
    isPending: false,
    isCompleted: false,
  },
});

const saveCrisisReset = (
  state = INITIAL_STATE,
) => ({
  ...state,
  saveCrisis: { ...INITIAL_STATE.saveCrisis },
});

const downloadAttachmentRequest = (
  state = INITIAL_STATE,
  { file },
) => ({
  ...state,
  downloadAttachment: {
    file,
    isPending: true,
  },
});

const downloadAttachmentSuccess = (
  state = INITIAL_STATE,
) => ({
  ...state,
  downloadAttachment: {
    ...state.downloadAttachment,
    isPending: false,
  },
});

const downloadAttachmentFailure = (
  state = INITIAL_STATE,
  { error },
) => ({
  ...state,
  downloadAttachment: {
    isPending: false,
    error,
    file: undefined,
  },
});

const deleteAttachmentRequest = (
  state = INITIAL_STATE,
  { file },
) => ({
  ...state,
  deleteAttachment: {
    file,
    isPending: true,
  },
});

const deleteAttachmentSuccess = (
  state = INITIAL_STATE,
) => ({
  ...state,
  deleteAttachment: {
    ...state.deleteAttachment,
    isPending: false,
  },
});

const deleteAttachmentFailure = (
  state = INITIAL_STATE,
  { error },
) => ({
  ...state,
  deleteAttachment: {
    isPending: false,
    error,
    file: undefined,
  },
});

export const HANDLERS = {
  [Types.DESTROY_CONTAINER]: destroyPage,

  [Types.GET_COURIER_CRISES_REQUEST]: courierCrisesRequest,
  [Types.GET_COURIER_CRISES_SUCCESS]: courierCrisesSuccess,
  [Types.GET_COURIER_CRISES_FAILURE]: courierCrisesFailure,

  [Types.EXPORT_COURIER_CRISES_REQUEST]: courierCrisesExportRequest,
  [Types.EXPORT_COURIER_CRISES_SUCCESS]: courierCrisesExportSuccess,
  [Types.EXPORT_COURIER_CRISES_FAILURE]: courierCrisesExportFailure,

  [Types.DELETE_COURIER_CRISIS_REQUEST]: deleteCrisisRequest,
  [Types.DELETE_COURIER_CRISIS_SUCCESS]: deleteCrisisSuccess,
  [Types.DELETE_COURIER_CRISIS_FAILURE]: deleteCrisisFailure,

  [Types.UPLOAD_COURIER_CRISIS_FILES_START]: startUploadFiles,
  [Types.UPLOAD_COURIER_CRISIS_FILES_PROGRESS]: updateFileUploadProgress,
  [Types.UPLOAD_COURIER_CRISIS_FILES_END]: completeFileUpload,

  [Types.SAVE_COURIER_CRISIS_REQUEST]: saveCrisisRequest,
  [Types.SAVE_COURIER_CRISIS_SUCCESS]: saveCrisisSuccess,
  [Types.SAVE_COURIER_CRISIS_FAILURE]: saveCrisisFailure,
  [Types.SAVE_COURIER_CRISIS_RESET]: saveCrisisReset,

  [Types.DOWNLOAD_ATTACHMENT_REQUEST]: downloadAttachmentRequest,
  [Types.DOWNLOAD_ATTACHMENT_SUCCESS]: downloadAttachmentSuccess,
  [Types.DOWNLOAD_ATTACHMENT_FAILURE]: downloadAttachmentFailure,

  [Types.DELETE_ATTACHMENT_REQUEST]: deleteAttachmentRequest,
  [Types.DELETE_ATTACHMENT_SUCCESS]: deleteAttachmentSuccess,
  [Types.DELETE_ATTACHMENT_FAILURE]: deleteAttachmentFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
