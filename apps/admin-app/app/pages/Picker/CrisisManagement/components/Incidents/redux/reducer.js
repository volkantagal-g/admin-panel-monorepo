import { createReducer } from 'reduxsauce';

import { Types } from './actions';

const createCommonState = filters => ({
  isPending: false,
  data: [],
  count: 0,
  filters: {
    pickerId: undefined,
    ...filters,
  },
  pagination: {
    currentPage: 1,
    rowsPerPage: 10,
  },
});

export const INITIAL_STATE = {
  pickerCrises: createCommonState({ topics: undefined }),
  pickerCrisesExport: {
    isPending: undefined,
    filters: { topics: undefined, pickerId: undefined },
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

const pickerCrisesRequest = (state = INITIAL_STATE) => ({
  ...state,
  pickerCrises: {
    ...state.pickerCrises,
    isPending: true,
  },
});

const pickerCrisesSuccess = (state = INITIAL_STATE, { data, count }) => ({
  ...state,
  pickerCrises: {
    ...state.pickerCrises,
    isPending: false,
    count,
    data,
    error: undefined,
  },
});

const pickerCrisesFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  pickerCrises: {
    ...state.pickerCrises,
    isPending: false,
    error,
  },
});

const changePickerCrisesFilters = (state = INITIAL_STATE, filters) => ({
  ...state,
  pickerCrises: {
    ...state.pickerCrises,
    filters,
    pagination: { ...INITIAL_STATE.pickerCrises.pagination },
  },
});

const changePickerCrisesPagination = (state = INITIAL_STATE, pagination) => ({
  ...state,
  pickerCrises: {
    ...state.pickerCrises,
    pagination,
  },
});

const pickerCrisesExportRequest = (state = INITIAL_STATE, { filters }) => ({
  ...state,
  pickerCrisesExport: {
    filters,
    isPending: true,
    data: undefined,
    error: undefined,
  },
});

const pickerCrisesExportSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  pickerCrisesExport: {
    ...state.pickerCrisesExport,
    isPending: false,
    data,
    error: undefined,
  },
});

const pickerCrisesExportFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  pickerCrisesExport: {
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

  [Types.GET_PICKER_CRISES_REQUEST]: pickerCrisesRequest,
  [Types.GET_PICKER_CRISES_SUCCESS]: pickerCrisesSuccess,
  [Types.GET_PICKER_CRISES_FAILURE]: pickerCrisesFailure,
  [Types.CHANGE_PICKER_CRISES_FILTERS]: changePickerCrisesFilters,
  [Types.CHANGE_PICKER_CRISES_PAGINATION]: changePickerCrisesPagination,

  [Types.EXPORT_PICKER_CRISES_REQUEST]: pickerCrisesExportRequest,
  [Types.EXPORT_PICKER_CRISES_SUCCESS]: pickerCrisesExportSuccess,
  [Types.EXPORT_PICKER_CRISES_FAILURE]: pickerCrisesExportFailure,

  [Types.DELETE_PICKER_CRISIS_REQUEST]: deleteCrisisRequest,
  [Types.DELETE_PICKER_CRISIS_SUCCESS]: deleteCrisisSuccess,
  [Types.DELETE_PICKER_CRISIS_FAILURE]: deleteCrisisFailure,

  [Types.UPLOAD_PICKER_CRISIS_FILES_START]: startUploadFiles,
  [Types.UPLOAD_PICKER_CRISIS_FILES_PROGRESS]: updateFileUploadProgress,
  [Types.UPLOAD_PICKER_CRISIS_FILES_END]: completeFileUpload,

  [Types.SAVE_PICKER_CRISIS_REQUEST]: saveCrisisRequest,
  [Types.SAVE_PICKER_CRISIS_SUCCESS]: saveCrisisSuccess,
  [Types.SAVE_PICKER_CRISIS_FAILURE]: saveCrisisFailure,
  [Types.SAVE_PICKER_CRISIS_RESET]: saveCrisisReset,

  [Types.DOWNLOAD_ATTACHMENT_REQUEST]: downloadAttachmentRequest,
  [Types.DOWNLOAD_ATTACHMENT_SUCCESS]: downloadAttachmentSuccess,
  [Types.DOWNLOAD_ATTACHMENT_FAILURE]: downloadAttachmentFailure,

  [Types.DELETE_ATTACHMENT_REQUEST]: deleteAttachmentRequest,
  [Types.DELETE_ATTACHMENT_SUCCESS]: deleteAttachmentSuccess,
  [Types.DELETE_ATTACHMENT_FAILURE]: deleteAttachmentFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
